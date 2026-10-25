// WebGL cannot read the oklch CSS tokens, so the scene uses the sRGB hex
// values of the same Tailwind colours behind the aurora palette.
export const SCENE_COLOURS = {
  violet: "#8b5cf6",
  indigo: "#6366f1",
  sky: "#38bdf8",
  fuchsia: "#d946ef",
  amber: "#fbbf24",
  emerald: "#10b981",
} as const;

export type ShapeKind =
  | "icosahedron"
  | "torusKnot"
  | "torus"
  | "sphere"
  | "octahedron"
  | "box";

export type ShapeSpec = {
  kind: ShapeKind;
  colour: string;
  position: [number, number, number];
  scale: number;
  // Seconds per float cycle; also offsets the phase so shapes drift apart.
  speed: number;
  wireframe?: boolean;
};

export type HeroSceneVariant = "auth" | "banner";

// "auth" frames a centred sign-in card, so shapes keep to the edges.
// "banner" is a short strip beside a page heading.
export const SCENE_SHAPES: Record<HeroSceneVariant, ShapeSpec[]> = {
  auth: [
    {
      kind: "torusKnot",
      colour: SCENE_COLOURS.violet,
      position: [-4.6, 1.6, -1],
      scale: 0.9,
      speed: 7,
    },
    {
      kind: "icosahedron",
      colour: SCENE_COLOURS.sky,
      position: [4.4, 2.1, -2],
      scale: 1.1,
      speed: 9,
      wireframe: true,
    },
    {
      kind: "sphere",
      colour: SCENE_COLOURS.fuchsia,
      position: [4.2, -1.9, 0],
      scale: 0.75,
      speed: 6,
    },
    {
      kind: "box",
      colour: SCENE_COLOURS.indigo,
      position: [-4.1, -2.2, 0.5],
      scale: 0.8,
      speed: 8,
    },
    {
      kind: "torus",
      colour: SCENE_COLOURS.amber,
      position: [-1.9, 3.1, -3],
      scale: 0.7,
      speed: 10,
    },
    {
      kind: "octahedron",
      colour: SCENE_COLOURS.emerald,
      position: [2.1, -3.2, -2.5],
      scale: 0.7,
      speed: 7.5,
    },
    {
      kind: "icosahedron",
      colour: SCENE_COLOURS.violet,
      position: [1.6, 3.3, -4],
      scale: 0.5,
      speed: 11,
    },
  ],
  banner: [
    {
      kind: "torusKnot",
      colour: SCENE_COLOURS.violet,
      position: [-1.6, 0.1, 0],
      scale: 0.75,
      speed: 7,
    },
    {
      kind: "icosahedron",
      colour: SCENE_COLOURS.sky,
      position: [0.6, 0.6, -1],
      scale: 0.7,
      speed: 9,
      wireframe: true,
    },
    {
      kind: "sphere",
      colour: SCENE_COLOURS.fuchsia,
      position: [1.9, -0.4, 0.2],
      scale: 0.5,
      speed: 6,
    },
    {
      kind: "box",
      colour: SCENE_COLOURS.amber,
      position: [0.1, -0.9, 0.6],
      scale: 0.4,
      speed: 8,
    },
  ],
};
