// TEMPORARY. Maps the exact rendered metrics of Hero Slide 01's <h1> across a
// dense sweep of widths, and lists which CSS rules the browser says apply to
// it. Used to make the `.hero h1` transplant provably lossless.
import { chromium } from "playwright";

const BASE = process.env.QA_BASE ?? "http://127.0.0.1:3000";
const WIDTHS = [1440, 1280, 1200, 1199, 1100, 1024, 1023, 950, 901, 900, 860, 800, 768, 767, 700, 600, 561, 560, 500, 480, 431, 430, 390, 360, 320];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(BASE, { waitUntil: "networkidle" });

console.log(
  "width  fs        lh(ratio) ls(em)    margin          maxW    | place_fs  | p_fs/p_mw",
);
for (const w of WIDTHS) {
  await page.setViewportSize({ width: w, height: 1000 });
  await page.waitForTimeout(120);
  const r = await page.evaluate(() => {
    const g = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      return {
        fs: Math.round(fs * 1000) / 1000,
        lh: Math.round((parseFloat(cs.lineHeight) / fs) * 10000) / 10000,
        ls: Math.round((parseFloat(cs.letterSpacing) / fs) * 100000) / 100000,
        m: `${cs.marginTop}/${cs.marginBottom}`,
        mw: cs.maxWidth,
      };
    };
    return {
      h1: g(".hero-founder-title"),
      place: g(".hero-place-title"),
      tagline: g(".hero-founder-tagline"),
      cred: g(".hero-credentials"),
    };
  });
  const h = r.h1;
  console.log(
    `${String(w).padEnd(6)} ${String(h.fs).padEnd(9)} ${String(h.lh).padEnd(9)} ${String(h.ls).padEnd(9)} ${h.m.padEnd(15)} ${String(h.mw).padEnd(7)} | ${String(r.place?.fs).padEnd(9)} | ${r.tagline?.fs}/${r.tagline?.mw} ${r.cred?.fs}/${r.cred?.mw}`,
  );
}

await browser.close();
