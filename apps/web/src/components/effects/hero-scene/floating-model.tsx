import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { WORK_MODELS } from "./models";
import type { ShapeSpec } from "./shapes";

// Bobs a model up and down and sways it around its resting orientation, so
// it feels alive without spinning away from the viewer.
export function FloatingModel({
  model,
  colour,
  position,
  rotation = [0, 0, 0],
  scale,
  speed,
}: ShapeSpec) {
  const group = useRef<Group>(null);
  const [baseX, baseY, baseZ] = position;
  const [restX, restY, restZ] = rotation;
  const Model = WORK_MODELS[model];

  useFrame(({ clock }) => {
    const float = group.current;
    if (!float) return;
    const phase = (clock.elapsedTime / speed) * Math.PI * 2 + speed;
    float.position.set(
      baseX + Math.cos(phase * 0.5) * 0.15,
      baseY + Math.sin(phase) * 0.3,
      baseZ,
    );
    float.rotation.set(
      restX + Math.sin(phase * 0.7) * 0.18,
      restY + Math.sin(phase) * 0.45,
      restZ + Math.sin(phase * 0.5) * 0.08,
    );
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <Model colour={colour} />
    </group>
  );
}
