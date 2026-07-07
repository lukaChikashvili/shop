"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Plus, Video } from "lucide-react";
import Link from "next/link";



function LogoMark() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6C5CE7] to-[#8B5CF6] shadow-sm shadow-[#6C5CE7]/30">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.2-3.6A7.96 7.96 0 0 1 4 12Z"
          fill="white"
        />
        <circle cx="9" cy="12" r="1.1" fill="#6C5CE7" />
        <circle cx="12.5" cy="12" r="1.1" fill="#6C5CE7" />
        <circle cx="16" cy="12" r="1.1" fill="#6C5CE7" />
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
    <header className="flex items-center justify-between px-8 md:px-12 py-4 bg-white border-b border-[#ECECF3]">
      <Link href="/" className="flex items-center gap-2.5">
        <LogoMark />
        <span className="font-bold text-xl text-[#1E1B2E] tracking-tight">
          LinguaRoom
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-[#6B7280]">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:text-[#1E1B2E] transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {isSignedIn ? (
          <>
            <Link
              href="/rooms"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[#6C5CE7] font-medium text-sm border border-[#6C5CE7]/20 bg-[#6C5CE7]/5 hover:bg-[#6C5CE7]/10 transition-colors"
            >
              <Video size={16} strokeWidth={2.2} />
              ოთახებში შესვლა
            </Link>
            <Link
              href="/rooms?create=true"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#6C5CE7] to-[#8B5CF6] hover:opacity-90 transition-opacity shadow-sm shadow-[#6C5CE7]/30"
            >
              <Plus size={16} strokeWidth={2.5} />
              ოთახის შექმნა
            </Link>
            <UserButton />
          </>
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-full text-sm font-medium text-[#1E1B2E] border border-[#ECECF3] hover:bg-[#F7F7FB] transition-colors">
                შესვლა
              </button>
            </SignInButton>
            <Link
              href="/register"
              className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#6C5CE7] to-[#8B5CF6] hover:opacity-90 transition-opacity shadow-sm shadow-[#6C5CE7]/30"
            >
              დარეგისტრირდი უფასოდ
            </Link>
          </>
        )}
      </div>
    </header>
  );
}