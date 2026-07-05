
import { mutation } from "./_generated/server";
import { v } from "convex/values";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ა-ჰ\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function isValidGeorgianPhone(phone: string) {
 
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(\+995)?5\d{8}$/.test(cleaned);
}

export const createShop = mutation({
  args: {
    name: v.string(),
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const ownerId = identity.subject;

    if (!isValidGeorgianPhone(args.phone)) {
      throw new Error("INVALID_PHONE");
    }

    const existing = await ctx.db
      .query("shops")
      .withIndex("by_owner", (q) => q.eq("ownerId", ownerId))
      .collect();

    if (existing.length >= 1) {
      throw new Error("SHOP_LIMIT_REACHED");
    }

    let baseSlug = slugify(args.name);
    let slug = baseSlug;
    let counter = 1;

    while (
      await ctx.db
        .query("shops")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .unique()
    ) {
      slug = `${baseSlug}-${counter++}`;
    }

    const shopId = await ctx.db.insert("shops", {
      ownerId,
      name: args.name.trim(),
      slug,
      category: args.category,
      city: args.city.trim(),
      phone: args.phone.replace(/[\s-]/g, ""),
      currency: args.currency,
      isActive: true,
      plan: "free",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return shopId;
  },
});


