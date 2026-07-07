"use client";

import Link from "next/link";
import { Play, Star, Video, Sparkles, BookOpen, TrendingUp } from "lucide-react";



const LEARNERS = [
  { initials: "A", gradient: "from-[#F59E0B] to-[#F97316]" },
  { initials: "L", gradient: "from-[#6C5CE7] to-[#8B5CF6]" },
  { initials: "M", gradient: "from-[#10B981] to-[#059669]" },
  { initials: "K", gradient: "from-[#EC4899] to-[#DB2777]" },
];

function VideoTile({
  initials,
  name,
  flag,
  gradient,
  className = "",
}: {
  initials: string;
  name: string;
  flag: string;
  gradient: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-xl shadow-[#6C5CE7]/10 ${className}`}
    >
      <div
        className={`aspect-[4/5] bg-gradient-to-br ${gradient} flex items-center justify-center`}
      >
        <span className="text-3xl font-bold text-white/90">{initials}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1.5 px-2.5 py-2 bg-gradient-to-t from-black/50 to-transparent">
        <span className="text-sm">{flag}</span>
        <span className="text-xs font-medium text-white">{name}</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-8 md:px-12 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#6C5CE7]/20 bg-[#6C5CE7]/5 px-3 py-1 text-xs font-medium text-[#6C5CE7]">
            <Sparkles size={12} />
            ცოცხალი პრაქტიკა მშობლიურ მოლაპარაკეებთან
          </div>

          <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#1E1B2E]">
            ილაპარაკე მეტი.
            <br />
            ისწავლე{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#8B5CF6] bg-clip-text text-transparent">
              უფრო სწრაფად.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#6B7280]">
            ივარჯიშე ენაზე საუბარი მშობლიურ მოლაპარაკეებთან ერთად — ცოცხალი
            ვიდეო ოთახებით, ორმხრივი გაცვლით და რეალური საუბრებით.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/rooms"
              className="rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#6C5CE7]/25 transition-opacity hover:opacity-90"
            >
              დაიწყე უფასოდ
            </Link>
            <button className="flex items-center gap-2 rounded-full border border-[#ECECF3] px-6 py-3 text-sm font-medium text-[#1E1B2E] transition-colors hover:bg-[#F7F7FB]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1E1B2E]">
                <Play size={9} fill="white" className="text-white ml-0.5" />
              </span>
              ნახე დემო
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {LEARNERS.map((l, i) => (
                <div
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${l.gradient} text-xs font-semibold text-white ring-2 ring-white`}
                >
                  {l.initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-[#F59E0B]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-xs text-[#6B7280]">
                4.9/5 · 1,200+ მომხმარებელი საქართველოდან და მსოფლიოს 100+ ქვეყნიდან
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#ECECF3] pt-8 sm:grid-cols-4">
            {[
              { icon: Video, label: "ცოცხალი საუბრები" },
              { icon: Sparkles, label: "AI გამოხმაურება" },
              { icon: BookOpen, label: "ლექსიკის ბანკი" },
              { icon: TrendingUp, label: "პროგრესის თვალყური" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} className="text-[#6C5CE7] shrink-0" />
                <span className="text-xs font-medium text-[#6B7280]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: illustrative video-room mockup */}
        <div className="relative hidden lg:block">
          <div className="grid grid-cols-2 gap-4">
            <VideoTile
              initials="A"
              name="Anna · Native English"
              flag="🇬🇧"
              gradient="from-[#8B5CF6] to-[#6C5CE7]"
              className="mt-10"
            />
            <VideoTile
              initials="L"
              name="Luka · Georgian"
              flag="🇬🇪"
              gradient="from-[#F59E0B] to-[#F97316]"
            />
            <VideoTile
              initials="M"
              name="Maria · Spain"
              flag="🇪🇸"
              gradient="from-[#10B981] to-[#059669]"
            />
            <VideoTile
              initials="K"
              name="Ken · Japan"
              flag="🇯🇵"
              gradient="from-[#EC4899] to-[#DB2777]"
              className="mt-10"
            />
          </div>

          {/* floating chat bubbles */}
          <div className="absolute -left-6 top-16 rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 shadow-lg shadow-[#1E1B2E]/10 border border-[#ECECF3]">
            <p className="text-xs font-medium text-[#1E1B2E]">
              მოხარული ვარ გაცნობით! 👋
            </p>
          </div>
          <div className="absolute -right-4 bottom-24 rounded-2xl rounded-br-sm bg-[#1E1B2E] px-4 py-2.5 shadow-lg">
            <p className="text-xs font-medium text-white">Nice to meet you!</p>
          </div>

          {/* decorative streak accent */}
          <div className="absolute -top-6 -right-2 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-lg shadow-[#1E1B2E]/10 border border-[#ECECF3]">
            <span className="text-base">🔥</span>
            <span className="text-xs font-semibold text-[#1E1B2E]">17 დღე</span>
          </div>
        </div>
      </div>
    </section>
  );
}