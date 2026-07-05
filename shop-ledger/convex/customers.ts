
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

async function assertShopOwner(ctx: any, shopId: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");
  const shop = await ctx.db.get(shopId);
  if (!shop || shop.ownerId !== identity.subject) throw new Error("Forbidden");
  return shop;
}

export const searchCustomers = query({
  args: { shopId: v.id("shops"), searchTerm: v.string() },
  handler: async (ctx, args) => {
    await assertShopOwner(ctx, args.shopId);

    const all = await ctx.db
      .query("customers")
      .withIndex("by_shop", (q) => q.eq("shopId", args.shopId))
      .collect();

    const term = args.searchTerm.trim().toLowerCase();
    if (!term) return all.slice(0, 8);

    return all
      .filter((c) => c.name.toLowerCase().includes(term))
      .slice(0, 8);
  },
});

export const createCustomer = mutation({
  args: { shopId: v.id("shops"), name: v.string(), phone: v.optional(v.string()) },
  handler: async (ctx, args) => {
    await assertShopOwner(ctx, args.shopId);

    if (args.name.trim().length < 1) throw new Error("NAME_REQUIRED");

    const customerId = await ctx.db.insert("customers", {
      shopId: args.shopId,
      name: args.name.trim(),
      phone: args.phone?.trim(),
      balance: 0,
      createdAt: Date.now(),
    });

    return customerId;
  },
});


export const listCustomers = query({
  args: { shopId: v.id("shops"), searchTerm: v.optional(v.string()) },
  handler: async (ctx, args) => {
    await assertShopOwner(ctx, args.shopId);

    const all = await ctx.db
      .query("customers")
      .withIndex("by_shop", (q) => q.eq("shopId", args.shopId))
      .collect();

    const term = args.searchTerm?.trim().toLowerCase();
    const filtered = term
      ? all.filter((c) => c.name.toLowerCase().includes(term))
      : all;

   
    return filtered.sort((a, b) => b.balance - a.balance);
  },
});


export const getCustomerDetail = query({
  args: { shopId: v.id("shops"), customerId: v.id("customers") },
  handler: async (ctx, args) => {
    await assertShopOwner(ctx, args.shopId);

    const customer = await ctx.db.get(args.customerId);
    if (!customer || customer.shopId !== args.shopId) {
      throw new Error("Forbidden");
    }

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .order("desc")
      .collect();

    return { customer, transactions };
  },
});