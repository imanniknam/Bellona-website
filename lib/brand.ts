export const BRAND_COLORS = {
  cyan: "#22D3FF",
  blue: "#4A8DFF",
  violet: "#8B5CFF",
  black: "#050505",
  white: "#FFFFFF",
} as const;

export const BRAND_GRADIENT = {
  primary: `linear-gradient(135deg, ${BRAND_COLORS.cyan} 0%, ${BRAND_COLORS.blue} 50%, ${BRAND_COLORS.violet} 100%)`,
  vertical: `linear-gradient(180deg, ${BRAND_COLORS.cyan} 0%, ${BRAND_COLORS.blue} 45%, ${BRAND_COLORS.violet} 100%)`,
  glow: `radial-gradient(ellipse at center, rgba(34,211,255,0.18) 0%, rgba(74,141,255,0.1) 35%, rgba(139,92,255,0.06) 60%, transparent 75%)`,
} as const;

export const BRAND_MOTION = {
  ease: [0.16, 1, 0.3, 1] as const,
  duration: 0.7,
  float: { y: [0, -10, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } },
} as const;
