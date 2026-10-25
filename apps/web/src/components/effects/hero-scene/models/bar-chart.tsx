import { SCENE_COLOURS } from "../colours";
import { GlossyMaterial, PaperMaterial } from "./materials";
import { RoundedSlab } from "./rounded-slab";
import type { ModelProps } from "./types";

const BASE_TOP = -0.69;

// A report: rising bars on a base plate, the tallest in the accent colour.
export function BarChartModel({ colour }: ModelProps) {
  const bars = [
    { x: -0.6, height: 0.6, colour: SCENE_COLOURS.sky },
    { x: -0.2, height: 1, colour: SCENE_COLOURS.violet },
    { x: 0.2, height: 0.75, colour: SCENE_COLOURS.indigo },
    { x: 0.6, height: 1.35, colour },
  ];

  return (
    <group>
      <group position={[0, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <RoundedSlab width={1.9} height={0.9} depth={0.12} radius={0.12}>
          <PaperMaterial />
        </RoundedSlab>
      </group>
      {bars.map((bar) => (
        <mesh key={bar.x} position={[bar.x, BASE_TOP + bar.height / 2, 0]}>
          <boxGeometry args={[0.3, bar.height, 0.3]} />
          <GlossyMaterial colour={bar.colour} />
        </mesh>
      ))}
    </group>
  );
}
