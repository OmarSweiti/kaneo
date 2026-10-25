import { useReducedMotion } from "framer-motion";
import {
  resolveVisualEffects,
  type VisualEffectsLevel,
} from "@/lib/visual-effects";
import { useUserPreferencesStore } from "@/store/user-preferences";

export function useVisualEffects(): VisualEffectsLevel {
  const preference = useUserPreferencesStore((state) => state.visualEffects);
  const prefersReducedMotion = useReducedMotion() ?? false;
  return resolveVisualEffects(preference, prefersReducedMotion);
}
