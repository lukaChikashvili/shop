"use client";

import { useState } from "react";
import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Wallet, X } from "lucide-react";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shopId = params.shopId as Id<"shops">;
  const customerId = params.customerId as Id<"customers">;
  const { isAuthenticated, isLoading } = useConvexAuth();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const data = useQuery(
    api.customers.getCustomerDetail,
    isAuthenticated ? { shopId, customerId } : "skip"
  );
  const addTransaction = useMutation(api.transactions.addTransaction);

  if (isLoading || (isAuthenticated && data === undefined)) {
    return (
      <main className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="text-[#4A5261]">იტვირთება...</div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="text-[#4A5261]">მომხმარებელი ვერ მოიძებნა</div>
      </main>
    );
  }

  const { customer, transactions } = data;

  async function handleRecordPayment(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const amount = parseFloat(paymentAmount);
    if (!amount || amount <= 0) {
      setError("შეიყვანეთ სწორი თანხა");
      return;
    }

    setIsSubmitting(true);
    try {
      await addTransaction({
        shopId,
        customerId,
        type: "payment_received",
        amount,
        note: paymentNote.trim() || undefined,
      });
      setPaymentAmount("");
      setPaymentNote("");
      setShowPaymentForm(false);
    } catch {
      setError("შენახვა ვერ მოხერხდა");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F4EC] px-6 py-8 md:px-12">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[#4A5261] text-sm mb-4 hover:text-[#1C2431] transition"
        >
          <ArrowLeft size={16} />
          უკან
        </button>

      
        <div className="bg-white rounded-2xl border border-[#E8E3D6] p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1C2431]">{customer.name}</h1>
            {customer.phone && (
              <p className="text-sm text-[#4A5261]">{customer.phone}</p>
            )}
            <p
              className={`text-2xl font-bold mt-2 ${
                customer.balance > 0
                  ? "text-[#B45309]"
                  : customer.balance < 0
                  ? "text-[#2F5D3A]"
                  : "text-[#9CA3AF]"
              }`}
            >
              {customer.balance.toFixed(2)}
            </p>
            <p className="text-xs text-[#9CA3AF]">
              {customer.balance > 0
                ? "გმართებთ"
                : customer.balance < 0
                ? "კრედიტი"
                : "ბალანსი გასწორებულია"}
            </p>
          </div>

          <button
            onClick={() => setShowPaymentForm(true)}
            className="flex items-center gap-2 bg-[#2F5D3A] text-white px-4 py-2.5 rounded-full font-medium text-sm hover:bg-[#254A2F] transition"
          >
            <Wallet size={16} />
            გადახდის აღრიცხვა
          </button>
        </div>

       
        {showPaymentForm && (
          <div className="bg-white rounded-2xl border border-[#2F5D3A]/30 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[#1C2431]">გადახდის ჩაწერა</h2>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="p-1 rounded-full hover:bg-[#F7F4EC] transition"
              >
                <X size={18} className="text-[#4A5261]" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#4A5261] mb-1.5">
                  თანხა
                </label>
                <input
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  type="number"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0.00"
                  autoFocus
                  className="w-full px-4 py-3 border border-[#DCD7C9] rounded-xl focus:ring-2 focus:ring-[#2F5D3A] focus:border-[#2F5D3A] outline-none transition text-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A5261] mb-1.5">
                  შენიშვნა (არასავალდებულო)
                </label>
                <input
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  type="text"
                  placeholder="მაგ: ნახევარი დავალიანება"
                  className="w-full px-4 py-3 border border-[#DCD7C9] rounded-xl focus:ring-2 focus:ring-[#2F5D3A] focus:border-[#2F5D3A] outline-none transition"
                />
              </div>

              {error && (
                <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2F5D3A] text-white py-3 rounded-xl font-semibold hover:bg-[#254A2F] transition disabled:opacity-50"
              >
                {isSubmitting ? "ინახება..." : "შენახვა"}
              </button>
            </form>
          </div>
        )}

      
        <div className="bg-white rounded-2xl border border-[#E8E3D6] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E8E3D6]">
            <h2 className="font-semibold text-[#1C2431]">ისტორია</h2>
          </div>

          {transactions.length === 0 ? (
            <p className="text-center text-[#4A5261] py-8 text-sm">
              ჯერ არ არის ტრანზაქციები
            </p>
          ) : (
            <ul>
              {transactions.map((t, i) => (
                <li
                  key={t._id}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i !== 0 ? "border-t border-[#E8E3D6]" : ""
                  }`}
                >
                  <div>
                    <p className="text-[#1C2431] text-sm">
                      {t.note || (t.type === "payment_received" ? "გადახდა" : "ნასყიდობა")}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {new Date(t.createdAt).toLocaleDateString("ka-GE", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span
                    className={`font-semibold text-sm ${
                      t.type === "payment_received" ? "text-[#2F5D3A]" : "text-[#B45309]"
                    }`}
                  >
                    {t.type === "payment_received" ? "-" : "+"}
                    {t.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}