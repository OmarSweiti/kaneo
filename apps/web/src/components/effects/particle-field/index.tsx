import { lazy, Suspense } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useVisualEffects } from "@/hooks/use-visual-effects";
import { cn } from "@/lib/cn";
import { supportsParticles } from "./supports-particles";

// tsParticles (the maintained successor of particles.js) is loaded only when
// a field actually renders.
const Field = lazy(() => import("./field"));

function NoField() {
  return null;
}

// Decorative particle network; renders nothing below full effects or where
// the browser cannot run tsParticles.
export function ParticleField({ className }: { className?: string }) {
  const visualEffects = useVisualEffects();
  if (visualEffects !== "full" || !supportsParticles()) return null;

  return (
    <div
      aria-hidden
      data-slot="particle-field"
      className={cn("pointer-events-none", className)}
    >
      <ErrorBoundary fallback={NoField}>
        <Suspense fallback={null}>
          <Field />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
