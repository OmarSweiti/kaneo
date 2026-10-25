import { GlossyMaterial, INK, PaperMaterial } from "./materials";
import type { ModelProps } from "./types";

// A milestone: a flag on a pole planted in a round base.
export function MilestoneFlagModel({ colour }: ModelProps) {
  return (
    <group>
      <mesh position={[-0.45, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 2, 16]} />
        <meshStandardMaterial color={INK} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.45, 1.02, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <GlossyMaterial colour={colour} />
      </mesh>
      <mesh position={[0.05, 0.62, 0]}>
        <boxGeometry args={[0.95, 0.6, 0.05]} />
        <GlossyMaterial colour={colour} />
      </mesh>
      <mesh position={[0.05, 0.62, 0.035]}>
        <boxGeometry args={[0.32, 0.08, 0.02]} />
        <PaperMaterial />
      </mesh>
      <mesh position={[-0.45, -1, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.1, 40]} />
        <PaperMaterial />
      </mesh>
    </group>
  );
}
