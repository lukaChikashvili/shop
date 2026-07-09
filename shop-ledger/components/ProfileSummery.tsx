"use client";

import { useState } from "react";
import { useMutation, useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Pencil, Check, Plus, X } from "lucide-react";
import { HobbyInput } from "./HobbyInput";

const LANGUAGES = ["spanish", "english", "chinese", "georgian", "french"];
const LEVELS = ["beginner", "intermediate", "advanced"] as const;
type Level = (typeof LEVELS)[number];



const LEVEL_LABELS: Record<Level, string> = {
  beginner: "დამწყები",
  intermediate: "საშუალო",
  advanced: "მაღალი",
};

export function ProfileSummary() {
  const { isAuthenticated } = useConvexAuth();
  const profile = useQuery(api.dashboard.getProfile, isAuthenticated ? {} : "skip");
  const upsertProfile = useMutation(api.dashboard.upsertProfile);
  const [bio, setBio] = useState("");
const [hobbies, setHobbies] = useState<string[]>([]);

  const [editing, setEditing] = useState(false);
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [learning, setLearning] = useState<
  { language: string; level: Level }[]
>([]);
  const [goal, setGoal] = useState("");

  function startEditing() {
    setNativeLanguage(profile?.nativeLanguage ?? "");
    setLearning(profile?.learningLanguages ?? []);
    setGoal(profile?.goal ?? "");
    setBio(profile?.bio ?? "");
    setHobbies(profile?.hobbies ?? []);
    setEditing(true);
  }

  function addLanguageRow() {
    setLearning((prev) => [
      ...prev,
      { language: LANGUAGES[0], level: "beginner" },
    ]);
  }

  function updateRow(index: number, patch: Partial<{ language: string; level: Level }>) {
    setLearning((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row))
    );
  }

  function removeRow(index: number) {
    setLearning((prev) => prev.filter((_, i) => i !== index));
  }

  async function save() {
    await upsertProfile({
      nativeLanguage: nativeLanguage || undefined,
      learningLanguages: learning,
      goal: goal || undefined,
      bio: bio || undefined,
      hobbies,
    });
    setEditing(false);
  }

  const cardShadow = {
    boxShadow:
      "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 8px 24px -8px rgba(30,58,138,0.12)",
  };

  if (profile === undefined) {
    return (
      <div className="h-40 animate-pulse rounded-2xl border border-white/40 bg-white/20 backdrop-blur-xl" />
    );
  }

  if (!editing) {
    return (
      <div
        className="rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl"
        style={cardShadow}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[#0F2647]">ჩემი პროფილი</h2>
          <button
            onClick={startEditing}
            className="flex items-center gap-1.5 text-sm font-medium text-[#0C4A8C] hover:underline"
          >
            <Pencil size={14} />
            რედაქტირება
          </button>
        </div>

        {!profile ? (
          <p className="mt-4 text-sm text-[#4A6B8C]">
            დაამატე შენი ენები და მიზანი — ეს დაგეხმარება უკეთეს ოთახებში
            მოხვედრაში.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {profile.nativeLanguage && (
              <p className="text-sm text-[#4A6B8C]">
                მშობლიური ენა:{" "}
                <span className="font-medium text-[#0F2647] capitalize">
                  {profile.nativeLanguage}
                </span>
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {profile.learningLanguages.map((l, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/50 bg-[#1E3A8A]/10 px-3 py-1 text-xs font-medium capitalize text-[#0C4A8C] backdrop-blur-sm"
                >
                  {l.language} · {LEVEL_LABELS[l.level]}
                </span>
              ))}
            </div>
            {profile.goal && (
              <p className="text-sm text-[#4A6B8C]">
                მიზანი:{" "}
                <span className="font-medium text-[#0F2647]">
                  {profile.goal}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl"
      style={cardShadow}
    >
      <h2 className="font-semibold text-[#0F2647]">პროფილის რედაქტირება</h2>

      <div className="mt-4">
        <label className="block text-xs font-medium text-[#4A6B8C]">
          მშობლიური ენა
        </label>
        <select
          value={nativeLanguage}
          onChange={(e) => setNativeLanguage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/60 bg-white/40 px-3 py-2 text-sm text-[#0F2647] outline-none backdrop-blur-sm focus:border-[#1E3A8A]/40"
        >
          <option value="">აირჩიე...</option>
          {LANGUAGES.map((l) => (
            <option key={l} value={l} className="capitalize">
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-medium text-[#4A6B8C]">
            ვსწავლობ
          </label>
          <button
            onClick={addLanguageRow}
            className="flex items-center gap-1 text-xs font-medium text-[#0C4A8C] hover:underline"
          >
            <Plus size={12} />
            დამატება
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {learning.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <select
                value={row.language}
                onChange={(e) => updateRow(i, { language: e.target.value })}
                className="flex-1 rounded-lg border border-white/60 bg-white/40 px-2.5 py-1.5 text-sm capitalize outline-none backdrop-blur-sm focus:border-[#1E3A8A]/40"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <select
                value={row.level}
                onChange={(e) =>
                  updateRow(i, { level: e.target.value as Level })
                }
                className="flex-1 rounded-lg border border-white/60 bg-white/40 px-2.5 py-1.5 text-sm outline-none backdrop-blur-sm focus:border-[#1E3A8A]/40"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {LEVEL_LABELS[lvl]}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeRow(i)}
                className="text-[#4A6B8C] hover:text-[#EF4444]"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-xs font-medium text-[#4A6B8C]">
          მიზანი
        </label>
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="მაგ: თავისუფლად ვილაპარაკო დეკემბრისთვის"
          className="mt-1 w-full rounded-lg border border-white/60 bg-white/40 px-3 py-2 text-sm outline-none backdrop-blur-sm focus:border-[#1E3A8A]/40"
        />
      </div>

      <div className="mt-4">
  <label className="block text-xs font-medium text-[#4A6B8C]">
    ჩემ შესახებ
  </label>
  <textarea
    value={bio}
    onChange={(e) => setBio(e.target.value)}
    rows={3}
    placeholder="მოკლედ მოგვიყევი შენ შესახებ..."
    className="mt-1 w-full resize-none rounded-lg border border-white/60 bg-white/40 px-3 py-2 text-sm outline-none backdrop-blur-sm focus:border-[#1E3A8A]/40"
  />
</div>

<div className="mt-4">
  <label className="block text-xs font-medium text-[#4A6B8C]">
    ჰობები
  </label>
  <div className="mt-1">
    <HobbyInput hobbies={hobbies} onChange={setHobbies} />
  </div>
</div>

      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={save}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1E3A8A]/85 to-[#38BDF8]/85 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl border border-white/30 hover:from-[#1E3A8A] hover:to-[#38BDF8]"
          style={{
            boxShadow:
              "0 1px 0 0 rgba(255,255,255,0.5) inset, 0 4px 16px -4px rgba(30,58,138,0.5)",
          }}
        >
          <Check size={14} />
          შენახვა
        </button>
        <button
          onClick={() => setEditing(false)}
          className="rounded-full border border-white/60 bg-white/30 px-4 py-2 text-sm font-medium text-[#4A6B8C] backdrop-blur-sm hover:bg-white/50"
        >
          გაუქმება
        </button>
      </div>
    </div>
  );
}