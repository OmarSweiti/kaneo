import { SCENE_COLOURS } from "./hero-scene/colours";
import { supportsParticles } from "./particle-field/supports-particles";

// A short confetti burst from a point on screen, in viewport pixels. The
// confetti bundle is fetched on the first celebration only; callers gate
// this on full visual effects.
export async function celebrate(origin: { x: number; y: number }) {
  if (!supportsParticles()) return;
  const { confetti } = await import("@tsparticles/confetti");
  await confetti({
    particleCount: 70,
    spread: 75,
    startVelocity: 30,
    gravity: 1.1,
    ticks: 160,
    scalar: 0.9,
    zIndex: 100,
    disableForReducedMotion: true,
    origin: {
      x: origin.x / window.innerWidth,
      y: origin.y / window.innerHeight,
    },
    colors: [
      SCENE_COLOURS.violet,
      SCENE_COLOURS.sky,
      SCENE_COLOURS.fuchsia,
      SCENE_COLOURS.amber,
      SCENE_COLOURS.emerald,
    ],
  });
}
