import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    content: v.string(),
    type: v.string(), // 'project', 'skill', 'bio'
    metadata: v.optional(v.any()),
  }).index("by_type", ["type"]),
  messages: defineTable({
    role: v.string(), // 'user', 'assistant'
    content: v.string(),
    timestamp: v.number(),
  }),
  inquiries: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    timestamp: v.number(),
  }).index("by_timestamp", ["timestamp"]),
});
