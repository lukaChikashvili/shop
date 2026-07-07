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