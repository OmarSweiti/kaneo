import { type RefObject, useEffect } from "react";
import { cardTiltFromPointer } from "./card-tilt";

const CARD_SELECTOR = '[data-slot="task-card"]';
const TILT_PROPERTIES = ["--tilt-x", "--tilt-y", "--spot-x", "--spot-y"];

function resetCard(card: HTMLElement) {
  for (const property of TILT_PROPERTIES) card.style.removeProperty(property);
  delete card.dataset.tilting;
}

// One delegated listener for the whole board instead of one per card. It only
// writes CSS variables on the hovered card (at most once per frame); the
// effects stylesheet turns them into the tilt and spotlight. Mouse only, and
// any pressed button (a drag) flattens the card.
export function useCardTilt(
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    let frame = 0;
    let pending: PointerEvent | null = null;
    let activeCard: HTMLElement | null = null;

    const release = () => {
      if (activeCard) resetCard(activeCard);
      activeCard = null;
    };

    const update = () => {
      frame = 0;
      const event = pending;
      pending = null;
      if (!event) return;

      const card =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(CARD_SELECTOR)
          : null;
      if (card !== activeCard) release();
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const tilt = cardTiltFromPointer(
        (event.clientX - rect.left) / rect.width,
        (event.clientY - rect.top) / rect.height,
      );
      card.style.setProperty("--tilt-x", tilt.tiltX);
      card.style.setProperty("--tilt-y", tilt.tiltY);
      card.style.setProperty("--spot-x", tilt.spotX);
      card.style.setProperty("--spot-y", tilt.spotY);
      card.dataset.tilting = "";
      activeCard = card;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.buttons !== 0) {
        release();
        return;
      }
      pending = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", release);
    container.addEventListener("pointerdown", release);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", release);
      container.removeEventListener("pointerdown", release);
      cancelAnimationFrame(frame);
      release();
    };
  }, [containerRef, enabled]);
}
