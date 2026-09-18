"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Sparkles,
  Zap,
} from "lucide-react";

type ProductType =
  | "shader"
  | "animation"
  | "three"
  | "template";

interface Product {
  slug: string;
  title: string;
  description: string;
  price: string;
  category: string;
  tags: string[];
  type: ProductType;
  image: string;
  featured?: boolean;
}

const products: Product[] = [
  {
    slug: "liquid-glass",
    title: "Liquid Glass",
    description:
      "Interactive glass distortion shader for modern WebGL interfaces.",
    price: "FREE",
    category: "GLSL Shader",
    tags: ["GLSL", "WebGL"],
    type: "shader",
    image: "/glass.avif",
    featured: true,
  },
];

function ProductPreview({
  image,
}: {
  image: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f7] text-[#111]">
      {/* HERO */}
      <section className="border-b border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-20 md:px-10 md:pt-24">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <div className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#999]">
                <Sparkles size={13} />
                DevLab by Luka
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] md:text-6xl">
                Digital tools for
                <span className="text-[#999]">
                  {" "}
                  creative developers.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#777]">
                Shaders, animations, components and templates
                designed to make your next website more interesting.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-xs text-[#999]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white">
                {products.length}
              </span>

              products
            </div>
          </div>

          {/* FILTERS */}
          <div className="mt-10 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full bg-[#111] px-4 py-2 text-xs font-medium text-white"
            >
              All
            </button>

            <button
              type="button"
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#666] transition hover:border-black/20 hover:text-[#111]"
            >
              Shaders
            </button>

            <button
              type="button"
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#666] transition hover:border-black/20 hover:text-[#111]"
            >
              Animations
            </button>

            <button
              type="button"
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#666] transition hover:border-black/20 hover:text-[#111]"
            >
              Three.js
            </button>

            <button
              type="button"
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#666] transition hover:border-black/20 hover:text-[#111]"
            >
              Templates
            </button>

            <Link
              href="/free"
              className="ml-auto flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#333] transition hover:bg-black/[0.03]"
            >
              <Zap size={12} />
              Free resources
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group"
            >
              {/* PRODUCT IMAGE */}
              <div className="relative aspect-[1.35/1] overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_5px_30px_-20px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_45px_-25px_rgba(0,0,0,0.35)]">
                <ProductPreview image={product.image} />

                {product.featured && (
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#111] shadow-sm backdrop-blur">
                    Featured
                  </div>
                )}

                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#111] opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              {/* PRODUCT INFO */}
              <div className="px-1 pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#999]">
                      {product.category}
                    </p>

                    <h2 className="text-[17px] font-semibold tracking-[-0.025em]">
                      {product.title}
                    </h2>
                  </div>

                  <span className="text-sm font-semibold">
                    {product.price}
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[#777]">
                  {product.description}
                </p>

                <div className="mt-3 flex items-center gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-black/[0.035] px-2 py-1 text-[9px] font-medium text-[#777]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="border-t border-black/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#999]">
              <Code2 size={14} />
              Built by Luka
            </div>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
              Creative code, ready to use.
            </h2>
          </div>

          <Link
            href="/free"
            className="flex w-fit items-center gap-2 rounded-full bg-[#111] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#292929]"
          >
            Explore free resources
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}