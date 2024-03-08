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
    body: v.string(), patient: v.id("users"),
    doctor: v.id("doctors"),
  },
  handler: async (ctx, { body, doctor, patient }) => {
    // await ctx.db.insert("chats", { messages: });
  },
});