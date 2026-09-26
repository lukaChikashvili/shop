import {
    useAnimations,
    useGLTF,
    useKeyboardControls,
  } from '@react-three/drei'
  import { useFrame } from '@react-three/fiber'
  import { useEffect, useRef } from 'react'
  import * as THREE from 'three'
  
  const Experience = () => {
    const model = useGLTF('/model.glb');
  
    const characterRef = useRef<THREE.Group>(null);
  
    const [, getKeys] = useKeyboardControls();
  
    const { actions } = useAnimations(
      model.animations,
      characterRef
    );

  
    const wasMoving = useRef(false);
  
    useEffect(() => {
      const walking = actions['walking'];
  
      if (!walking) {
        console.log('Walking animation not found')
        console.log('Available animations:', Object.keys(actions))
        return
      }
  
      walking.setLoop(THREE.LoopRepeat, Infinity)
  
      return () => {
        walking.stop()
      }
    }, [actions])
  
    useFrame((_, delta) => {
      if (!characterRef.current) return;
  
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

  
      const walking = actions['walking'];

  
      
      if (moving && !wasMoving.current) {
        walking?.reset().fadeIn(0.2).play();
      }
  
     
      if (!moving && wasMoving.current) {
        walking?.fadeOut(0.2);
      }
  
      wasMoving.current = moving;
  
    
      if (!moving) return
  
      const speed = 3 * delta;

  
      if (forward) {
        characterRef.current.translateZ(-speed);
      }
  
      if (backward) {
        characterRef.current.translateZ(speed);
      }
  
     
      if (left) {
        characterRef.current.rotation.y += 2 * delta;
      }
  
      if (right) {
        characterRef.current.rotation.y -= 2 * delta;
      }
    })
  
    return (
      <group ref={characterRef}>
        <primitive object={model.scene} rotation = {[0, 3.2, 0]}  />
      </group>
    )
  }
  
  export default Experience