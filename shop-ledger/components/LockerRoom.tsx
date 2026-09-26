"use client";

import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const LockerRoom = () => {
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: "#24282A",
    roughness: 0.85,
    metalness: 0.05,
  });

  const wallHeight = 7;
  const roomWidth = 20;
  const roomDepth = 16;
  const wallThickness = 0.3;

  const locker = useGLTF("/locker.glb");

 
  const lockerPositions = Array.from(
    { length: 8 },
    (_, i) => ({
      x: -8 + i * 2.3,
      y: 0,
      z: -7,
    })
  );

  return (
    <group
      position={[-30, 0, 30]}
      rotation={[0, 3, 0]}
    >

    

      <mesh
        position={[
          0,
          wallHeight / 2,
          -roomDepth / 2,
        ]}
        material={wallMaterial}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            roomWidth,
            wallHeight,
            wallThickness,
          ]}
        />
      </mesh>


     

      <mesh
        position={[
          -roomWidth / 2,
          wallHeight / 2,
          0,
        ]}
        rotation={[0, Math.PI / 2, 0]}
        material={wallMaterial}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            roomDepth,
            wallHeight,
            wallThickness,
          ]}
        />
      </mesh>




      <mesh
        position={[
          roomWidth / 2,
          wallHeight / 2,
          0,
        ]}
        rotation={[0, Math.PI / 2, 0]}
        material={wallMaterial}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            roomDepth,
            wallHeight,
            wallThickness,
          ]}
        />
      </mesh>


      

      <mesh
        position={[
          -6,
          wallHeight / 2,
          roomDepth / 2,
        ]}
        material={wallMaterial}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            8,
            wallHeight,
            wallThickness,
          ]}
        />
      </mesh>




      <mesh
        position={[
          6,
          wallHeight / 2,
          roomDepth / 2,
        ]}
        material={wallMaterial}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            8,
            wallHeight,
            wallThickness,
          ]}
        />
      </mesh>


    

      <mesh
        position={[
          0,
          6.2,
          roomDepth / 2,
        ]}
        material={wallMaterial}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            4,
            1.6,
            wallThickness,
          ]}
        />
      </mesh>


     

      {lockerPositions.map((position, index) => (
        <primitive
          key={index}
          object={locker.scene.clone(true)}
          scale={3}
          position={[
            position.x,
            position.y,
            position.z,
          ]}
        />
      ))}

    </group>
  );
};

export default LockerRoom;