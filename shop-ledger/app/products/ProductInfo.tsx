"use client";

import { useCart } from "@/context/CartContext";
import { Check, ShoppingCart } from "lucide-react";


interface ProductInfoProps {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  features?: string[];
}

export default function ProductInfo({
  id,
  name,
  category,
  description,
  price,
  image,
  features = [],
}: ProductInfoProps) {
  const { addToCart, isInCart } = useCart();

  const added = isInCart(id);

  const handleAddToCart = () => {
    if (added) return;

    addToCart({
      id,
      name,
      price,
      image,
    });
  };

  return (
    <div className="flex h-full flex-col text-black -mt-36 ml-36">
   
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-black">
          {category}
        </p>

        <h1 className="mt-3 text-3xl font-medium tracking-tight text-black">
          {name}
        </h1>

        <p className="mt-4 max-w-md text-sm leading-6 text-black">
          {description}
        </p>
      </div>

    
      {features.length > 0 && (
        <div className="mt-8 ">
          <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-black">
            Includes
          </p>

          <div className="space-y-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 text-sm text-black"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/10">
                  <Check size={11} className="text-black" />
                </span>

                {feature}
              </div>
            ))}
          </div>
        </div>
      )}


<div className="mt-10 px-12 border-t border-black/10 pt-6">
  <div className="flex items-start justify-between gap-6">
   
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-black/50">
        One-time purchase
      </p>

      <p className="mt-2 text-3xl font-medium tracking-tight text-black">
        ${price}
      </p>
    </div>

    
    <button
      type="button"
      disabled={added}
      onClick={handleAddToCart}
      className={`
        group flex items-center gap-2 rounded-full px-6 py-3
        text-sm font-medium transition-all duration-300
        ${
          added
            ? "cursor-default bg-black/10 text-black/40"
            : "bg-black text-white hover:scale-[1.02] hover:bg-black/85"
        }
      `}
    >
      <ShoppingCart
        size={15}
        className="transition-transform duration-300 group-hover:-translate-y-px"
      />

      {added ? "Added to cart" : "Add to cart"}
    </button>
  </div>
</div>
    </div>
  );
}