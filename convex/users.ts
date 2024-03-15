import {
  internalMutation,
  internalQuery,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";

import { v } from "convex/values";
import { DataModel, Doc, Id } from "./_generated/dataModel";
/**
 * Whether the current user is fully logged in, including having their information
 * synced from Clerk via webhook.
 *
 * Like all Convex queries, errors on expired Clerk token.
 */

export type ClerkUser = DataModel["users"]["document"]
export const userLoginStatus = query(
  async (
    ctx
  ): Promise<
    | ["No JWT Token", null]
    | ["No Clerk User", null]
    | ["Logged In", Doc<"users">]
  > => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // no JWT token, user hasn't completed login flow yet
      return ["No JWT Token", null];
    }
    const user = await getCurrentUser(ctx);
    if (user === null) {
      // If Clerk has not told us about this user we're still waiting for the
      // webhook notification.
      return ["No Clerk User", null];
    }
    return ["Logged In", user];
  }
);

/** The current user, containing user preferences and Clerk user info. */
export const currentUser = query((ctx: QueryCtx) => getCurrentUserWithRole(ctx));

/** Get user by Clerk use id (AKA "subject" on auth)  */
export const getUser = internalQuery({
  args: { subject: v.string() },
  async handler(ctx, args) {
    return await userQuery(ctx, args.subject);
  },
});

/** Create a new Clerk user or update existing Clerk user data. */
export const updateOrCreateUser = internalMutation({
  args: { user: v.any() }, // no runtime validation, trust Clerk
  async handler(ctx, { user }: { user: ClerkUser["clerk_user"] }) {
    const userRecord = await userQuery(ctx, user.id);

    if (userRecord === null) {
      await ctx.db.insert("users", { clerk_user: user, role: "Patient" });
    } else {
      await ctx.db.patch(userRecord._id, { clerk_user: user });
    }
  },
});

/** Delete a user by clerk user ID. */
export const deleteUser = internalMutation({
  args: { id: v.string() },
  async handler(ctx, { id }) {
    const userRecord = await userQuery(ctx, id);

    if (userRecord === null) {
      console.warn("can't delete user, does not exist", id);
    } else {
      //  also check if this user is  doctor to delete it as well
      if (userRecord.role === "Doctor") {
        const found = await ctx.db.query("doctors").withIndex("by_user_id", q => q.eq("user_id", userRecord._id)).unique()
        if (found) await ctx.db.delete(found._id)
        console.log("DELETE doctor with id", found?._id)
      }
      await ctx.db.delete(userRecord._id);
    }
  },
});



export const update_photo = mutation({
  args: {
    doctor_id: v.id("doctors"),
    storage_id: v.id("_storage")
  },
  async handler(ctx, { doctor_id, storage_id }) {
    const url = await ctx.storage.getUrl(storage_id)
    if (!url) return
    await ctx.db.patch(doctor_id, {
      image: url
    })

  },
})





// Helpers

export async function userQuery(
  ctx: QueryCtx,
  clerkUserId: string
): Promise<(Omit<Doc<"users">, "clerk_user"> & { clerk_user: ClerkUser["clerk_user"] }) | null> {

  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerk_user.id", clerkUserId))
    .unique();
}


export async function userWithRoleQuery(
  ctx: QueryCtx,
  clerkUserId: string
) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerk_user.id", clerkUserId))
    .unique()


  if (!user) throw Error("There is no user")
  if (user.role === "Doctor") {
    const doc = await ctx.db.query("doctors").withIndex("by_user_id", q => q.eq("user_id", user._id)).unique()

    if (doc)
      return {
        ...user,
        ...doc
      }
    else
      return {
        ...user
      }
  }
  return {
    ...user
  }

}


export async function userById(
  ctx: QueryCtx,
  id: Id<"users">
): Promise<(Omit<Doc<"users">, "clerk_user"> & { clerk_user: ClerkUser["clerk_user"] }) | null> {
  return await ctx.db.get(id);
}

async function getCurrentUser(ctx: QueryCtx): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }

  return await userQuery(ctx, identity.subject);
}
async function getCurrentUserWithRole(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userWithRoleQuery(ctx, identity.subject);
}

export async function mustGetCurrentUser(ctx: QueryCtx): Promise<Doc<"users">> {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}
