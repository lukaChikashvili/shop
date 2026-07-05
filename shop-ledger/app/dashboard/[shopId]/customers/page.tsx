"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Search, Users } from "lucide-react";

export default function CustomersPage() {
  const params = useParams();
  const shopId = params.shopId as Id<"shops">;
  const { isAuthenticated, isLoading } = useConvexAuth();

  const [inputValue, setInputValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const hasLoadedOnce = useRef(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const customers = useQuery(
    api.customers.listCustomers,
    isAuthenticated ? { shopId, searchTerm: debouncedSearch || undefined } : "skip"
  );

  if (customers !== undefined) {
    hasLoadedOnce.current = true;
  }


  if (isLoading || (isAuthenticated && customers === undefined && !hasLoadedOnce.current)) {
    return (
      <main className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="text-[#4A5261]">იტვირთება...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4EC] px-6 py-8 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1C2431] mb-6">მომხმარებლები</h1>

        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="მოძებნე სახელით"
            className="w-full pl-10 pr-4 py-3 border border-[#DCD7C9] rounded-xl bg-white focus:ring-2 focus:ring-[#2F5D3A] focus:border-[#2F5D3A] outline-none transition"
          />
        </div>

        {customers && customers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E8E3D6] p-10 text-center">
            <Users className="mx-auto mb-3 text-[#DCD7C9]" size={32} />
            <p className="text-[#4A5261]">
              {inputValue ? "მომხმარებელი ვერ მოიძებნა" : "ჯერ არ არის მომხმარებელი"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E8E3D6] overflow-hidden">
            {customers?.map((c, i) => (
              <Link
                key={c._id}
                href={`/dashboard/${shopId}/customers/${c._id}`}
                className={`flex items-center justify-between px-5 py-4 hover:bg-[#F7F4EC] transition ${
                  i !== 0 ? "border-t border-[#E8E3D6]" : ""
                }`}
              >
                <div>
                  <p className="font-medium text-[#1C2431]">{c.name}</p>
                  {c.phone && <p className="text-xs text-[#9CA3AF]">{c.phone}</p>}
                </div>
                <span
                  className={`font-semibold ${
                    c.balance > 0
                      ? "text-[#B45309]"
                      : c.balance < 0
                      ? "text-[#2F5D3A]"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  {c.balance.toFixed(2)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}