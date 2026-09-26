"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

const EQUIPMENT = [
  {
    id: "bench-press",
    objectName: "Bench_press_0",
    name: "Bench Press",
    muscleGroups: [
      "Chest",
      "Triceps",
      "Front Delts",
    ],
  },
  
];

const Gym = () => {
  const gym = useGLTF("/gym.glb");

  const machines = useMemo(() => {
    return EQUIPMENT.map((equipment) => {
      const object = gym.scene.getObjectByName(
        equipment.objectName
      );

      return {
        ...equipment,
        object,
      };
    });
  }, [gym]);

  return (
    <group>
      {machines.map((machine) => {
        if (!machine.object) return null;

        return (
          <primitive
            key={machine.id}
            object={machine.object}
          />
        );
      })}
    </group>
  );
};

export default Gym;

export { EQUIPMENT };