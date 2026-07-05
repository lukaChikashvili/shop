import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";


export default defineSchema({
    ...authTables,

    shops: defineTable({
         ownerId: v.id("users"),
         name: v.string(),
         category: v.string(),
         city: v.string(),
         createdAt: v.number(),
    }).index("by_owner", ["ownerId"])
});

