import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";



export const get_by_id = query({
    args: {
        id: v.id("doctors")
    },
    handler: async (ctx, args) => {
        const doctor = await ctx.db.get(args.id)
        if(!doctor) throw new ConvexError("There is no doctor with id:"+args.id)
        const user = await ctx.db.get(doctor?.user_id!)

        return {
            ...user?.clerk_user,
            ...doctor
        }
    },
});


export const get_by_user_id = query({
    args: {
        user_id: v.id("users")
    },
    async handler(ctx, args) {
        const doctor = await ctx.db.query("doctors").
        withIndex("by_user_id", q => q.eq("user_id", args.user_id)).
        unique()
        return doctor
    },
})