"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";

const CATEGORIES = [
  { value: "clothing", label: "ტანსაცმელი" },
  { value: "electronics", label: "ტექნიკა" },
  { value: "food", label: "საკვების ობიექტი" },
  { value: "pharmacy", label: "აფთიაქი" },
  { value: "hardware", label: "სამშენებლო მასალები" },
  { value: "other", label: "სხვა" },
] as const;

const CURRENCIES = [
  { value: "GEL", label: "GEL (₾)" },
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
] as const;

export default function CreateShopPage() {
  const router = useRouter();
  const createShop = useMutation(api.shop.createShop);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]["value"]>("clothing");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]["value"]>("GEL");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("მაღაზიის სახელი ძალიან მოკლეა");
      return;
    }
    if (city.trim().length < 2) {
      setError("გთხოვთ მიუთითოთ ქალაქი");
      return;
    }
    if (!/^(\+995)?5\d{8}$/.test(phone.replace(/[\s-]/g, ""))) {
      setError("შეიყვანეთ სწორი ტელეფონის ნომერი (მაგ: 555123456)");
      return;
    }

    setIsSubmitting(true);
    try {
      const shopId = await createShop({
        name: name.trim(),
        category,
        city: city.trim(),
        phone: phone.trim(),
        currency,
      });
      router.push(`/dashboard/${shopId}`);
    } catch (err: any) {
      if (err.message?.includes("SHOP_LIMIT_REACHED")) {
        setError("თქვენ უკვე გაქვთ მაღაზია. გადადით თქვენს პანელზე.");
      } else if (err.message?.includes("INVALID_PHONE")) {
        setError("ტელეფონის ნომერი არასწორია.");
      } else {
        setError("რაღაც შეცდომა მოხდა. სცადეთ თავიდან.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F4EC] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-[#E8E3D6]">
        <h1 className="text-2xl font-bold text-[#1C2431] mb-6">ახალი მაღაზიის დამატება</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#4A5261] mb-1">მაღაზიის სახელი</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full px-4 py-2 border border-[#DCD7C9] rounded-lg focus:ring-2 focus:ring-accent focus:border-[#2F5D3A] outline-none transition"
              placeholder="მაგ: ჩემი მაღაზია"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A5261] mb-1">სფერო</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-4 py-2 border border-[#DCD7C9] rounded-lg focus:ring-2 focus:ring-[#2F5D3A] focus:border-[#2F5D3A] outline-none transition"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A5261] mb-1">ქალაქი</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="w-full px-4 py-2 border border-[#DCD7C9] rounded-lg focus:ring-2 focus:ring-[#2F5D3A] focus:border-[#2F5D3A] outline-none transition"
              placeholder="მაგ: თბილისი"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A5261] mb-1">ტელეფონის ნომერი</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="w-full px-4 py-2 border border-[#DCD7C9] rounded-lg focus:ring-2 focus:ring-[#2F5D3A] focus:border-[#2F5D3A] outline-none transition"
              placeholder="მაგ: 555 12 34 56"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A5261] mb-1">ვალუტა</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="w-full px-4 py-2 border border-[#DCD7C9] rounded-lg focus:ring-2 focus:ring-[#2F5D3A] focus:border-[#2F5D3A] outline-none transition"
            >
              {CURRENCIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-[#254A2F] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "იქმნება..." : "მაღაზიის შექმნა"}
          </button>
        </form>
      </div>
    </main>
  );
}