"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { Search, Check, X } from "lucide-react";

type PaymentMode = "credit" | "paid";

export default function NewTransactionPage() {
  const params = useParams();
  const shopId = params.shopId as Id<"shops">;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<{
    _id: Id<"customers">;
    name: string;
    balance: number;
  } | null>(null);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<PaymentMode>("credit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const customers = useQuery(
    api.customers.searchCustomers,
    searchTerm.trim().length > 0 && !selectedCustomer
      ? { shopId, searchTerm }
      : "skip"
  );

  const createCustomer = useMutation(api.customers.createCustomer);
  const addTransaction = useMutation(api.transactions.addTransaction);

 
  useEffect(() => {
    searchInputRef.current?.focus();
  }, [justSaved]);

  function resetForm() {
    setSearchTerm("");
    setSelectedCustomer(null);
    setItem("");
    setAmount("");
    setMode("credit");
    setError(null);
  }

  async function handleSelectCustomer(c: { _id: Id<"customers">; name: string; balance: number }) {
    setSelectedCustomer(c);
    setSearchTerm("");
  }

  async function handleCreateNewCustomer() {
    if (searchTerm.trim().length < 1) return;
    try {
      const customerId = await createCustomer({ shopId, name: searchTerm.trim() });
      setSelectedCustomer({ _id: customerId, name: searchTerm.trim(), balance: 0 });
      setSearchTerm("");
    } catch {
      setError("მომხმარებლის დამატება ვერ მოხერხდა");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      setError("შეიყვანეთ სწორი თანხა");
      return;
    }
    if (mode === "credit" && !selectedCustomer) {
      setError("დავალიანებისთვის აირჩიეთ მომხმარებელი");
      return;
    }

    setIsSubmitting(true);
    try {
      await addTransaction({
        shopId,
        customerId: selectedCustomer?._id,
        type: mode === "credit" ? "credit_given" : "sale",
        amount: numAmount,
        note: item.trim() || undefined,
      });

      resetForm();
      setJustSaved((s) => !s);
    } catch (err: any) {
      setError("შენახვა ვერ მოხერხდა, სცადეთ თავიდან");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F4EC] flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-bold text-[#1C2431] mb-6 text-center">
          ახალი ჩანაწერი
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8E3D6] p-6 space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-[#4A5261] mb-1.5">
              მომხმარებელი
            </label>

            {selectedCustomer ? (
              <div className="flex items-center justify-between bg-[#EAF3EC] border border-[#2F5D3A]/20 rounded-xl px-4 py-3">
                <div>
                  <p className="font-semibold text-[#1C2431]">{selectedCustomer.name}</p>
                  <p className="text-xs text-[#4A5261]">
                    მიმდინარე ბალანსი: {selectedCustomer.balance.toFixed(2)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="p-1.5 rounded-full hover:bg-white/60 transition"
                >
                  <X size={18} className="text-[#4A5261]" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                />
                <input
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="მოძებნეთ სახელით, ან ნაღდი გაყიდვისთვის დატოვეთ ცარიელი"
                  className="w-full pl-10 pr-4 py-3 border border-[#DCD7C9] rounded-xl focus:ring-2 focus:ring-[#2F5D3A] focus:border-[#2F5D3A] outline-none transition text-base"
                />

                {searchTerm.trim().length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-[#E8E3D6] rounded-xl shadow-lg overflow-hidden">
                    {customers === undefined ? (
                      <div className="px-4 py-3 text-sm text-[#9CA3AF]">იძებნება...</div>
                    ) : (
                      <>
                        {customers.map((c) => (
                          <button
                            key={c._id}
                            type="button"
                            onClick={() => handleSelectCustomer(c)}
                            className="w-full text-left px-4 py-3 hover:bg-[#F7F4EC] transition flex items-center justify-between"
                          >
                            <span className="text-[#1C2431]">{c.name}</span>
                            <span className="text-xs text-[#9CA3AF]">
                              {c.balance.toFixed(2)}
                            </span>
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={handleCreateNewCustomer}
                          className="w-full text-left px-4 py-3 hover:bg-[#F7F4EC] transition text-[#2F5D3A] font-medium border-t border-[#E8E3D6]"
                        >
                          + დაამატე "{searchTerm.trim()}"
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          
          <div>
            <label className="block text-sm font-medium text-[#4A5261] mb-1.5">
              რა შეიძინა
            </label>
            <input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              type="text"
              placeholder="მაგ: სუნამო, ბლენდერი..."
              className="w-full px-4 py-3 border border-[#DCD7C9] rounded-xl focus:ring-2 focus:ring-[#2F5D3A] focus:border-[#2F5D3A] outline-none transition text-base"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-[#4A5261] mb-1.5">
              თანხა
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              className="w-full px-4 py-3 border border-[#DCD7C9] rounded-xl focus:ring-2 focus:ring-[#2F5D3A] focus:border-[#2F5D3A] outline-none transition text-lg font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode("credit")}
              className={`py-3 rounded-xl font-medium text-sm transition border ${
                mode === "credit"
                  ? "bg-[#FDF2E7] border-[#B45309] text-[#B45309]"
                  : "bg-white border-[#DCD7C9] text-[#4A5261]"
              }`}
            >
              დავალიანება
            </button>
            <button
              type="button"
              onClick={() => setMode("paid")}
              className={`py-3 rounded-xl font-medium text-sm transition border ${
                mode === "paid"
                  ? "bg-[#EAF3EC] border-[#2F5D3A] text-[#2F5D3A]"
                  : "bg-white border-[#DCD7C9] text-[#4A5261]"
              }`}
            >
              გადაიხადა
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2F5D3A] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#254A2F] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Check size={20} strokeWidth={2.5} />
            {isSubmitting ? "ინახება..." : "შენახვა"}
          </button>
        </form>
      </div>
    </main>
  );
}