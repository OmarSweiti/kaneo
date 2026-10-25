import { Box2, Vector2 } from "three";
import { describe, expect, it } from "vite-plus/test";
import { gearShape, roundedRectShape } from "./outlines";

function bounds(points: Vector2[]) {
  return new Box2().setFromPoints(points);
}

describe("roundedRectShape", () => {
  it("is centred and spans the requested size", () => {
    const box = bounds(roundedRectShape(2, 1, 0.2).getPoints());
    expect(box.min.x).toBeCloseTo(-1);
    expect(box.max.x).toBeCloseTo(1);
    expect(box.min.y).toBeCloseTo(-0.5);
    expect(box.max.y).toBeCloseTo(0.5);
  });

  it("caps the corner radius at half the shorter side", () => {
    const box = bounds(roundedRectShape(1, 0.4, 5).getPoints());
    expect(box.max.y).toBeCloseTo(0.2);
  });
});

describe("gearShape", () => {
  it("reaches the outer radius and keeps a centre hole", () => {
    const gear = gearShape(8, 1, 0.8, 0.3);
    const box = bounds(gear.getPoints());
    expect(Math.max(box.max.x, box.max.y)).toBeCloseTo(1, 1);
    expect(gear.holes).toHaveLength(1);
  });
});
