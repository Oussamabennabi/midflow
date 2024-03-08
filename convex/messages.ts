import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const like = mutation({
  args: {
    liker: v.union(v.id("doctors"), v.id("users")),
    messageId: v.id("messages")
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("likes", {
      liker: args.liker,
      messageId: args.messageId,
    });
  },
});


// export const list = query({
//   args: {
//     patient: v.id("users"),
//     doctor: v.id("doctors"),
//   },
//   handler: async (ctx, { doctor, patient }) => {
//     // Grab the most recent messages.
//     const messages = await ctx.db.query("messages").
//       withIndex("by_patient_doctor", q => q.eq("doctor", doctor).eq("patient", patient)).
//       order("desc").take(100);
//     const messagesWithLikes = await Promise.all(
//       messages.map(async (message) => {
//         const likes = await ctx.db
//           .query("likes")
//           .withIndex("byMessageId", (q) => q.eq("messageId", message._id))
//           .collect();
//         return {
//           ...message,
//           likes: likes.length,
//         };
//       }),
//     );

//     return messagesWithLikes.reverse().map((message) => ({
//       ...message,
//       // Format smileys
//       body: message.body.replaceAll(":)", "😊"),
//     }));
//   },
// });


export const send = mutation({
  args: {
    chat_id: v.id("chats"),
    body: v.string(),
    sender_id: v.union(v.id("users"), v.id("doctors"))
  },
  handler: async (ctx, { body, chat_id, sender_id }) => {
    const id = await ctx.db.insert("messages", { body, chat_id, sender_id });
  },
});


export const get_by_chat = query({
  args: {
    chat_id: v.id("chats")
  },
  async handler(ctx, { chat_id }) {

    const messages = await ctx.db.query("messages").
      withIndex("by_chat_id", q => q.eq("chat_id", chat_id)).order("desc").
      take(100)

    return messages
  },
}) 