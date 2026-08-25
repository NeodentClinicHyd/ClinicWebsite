// TEMPORARY QA harness for ExperienceIntro (Section 01) + Hero regression check.
// Usage: node scripts/exp-intro-qa.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.QA_BASE ?? "http://127.0.0.1:3210";
const SHOT_DIR = "qa-shots";
const WIDTHS = [1440, 1280, 1024, 900, 768, 430, 390];
const HEIGHT = 1000;

const failures = [];

function fail(ctx, msg) {
  failures.push(`${ctx} :: ${msg}`);
}

const probe = async (page) =>
  page.evaluate(() => {
    const round = (n) => Math.round(n * 100) / 100;
    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: round(r.top), bottom: round(r.bottom), left: round(r.left), right: round(r.right), w: round(r.width), h: round(r.height) };
    };
    const section = document.querySelector(".exp-intro");
    const video = document.querySelector(".exp-intro-video");
    const frame = document.querySelector(".exp-intro-frame");
    const cta = document.querySelector(".exp-intro-cta");
    const navbar = document.querySelector(".nav");
    const hero = document.querySelector(".hero");

    // Nested scroll containers inside the section.
    const nested = [];
    if (section) {
      for (const el of section.querySelectorAll("*")) {
        const cs = getComputedStyle(el);
        const scrolls = (v) => v === "auto" || v === "scroll" || v === "overlay";
        if ((scrolls(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) ||
            (scrolls(cs.overflowX) && el.scrollWidth > el.clientWidth + 1)) {
          nested.push(`${el.className || el.tagName}`);
        }
      }
    }

    const videoRect = video?.getBoundingClientRect();
    const videoAspect = videoRect ? round(videoRect.width / videoRect.height) : null;

    return {
      docScrollW: document.documentElement.scrollWidth,
      docClientW: document.documentElement.clientWidth,
      sectionBox: box(section),
      videoBox: box(video),
      frameBox: box(frame),
      ctaBox: box(cta),
      navbarBox: box(navbar),
      heroBox: box(hero),
      videoAspect,
      nested,
      h2Count: section?.querySelectorAll("h2").length ?? null,
    };
  });

const overlaps = (a, b) =>
  a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

const browser = await chromium.launch();
mkdirSync(SHOT_DIR, { recursive: true });

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: HEIGHT } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: "*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important}",
  });
  await page.waitForTimeout(300);

  const ctx = `${width}x${HEIGHT}`;
  const r = await probe(page);

  if (r.docScrollW > r.docClientW) {
    fail(ctx, `horizontal overflow: scrollW ${r.docScrollW} > clientW ${r.docClientW}`);
  }
  if (r.nested.length) {
    fail(ctx, `nested scroll container(s): ${r.nested.join(" | ")}`);
  }
  if (r.h2Count !== 1) {
    fail(ctx, `expected exactly 1 h2 in .exp-intro, found ${r.h2Count}`);
  }
  if (r.videoBox && r.frameBox) {
    // video must stay fully inside the frame's outer box (no overflow bleed)
    if (r.videoBox.right > r.frameBox.right + 2 || r.videoBox.left < r.frameBox.left - 2) {
      fail(ctx, `video escapes frame horizontally: video=${JSON.stringify(r.videoBox)} frame=${JSON.stringify(r.frameBox)}`);
    }
  }
  if (r.videoAspect !== null) {
    // Expect close to 9:16 = 0.5625 unless real metadata differs -- log for review, not hard fail since real ratio is read at runtime.
    if (r.videoAspect < 0.3 || r.videoAspect > 1.2) {
      fail(ctx, `video aspect ratio looks distorted: ${r.videoAspect}`);
    }
  }
  if (overlaps(r.ctaBox, r.navbarBox)) {
    fail(ctx, `CTA overlaps navbar`);
  }
  if (r.sectionBox && r.videoBox && (r.videoBox.right > r.sectionBox.right + 2 || r.videoBox.left < r.sectionBox.left - 2)) {
    fail(ctx, `video escapes section bounds`);
  }

  await page.screenshot({ path: `${SHOT_DIR}/exp-intro-${width}x${HEIGHT}.png`, fullPage: false, clip: r.sectionBox ? { x: 0, y: Math.max(0, r.sectionBox.top), width, height: Math.min(r.sectionBox.h, HEIGHT) } : undefined });

  // Hero regression spot-check: still renders, still full width, no overflow.
  if (r.heroBox && (r.heroBox.w < width - 2)) {
    fail(ctx, `hero width ${r.heroBox.w} narrower than viewport ${width} (possible regression)`);
  }

  await page.close();
}

await browser.close();

console.log("\n=== EXPERIENCE INTRO QA ===");
if (failures.length) {
  console.log(`\nFAILURES (${failures.length}):`);
  for (const f of failures) console.log("  ✗ " + f);
  process.exitCode = 1;
} else {
  console.log("\nAll assertions passed.");
}
