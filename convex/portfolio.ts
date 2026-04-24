import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const listDocuments = query({
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
  },
});

export const addDocument = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("documents", args);
  },
});

export const submitInquiry = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    honeypot: v.optional(v.string()), // Bot protection
  },
  handler: async (ctx, args) => {
    // 1. Bot Protection (Honeypot)
    if (args.honeypot) {
      console.log("Bot detected via honeypot");
      return { success: false, message: "Bot detected" };
    }

    // 2. Input Validation & Sanitization (Server-side)
    const name = args.name.trim().slice(0, 80);
    const email = args.email.trim().toLowerCase().slice(0, 160);
    const message = args.message.trim().slice(0, 2000);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.length < 1 || !emailRegex.test(email) || message.length < 10) {
      throw new Error("Invalid input validation failed on server.");
    }

    // 3. Rate Limiting (Prevention of abuse)
    // Limit to 3 inquiries per email per hour
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const recentInquiries = await ctx.db
      .query("inquiries")
      .withIndex("by_timestamp", (q) => q.gt("timestamp", oneHourAgo))
      .filter((q) => q.eq(q.field("email"), email))
      .collect();

    if (recentInquiries.length >= 3) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    // 4. Payload Size Check (implicit in slice, but explicit here)
    if (JSON.stringify(args).length > 5000) {
      throw new Error("Payload too large.");
    }

    const id = await ctx.db.insert("inquiries", {
      name,
      email,
      message,
      timestamp: Date.now(),
    });

    console.log("Inquiry saved to DB, scheduling email action...");

    // 5. Trigger the email action in the background
    await ctx.scheduler.runAfter(0, api.email.sendInquiryEmail, {
      name,
      email,
      message,
    });

    return { success: true, id };
  },
});

export const getResponse = query({
  args: { message: v.string() },
  handler: async (ctx, args) => {
    const docs = await ctx.db.query("documents").collect();

    // Simple RAG logic - searching for keywords in documents
    const queryStr = args.message.toLowerCase();
    const relevantDocs = docs.filter(doc =>
      doc.content.toLowerCase().includes(queryStr) ||
      doc.title.toLowerCase().includes(queryStr)
    );

    if (relevantDocs.length > 0) {
      return relevantDocs[0].content;
    }

    return "I'm your system assistant. I can answer questions about Sai's projects like Livekit_voiceAgent, RAG-LLM, or his experience in AI and DevOps.";
  },
});
