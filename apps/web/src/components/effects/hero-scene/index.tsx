import { lazy, Suspense } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useVisualEffects } from "@/hooks/use-visual-effects";
import { cn } from "@/lib/cn";
import type { HeroSceneVariant } from "./shapes";
import { supportsWebGL } from "./supports-webgl";

// three.js and react-three-fiber live in this chunk; it is only requested
// when a scene actually renders.
const Scene = lazy(() => import("./scene"));

function NoScene() {
  return null;
}

// Decorative 3D shapes. Renders nothing unless effects are at full and the
// browser has WebGL; a failing GPU context is caught here instead of taking
// the page down.
export function HeroScene({
  variant,
  className,
}: {
  variant: HeroSceneVariant;
  className?: string;
}) {
  const visualEffects = useVisualEffects();
  if (visualEffects !== "full" || !supportsWebGL()) return null;

  return (
    <div
      aria-hidden
      data-slot="hero-scene"
      className={cn("pointer-events-none", className)}
    >
      <ErrorBoundary fallback={NoScene}>
        <Suspense fallback={null}>
          <Scene variant={variant} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
