import { describe, expect, it } from "vite-plus/test";
import { PARTICLE_FIELD_OPTIONS } from "./options";

describe("PARTICLE_FIELD_OPTIONS", () => {
  it("stays inside its container instead of covering the page", () => {
    expect(PARTICLE_FIELD_OPTIONS.fullScreen).toEqual({ enable: false });
  });

  it("reads the pointer from the window because the canvas ignores it", () => {
    // Interactivity options come from a plugin, so the engine type leaves
    // them untyped.
    const interactivity = PARTICLE_FIELD_OPTIONS.interactivity as
      | { detectsOn?: string }
      | undefined;
    expect(interactivity?.detectsOn).toBe("window");
  });

  it("idles when the tab or the field is out of sight", () => {
    expect(PARTICLE_FIELD_OPTIONS.pauseOnBlur).toBe(true);
    expect(PARTICLE_FIELD_OPTIONS.pauseOnOutsideViewport).toBe(true);
  });
});
