/**
 * Regenerates derived image assets with sharp.
 *
 *   node scripts/make-assets.mjs [path/to/portrait.jpg]
 *
 * - Icons (favicon.ico, apple-touch-icon.png, icon-192/512.png) from public/favicon.svg.
 * - Portrait variants (AVIF/WebP/JPEG at 480/640/960 px wide, 4:5 crop) from the
 *   source portrait, which lives OUTSIDE the repository. Pass its path as the first
 *   argument; if omitted, only the icons are rebuilt.
 *
 * Image metadata (EXIF, GPS, camera) is stripped by default — sharp does not copy it
 * unless withMetadata() is called.
 */
import sharp from 'sharp';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const pub = path.join(root, 'public');

async function icons() {
  const svg = await readFile(path.join(pub, 'favicon.svg'));
  const sizes = [
    ['apple-touch-icon.png', 180],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
  ];
  for (const [name, size] of sizes) {
    await sharp(svg, { density: 384 }).resize(size, size).png().toFile(path.join(pub, name));
  }
  // favicon.ico: a 32 px PNG wrapped in an ICO container (single image).
  const png32 = await sharp(svg, { density: 384 }).resize(32, 32).png().toBuffer();
  const header = Buffer.alloc(6 + 16);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // count
  header.writeUInt8(32, 6); // width
  header.writeUInt8(32, 7); // height
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // planes
  header.writeUInt16LE(32, 12); // bpp
  header.writeUInt32LE(png32.length, 14); // size
  header.writeUInt32LE(22, 18); // offset
  await writeFile(path.join(pub, 'favicon.ico'), Buffer.concat([header, png32]));
  console.log('icons: done');
}

async function portrait(src) {
  const outDir = path.join(pub, 'images');
  await mkdir(outDir, { recursive: true });
  const input = sharp(src).rotate(); // apply EXIF orientation, then metadata is dropped
  const meta = await input.metadata();
  // 4:5 crop centred slightly above the middle (faces sit high in portraits).
  const targetRatio = 4 / 5;
  let w = meta.width;
  let h = Math.round(w / targetRatio);
  if (h > meta.height) {
    h = meta.height;
    w = Math.round(h * targetRatio);
  }
  const left = Math.round((meta.width - w) / 2);
  const top = Math.round(Math.max(0, (meta.height - h) * 0.35));
  const base = input.extract({ left, top, width: w, height: h });

  for (const width of [480, 960]) {
    await base.clone().resize(width).avif({ quality: 55 }).toFile(path.join(outDir, `portrait-${width}.avif`));
    await base.clone().resize(width).webp({ quality: 78 }).toFile(path.join(outDir, `portrait-${width}.webp`));
  }
  await base.clone().resize(640).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, 'portrait-640.jpg'));
  console.log('portrait: done');
}

await icons();
const src = process.argv[2];
if (src) await portrait(src);
