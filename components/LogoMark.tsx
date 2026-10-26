/**
 * The cube-stack mark. Geometry is copied unchanged from assets/logo/bellona-mark-on-{light,dark}.svg,
 * only grouped (top / bottom / wedge) so the parent `.hx` link can play the exploded-view hover.
 * Gap strokes must equal the background colour, so pass `gap` for non-white/non-ink backgrounds.
 */

type Variant = "light" | "dark";

const faces: Record<Variant, { top: string; left: string; right: string; wedge: string; gap: string }> = {
  // on-light: F97316 / FF5500 / 0D0D0D, gaps #FFFFFF
  light: { top: "fill-orange-light", left: "fill-orange", right: "fill-ink", wedge: "fill-orange", gap: "stroke-paper" },
  // on-dark: FFFFFF / F97316 / FF5500, gaps #0D0D0D
  dark: { top: "fill-paper", left: "fill-orange-light", right: "fill-orange", wedge: "fill-orange-light", gap: "stroke-ink" },
};

export function LogoMark({
  variant = "light",
  size = 48,
  gap,
  className,
  title,
}: {
  variant?: Variant;
  size?: number;
  gap?: string;
  className?: string;
  /** Accessible name; omit when the parent link already has one. */
  title?: string;
}) {
  const f = faces[variant];
  const stroke = gap ?? f.gap;
  return (
    <svg
      viewBox="8 8 184 184"
      width={size}
      height={size}
      className={`overflow-visible ${className ?? ""}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g className={stroke} strokeWidth={3} strokeLinejoin="round">
        <g className="hx-bottom">
          <polygon points="60.2,111 100,88 139.8,111 100,134" className={f.top} />
          <polygon points="60.2,111 100,134 100,180 60.2,157" className={f.left} />
          <polygon points="100,134 139.8,111 139.8,157 100,180" className={f.right} />
        </g>
        <g className="hx-top">
          <polygon points="60.2,43 100,20 139.8,43 100,66" className={f.top} />
          <polygon points="60.2,43 100,66 100,112 60.2,89" className={f.left} />
          <polygon points="100,66 139.8,43 139.8,89 100,112" className={f.right} />
        </g>
        <g className="hx-wedge">
          <polygon points="60.2,89 79.2,100 60.2,111" className={f.wedge} />
        </g>
      </g>
    </svg>
  );
}
