// WebGL and the particle canvas cannot read the oklch CSS tokens, so the
// effects use the sRGB hex values of the same Tailwind colours behind the
// aurora palette.
export const SCENE_COLOURS = {
  violet: "#8b5cf6",
  indigo: "#6366f1",
  sky: "#38bdf8",
  fuchsia: "#d946ef",
  amber: "#fbbf24",
  emerald: "#10b981",
  rose: "#f43f5e",
} as const;
