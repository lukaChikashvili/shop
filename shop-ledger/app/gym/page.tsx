"use client"
import Experience from '@/components/Experience'
import Lights from '@/components/Lights'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { OrbitControls } from '@react-three/drei'

const page = () => {
  return (
    <div className='h-screen'> 
           <Canvas>
            <OrbitControls />
     <Lights />
     <Experience />

      </Canvas>
    
    </div>
  )
}

export default page
