import type { CSSProperties } from "react";

/**
 * Isometric floor under the hero mark (reference/HomeBWO.dc.html), with detail:
 * 30° lines in `grid`, a scatter of filled tiles that thickens toward the mark, small brand cubes
 * sitting on tiles, pulsing orange nodes, and orange "data" traces running along the grid toward
 * the centre. Static SVG; the motion is CSS (globals.css, .iso-*) and stops under reduced motion.
 */

const K = 560 / 970; // slope of the 30° lines
const HW = 60; // tile half-width
const HH = HW * K; // tile half-height (≈34.6)
const X0 = -515; // lattice origin from the line family in the mockup
const Y0 = 280;

const lines = (() => {
  const d: string[] = [];
  for (let x = -1000; x <= 1400; x += 120) d.push(`M${x},560 L${x + 970},0`, `M${x},0 L${x + 970},560`);
  return d.join(" ");
})();

/** Tile centre for lattice coords (N, M) with N + M odd. */
const center = (n: number, m: number) => [X0 + HW * n, Y0 + HH * m] as const;

const diamond = (cx: number, cy: number, inset = 0) => {
  const w = HW - inset * 1.73;
  const h = HH - inset;
  return `${cx - w},${cy} ${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h}`;
};

// Deterministic pseudo-random, so server and client output match.
const rand = (n: number, m: number) => {
  const s = Math.sin(n * 127.1 + m * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

const tiles: { cx: number; cy: number; tone: "surface" | "line" | "orange" }[] = [];
for (let n = 0; n <= 36; n++) {
  for (let m = -9; m <= 9; m++) {
    if ((n + m) % 2 === 0) continue;
    const [cx, cy] = center(n, m);
    if (cx < -HW || cx > 1440 + HW || cy < -HH || cy > 560 + HH) continue;
    const dist = Math.hypot((cx - 720) / 720, (cy - 330) / 330);
    const r = rand(n, m);
    if (r < 0.045 && dist > 0.5) tiles.push({ cx, cy, tone: "orange" });
    else if (r < 0.55 - dist * 0.4) tiles.push({ cx, cy, tone: r < 0.2 ? "line" : "surface" });
  }
}

// Small cubes standing on tiles (n + m odd), clear of the mark in the middle: [n, m, stack height]
const cubes: [number, number, number][] = [
  [12, -1, 1],
  [14, 3, 2],
  [16, -3, 1],
  [11, 4, 1],
  [25, 2, 1],
  [27, -2, 2],
  [29, 4, 1],
  [31, 0, 1],
];

const C = { w: 22, h: 22 * K, z: 26 }; // cube top half-width, half-height, side height

function Cube({ cx, cy, level, i }: { cx: number; cy: number; level: number; i: number }) {
  const y = cy - level * C.z;
  const pts = {
    top: `${cx - C.w},${y - C.z} ${cx},${y - C.z - C.h} ${cx + C.w},${y - C.z} ${cx},${y - C.z + C.h}`,
    left: `${cx - C.w},${y - C.z} ${cx},${y - C.z + C.h} ${cx},${y + C.h} ${cx - C.w},${y}`,
    right: `${cx},${y - C.z + C.h} ${cx + C.w},${y - C.z} ${cx + C.w},${y} ${cx},${y + C.h}`,
  };
  return (
    <g className="iso-float" style={{ "--i": i } as CSSProperties}>
      <polygon points={pts.left} className="fill-orange" />
      <polygon points={pts.right} className="fill-ink" />
      <polygon points={pts.top} className="fill-orange-light" />
    </g>
  );
}

const nodes = [
  [145, 176],
  [325, 280],
  [145, 384],
  [325, 488],
  [1225, 107],
  [1405, 211],
  [1225, 315],
  [1405, 419],
];

/** Walks lattice vertices (n, m same parity) along the grid lines: moves are [dn, dm, steps]. */
const vertex = (n: number, m: number) => `${X0 + HW * n},${(Y0 + HH * m).toFixed(1)}`;
function walk(n: number, m: number, moves: [number, number, number][]) {
  const pts = [vertex(n, m)];
  for (const [dn, dm, steps] of moves) {
    n += dn * steps;
    m += dm * steps;
    pts.push(vertex(n, m));
  }
  return `M ${pts.join(" L ")}`;
}

// Traces from the edges toward the mark (dash animated in CSS); x = where each one starts.
const traces = [
  { x: X0 + HW * 9, d: walk(9, 7, [[1, -1, 4], [1, 1, 2], [1, -1, 3]]) },
  { x: X0 + HW * 33, d: walk(33, -5, [[-1, 1, 4], [-1, -1, 2], [-1, 1, 4]]) },
  { x: X0 + HW * 33, d: walk(33, 7, [[-1, -1, 3], [-1, 1, 1], [-1, -1, 4]]) },
  { x: X0 + HW * 9, d: walk(9, -7, [[1, 1, 5], [1, -1, 2], [1, 1, 4]]) },
];

/** Which half may carry orange decoration (cubes, orange tiles, traces, nodes). */
export type DecorSide = "all" | "left" | "right";
const onSide = (x: number, side: DecorSide) => side === "all" || (side === "right" ? x > 760 : x < 680);

/**
 * `decor` keeps the orange pieces away from the headline: on the full-width desktop floor only the
 * logo's half is decorated, the text half shows plain grey tiles that fade out.
 */
export function IsoGrid({
  className,
  decor = "all",
  cubes: showCubes = true,
}: {
  className?: string;
  decor?: DecorSide;
  /** Small floor cubes. Off on the desktop floor, where Hero places them around the logo instead. */
  cubes?: boolean;
}) {
  return (
    <svg viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      <g>
        {tiles.map((t) => (
          <polygon
            key={`${t.cx}-${t.cy}`}
            points={diamond(t.cx, t.cy, 4)}
            className={
              t.tone === "orange" && onSide(t.cx, decor) ? "fill-orange/15" : t.tone === "line" ? "fill-line/70" : "fill-surface"
            }
          />
        ))}
      </g>
      <path d={lines} className="fill-none stroke-grid" strokeWidth={1.2} />
      <g className="fill-none stroke-orange" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {traces
          .filter((t) => onSide(t.x, decor))
          .map((t, i) => (
            <path key={t.d} d={t.d} className="iso-flow" style={{ "--i": i } as CSSProperties} />
          ))}
      </g>
      <g className="stroke-paper" strokeWidth={1.5} strokeLinejoin="round">
        {cubes.map(([n, m, h], i) => {
          const [cx, cy] = center(n, m);
          if (!showCubes || !onSide(cx, decor)) return null;
          return Array.from({ length: h }, (_, level) => <Cube key={`${n}-${m}-${level}`} cx={cx} cy={cy + HH * 0.35} level={level} i={i} />);
        })}
      </g>
      <g className="fill-orange">
        {nodes
          .filter(([cx]) => onSide(cx, decor))
          .map(([cx, cy], i) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4} className="iso-pulse" style={{ "--i": i } as CSSProperties} />
          ))}
      </g>
    </svg>
  );
}
