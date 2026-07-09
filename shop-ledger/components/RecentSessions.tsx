"use client";

import { useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Video } from "lucide-react";

const LANGUAGE_FLAGS: Record<string, string> = {
  spanish: "🇪🇸",
  english: "🇬🇧",
  chinese: "🇨🇳",
  georgian: "🇬🇪",
  french: "🇫🇷",
};

function formatDuration(ms: number | null) {
  if (ms === null) return "მიმდინარეობს";
  const minutes = Math.round(ms / 1000 / 60);
  if (minutes < 60) return `${minutes} წთ`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours} სთ ${rest} წთ`;
}

function formatWhen(ts: number) {
  const diffDays = Math.floor((Date.now() - ts) / (24 * 60 * 60 * 1000));
  if (diffDays === 0) return "დღეს";
  if (diffDays === 1) return "გუშინ";
  return `${diffDays} დღის წინ`;
}

export function RecentSessions() {
  const { isAuthenticated } = useConvexAuth();
  const sessions = useQuery(
    api.dashboard.listRecentSessions,
    isAuthenticated ? { limit: 6 } : "skip"
  );

  return (
    <div
      className="rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl"
      style={{
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 8px 24px -8px rgba(30,58,138,0.12)",
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#0F2647]">ბოლო სესიები</h2>
        <Link
          href="/rooms"
          className="text-sm font-medium text-[#0C4A8C] hover:underline"
        >
          ახალი ოთახი →
        </Link>
      </div>

      <div className="mt-4 flex flex-col divide-y divide-white/50">
        {sessions === undefined && (
          <p className="py-6 text-sm text-[#4A6B8C]">იტვირთება...</p>
        )}
        {sessions?.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Video size={22} className="text-[#4A6B8C]" />
            <p className="text-sm text-[#4A6B8C]">
              ჯერ არცერთ ოთახში არ ყოფილხარ — დაიწყე პირველი სესია.
            </p>
          </div>
        )}
        {sessions?.map((s, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {LANGUAGE_FLAGS[s.language] ?? "🌐"}
              </span>
              <div>
                <p className="text-sm font-medium capitalize text-[#0F2647]">
                  {s.language}
                </p>
                <p className="text-xs text-[#4A6B8C]">
                  {formatWhen(s.joinedAt)}
                </p>
              </div>
            </div>
            <span className="text-xs font-medium text-[#4A6B8C]">
              {formatDuration(s.durationMs)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}