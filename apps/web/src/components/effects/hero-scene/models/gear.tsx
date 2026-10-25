import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";
import { GlossyMaterial } from "./materials";
import { gearShape } from "./outlines";
import type { ModelProps } from "./types";

// Workflows and automation: a gear that keeps turning.
export function GearModel({ colour }: ModelProps) {
  const gear = useRef<Mesh>(null);
  const shape = useMemo(() => gearShape(10, 0.9, 0.72, 0.28), []);

  useFrame((_, delta) => {
    if (gear.current) gear.current.rotation.z += delta * 0.5;
  });

  return (
    <mesh ref={gear}>
      <extrudeGeometry
        args={[
          shape,
          {
            depth: 0.22,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.03,
            bevelSegments: 3,
          },
        ]}
        onUpdate={(geometry) => geometry.center()}
      />
      <GlossyMaterial colour={colour} />
    </mesh>
  );
}
