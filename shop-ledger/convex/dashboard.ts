import { query } from "./_generated/server";
import { v } from "convex/values";

export const getDashboardData = query({
  args: { shopId: v.id("shops") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const shop = await ctx.db.get(args.shopId);
    if (!shop || shop.ownerId !== identity.subject) {
      throw new Error("Forbidden");
    }

    const customers = await ctx.db
      .query("customers")
      .withIndex("by_shop", (q) => q.eq("shopId", args.shopId))
      .collect();

    const totalOwed = customers.reduce((sum, c) => sum + Math.max(c.balance, 0), 0);
    const totalCredit = customers.reduce((sum, c) => sum + Math.max(-c.balance, 0), 0);

    const allTransactions = await ctx.db
      .query("transactions")
      .withIndex("by_shop", (q) => q.eq("shopId", args.shopId))
      .collect();

    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTodayMs = startOfToday.getTime();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    const startOfMonthMs = startOfMonth.getTime();

    let totalReceivedAllTime = 0;
    let totalReceivedToday = 0;
    let totalReceivedThisMonth = 0;

    for (const t of allTransactions) {
      if (t.type === "sale" || t.type === "payment_received") {
        totalReceivedAllTime += t.amount;
        if (t.createdAt >= startOfTodayMs) {
          totalReceivedToday += t.amount;
        }
        if (t.createdAt >= startOfMonthMs) {
          totalReceivedThisMonth += t.amount;
        }
      }
    }

    const recentTransactions = await ctx.db
      .query("transactions")
      .withIndex("by_shop_and_date", (q) => q.eq("shopId", args.shopId))
      .order("desc")
      .take(10);

    const transactionsWithNames = await Promise.all(
      recentTransactions.map(async (t) => {
        const customer = t.customerId ? await ctx.db.get(t.customerId) : null;
        return { ...t, customerName: customer?.name ?? "ნაღდი გაყიდვა" };
      })
    );

    const topDebtors = customers
      .filter((c) => c.balance > 0)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 5);

    return {
      shop,
      stats: {
        totalOwed,
        totalCredit,
        totalReceivedToday,
        totalReceivedThisMonth,
        totalReceivedAllTime,
        customerCount: customers.length,
        transactionCount: recentTransactions.length,
      },
      recentTransactions: transactionsWithNames,
      topDebtors,
    };
  },
});
