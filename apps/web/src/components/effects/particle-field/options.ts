import type { ISourceOptions } from "@tsparticles/engine";
import { SCENE_COLOURS } from "../hero-scene/shapes";

// The classic particles.js "network": drifting dots joined by faint lines,
// with lines reaching for the pointer. The canvas sits behind the UI without
// pointer events, so the engine listens on the window instead.
export const PARTICLE_FIELD_OPTIONS: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  fpsLimit: 60,
  detectRetina: true,
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  particles: {
    number: { value: 70, density: { enable: true } },
    color: {
      value: [SCENE_COLOURS.violet, SCENE_COLOURS.sky, SCENE_COLOURS.fuchsia],
    },
    opacity: { value: { min: 0.35, max: 0.75 } },
    size: { value: { min: 1, max: 2.5 } },
    links: {
      enable: true,
      color: SCENE_COLOURS.violet,
      distance: 140,
      opacity: 0.32,
      width: 1,
    },
    move: { enable: true, speed: 0.6, outModes: { default: "out" } },
  },
  interactivity: {
    detectsOn: "window",
    events: { onHover: { enable: true, mode: "grab" } },
    modes: { grab: { distance: 170, links: { opacity: 0.45 } } },
  },
};
