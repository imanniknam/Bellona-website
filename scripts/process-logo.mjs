import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(__dirname, "..", "public", "bellona-logo.png");
const output = path.join(__dirname, "..", "public", "bellona-icon.png");

const meta = await sharp(source).metadata();
const cropW = Math.round(meta.width * 0.55);
const cropH = Math.round(meta.height * 0.42);
const left = Math.round((meta.width - cropW) / 2);
const top = Math.round(meta.height * 0.08);

const { data, info } = await sharp(source)
  .extract({ left, top, width: cropW, height: cropH })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);

  if (max <= 20) {
    data[i + 3] = 0;
  } else if (max <= 70) {
    data[i + 3] = Math.round(((max - 20) / 50) * 255);
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 2 })
  .resize(1024, 1024, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    kernel: sharp.kernel.lanczos3,
  })
  .png({ compressionLevel: 6, adaptiveFiltering: true })
  .toFile(output);

console.log("Rebuilt transparent icon:", output);
