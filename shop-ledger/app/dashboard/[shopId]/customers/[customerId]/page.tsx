"use client";

import { useState } from "react";
import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Wallet, X, Pencil, Trash2, Check } from "lucide-react";

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


  const [editingId, setEditingId] = useState<Id<"transactions"> | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editNote, setEditNote] = useState("");
  const [editType, setEditType] = useState<"credit_given" | "payment_received">("credit_given");
  const [deletingId, setDeletingId] = useState<Id<"transactions"> | null>(null);

  const data = useQuery(
    api.customers.getCustomerDetail,
    isAuthenticated ? { shopId, customerId } : "skip"
  );
  const addTransaction = useMutation(api.transactions.addTransaction);
  const updateTransaction = useMutation(api.transactions.updateTransaction);
  const deleteTransaction = useMutation(api.transactions.deleteTransaction);

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

  function startEditing(t: (typeof transactions)[number]) {
    setEditingId(t._id);
    setEditAmount(t.amount.toString());
    setEditNote(t.note ?? "");
    setEditType(t.type === "sale" ? "credit_given" : t.type);
  }

  async function handleSaveEdit(transactionId: Id<"transactions">) {
    setError(null);
    const amount = parseFloat(editAmount);
    if (!amount || amount <= 0) {
      setError("შეიყვანეთ სწორი თანხა");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateTransaction({
        shopId,
        transactionId,
        type: editType,
        amount,
        note: editNote.trim() || undefined,
      });
      setEditingId(null);
    } catch {
      setError("რედაქტირება ვერ მოხერხდა");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(transactionId: Id<"transactions">) {
    setIsSubmitting(true);
    try {
      await deleteTransaction({ shopId, transactionId });
      setDeletingId(null);
    } catch {
      setError("წაშლა ვერ მოხერხდა");
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
            {customer.phone && <p className="text-sm text-[#4A5261]">{customer.phone}</p>}
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
              {customer.balance > 0 ? "გმართებთ" : customer.balance < 0 ? "კრედიტი" : "ბალანსი გასწორებულია"}
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
              <button onClick={() => setShowPaymentForm(false)} className="p-1 rounded-full hover:bg-[#F7F4EC] transition">
                <X size={18} className="text-[#4A5261]" />
              </button>
            </div>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <input
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                type="number"
                step="0.01"
                inputMode="decimal"
                placeholder="0.00"
                autoFocus
                className="w-full px-4 py-3 border border-[#DCD7C9] rounded-xl focus:ring-2 focus:ring-[#2F5D3A] outline-none text-lg font-semibold"
              />
              <input
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                type="text"
                placeholder="შენიშვნა (არასავალდებულო)"
                className="w-full px-4 py-3 border border-[#DCD7C9] rounded-xl focus:ring-2 focus:ring-[#2F5D3A] outline-none"
              />
              {error && <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
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
            <p className="text-center text-[#4A5261] py-8 text-sm">ჯერ არ არის ტრანზაქციები</p>
          ) : (
            <ul>
              {transactions.map((t, i) => (
                <li key={t._id} className={i !== 0 ? "border-t border-[#E8E3D6]" : ""}>
                  {editingId === t._id ? (
                 
                    <div className="px-5 py-4 bg-[#F7F4EC] space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setEditType("credit_given")}
                          className={`py-2 rounded-lg text-sm font-medium border ${
                            editType === "credit_given"
                              ? "bg-[#FDF2E7] border-[#B45309] text-[#B45309]"
                              : "bg-white border-[#DCD7C9] text-[#4A5261]"
                          }`}
                        >
                          დავალიანება
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditType("payment_received")}
                          className={`py-2 rounded-lg text-sm font-medium border ${
                            editType === "payment_received"
                              ? "bg-[#EAF3EC] border-[#2F5D3A] text-[#2F5D3A]"
                              : "bg-white border-[#DCD7C9] text-[#4A5261]"
                          }`}
                        >
                          გადახდა
                        </button>
                      </div>
                      <input
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        className="w-full px-3 py-2 border border-[#DCD7C9] rounded-lg focus:ring-2 focus:ring-[#2F5D3A] outline-none text-sm"
                      />
                      <input
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        type="text"
                        placeholder="შენიშვნა"
                        className="w-full px-3 py-2 border border-[#DCD7C9] rounded-lg focus:ring-2 focus:ring-[#2F5D3A] outline-none text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(t._id)}
                          disabled={isSubmitting}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-[#2F5D3A] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#254A2F] transition disabled:opacity-50"
                        >
                          <Check size={14} />
                          შენახვა
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-white border border-[#DCD7C9] text-[#4A5261] py-2 rounded-lg text-sm font-medium hover:bg-[#F0EDE3] transition"
                        >
                          გაუქმება
                        </button>
                      </div>
                    </div>
                  ) : deletingId === t._id ? (
                    
                    <div className="px-5 py-4 bg-red-50 flex items-center justify-between gap-3">
                      <p className="text-sm text-red-700">წავშალო ეს ჩანაწერი?</p>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleDelete(t._id)}
                          disabled={isSubmitting}
                          className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700 transition disabled:opacity-50"
                        >
                          დიახ, წაშლა
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="bg-white border border-[#DCD7C9] text-[#4A5261] px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#F0EDE3] transition"
                        >
                          გაუქმება
                        </button>
                      </div>
                    </div>
                  ) : (
                    
                    <div className="flex items-center justify-between px-5 py-4 group">
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
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-semibold text-sm ${
                            t.type === "payment_received" ? "text-[#2F5D3A]" : "text-[#B45309]"
                          }`}
                        >
                          {t.type === "payment_received" ? "-" : "+"}
                          {t.amount.toFixed(2)}
                        </span>
                        {t.type !== "sale" && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEditing(t)}
                              className="p-1.5 rounded-full hover:bg-[#F0EDE3] transition"
                            >
                              <Pencil size={14} className="text-[#9CA3AF]" />
                            </button>
                            <button
                              onClick={() => setDeletingId(t._id)}
                              className="p-1.5 rounded-full hover:bg-red-50 transition"
                            >
                              <Trash2 size={14} className="text-[#9CA3AF]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}