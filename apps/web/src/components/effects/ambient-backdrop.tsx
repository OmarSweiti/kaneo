// Soft aurora light behind page content. It sits at z-index -1 inside an
// isolated parent, so it paints above the parent's background and below
// everything else; the effects stylesheet sizes, colours and drifts it.
export function AmbientBackdrop() {
  return (
    <div
      aria-hidden
      data-slot="ambient-backdrop"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
    >
      <span data-ambient-blob="violet" />
      <span data-ambient-blob="sky" />
      <span data-ambient-blob="fuchsia" />
    </div>
  );
}
