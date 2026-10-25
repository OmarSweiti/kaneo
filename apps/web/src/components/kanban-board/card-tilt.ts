export const MAX_CARD_TILT_DEG = 6;

export type CardTilt = {
  tiltX: string;
  tiltY: string;
  spotX: string;
  spotY: string;
};

// x and y are the pointer position within the card as fractions (0..1).
// Pointing at the top edge tips the card back (positive rotateX); pointing at
// the right edge turns it right (positive rotateY).
export function cardTiltFromPointer(x: number, y: number): CardTilt {
  const clampedX = Math.min(Math.max(x, 0), 1);
  const clampedY = Math.min(Math.max(y, 0), 1);
  return {
    tiltX: `${((0.5 - clampedY) * MAX_CARD_TILT_DEG).toFixed(2)}deg`,
    tiltY: `${((clampedX - 0.5) * MAX_CARD_TILT_DEG).toFixed(2)}deg`,
    spotX: `${(clampedX * 100).toFixed(1)}%`,
    spotY: `${(clampedY * 100).toFixed(1)}%`,
  };
}
