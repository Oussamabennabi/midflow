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
        return doctors
    },
});