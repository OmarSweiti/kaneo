import { GlossyMaterial, PaperMaterial } from "./materials";
import type { ModelProps } from "./types";

const FRONT = 0.15;

// A "done" badge: a coin with a raised checkmark.
export function CheckBadgeModel({ colour }: ModelProps) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.22, 64]} />
        <GlossyMaterial colour={colour} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.85, 0.06, 16, 96]} />
        <PaperMaterial />
      </mesh>
      <mesh position={[-0.24, -0.11, FRONT]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.48, 0.16, 0.08]} />
        <PaperMaterial />
      </mesh>
      <mesh position={[0.16, 0.01, FRONT]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.82, 0.16, 0.08]} />
        <PaperMaterial />
      </mesh>
    </group>
  );
}
