"use client";

import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const GymFloor = () => {
  const texture = useTexture("/floor.jpg");

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  texture.repeat.set(12, 12);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[100, 100]} />

      <meshStandardMaterial
        map={texture}
        roughness={0.82}
        metalness={0}
      />
    </mesh>
  );
};

export default GymFloor;