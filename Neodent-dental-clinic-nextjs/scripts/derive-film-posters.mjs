/**
 * One-off generator for the doctor-profile "In Practice" film posters.
 *
 * Extracts a real frame from each clinical MP4 and writes it as a JPG
 * next to the film (same basename), so every poster represents its own
 * video. ffmpeg is not a project dependency, so the frame is decoded by
 * a real browser: Playwright drives the system Microsoft Edge (Playwright's
 * bundled Chromium ships without the H.264 decoder), the MP4 is served
 * through a route handler, the frame is drawn to a canvas at native
 * resolution, and sharp encodes the JPG.
 *
 *   node scripts/derive-film-posters.mjs              # writes posters
 *   node scripts/derive-film-posters.mjs --candidates # writes a contact
 *        set of frames per film into qa-shots/film-frames/ to choose from
 *
 * Frame time per film is set in FILMS (seconds). The default picks the
 * first frame whose mean luminance clears a "not black" floor.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const filmDir = path.join(root, "public", "assets", "treatment-video");
const candidatesMode = process.argv.includes("--candidates");

/* `at` = chosen frame time (s); null = first non-black frame. Chosen by
   visual review of the --candidates contact set: 01 and 02 use the
   opening frame; 03 opens on a motion-blurred coat close-up, so 4.5s
   (Dr. Miftah seated in the operatory, name on his coat) is used. */
const FILMS = [
  { file: "dr-miftah-explains-dmls-crowns-masticatory-efficiency.mp4", at: 0.1 },
  { file: "dr-miftah-neodent-crown-cementation-procedure.mp4", at: 0.1 },
  { file: "dr-miftah-neodent-dental-treatment-procedure.mp4", at: 4.5 },
];
const CANDIDATE_TIMES = [0.1, 0.6, 1.2, 2, 3, 4.5, 6, 8];
const ORIGIN = "http://film.local";

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage();
await page.route(`${ORIGIN}/**`, async (route) => {
  const name = decodeURIComponent(new URL(route.request().url()).pathname.slice(1));
  if (!name) {
    return route.fulfill({ contentType: "text/html", body: "<!doctype html><body></body>" });
  }
  const body = await readFile(path.join(filmDir, name));
  /* Byte-range support — without it the media element cannot seek and
     every frame grab returns the opening frame. */
  const range = /bytes=(\d+)-(\d*)/.exec(route.request().headers().range ?? "");
  if (!range) {
    return route.fulfill({
      contentType: "video/mp4",
      headers: { "Accept-Ranges": "bytes" },
      body,
    });
  }
  const start = Number(range[1]);
  const end = range[2] ? Math.min(Number(range[2]), body.length - 1) : body.length - 1;
  return route.fulfill({
    status: 206,
    contentType: "video/mp4",
    headers: {
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${start}-${end}/${body.length}`,
    },
    body: body.subarray(start, end + 1),
  });
});
await page.goto(`${ORIGIN}/`);

async function grab(file, time) {
  return page.evaluate(
    async ({ src, time }) => {
      const v = document.createElement("video");
      v.muted = true;
      v.preload = "auto";
      v.src = src;
      await new Promise((res, rej) => {
        v.onloadeddata = res;
        v.onerror = () => rej(new Error("decode failed: " + src));
      });
      await new Promise((res) => {
        v.onseeked = res;
        v.currentTime = Math.min(time, Math.max(0, v.duration - 0.05));
      });
      const c = document.createElement("canvas");
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      const ctx = c.getContext("2d");
      ctx.drawImage(v, 0, 0);
      const px = ctx.getImageData(0, 0, c.width, c.height).data;
      let sum = 0;
      for (let i = 0; i < px.length; i += 16) sum += (px[i] + px[i + 1] + px[i + 2]) / 3;
      return {
        url: c.toDataURL("image/png"),
        luma: sum / (px.length / 16),
        w: c.width,
        h: c.height,
        duration: v.duration,
      };
    },
    { src: `${ORIGIN}/${encodeURIComponent(file)}`, time },
  );
}

const toBuffer = (dataUrl) => Buffer.from(dataUrl.split(",")[1], "base64");

if (candidatesMode) {
  const outDir = path.join(root, "qa-shots", "film-frames");
  await mkdir(outDir, { recursive: true });
  for (const { file } of FILMS) {
    for (const t of CANDIDATE_TIMES) {
      const f = await grab(file, t);
      const out = path.join(outDir, `${path.parse(file).name}-t${t}.jpg`);
      await sharp(toBuffer(f.url)).resize({ width: 360 }).jpeg({ quality: 70 }).toFile(out);
      console.log(`${file} t=${t}s luma=${f.luma.toFixed(1)} ${f.w}x${f.h} dur=${f.duration.toFixed(1)}s`);
    }
  }
} else {
  for (const { file, at } of FILMS) {
    let frame;
    if (at != null) {
      frame = await grab(file, at);
    } else {
      for (const t of CANDIDATE_TIMES) {
        frame = await grab(file, t);
        if (frame.luma > 28) break;
      }
    }
    const out = path.join(filmDir, `${path.parse(file).name}.jpg`);
    await sharp(toBuffer(frame.url)).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    console.log(`Wrote ${out} (${frame.w}x${frame.h}, luma ${frame.luma.toFixed(1)})`);
  }
}

await browser.close();
