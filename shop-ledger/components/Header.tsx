
"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

import {
  Search,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

import Link from "next/link";

function LogoMark() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#111111] to-[#444444] shadow-sm shadow-black/30">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.2-3.6A7.96 7.96 0 0 1 4 12Z"
          fill="white"
        />
        <circle cx="9" cy="12" r="1.1" fill="#111111" />
        <circle cx="12.5" cy="12" r="1.1" fill="#111111" />
        <circle cx="16" cy="12" r="1.1" fill="#111111" />
      </svg>
    </div>
  );
}

export function Header() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/templates", label: "Templates" },
    { href: "/animations", label: "Animations" },
    { href: "/shaders", label: "Shaders" },
    { href: "/courses", label: "Courses" },
  ];

  return (
    <header className="sticky top-0 z-50 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[#F3F4F4] backdrop-blur-2xl backdrop-saturate-150" />

 
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.04] via-transparent to-blue-500/[0.04]" />

      
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/[0.08]" />

      <div
        className="relative flex items-center justify-between px-6 md:px-10 lg:px-12 py-4"
        style={{
          boxShadow:
            "0 1px 0 0 rgba(255,255,255,0.9) inset, 0 10px 35px -15px rgba(0,0,0,0.15)",
        }}
      >
      
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
        >
          <LogoMark />

          <div className="flex flex-col leading-none">
            <span className="font-bold text-xl text-[#111111] tracking-tight">
              DevLab
            </span>

            <span className="hidden sm:block text-[9px] font-medium tracking-[0.16em] uppercase text-[#888888] mt-1">
              by Luka
            </span>
          </div>
        </Link>

        
        <nav className="hidden lg:flex items-center gap-7 ml-10 text-[14px] font-medium text-[#666666]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#111111] transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/free"
            className="flex items-center gap-1.5 text-[#111111] hover:opacity-70 transition-opacity"
          >
            <Sparkles size={14} />
            Free
          </Link>
        </nav>

       
        <div className="flex items-center gap-2.5 ml-auto">
        
          <Link
            href="/search"
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full text-sm text-[#777777] border border-black/[0.08] bg-black/[0.025] hover:bg-black/[0.05] transition-colors"
          >
            <Search size={15} strokeWidth={2} />

            <span className="hidden xl:inline">
              Search
            </span>
          </Link>

          {isSignedIn ? (
            <>
            
              <Link
                href="/purchases"
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full text-[#333333] font-medium text-sm border border-black/[0.08] bg-white/60 hover:bg-white transition-colors"
              >
                <ShoppingBag
                  size={15}
                  strokeWidth={2}
                />

                <span className="hidden xl:inline">
                  Purchases
                </span>
              </Link>

              
              <Link
                href="/cart"
                className="relative flex items-center justify-center h-9 w-9 rounded-full text-[#333333] border border-black/[0.08] bg-white/60 hover:bg-white transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart
                  size={16}
                  strokeWidth={2}
                />

               
              
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#111111] px-1 text-[9px] font-bold text-white">
                  0
                </span>
                
              </Link>

           
              <Link
                href="/products"
                className="relative px-4 py-2 rounded-full text-sm font-semibold text-white bg-[#111111] hover:bg-[#2a2a2a] transition-all"
                style={{
                  boxShadow:
                    "0 1px 0 0 rgba(255,255,255,0.2) inset, 0 5px 18px -5px rgba(0,0,0,0.4)",
                }}
              >
                Browse
              </Link>

              <UserButton />
            </>
          ) : (
            <>
              
              <SignInButton mode="modal">
                <button
                  className="hidden sm:flex px-4 py-2 rounded-full text-sm font-medium text-[#333333] border border-black/[0.08] bg-white/60 hover:bg-white transition-colors"
                  style={{
                    boxShadow:
                      "0 1px 0 0 rgba(255,255,255,0.9) inset",
                  }}
                >
                  Sign in
                </button>
              </SignInButton>

              
              <Link
                href="/products"
                className="relative px-5 py-2 rounded-full text-sm font-semibold text-white bg-[#111111] hover:bg-[#2a2a2a] transition-all"
                style={{
                  boxShadow:
                    "0 1px 0 0 rgba(255,255,255,0.2) inset, 0 6px 20px -5px rgba(0,0,0,0.4)",
                }}
              >
                Browse products
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

