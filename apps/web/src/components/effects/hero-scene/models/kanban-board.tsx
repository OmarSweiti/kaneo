import { SCENE_COLOURS } from "../colours";
import { GlossyMaterial, PaperMaterial } from "./materials";
import { RoundedSlab } from "./rounded-slab";
import type { ModelProps } from "./types";

// To do, in progress and done, each with its status colour on the cards.
const COLUMNS = [
  { x: -0.68, cards: [0.45, 0.13, -0.19], colour: SCENE_COLOURS.sky },
  { x: 0, cards: [0.45, 0.13], colour: SCENE_COLOURS.amber },
  { x: 0.68, cards: [0.45], colour: SCENE_COLOURS.emerald },
];

// A miniature Kaneo board: a frame in the accent colour holding three
// columns of cards.
export function KanbanBoardModel({ colour }: ModelProps) {
  return (
    <group>
      <RoundedSlab width={2.15} height={1.55} depth={0.1} radius={0.16}>
        <GlossyMaterial colour={colour} />
      </RoundedSlab>
      {COLUMNS.map((column) => (
        <group key={column.x} position={[column.x, 0, 0.06]}>
          <RoundedSlab width={0.62} height={1.3} depth={0.04} radius={0.08}>
            <PaperMaterial colour="#e2e8f0" />
          </RoundedSlab>
          {column.cards.map((y) => (
            <group key={y} position={[0, y, 0.04]}>
              <RoundedSlab
                width={0.52}
                height={0.24}
                depth={0.05}
                radius={0.05}
              >
                <PaperMaterial />
              </RoundedSlab>
              <mesh position={[-0.22, 0, 0.03]}>
                <boxGeometry args={[0.04, 0.18, 0.02]} />
                <GlossyMaterial colour={column.colour} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}
