import { describe, expect, it } from "vite-plus/test";
import { supportsWebGL } from "./supports-webgl";

describe("supportsWebGL", () => {
  it("reports false where WebGL is unavailable", () => {
    // jsdom does not implement WebGL, which is exactly the fallback case.
    expect(supportsWebGL()).toBe(false);
  });
});
