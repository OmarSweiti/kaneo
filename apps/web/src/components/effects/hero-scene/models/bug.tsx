import { GlossyMaterial, INK } from "./materials";
import type { ModelProps } from "./types";

const LEG_ROWS = [0.25, -0.1, -0.45];
const SPOTS: [number, number][] = [
  [0.24, 0.12],
  [-0.24, 0.12],
  [0.22, -0.34],
  [-0.22, -0.34],
];

// A bug report: a beetle seen from above, head up, with spots, six legs and
// antennae.
export function BugModel({ colour }: ModelProps) {
  return (
    <group>
      <mesh position={[0, -0.1, 0]} scale={[0.55, 0.7, 0.35]}>
        <sphereGeometry args={[1, 48, 48]} />
        <GlossyMaterial colour={colour} />
      </mesh>
      <mesh position={[0, -0.1, 0.33]}>
        <boxGeometry args={[0.03, 1.25, 0.04]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      {SPOTS.map(([x, y]) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.28]} scale={[1, 1, 0.5]}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshStandardMaterial color={INK} />
        </mesh>
      ))}
      <mesh position={[0, 0.68, 0]} scale={[1, 0.85, 0.8]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color={INK} roughness={0.35} />
      </mesh>
      {LEG_ROWS.flatMap((y, row) =>
        [-1, 1].map((side) => (
          <mesh
            key={`${y}-${side}`}
            position={[side * 0.68, y, 0]}
            rotation={[0, 0, side * (Math.PI / 2 + (row - 1) * 0.35)]}
          >
            <cylinderGeometry args={[0.035, 0.035, 0.5, 10]} />
            <meshStandardMaterial color={INK} />
          </mesh>
        )),
      )}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.17, 1.02, 0]}>
          <mesh rotation={[0, 0, -side * 0.5]}>
            <cylinderGeometry args={[0.022, 0.022, 0.42, 8]} />
            <meshStandardMaterial color={INK} />
          </mesh>
          <mesh position={[side * 0.1, 0.19, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <GlossyMaterial colour={colour} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
