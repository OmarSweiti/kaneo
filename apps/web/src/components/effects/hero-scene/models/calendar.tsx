import { GlossyMaterial, INK, PAPER_SHADE, PaperMaterial } from "./materials";
import { RoundedSlab } from "./rounded-slab";
import type { ModelProps } from "./types";

const FRONT = 0.085;
const ROWS = [0.12, -0.16, -0.44];
const COLUMNS = [-0.48, -0.16, 0.16, 0.48];
const DUE_DAY = { x: 0.16, y: -0.16 };

// A due date: a calendar page with binder rings and one highlighted day.
export function CalendarModel({ colour }: ModelProps) {
  return (
    <group>
      <RoundedSlab width={1.5} height={1.5} depth={0.14} radius={0.16}>
        <PaperMaterial />
      </RoundedSlab>
      <RoundedSlab
        width={1.5}
        height={0.38}
        depth={0.16}
        radius={0.12}
        position={[0, 0.56, 0.01]}
      >
        <GlossyMaterial colour={colour} />
      </RoundedSlab>
      {[-0.38, 0.38].map((x) => (
        <mesh key={x} position={[x, 0.78, 0.02]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.1, 0.035, 12, 32]} />
          <meshStandardMaterial color={INK} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      {ROWS.flatMap((y) =>
        COLUMNS.map((x) => {
          const isDue = x === DUE_DAY.x && y === DUE_DAY.y;
          return (
            <mesh key={`${x},${y}`} position={[x, y, FRONT]}>
              <boxGeometry args={[0.22, 0.2, isDue ? 0.06 : 0.025]} />
              {isDue ? (
                <GlossyMaterial colour={colour} />
              ) : (
                <meshStandardMaterial color={PAPER_SHADE} />
              )}
            </mesh>
          );
        }),
      )}
    </group>
  );
}
