import { SCENE_COLOURS } from "../colours";
import { GlossyMaterial } from "./materials";
import type { ModelProps } from "./types";

const RADIUS = 0.9;
const POP_OUT = 0.16;

// A report pie with one slice (the accent) pulled out.
export function PieChartModel({ colour }: ModelProps) {
  const slices = [
    { start: 0, length: 3.6, colour: SCENE_COLOURS.violet, pop: false },
    { start: 3.6, length: 1.7, colour: SCENE_COLOURS.sky, pop: false },
    { start: 5.3, length: Math.PI * 2 - 5.3, colour, pop: true },
  ];

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {slices.map((slice) => {
        // Cylinder segments sweep around Y with x = sin and z = cos.
        const middle = slice.start + slice.length / 2;
        const offset = slice.pop ? POP_OUT : 0;
        return (
          <mesh
            key={slice.start}
            position={[Math.sin(middle) * offset, 0, Math.cos(middle) * offset]}
          >
            <cylinderGeometry
              args={[
                RADIUS,
                RADIUS,
                0.3,
                48,
                1,
                false,
                slice.start,
                slice.length,
              ]}
            />
            <GlossyMaterial colour={slice.colour} />
          </mesh>
        );
      })}
    </group>
  );
}
