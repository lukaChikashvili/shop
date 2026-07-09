"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Search, UserPlus, Check, Clock } from "lucide-react";
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
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#4A6B8C]"
          />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="მოძებნე მეგობრები სახელით..."
            className="w-full rounded-full border border-white/60 bg-white/40 py-2.5 pl-10 pr-4 text-sm outline-none backdrop-blur-sm focus:border-[#1E3A8A]/40"
          />
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-full border border-white/60 bg-white/40 px-4 py-2.5 text-sm capitalize outline-none backdrop-blur-sm focus:border-[#1E3A8A]/40"
        >
          <option value="">ყველა ენა</option>
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {LANGUAGE_LABELS_KA[l]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results === undefined && (
          <>
            <div className="h-32 animate-pulse rounded-2xl border border-white/40 bg-white/20" />
            <div className="h-32 animate-pulse rounded-2xl border border-white/40 bg-white/20" />
          </>
        )}

        {results?.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-[#4A6B8C]">
            შედეგები არ მოიძებნა.
          </p>
        )}

        {results?.map((person) => (
          <div
            key={person.userId}
            className="rounded-2xl border border-white/50 bg-white/30 p-4 backdrop-blur-xl"
          >
            <Link href={`/profile/${person.userId}`} className="flex items-center gap-3 hover:opacity-80">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#1E3A8A]/10">
  {person.profileImageUrl || person.clerkImageUrl ? (
    <img
      src={person.profileImageUrl ?? person.clerkImageUrl}
      alt={person.displayName ?? ""}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#1E3A8A]">
      {person.displayName?.[0] ?? "?"}
    </div>
  )}
</div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#0F2647]">
                  {person.displayName || "მომხმარებელი"}
                </p>
                {person.nativeLanguage && (
                  <p className="truncate text-xs text-[#4A6B8C]">
                    {LANGUAGE_FLAGS[person.nativeLanguage]}{" "}
                    {LANGUAGE_LABELS_KA[person.nativeLanguage]}
                  </p>
                )}
              </div>
            </Link>

            {person.bio && (
              <p className="mt-3 line-clamp-2 text-xs text-[#4A6B8C]">{person.bio}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5">
              {person.learningLanguages.slice(0, 3).map((l, i) => (
                <span
                  key={i}
                  className="rounded-full bg-[#1E3A8A]/10 px-2 py-0.5 text-[10px] font-medium text-[#0C4A8C]"
                >
                  {LANGUAGE_FLAGS[l.language]} {LANGUAGE_LABELS_KA[l.language]}
                </span>
              ))}
            </div>

            <InviteButton person={person} myName={myName} />
          </div>
        ))}
      </div>
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
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-green-500/10 px-3 py-2 text-xs font-semibold text-green-700"
      >
        <Check size={14} /> დაკავშირებული
      </button>
    );
  }

  if (person.requestStatus?.status === "pending") {
    return (
      <button
        disabled
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-white/60 bg-white/40 px-3 py-2 text-xs font-medium text-[#4A6B8C]"
      >
        <Clock size={14} />
        {person.requestStatus.direction === "outgoing" ? "მოწვევა გაგზავნილია" : "მოგელოდებათ პასუხი"}
      </button>
    );
  }

  return (
    <button
      onClick={() => sendConnectionRequest({ recipientId: person.userId, requesterName: myName })}
      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#1E3A8A]/85 to-[#38BDF8]/85 px-3 py-2 text-xs font-semibold text-white hover:from-[#1E3A8A] hover:to-[#38BDF8]"
    >
      <UserPlus size={14} /> მოწვევა
    </button>
  );
}