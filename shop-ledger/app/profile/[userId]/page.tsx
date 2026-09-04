"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { LANGUAGE_FLAGS, LANGUAGE_LABELS_KA } from "@/lib/languageFlags";
import { BookOpen, User, Sparkles } from "lucide-react";

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
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="h-64 w-full animate-pulse rounded-[2.5rem] bg-slate-100" />
        <div className="-mt-16 px-8 flex items-end gap-6">
          <div className="h-32 w-32 shrink-0 animate-pulse rounded-full border-[6px] border-white bg-slate-200" />
          <div className="mb-4 space-y-3">
            <div className="h-6 w-48 animate-pulse rounded-md bg-slate-100" />
            <div className="h-4 w-32 animate-pulse rounded-md bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }


  if (profile === null) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <div className="rounded-full bg-slate-50 p-6 text-slate-400 mb-4">
          <User size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">პროფილი ვერ მოიძებნა</h2>
        <p className="mt-2 text-sm text-slate-500">ეს მომხმარებელი არ არსებობს ან წაშლილია.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white pb-20">
    
      <div className="absolute right-[-10%] top-[-5%] -z-10 h-[600px] w-[600px] rounded-full bg-[#E0F2FE]/40 blur-[120px]" />
      <div className="absolute left-[-5%] top-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-[#EEF2FF]/50 blur-[100px]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-6">
        
      
        <div
          className="relative h-48 sm:h-64 w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#2B59C3] to-[#3B92E4] shadow-sm"
          style={{
            backgroundImage: profile.bannerImageUrl ? `url(${profile.bannerImageUrl})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
         
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

       
        <div className="-mt-16 flex flex-col sm:flex-row sm:items-end gap-5 px-6 sm:px-10 relative z-10">
          <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 rounded-full border-[6px] border-white bg-slate-50 shadow-md">
            {profile.profileImageUrl || profile.clerkImageUrl ? (
              <img
                src={profile.profileImageUrl ?? profile.clerkImageUrl}
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 text-3xl font-bold text-blue-600">
                {profile.displayName?.[0] ?? "?"}
              </div>
            )}
          </div>

          <div className="mb-2 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              {profile.displayName || "მომხმარებელი"}
            </h1>
            {profile.goal && (
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500">
                <Sparkles size={16} className="text-amber-500" />
                {profile.goal}
              </p>
            )}
          </div>
        </div>

     
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
        
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="flex items-center gap-2 text-base font-bold text-[#0F172A]">
                <BookOpen size={18} className="text-blue-500" /> ენები
              </h2>

              
              {profile.nativeLanguage && (
                <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    მშობლიური
                  </p>
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl drop-shadow-sm">{LANGUAGE_FLAGS[profile.nativeLanguage]}</span>
                    <span className="text-sm font-bold text-slate-700">
                      {LANGUAGE_LABELS_KA[profile.nativeLanguage]}
                    </span>
                  </div>
                </div>
              )}

             
              {profile.learningLanguages && profile.learningLanguages.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    სწავლობს
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {profile.learningLanguages.map((l: { language: string; level: string }, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-xl bg-white border border-slate-200/60 p-3 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{LANGUAGE_FLAGS[l.language]}</span>
                          <span className="text-sm font-medium text-slate-700">
                            {LANGUAGE_LABELS_KA[l.language]}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                          {LEVEL_LABELS[l.level]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            
          
            {profile.bio && (
              <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-lg font-bold text-[#0F172A] mb-4">ჩემ შესახებ</h2>
                <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                  {profile.bio}
                </p>
              </div>
            )}

            {profile.hobbies && profile.hobbies.length > 0 && (
              <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-lg font-bold text-[#0F172A] mb-4">ინტერესები და ჰობები</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.hobbies.map((h: string, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] px-4 py-2 text-xs font-medium text-[#1D4ED8] transition-colors hover:bg-blue-100"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}