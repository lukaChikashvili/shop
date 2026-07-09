"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Users, Globe2 } from "lucide-react";

const LANGUAGE_CHIPS = [
  { flag: "🇪🇸", label: "ესპანური" },
  { flag: "🇬🇧", label: "ინგლისური" },
  { flag: "🇨🇳", label: "ჩინური" },
  { flag: "🇬🇪", label: "ქართული" },
  { flag: "🇫🇷", label: "ფრანგული" },
];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden px-5 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#F5FAFF]" />
      <div className="pointer-events-none absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-[#38BDF8]/25 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-40 -z-10 h-96 w-96 rounded-full bg-[#1E3A8A]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-[#38BDF8]/10 blur-3xl" />

      <div className="mx-auto max-w-5xl text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 py-1.5 text-sm font-medium text-[#0C4A8C] backdrop-blur-xl"
          style={{
            boxShadow: "0 1px 0 0 rgba(255,255,255,0.7) inset",
          }}
        >
          <Sparkles size={14} />
          ისწავლე ენა საუბრით, არა მარტო წიგნით
        </div>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#0F2647] md:text-6xl">
          ილაპარაკე ახლა,{" "}
          <span className="bg-gradient-to-r from-[#1E3A8A] to-[#38BDF8] bg-clip-text text-transparent">
            ისწავლე
          </span>{" "}
          სწრაფად
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-[#4A6B8C]">
          შემოუერთდი ცოცხალ სასაუბრო ოთახებს, გაიცანი მშობლიური ენოვანი
          თანამოსაუბრეები და ივარჯიშე რეალურ დროში — უფასოდ.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1E3A8A]/90 to-[#38BDF8]/90 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-xl border border-white/30 transition-all hover:from-[#1E3A8A] hover:to-[#38BDF8]"
            style={{
              boxShadow:
                "0 1px 0 0 rgba(255,255,255,0.5) inset, 0 8px 24px -6px rgba(30,58,138,0.55)",
            }}
          >
            დაიწყე უფასოდ
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/how-it-works"
            className="flex items-center gap-2 rounded-full border border-white/60 bg-white/30 px-7 py-3.5 text-base font-medium text-[#0F2647] backdrop-blur-xl transition-colors hover:bg-white/50"
            style={{
              boxShadow: "0 1px 0 0 rgba(255,255,255,0.7) inset",
            }}
          >
            როგორ მუშაობს
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {LANGUAGE_CHIPS.map((lang) => (
            <span
              key={lang.label}
              className="flex items-center gap-1.5 rounded-full border border-white/50 bg-white/30 px-4 py-1.5 text-sm font-medium text-[#0F2647] backdrop-blur-xl"
              style={{
                boxShadow: "0 1px 0 0 rgba(255,255,255,0.6) inset",
              }}
            >
              <span>{lang.flag}</span>
              {lang.label}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
          <div
            className="rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl"
            style={{
              boxShadow:
                "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 8px 24px -8px rgba(30,58,138,0.12)",
            }}
          >
            <div className="flex items-center justify-center gap-1.5 text-[#0C4A8C]">
              <Users size={18} />
              <span className="text-2xl font-bold text-[#0F2647]">2,400+</span>
            </div>
            <p className="mt-1 text-sm text-[#4A6B8C]">აქტიური მოსწავლე</p>
          </div>

          <div
            className="rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl"
            style={{
              boxShadow:
                "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 8px 24px -8px rgba(30,58,138,0.12)",
            }}
          >
            <div className="flex items-center justify-center gap-1.5 text-[#0C4A8C]">
              <Globe2 size={18} />
              <span className="text-2xl font-bold text-[#0F2647]">30+</span>
            </div>
            <p className="mt-1 text-sm text-[#4A6B8C]">ენა</p>
          </div>

          <div
            className="col-span-2 rounded-2xl border border-white/50 bg-white/30 p-5 backdrop-blur-xl sm:col-span-1"
            style={{
              boxShadow:
                "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 8px 24px -8px rgba(30,58,138,0.12)",
            }}
          >
            <div className="flex items-center justify-center gap-1.5 text-[#0C4A8C]">
              <Sparkles size={18} />
              <span className="text-2xl font-bold text-[#0F2647]">100%</span>
            </div>
            <p className="mt-1 text-sm text-[#4A6B8C]">უფასო დასაწყისი</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;