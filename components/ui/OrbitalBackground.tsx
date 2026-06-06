export function OrbitalBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 grid-bg opacity-20 md:opacity-40" />
      <div className="absolute inset-0 nebula-glow opacity-60 md:opacity-100" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[min(800px,100vw)] h-[min(800px,100vw)] rounded-full bg-[radial-gradient(circle,rgba(34,211,255,0.15)_0%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(950px,120vw)] h-[min(950px,120vw)] rounded-full border border-bellona-cyan/[0.06] hidden md:block" />
    </div>
  );
}
