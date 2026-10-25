import type { ReactNode } from "react";
import { AmbientBackdrop } from "../effects/ambient-backdrop";
import { HeroScene } from "../effects/hero-scene";
import { ParticleField } from "../effects/particle-field";
import { AuthLegalFooter } from "./auth-legal-footer";

type AuthPageProps = {
  title: string;
  description?: ReactNode;
  notice?: ReactNode;
  children?: ReactNode;
};

export function AuthPage({
  title,
  description,
  notice,
  children,
}: AuthPageProps) {
  return (
    <main className="relative isolate h-svh w-full overflow-y-auto bg-background">
      <AmbientBackdrop />
      <ParticleField className="fixed inset-0 -z-10" />
      <HeroScene variant="auth" className="fixed inset-0 -z-10" />
      <div className="flex min-h-full flex-col items-center">
        <div className="flex w-full grow flex-col items-center justify-center px-4 py-12 sm:px-6">
          {/* Frosted panel keeps the form legible over the 3D scene. */}
          <div
            data-slot="auth-panel"
            className="flex w-full max-w-[408px] flex-col rounded-2xl border border-border/70 bg-card/75 p-5 shadow-[0_24px_64px_-24px_var(--brand-glow)] backdrop-blur-xl sm:p-6"
          >
            <div className="flex flex-col gap-5 pb-8">
              <img
                src="/favicon.svg"
                alt=""
                className="size-10 shrink-0 rounded-lg border border-border shadow-[0_0_24px_-4px_var(--brand-glow)]"
              />
              <div className="flex flex-col gap-1.5">
                <h1 className="font-semibold text-[22px] text-foreground leading-7 tracking-[-0.02em]">
                  {title}
                </h1>
                {description ? (
                  <p className="text-muted-foreground text-sm">{description}</p>
                ) : null}
              </div>
              {notice}
            </div>
            {children}
          </div>
        </div>
        <AuthLegalFooter />
      </div>
    </main>
  );
}
