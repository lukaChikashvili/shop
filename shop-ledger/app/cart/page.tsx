"use client";

import Link from "next/link";
import { Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Your cart
          </p>

          <h1 className="mt-4 text-4xl font-medium tracking-tight">
            Your cart is empty
          </h1>

          <p className="mt-4 text-sm text-black/50">
            You haven't added any products yet.
          </p>

          <Link
            href="/products/liquid-glass"
            className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:scale-[1.02]"
          >
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-5xl px-6 py-20">
    
        <div className="flex items-end justify-between border-b border-black/10 pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/40">
              DevLab
            </p>

            <h1 className="mt-3 text-5xl font-medium tracking-tight">
              Cart
            </h1>
          </div>

          <p className="text-sm text-black/40">
            {items.length}{" "}
            {items.length === 1 ? "product" : "products"}
          </p>
        </div>

        
        <div className="mt-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-6 border-b border-black/10 py-6"
            >
              
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 overflow-hidden rounded-xl bg-black/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-lg font-medium">
                    {item.name}
                  </p>

                  <p className="mt-1 text-sm text-black/40">
                    Digital product
                  </p>
                </div>
              </div>

            
              <div className="flex items-center gap-8">
                <p className="font-medium">
                  ${item.price.toFixed(2)}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="text-black/30 transition hover:text-black"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex gap-6">
            <Link
              href="/products/liquid-glass"
              className="flex items-center gap-2 text-sm text-black/50 transition hover:text-black"
            >
              <ArrowLeft size={15} />
              Continue shopping
            </Link>

            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-black/40 transition hover:text-black"
            >
              Clear cart
            </button>
          </div>

          <div className="min-w-[260px]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/50">
                Total
              </span>

              <span className="text-3xl font-medium">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-medium text-white transition hover:scale-[1.01] hover:bg-black/85"
            >
              <CreditCard size={16} />
              Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}