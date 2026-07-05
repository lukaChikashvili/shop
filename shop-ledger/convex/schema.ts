import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";



export default defineSchema({
  shops: defineTable({
    ownerId: v.string(),
    name: v.string(),
    slug: v.string(),
    category: v.union(
      v.literal("clothing"),
      v.literal("electronics"),
      v.literal("food"),
      v.literal("pharmacy"),
      v.literal("hardware"),
      v.literal("other")
    ),
    city: v.string(),
    currency: v.string(), 
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    isActive: v.boolean(), 
    plan: v.union(v.literal("free"), v.literal("pro")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_slug", ["slug"]), 
});