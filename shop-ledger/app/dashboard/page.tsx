"use client";

import { Connections } from "@/components/Connections";
import { ProfileSummary } from "@/components/ProfileSummery";
import { RecentSessions } from "@/components/RecentSessions";
import { StatsGrid } from "@/components/StatsGrid";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#F5FAFF]" />
      <div className="pointer-events-none fixed -top-40 -right-40 -z-10 h-96 w-96 rounded-full bg-[#38BDF8]/20 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-[#1E3A8A]/15 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[#0F2647]">
              გამარჯობა, {user?.firstName ?? "მოსწავლე"} 👋
            </h1>
            <p className="mt-0.5 text-sm text-[#4A6B8C]">
              გავაგრძელოთ ვარჯიში.
            </p>
          </div>
          <Link
            href="/rooms"
            className="relative rounded-full bg-gradient-to-r from-[#1E3A8A]/80 to-[#38BDF8]/80 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-xl border border-white/40 hover:from-[#1E3A8A]/95 hover:to-[#38BDF8]/95 transition-all"
            style={{
              boxShadow:
                "0 1px 0 0 rgba(255,255,255,0.5) inset, 0 6px 20px -4px rgba(30,58,138,0.55)",
            }}
          >
            ოთახში შესვლა
          </Link>
        </div>

        <div className="mt-6">
          <StatsGrid />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentSessions />
          </div>
          <div>
            <ProfileSummary />
          </div>
        </div>

        <div className="mt-6">
          <Connections />
        </div>
      </div>
    </div>
  );
}