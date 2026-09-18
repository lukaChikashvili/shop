"use client";

import * as THREE from "three";
import {
  useFrame,
  useLoader,
} from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { glassVertex } from "@/shaders/liquid_glass/vertex";
import { glassFragment } from "@/shaders/liquid_glass/fragment";



interface LiquidGlassProps {
  image: string;

  strength: number;
  speed: number;
  noise: number;
  mouseInfluence: number;
  chromaticAberration: number;
}

export default function LiquidGlass({
  image,
  strength,
  speed,
  noise,
  mouseInfluence,
  chromaticAberration,
}: LiquidGlassProps) {
  const materialRef =
    useRef<THREE.ShaderMaterial>(null);

  const texture = useLoader(
    THREE.TextureLoader,
    image
  );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  const uniforms = useMemo(
    () => ({
      uTexture: {
        value: texture,
      },

      uTime: {
        value: 0,
      },

      uStrength: {
        value: strength,
      },

      uSpeed: {
        value: speed,
      },

      uNoise: {
        value: noise,
      },

      uMouseInfluence: {
        value: mouseInfluence,
      },

      uChromaticAberration: {
        value: chromaticAberration,
      },

      uMouse: {
        value: new THREE.Vector2(0.5, 0.5),
      },

      uResolution: {
        value: new THREE.Vector2(1, 1),
      },
    }),
    [texture]
  );

  useEffect(() => {
    if (!materialRef.current) return;

    const uniforms =
      materialRef.current.uniforms;

    uniforms.uStrength.value =
      strength;

    uniforms.uSpeed.value =
      speed;

    uniforms.uNoise.value =
      noise;

    uniforms.uMouseInfluence.value =
      mouseInfluence;

    uniforms.uChromaticAberration.value =
      chromaticAberration;

  }, [
    strength,
    speed,
    noise,
    mouseInfluence,
    chromaticAberration,
  ]);

  useEffect(() => {
    texture.colorSpace =
      THREE.SRGBColorSpace;

    texture.needsUpdate = true;
  }, [texture]);

  useFrame((state) => {
    if (!materialRef.current) return;

    const uniforms =
      materialRef.current.uniforms;

    uniforms.uTime.value =
      state.clock.getElapsedTime();

    const mouse = state.pointer;

    const target = new THREE.Vector2(
      (mouse.x + 1) / 2,
      (mouse.y + 1) / 2
    );

    uniforms.uMouse.value.lerp(
      target,
      0.08
    );

    uniforms.uResolution.value.set(
      state.size.width,
      state.size.height
    );
  });

  return (
    <mesh>
      <planeGeometry args={[900, 500]} />

      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={glassVertex}
        fragmentShader={glassFragment}
      />
    </mesh>
  );
}