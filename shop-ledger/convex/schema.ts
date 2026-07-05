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
    phone: v.string(),
    currency: v.union(v.literal("GEL"), v.literal("USD"), v.literal("EUR")),
    isActive: v.boolean(),
    plan: v.union(v.literal("free"), v.literal("pro")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_slug", ["slug"]),
});