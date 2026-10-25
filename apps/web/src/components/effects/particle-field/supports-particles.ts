// tsParticles 4 draws through OffscreenCanvas (current Chromium and Firefox,
// Safari 16.4+). Test environments (jsdom) and older browsers lack it, and
// the engine would reject asynchronously, so callers skip particles there.
export function supportsParticles(): boolean {
  return typeof globalThis.OffscreenCanvas !== "undefined";
}
