import { useAutoAnimate } from "@formkit/auto-animate/react";
import { type ReactNode, useEffect } from "react";
import { useVisualEffects } from "@/hooks/use-visual-effects";
import { EASE_OUT_CSS } from "@/lib/motion";

// A <ul> whose items slide in, out and into place when the list changes,
// including realtime updates. Only at full effects; keep it off dnd-kit lists,
// which animate their own reordering.
export function AnimatedList({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const visualEffects = useVisualEffects();
  const [ref, setEnabled] = useAutoAnimate<HTMLUListElement>({
    duration: 260,
    easing: EASE_OUT_CSS,
  });

  useEffect(() => {
    setEnabled(visualEffects === "full");
  }, [visualEffects, setEnabled]);

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
