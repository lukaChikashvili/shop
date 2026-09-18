
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Sparkles,
  Layers3,
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
  featured?: boolean;
}

const products: Product[] = [
  {
    slug: "liquid-glass",
    title: "Liquid Glass",
    description:
      "Interactive glass distortion shader for modern WebGL interfaces.",
    price: "$19",
    category: "GLSL Shader",
    tags: ["GLSL", "WebGL"],
    type: "shader",
    featured: true,
  },
  {
    slug: "aurora",
    title: "Aurora",
    description:
      "Procedural aurora effect with animated gradients and noise.",
    price: "$15",
    category: "GLSL Shader",
    tags: ["GLSL", "Three.js"],
    type: "shader",
  },
  {
    slug: "magnetic-text",
    title: "Magnetic Text",
    description:
      "Smooth magnetic typography interaction powered by GSAP.",
    price: "$12",
    category: "Animation",
    tags: ["GSAP", "JS"],
    type: "animation",
  },
  {
    slug: "particle-field",
    title: "Particle Field",
    description:
      "Interactive 3D particle system for React Three Fiber.",
    price: "$24",
    category: "Three.js",
    tags: ["R3F", "Three.js"],
    type: "three",
  },
  {
    slug: "image-distortion",
    title: "Image Distortion",
    description:
      "Mouse-driven WebGL image distortion effect.",
    price: "$17",
    category: "WebGL",
    tags: ["GLSL", "R3F"],
    type: "shader",
  },
  {
    slug: "portfolio-starter",
    title: "Portfolio Starter",
    description:
      "Minimal creative developer portfolio built with Next.js.",
    price: "$29",
    category: "Template",
    tags: ["Next.js", "React"],
    type: "template",
  },
];

function ProductPreview({
  type,
}: {
  type: ProductType;
}) {
  if (type === "shader") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0b0b0b]">
        <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full bg-white/[0.12] blur-3xl" />

        <div className="absolute right-[10%] top-[35%] h-40 w-40 rounded-full bg-purple-400/[0.14] blur-3xl" />

        <div className="absolute bottom-[5%] left-[40%] h-32 w-32 rounded-full bg-blue-400/[0.12] blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />

        <div className="relative flex h-full items-center justify-center">
          <div className="h-24 w-24 rounded-full border border-white/20 bg-white/[0.06] shadow-[0_0_60px_rgba(255,255,255,0.12)] backdrop-blur-xl transition-transform duration-700 group-hover:scale-110" />
        </div>

        <span className="absolute bottom-3 left-4 text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
          Interactive Shader
        </span>
      </div>
    );
  }

  if (type === "animation") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f1f1ef]">
        <span className="text-5xl font-black tracking-[-0.08em] text-[#111] transition-transform duration-500 group-hover:scale-105">
          TYPE
        </span>

        <div className="absolute inset-x-0 bottom-3 text-center text-[9px] font-medium uppercase tracking-[0.18em] text-black/30">
          GSAP Animation
        </div>
      </div>
    );
  }

  if (type === "three") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#080808]">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative flex h-full items-center justify-center">
          <div className="h-24 w-24 rounded-full border border-white/20 bg-white/[0.04] shadow-[0_0_70px_rgba(255,255,255,0.08)] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
        </div>

        <span className="absolute bottom-3 left-4 text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">
          React Three Fiber
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#e9e9e7]">
      <div className="absolute inset-5 rounded-xl border border-black/10 bg-white shadow-xl transition-transform duration-500 group-hover:-translate-y-1">
        <div className="border-b border-black/10 p-3">
          <div className="h-1.5 w-16 rounded-full bg-black/10" />
        </div>

        <div className="flex h-full items-center justify-center">
          <div className="h-12 w-24 rounded-md bg-black/[0.04]" />
        </div>
      </div>

      <span className="absolute bottom-3 left-4 text-[9px] font-medium uppercase tracking-[0.18em] text-black/30">
        Next.js Template
      </span>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f7] text-[#111]">
      
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
                <span className="text-[#999]"> creative developers.</span>
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

          
          <div className="mt-10 flex flex-wrap gap-2">
            <button className="rounded-full bg-[#111] px-4 py-2 text-xs font-medium text-white">
              All
            </button>

            <button className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#666] transition hover:border-black/20 hover:text-[#111]">
              Shaders
            </button>

            <button className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#666] transition hover:border-black/20 hover:text-[#111]">
              Animations
            </button>

            <button className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#666] transition hover:border-black/20 hover:text-[#111]">
              Three.js
            </button>

            <button className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-[#666] transition hover:border-black/20 hover:text-[#111]">
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

      
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group"
            >
             
              <div className="relative aspect-[1.35/1] overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_5px_30px_-20px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_45px_-25px_rgba(0,0,0,0.35)]">
                <ProductPreview type={product.type} />

               
                {product.featured && (
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#111] shadow-sm backdrop-blur">
                    Featured
                  </div>
                )}

                
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#111] opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={14} />
                </div>
              </div>

            
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

