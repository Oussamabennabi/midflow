import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";



export const get_by_id = query({
    args: {
        id: v.id("doctors")
    },
    handler: async (ctx, args) => {
        const doctor = await ctx.db.get(args.id)
        if (!doctor) throw new ConvexError("There is no doctor with id:" + args.id)
        const user = await ctx.db.get(doctor?.user_id!)

        return {
            ...user?.clerk_user,
            ...doctor
        }
    },
});

export const get_by_id_short_response = query({
    args: {
        id: v.id("doctors")
    },
    handler: async (ctx, args) => {
        const doctor = await ctx.db.get(args.id)
        if (!doctor) throw new ConvexError("There is no doctor with id:" + args.id)
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
export const update_location = mutation({
    args: {
        doctor_id: v.id("doctors"),
        location: v.object({
            latitude: v.number(),
            longitude: v.number(),
            description: v.string(),
            name: v.string()
        })
    },
    async handler(ctx, args) {


        const doctor = await ctx.db.get(args.doctor_id)
        if (!doctor) throw new ConvexError("No doctor was found with id:" + args.doctor_id)
        const { description, latitude, longitude, name } = args.location
        await ctx.db.patch(doctor._id, {
            location: {
                description, latitude, longitude, name
            }
        })
    },
})
