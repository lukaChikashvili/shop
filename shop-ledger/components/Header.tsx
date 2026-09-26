"use client";

import { useState } from "react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Dumbbell,
  Sparkles,
  Trophy,
  Activity,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

function LogoMark() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#B8FF3D] via-[#8DFF5A] to-[#5BE7FF] shadow-[0_0_30px_rgba(184,255,61,0.2)]">
      <Dumbbell
        size={20}
        strokeWidth={2.5}
        className="text-[#07100B]"
      />

      <div className="absolute -inset-1 -z-10 rounded-[16px] bg-[#B8FF3D]/10 blur-md" />
    </div>
  );
}

const navItems = [
  {
    href: "/gym",
    label: "Enter Gym",
  },
  {
    href: "/workouts",
    label: "Workouts",
  },
  {
    href: "/exercises",
    label: "Exercises",
  },
  {
    href: "/community",
    label: "Community",
  },
];

export function Header() {
  const { isSignedIn, isLoaded } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  if (!isLoaded) return null;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto max-w-[1500px]">
        <AnimatePresence mode="wait">
         

          {collapsed ? (
            <motion.div
              key="collapsed"
              initial={{
                opacity: 0,
                scale: 0.9,
                y: -15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -10,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex justify-end"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#080A0B]/95 p-1 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#B8FF3D]/[0.04] via-transparent to-[#8B5CF6]/[0.06]" />

                <div className="relative flex items-center gap-1">
                  <Link href="/">
                    <LogoMark />
                  </Link>

                  <button
                    onClick={() => setCollapsed(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white/45 transition-all hover:bg-white/[0.06] hover:text-white"
                    aria-label="Open navigation"
                  >
                    <Menu size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
          

            <motion.div
              key="full"
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -15,
                scale: 0.98,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
           

              <div className="pointer-events-none absolute -inset-8 -z-10">
                <motion.div
                  className="absolute left-[15%] top-0 h-28 w-56 rounded-full bg-[#B8FF3D]/[0.07] blur-[80px]"
                  animate={{
                    x: [0, 50, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute right-[20%] top-0 h-28 w-56 rounded-full bg-[#8B5CF6]/[0.06] blur-[80px]"
                  animate={{
                    x: [0, -50, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

             

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#080A0B]/90 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            

                <motion.div
                  className="pointer-events-none absolute inset-0"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B8FF3D]/[0.025] via-transparent to-[#8B5CF6]/[0.035]" />
                </motion.div>

          

                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

           

                <motion.div
                  className="pointer-events-none absolute inset-x-[15%] bottom-0 h-px bg-gradient-to-r from-transparent via-[#B8FF3D]/30 to-transparent"
                  animate={{
                    opacity: [0.25, 0.7, 0.25],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

              

                <div className="relative flex h-[68px] items-center px-4 md:px-6">
              

                  <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-3"
                  >
                    <LogoMark />

                    <div className="hidden flex-col leading-none sm:flex">
                      <span className="text-[17px] font-black tracking-[-0.03em] text-white">
                        GymVerse
                      </span>

                      <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.22em] text-white/35">
                        Virtual Fitness
                      </span>
                    </div>
                  </Link>

                

                  <nav className="ml-12 hidden items-center gap-1 lg:flex">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group relative rounded-xl px-4 py-2.5 text-[13px] font-medium text-white/50 transition-all duration-200 hover:bg-white/[0.05] hover:text-white"
                      >
                        {item.label}

                        <span className="absolute bottom-1 left-1/2 h-[2px] w-3 -translate-x-1/2 scale-x-0 rounded-full bg-[#B8FF3D] transition-transform duration-300 group-hover:scale-x-100" />
                      </Link>
                    ))}

                    <Link
                      href="/challenges"
                      className="ml-1 flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-medium text-white/50 transition-all hover:bg-white/[0.05] hover:text-white"
                    >
                      <Trophy
                        size={14}
                        className="text-[#B8FF3D]"
                      />

                      Challenges
                    </Link>
                  </nav>

          

                  <div className="ml-auto flex items-center gap-2">
                  

                    <Link
                      href="/coach"
                      className="hidden items-center gap-2 rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/[0.07] px-3.5 py-2.5 text-[13px] font-medium text-[#C4B5FD] transition-all hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/[0.12] hover:text-white md:flex"
                    >
                      <Sparkles
                        size={14}
                        className="text-[#A78BFA]"
                      />

                      <span className="hidden xl:inline">
                        AI Coach
                      </span>
                    </Link>

                    {isSignedIn ? (
                      <>
                        

                        <Link
                          href="/progress"
                          className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3.5 py-2.5 text-[13px] font-medium text-white/60 transition-all hover:bg-white/[0.07] hover:text-white md:flex"
                        >
                          <Activity
                            size={14}
                            className="text-[#5BE7FF]"
                          />

                          <span className="hidden xl:inline">
                            Progress
                          </span>
                        </Link>

                       

                        <Link
                          href="/gym"
                          className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-[#B8FF3D] px-4 py-2.5 text-[13px] font-bold text-[#07100B] transition-all hover:scale-[1.02] hover:bg-[#C6FF63]"
                          style={{
                            boxShadow:
                              "0 0 25px rgba(184,255,61,0.16)",
                          }}
                        >
                          <Dumbbell size={15} />

                          <span>Enter Gym</span>

                          <div className="absolute inset-y-0 -left-10 w-6 rotate-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[120%]" />
                        </Link>

                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox:
                                "h-9 w-9 border border-white/10",
                            },
                          }}
                        />
                      </>
                    ) : (
                      <>
                     

                        <SignInButton mode="modal">
                          <button className="hidden rounded-xl border border-white/[0.09] bg-white/[0.035] px-4 py-2.5 text-[13px] font-medium text-white/65 transition-all hover:bg-white/[0.07] hover:text-white sm:flex">
                            Sign in
                          </button>
                        </SignInButton>

                      
                        <Link
                          href="/gym"
                          className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-[#B8FF3D] px-5 py-2.5 text-[13px] font-bold text-[#07100B] transition-all hover:scale-[1.02] hover:bg-[#C6FF63]"
                          style={{
                            boxShadow:
                              "0 0 30px rgba(184,255,61,0.18)",
                          }}
                        >
                          <Sparkles size={15} />

                          Start Training

                          <div className="absolute inset-y-0 -left-10 w-6 rotate-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-[120%]" />
                        </Link>
                      </>
                    )}

                   

                    <button
                      onClick={() => setCollapsed(true)}
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-white/40 transition-all hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
                      aria-label="Collapse navigation"
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>

               

                <div className="relative flex overflow-x-auto border-t border-white/[0.06] px-4 py-2.5 lg:hidden">
                  <div className="flex items-center gap-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-medium text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}

                    <Link
                      href="/challenges"
                      className="whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-medium text-[#B8FF3D] hover:bg-[#B8FF3D]/[0.06]"
                    >
                      Challenges
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}