"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Ceiling } from "./Ceiling";


const LockerRoom = () => {
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: "#FF7F50",
    roughness: 0.85,
    metalness: 0.05,
  });

  // poster
  const poster = useTexture('/poster.jpg');
  const poster2 = useTexture('/poster2.jpg');


  const wallHeight = 10;
  const roomWidth =40;
  const roomDepth = 26;
  const wallThickness = 0.7;

  const locker = useGLTF("/locker.glb");
  const chair = useGLTF('/chair.glb');

 
  const lockerPositions = Array.from(
    { length: 18},
    (_, i) => ({
      x: -18 + i * 2.2,
      y: 0,
      z: -13,
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
          -10,
          wallHeight / 2,
          roomDepth / 2,
        ]}
        material={wallMaterial}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            20,
            wallHeight,
            wallThickness,
          ]}
        />
      </mesh>




      <mesh
        position={[
          15,
          wallHeight / 2,
          roomDepth / 2,
        ]}
        material={wallMaterial}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            20,
            wallHeight,
            wallThickness,
          ]}
        />
      </mesh>


    

      <mesh
        position={[
          0,
          8.2,
          roomDepth / 2,
        ]}
        material={wallMaterial}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            20,
            4.6,
            wallThickness,
          ]}
        />
      </mesh>


     

      {lockerPositions.map((position, index) => (
        <primitive
          key={index}
          object={locker.scene.clone(true)}
          scale={5.1}
          
          position={[
            position.x,
            position.y,
            position.z,
          ]}
        />
      ))}

<group>
  <primitive
    object={chair.scene}
    scale={0.15}
    position={[-3, 0, 0]}
    rotation={[0, 1.6, 0]}
  />

  <primitive
    object={chair.scene.clone(true)}
    scale={0.15}
    position={[6, 0, 0]}
    rotation={[0, 1.6, 0]}
  />
</group>

     <mesh rotation = {[0, 1.5, 0]} position = {[-19, 5, -5]}>
        <boxGeometry args = {[8, 5, 0.1]} />
        <meshStandardMaterial map = {poster} />
     </mesh>

     <mesh rotation = {[0, 1.5, 0]} position = {[-19, 5, 5]}>
        <boxGeometry args = {[8, 5, 0.1]} />
        <meshStandardMaterial map = {poster2} />
     </mesh>

     <Ceiling />

    </group>

    
  );
};

export default LockerRoom;