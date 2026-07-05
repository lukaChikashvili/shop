"use client";

import { useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Users, TrendingUp, TrendingDown, Plus, Receipt, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const params = useParams();
  const shopId = params.shopId as Id<"shops">;
  const { isAuthenticated, isLoading } = useConvexAuth();

  const data = useQuery(
    api.dashboard.getDashboardData,
    isAuthenticated ? { shopId } : "skip"
  );

  if (isLoading || (isAuthenticated && data === undefined)) {
    return (
      <main className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="text-[#4A5261]">იტვირთება...</div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="text-[#4A5261]">გთხოვთ გაიაროთ ავტორიზაცია</div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="text-[#4A5261]">მაღაზია ვერ მოიძებნა</div>
      </main>
    );
  }

  const { shop, stats, recentTransactions, topDebtors } = data;

  return (
    <main className="min-h-screen bg-[#F7F4EC] px-6 py-8 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1C2431]">{shop.name}</h1>
            <p className="text-[#4A5261] text-sm">{shop.city}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/${shopId}/customers`}
              className="flex items-center gap-2 bg-white text-[#1C2431] border border-[#DCD7C9] px-4 py-2.5 rounded-full font-medium text-sm hover:bg-[#F0EDE3] transition"
            >
              <Users size={16} strokeWidth={2.5} />
              მომხმარებლები
            </Link>
            <Link
              href={`/dashboard/${shopId}/transactions/new`}
              className="flex items-center gap-2 bg-[#2F5D3A] text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-[#254A2F] transition"
            >
              <Plus size={16} strokeWidth={2.5} />
              ტრანზაქციის დამატება
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={<TrendingUp size={20} />}
            label="სულ გმართებთ"
            value={`${stats.totalOwed.toFixed(2)} ${shop.currency}`}
            tone="warn"
          />
          <StatCard
            icon={<TrendingDown size={20} />}
            label="ბალანსი"
            value={`${stats.totalCredit.toFixed(2)} ${shop.currency}`}
            tone="good"
          />
          <StatCard
            icon={<Users size={20} />}
            label="მომხმარებლები"
            value={stats.customerCount.toString()}
            tone="neutral"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl border border-[#E8E3D6] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[#1C2431]">ყველაზე დიდი დავალიანება</h2>
              <Link
                href={`/dashboard/${shopId}/customers`}
                className="flex items-center gap-0.5 text-xs font-medium text-[#2F5D3A] hover:text-[#254A2F] transition"
              >
                ყველას ნახვა
                <ChevronRight size={14} />
              </Link>
            </div>
            {topDebtors.length === 0 ? (
              <p className="text-[#4A5261] text-sm">დავალიანება არ არის</p>
            ) : (
              <ul className="space-y-3">
                {topDebtors.map((c) => (
                  <li key={c._id} className="flex items-center justify-between">
                    <span className="text-[#1C2431] font-medium">{c.name}</span>
                    <span className="text-[#B45309] font-semibold">
                      {c.balance.toFixed(2)} {shop.currency}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="bg-white rounded-2xl border border-[#E8E3D6] p-6">
            <h2 className="font-semibold text-[#1C2431] mb-4">ბოლო ტრანზაქციები</h2>
            {recentTransactions.length === 0 ? (
              <div className="text-center py-6">
                <Receipt className="mx-auto mb-2 text-[#DCD7C9]" size={28} />
                <p className="text-[#4A5261] text-sm">ჯერ არ არის ტრანზაქციები</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentTransactions.map((t) => (
                  <li key={t._id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-[#1C2431] font-medium">{t.customerName}</p>
                      <p className="text-[#4A5261] text-xs">
                        {new Date(t.createdAt).toLocaleDateString("ka-GE")}
                      </p>
                    </div>
                    <span
                      className={
                        t.type === "payment_received"
                          ? "text-[#2F5D3A] font-semibold"
                          : "text-[#B45309] font-semibold"
                      }
                    >
                      {t.type === "payment_received" ? "+" : "-"}
                      {t.amount.toFixed(2)} {shop.currency}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "good" | "warn" | "neutral";
}) {
  const toneStyles = {
    good: "text-[#2F5D3A] bg-[#EAF3EC]",
    warn: "text-[#B45309] bg-[#FDF2E7]",
    neutral: "text-[#4A5261] bg-[#F0EDE3]",
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8E3D6] p-5 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${toneStyles[tone]}`}>{icon}</div>
      <div>
        <p className="text-[#4A5261] text-xs font-medium">{label}</p>
        <p className="text-[#1C2431] font-bold text-lg">{value}</p>
      </div>
    </div>
  );
}