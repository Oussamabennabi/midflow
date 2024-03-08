import { v } from "convex/values";
import { query } from "./_generated/server";


export const list = query({
    args: {
        patient: v.id("users"),
        doctor: v.id("doctors"),
    },
    handler: async (ctx, { doctor, patient }) => {
        const chats = await ctx.db.query("chats").
            withIndex("by_patient_doctor", q => q.eq("doctor", doctor).eq("patient", patient)).collect()

        const promise = chats.map(async c => {
            const messages = await ctx.db.query("messages").
            withIndex("by_chat_id", q => q.eq("chat_id", c._id)).order("desc").
            take(100)
            return { ...c, messages }
        })

        const res = await Promise.all(promise)
        return res
    },
});