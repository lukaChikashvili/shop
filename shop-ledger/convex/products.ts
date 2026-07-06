
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

async function assertShopOwner(ctx: any, shopId: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");
  const shop = await ctx.db.get(shopId);
  if (!shop || shop.ownerId !== identity.subject) throw new Error("Forbidden");
  return shop;
}

export const lookupProductByBarcode = query({
  args: { shopId: v.id("shops"), barcode: v.string() },
  handler: async (ctx, args) => {
    await assertShopOwner(ctx, args.shopId);

    return await ctx.db
      .query("products")
      .withIndex("by_shop_and_barcode", (q) =>
        q.eq("shopId", args.shopId).eq("barcode", args.barcode)
      )
      .unique();
  },
});

export const createProduct = mutation({
  args: {
    shopId: v.id("shops"),
    barcode: v.string(),
    name: v.string(),
    price: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await assertShopOwner(ctx, args.shopId);

    if (args.name.trim().length < 1) throw new Error("NAME_REQUIRED");

   
    const existing = await ctx.db
      .query("products")
      .withIndex("by_shop_and_barcode", (q) =>
        q.eq("shopId", args.shopId).eq("barcode", args.barcode)
      )
      .unique();

    if (existing) throw new Error("BARCODE_ALREADY_EXISTS");

    const productId = await ctx.db.insert("products", {
      shopId: args.shopId,
      barcode: args.barcode,
      name: args.name.trim(),
      price: args.price,
      createdAt: Date.now(),
    });

    return productId;
  },
});