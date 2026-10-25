import { describe, expect, it } from "vite-plus/test";
import { isVisualEffectsLevel, resolveVisualEffects } from "./visual-effects";

describe("resolveVisualEffects", () => {
  it("keeps the preference when the system allows motion", () => {
    expect(resolveVisualEffects("full", false)).toBe("full");
    expect(resolveVisualEffects("reduced", false)).toBe("reduced");
    expect(resolveVisualEffects("off", false)).toBe("off");
  });

  it("caps full effects at reduced when the system prefers reduced motion", () => {
    expect(resolveVisualEffects("full", true)).toBe("reduced");
    expect(resolveVisualEffects("reduced", true)).toBe("reduced");
  });

  it("never turns effects back on", () => {
    expect(resolveVisualEffects("off", true)).toBe("off");
  });
});

describe("isVisualEffectsLevel", () => {
  it("accepts only known levels", () => {
    expect(isVisualEffectsLevel("full")).toBe(true);
    expect(isVisualEffectsLevel("off")).toBe(true);
    expect(isVisualEffectsLevel("max")).toBe(false);
    expect(isVisualEffectsLevel(undefined)).toBe(false);
  });
});
