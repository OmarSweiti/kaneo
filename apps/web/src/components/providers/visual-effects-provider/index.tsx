import { useEffect } from "react";
import { useVisualEffects } from "@/hooks/use-visual-effects";

// Exposes the resolved level as <html data-effects="full|reduced|off"> so CSS
// can gate decorative motion without every component reading the store.
export function VisualEffectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const level = useVisualEffects();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.effects = level;
    return () => {
      delete root.dataset.effects;
    };
  }, [level]);

  return <>{children}</>;
}
