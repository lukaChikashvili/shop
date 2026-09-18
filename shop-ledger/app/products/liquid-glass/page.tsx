"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import LiquidGlass from "@/components/LiquidGlass";

export default function LiquidGlassPage() {

  const [image, setImage] =
    useState("/image.jpg");

  const [strength, setStrength] =
    useState(1);

  const [speed, setSpeed] =
    useState(0.7);

  const [noise, setNoise] =
    useState(1);

  const [mouseInfluence, setMouseInfluence] =
    useState(1);

  const [chromaticAberration, setChromaticAberration] =
    useState(0.012);

  return (
    <main className="min-h-screen  text-white">

      <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_360px]">

        

        <div className="relative min-h-[600px]">

          <Canvas
            orthographic
            camera={{
              position: [0, 0, 1],
              zoom: 1,
            }}
          >
            <LiquidGlass
              image={image}
              strength={strength}
              speed={speed}
              noise={noise}
              mouseInfluence={mouseInfluence}
              chromaticAberration={
                chromaticAberration
              }
            />
          </Canvas>

        </div>


       

        <aside className="border-l border-white/10 bg-black p-6">

          <h1 className="text-2xl font-medium">
            Liquid Glass
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Interactive GLSL distortion shader
          </p>


          

          <div className="mt-10">

            <label className="text-sm text-white/60">
              Test your image
            </label>

            <input
              type="file"
              accept="image/*"
              className="mt-3 block w-full text-sm"
              onChange={(event) => {

                const file =
                  event.target.files?.[0];

                if (!file) return;

                const url =
                  URL.createObjectURL(file);

                setImage(url);

              }}
            />

          </div>


     

          <Control
            label="Distortion"
            value={strength}
            min={0}
            max={3}
            step={0.01}
            onChange={setStrength}
          />


         

          <Control
            label="Speed"
            value={speed}
            min={0}
            max={3}
            step={0.01}
            onChange={setSpeed}
          />


         

          <Control
            label="Noise"
            value={noise}
            min={0}
            max={3}
            step={0.01}
            onChange={setNoise}
          />


          

          <Control
            label="Mouse influence"
            value={mouseInfluence}
            min={0}
            max={3}
            step={0.01}
            onChange={setMouseInfluence}
          />


          

          <Control
            label="Chromatic aberration"
            value={chromaticAberration}
            min={0}
            max={0.05}
            step={0.001}
            onChange={
              setChromaticAberration
            }
          />

        </aside>

      </section>

    </main>
  );
}


interface ControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function Control({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: ControlProps) {

  return (
    <div className="mt-8">

      <div className="mb-2 flex justify-between">

        <span className="text-sm text-white/60">
          {label}
        </span>

        <span className="font-mono text-xs text-white/40">
          {value.toFixed(3)}
        </span>

      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) =>
          onChange(
            Number(event.target.value)
          )
        }
        className="w-full"
      />

    </div>
  );
}