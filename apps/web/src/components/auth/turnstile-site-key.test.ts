import { describe, expect, it } from "vite-plus/test";
import { normalizeTurnstileSiteKey } from "./turnstile-site-key";

describe("normalizeTurnstileSiteKey", () => {
  it("passes a real site key through", () => {
    expect(normalizeTurnstileSiteKey("0x4AAAAAAABkMYinukE8nzY")).toBe(
      "0x4AAAAAAABkMYinukE8nzY",
    );
  });

  it("treats an empty value as no site key", () => {
    expect(normalizeTurnstileSiteKey("")).toBeUndefined();
    expect(normalizeTurnstileSiteKey(undefined)).toBeUndefined();
  });

  it("treats the unreplaced container placeholder as no site key", () => {
    expect(
      normalizeTurnstileSiteKey("KANEO_TURNSTILE_SITE_KEY"),
    ).toBeUndefined();
  });
});
