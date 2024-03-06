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



export const get_by_doctor_id = query({
    args: {
        id: v.id("doctors")
    },
    handler: async (ctx, args) => {

        const doctor_reviews = await ctx.db.query("doctor_reviews").withIndex("reviews_by_doctor_id", (q =>
            q.eq("doctor_id", args.id))).order("desc").collect()

        return doctor_reviews

    },
});