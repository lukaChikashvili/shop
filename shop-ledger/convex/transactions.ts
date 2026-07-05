
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