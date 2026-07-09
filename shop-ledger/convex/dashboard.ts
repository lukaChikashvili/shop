import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const DAY_MS = 24 * 60 * 60 * 1000;


export const getDashboardOverview = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    const allSessions = await ctx.db
      .query("participants")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();


    const completed = allSessions.filter((s) => s.leftAt !== undefined);

    const totalMs = completed.reduce(
      (sum, s) => sum + (s.leftAt! - s.joinedAt),
      0
    );

    const weekAgo = Date.now() - 7 * DAY_MS;
    const thisWeek = completed.filter((s) => s.joinedAt >= weekAgo);
    const weekMs = thisWeek.reduce((sum, s) => sum + (s.leftAt! - s.joinedAt), 0);

    const streak = computeStreak(completed.map((s) => s.joinedAt));

    return {
      totalHoursPracticed: Math.round((totalMs / 1000 / 60 / 60) * 10) / 10,
      hoursThisWeek: Math.round((weekMs / 1000 / 60 / 60) * 10) / 10,
      sessionsThisWeek: thisWeek.length,
      totalSessions: completed.length,
      streakDays: streak,
    };
  },
});


function computeStreak(joinTimestamps: number[]): number {
  if (joinTimestamps.length === 0) return 0;

  const dayKeys = new Set(
    joinTimestamps.map((ts) => Math.floor(ts / DAY_MS))
  );

  const todayKey = Math.floor(Date.now() / DAY_MS);
  let streak = 0;
  let cursor = todayKey;


  if (!dayKeys.has(cursor)) {
    cursor -= 1;
  }

  while (dayKeys.has(cursor)) {
    streak += 1;
    cursor -= 1;
  }

  return streak;
}


export const listRecentSessions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 5 }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const sessions = await ctx.db
      .query("participants")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .take(limit);

    return await Promise.all(
      sessions.map(async (s) => {
        const room = await ctx.db.get(s.roomId);
        return {
          roomId: s.roomId,
          language: room?.language ?? "unknown",
          joinedAt: s.joinedAt,
          leftAt: s.leftAt,
          durationMs: s.leftAt ? s.leftAt - s.joinedAt : null,
        };
      })
    );
  },
});


export const getProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();

    if (!profile) return null;

    return {
      ...profile,
      profileImageUrl: profile.profileImageId
        ? await ctx.storage.getUrl(profile.profileImageId)
        : null,
      bannerImageUrl: profile.bannerImageId
        ? await ctx.storage.getUrl(profile.bannerImageId)
        : null,
    };
  },
});



export const upsertProfile = mutation({
  args: {
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
    bio: v.optional(v.string()),
    hobbies: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();

    const payload = { ...args, updatedAt: Date.now() };

    if (existing) {
      await ctx.db.patch(existing._id, payload);
    } else {
      await ctx.db.insert("userProfiles", { userId: identity.subject, ...payload });
    }
  },
});


export const listConnections = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const connections = await ctx.db
      .query("connections")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    
    return connections.sort((a, b) => {
      if (a.favorited !== b.favorited) return a.favorited ? -1 : 1;
      return b.lastPracticedAt - a.lastPracticedAt;
    });
  },
});

export const toggleFavoriteConnection = mutation({
  args: { connectionId: v.id("connections") },
  handler: async (ctx, { connectionId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const connection = await ctx.db.get(connectionId);
    if (!connection || connection.userId !== identity.subject) {
      throw new Error("Not found");
    }

    await ctx.db.patch(connectionId, { favorited: !connection.favorited });
  },
});



export const syncProfileFromClerk = mutation({
  args: {
    displayName: v.string(),
    clerkImageUrl: v.optional(v.string()),
  },
  handler: async (ctx, { displayName, clerkImageUrl }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();

    if (existing) {
     
      if (existing.displayName !== displayName || existing.clerkImageUrl !== clerkImageUrl) {
        await ctx.db.patch(existing._id, { displayName, clerkImageUrl });
      }
    } else {
      await ctx.db.insert("userProfiles", {
        userId: identity.subject,
        displayName,
        clerkImageUrl,
        learningLanguages: [],
        updatedAt: Date.now(),
      });
    }
  },
});