import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.storage.generateUploadUrl();
  },
});

export const setProfileImage = mutation({
  args: {
    storageId: v.id("_storage"),
    kind: v.union(v.literal("avatar"), v.literal("banner")),
  },
  handler: async (ctx, { storageId, kind }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();

    const field = kind === "avatar" ? "profileImageId" : "bannerImageId";

    if (existing) {
     
      const oldId = existing[field];
      if (oldId) await ctx.storage.delete(oldId);

      await ctx.db.patch(existing._id, { [field]: storageId, updatedAt: Date.now() });
    } else {
      
      await ctx.db.insert("userProfiles", {
        userId: identity.subject,
        learningLanguages: [],
        [field]: storageId,
        updatedAt: Date.now(),
      });
    }
  },
});