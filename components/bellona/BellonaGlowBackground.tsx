import { cn } from "@/lib/utils";

interface BellonaGlowBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
  showGrid?: boolean;
  nebula?: boolean;
}

export function BellonaGlowBackground({
  className,
  intensity = "medium",
  showGrid = true,
  nebula = false,
}: BellonaGlowBackgroundProps) {
  const opacity = {
    subtle: { cyan: 0.08, violet: 0.05 },
    medium: { cyan: 0.14, violet: 0.09 },
    strong: { cyan: 0.2, violet: 0.13 },
  }[intensity];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {showGrid && <div className="absolute inset-0 grid-bg opacity-20 md:opacity-40" />}
      {nebula && <div className="absolute inset-0 nebula-glow opacity-70 md:opacity-100" />}

      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[min(1000px,95vw)] h-[400px] md:h-[600px] rounded-full"
        style={{
          background: `radial-gradient(ellipse, rgba(34,211,255,${opacity.cyan}) 0%, rgba(74,141,255,${opacity.cyan * 0.5}) 40%, transparent 70%)`,
        }}
      />

      <div
        className="absolute bottom-[5%] right-[5%] w-[min(500px,80vw)] h-[min(450px,60vw)] rounded-full hidden sm:block"
        style={{
          background: `radial-gradient(ellipse, rgba(139,92,255,${opacity.violet}) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
