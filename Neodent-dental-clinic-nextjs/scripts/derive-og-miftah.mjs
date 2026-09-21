/**
 * One-off generator for the doctor-profile OG image.
 *
 * Produces a 1200x630 cover crop of the hero portrait
 * "Dr Md Miftah at Dept of Prosthodontics at SB Patil Dental College.jpeg",
 * positioned so Dr. Miftah's face (upper third of the portrait) is the
 * subject of the crop. Re-run with `node scripts/derive-og-miftah.mjs`
 * if the source portrait is ever replaced.
 */
import sharp from "sharp";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(
  root,
  "..",
  "public",
  "assets",
  "dr-miftah",
  "Dr Md Miftah at Dept of Prosthodontics at SB Patil Dental College.jpeg",
);
const output = path.join(
  root,
  "..",
  "public",
  "assets",
  "dr-miftah",
  "og-dr-miftah-ur-rahman-1200x630.jpg",
);

if (!existsSync(source)) {
  console.error(`Source portrait not found: ${source}`);
  process.exit(1);
}

const W = 1200;
const H = 630;

/* Cover-fit the portrait to 1200x630 but bias the crop toward the top
   of the frame (position 50% / 22%) so the face stays in the upper-centre
   of the landscape crop rather than the default centre cut. */
const image = sharp(source);
const meta = await image.metadata();
const scale = Math.max(W / (meta.width ?? W), H / (meta.height ?? H));
const resizedW = Math.round((meta.width ?? W) * scale);
const resizedH = Math.round((meta.height ?? H) * scale);

await image
  .resize(resizedW, resizedH)
  .extract({
    left: Math.max(0, Math.round((resizedW - W) / 2)),
    top: Math.max(0, Math.round((resizedH - H) * 0.22)),
    width: W,
    height: H,
  })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(output);

console.log(`Wrote ${output}`);
