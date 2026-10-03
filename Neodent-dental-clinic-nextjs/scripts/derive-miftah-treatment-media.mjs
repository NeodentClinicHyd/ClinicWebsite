/**
 * One-off generator for the Dr. Miftah Section 03 treatment evidence.
 *
 * Reads the supplied clinical photographs / radiographs and writes
 * exactly 15 web-optimised WebP derivatives to
 *   public/assets/dr-miftah/treatments/web/
 * plus a dimensions manifest at lib/miftah-treatment-media.json (used
 * by next/image for exact width/height — no layout shift).
 *
 * The three root-canal radiographs carry burned-in patient details
 * (name, acquisition date/time, sensor marks). Their ORIGINALS live in
 * private-assets/ (outside public/, git-ignored) so they can never be
 * requested by URL; this script trims those edge overlays away (no
 * blur, no inpainting) before writing the only publicly served copies.
 *
 * Never upscales. sharp strips EXIF/GPS metadata by default.
 *
 *   node scripts/derive-miftah-treatment-media.mjs           # generate
 *   node scripts/derive-miftah-treatment-media.mjs --inspect # log sources only
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(root, "public", "assets", "dr-miftah", "treatments");
const PRIVATE_DIR = path.join(root, "private-assets", "dr-miftah", "treatments");
const OUT_DIR = path.join(PUBLIC_DIR, "web");
const MANIFEST = path.join(root, "lib", "miftah-treatment-media.json");
const PUBLIC_URL = "/assets/dr-miftah/treatments/web";
const PREFIX = "dr-md-miftah-ur-rahman-";
const MAX_WIDTH = 1600;

/* Radiograph PII removal by EDGE TRIM, expressed as fractions of the
   source frame. All three radiographs share the same sensor overlay
   layout and every overlay sits on a frame edge:
     - patient name, top-left              (y < ~3.5%)
     - "PA # 11" + acquisition date/time,  top-right (y < ~4.8%)
     - "Fi" sensor mark                    (x < ~6%, y 4–8%)
     - vertical "RVG" sensor logo + glyph  (x < ~4%, bottom-left)
   Trimming 5.5% from the top and 6.6% from the left removes all four
   without painting visible patches over the radiograph (an earlier
   solid-mask approach left black blocks over grey bone). The treated
   teeth (centre / right of frame) are untouched. */
const XRAY_TRIM = { left: 0.066, top: 0.055 };

/* key, source base name, location, focal point for compact cover crops
   (CSS object-position), and whether radiograph masking applies. */
const IMAGES = [
  /* Focal x-positions keep the treated molar centred in the 1:1
     horizontal-only card crop (full crown-to-apex height retained). */
  { key: "rctPre", base: "root-canal-treatment-pre-rct", dir: PRIVATE_DIR, xray: true, position: "60% 50%" },
  { key: "rctMid", base: "root-canal-treatment-mid-rct", dir: PRIVATE_DIR, xray: true, position: "100% 50%" },
  { key: "rctPost", base: "root-canal-treatment-post-rct", dir: PRIVATE_DIR, xray: true, position: "100% 50%" },
  { key: "smileBefore", base: "smile-design-before", dir: PUBLIC_DIR, position: "50% 45%" },
  { key: "smileAfter", base: "smile-design-after", dir: PUBLIC_DIR, position: "50% 45%" },
  { key: "implantsBefore", base: "dental-implants-before", dir: PUBLIC_DIR, position: "50% 45%" },
  { key: "implantsAfter", base: "dental-implants-after", dir: PUBLIC_DIR, position: "50% 40%" },
  { key: "rehabBefore", base: "full-mouth-rehabilitation-before", dir: PUBLIC_DIR, position: "50% 40%" },
  { key: "rehabAfter", base: "full-mouth-rehabilitation-after", dir: PUBLIC_DIR, position: "50% 55%" },
  { key: "story01", base: "smile-design-case-step-01", dir: PUBLIC_DIR, position: "50% 55%" },
  { key: "story02", base: "smile-design-case-step-02", dir: PUBLIC_DIR, position: "50% 55%" },
  { key: "story03", base: "smile-design-case-step-03", dir: PUBLIC_DIR, position: "50% 50%" },
  { key: "story04", base: "smile-design-case-step-04", dir: PUBLIC_DIR, position: "50% 50%" },
  { key: "story05", base: "smile-design-case-step-05", dir: PUBLIC_DIR, position: "50% 50%" },
  { key: "story06", base: "smile-design-case-step-06", dir: PUBLIC_DIR, position: "50% 50%" },
];

const VIDEOS = ["root-canal-treatment.mp4", "root-canal-treatment-explainer.mp4"];

function sourcePath(image) {
  return path.join(image.dir, `${PREFIX}${image.base}.jpeg`);
}

const inspectOnly = process.argv.includes("--inspect");

/* ---- 1. Source inventory -------------------------------------------- */
const missing = IMAGES.filter((image) => !existsSync(sourcePath(image)));
if (missing.length) {
  console.error("Missing sources:\n" + missing.map(sourcePath).join("\n"));
  process.exit(1);
}

const table = [];
for (const image of IMAGES) {
  const file = sourcePath(image);
  const meta = await sharp(file).metadata();
  image.meta = meta;
  table.push({
    key: image.key,
    file: path.relative(root, file),
    size: `${meta.width}x${meta.height}`,
    ratio: (meta.width / meta.height).toFixed(3),
    orientation: meta.orientation ?? 1,
    kb: Math.round(statSync(file).size / 1024),
  });
}
for (const video of VIDEOS) {
  const file = path.join(PUBLIC_DIR, `${PREFIX}${video}`);
  table.push({
    key: video,
    file: path.relative(root, file),
    size: "-",
    ratio: "-",
    orientation: "-",
    kb: existsSync(file) ? Math.round(statSync(file).size / 1024) : "MISSING",
  });
}
console.table(table);
if (inspectOnly) process.exit(0);

/* ---- 2. Derivatives -------------------------------------------------- */
mkdirSync(OUT_DIR, { recursive: true });
const manifest = {};

for (const image of IMAGES) {
  const { width: srcW, height: srcH } = image.meta;
  let pipeline = sharp(sourcePath(image)).rotate();

  let effectiveW = srcW;
  if (image.xray) {
    const left = Math.ceil(XRAY_TRIM.left * srcW);
    const top = Math.ceil(XRAY_TRIM.top * srcH);
    effectiveW = srcW - left;
    pipeline = pipeline.extract({ left, top, width: effectiveW, height: srcH - top });
  }

  const targetW = Math.min(effectiveW, MAX_WIDTH);
  const outName = `${PREFIX}${image.base}.webp`;
  const outFile = path.join(OUT_DIR, outName);
  const info = await pipeline
    .resize({ width: targetW, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outFile);

  if (info.width > effectiveW) {
    console.error(`Upscaled output detected: ${outName}`);
    process.exit(1);
  }

  manifest[image.key] = {
    src: `${PUBLIC_URL}/${outName}`,
    width: info.width,
    height: info.height,
    objectPosition: image.position,
  };
  console.log(`wrote ${outName} ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`);
}

const outputs = readdirSync(OUT_DIR).filter((f) => f.endsWith(".webp"));
if (outputs.length !== 15) {
  console.error(`Expected 15 WebP outputs, found ${outputs.length}`);
  process.exit(1);
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${path.relative(root, MANIFEST)} (${outputs.length} images)`);
