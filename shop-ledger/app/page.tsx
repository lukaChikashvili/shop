"use client"
import Lights from '@/components/Lights';
import { Canvas } from '@react-three/fiber'




export default function Home() {
  return (
    <>

      <Canvas>
     <Lights />

      </Canvas>
    
    </>
  );
}
