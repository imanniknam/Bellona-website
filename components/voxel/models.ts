/**
 * Voxel models built from Bellona cubes, at a resolution where each cube reads clearly and the
 * silhouette (house, robot, chart…) is still obvious at card size. Coordinates: x → right-down, y → left-down,
 * z → up. Faces that point at the viewer are the +x (right) and +y (left) sides.
 * Tones: "o" brand orange (logo faces), "k" ink, "w" white, "g" grey.
 */

export type Tone = "o" | "k" | "w" | "g";
export type Vox = [number, number, number, Tone?];

type Box = (x: number, y: number, z: number, dx: number, dy: number, dz: number, t: Tone) => void;
type At = (x: number, y: number, z: number, t: Tone) => void;
type Clear = (x: number, y: number, z: number, dx?: number, dy?: number, dz?: number) => void;

/** Collects voxels; later writes to the same cell replace earlier ones, `clear` carves holes. */
function build(fn: (box: Box, at: At, clear: Clear) => void): Vox[] {
  const cells = new Map<string, Vox>();
  const at: At = (x, y, z, t) => cells.set(`${x},${y},${z}`, [x, y, z, t]);
  const box: Box = (x, y, z, dx, dy, dz, t) => {
    for (let i = 0; i < dx; i++) for (let j = 0; j < dy; j++) for (let k = 0; k < dz; k++) at(x + i, y + j, z + k, t);
  };
  const clear: Clear = (x, y, z, dx = 1, dy = 1, dz = 1) => {
    for (let i = 0; i < dx; i++) for (let j = 0; j < dy; j++) for (let k = 0; k < dz; k++) cells.delete(`${x + i},${y + j},${z + k}`);
  };
  fn(box, at, clear);
  return [...cells.values()];
}

export const MODELS = {
  // Industries ---------------------------------------------------------------
  /** Real estate: a gabled house with door, windows, chimney and a small tree. */
  house: build((box, at) => {
    box(0, 0, 0, 7, 6, 1, "g"); // plot
    box(1, 1, 1, 5, 4, 3, "o"); // walls
    // gable roof, ridge along x, eaves overhanging by one cube
    box(0, 0, 4, 7, 6, 1, "k");
    box(0, 1, 5, 7, 4, 1, "k");
    box(0, 2, 6, 7, 2, 1, "k");
    box(2, 4, 1, 1, 1, 2, "k"); // door (left face)
    at(4, 4, 2, "w"); // window (left face)
    at(5, 2, 2, "w"); // window (right face)
    box(5, 1, 6, 1, 1, 2, "g"); // chimney
    box(8, 4, 1, 1, 1, 2, "k"); // tree trunk
    box(7, 3, 3, 3, 3, 2, "o"); // tree crown
  }),
  /** Finance: a classical bank with steps, columns and a pediment. */
  bank: build((box) => {
    box(0, 0, 0, 9, 6, 1, "g"); // steps
    box(1, 0, 1, 7, 3, 4, "k"); // hall
    for (const x of [1, 3, 5, 7]) box(x, 4, 1, 1, 1, 4, "w"); // columns
    box(0, 0, 5, 9, 6, 1, "w"); // entablature
    box(1, 1, 6, 7, 4, 1, "o"); // pediment
    box(3, 2, 7, 3, 2, 1, "o");
  }),
  /** Healthcare: a medical cross on a plinth. */
  health: build((box) => {
    box(0, 0, 0, 7, 4, 1, "g");
    box(3, 1, 1, 2, 2, 6, "o"); // vertical bar
    box(1, 1, 3, 6, 2, 2, "o"); // horizontal bar
  }),
  /** E-commerce: a shopping bag with handles next to a taped parcel. */
  shop: build((box, at) => {
    box(0, 0, 0, 5, 4, 6, "o"); // bag
    box(0, 0, 6, 5, 4, 1, "k"); // folded top
    at(1, 2, 7, "k"); // handle
    box(1, 2, 8, 3, 1, 1, "k");
    at(3, 2, 7, "k");
    box(6, 1, 0, 3, 3, 3, "g"); // parcel
    box(7, 1, 0, 1, 3, 3, "w"); // tape
  }),
  /** Consulting: a briefcase with a band, clasp and handle. */
  briefcase: build((box, at) => {
    box(0, 0, 0, 8, 4, 5, "k");
    box(0, 0, 2, 8, 4, 1, "o"); // band
    box(3, 3, 2, 2, 1, 1, "w"); // clasp
    at(2, 1, 5, "o"); // handle
    box(2, 1, 6, 4, 1, 1, "o");
    at(5, 1, 5, "o");
  }),
  /** Education: a graduation cap on a stack of books. */
  cap: build((box, at) => {
    box(0, 0, 0, 7, 5, 2, "o"); // book 1
    box(0, 0, 2, 6, 4, 1, "w"); // book 2
    box(1, 1, 3, 3, 3, 1, "o"); // cap base
    box(0, 0, 4, 5, 5, 1, "k"); // board
    at(2, 2, 5, "o"); // button
    at(4, 5, 4, "o"); // tassel
    at(4, 5, 3, "o");
  }),

  // Pillars ------------------------------------------------------------------
  /** Website design: a monitor with a page layout on screen. */
  monitor: build((box, at) => {
    box(0, 0, 2, 9, 1, 6, "k"); // screen
    box(0, 0, 7, 9, 1, 1, "w"); // browser bar
    at(0, 0, 7, "o");
    box(1, 0, 4, 4, 1, 2, "o"); // hero block
    box(6, 0, 4, 2, 1, 1, "w"); // button
    box(1, 0, 3, 6, 1, 1, "g"); // text line
    at(4, 0, 1, "g"); // neck
    box(2, -1, 0, 5, 3, 1, "g"); // base
  }),
  /** Full-stack & product: </> brackets with a slash. */
  code: build((box, at) => {
    for (const [x, z] of [[2, 0], [1, 1], [0, 2], [1, 3], [2, 4]]) {
      at(x, 0, z, "o");
      at(10 - x, 0, z, "o");
    }
    for (const [x, z] of [[4, 0], [5, 2], [6, 4]]) {
      at(x, 0, z, "k");
      at(x, 0, z + 1, "k");
    }
    box(-1, -1, -1, 13, 3, 1, "g"); // shelf
  }),
  /** AI agents & automation: a friendly robot. */
  robot: build((box, at) => {
    box(1, 1, 0, 4, 3, 3, "g"); // body
    box(2, 3, 1, 2, 1, 1, "o"); // chest light (left face)
    box(2, 1, 3, 2, 2, 1, "k"); // neck
    box(0, 0, 4, 6, 5, 4, "k"); // head
    at(1, 4, 6, "o"); // eyes (left face)
    at(4, 4, 6, "o");
    box(2, 4, 5, 2, 1, 1, "w"); // mouth
    at(-1, 2, 6, "g"); // ears
    at(6, 2, 6, "g");
    at(3, 2, 8, "w"); // antenna
    at(3, 2, 9, "o");
  }),
  /** Marketing & growth: a rising bar chart. */
  chart: build((box) => {
    box(0, 0, 0, 12, 4, 1, "g"); // base
    const bars = [2, 4, 6, 9];
    bars.forEach((h, i) => box(1 + i * 3, 1, 1, 2, 2, h, i === bars.length - 1 ? "o" : "k"));
  }),
  /** Business development: stairs up to a flag. */
  stairs: build((box) => {
    for (let s = 0; s < 4; s++) box(s * 2, 0, 0, 2, 4, (s + 1) * 2, "g"); // steps
    box(7, 2, 8, 1, 1, 5, "k"); // pole
    box(4, 2, 10, 3, 1, 3, "o"); // flag
  }),

  // Brand --------------------------------------------------------------------
  /** The logo's stack (two cubes and the wedge), rebuilt from small cubes. */
  stack: build((box, at) => {
    box(0, 0, 0, 4, 4, 4, "o"); // bottom cube
    box(0, 0, 5, 4, 4, 4, "o"); // top cube, one-cube gap like the mark
    at(0, 3, 4, "o"); // wedge in the gap
  }),
  /** Loose cluster for empty project slots. */
  cluster: build((box, at) => {
    box(0, 0, 0, 5, 5, 1, "g");
    box(0, 0, 1, 3, 3, 2, "o");
    at(0, 0, 3, "o");
    box(3, 3, 1, 2, 2, 1, "k");
  }),
} satisfies Record<string, Vox[]>;

export type ModelName = keyof typeof MODELS;

export const PILLAR_MODEL = { web: "monitor", product: "code", ai: "robot", growth: "chart", bizdev: "stairs" } as const;

export const INDUSTRY_MODEL: Record<string, ModelName> = {
  "real-estate": "house",
  finance: "bank",
  healthcare: "health",
  ecommerce: "shop",
  consulting: "briefcase",
  education: "cap",
  media: "monitor",
};
