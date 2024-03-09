import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const get_chats = query({
    args: {
        id:v.id("users")
    },
    handler: async (ctx, { id }) => {
        const chats = await ctx.db.query("chats").withIndex("by_patient_doctor").collect()
        return chats
    },

});


export const get_or_create = mutation({
    args: {
        patient: v.id("users"),
        doctor: v.id("doctors"),

    },
    async handler(ctx, { doctor, patient }) {
        // get the chat if exists
        const chat = await ctx.db.query("chats").
            withIndex("by_patient_doctor", q => q.eq("doctor", doctor).eq("patient", patient)).unique()
        if (chat) {
            return chat._id
        }
        const id = await ctx.db.insert("chats", {
            doctor, patient
        })
        return id

    },
})

export const get_chat_by_id = query({
    args: {
        id: v.id("chats")
    },
    handler: async (ctx, { id }) => {
        const chat = await ctx.db.get(id)
        if (!chat) {
            throw new ConvexError("Chat not found")
        }
        return chat
    },
});


// TODO!  make the current user also return a doctor id if you are a doctor or find another solution to where you are a doctor and you want to get the chats for him