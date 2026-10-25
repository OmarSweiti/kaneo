import { SCENE_COLOURS } from "./colours";
import type { WorkModel } from "./models";

export type ShapeSpec = {
  model: WorkModel;
  colour: string;
  position: [number, number, number];
  // Resting orientation; the float animation sways around it so the model
  // keeps facing the viewer and stays recognisable.
  rotation?: [number, number, number];
  scale: number;
  // Seconds per float cycle; also offsets the phase so models drift apart.
  speed: number;
};

export type HeroSceneVariant = "auth" | "banner";

// "auth" frames a centred sign-in panel, so models keep to the edges.
// "banner" is a short strip beside a page heading.
export const SCENE_SHAPES: Record<HeroSceneVariant, ShapeSpec[]> = {
  auth: [
    {
      model: "taskCard",
      colour: SCENE_COLOURS.violet,
      position: [-4.3, 1.7, -1],
      rotation: [0.1, 0.35, -0.08],
      scale: 0.95,
      speed: 7,
    },
    {
      model: "barChart",
      colour: SCENE_COLOURS.fuchsia,
      position: [4.3, 1.8, -1.5],
      rotation: [0.35, -0.4, 0],
      scale: 0.9,
      speed: 9,
    },
    {
      model: "bug",
      colour: SCENE_COLOURS.rose,
      position: [4.2, -1.8, 0],
      rotation: [0, 0, -0.4],
      scale: 0.8,
      speed: 6,
    },
    {
      model: "checkBadge",
      colour: SCENE_COLOURS.emerald,
      position: [-3.9, -1.7, 0],
      rotation: [0, 0.3, 0],
      scale: 0.85,
      speed: 8,
    },
    {
      model: "calendar",
      colour: SCENE_COLOURS.amber,
      position: [-2.1, 3, -3],
      rotation: [0.1, 0.3, 0.1],
      scale: 0.75,
      speed: 10,
    },
    {
      model: "stopwatch",
      colour: SCENE_COLOURS.sky,
      position: [2.8, 3, -3.5],
      rotation: [0, -0.3, 0],
      scale: 0.7,
      speed: 7.5,
    },
    {
      model: "kanbanBoard",
      colour: SCENE_COLOURS.indigo,
      position: [-1.9, -3.2, -2.5],
      rotation: [-0.2, 0.2, 0],
      scale: 0.75,
      speed: 11,
    },
    {
      model: "gear",
      colour: SCENE_COLOURS.violet,
      position: [2.2, -3.2, -2.5],
      scale: 0.7,
      speed: 9.5,
    },
  ],
  banner: [
    {
      model: "kanbanBoard",
      colour: SCENE_COLOURS.indigo,
      position: [-2.4, 0, 0],
      rotation: [0, 0.35, 0],
      scale: 0.78,
      speed: 9,
    },
    {
      model: "checkBadge",
      colour: SCENE_COLOURS.emerald,
      position: [-0.55, 0.15, -0.5],
      scale: 0.62,
      speed: 7,
    },
    {
      model: "pieChart",
      colour: SCENE_COLOURS.amber,
      position: [1, 0, 0],
      rotation: [-0.2, 0.25, 0],
      scale: 0.66,
      speed: 8,
    },
    {
      model: "milestoneFlag",
      colour: SCENE_COLOURS.fuchsia,
      position: [2.6, 0, -0.5],
      scale: 0.62,
      speed: 6,
    },
  ],
};
