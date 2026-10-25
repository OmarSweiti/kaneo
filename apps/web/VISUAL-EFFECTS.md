# Visual effects

This fork layers colour, motion and 3D on top of Kaneo's UI. Everything decorative is controlled by one preference, so people who want a calm interface (or a slow machine) can turn it down.

## Levels

**Preferences → General → Visual effects** sets `full`, `reduced` or `off`. The resolved level is written to `<html data-effects="…">`, and every effect keys off that attribute.

| Level | What you get |
| --- | --- |
| Full | Everything: 3D scenes, particles, confetti, card tilt, spring animations, drifting backgrounds. |
| Reduced | Colours and gentle fades only; backgrounds stand still; no WebGL or particles are loaded. |
| Off | Colours only; decorative backgrounds are hidden too. |

The operating system's *reduce motion* setting caps `full` at `reduced` (`src/lib/visual-effects.ts`). Kaneo's own reduced-motion rules in `src/index.css` still apply on top.

## Where things live

- **Palette**: `src/index.css`. Aurora tokens (`--aurora-*`), `--brand-gradient`, `--brand-text-gradient`, per-status column colours (`--column-*`) and the violet primary, for light and dark.
- **CSS motion**: `src/styles/effects/`, one file per area: buttons, popups, navigation, controls, board, cards, ambient backdrop and pages. The rules target the `data-slot` attributes the UI components already render, so most components needed no changes.
- **Effect components**: `src/components/effects/`.
  - `hero-scene/`: the three.js scene behind sign-in pages and the Home banner.
  - `particle-field/`: the tsParticles network behind sign-in and onboarding.
  - `ambient-backdrop.tsx`: the aurora light behind page content.
  - `animated-list.tsx`: auto-animated lists (activity feed, inbox).
  - `celebrate.ts`: confetti when a task moves into a done column.
- **Board card tilt**: `src/components/kanban-board/use-card-tilt.ts`.

## Changing the 3D objects

The objects are project-management things built from three.js primitives: task card, kanban board, done badge, bug, bar and pie charts, calendar, stopwatch, milestone flag and gear. Nothing is downloaded at runtime.

- To move, recolour, resize or swap them, edit `src/components/effects/hero-scene/shapes.ts`. It has one list for the sign-in pages (`auth`) and one for the Home banner (`banner`).
- To add a new object, create a component in `hero-scene/models/` and register it in `models/index.ts`.

## Performance

Measured with a production build against upstream `main`. The initial page load grows by **+0.6 KB JS and +3.7 KB CSS** (gzipped). Everything heavy is code-split and only fetched at full effects:

| Chunk | Size (gzip) | Loaded when |
| --- | --- | --- |
| 3D scene (three.js + fiber) | ~239 KB | A sign-in page or Home is shown with WebGL available. |
| Particle network (tsParticles) | ~29 KB, up to ~48 KB with plugins the engine loads on demand | A sign-in or onboarding page is shown. |
| Confetti | ~22 KB, up to ~41 KB with plugins | The first task is completed. |

Other limits keep the effects cheap:

- **3D scene:** it stops rendering when off-screen or the tab is hidden, caps the pixel ratio at 1.5, and uses a procedural environment instead of fetching an HDR file from a CDN.
- **Particles:** they pause when hidden or out of view.
- **Board cards:** the tilt uses one delegated listener for the whole board, writes styles at most once per frame, only applies its 3D transform while a card is hovered, and is off for touch input and while dragging.

## Credits

- [three.js](https://threejs.org) and [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) (MIT): 3D rendering.
- [tsParticles](https://particles.js.org) (MIT): the maintained successor of [particles.js](https://github.com/VincentGarreau/particles.js), which has not been released since 2015.
- [@formkit/auto-animate](https://auto-animate.formkit.com) (MIT): list transitions.
- [Uiverse](https://uiverse.io) (MIT): inspiration for the shine sweep, border beam and glow patterns. They were rebuilt on Kaneo's theme tokens rather than copied, because Uiverse elements use fixed sizes and colours and lack accessibility states.

## Known notes

- In development, `@react-three/fiber` 9.8 logs a `THREE.Clock` deprecation warning with three 0.186. It comes from the library and is harmless.
- The first visit after adding a dependency makes Vite re-optimise and reload the page once. This only happens in development.
