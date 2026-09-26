"use client"
import Experience from '@/components/Experience'
import Lights from '@/components/Lights'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { KeyboardControls, OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Gym from '@/components/Gym'
import GymFloor from '@/components/GymFloor'
import LockerRoom from '@/components/LockerRoom'


const page = () => {


    const controls = [
        {
          name: 'forward',
          keys: ['ArrowUp', 'w', 'W'],
        },
        {
          name: 'backward',
          keys: ['ArrowDown', 's', 'S'],
        },
        {
          name: 'left',
          keys: ['ArrowLeft', 'a', 'A'],
        },
        {
          name: 'right',
          keys: ['ArrowRight', 'd', 'D'],
        },
      ];


  return (
    <div className='h-screen'> 
    <KeyboardControls map = {controls}>
           <Canvas >
           <Physics>
       
            <OrbitControls />
     <Lights />
     <Experience />
     <Gym />
     <GymFloor />
     <LockerRoom />
     </Physics>

      </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default page
