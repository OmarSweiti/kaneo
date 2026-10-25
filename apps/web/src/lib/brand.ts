// The name this deployment shows in place of "Kaneo".
export const BRAND_NAME = "Perfect Coders CheckList";

// Keys where "Kaneo" means the upstream product or another Kaneo server (the
// import source, Kaneo Cloud), not this app, so the word must stay.
const UPSTREAM_KEY_PATTERNS = [
  "workspaceImport.sources.kaneo.",
  "workspaceImport.kaneo.",
  "billing.foundingFree.",
];

function isUpstreamKey(key: string | string[]) {
  const keys = Array.isArray(key) ? key : [key];
  return keys.some((candidate) =>
    UPSTREAM_KEY_PATTERNS.some((pattern) => candidate.includes(pattern)),
  );
}

// Locale files keep upstream's wording so they merge cleanly; this swaps the
// product name at display time. Lowercase identifiers (kaneo-cli, URLs) and
// the X-Kaneo-Signature header name are left alone.
export function brandText(value: string, key: string | string[] = []) {
  if (isUpstreamKey(key)) return value;
  return value
    .replace(/(?<!X-)Kaneo/g, BRAND_NAME)
    .replace(/KANEO/g, BRAND_NAME.toUpperCase());
}
