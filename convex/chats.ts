import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";


export const get_chats = query({
    args: {
        patient: v.id("users"),
        doctor: v.id("doctors"),
    },
    handler: async (ctx, { doctor, patient }) => {
        const chats = await ctx.db.query("chats").
            withIndex("by_patient_doctor", q => q.eq("doctor", doctor).eq("patient", patient)).collect()

        return chats
    },

});


export const get_chat_by_patient_doctor = query({
    args: {
        patient: v.id("users"),
        doctor: v.id("doctors"),
    },
    handler: async (ctx, { doctor, patient }) => {
        const chat = await ctx.db.query("chats").
            withIndex("by_patient_doctor", q => q.eq("doctor", doctor).eq("patient", patient)).unique()
        if (!chat) {
            // todo
            throw new ConvexError("Chat not found")
        }
        

        return chat
    },
});