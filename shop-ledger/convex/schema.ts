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



    customers: defineTable({
        shopId: v.id("shops"),
        name: v.string(),
        phone: v.optional(v.string()),
        balance: v.number(), 
        createdAt: v.number(),
      })
        .index("by_shop", ["shopId"])
        .index("by_shop_and_balance", ["shopId", "balance"]),

        transactions: defineTable({
            shopId: v.id("shops"),
            customerId: v.optional(v.id("customers")), 
            type: v.union(v.literal("credit_given"), v.literal("payment_received"), v.literal("sale")),
            amount: v.number(), 
            note: v.optional(v.string()),
            createdAt: v.number(),
          })
            .index("by_shop", ["shopId"])
            .index("by_shop_and_date", ["shopId", "createdAt"])
            .index("by_customer", ["customerId"]),
});