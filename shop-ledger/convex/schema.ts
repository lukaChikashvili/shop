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

    userProfiles: defineTable({
      userId: v.string(), 
      nativeLanguage: v.optional(v.string()),
      learningLanguages: v.array(
        v.object({
          language: v.string(),
          level: v.union(
            v.literal("beginner"),
            v.literal("intermediate"),
            v.literal("advanced")
          ),
        })
      ),
      goal: v.optional(v.string()), 
      updatedAt: v.number(),
      profileImageId: v.optional(v.id("_storage")),
      bannerImageId: v.optional(v.id("_storage")),
    }).index("by_user", ["userId"]),


    connections: defineTable({
      userId: v.string(),
      partnerId: v.string(),
      partnerName: v.string(),
      sessionsCount: v.number(),
      lastPracticedAt: v.number(),
      favorited: v.boolean(),
    })
      .index("by_user", ["userId"])
      .index("by_user_partner", ["userId", "partnerId"]),








});