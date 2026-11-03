// Hero fit audit (home redesign P1d, reference Part 6.1).
//
//   node scripts/hero-fit-audit.mjs --out .audit/hero-p1d/before.json
//   BASE_URL=http://localhost:3102/ node scripts/hero-fit-audit.mjs --out .audit/hero-p1d/after.json --shots .audit/hero-p1d/after
//
// Options
//   --out <file>      JSON report (default .audit/hero-p1d/fit.json)
//   --shots <dir>     also save a PNG per slide for the SHOT_VIEWPORTS below
//   --vp 1352x618,... override the viewport list
//   --real            ALSO launch headed real Chrome (channel "chrome") with a
//                     browser window of each screen size and viewport:null, so
//                     the page sees the real innerHeight (tab strip + URL bar
//                     taken off). Reports the same numbers.
//
// For every viewport and every slide (scrollY 0, after the hero has loaded and
// the entrance animations have settled) it reports:
//   - hero top / bottom, innerHeight, hero.bottom - innerHeight ("gap")
//   - whether any pixel of the next section is visible in the first screen
//   - whether the primary "Call for Consultation" button and the dots row are
//     fully inside the viewport
//   - media cluster height (slide 1: the portrait stage) as % of the hero
//   - empty space above and below the tallest of (copy block, media cluster),
//     as % of the hero height, measured inside the "visible area": from the
//     bottom of the fixed nav to the top of the dots row (desktop). On phones
//     the same region is used (nav is above the hero's content too).
//   - mobile: gap between the actions' bottom and the media strip's top
//   - horizontal overflow
// then checks the P1d limits (see LIMITS) and exits 1 if any desktop/laptop
// or mobile check fails.
//
// Why this exists: the P1 and P1c fit checks compared the hero's HEIGHT to
// innerHeight - nav. They never checked that the hero's BOTTOM EDGE lands on
// the bottom of the viewport, which is how a hero that started under the
// fixed nav (y = 0) but was only (100dvh - nav) tall passed while ending 78px
// short of the screen.

import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : fallback;
};
const has = (name) => argv.includes(name);

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100/";
const OUT = arg("--out", ".audit/hero-p1d/fit.json");
const SHOTS = arg("--shots", null);
const LEAD_CAPTURE_SESSION_KEY = "neodent-lead-capture-shown"; // lib/site-data.ts

const DESKTOP = [
  [1352, 618],
  [1366, 650],
  [1366, 768],
  [1265, 903],
  [1280, 1024],
  [1280, 720],
  [1440, 900],
  [1536, 730],
  [1920, 1080],
  [1024, 768],
];
const MOBILE = [
  [358, 681],
  [360, 740],
  [390, 844],
  [412, 915],
  [768, 1024],
];
const SHOT_VIEWPORTS = new Set([
  "1352x618",
  "1366x650",
  "1366x768",
  "1265x903",
  "1280x1024",
  "1280x720",
  "1440x900",
  "1536x730",
  "1920x1080",
  "1024x768",
  "358x681",
  "360x740",
  "390x844",
  "412x915",
  "768x1024",
]);

const parseVps = (s) => s.split(",").map((v) => v.split("x").map(Number));
const customVps = arg("--vp", null);
const VIEWPORTS = (customVps ? parseVps(customVps) : [...DESKTOP, ...MOBILE]).map(([width, height]) => ({
  width,
  height,
  name: `${width}x${height}`,
  // The hero switches layout at 1024px (desktop block). 1024x768 is desktop.
  // 768x1024 is the tablet layout, which shares the mobile rules (<= 1023px).
  mode: width >= 1024 ? "desktop" : "mobile",
}));

const LIMITS = {
  gapPx: 1, // |hero.bottom - innerHeight| (desktop, when not at the height cap)
  emptyPctSlides23: 14,
  emptyPctSlide1: 18,
  clusterMinPct: 62,
  clusterMaxPct: 84,
  mobileGapPx: 56,
  heroCapPx: 1100 + 78, // visible-area cap (1100) + nav
  tapMinPx: 44,
};


async function dismissCookies(page) {
  const reject = page.getByRole("button", { name: /reject non-essential/i });
  try {
    await reject.first().waitFor({ state: "visible", timeout: 3000 });
    await reject.first().click();
    await page.waitForTimeout(250);
  } catch {
    // no banner
  }
}

// Runs in the page. `slide` is 0..2; the slide must already be the active one.
function probe({ slide, mode }) {
  const r = (el) => {
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return { left: b.left, right: b.right, top: b.top, bottom: b.bottom, width: b.width, height: b.height };
  };
  const union = (els) => {
    const rs = els.map(r).filter(Boolean);
    if (!rs.length) return null;
    const left = Math.min(...rs.map((x) => x.left));
    const right = Math.max(...rs.map((x) => x.right));
    const top = Math.min(...rs.map((x) => x.top));
    const bottom = Math.max(...rs.map((x) => x.bottom));
    return { left, right, top, bottom, width: right - left, height: bottom - top };
  };
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const hero = document.getElementById("home");
  const slideEl = hero.querySelectorAll(".hero-slide")[slide];
  const heroR = r(hero);
  const navInner = document.querySelector(".nav-inner");
  const navH = navInner ? navInner.getBoundingClientRect().height : 0;
  const controls = hero.querySelector(".hero-controls");
  const controlsR = r(controls);
  const dotButtons = [...hero.querySelectorAll(".hero-dot, .hero-pause")];
  const dotsUnion = union(dotButtons);

  const next = hero.closest("main")?.children[1] ?? hero.nextElementSibling;
  const nextR = r(next);
  const nextVisiblePx = nextR ? Math.max(0, vh - nextR.top) : 0;

  const primary = slideEl.querySelector(".hero-primary");
  const primaryR = r(primary);
  const secondary = slideEl.querySelector(".hero-secondary");
  const actions = slideEl.querySelector(".hero-actions");
  const actionsR = r(actions);
  const copy = slideEl.querySelector(".hero-copy");
  const copyR = r(copy);

  // Media cluster: slide 1 = the portrait stage; 2 and 3 = union of the plates.
  let cluster;
  if (slide === 0) cluster = r(slideEl.querySelector(".hero-founder-stage"));
  else cluster = union([...slideEl.querySelectorAll(".hero-plate")]);

  // Real text extents of the copy column (right edge), for the copy-to-media gap.
  const textRight = (() => {
    let max = 0;
    const rangeRight = (el) => {
      const rg = document.createRange();
      rg.selectNodeContents(el);
      let m = 0;
      for (const b of rg.getClientRects()) m = Math.max(m, b.right);
      return m;
    };
    for (const el of slideEl.querySelectorAll(".hero-title > span, .hero-sub, .hero-founder-name, .hero-rating")) {
      max = Math.max(max, rangeRight(el));
    }
    for (const el of slideEl.querySelectorAll(".hero-actions .button")) max = Math.max(max, el.getBoundingClientRect().right);
    return max;
  })();

  const title = slideEl.querySelector(".hero-title");
  const titleCs = title ? getComputedStyle(title) : null;
  const titleLines = title
    ? Math.round(title.getBoundingClientRect().height / parseFloat(titleCs.lineHeight || "1"))
    : null;

  // --media-max-h resolved to px.
  const probeEl = document.createElement("div");
  probeEl.style.cssText = "position:absolute;visibility:hidden;width:1px;height:var(--media-max-h)";
  document.body.appendChild(probeEl);
  const mediaMaxH = probeEl.getBoundingClientRect().height;
  probeEl.remove();

  const region = { top: heroR.top + navH, bottom: controlsR ? controlsR.top : heroR.bottom };
  const tallest = copyR && cluster ? (cluster.height >= copyR.height ? cluster : copyR) : cluster ?? copyR;
  const emptyAbove = tallest ? tallest.top - region.top : null;
  const emptyBelow = tallest ? region.bottom - tallest.bottom : null;
  const heroH = heroR.height;
  const pct = (v) => (v == null ? null : +((v / heroH) * 100).toFixed(1));

  // Slide-1 cards.
  const since = slideEl.querySelector(".hero-glass-since");
  const callCard = slideEl.querySelector(".hero-glass-call");
  const callCardVisible = callCard ? getComputedStyle(callCard).display !== "none" : false;

  const inView = (b) => !!b && b.top >= -0.5 && b.bottom <= vh + 0.5 && b.left >= -0.5 && b.right <= vw + 0.5;
  const press = slideEl.querySelector(".hero-record-item-press");
  const nampally = slideEl.querySelector(".hero-branch-nampally .hero-plate");
  const mehdi = slideEl.querySelector(".hero-branch-mehdipatnam .hero-plate");

  // Overflow of anything inside the hero past the viewport sides.
  const doc = document.documentElement;
  const overflowX = Math.max(0, doc.scrollWidth - vw);

  // Smallest tap target in the hero controls and actions.
  const taps = [primary, secondary, ...dotButtons, callCardVisible ? callCard : null]
    .filter(Boolean)
    .map((el) => {
      const b = el.getBoundingClientRect();
      return { name: el.className.toString().split(" ")[0], w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
    });

  return {
    scrollY: window.scrollY,
    innerWidth: vw,
    innerHeight: vh,
    heroTop: +heroR.top.toFixed(2),
    heroBottom: +heroR.bottom.toFixed(2),
    heroHeight: +heroH.toFixed(2),
    gapPx: +(heroR.bottom - vh).toFixed(2),
    navH,
    controlsH: controlsR ? controlsR.height : null,
    nextSectionTop: nextR ? +nextR.top.toFixed(2) : null,
    nextSectionVisiblePx: +nextVisiblePx.toFixed(2),
    primaryInViewport: inView(primaryR),
    primaryBottom: primaryR ? +primaryR.bottom.toFixed(1) : null,
    dotsInViewport: inView(dotsUnion),
    dotsBottom: dotsUnion ? +dotsUnion.bottom.toFixed(1) : null,
    mediaMaxH: +mediaMaxH.toFixed(1),
    clusterHeight: cluster ? +cluster.height.toFixed(1) : null,
    clusterPct: pct(cluster?.height),
    copyHeight: copyR ? +copyR.height.toFixed(1) : null,
    tallest: tallest === cluster ? "media" : "copy",
    emptyAbovePct: pct(emptyAbove),
    emptyBelowPct: pct(emptyBelow),
    emptyAbovePx: emptyAbove == null ? null : +emptyAbove.toFixed(1),
    emptyBelowPx: emptyBelow == null ? null : +emptyBelow.toFixed(1),
    clusterOverlapsDots: cluster && controlsR && mode === "desktop" ? cluster.bottom > controlsR.top + 0.5 : false,
    copyOverlapsDots: copyR && controlsR ? copyR.bottom > controlsR.top + 0.5 : false,
    copyMediaGapPx: cluster && mode === "desktop" ? +(cluster.left - textRight).toFixed(1) : null,
    actionsToMediaGapPx: cluster && actionsR && mode === "mobile" ? +(cluster.top - actionsR.bottom).toFixed(1) : null,
    headline: title ? { fontSize: +parseFloat(titleCs.fontSize).toFixed(1), lines: titleLines } : null,
    siasatPlateWidth: press ? +press.getBoundingClientRect().width.toFixed(1) : null,
    nampally: nampally ? { w: +nampally.getBoundingClientRect().width.toFixed(1), h: +nampally.getBoundingClientRect().height.toFixed(1) } : null,
    mehdipatnam: mehdi ? { w: +mehdi.getBoundingClientRect().width.toFixed(1), h: +mehdi.getBoundingClientRect().height.toFixed(1) } : null,
    sinceCard: since ? r(since) : null,
    callCardVisible,
    callCardInViewport: callCardVisible ? inView(r(callCard)) : null,
    overflowX,
    tapTargets: taps,
    smallestTap: taps.length ? Math.min(...taps.map((t) => Math.min(t.w, t.h))) : null,
  };
}

async function loadHero(page) {
  await page.goto(BASE_URL, { waitUntil: "load", timeout: 180_000 });
  await dismissCookies(page);
  await page.waitForSelector("#home .hero-slide-active", { timeout: 60_000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const imgs = [...document.querySelectorAll("#home img")];
    await Promise.all(
      imgs.map((i) => (i.complete ? null : new Promise((res) => { i.addEventListener("load", res); i.addEventListener("error", res); setTimeout(res, 8000); }))),
    );
  });
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function selectSlide(page, i, vh) {
  await page.click(`[data-testid="button-hero-dot-${["hospital", "locations", "record"][i]}"]`);
  // Park the pointer inside the hero (autoplay stays paused while hovered) but off the media.
  await page.mouse.move(4, Math.max(4, vh - 4));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1700);
}

function evaluateChecks(row, mode) {
  const fails = [];
  const capped = row.innerHeight > LIMITS.heroCapPx;
  if (mode === "desktop") {
    if (!capped && Math.abs(row.gapPx) > LIMITS.gapPx) fails.push(`hero.bottom - innerHeight = ${row.gapPx}`);
    if (!capped && row.nextSectionVisiblePx > 0.5) fails.push(`next section visible ${row.nextSectionVisiblePx}px`);
    const lim = row.slide === 0 ? LIMITS.emptyPctSlide1 : LIMITS.emptyPctSlides23;
    if (row.emptyAbovePct > lim) fails.push(`empty above ${row.emptyAbovePct}% > ${lim}`);
    if (row.emptyBelowPct > lim) fails.push(`empty below ${row.emptyBelowPct}% > ${lim}`);
    if (row.slide > 0) {
      if (row.clusterPct < LIMITS.clusterMinPct || row.clusterPct > LIMITS.clusterMaxPct)
        fails.push(`cluster ${row.clusterPct}% outside ${LIMITS.clusterMinPct}-${LIMITS.clusterMaxPct}`);
      if (row.clusterHeight > row.mediaMaxH + 1) fails.push(`cluster ${row.clusterHeight}px > --media-max-h ${row.mediaMaxH}px`);
    }
    if (row.clusterOverlapsDots) fails.push("media cluster overlaps the dots row");
  } else {
    if (row.actionsToMediaGapPx > LIMITS.mobileGapPx) fails.push(`actions-to-strip gap ${row.actionsToMediaGapPx}px > ${LIMITS.mobileGapPx}`);
    if (row.smallestTap != null && row.smallestTap < LIMITS.tapMinPx - 0.5) fails.push(`tap target ${row.smallestTap}px`);
  }
  if (!row.primaryInViewport) fails.push("primary button not fully in viewport");
  if (!row.dotsInViewport) fails.push("dots row not fully in viewport");
  if (row.copyOverlapsDots) fails.push("copy overlaps the dots row");
  if (row.overflowX > 0) fails.push(`horizontal overflow ${row.overflowX}px`);
  return fails;
}

async function runViewport(browser, vp, { real = false } = {}) {
  const ctxOpts = real
    ? { viewport: null }
    : {
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.mode === "mobile" && vp.width < 700 ? 2 : 1,
        hasTouch: false,
      };
  const context = await browser.newContext(ctxOpts);
  await context.addInitScript((key) => {
    try {
      window.sessionStorage.setItem(key, "1");
    } catch {}
  }, LEAD_CAPTURE_SESSION_KEY);
  const page = await context.newPage();
  const rows = [];
  try {
    await loadHero(page);
    await page.waitForTimeout(1600);
    const vh = await page.evaluate(() => window.innerHeight);
    for (let s = 0; s < 3; s++) {
      if (s > 0) await selectSlide(page, s, vh);
      else {
        await page.mouse.move(4, Math.max(4, vh - 4));
      }
      const row = await page.evaluate(probe, { slide: s, mode: vp.mode });
      row.slide = s;
      row.viewport = vp.name;
      row.mode = vp.mode;
      row.real = real;
      row.fails = evaluateChecks(row, vp.mode);
      rows.push(row);
      if (SHOTS && !real && SHOT_VIEWPORTS.has(vp.name)) {
        mkdirSync(SHOTS, { recursive: true });
        await page.screenshot({ path: path.join(SHOTS, `${vp.name}-s${s + 1}.png`) });
      }
    }
  } finally {
    await context.close();
  }
  return rows;
}

const started = Date.now();
mkdirSync(path.dirname(OUT), { recursive: true });
const browser = await chromium.launch();
const all = [];
for (const vp of VIEWPORTS) {
  try {
    all.push(...(await runViewport(browser, vp)));
  } catch (e) {
    console.error(`FAILED ${vp.name}: ${e.message}`);
    all.push({ viewport: vp.name, error: e.message, fails: ["audit error"] });
  }
}
await browser.close();

// Optional: real headed Chrome, window sized to the screen, viewport = whatever Chrome gives.
const realRows = [];
let realNote = null;
if (has("--real")) {
  const screens = [
    [1366, 768],
    [1280, 1024],
    [1440, 900],
  ];
  for (const [w, h] of screens) {
    let b;
    try {
      b = await chromium.launch({
        channel: "chrome",
        headless: false,
        args: [`--window-size=${w},${h}`, "--window-position=0,0"],
      });
      const vp = { width: w, height: h, name: `real-window-${w}x${h}`, mode: "desktop" };
      realRows.push(...(await runViewport(b, vp, { real: true })));
    } catch (e) {
      realNote = `real Chrome run failed: ${e.message}`;
      console.error(realNote);
    } finally {
      await b?.close();
    }
  }
}

const summary = all.filter((r) => r.fails).map((r) => ({ viewport: r.viewport, slide: r.slide, fails: r.fails }));
const failing = summary.filter((s) => s.fails.length);
const report = { baseUrl: BASE_URL, date: new Date().toISOString(), limits: LIMITS, rows: all, realChrome: realRows, realNote, failing };
writeFileSync(OUT, JSON.stringify(report, null, 2));

// Console table.
const fmt = (v, n) => String(v ?? "-").padEnd(n);
console.log(`${fmt("viewport", 11)}${fmt("s", 2)}${fmt("hero(top..bot)", 17)}${fmt("inner", 6)}${fmt("gap", 8)}${fmt("next", 6)}${fmt("btn", 5)}${fmt("dots", 5)}${fmt("clus%", 7)}${fmt("empty^/v%", 12)}${fmt("m-gap", 7)}${fmt("h1", 8)}fails`);
for (const r of all) {
  if (r.error) {
    console.log(`${r.viewport} ERROR ${r.error}`);
    continue;
  }
  console.log(
    fmt(r.viewport, 11) +
      fmt(r.slide + 1, 2) +
      fmt(`${Math.round(r.heroTop)}..${Math.round(r.heroBottom)}`, 17) +
      fmt(r.innerHeight, 6) +
      fmt(r.gapPx, 8) +
      fmt(r.nextSectionVisiblePx > 0.5 ? `Y${Math.round(r.nextSectionVisiblePx)}` : "no", 6) +
      fmt(r.primaryInViewport ? "ok" : "OUT", 5) +
      fmt(r.dotsInViewport ? "ok" : "OUT", 5) +
      fmt(r.clusterPct, 7) +
      fmt(`${r.emptyAbovePct}/${r.emptyBelowPct}`, 12) +
      fmt(r.mode === "mobile" ? r.actionsToMediaGapPx : r.copyMediaGapPx, 7) +
      fmt(r.headline ? `${r.headline.fontSize}x${r.headline.lines}` : "-", 8) +
      (r.fails.length ? r.fails.join("; ") : "ok"),
  );
}
if (realRows.length) {
  console.log("\nReal headed Chrome (window = screen size, viewport = what Chrome gives):");
  for (const r of realRows) {
    console.log(
      `${r.viewport} s${r.slide + 1} inner=${r.innerWidth}x${r.innerHeight} hero.bottom=${r.heroBottom} gap=${r.gapPx} nextVisible=${r.nextSectionVisiblePx}px btn=${r.primaryInViewport} dots=${r.dotsInViewport}`,
    );
  }
}
console.log(`\n${failing.length ? `${failing.length} row(s) failing` : "all rows pass"} (${((Date.now() - started) / 1000).toFixed(0)}s) -> ${OUT}`);
process.exit(failing.length ? 1 : 0);
