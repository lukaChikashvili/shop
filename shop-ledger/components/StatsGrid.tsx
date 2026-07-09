"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Flame, Clock, Video, TrendingUp } from "lucide-react";

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  accent = false,
}: {
  icon: any;
  label: string;
  value: string | number;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border p-5 backdrop-blur-xl ${
        accent
          ? "border-white/30 bg-gradient-to-br from-[#1E3A8A]/85 to-[#38BDF8]/85 text-white"
          : "border-white/50 bg-white/30 text-[#0F2647]"
      }`}
      style={{
        boxShadow: accent
          ? "0 1px 0 0 rgba(255,255,255,0.4) inset, 0 8px 24px -6px rgba(30,58,138,0.45)"
          : "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 8px 24px -8px rgba(30,58,138,0.12)",
      }}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          accent ? "bg-white/15" : "bg-[#1E3A8A]/10 text-[#0C4A8C]"
        }`}
      >
        <Icon size={18} />
      </div>
      <p
        className={`mt-4 text-2xl font-bold ${
          accent ? "text-white" : "text-[#0F2647]"
        }`}
      >
        {value}
        {suffix && (
          <span className="ml-1 text-sm font-medium opacity-70">{suffix}</span>
        )}
      </p>
      <p className={`text-sm ${accent ? "text-white/80" : "text-[#4A6B8C]"}`}>
        {label}
      </p>
    </div>
  );
}

export function StatsGrid() {
  const overview = useQuery(api.dashboard.getDashboardOverview);

  if (overview === undefined) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border border-white/40 bg-white/20 backdrop-blur-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard
        icon={Flame}
        label="დღიანი სერია"
        value={overview.streakDays}
        suffix="დღე"
        accent
      />
      <StatCard
        icon={Clock}
        label="ივარჯიშე ამ კვირაში"
        value={overview.hoursThisWeek}
        suffix="სთ"
      />
      <StatCard
        icon={TrendingUp}
        label="სულ ივარჯიშე"
        value={overview.totalHoursPracticed}
        suffix="სთ"
      />
      <StatCard
        icon={Video}
        label="სულ სესია"
        value={overview.totalSessions}
      />
    </div>
  );
}