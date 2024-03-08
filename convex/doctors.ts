import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
    args: {
        first: v.string(),
        second: v.string(),
    },
    handler: async (ctx, args) => {

    },
});



export const get = query({
    handler: async (ctx, args) => {
        const doctors = await ctx.db.query("doctors").collect()

        const doctorsWithUsers = doctors.map(async (doc) => {
            const user = await ctx.db.get(doc.user_id)
            return {
                ...user?.clerk_user,
                ...doc,
            }

        })
        const res = await Promise.all(doctorsWithUsers)
        return res
    },
});