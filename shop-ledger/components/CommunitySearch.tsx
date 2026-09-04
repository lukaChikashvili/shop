"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Search, UserPlus, Check, Clock, Sparkles } from "lucide-react";
import { LANGUAGE_FLAGS, LANGUAGE_LABELS_KA } from "@/lib/languageFlags";

const LANGUAGES = ["spanish", "english", "chinese", "georgian", "french"];

export function CommunitySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("");
  const { user } = useUser();
  const myName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const results = useQuery(api.community.searchUsers, {
    searchTerm,
    language: language || undefined,
  });

  return (
    <div className="w-full">
      {/* ფილტრები - სუფთა თეთრი ინფუთები დახვეწილი ჩრდილით */}
      <div className="flex flex-col gap-4 sm:flex-row justify-center max-w-3xl mx-auto">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="მოძებნე მეგობრები სახელით..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition-all shadow-[0_4px_12px_rgba(0,0,0,0.03)] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5"
          />
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 outline-none transition-all shadow-[0_4px_12px_rgba(0,0,0,0.03)] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 cursor-pointer min-w-[160px]"
        >
          <option value="">ყველა ენა</option>
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {LANGUAGE_LABELS_KA[l]}
            </option>
          ))}
        </select>
      </div>

      {/* ბარათების ბადე (Grid) */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results === undefined && (
          <>
            <div className="h-[280px] animate-pulse rounded-3xl bg-slate-100/80 border border-slate-100" />
            <div className="h-[280px] animate-pulse rounded-3xl bg-slate-100/80 border border-slate-100" />
            <div className="h-[280px] animate-pulse rounded-3xl bg-slate-100/80 border border-slate-100" />
          </>
        )}

        {results?.length === 0 && (
          <div className="col-span-full rounded-2xl bg-slate-50 border border-slate-100 py-16 text-center">
            <p className="text-sm font-medium text-slate-500">
              შედეგები არ მოიძებნა.
            </p>
          </div>
        )}

        {results?.map((person) => (
          <PersonCard key={person.userId} person={person} myName={myName} />
        ))}
      </div>
    </div>
  );
}

function PersonCard({
    person,
    myName,
  }: {
    person: {
      userId: string;
      displayName?: string;
      clerkImageUrl?: string | null;
      profileImageUrl?: string | null;
      nativeLanguage?: string;
      learningLanguages: { language: string; level: string }[];
      bio?: string;
      isConnected: boolean;
      requestStatus: { status: string; direction: string } | null;
    };
    myName: string;
  }) {
    const avatar = person.profileImageUrl ?? person.clerkImageUrl;
  
    return (
      // მუქი ოკეანისფერი გრადიენტი, რომელიც სკრინშოტის მთავარ ფერებს იმეორებს
      <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1E36] via-[#0F2647] to-[#1E3A8A] p-6 shadow-[0_12px_30px_rgba(15,38,71,0.15)] border border-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,38,71,0.3)]">
        
        {/* გრადიენტის რბილი განათება შიგნიდან ეფექტისთვის */}
        <div className="absolute -right-10 -top-10 -z-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />
  
        <Link href={`/profile/${person.userId}`} className="z-10 flex-1 block text-left">
          <div className="flex items-center gap-4">
            {/* ავატარი თეთრი ნაზი კანტით */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-inner">
              {avatar ? (
                <img
                  src={avatar}
                  alt={person.displayName ?? ""}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/10 text-xl font-bold text-cyan-400">
                  {person.displayName?.[0] ?? "?"}
                </div>
              )}
            </div>
  
            {/* სახელი და მშობლიური ენა (ღია ფერებში მუქ ფონზე) */}
            <div className="overflow-hidden">
              <h3 className="truncate text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                {person.displayName || "მომხმარებელი"}
              </h3>
              {person.nativeLanguage && (
                <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-slate-300/80">
                  <span>{LANGUAGE_FLAGS[person.nativeLanguage]}</span>
                  {LANGUAGE_LABELS_KA[person.nativeLanguage]}
                </p>
              )}
            </div>
          </div>
  
          {/* ბიოგრაფია */}
          {person.bio && (
            <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-slate-300/90">
              {person.bio}
            </p>
          )}
  
          {/* ენების ბეიჯები - მინისებრი (Glassmorphism) ეფექტით მუქ ფონზე */}
          {person.learningLanguages.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {person.learningLanguages.slice(0, 3).map((l, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-lg bg-white/10 border border-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur-sm"
                >
                  <span className="text-xs">{LANGUAGE_FLAGS[l.language]}</span>
                  {LANGUAGE_LABELS_KA[l.language]}
                </span>
              ))}
            </div>
          )}
        </Link>
  
        {/* ღილაკის სექცია */}
        <div className="z-10 mt-6 pt-4 border-t border-white/5">
          <InviteButton person={person} myName={myName} />
        </div>
  
        {/* კავშირის სტატუსის ნიშანი */}
        {person.isConnected && (
          <div className="absolute right-4 top-4 text-cyan-400 bg-white/5 p-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
            <Sparkles size={14} fill="currentColor" />
          </div>
        )}
      </div>
    );
  }
  
  function InviteButton({
    person,
    myName,
  }: {
    person: {
      userId: string;
      isConnected: boolean;
      requestStatus: { status: string; direction: string } | null;
    };
    myName: string;
  }) {
    const sendConnectionRequest = useMutation(api.community.sendConnectionRequest);
  
    if (person.isConnected) {
      return (
        <button
          disabled
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-500/10 py-2.5 text-xs font-bold text-emerald-400 border border-emerald-500/20"
        >
          <Check size={14} strokeWidth={2.5} /> დაკავშირებული
        </button>
      );
    }
  
    if (person.requestStatus?.status === "pending") {
      return (
        <button
          disabled
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2.5 text-xs font-bold text-slate-400 border border-white/10"
        >
          <Clock size={14} strokeWidth={2.5} />
          {person.requestStatus.direction === "outgoing" ? "გაგზავნილია" : "გელოდებათ"}
        </button>
      );
    }
  
    return (
      // მკვეთრი, კონტრასტული ლურჯი/ციანისფერი ღილაკი, რომელიც ანათებს მუქ ბარათზე
      <button
        onClick={() => sendConnectionRequest({ recipientId: person.userId, requesterName: myName })}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] py-2.5 text-xs font-bold text-white shadow-[0_4px_20px_rgba(6,182,212,0.25)] transition-all hover:scale-[1.02] hover:opacity-95 active:scale-[0.98]"
      >
        <UserPlus size={14} strokeWidth={2.5} /> მოწვევა
      </button>
    );
  }