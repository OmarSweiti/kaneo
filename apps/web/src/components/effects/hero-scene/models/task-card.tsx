import { SCENE_COLOURS } from "../colours";
import { GlossyMaterial, INK, PAPER_SHADE, PaperMaterial } from "./materials";
import { RoundedSlab } from "./rounded-slab";
import type { ModelProps } from "./types";

const FRONT = 0.075;

// A ticket: status stripe, ID, title and description lines, a status pill
// and an assignee avatar.
export function TaskCardModel({ colour }: ModelProps) {
  return (
    <group>
      <RoundedSlab width={1.9} height={1.25} depth={0.12} radius={0.14}>
        <PaperMaterial />
      </RoundedSlab>
      <mesh position={[-0.86, 0, FRONT]}>
        <boxGeometry args={[0.07, 1, 0.03]} />
        <GlossyMaterial colour={colour} />
      </mesh>
      <mesh position={[-0.47, 0.36, FRONT]}>
        <boxGeometry args={[0.5, 0.09, 0.02]} />
        <meshStandardMaterial color={PAPER_SHADE} />
      </mesh>
      <mesh position={[-0.15, 0.14, FRONT]}>
        <boxGeometry args={[1.1, 0.12, 0.02]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      <mesh position={[-0.27, -0.06, FRONT]}>
        <boxGeometry args={[0.86, 0.08, 0.02]} />
        <meshStandardMaterial color={PAPER_SHADE} />
      </mesh>
      <RoundedSlab
        width={0.46}
        height={0.18}
        depth={0.05}
        radius={0.09}
        position={[-0.47, -0.36, FRONT]}
      >
        <GlossyMaterial colour={colour} />
      </RoundedSlab>
      <mesh position={[0.66, -0.34, FRONT]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        <GlossyMaterial colour={SCENE_COLOURS.amber} />
      </mesh>
    </group>
  );
}
