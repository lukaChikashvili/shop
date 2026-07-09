"use client"
import Experience from "@/components/Experience";
import { Hero } from "@/components/Hero";
import Lights from "@/components/Lights";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";



export default function Home() {
  return (
    <>
   <Hero />

   <Canvas>
  

    <OrbitControls />
      <Experience />
      <Lights />
   </Canvas>
    </>
  );
}
