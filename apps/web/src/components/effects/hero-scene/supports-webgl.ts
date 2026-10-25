let cached: boolean | undefined;

// Checked once per page. Test environments without WebGL (jsdom) and
// browsers with hardware acceleration disabled report false, and callers
// fall back to the CSS backdrop.
export function supportsWebGL(): boolean {
  if (cached !== undefined) return cached;
  if (
    typeof window === "undefined" ||
    typeof window.WebGLRenderingContext === "undefined"
  ) {
    cached = false;
    return cached;
  }
  try {
    const canvas = document.createElement("canvas");
    cached = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    cached = false;
  }
  return cached;
}
