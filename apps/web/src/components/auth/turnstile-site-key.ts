const publicEnv: { turnstileSiteKey: string | undefined } = {
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
};

// .env.production holds a "KANEO_TURNSTILE_SITE_KEY" placeholder that the
// container's env.sh replaces at start. Static hosts (Netlify, Pages) never
// run it, so an unreplaced placeholder means no site key, as Sentry's DSN
// check in instrument.ts already assumes.
export function normalizeTurnstileSiteKey(value: string | undefined) {
  if (!value || value.startsWith("KANEO_")) return undefined;
  return value;
}

export function getTurnstileSiteKey() {
  return normalizeTurnstileSiteKey(publicEnv.turnstileSiteKey);
}
