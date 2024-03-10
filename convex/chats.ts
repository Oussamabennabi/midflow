import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get_chats = query({
    args: {
        id: v.union(v.id("users"), v.id("doctors")),
        isDoctor: v.boolean()
    },
    handler: async (ctx, { id, isDoctor }) => {
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) throw new ConvexError("Not authorized")
        if (isDoctor) {
            const chats = await ctx.db.query("chats").withIndex("by_doctor", q => q.eq("doctor", id as Id<"doctors">)).collect()

            const promise = chats.map(async c => {
                const user = await ctx.db.get(c.patient)
                const lastMessage = await ctx.db.query("messages").withIndex("by_chat_id", q => q.eq("chat_id", c._id)).order("desc").first()

                return {
                    ...user,
                    ...c,
                    lastMessage
                }
            })

            const result = await Promise.all(promise)
            return result
        }

        const chats = await ctx.db.query("chats").withIndex("by_patient", q => q.eq("patient", id as Id<"users">)).collect()
        const promise = chats.map(async c => {
            const doc = await ctx.db.get(c.doctor)
            if (!doc) return
            const user = await ctx.db.get(doc.user_id)
            const lastMessage = await ctx.db.query("messages").withIndex("by_chat_id", q => q.eq("chat_id", c._id)).order("desc").first()
            return {
                ...user,
                ...c,
                lastMessage
            }
        })

        const result = await Promise.all(promise)
        return result

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
        const doc = await ctx.db.get(chat.doctor)
        if (!doc) {
            throw new ConvexError("Chat Doctor not found")
        }
        const user = await ctx.db.get(doc.user_id)
        if (!user) {
            throw new ConvexError("Chat Doctor user not found")
        }

        return {
            ...user,
            ...chat,
        }
    },
});


// TODO!  make the current user also return a doctor id if you are a doctor or find another solution to where you are a doctor and you want to get the chats for him