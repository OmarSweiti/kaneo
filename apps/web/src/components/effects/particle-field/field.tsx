import type { Engine } from "@tsparticles/engine";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useId } from "react";
import { PARTICLE_FIELD_OPTIONS } from "./options";

// ParticlesProvider requires the same init callback for the app's lifetime.
async function loadEngine(engine: Engine) {
  await loadSlim(engine);
}

export default function Field() {
  const id = useId();

  return (
    <ParticlesProvider init={loadEngine}>
      <Particles
        id={`particle-field-${id}`}
        options={PARTICLE_FIELD_OPTIONS}
        className="size-full [animation:effects-fade_1.5s_var(--ease-out)_both]"
      />
    </ParticlesProvider>
  );
}
