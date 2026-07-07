"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";


export function Header() {
  const { isSignedIn, isLoaded } = useUser();


  if (!isLoaded) return null;

  return (
    <header className="flex items-center justify-between px-12 py-5 bg-background border-b border-border">
      <Link href="/" className="font-bold text-2xl flex items-center gap-2 text-ink-primary">
        <div className="bg-accent p-1.5 rounded-lg">
          <div className="w-3 h-3 bg-white rounded-sm" />
        </div>
        ShopFlow
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-ink-secondary font-medium text-md">
        <Link href="/features" className="hover:text-accent transition">ფუნქციები</Link>
        <Link href="/pricing" className="hover:text-accent transition">ფასები</Link>
        <Link href="/discover" className="hover:text-accent transition">მაღაზიების აღმოჩენა</Link>
        <Link href="/contact" className="hover:text-accent transition">კონტაქტი</Link>
      </nav>

      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            {shop === undefined ? (
             
              <div className="w-[150px] h-9 rounded-full bg-accent-light/50 animate-pulse" />
            ) : shop ? (
              <Link
                href={`/dashboard/${shop._id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light text-accent font-medium text-sm border border-accent/20 hover:bg-accent hover:text-white hover:border-accent transition-colors"
              >
                <LayoutDashboard size={16} strokeWidth={2.5} />
                ჩემი მაღაზია
              </Link>
            ) : (
              <Link
                href="/create-shop"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light text-accent font-medium text-sm border border-accent/20 hover:bg-accent hover:text-white hover:border-accent transition-colors"
              >
                <Plus size={16} strokeWidth={2.5} />
                შექმენი მაღაზია
              </Link>
            )}
            <UserButton />
          </div>
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-ink-primary hover:text-accent transition">
                შესვლა
              </button>
            </SignInButton>
            <Link
              href="/register"
              className="bg-accent text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-accent-hover transition"
            >
              დარეგისტრირდი უფასოდ
            </Link>
          </>
        )}
      </div>
    </header>
  );
}