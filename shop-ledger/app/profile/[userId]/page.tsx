"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { LANGUAGE_FLAGS, LANGUAGE_LABELS_KA } from "@/lib/languageFlags";

const LEVEL_LABELS: Record<string, string> = {
  beginner: "დამწყები",
  intermediate: "საშუალო",
  advanced: "მაღალი",
};

export default function PublicProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const profile = useQuery(api.community.getPublicProfile, { userId });

  if (profile === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 animate-pulse text-[#4A6B8C]">
        იტვირთება...
      </div>
    );
  }

  if (profile === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center text-sm text-[#4A6B8C]">
        მომხმარებელი ვერ მოიძებნა.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-10">
      <div
        className="relative h-56 w-full overflow-hidden rounded-b-2xl bg-gradient-to-r from-[#1E3A8A] to-[#38BDF8]"
        style={{
          backgroundImage: profile.bannerImageUrl ? `url(${profile.bannerImageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="-mt-14 flex items-end gap-4 px-4">
      <div className="relative h-28 w-28 shrink-0 rounded-full border-4 border-[#F5FAFF] bg-white shadow-lg">
  {profile.profileImageUrl || profile.clerkImageUrl ? (
    <img
      src={profile.profileImageUrl ?? profile.clerkImageUrl}
      alt="avatar"
      className="h-full w-full rounded-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1E3A8A]/10 text-2xl font-semibold text-[#1E3A8A]">
      {profile.displayName?.[0] ?? "?"}
    </div>
  )}
</div>

        <div className="pb-2">
  <h1 className="text-xl font-semibold text-[#0F2647]">
    {profile.displayName || "მომხმარებელი"}
  </h1>
  {profile.goal && <p className="text-sm text-[#4A6B8C]">{profile.goal}</p>}
</div>

      <div className="mt-6 rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl">
        <h2 className="text-sm font-semibold text-[#0F2647]">ენები</h2>

        {profile.nativeLanguage && (
          <div className="mt-3 flex items-center gap-2 text-sm text-[#4A6B8C]">
            <span className="text-lg">{LANGUAGE_FLAGS[profile.nativeLanguage]}</span>
            <span>
              მშობლიური:{" "}
              <span className="font-medium text-[#0F2647]">
                {LANGUAGE_LABELS_KA[profile.nativeLanguage]}
              </span>
            </span>
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {profile.learningLanguages?.map((l: { language: string; level: string }, i: number) => (
            <span
              key={i}
              className="flex items-center gap-1.5 rounded-full border border-white/50 bg-[#1E3A8A]/10 px-3 py-1.5 text-xs font-medium text-[#0C4A8C]"
            >
              <span className="text-base">{LANGUAGE_FLAGS[l.language]}</span>
              {LANGUAGE_LABELS_KA[l.language]} · {LEVEL_LABELS[l.level]}
            </span>
          ))}
        </div>
      </div>

      {profile.bio && (
        <div className="mt-6 rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl">
          <h2 className="text-sm font-semibold text-[#0F2647]">ჩემ შესახებ</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4A6B8C]">{profile.bio}</p>
        </div>
      )}

      {profile.hobbies && profile.hobbies.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl">
          <h2 className="text-sm font-semibold text-[#0F2647]">ჰობები</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.hobbies.map((h: string, i: number) => (
              <span
                key={i}
                className="rounded-full border border-white/50 bg-[#38BDF8]/10 px-3 py-1.5 text-xs font-medium text-[#0C4A8C]"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}