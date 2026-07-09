"use client";

import { useMutation, useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Star, Users } from "lucide-react";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatWhen(ts: number) {
  const diffDays = Math.floor((Date.now() - ts) / (24 * 60 * 60 * 1000));
  if (diffDays === 0) return "დღეს";
  if (diffDays === 1) return "გუშინ";
  return `${diffDays} დღის წინ`;
}

export function Connections() {
  const { isAuthenticated } = useConvexAuth();
  const connections = useQuery(
    api.dashboard.listConnections,
    isAuthenticated ? {} : "skip"
  );
  const toggleFavorite = useMutation(api.dashboard.toggleFavoriteConnection);

  return (
    <div
      className="rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl"
      style={{
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 8px 24px -8px rgba(30,58,138,0.12)",
      }}
    >
      <h2 className="font-semibold text-[#0F2647]">პარტნიორები</h2>

      <div className="mt-4 flex flex-col divide-y divide-white/50">
        {connections === undefined && (
          <p className="py-6 text-sm text-[#4A6B8C]">იტვირთება...</p>
        )}
        {connections?.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Users size={22} className="text-[#4A6B8C]" />
            <p className="text-sm text-[#4A6B8C]">
              ჯერ არავისთან გისაუბრია — შემდეგი ოთახი დაგამატებს პარტნიორებს
              აქ ავტომატურად.
            </p>
          </div>
        )}
        {connections?.map((c) => (
          <div key={c._id} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#38BDF8] text-xs font-semibold text-white">
                {initialsOf(c.partnerName)}
              </div>
              <div>
                <p className="text-sm font-medium text-[#0F2647]">
                  {c.partnerName}
                </p>
                <p className="text-xs text-[#4A6B8C]">
                  {c.sessionsCount} სესია · {formatWhen(c.lastPracticedAt)}
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite({ connectionId: c._id })}
              className="text-[#4A6B8C] transition-colors hover:text-[#F59E0B]"
              aria-label={
                c.favorited ? "ფავორიტებიდან ამოშლა" : "ფავორიტებში დამატება"
              }
            >
              <Star
                size={18}
                fill={c.favorited ? "#F59E0B" : "none"}
                className={c.favorited ? "text-[#F59E0B]" : ""}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}