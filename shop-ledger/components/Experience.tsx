"use client";

import {
  useAnimations,
  useGLTF,
  useKeyboardControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Experience = () => {
  const model = useGLTF("/model.glb");

  const characterRef = useRef<THREE.Group>(null);

  const [, getKeys] = useKeyboardControls();

  const { camera } = useThree();

  const { actions } = useAnimations(
    model.animations,
    characterRef
  );

  const wasMoving = useRef(false);


  const cameraOffset = useRef(
    new THREE.Vector3(0, 3, 6)
  );

  const cameraTarget = useRef(
    new THREE.Vector3()
  );

  const desiredCameraPosition = useRef(
    new THREE.Vector3()
  );

  const worldPosition = useRef(
    new THREE.Vector3()
  );

  useEffect(() => {
    const walking = actions["walking"];

    if (!walking) {
      console.log("Walking animation not found");
      console.log(
        "Available animations:",
        Object.keys(actions)
      );

      return;
    }

    walking.setLoop(
      THREE.LoopRepeat,
      Infinity
    );

    return () => {
      walking.stop();
    };
  }, [actions]);

  useFrame((_, delta) => {
    if (!characterRef.current) return;

    const character = characterRef.current;

    const {
      forward,
      backward,
      left,
      right,
    } = getKeys();

    const moving =
      forward ||
      backward ||
      left ||
      right;

    const walking = actions["walking"];


    if (moving && !wasMoving.current) {
      walking?.reset().fadeIn(0.2).play();
    }

    if (!moving && wasMoving.current) {
      walking?.fadeOut(0.2);
    }

    wasMoving.current = moving;

  
    const speed = 6;

    if (forward) {
      character.translateZ(
        -speed * delta
      );
    }

    if (backward) {
      character.translateZ(
        speed * delta
      );
    }

    if (left) {
      character.rotation.y +=
        2.5 * delta;
    }

    if (right) {
      character.rotation.y -=
        2.5 * delta;
    }


    character.getWorldPosition(
      worldPosition.current
    );

  
    desiredCameraPosition.current
      .copy(cameraOffset.current)
      .applyQuaternion(
        character.quaternion
      )
      .add(worldPosition.current);

  
    const smoothness =
      1 - Math.pow(0.001, delta);

    camera.position.lerp(
      desiredCameraPosition.current,
      smoothness
    );

    
    cameraTarget.current
      .copy(worldPosition.current);

    cameraTarget.current.y += 2;

    camera.lookAt(
      cameraTarget.current
    );
  });

  return (
    <group ref={characterRef}>
      <primitive object={model.scene} rotation = {[0, 3.2, 0]} position = {[0, 0 , 2]} />
    </group>
  );
};

export default Experience;