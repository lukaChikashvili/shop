import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    language: v.string(), 
    hostId: v.string(), 
    hostName: v.string(),
    status: v.union(v.literal("waiting"), v.literal("active"), v.literal("ended")),
    maxParticipants: v.number(), 
    createdAt: v.number(),
    endedAt: v.optional(v.number()),
  })
    .index("by_language_status", ["language", "status"])
    .index("by_status", ["status"]),

  participants: defineTable({
    roomId: v.id("rooms"),
    userId: v.string(), 
    userName: v.string(),
    joinedAt: v.number(),
    leftAt: v.optional(v.number()),
  })
    .index("by_room", ["roomId"])
    .index("by_room_active", ["roomId", "leftAt"])
    .index("by_user", ["userId"]),
});