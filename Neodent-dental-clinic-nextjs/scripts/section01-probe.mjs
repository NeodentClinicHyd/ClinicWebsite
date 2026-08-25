// TEMPORARY measurement + regression harness for the Section 01 (ExperienceIntro)
// hierarchy work. Two jobs:
//
//   1. TYPOGRAPHY BASELINE / INVARIANT. Records the computed type metrics for
//      all three Hero slide titles and Section 01's title at every required
//      width, so the "Hero must not change" constraint can be PROVEN by
//      comparison rather than asserted by eye.
//
//   2. SECTION 01 ASSERTIONS. Hierarchy invariants, backdrop contrast measured
//      from real composited pixels, datum alignment, and the structural checks
//      inherited from the original exp-intro-qa.mjs.
//
// Usage:
//   node scripts/section01-probe.mjs --write-baseline   (record, no assertions)
//   node scripts/section01-probe.mjs                    (compare against baseline)
//
// QA_BASE overrides the dev server origin (default http://127.0.0.1:3000).
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";

const BASE = process.env.QA_BASE ?? "http://127.0.0.1:3000";
const SHOT_DIR = "qa-shots";
const BASELINE = "qa-shots/type-baseline.json";
const WRITE_BASELINE = process.argv.includes("--write-baseline");

/* Slides 02/03 have a `@media (max-width: 1023px) and (min-height: 940px)`
   tier, so viewport HEIGHT changes which rules apply. 1024x1000 exercises
   the tall tier; 1024x800 deliberately SKIPS it, where .hero-place-title
   falls back to the base clamp. Both must hold. */
const VIEWPORTS = [
  { w: 1440, h: 1000 },
  { w: 1280, h: 1000 },
  { w: 1024, h: 1000 },
  { w: 1024, h: 800 },
  { w: 900, h: 1000 },
  { w: 768, h: 1000 },
  { w: 430, h: 900 },
  { w: 390, h: 844 },
];

/* The four headlines under test. Slides 02/03 are `inert` + aria-hidden when
   inactive, so each must be activated via its nav dot before measuring --
   measuring an inert slide would silently record stale/zero geometry. */
const TITLES = [
  { key: "heroPrimary", sel: ".hero-founder-title", dot: 0 },
  { key: "heroPlace", sel: ".hero-place-title", dot: 1 },
  { key: "heroRecord", sel: ".hero-record-title", dot: 2 },
  { key: "section01", sel: ".exp-intro-title", dot: null },
];

const TYPE_PROPS = [
  "fontSize",
  "lineHeight",
  "letterSpacing",
  "fontWeight",
  "marginTop",
  "marginBottom",
  "maxWidth",
];

const failures = [];
const notes = [];
const fail = (ctx, msg) => failures.push(`${ctx} :: ${msg}`);
const note = (ctx, msg) => notes.push(`${ctx} :: ${msg}`);
const px = (v) => Math.round(parseFloat(v) * 100) / 100;

const readType = (page, sel) =>
  page.evaluate(
    ({ sel, props }) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const out = {};
      for (const p of props) out[p] = cs[p];
      const r = el.getBoundingClientRect();
      out._w = Math.round(r.width * 100) / 100;
      return out;
    },
    { sel, props: TYPE_PROPS },
  );

/* Samples the REAL composited backdrop behind the headline and lede by
   rasterising that exact region and testing every pixel against ivory.
   This measures what the visitor's eye receives -- photo, filter, veil and
   section background all multiplied together -- instead of trusting the
   authored alpha values. */
const measureContrast = async (page) => {
  // Scroll the HEADLINE itself into view, not the (much taller) section --
  // centring the whole .exp-intro element can push content near its top
  // edge above the viewport (negative getBoundingClientRect().top), and a
  // screenshot clip with a negative origin comes back blank/white, which
  // would misreport as a worst-case contrast of 1:1.
  await page.evaluate(() => {
    document.querySelector(".exp-intro-title")?.scrollIntoView({ block: "center" });
  });
  await page.waitForTimeout(150);

  const box = await page.evaluate(() => {
    const t = document.querySelector(".exp-intro-title");
    const l = document.querySelector(".exp-intro-lede");
    if (!t) return null;
    const a = t.getBoundingClientRect();
    const b = l ? l.getBoundingClientRect() : a;
    return {
      x: Math.max(0, Math.floor(Math.min(a.left, b.left))),
      y: Math.max(0, Math.floor(Math.min(a.top, b.top))),
      width: Math.ceil(Math.max(a.right, b.right) - Math.min(a.left, b.left)),
      height: Math.ceil(
        Math.min(Math.max(a.bottom, b.bottom), window.innerHeight) -
          Math.max(0, Math.min(a.top, b.top)),
      ),
    };
  });
  if (!box || box.width <= 0 || box.height <= 0) return null;

  // Hide the type itself so we rasterise only what sits BEHIND it.
  await page.addStyleTag({
    content:
      ".exp-intro-title,.exp-intro-lede{visibility:hidden!important}" +
      ".exp-intro-values,.exp-intro-cta,.exp-intro-eyebrow-row{visibility:hidden!important}",
  });
  const buf = await page.screenshot({ clip: box });
  await page.evaluate(() => {
    for (const s of document.querySelectorAll("style")) {
      if (s.textContent.includes("visibility:hidden!important")) s.remove();
    }
  });

  // Decode the PNG inside the page (no image deps in this project).
  const stats = await page.evaluate(async (b64) => {
    const blob = await (await fetch(`data:image/png;base64,${b64}`)).blob();
    const bmp = await createImageBitmap(blob);
    const c = new OffscreenCanvas(bmp.width, bmp.height);
    const ctx = c.getContext("2d");
    ctx.drawImage(bmp, 0, 0);
    const { data } = ctx.getImageData(0, 0, bmp.width, bmp.height);
    const lin = (v) => {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const relLum = (r, g, b2) =>
      0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b2);
    // Ivory #f8f6ef, the actual Section 01 text colour.
    const inkLum = relLum(0xf8, 0xf6, 0xef);
    let worst = Infinity;
    let brightest = -1;
    for (let i = 0; i < data.length; i += 4) {
      const L = relLum(data[i], data[i + 1], data[i + 2]);
      const ratio = (Math.max(inkLum, L) + 0.05) / (Math.min(inkLum, L) + 0.05);
      if (ratio < worst) worst = ratio;
      if (L > brightest) brightest = L;
    }
    return {
      worstContrast: Math.round(worst * 100) / 100,
      brightestLum: Math.round(brightest * 1000) / 1000,
      pixels: data.length / 4,
    };
  }, buf.toString("base64"));

  return stats;
};

const structural = (page) =>
  page.evaluate(() => {
    const round = (n) => Math.round(n * 100) / 100;
    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        top: round(r.top),
        bottom: round(r.bottom),
        left: round(r.left),
        right: round(r.right),
        w: round(r.width),
        h: round(r.height),
      };
    };
    const section = document.querySelector(".exp-intro");
    const video = document.querySelector(".exp-intro-video");
    const frame = document.querySelector(".exp-intro-frame");
    const cta = document.querySelector(".exp-intro-cta");
    const navbar = document.querySelector(".nav");
    const hero = document.querySelector(".hero");
    const eyebrowRow = document.querySelector(".exp-intro-eyebrow-row");
    const secondary = document.querySelector(".exp-intro-secondary");
    const threshold = document.querySelector(".exp-intro-threshold");

    const nested = [];
    if (section) {
      for (const el of section.querySelectorAll("*")) {
        const cs = getComputedStyle(el);
        const scrolls = (v) => v === "auto" || v === "scroll" || v === "overlay";
        if (
          (scrolls(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) ||
          (scrolls(cs.overflowX) && el.scrollWidth > el.clientWidth + 1)
        ) {
          nested.push(el.className || el.tagName);
        }
      }
    }

    const vr = video?.getBoundingClientRect();
    const videoEl = document.querySelector(".exp-intro-video");

    // Anything decorative inside the section must be out of the a11y tree
    // and must not intercept pointer events.
    const decorativeLeaks = [];
    for (const sel of [
      ".exp-intro-threshold",
      ".exp-intro-ghost",
      ".exp-intro-backdrop",
    ]) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const cs = getComputedStyle(el);
      if (el.getAttribute("aria-hidden") !== "true")
        decorativeLeaks.push(`${sel}: missing aria-hidden`);
      if (cs.pointerEvents !== "none")
        decorativeLeaks.push(`${sel}: pointerEvents=${cs.pointerEvents}`);
    }

    return {
      docScrollW: document.documentElement.scrollWidth,
      docClientW: document.documentElement.clientWidth,
      sectionBox: box(section),
      videoBox: box(video),
      frameBox: box(frame),
      ctaBox: box(cta),
      navbarBox: box(navbar),
      heroBox: box(hero),
      eyebrowBox: box(eyebrowRow),
      secondaryBox: box(secondary),
      artifactPresent: !!artifact,
      thresholdPresent: !!threshold,
      decorativeLeaks,
      videoAspect: vr ? round(vr.width / vr.height) : null,
      videoNatural: videoEl
        ? { w: videoEl.videoWidth, h: videoEl.videoHeight }
        : null,
      videoCurrentTime: videoEl ? round(videoEl.currentTime) : null,
      videoLoopAttr: videoEl ? videoEl.loop : null,
      videoPoster: videoEl ? videoEl.getAttribute("poster") : null,
      h2Count: section?.querySelectorAll("h2").length ?? null,
      sectionPaddingTop: section
        ? getComputedStyle(section).paddingTop
        : null,
    };
  });

const overlaps = (a, b) =>
  a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

const browser = await chromium.launch();
mkdirSync(SHOT_DIR, { recursive: true });

const results = {};

for (const vp of VIEWPORTS) {
  const ctx = `${vp.w}x${vp.h}`;
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important}",
  });
  // Force the reveal-on-scroll state so Section 01 is measurable.
  await page.evaluate(() => {
    document.querySelector(".exp-intro")?.classList.add("exp-intro-visible");
  });
  await page.waitForTimeout(400);

  const measured = {};
  for (const t of TITLES) {
    if (t.dot !== null) {
      const dot = page.locator(".hero-nav-dot").nth(t.dot);
      if (await dot.count()) {
        await dot.click();
        await page.waitForTimeout(150);
      }
    }
    measured[t.key] = await readType(page, t.sel);
    if (!measured[t.key]) fail(ctx, `${t.sel} not found`);
  }

  // Return to slide 01 for screenshots / structural probing.
  const first = page.locator(".hero-nav-dot").nth(0);
  if (await first.count()) {
    await first.click();
    await page.waitForTimeout(150);
  }

  // Align the section's TOP edge to the viewport top rather than centring
  // it -- .exp-intro is routinely taller than the viewport, and centring
  // a taller-than-viewport element pushes its top edge above y=0, which
  // then contaminates any y>=0-clamped screenshot clip with whatever
  // precedes the section in flow (the Hero). start-alignment keeps the
  // section's own top edge pinned at the viewport top instead.
  await page.evaluate(() =>
    document.querySelector(".exp-intro")?.scrollIntoView({ block: "start" }),
  );
  await page.waitForTimeout(500);

  const struct = await structural(page);
  const contrast = await measureContrast(page);
  // measureContrast() re-centres the viewport on the headline for pixel
  // sampling, which leaves the scroll position different from the
  // start-aligned one `struct` was measured against. Restore it before
  // taking the section screenshot below, or the clip's Y origin (derived
  // from `struct.sectionBox`, captured pre-contrast-scroll) will no
  // longer match the page's actual scroll offset and the shot will bleed
  // into whatever precedes the section (the Hero).
  await page.evaluate(() =>
    document.querySelector(".exp-intro")?.scrollIntoView({ block: "start" }),
  );
  await page.waitForTimeout(200);

  results[ctx] = { type: measured, struct, contrast };

  // ---- Assertions ----
  if (struct.docScrollW > struct.docClientW) {
    fail(ctx, `horizontal overflow: ${struct.docScrollW} > ${struct.docClientW}`);
  }
  if (struct.nested?.length) fail(ctx, `nested scrollers: ${struct.nested.join(" | ")}`);
  if (struct.h2Count !== 1) fail(ctx, `expected 1 h2 in .exp-intro, found ${struct.h2Count}`);
  if (struct.decorativeLeaks.length)
    fail(ctx, `decorative a11y/pointer leaks: ${struct.decorativeLeaks.join(" | ")}`);

  // Hierarchy invariant: Section 01 must be clearly subordinate to BOTH
  // Hero levels at every width. This is the core regression guard.
  const sec = measured.section01 ? px(measured.section01.fontSize) : null;
  const hp = measured.heroPrimary ? px(measured.heroPrimary.fontSize) : null;
  const pl = measured.heroPlace ? px(measured.heroPlace.fontSize) : null;
  const rc = measured.heroRecord ? px(measured.heroRecord.fontSize) : null;
  if (sec != null && hp != null) {
    if (sec >= hp) fail(ctx, `section01 ${sec}px >= heroPrimary ${hp}px (INVERTED)`);
    else if (sec > hp * 0.9)
      fail(ctx, `section01 ${sec}px within 10% of heroPrimary ${hp}px`);
  }
  for (const [k, v] of [["heroPlace", pl], ["heroRecord", rc]]) {
    if (sec != null && v != null) {
      if (sec >= v) fail(ctx, `section01 ${sec}px >= ${k} ${v}px (INVERTED)`);
      else if (sec > v * 0.9) fail(ctx, `section01 ${sec}px within 10% of ${k} ${v}px`);
    }
  }

  // Video must keep its true aspect ratio.
  if (struct.videoNatural?.w && struct.videoNatural?.h) {
    const truth = struct.videoNatural.w / struct.videoNatural.h;
    if (struct.videoAspect && Math.abs(struct.videoAspect - truth) > 0.02) {
      fail(
        ctx,
        `video distorted: rendered ${struct.videoAspect} vs true ${Math.round(truth * 1000) / 1000}`,
      );
    }
  } else {
    note(ctx, "video metadata unavailable (codec?) -- aspect not verified");
  }

  if (struct.videoBox && struct.frameBox) {
    if (
      struct.videoBox.right > struct.frameBox.right + 2 ||
      struct.videoBox.left < struct.frameBox.left - 2
    ) {
      fail(ctx, `video escapes frame horizontally`);
    }
  }
  if (
    struct.sectionBox &&
    struct.videoBox &&
    (struct.videoBox.right > struct.sectionBox.right + 2 ||
      struct.videoBox.left < struct.sectionBox.left - 2)
  ) {
    fail(ctx, `video escapes section bounds`);
  }
  if (overlaps(struct.ctaBox, struct.navbarBox)) fail(ctx, `CTA overlaps navbar`);
  if (struct.heroBox && struct.heroBox.w < vp.w - 2) {
    fail(ctx, `hero width ${struct.heroBox.w} < viewport ${vp.w} (regression)`);
  }

  // Backdrop must stay dark enough for ivory type.
  if (contrast) {
    if (contrast.worstContrast < 7) {
      fail(
        ctx,
        `backdrop contrast ${contrast.worstContrast}:1 < 7:1 behind headline/lede`,
      );
    }
  } else {
    note(ctx, "contrast not measurable");
  }

  // Shared datums: at >=1025px the eyebrow row's top and the values row's
  // bottom should align to the video frame's top/bottom edges.
  if (vp.w >= 1025 && struct.eyebrowBox && struct.secondaryBox && struct.frameBox) {
    const topDelta = Math.abs(struct.eyebrowBox.top - struct.frameBox.top);
    const botDelta = Math.abs(struct.secondaryBox.bottom - struct.frameBox.bottom);
    note(ctx, `datum deltas: top ${Math.round(topDelta)}px, bottom ${Math.round(botDelta)}px`);
  }

  await page.screenshot({
    path: `${SHOT_DIR}/s01-${vp.w}x${vp.h}.png`,
    clip: struct.sectionBox
      ? {
          x: 0,
          y: Math.max(0, struct.sectionBox.top),
          width: vp.w,
          height: Math.min(struct.sectionBox.h, vp.h),
        }
      : undefined,
  });

  await page.close();
}

await browser.close();

// ---- Baseline compare (Hero must not change) ----
if (WRITE_BASELINE) {
  writeFileSync(BASELINE, JSON.stringify(results, null, 2));
  console.log(`\nBaseline written to ${BASELINE}`);
} else if (existsSync(BASELINE)) {
  const base = JSON.parse(readFileSync(BASELINE, "utf8"));
  for (const ctx of Object.keys(results)) {
    for (const key of ["heroPrimary", "heroPlace", "heroRecord"]) {
      const a = base[ctx]?.type?.[key];
      const b = results[ctx]?.type?.[key];
      if (!a || !b) continue;
      for (const p of TYPE_PROPS) {
        if (a[p] !== b[p]) {
          fail(ctx, `HERO CHANGED ${key}.${p}: baseline ${a[p]} -> now ${b[p]}`);
        }
      }
    }
  }
} else {
  note("baseline", `no ${BASELINE} on disk -- Hero comparison skipped`);
}

// ---- Report ----
console.log("\n=== TYPE SCALE ===");
const pad = (s, n) => String(s).padEnd(n);
console.log(
  pad("viewport", 12) +
    pad("slide01", 10) +
    pad("slide02", 10) +
    pad("slide03", 10) +
    pad("section01", 11) +
    pad("s01/s02", 9) +
    "contrast",
);
for (const [ctx, r] of Object.entries(results)) {
  const g = (k) => (r.type[k] ? px(r.type[k].fontSize) : "-");
  const ratio =
    r.type.section01 && r.type.heroPlace
      ? `${Math.round((px(r.type.section01.fontSize) / px(r.type.heroPlace.fontSize)) * 100)}%`
      : "-";
  console.log(
    pad(ctx, 12) +
      pad(g("heroPrimary"), 10) +
      pad(g("heroPlace"), 10) +
      pad(g("heroRecord"), 10) +
      pad(g("section01"), 11) +
      pad(ratio, 9) +
      (r.contrast ? `${r.contrast.worstContrast}:1` : "-"),
  );
}

if (notes.length) {
  console.log("\n--- notes ---");
  for (const n of notes) console.log("  · " + n);
}

console.log("\n=== RESULT ===");
if (failures.length) {
  console.log(`FAILURES (${failures.length}):`);
  for (const f of failures) console.log("  x " + f);
  process.exitCode = 1;
} else {
  console.log("All assertions passed.");
}
