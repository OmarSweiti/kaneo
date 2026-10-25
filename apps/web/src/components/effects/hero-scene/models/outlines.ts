import { Path, Shape } from "three";

// Flat outlines that the models extrude into 3D. All are centred on the
// origin so extruded meshes rotate around their middle.

export function roundedRectShape(
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  const x = -width / 2;
  const y = -height / 2;
  const shape = new Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

export function gearShape(
  teeth: number,
  outerRadius: number,
  rootRadius: number,
  holeRadius: number,
) {
  const shape = new Shape();
  const step = (Math.PI * 2) / teeth;
  const point = (angle: number, radius: number) =>
    [Math.cos(angle) * radius, Math.sin(angle) * radius] as const;

  for (let tooth = 0; tooth < teeth; tooth++) {
    const start = tooth * step;
    const outline = [
      point(start, rootRadius),
      point(start + step * 0.15, outerRadius),
      point(start + step * 0.45, outerRadius),
      point(start + step * 0.6, rootRadius),
    ];
    for (const [index, [px, py]] of outline.entries()) {
      if (tooth === 0 && index === 0) shape.moveTo(px, py);
      else shape.lineTo(px, py);
    }
  }
  shape.closePath();

  const hole = new Path();
  hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}
