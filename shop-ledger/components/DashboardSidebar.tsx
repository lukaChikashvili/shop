// components/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, BookOpen, Video, Settings } from "lucide-react";

const NAV_ITEMS = [
  { label: "მიმოხილვა", href: "/dashboard", icon: LayoutDashboard },
  { label: "ოთახები", href: "/rooms", icon: Video },
  { label: "პროფილი", href: "/profile", icon: User },
  { label: "ლექსიკონი", href: "/dictionary", icon: BookOpen, comingSoon: true },
  { label: "პარამეტრები", href: "/settings", icon: Settings, comingSoon: true },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-white/50 bg-white/30 p-4 backdrop-blur-xl lg:flex mt-16">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        if (item.comingSoon) {
          return (
            <div
              key={item.href}
              className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#4A6B8C]/50"
              title="მალე"
            >
              <Icon size={18} />
              {item.label}
              <span className="ml-auto rounded-full bg-[#4A6B8C]/10 px-2 py-0.5 text-[10px]">
                მალე
              </span>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-gradient-to-r from-[#1E3A8A]/85 to-[#38BDF8]/85 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_4px_16px_-4px_rgba(30,58,138,0.5)]"
                : "text-[#0F2647] hover:bg-white/40"
            }`}
          >
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}