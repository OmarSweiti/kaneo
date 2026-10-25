import { Canvas, type RootState, useFrame } from "@react-three/fiber";
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { type Group, PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SCENE_COLOURS } from "./colours";
import { FloatingModel } from "./floating-model";
import { type HeroSceneVariant, SCENE_SHAPES } from "./shapes";

// Reflections come from a procedurally built room, so the scene never
// downloads an HDR environment map from a third-party CDN. The texture lives
// as long as the canvas; fiber releases the GL context when it unmounts.
function addStudioEnvironment({ gl, scene }: RootState) {
  const pmrem = new PMREMGenerator(gl);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.04).texture;
  room.dispose();
  pmrem.dispose();
}

function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} />
      <pointLight
        position={[-6, -2, 3]}
        intensity={30}
        color={SCENE_COLOURS.fuchsia}
      />
      <pointLight
        position={[6, 3, 2]}
        intensity={30}
        color={SCENE_COLOURS.sky}
      />
    </>
  );
}

// The canvas does not take pointer events (it sits behind the UI), so the
// parallax reads the pointer from the window and eases the whole group.
function ParallaxRig({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useFrame((_, delta) => {
    const rig = group.current;
    if (!rig) return;
    const ease = 1 - Math.exp(-delta * 3);
    rig.rotation.y += (pointer.current.x * 0.25 - rig.rotation.y) * ease;
    rig.rotation.x += (pointer.current.y * 0.15 - rig.rotation.x) * ease;
  });

  return <group ref={group}>{children}</group>;
}

// Stops the render loop while the scene is scrolled away or the tab is
// hidden, so an idle page costs no GPU time.
function useRenderWhileVisible(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let inView = true;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [ref]);

  return visible;
}

export default function Scene({ variant }: { variant: HeroSceneVariant }) {
  const container = useRef<HTMLDivElement>(null);
  const active = useRenderWhileVisible(container);

  return (
    <div
      ref={container}
      className="size-full [animation:effects-fade_1.2s_var(--ease-out)_both]"
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, variant === "auth" ? 8 : 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={addStudioEnvironment}
      >
        <StudioLighting />
        <ParallaxRig>
          {SCENE_SHAPES[variant].map((shape) => (
            <FloatingModel
              key={`${shape.model}-${shape.position.join(",")}`}
              {...shape}
            />
          ))}
        </ParallaxRig>
      </Canvas>
    </div>
  );
}
