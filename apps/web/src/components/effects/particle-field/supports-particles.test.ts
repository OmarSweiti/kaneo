import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { supportsParticles } from "./supports-particles";

describe("supportsParticles", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reports false without OffscreenCanvas, as in jsdom", () => {
    expect(supportsParticles()).toBe(false);
  });

  it("reports true where OffscreenCanvas exists", () => {
    vi.stubGlobal("OffscreenCanvas", class {});
    expect(supportsParticles()).toBe(true);
  });
});
