// One-off asset derivation: extracts the symbol (tooth + globe + crescent +
// cross) from the full Neodent lockup so the navbar can show a mark that is
// still legible at ~48px. The arced "NEODENT" wordmark and the "DENTAL
// HOSPITAL" ribbon are dropped -- at navbar scale they resolve to noise, and
// the wordmark is set in type beside the mark instead.
import sharp from "sharp";

const SRC = "public/assets/Neodent dental hospital hyderabad logo.jpeg";
const DEST = "public/assets/neodent-mark.png";

const { data, info } = await sharp(SRC)
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const buf = Buffer.from(data);

// 1. Drop the arced wordmark. Above the red cross (y < 760) the only coloured
//    ink is the wordmark plus its JPEG halo; the tooth and globe up there are
//    pure black linework, so a chroma test separates them and preserves the
//    black anti-aliasing.
for (let y = 0; y < 760; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * C;
    if (
      Math.max(buf[i], buf[i + 1], buf[i + 2]) -
        Math.min(buf[i], buf[i + 1], buf[i + 2]) >
      40
    )
      buf[i] = buf[i + 1] = buf[i + 2] = 255;
  }
}

// 2. Remove the achromatic crumbs the wordmark leaves behind. The tooth runs
//    well below y=570, those crumbs do not, so component bbox discriminates.
const ink = new Uint8Array(W * H);
for (let p = 0; p < W * H; p++) {
  const i = p * C;
  if (!(buf[i] > 232 && buf[i + 1] > 232 && buf[i + 2] > 232)) ink[p] = 1;
}
const seen = new Uint8Array(W * H);
const stack = new Int32Array(W * H);
for (let p0 = 0; p0 < W * H; p0++) {
  if (!ink[p0] || seen[p0]) continue;
  let sp = 0;
  stack[sp++] = p0;
  seen[p0] = 1;
  const members = [];
  let maxY = 0;
  while (sp > 0) {
    const p = stack[--sp];
    members.push(p);
    const y = (p / W) | 0;
    const x = p - y * W;
    if (y > maxY) maxY = y;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const np = ny * W + nx;
        if (ink[np] && !seen[np]) {
          seen[np] = 1;
          stack[sp++] = np;
        }
      }
  }
  if (maxY < 570)
    for (const p of members) {
      const i = p * C;
      buf[i] = buf[i + 1] = buf[i + 2] = 255;
    }
}

// 3. Clamp JPEG near-white to pure white so the mark sits flush on a white plate.
for (let p = 0; p < W * H; p++) {
  const i = p * C;
  if (Math.min(buf[i], buf[i + 1], buf[i + 2]) > 225)
    buf[i] = buf[i + 1] = buf[i + 2] = 255;
}

// 4. Crop to the symbol, stopping just above the row where the ribbon starts
//    crossing the globe (y=1192 in the source).
//    The window is taken square (907x907, centred on the mark's x-axis at
//    x=750) so the exported asset is 1:1 and needs no letterboxing in CSS.
const info2 = await sharp(buf, { raw: { width: W, height: H, channels: C } })
  .extract({ left: 297, top: 283, width: 907, height: 907 })
  .resize(512, 512, { kernel: "lanczos3" })
  .png({ palette: true, colors: 128, compressionLevel: 9 })
  .toFile(DEST);

console.log(DEST, info2);
