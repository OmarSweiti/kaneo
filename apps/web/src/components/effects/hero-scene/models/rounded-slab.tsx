import { type ReactNode, useMemo } from "react";
import { roundedRectShape } from "./outlines";

const BEVEL = 0.025;

// A rounded rectangle with depth, centred on the origin (front face at
// z = depth / 2). Cards, pages and boards are built on it.
export function RoundedSlab({
  width,
  height,
  depth,
  radius,
  position,
  children,
}: {
  width: number;
  height: number;
  depth: number;
  radius: number;
  position?: [number, number, number];
  children: ReactNode;
}) {
  const shape = useMemo(
    () => roundedRectShape(width - BEVEL * 2, height - BEVEL * 2, radius),
    [width, height, radius],
  );

  return (
    <mesh position={position}>
      <extrudeGeometry
        args={[
          shape,
          {
            depth: depth - BEVEL * 2,
            bevelEnabled: true,
            bevelThickness: BEVEL,
            bevelSize: BEVEL,
            bevelSegments: 3,
            curveSegments: 10,
          },
        ]}
        onUpdate={(geometry) => geometry.center()}
      />
      {children}
    </mesh>
  );
}
