"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Plus, LayoutDashboard } from "lucide-react";
import Link from "next/link";

function LogoMark() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#38BDF8] shadow-sm shadow-[#1E3A8A]/40">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.2-3.6A7.96 7.96 0 0 1 4 12Z"
          fill="white"
        />
        <circle cx="9" cy="12" r="1.1" fill="#1E3A8A" />
        <circle cx="12.5" cy="12" r="1.1" fill="#1E3A8A" />
        <circle cx="16" cy="12" r="1.1" fill="#1E3A8A" />
      </svg>
    </div>
  );
}

export function Header() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  const navItems = [
    { href: "/rooms", label: "ოთახები" },
    { href: "/how-it-works", label: "როგორ მუშაობს" },
    { href: "/community", label: "საზოგადოება" },
    { href: "/pricing", label: "ფასები" },
    { href: "/contact", label: "კონტაქტი" },
  ];

  return (
    <header className="sticky top-0 z-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/25 backdrop-blur-2xl backdrop-saturate-200" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/10 via-white/5 to-[#38BDF8]/10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/30 to-transparent" />

      <div
        className="relative flex items-center justify-between px-8 md:px-12 py-4 border-b border-white/50"
        style={{
          boxShadow:
            "0 1px 0 0 rgba(255,255,255,0.7) inset, 0 12px 40px -12px rgba(30,58,138,0.18)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-bold text-xl text-[#0F2647] tracking-tight">
            LinguaRoom
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-[#4A6B8C]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#0F2647] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[#0C4A8C] font-medium text-sm border border-white/70 bg-white/30 backdrop-blur-xl backdrop-saturate-150 hover:bg-white/50 transition-colors"
                style={{
                  boxShadow:
                    "0 1px 0 0 rgba(255,255,255,0.8) inset, 0 2px 10px -2px rgba(30,58,138,0.2)",
                }}
              >
                <LayoutDashboard size={16} strokeWidth={2.2} />
                დაფა
              </Link>
              <Link
                href="/rooms?create=true"
                className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#1E3A8A]/80 to-[#38BDF8]/80 backdrop-blur-xl border border-white/40 hover:from-[#1E3A8A]/95 hover:to-[#38BDF8]/95 transition-all"
                style={{
                  boxShadow:
                    "0 1px 0 0 rgba(255,255,255,0.5) inset, 0 6px 20px -4px rgba(30,58,138,0.55)",
                }}
              >
                <Plus size={16} strokeWidth={2.5} />
                ოთახის შექმნა
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button
                  className="px-4 py-2 rounded-full text-sm font-medium text-[#0F2647] border border-white/70 bg-white/25 backdrop-blur-xl backdrop-saturate-150 hover:bg-white/45 transition-colors"
                  style={{
                    boxShadow: "0 1px 0 0 rgba(255,255,255,0.8) inset",
                  }}
                >
                  შესვლა
                </button>
              </SignInButton>
              <Link
                href="/register"
                className="relative px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#1E3A8A]/80 to-[#38BDF8]/80 backdrop-blur-xl border border-white/40 hover:from-[#1E3A8A]/95 hover:to-[#38BDF8]/95 transition-all"
                style={{
                  boxShadow:
                    "0 1px 0 0 rgba(255,255,255,0.5) inset, 0 6px 20px -4px rgba(30,58,138,0.55)",
                }}
              >
                დარეგისტრირდი უფასოდ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}