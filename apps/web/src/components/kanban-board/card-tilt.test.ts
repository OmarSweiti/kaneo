import { describe, expect, it } from "vite-plus/test";
import { cardTiltFromPointer, MAX_CARD_TILT_DEG } from "./card-tilt";

describe("cardTiltFromPointer", () => {
  it("rests flat at the centre", () => {
    expect(cardTiltFromPointer(0.5, 0.5)).toEqual({
      tiltX: "0.00deg",
      tiltY: "0.00deg",
      spotX: "50.0%",
      spotY: "50.0%",
    });
  });

  it("tips toward the pointer by at most half the maximum per axis", () => {
    const corner = cardTiltFromPointer(1, 0);
    expect(corner.tiltX).toBe(`${(MAX_CARD_TILT_DEG / 2).toFixed(2)}deg`);
    expect(corner.tiltY).toBe(`${(MAX_CARD_TILT_DEG / 2).toFixed(2)}deg`);
  });

  it("clamps pointer positions outside the card", () => {
    expect(cardTiltFromPointer(-1, 3)).toEqual(cardTiltFromPointer(0, 1));
  });
});
