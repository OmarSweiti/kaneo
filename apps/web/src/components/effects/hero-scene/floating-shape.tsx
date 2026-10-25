import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import type { ShapeKind, ShapeSpec } from "./shapes";

function ShapeGeometry({ kind }: { kind: ShapeKind }) {
  switch (kind) {
    case "icosahedron":
      return <icosahedronGeometry args={[1, 1]} />;
    case "torusKnot":
      return <torusKnotGeometry args={[0.7, 0.24, 160, 24]} />;
    case "torus":
      return <torusGeometry args={[0.8, 0.28, 32, 96]} />;
    case "sphere":
      return <sphereGeometry args={[1, 48, 48]} />;
    case "octahedron":
      return <octahedronGeometry args={[1, 0]} />;
    case "box":
      return <boxGeometry args={[1.3, 1.3, 1.3]} />;
  }
}

export function FloatingShape({
  kind,
  colour,
  position,
  scale,
  speed,
  wireframe,
}: ShapeSpec) {
  const mesh = useRef<Mesh>(null);
  const [baseX, baseY, baseZ] = position;

  useFrame(({ clock }) => {
    const shape = mesh.current;
    if (!shape) return;
    const t = clock.elapsedTime;
    const phase = (t / speed) * Math.PI * 2 + speed;
    shape.position.set(
      baseX + Math.cos(phase * 0.5) * 0.15,
      baseY + Math.sin(phase) * 0.35,
      baseZ,
    );
    shape.rotation.x = t / speed;
    shape.rotation.y = (t / speed) * 1.4;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <ShapeGeometry kind={kind} />
      {wireframe ? (
        <meshBasicMaterial
          color={colour}
          wireframe
          transparent
          opacity={0.55}
        />
      ) : (
        <meshPhysicalMaterial
          color={colour}
          roughness={0.18}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={0.7}
          iridescenceIOR={1.4}
          envMapIntensity={1.2}
        />
      )}
    </mesh>
  );
}
