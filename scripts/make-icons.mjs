// Builds the raster icons from public/brand/bellona-app-icon.svg (SEO-GUIDELINE 2-3 and 6-2). Run: node scripts/make-icons.mjs
// Square, full-bleed tiles: search engines and iOS crop the corners themselves, and a plain background is what the
// schema.org logo guidance asks for. Needs `sharp`, which ships with Next.js.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(path.join(root, "public/brand/bellona-app-icon.svg"), "utf8")
  .replace(/<metadata>[\s\S]*?<\/metadata>/, "")
  .replace('rx="112"', 'rx="0"');

const png = (size) => sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
const out = (rel, buf) => {
  writeFileSync(path.join(root, rel), buf);
  console.log("wrote", rel, buf.length, "bytes");
};

out("public/brand/bellona-logo-512.png", await png(512));
out("app/icon.png", await png(192));
out("app/apple-icon.png", await png(180));

// favicon.ico: PNG-compressed 16, 32 and 48 px images in one ICO container.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
out("app/favicon.ico", Buffer.concat([header, ...entries, ...images]));
