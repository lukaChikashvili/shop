
"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Dumbbell,
  Sparkles,
  Trophy,
  Users,
  Brain,
  Activity,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

function LogoMark() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#B8FF3D] via-[#8DFF5A] to-[#5BE7FF] shadow-[0_0_30px_rgba(184,255,61,0.25)]">
      <Dumbbell
        size={20}
        strokeWidth={2.5}
        className="text-[#07100B]"
      />

    
      <div className="absolute -inset-1 rounded-[16px] bg-[#B8FF3D]/10 blur-md -z-10" />
    </div>
  );
}

export function Header() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

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

  return (
    <header className="sticky top-0 z-50 px-4 md:px-8 pt-4">
      <div className="relative mx-auto max-w-[1500px]">

      
        <div className="pointer-events-none absolute -inset-4 -z-10">
          <div className="absolute left-[15%] top-0 h-24 w-48 rounded-full bg-[#B8FF3D]/10 blur-[70px]" />
          <div className="absolute right-[20%] top-0 h-24 w-48 rounded-full bg-[#8B5CF6]/10 blur-[70px]" />
        </div>

    
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#080A0B]/90 backdrop-blur-2xl">

         
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#B8FF3D]/[0.035] via-transparent to-[#8B5CF6]/[0.05]" />

        
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B8FF3D]/30 to-transparent" />

          <div className="relative flex h-[68px] items-center px-4 md:px-6">

            
            <Link
              href="/"
              className="group flex items-center gap-3 shrink-0"
            >
              <LogoMark />

              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[17px] font-black tracking-[-0.03em] text-white">
                  GymVerse
                </span>

                <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.22em] text-white/35">
                  Virtual Fitness
                </span>
              </div>
            </Link>

         
            <nav className="hidden lg:flex items-center ml-12 gap-1">

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    relative rounded-xl px-4 py-2.5
                    text-[13px] font-medium text-white/55
                    transition-all duration-200
                    hover:bg-white/[0.06]
                    hover:text-white
                  "
                >
                  {item.label}

                  {item.label === "Enter Gym" && (
                    <span className="absolute bottom-1 left-1/2 h-[2px] w-3 -translate-x-1/2 rounded-full bg-[#B8FF3D] opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </Link>
              ))}

              <Link
                href="/challenges"
                className="
                  ml-1 flex items-center gap-2
                  rounded-xl px-4 py-2.5
                  text-[13px] font-medium
                  text-white/55
                  transition-all
                  hover:bg-white/[0.06]
                  hover:text-white
                "
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
                className="
                  hidden md:flex
                  items-center gap-2
                  rounded-xl
                  border border-[#8B5CF6]/20
                  bg-[#8B5CF6]/[0.08]
                  px-3.5 py-2.5
                  text-[13px] font-medium
                  text-[#C4B5FD]
                  transition-all
                  hover:border-[#8B5CF6]/40
                  hover:bg-[#8B5CF6]/[0.14]
                  hover:text-white
                "
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
                    className="
                      hidden md:flex
                      items-center gap-2
                      rounded-xl
                      border border-white/[0.08]
                      bg-white/[0.04]
                      px-3.5 py-2.5
                      text-[13px] font-medium
                      text-white/65
                      transition-all
                      hover:bg-white/[0.08]
                      hover:text-white
                    "
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
                    className="
                      group relative
                      flex items-center gap-2
                      overflow-hidden
                      rounded-xl
                      bg-[#B8FF3D]
                      px-4 py-2.5
                      text-[13px] font-bold
                      text-[#07100B]
                      transition-all
                      hover:scale-[1.02]
                      hover:bg-[#C6FF63]
                    "
                    style={{
                      boxShadow:
                        "0 0 25px rgba(184,255,61,0.18)",
                    }}
                  >
                    <Dumbbell size={15} />

                    <span>
                      Enter Gym
                    </span>

                    <div className="absolute inset-y-0 -left-10 w-6 rotate-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[120%]" />
                  </Link>

                  
                  <div className="ml-1">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox:
                            "h-9 w-9 border border-white/10",
                        },
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                 
                  <SignInButton mode="modal">
                    <button
                      className="
                        hidden sm:flex
                        rounded-xl
                        border border-white/[0.09]
                        bg-white/[0.04]
                        px-4 py-2.5
                        text-[13px] font-medium
                        text-white/70
                        transition-all
                        hover:bg-white/[0.08]
                        hover:text-white
                      "
                    >
                      Sign in
                    </button>
                  </SignInButton>

                
                  <Link
                    href="/gym"
                    className="
                      group relative
                      flex items-center gap-2
                      overflow-hidden
                      rounded-xl
                      bg-[#B8FF3D]
                      px-5 py-2.5
                      text-[13px] font-bold
                      text-[#07100B]
                      transition-all
                      hover:scale-[1.02]
                      hover:bg-[#C6FF63]
                    "
                    style={{
                      boxShadow:
                        "0 0 30px rgba(184,255,61,0.2)",
                    }}
                  >
                    <Sparkles size={15} />

                    Start Training

                    <div className="absolute inset-y-0 -left-10 w-6 rotate-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-[120%]" />
                  </Link>
                </>
              )}
            </div>
          </div>

   
          <div className="flex lg:hidden border-t border-white/[0.06] px-4 py-2.5 overflow-x-auto">
            <div className="flex items-center gap-1">

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    whitespace-nowrap
                    rounded-lg
                    px-3 py-1.5
                    text-[11px] font-medium
                    text-white/45
                    hover:bg-white/[0.05]
                    hover:text-white
                    transition-colors
                  "
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/challenges"
                className="
                  whitespace-nowrap
                  rounded-lg
                  px-3 py-1.5
                  text-[11px] font-medium
                  text-[#B8FF3D]
                  hover:bg-[#B8FF3D]/[0.06]
                "
              >
                Challenges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

