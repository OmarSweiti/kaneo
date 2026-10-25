import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { GlossyMaterial, INK, PaperMaterial } from "./materials";
import type { ModelProps } from "./types";

const TICKS = Array.from(
  { length: 12 },
  (_, index) => (index / 12) * Math.PI * 2,
);

// Deadlines and time tracking: a stopwatch whose hand keeps sweeping.
export function StopwatchModel({ colour }: ModelProps) {
  const hand = useRef<Group>(null);

  useFrame((_, delta) => {
    if (hand.current) hand.current.rotation.z -= delta * 1.2;
  });

  return (
    <group>
      <mesh>
        <torusGeometry args={[0.74, 0.11, 24, 96]} />
        <GlossyMaterial colour={colour} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 64]} />
        <PaperMaterial />
      </mesh>
      {TICKS.map((angle) => (
        <mesh
          key={angle}
          position={[Math.sin(angle) * 0.56, Math.cos(angle) * 0.56, 0.06]}
          rotation={[0, 0, -angle]}
        >
          <boxGeometry args={[0.04, 0.12, 0.02]} />
          <meshStandardMaterial color={INK} />
        </mesh>
      ))}
      <group ref={hand} position={[0, 0, 0.08]}>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.05, 0.48, 0.03]} />
          <GlossyMaterial colour={colour} />
        </mesh>
      </group>
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.06, 24]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.18, 24]} />
        <GlossyMaterial colour={colour} />
      </mesh>
      <mesh position={[0, 0.86, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.035, 12, 32]} />
        <meshStandardMaterial color={INK} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}
