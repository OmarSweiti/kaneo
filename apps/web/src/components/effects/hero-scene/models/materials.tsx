// Shared looks for the work models: a glossy coloured plastic, a soft
// "paper" white for cards and pages, and an ink grey for text lines.

export const PAPER = "#f8fafc";
export const PAPER_SHADE = "#cbd5e1";
export const INK = "#334155";

export function GlossyMaterial({ colour }: { colour: string }) {
  return (
    <meshPhysicalMaterial
      color={colour}
      roughness={0.2}
      metalness={0.1}
      clearcoat={1}
      clearcoatRoughness={0.12}
      iridescence={0.45}
      iridescenceIOR={1.35}
      envMapIntensity={1.1}
    />
  );
}

export function PaperMaterial({ colour = PAPER }: { colour?: string }) {
  return (
    <meshPhysicalMaterial
      color={colour}
      roughness={0.45}
      clearcoat={0.4}
      envMapIntensity={0.8}
    />
  );
}
