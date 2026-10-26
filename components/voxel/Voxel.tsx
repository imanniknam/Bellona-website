import type { CSSProperties } from "react";
import { MODELS, type ModelName, type Tone, type Vox } from "./models";

/**
 * Isometric voxel art in the language of the Bellona mark: the same 30° projection and the same
 * three faces (lit top, orange left, ink right), with gap strokes in the background colour.
 *
 * Rendering: one <g> per height layer, each holding a few merged paths (sides first, then tops).
 * For unit cubes in this projection that order is a correct painter's order, and it keeps the DOM
 * small enough for detailed, small-cube models. Layers drop in one by one on reveal and lift in a
 * wave on hover (globals.css, .vx).
 */

const S = 10; // edge length in user units
const W = S * 0.8660254; // half-width of a top face
const H = S * 0.5; // half-height of a top face

const FACES: Record<Tone, { top: string; left: string; right: string }> = {
  o: { top: "fill-orange-light", left: "fill-orange", right: "fill-ink" },
  k: { top: "fill-body", left: "fill-graphite", right: "fill-ink" },
  w: { top: "fill-paper", left: "fill-surface", right: "fill-line" },
  g: { top: "fill-muted-dark", left: "fill-muted", right: "fill-graphite" },
};

const p = (x: number, y: number, z: number) => `${((x - y) * W).toFixed(2)} ${((x + y) * H - z * S).toFixed(2)}`;
const quad = (a: string, b: string, c: string, d: string) => `M${a}L${b}L${c}L${d}Z`;

type Face = "left" | "right" | "top";

export function VoxelArt({
  model,
  voxels,
  className = "",
  gap = "stroke-paper",
  swap,
  label,
  headroom = 18,
  anim,
}: {
  model?: ModelName;
  voxels?: Vox[];
  className?: string;
  /** Stroke class matching the background, like the logo's gap strokes. */
  gap?: string;
  /** Re-map tones, e.g. { o: "w" } on an orange card. */
  swap?: Partial<Record<Tone, Tone>>;
  /** Accessible name; decorative when omitted. */
  label?: string;
  /** Space above the model for the hover lift and drop-in. */
  headroom?: number;
  /** How the cubes assemble on reveal: drop (default), rise from below, or pop from their footprint. */
  anim?: "drop" | "rise" | "pop";
}) {
  const list = voxels ?? (model ? MODELS[model] : []);
  const occupied = new Set(list.map(([x, y, z]) => `${x},${y},${z}`));
  const has = (x: number, y: number, z: number) => occupied.has(`${x},${y},${z}`);

  // layer z → face → tone → path data
  const layers = new Map<number, Record<Face, Map<Tone, string[]>>>();
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const sorted = [...list].sort((a, b) => a[2] - b[2] || a[0] + a[1] - (b[0] + b[1]));
  for (const [x, y, z, t0 = "o"] of sorted) {
    const t = swap?.[t0] ?? t0;
    let layer = layers.get(z);
    if (!layer) {
      layer = { left: new Map(), right: new Map(), top: new Map() };
      layers.set(z, layer);
    }
    const faces = layer;
    const add = (face: Face, d: string) => {
      const m = faces[face];
      if (!m.has(t)) m.set(t, []);
      m.get(t)!.push(d);
    };
    if (!has(x, y + 1, z)) add("left", quad(p(x, y + 1, z), p(x + 1, y + 1, z), p(x + 1, y + 1, z + 1), p(x, y + 1, z + 1)));
    if (!has(x + 1, y, z)) add("right", quad(p(x + 1, y, z), p(x + 1, y + 1, z), p(x + 1, y + 1, z + 1), p(x + 1, y, z + 1)));
    if (!has(x, y, z + 1)) add("top", quad(p(x, y, z + 1), p(x + 1, y, z + 1), p(x + 1, y + 1, z + 1), p(x, y + 1, z + 1)));

    minX = Math.min(minX, (x - y - 1) * W);
    maxX = Math.max(maxX, (x - y + 1) * W);
    minY = Math.min(minY, (x + y) * H - (z + 1) * S);
    maxY = Math.max(maxY, (x + y + 2) * H - z * S);
  }

  const pad = 3;
  const viewBox = `${(minX - pad).toFixed(1)} ${(minY - pad - headroom).toFixed(1)} ${(maxX - minX + pad * 2).toFixed(1)} ${(maxY - minY + pad * 2 + headroom).toFixed(1)}`;
  const zs = [...layers.keys()].sort((a, b) => a - b);

  return (
    <svg
      viewBox={viewBox}
      className={`vox overflow-visible ${className}`}
      data-anim={anim}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <g className={gap} strokeWidth={0.6} strokeLinejoin="round">
        {zs.map((z, i) => {
          const layer = layers.get(z)!;
          return (
            <g key={z} className="vx" style={{ "--i": i, "--z": i } as CSSProperties}>
              {(["left", "right", "top"] as Face[]).flatMap((face) =>
                [...layer[face]].map(([tone, ds]) => <path key={`${face}-${tone}`} className={FACES[tone][face]} d={ds.join("")} />),
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** One small brand cube, e.g. as a bullet or before an eyebrow. */
export function MiniCube({ className = "size-3", gap = "stroke-transparent", tone = "o" }: { className?: string; gap?: string; tone?: Tone }) {
  return <VoxelArt voxels={[[0, 0, 0, tone]]} className={`vox-static ${className}`} gap={gap} headroom={0} />;
}
