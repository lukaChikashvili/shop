
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addTransaction = mutation({
  args: {
    shopId: v.id("shops"),
    customerId: v.optional(v.id("customers")),
    type: v.union(v.literal("credit_given"), v.literal("payment_received"), v.literal("sale")),
    amount: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const shop = await ctx.db.get(args.shopId);
    if (!shop || shop.ownerId !== identity.subject) throw new Error("Forbidden");

    if (args.amount <= 0) throw new Error("INVALID_AMOUNT");

    
    if (args.type !== "sale" && !args.customerId) {
      throw new Error("CUSTOMER_REQUIRED");
    }

    let customer = null;
    if (args.customerId) {
      customer = await ctx.db.get(args.customerId);
      if (!customer || customer.shopId !== args.shopId) throw new Error("Forbidden");
    }

   
    if (customer) {
      const delta =
        args.type === "credit_given" ? args.amount :
        args.type === "payment_received" ? -args.amount :
        0;

      if (delta !== 0) {
        await ctx.db.patch(customer._id, { balance: customer.balance + delta });
      }
    }

    const transactionId = await ctx.db.insert("transactions", {
      shopId: args.shopId,
      customerId: args.customerId,
      type: args.type,
      amount: args.amount,
      note: args.note?.trim(),
      createdAt: Date.now(),
    });

    return transactionId;
  },
});



function balanceDelta(type: "credit_given" | "payment_received" | "sale", amount: number) {
  if (type === "credit_given") return amount;
  if (type === "payment_received") return -amount;
  return 0; 
}


export const updateTransaction = mutation({
  args: {
    shopId: v.id("shops"),
    transactionId: v.id("transactions"),
    type: v.union(v.literal("credit_given"), v.literal("payment_received"), v.literal("sale")),
    amount: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const shop = await ctx.db.get(args.shopId);
    if (!shop || shop.ownerId !== identity.subject) throw new Error("Forbidden");

    if (args.amount <= 0) throw new Error("INVALID_AMOUNT");

    const existing = await ctx.db.get(args.transactionId);
    if (!existing || existing.shopId !== args.shopId) throw new Error("Forbidden");

    if (args.type !== "sale" && !existing.customerId) {
      throw new Error("CUSTOMER_REQUIRED");
    }

    
    if (existing.customerId) {
      const customer = await ctx.db.get(existing.customerId);
      if (!customer) throw new Error("Forbidden");

      const oldDelta = balanceDelta(existing.type, existing.amount);
      const newDelta = balanceDelta(args.type, args.amount);
      const netChange = newDelta - oldDelta;

      if (netChange !== 0) {
        await ctx.db.patch(customer._id, { balance: customer.balance + netChange });
      }
    }

    await ctx.db.patch(args.transactionId, {
      type: args.type,
      amount: args.amount,
      note: args.note?.trim(),
    });

    return args.transactionId;
  },
});