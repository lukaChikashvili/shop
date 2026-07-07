import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listRoomsByLanguage = query({
    args: { language: v.string() },
    handler: async (ctx, { language }) => {

      const rooms = await ctx.db
        .query("rooms")
        .withIndex("by_language_status", (q) =>
          q.eq("language", language).eq("status", "waiting")
        )
        .order("desc")
        .collect();
   
      const active = await ctx.db
        .query("rooms")
        .withIndex("by_language_status", (q) =>
          q.eq("language", language).eq("status", "active")
        )
        .order("desc")
        .collect();
   
      const all = [...rooms, ...active];
   
 
      return await Promise.all(
        all.map(async (room) => {
          const participants = await ctx.db
            .query("participants")
            .withIndex("by_room_active", (q) =>
              q.eq("roomId", room._id).eq("leftAt", undefined)
            )
            .collect();
          return { ...room, participantCount: participants.length };
        })
      );
    },
  });

  export const getRoom = query({
    args: { roomId: v.id("rooms") },
    handler: async (ctx, { roomId }) => {
      const room = await ctx.db.get(roomId);
      if (!room) return null;
      const participants = await ctx.db
        .query("participants")
        .withIndex("by_room_active", (q) =>
          q.eq("roomId", roomId).eq("leftAt", undefined)
        )
        .collect();
      return { ...room, participants };
    },
  });


  export const createRoom = mutation({
    args: {
      language: v.string(),
      hostName: v.string(),
      maxParticipants: v.number(),
    },
    handler: async (ctx, { language, hostName, maxParticipants }) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Not authenticated");
   
      const roomId = await ctx.db.insert("rooms", {
        language,
        hostId: identity.subject,
        hostName,
        status: "waiting",
        maxParticipants: Math.min(Math.max(maxParticipants, 2), 6),
        createdAt: Date.now(),
      });
   
      await ctx.db.insert("participants", {
        roomId,
        userId: identity.subject,
        userName: hostName,
        joinedAt: Date.now(),
      });
   
      return roomId;
    },
  });



  export const joinRoom = mutation({
    args: { roomId: v.id("rooms"), userName: v.string() },
    handler: async (ctx, { roomId, userName }) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Not authenticated");
   
      const room = await ctx.db.get(roomId);

      if (!room) throw new Error("Room not found");
      if (room.status === "ended") throw new Error("Room has ended");
   
      const activeParticipants = await ctx.db
        .query("participants")
        .withIndex("by_room_active", (q) =>
          q.eq("roomId", roomId).eq("leftAt", undefined)
        )
        .collect();
   
      const alreadyIn = activeParticipants.find(
        (p) => p.userId === identity.subject
      );
   
      if (!alreadyIn) {
        if (activeParticipants.length >= room.maxParticipants) {
          throw new Error("Room is full");
        }
        await ctx.db.insert("participants", {
          roomId,
          userId: identity.subject,
          userName,
          joinedAt: Date.now(),
        });
      }
   
      if (room.status === "waiting") {
        await ctx.db.patch(roomId, { status: "active" });
      }
   
      return roomId;
    },
  });
   
  export const leaveRoom = mutation({
    args: { roomId: v.id("rooms") },
    handler: async (ctx, { roomId }) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Not authenticated");
   
      const participant = await ctx.db
        .query("participants")
        .withIndex("by_room_active", (q) =>
          q.eq("roomId", roomId).eq("leftAt", undefined)
        )
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .first();
   
      if (participant) {
        await ctx.db.patch(participant._id, { leftAt: Date.now() });
      }
   
      const remaining = await ctx.db
        .query("participants")
        .withIndex("by_room_active", (q) =>
          q.eq("roomId", roomId).eq("leftAt", undefined)
        )
        .collect();
   
      if (remaining.length === 0) {
        await ctx.db.patch(roomId, { status: "ended", endedAt: Date.now() });
      }
    },
  });



  async function recordConnectionsForRoom(ctx: any, roomId: any) {
    const allParticipants = await ctx.db
      .query("participants")
      .withIndex("by_room", (q: any) => q.eq("roomId", roomId))
      .collect();
   

    const uniqueByUser = new Map<string, { userId: string; userName: string }>();
    for (const p of allParticipants) {
      uniqueByUser.set(p.userId, { userId: p.userId, userName: p.userName });
    }
    const people = Array.from(uniqueByUser.values());
   
    for (const person of people) {
      for (const partner of people) {
        if (person.userId === partner.userId) continue;
   
        const existing = await ctx.db
          .query("connections")
          .withIndex("by_user_partner", (q: any) =>
            q.eq("userId", person.userId).eq("partnerId", partner.userId)
          )
          .first();
   
        if (existing) {
          await ctx.db.patch(existing._id, {
            sessionsCount: existing.sessionsCount + 1,
            lastPracticedAt: Date.now(),
            partnerName: partner.userName, 
          });
        } else {
          await ctx.db.insert("connections", {
            userId: person.userId,
            partnerId: partner.userId,
            partnerName: partner.userName,
            sessionsCount: 1,
            lastPracticedAt: Date.now(),
            favorited: false,
          });
        }
      }
    }
  }
   