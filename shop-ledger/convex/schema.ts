import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  shops: defineTable({
    ownerId: v.string(), 
    name: v.string(),
    category: v.string(),
    city: v.string(),
    createdAt: v.number(),
  }).index("by_owner", ["ownerId"]),
});