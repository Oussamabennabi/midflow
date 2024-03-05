import { query } from "./_generated/server";
import { v } from "convex/values";



export const get_by_id = query({
    args: {
        id: v.id("doctors")
    },
    handler: async (ctx, args) => {
        const doctor = await ctx.db.get(args.id)
        return doctor
    },
});