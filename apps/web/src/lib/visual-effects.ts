export const VISUAL_EFFECTS_LEVELS = ["full", "reduced", "off"] as const;
export type VisualEffectsLevel = (typeof VISUAL_EFFECTS_LEVELS)[number];

export function isVisualEffectsLevel(
  value: unknown,
): value is VisualEffectsLevel {
  return VISUAL_EFFECTS_LEVELS.some((level) => level === value);
}

// The operating system's reduced-motion setting caps "full" at "reduced"; it
// never re-enables effects the user turned off.
export function resolveVisualEffects(
  preference: VisualEffectsLevel,
  prefersReducedMotion: boolean,
): VisualEffectsLevel {
  if (preference === "full" && prefersReducedMotion) return "reduced";
  return preference;
}
