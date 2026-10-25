import { celebrate } from "@/components/effects/celebrate";

// Bursts confetti from the card once it has rendered in its new column. The
// effect is decorative, so a failed chunk load is ignored.
export function celebrateTask(taskId: string) {
  requestAnimationFrame(() => {
    const card = document.querySelector(
      `[data-task-id="${CSS.escape(taskId)}"]`,
    );
    const rect = card?.getBoundingClientRect();
    if (!rect) return;
    celebrate({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }).catch(() => undefined);
  });
}
