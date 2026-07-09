import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const searchUsers = query({
  args: {
    searchTerm: v.string(),
    language: v.optional(v.string()),
  },
  handler: async (ctx, { searchTerm, language }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const me = identity.subject;

    let profiles = await ctx.db.query("userProfiles").collect();
    profiles = profiles.filter((p) => p.userId !== me);

    if (language) {
      profiles = profiles.filter(
        (p) =>
          p.learningLanguages.some((l) => l.language === language) ||
          p.nativeLanguage === language
      );
    }

    
    const existingConnections = await ctx.db
      .query("connections")
      .withIndex("by_user", (q) => q.eq("userId", me))
      .collect();
    const connectedIds = new Set(existingConnections.map((c) => c.partnerId));

   
    const outgoingReqs = await ctx.db
      .query("connectionRequests")
      .withIndex("by_requester", (q) => q.eq("requesterId", me))
      .collect();
    const incomingReqs = await ctx.db
      .query("connectionRequests")
      .withIndex("by_recipient", (q) => q.eq("recipientId", me))
      .collect();

    const requestMap = new Map();
    for (const r of outgoingReqs) requestMap.set(r.recipientId, { status: r.status, direction: "outgoing" });
    for (const r of incomingReqs) requestMap.set(r.requesterId, { status: r.status, direction: "incoming" });

    return await Promise.all(
        profiles.map(async (p) => ({
          userId: p.userId,
          displayName: p.displayName,
          clerkImageUrl: p.clerkImageUrl,
          profileImageUrl: p.profileImageId ? await ctx.storage.getUrl(p.profileImageId) : null,
          nativeLanguage: p.nativeLanguage,
          learningLanguages: p.learningLanguages,
          bio: p.bio,
          hobbies: p.hobbies,
          isConnected: connectedIds.has(p.userId),
          requestStatus: requestMap.get(p.userId) ?? null,
        }))
      );
  },
});

export const sendConnectionRequest = mutation({
  args: { recipientId: v.string(), requesterName: v.string() },
  handler: async (ctx, { recipientId, requesterName }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const me = identity.subject;
    if (me === recipientId) throw new Error("Can't invite yourself");

    const existing = await ctx.db
      .query("connectionRequests")
      .withIndex("by_pair", (q) => q.eq("requesterId", me).eq("recipientId", recipientId))
      .unique();
    if (existing) return existing._id;

    return await ctx.db.insert("connectionRequests", {
      requesterId: me,
      requesterName,
      recipientId,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const respondToRequest = mutation({
  args: {
    requestId: v.id("connectionRequests"),
    accept: v.boolean(),
    myName: v.string(), 
  },
  handler: async (ctx, { requestId, accept, myName }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const me = identity.subject;

    const request = await ctx.db.get(requestId);
    if (!request || request.recipientId !== me) throw new Error("Not found");

    await ctx.db.patch(requestId, { status: accept ? "accepted" : "declined" });

    if (accept) {
      const now = Date.now();

      await ctx.db.insert("connections", {
        userId: request.requesterId,
        partnerId: me,
        partnerName: myName,
        sessionsCount: 0,
        lastPracticedAt: now,
        favorited: false,
      });
      await ctx.db.insert("connections", {
        userId: me,
        partnerId: request.requesterId,
        partnerName: request.requesterName,
        sessionsCount: 0,
        lastPracticedAt: now,
        favorited: false,
      });
    }
  },
});

export const getIncomingRequests = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("connectionRequests")
      .withIndex("by_recipient", (q) => q.eq("recipientId", identity.subject))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .collect();
  },
});



export const getPublicProfile = query({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
      const profile = await ctx.db
        .query("userProfiles")
        .withIndex("by_user", (q) => q.eq("userId", userId))
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