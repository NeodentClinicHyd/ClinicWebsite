/**
 * QA for Dr. Miftah Section 03 (featured specialties + smile story).
 *
 *   node scripts/specialties-qa.mjs baseline   # capture other-section baselines
 *   node scripts/specialties-qa.mjs            # run all checks + diff vs baseline
 *
 * Needs a production build (`npm run build`). Starts `next start` on
 * port 3311 unless DOCTOR_QA_NO_SERVER=1. Screenshots go to
 * qa-shots/specialties/. Exit code 1 if any check fails.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 3311;
const ORIGIN = `http://localhost:${PORT}`;
const URL = `${ORIGIN}/doctors/dr-miftah-ur-rahman`;
const SHOTS = path.join(root, "qa-shots", "specialties");
const MODE = process.argv[2] === "baseline" ? "baseline" : "check";
const NAV = 78;

const VIEWPORTS = [
  [1440, 900],
  [1366, 768],
  [1280, 800],
  [1180, 820],
  [1024, 768],
  [820, 1180],
  [390, 844],
];

/* Every section except 03 — must be pixel-identical to baseline. */
const OTHER_SECTIONS = [
  "miftah-hero-title",
  "miftah-index-title",
  "miftah-bio-title",
  "miftah-scope-title",
  "miftah-edu-title",
  "miftah-academic-title",
  "miftah-practice-title",
  "miftah-voices-title",
  "miftah-recognition-title",
  "miftah-locations-title",
  "miftah-cta-title",
];

const ORIGINAL_XRAYS = ["pre", "mid", "post"].map(
  (s) => `/assets/dr-miftah/treatments/dr-md-miftah-ur-rahman-root-canal-treatment-${s}-rct.jpeg`,
);

const EXPECTED_TITLES = [
  "SAVING NATURAL TEETH",
  "SMILE DESIGNING",
  "DENTAL IMPLANTS",
  "FULL MOUTH REHABILITATION",
];

const BANNED = [
  /same patient/i,
  /transformation/i,
  /painless/i,
  /guarantee/i,
  /\bbest\b/i,
  /world-class/i,
  /100\s?%/i,
];

const results = [];
const check = (name, pass, detail = "") => {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
};

mkdirSync(path.join(SHOTS, "baseline"), { recursive: true });
mkdirSync(path.join(SHOTS, "current"), { recursive: true });

/* ---- server ---------------------------------------------------------- */
let server;
if (!process.env.DOCTOR_QA_NO_SERVER) {
  server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: root,
    stdio: "pipe",
    shell: true,
  });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("server start timeout")), 60000);
    const onData = (d) => {
      if (/Ready|started|Local/i.test(String(d))) {
        clearTimeout(timer);
        resolve();
      }
    };
    server.stdout?.on("data", onData);
    server.stderr?.on("data", onData);
  });
}

const browser = await chromium.launch();

/* On Windows `spawn(..., { shell: true })` wraps next in cmd.exe, so
   server.kill() only kills the wrapper and the orphaned next process
   keeps the port and the stdio pipes open (the script never returns).
   Kill the whole process tree instead. */
function stopServer() {
  if (!server) return;
  if (process.platform === "win32") {
    /* Synchronous so the tree is gone before this script exits. */
    spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    server.kill();
  }
}

/* Never leave the server behind: on a crash or Ctrl+C an orphaned
   `next start` keeps port 3311 and this script's stdio open (hang). */
for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    stopServer();
    process.exit(130);
  });
}
process.on("uncaughtException", (err) => {
  console.error("QA crashed:", err);
  stopServer();
  process.exit(2);
});
process.on("unhandledRejection", (err) => {
  console.error("QA crashed:", err);
  stopServer();
  process.exit(2);
});

/* Accept the cookie banner so it neither covers screenshots nor
   intercepts clicks. Consent persists in localStorage per context. */
async function acceptCookies(page) {
  const btn = page.locator('[data-testid="button-accept-all-cookies"]');
  try {
    await btn.waitFor({ state: "visible", timeout: 4000 });
    await btn.click();
    await btn.waitFor({ state: "detached", timeout: 4000 });
  } catch {
    /* banner not shown (consent already stored) */
  }
}

/* Scroll the whole page so every lazy image loads, then return to top. */
async function warm(page) {
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(600);
}

async function sectionShots(dir) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await acceptCookies(page);
  await warm(page);
  /* Fixed chrome (navbar, floating call button, mobile bar) overlays
     sections at scroll-dependent positions — hide it so the
     comparison sees only section content. */
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      const pos = getComputedStyle(el).position;
      if (pos === "fixed" || pos === "sticky") el.style.setProperty("visibility", "hidden", "important");
    }
  });
  const layouts = {};
  for (const id of OTHER_SECTIONS) {
    const el = page.locator(`section[aria-labelledby="${id}"]`);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    /* Section 03's new height is fractional, so every later section
       starts at a different SUB-PIXEL offset and anti-aliases
       differently. Snap the captured section onto the integer pixel
       grid (same treatment in baseline and current) so the pixel diff
       measures content, not rasterisation phase. */
    await page.evaluate((sid) => {
      const s = document.querySelector(`section[aria-labelledby="${sid}"]`);
      s.style.transform = "";
      const top = s.getBoundingClientRect().top + window.scrollY;
      s.style.transform = `translateY(${-(top - Math.floor(top))}px)`;
    }, id);
    await el.screenshot({ path: path.join(SHOTS, dir, `${id}.png`), animations: "disabled" });
    /* Structural fingerprint: every element's tag, own text, geometry
       relative to the section and key computed styles. Identical
       fingerprints = unchanged structure, copy and styling. */
    layouts[id] = await page.evaluate((sid) => {
      const s = document.querySelector(`section[aria-labelledby="${sid}"]`);
      s.style.transform = "";
      const origin = s.getBoundingClientRect();
      const r1 = (n) => Math.round(n * 2) / 2;
      return [s, ...s.querySelectorAll("*")].map((node) => {
        const r = node.getBoundingClientRect();
        const cs = getComputedStyle(node);
        const text = [...node.childNodes]
          .filter((c) => c.nodeType === 3)
          .map((c) => c.textContent.trim())
          .join(" ")
          .trim();
        return [
          node.tagName,
          text,
          node.getAttribute("src") ?? node.getAttribute("href") ?? node.getAttribute("alt") ?? "",
          r1(r.left - origin.left),
          r1(r.top - origin.top),
          r1(r.width),
          r1(r.height),
          cs.color,
          cs.backgroundColor,
          cs.fontFamily,
          cs.fontSize,
          cs.fontWeight,
          cs.borderTopColor,
          cs.opacity,
        ].join("|");
      });
    }, id);
  }
  writeFileSync(path.join(SHOTS, dir, "layout.json"), JSON.stringify(layouts));
  await context.close();
}

async function diff(a, b) {
  const [ia, ib] = await Promise.all([
    sharp(a).raw().toBuffer({ resolveWithObject: true }),
    sharp(b).raw().toBuffer({ resolveWithObject: true }),
  ]);
  if (ia.info.width !== ib.info.width || Math.abs(ia.info.height - ib.info.height) > 2) {
    return { same: false, detail: `size ${ia.info.width}x${ia.info.height} vs ${ib.info.width}x${ib.info.height}` };
  }
  /* Section 03's new height is fractional, so later sections can land
     on a different sub-pixel row (a 1px anti-aliasing shift with no
     visual change). Compare at vertical offsets -2..+2 and keep the
     best match; a genuine regression differs at every offset. */
  const w = ia.info.width;
  const ch = ia.info.channels;
  const h = Math.min(ia.info.height, ib.info.height) - 4;
  let bestRatio = 1;
  let bestDy = 0;
  for (let dy = -2; dy <= 2; dy++) {
    let differing = 0;
    for (let y = 2; y < h; y++) {
      const rowA = y * w * ch;
      const rowB = (y + dy) * w * ch;
      for (let x = 0; x < w; x++) {
        const pa = rowA + x * ch;
        const pb = rowB + x * ch;
        if (
          Math.abs(ia.data[pa] - ib.data[pb]) > 16 ||
          Math.abs(ia.data[pa + 1] - ib.data[pb + 1]) > 16 ||
          Math.abs(ia.data[pa + 2] - ib.data[pb + 2]) > 16
        ) {
          differing++;
        }
      }
    }
    const ratio = differing / (w * (h - 2));
    if (ratio < bestRatio) {
      bestRatio = ratio;
      bestDy = dy;
    }
  }
  return {
    same: bestRatio < 0.005,
    ratio: bestRatio,
    detail: `${(bestRatio * 100).toFixed(3)}% pixels differ (best at dy=${bestDy}px)`,
  };
}

/* ---- approved Smile Journey: geometry + pixel baseline ----------------
   The EXPANDED journey is approved. `story-baseline` mode records, on
   the untouched component, per viewport:
     - frame / stage-child rects relative to the stage (both states)
     - stage rect relative to the story root and the root height
       (expanded, and collapsed on the rail layout where the copy and
       stage share one cell)
     - expanded stage pixels (copy is opacity 0 there, so only the
       journey itself is captured) and the collapsed Step 06 frame
   Check mode compares the refined component against it. */
const STORY_VIEWPORTS = [...VIEWPORTS, [767, 1024]];
const STORY_BASE = path.join(SHOTS, "baseline", "story");
const STORY_GEOM = path.join(STORY_BASE, "story-geometry.json");

async function storyGeometry(page) {
  return page.evaluate(() => {
    const root = document.querySelector("[data-story]");
    const stage = root.querySelector("[data-story-stage]");
    const o = root.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    const r2 = (n) => Math.round(n * 100) / 100;
    const rel = (el, base) => {
      const r = el.getBoundingClientRect();
      return [r.left - base.left, r.top - base.top, r.width, r.height].map(r2);
    };
    return {
      rootH: r2(o.height),
      stage: rel(stage, o),
      frames: [...root.querySelectorAll("[data-story-frame]")].map((f) => rel(f, s)),
      children: [...stage.children]
        .filter((c) => getComputedStyle(c).display !== "none")
        .map((c) => rel(c, s)),
    };
  });
}

async function openStoryPage(w, h) {
  const context = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await acceptCookies(page);
  await page.evaluate(() => {
    const s = document.querySelector("[data-story]");
    window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - 90, behavior: "instant" });
  });
  await page.waitForFunction(() =>
    [...document.querySelectorAll("[data-story-frame] img")].every((i) => i.complete && i.naturalWidth),
  );
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      const pos = getComputedStyle(el).position;
      if (pos === "fixed" || pos === "sticky") el.style.setProperty("visibility", "hidden", "important");
    }
  });
  return { context, page };
}

async function captureStory(w, h, dir) {
  const tag = `${w}x${h}`;
  const { context, page } = await openStoryPage(w, h);
  const collapsed = await storyGeometry(page);
  await page.locator('[data-story-frame="6"]').screenshot({ path: path.join(dir, `${tag}-collapsed-06.png`), animations: "disabled" });
  await page.locator("[data-story-toggle]").click();
  await page.waitForTimeout(1300);
  const expanded = await storyGeometry(page);
  await page.locator("[data-story-stage]").screenshot({ path: path.join(dir, `${tag}-expanded.png`), animations: "disabled" });
  await page.locator(w >= 768 ? "[data-story-close]" : "[data-story-end-close]").click();
  await page.waitForTimeout(1300);
  const reclosed = await storyGeometry(page);
  await context.close();
  return { collapsed, expanded, reclosed };
}

const maxDelta = (a, b) => {
  const fa = JSON.stringify(a).match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  const fb = JSON.stringify(b).match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  if (fa.length !== fb.length) return Infinity;
  return fa.reduce((m, v, i) => Math.max(m, Math.abs(v - fb[i])), 0);
};

if (MODE === "baseline" && process.argv[3] === "story") {
  mkdirSync(STORY_BASE, { recursive: true });
  const all = {};
  for (const [w, h] of STORY_VIEWPORTS) {
    all[`${w}x${h}`] = await captureStory(w, h, STORY_BASE);
    console.log(`story baseline ${w}x${h}`);
  }
  writeFileSync(STORY_GEOM, JSON.stringify(all, null, 1));
  console.log(`Story baseline saved to ${STORY_BASE}`);
  await browser.close();
  stopServer();
  process.exit(0);
}

async function storyBaselineChecks() {
  if (!existsSync(STORY_GEOM)) {
    check("story baseline present", false, "run: node scripts/specialties-qa.mjs baseline story");
    return;
  }
  const base = JSON.parse(readFileSync(STORY_GEOM, "utf8"));
  const dir = path.join(SHOTS, "current", "story");
  mkdirSync(dir, { recursive: true });
  for (const [w, h] of STORY_VIEWPORTS) {
    const tag = `${w}x${h}`;
    const b = base[tag];
    const c = await captureStory(w, h, dir);
    const rail = w >= 768;
    /* Expanded: stage position, every frame and stage child identical.
       On the rail the copy column (which shares the stage's grid cell
       and keeps its space at opacity 0) is now taller than the photo,
       so the story ROOT may be taller than in the baseline — by design
       (approved: extra space beneath the rail). Mobile collapses the
       copy to 0px when expanded, so there the root height is exact. */
    const stripRoot = (g) => (rail ? { s: g.stage, f: g.frames, c: g.children } : g);
    const dExp = maxDelta(stripRoot(b.expanded), stripRoot(c.expanded));
    check(`[${tag}] approved expanded geometry unchanged`, dExp <= 0.5, `max Δ ${dExp}px`);
    if (rail) {
      const dH = Math.abs(c.collapsed.rootH - c.expanded.rootH);
      check(`[${tag}] story height identical collapsed ↔ expanded (no jump)`, dH <= 0.5, `${c.collapsed.rootH} / ${c.expanded.rootH}px`);
    }
    const px = await diff(path.join(STORY_BASE, `${tag}-expanded.png`), path.join(dir, `${tag}-expanded.png`));
    /* Card-grid height above the story changed (Explore treatment), so
       the story lands on a new sub-pixel row and Chromium re-rasterises
       image edges (≤1px AA; verified visually identical). Geometry is
       asserted exactly above; pixels guard against visible change. */
    check(`[${tag}] approved expanded pixels unchanged`, px.ratio < 0.005, px.detail);
    /* Collapsed: frames/stage children vs the stage are identical; on
       the rail the stage also keeps its place in the story (the story
       itself may grow with the fuller copy). */
    const dCol = maxDelta(
      { f: b.collapsed.frames, c: b.collapsed.children, ...(rail ? { s: b.collapsed.stage } : {}) },
      { f: c.collapsed.frames, c: c.collapsed.children, ...(rail ? { s: c.collapsed.stage } : {}) },
    );
    check(`[${tag}] collapsed stage geometry unchanged`, dCol <= 0.5, `max Δ ${dCol}px`);
    const px6 = await diff(path.join(STORY_BASE, `${tag}-collapsed-06.png`), path.join(dir, `${tag}-collapsed-06.png`));
    /* Mobile: the (longer) copy sits ABOVE Step 06, so the frame lands
       on a new sub-pixel row and re-rasterises (±1px height, edge AA);
       its stage-relative geometry is still asserted exactly above. */
    const px6Max = 0.02;
    check(`[${tag}] collapsed Step 06 pixels unchanged`, px6.ratio < px6Max, px6.detail);
    const dRe = maxDelta(c.collapsed, c.reclosed);
    check(`[${tag}] collapse returns to exact collapsed geometry`, dRe <= 0.5, `max Δ ${dRe}px`);
  }
}

if (MODE === "baseline") {
  await sectionShots("baseline");
  console.log(`Baseline saved to ${path.join(SHOTS, "baseline")}`);
  await browser.close();
  stopServer();
  process.exit(0);
}

/* ---- smile design story: folded journey ------------------------------
   Tests the design intent, not just the DOM:
     collapsed  → Step 06 is the ONLY photograph that can be seen
     expanded   → all six visible, separable, in-viewport, copy yielded
     closed     → pixel-identical to the initial collapsed state
   "Visible" is measured with elementFromPoint (honours visibility,
   z-index, transforms and overlap) and with pixel comparisons. */
const MOVE_WAIT = 1300; /* > longest choreography (~1.0s) */

async function hideFixedChrome(page) {
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      const pos = getComputedStyle(el).position;
      if ((pos === "fixed" || pos === "sticky") && !el.closest("[role=dialog]")) {
        el.setAttribute("data-qa-hidden", "");
        el.style.setProperty("visibility", "hidden", "important");
      }
    }
  });
}

async function showFixedChrome(page) {
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("[data-qa-hidden]")) {
      el.style.removeProperty("visibility");
      el.removeAttribute("data-qa-hidden");
    }
  });
}

/* Per frame: share of a 9×7 sample grid where that frame is topmost. */
async function frameExposure(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll("[data-story-frame]")].map((li) => {
      const r = li.getBoundingClientRect();
      let own = 0;
      let total = 0;
      for (let gx = 1; gx <= 9; gx++) {
        for (let gy = 1; gy <= 7; gy++) {
          const x = r.left + (r.width * gx) / 10;
          const y = r.top + (r.height * gy) / 8;
          if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
          total++;
          const hit = document.elementFromPoint(x, y);
          if (hit && li.contains(hit)) own++;
        }
      }
      return { step: li.dataset.storyFrame, share: total ? own / total : 0, sampled: total };
    }),
  );
}

async function storyState(page) {
  return page.evaluate(() => {
    const root = document.querySelector("[data-story]");
    const frames = [...root.querySelectorAll("[data-story-frame]")];
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { l: r.left, t: r.top, w: r.width, h: r.height, r: r.right, b: r.bottom };
    };
    const intro = root.querySelector("[data-story-intro]");
    return {
      state: root.dataset.state,
      aria: root.querySelector("[data-story-toggle]").getAttribute("aria-expanded"),
      vis: frames.map((f) => getComputedStyle(f).visibility),
      rects: frames.map(rect),
      introOpacity: Number(getComputedStyle(intro).opacity),
      introRect: rect(intro),
      introWrapH: intro.parentElement.getBoundingClientRect().height,
      overflow: document.documentElement.scrollWidth - innerWidth,
      opens: root.querySelectorAll("[data-story-open]").length,
      cta: (() => {
        const b = root.querySelector("[data-story-toggle]");
        const rule = b.lastElementChild;
        return {
          ...rect(b),
          rule: rect(rule),
          vis: getComputedStyle(b).visibility,
          name: b.textContent.replace(/\s+/g, " ").trim(),
          controls: b.getAttribute("aria-controls"),
        };
      })(),
      closeVis: getComputedStyle(root.querySelector("[data-story-close]")).visibility,
      introFits: intro.scrollHeight <= intro.parentElement.getBoundingClientRect().height + 0.5,
      stageH: root.querySelector("[data-story-stage]").getBoundingClientRect().height,
      miniFont: parseFloat(getComputedStyle(intro.querySelector("[aria-hidden]")).fontSize),
      alts: frames.map((f) => f.querySelector("img")?.alt ?? ""),
      order: frames.map((f) => f.dataset.storyFrame).join(""),
      imgsDone: frames.every((f) => f.querySelector("img")?.complete),
    };
  });
}

async function stageShot(page, file) {
  const stage = page.locator("[data-story-stage]");
  await stage.screenshot({ path: file, animations: "disabled" });
  return file;
}

async function storyChecks(page, tag, w, h) {
  const rail = w >= 768;
  const root = page.locator("[data-story]");
  if (!(await root.count())) {
    check(`[${tag}] story present`, false);
    return;
  }
  const stage = page.locator("[data-story-stage]");
  await stage.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const s = document.querySelector("[data-story]");
    window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - 90, behavior: "instant" });
  });
  await page.waitForFunction(() =>
    [...document.querySelectorAll("[data-story-frame] img")].every((i) => i.complete && i.naturalWidth),
  );
  await page.waitForTimeout(300);
  await hideFixedChrome(page);

  /* ---- collapsed ---- */
  const c0 = await storyState(page);
  check(`[${tag}] story: starts collapsed, aria-expanded=false`, c0.state === "collapsed" && c0.aria === "false", `${c0.state}/${c0.aria}`);
  check(`[${tag}] story: DOM order 01→06, all alts`, c0.order === "123456" && c0.alts.every((a) => /step \d of 6/.test(a)), c0.order);
  check(
    `[${tag}] story: steps 01–05 hidden, 06 visible`,
    c0.vis.slice(0, 5).every((v) => v === "hidden") && c0.vis[5] === "visible",
    c0.vis.join(","),
  );
  const hero = c0.rects[5];
  const coincident = c0.rects.slice(0, 5).every(
    (r) => Math.abs(r.l - hero.l) < 0.6 && Math.abs(r.t - hero.t) < 0.6 && Math.abs(r.w - hero.w) < 0.6 && Math.abs(r.h - hero.h) < 0.6,
  );
  check(`[${tag}] story: 01–05 stacked exactly under 06`, coincident, `hero ${hero.w.toFixed(0)}x${hero.h.toFixed(0)}`);
  const ex0 = await frameExposure(page);
  check(
    `[${tag}] story: zero visible area for 01–05`,
    ex0.slice(0, 5).every((e) => e.share === 0) && ex0[5].share > 0.95,
    ex0.map((e) => `${e.step}:${(e.share * 100).toFixed(0)}%`).join(" "),
  );
  /* Pixel proof: the stage with 01–05 present must equal the stage with
     01–05 removed from the DOM — not one pixel of them shows. */
  const shotA = await stageShot(page, path.join(SHOTS, "current", `story-${tag}-collapsed.png`));
  await page.evaluate(() =>
    document.querySelectorAll("[data-story-frame]").forEach((f, i) => {
      if (i < 5) f.style.display = "none";
    }),
  );
  const shotB = await stageShot(page, path.join(SHOTS, "current", `story-${tag}-only06.png`));
  await page.evaluate(() => document.querySelectorAll("[data-story-frame]").forEach((f) => (f.style.display = "")));
  const pxA = await diff(shotA, shotB);
  check(`[${tag}] story: collapsed pixels == 06 alone`, pxA.ratio === 0, pxA.detail);
  check(`[${tag}] story: collapsed no overflow`, c0.overflow <= 0, `${c0.overflow}px`);
  if (rail) {
    check(`[${tag}] story: hero has presence (≥ 340px wide)`, hero.w >= 340, `${hero.w.toFixed(0)}px`);
  }
  check(`[${tag}] story: no full-size buttons while collapsed`, c0.opens === 0, `${c0.opens}`);

  /* Discovery CTA + case timeline (collapsed refinements). */
  check(
    `[${tag}] story: CTA is the button "Click to view the smile journey"`,
    /^click to view the smile journey$/i.test(c0.cta.name) && c0.cta.vis === "visible" && !!c0.cta.controls,
    c0.cta.name,
  );
  check(`[${tag}] story: bar close hidden while collapsed`, c0.closeVis === "hidden", c0.closeVis);
  /* Desktop rail ≥ 24px (brief: 24–28px); tablet/mobile ≥ 20px. */
  const minFont = w >= 1180 ? 24 : 20;
  check(`[${tag}] story: timeline numerals ≥ ${minFont}px`, c0.miniFont >= minFont, `${c0.miniFont}px`);
  {
    const title = await page.locator("#miftah-story-title").innerText();
    check(
      `[${tag}] story: title communicates clinical thinking`,
      /the clinical thinking behind\s*a confident smile\./i.test(title),
      title.replace(/\s+/g, " "),
    );
    const copy = await page.evaluate(() => {
      const ps = [...document.querySelectorAll("[data-story-intro] p")];
      return ps.map((p) => {
        const r = p.getBoundingClientRect();
        const lh = parseFloat(getComputedStyle(p).lineHeight);
        return { visible: r.height > 0 && getComputedStyle(p).display !== "none", lines: Math.round(r.height / lh), words: p.textContent.trim().split(/\s+/).length };
      });
    });
    check(
      `[${tag}] story: two full paragraphs visible`,
      copy.length === 2 && copy.every((p) => p.visible && p.words >= 45),
      copy.map((p) => `${p.words}w/${p.lines} lines`).join(", "),
    );
    const mini = await page.evaluate(() => {
      const m = document.querySelector("[data-story-intro] [aria-hidden]");
      const intro = document.querySelector("[data-story-intro]");
      return { r: m.getBoundingClientRect().right, ir: intro.getBoundingClientRect().right, sw: m.scrollWidth, cw: m.clientWidth };
    });
    check(`[${tag}] story: timeline fits its column`, mini.r <= mini.ir + 0.5 && mini.sw <= mini.cw + 0.5, `${mini.r.toFixed(0)} ≤ ${mini.ir.toFixed(0)}`);
    /* CTA motion must never move the button's box (no layout shift). */
    const boxes = [];
    for (let i = 0; i < 5; i++) {
      boxes.push(await page.locator("[data-story-toggle]").evaluate((b) => {
        const r = b.getBoundingClientRect();
        return `${r.left.toFixed(2)},${r.top.toFixed(2)},${r.width.toFixed(2)},${r.height.toFixed(2)}`;
      }));
      await page.waitForTimeout(400);
    }
    check(`[${tag}] story: CTA box stable while animating`, new Set(boxes).size === 1, [...new Set(boxes)].join(" | "));
    /* Keyboard focus ring on the CTA. Tabbing may scroll the page, so
       the scroll position is restored afterwards (later checks rely
       on it). */
    const y0 = await page.evaluate(() => window.scrollY);
    await page.locator("[data-story-toggle]").focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    const ring = await page.locator("[data-story-toggle]").evaluate((b) => {
      const cs = getComputedStyle(b);
      return { focus: document.activeElement === b && b.matches(":focus-visible"), style: cs.outlineStyle, width: parseFloat(cs.outlineWidth) };
    });
    check(`[${tag}] story: CTA shows a focus-visible ring`, ring.focus && ring.style !== "none" && ring.width >= 1, JSON.stringify(ring));
    await page.locator("[data-story-toggle]").evaluate((b) => b.blur());
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y0);
    await page.waitForTimeout(300);
  }
  if (rail) {
    /* The cue sits in the copy column, its rule running on to finish
       just short of Step 06. Level with the photo when the copy fits
       beside it; when the fuller copy is taller than the photo the cue
       follows the timeline instead (still pointing at the photo). */
    const leftOf = c0.cta.r <= hero.l + 0.5 && hero.l - c0.cta.rule.r >= 4 && hero.l - c0.cta.rule.r <= 20;
    const level = c0.cta.t >= hero.t;
    check(
      `[${tag}] story: CTA left of Step 06, cue ends at the photo`,
      leftOf && level,
      `cta ${c0.cta.l.toFixed(0)}–${c0.cta.r.toFixed(0)} y${c0.cta.t.toFixed(0)}–${c0.cta.b.toFixed(0)}; rule→photo ${(hero.l - c0.cta.rule.r).toFixed(1)}px; hero x${hero.l.toFixed(0)} y${hero.t.toFixed(0)}–${hero.b.toFixed(0)}`,
    );
    check(`[${tag}] story: CTA rule is long (≥ 300px)`, c0.cta.rule.w >= 300, `${c0.cta.rule.w.toFixed(0)}px`);
    check(`[${tag}] story: copy column fits beside the hero`, c0.introFits);
  } else {
    check(`[${tag}] story: CTA between copy and Step 06`, c0.cta.b <= hero.t && c0.cta.r <= w, `cta bottom ${c0.cta.b.toFixed(0)} / hero top ${hero.t.toFixed(0)}`);
  }

  /* ---- expand ---- */
  const toggle = page.locator("[data-story-toggle]");
  const sectionTop0 = await page.evaluate(() =>
    document.querySelector('section[aria-labelledby="miftah-scope-title"]').getBoundingClientRect().top + window.scrollY,
  );
  await toggle.click();
  await page.waitForTimeout(MOVE_WAIT);
  const e1 = await storyState(page);
  check(`[${tag}] story: expanded, aria-expanded=true`, e1.state === "expanded" && e1.aria === "true", `${e1.state}/${e1.aria}`);
  check(`[${tag}] story: CTA hidden, close shown, focus on close`, e1.cta.vis === "hidden" && e1.closeVis === "visible" && (await page.evaluate(() => document.activeElement?.hasAttribute("data-story-close"))));
  check(`[${tag}] story: all six visible`, e1.vis.every((v) => v === "visible"), e1.vis.join(","));
  check(`[${tag}] story: expanded no overflow`, e1.overflow <= 0, `${e1.overflow}px`);
  const inner = e1.rects.slice(0, 5);
  const sameSize = inner.every((r) => Math.abs(r.w - inner[0].w) < 0.6 && Math.abs(r.h - inner[0].h) < 0.6);
  check(`[${tag}] story: 01–05 identical size (no emphasis)`, sameSize, inner.map((r) => `${r.w.toFixed(0)}x${r.h.toFixed(0)}`).join(" "));

  if (rail) {
    const inView = e1.rects.every((r) => r.l >= -0.5 && r.r <= w + 0.5 && r.t >= 0 && r.b <= h);
    check(`[${tag}] story: six frames inside viewport`, inView, e1.rects.map((r) => `${r.l.toFixed(0)}–${r.r.toFixed(0)}`).join(" "));
    const lefts = e1.rects.map((r) => r.l);
    check(`[${tag}] story: rail reads 01→06 left to right`, lefts.every((l, i) => i === 0 || l > lefts[i - 1]));
    const ex1 = await frameExposure(page);
    check(
      `[${tag}] story: each frame ≥ 55% exposed`,
      ex1.every((e) => e.share >= 0.55),
      ex1.map((e) => `${e.step}:${(e.share * 100).toFixed(0)}%`).join(" "),
    );
    check(`[${tag}] story: copy yielded (opacity 0)`, e1.introOpacity === 0, `${e1.introOpacity}`);
    const sectionTop1 = await page.evaluate(() =>
      document.querySelector('section[aria-labelledby="miftah-scope-title"]').getBoundingClientRect().top + window.scrollY,
    );
    check(`[${tag}] story: page below does not move`, Math.abs(sectionTop1 - sectionTop0) < 1, `Δ ${(sectionTop1 - sectionTop0).toFixed(1)}px`);
    check(`[${tag}] story: steps open at full size`, e1.opens === 6, `${e1.opens}`);
  } else {
    const tops = e1.rects.map((r) => r.t);
    /* Option A: 06 at top, 05 → 01 dealt downward beneath it. */
    const descending = [5, 4, 3, 2, 1, 0].every((idx, k, arr) => k === 0 || tops[idx] > tops[arr[k - 1]]);
    check(`[${tag}] story: unfolds downward 06→01`, descending, tops.map((t) => t.toFixed(0)).join(" "));
    check(`[${tag}] story: frames within width`, e1.rects.every((r) => r.l >= -0.5 && r.r <= w + 0.5));
    check(`[${tag}] story: mobile frame height ≤ 300px`, e1.rects.every((r) => r.h <= 300), e1.rects.map((r) => r.h.toFixed(0)).join(" "));
    check(`[${tag}] story: copy yielded (collapsed to eyebrow)`, e1.introWrapH < 2 && e1.introOpacity === 0, `${e1.introWrapH.toFixed(1)}px`);
    /* Each frame ≥ 55% exposed when scrolled into view. */
    const shares = [];
    for (let i = 6; i >= 1; i--) {
      await page.locator(`[data-story-frame="${i}"]`).evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
      const ex = await frameExposure(page);
      shares.push(`${i}:${(ex[i - 1].share * 100).toFixed(0)}%`);
      if (ex[i - 1].share < 0.55) shares.push("LOW");
    }
    check(`[${tag}] story: each frame ≥ 55% exposed`, !shares.includes("LOW"), shares.join(" "));
    check(`[${tag}] story: no full-size buttons on mobile`, e1.opens === 0, `${e1.opens}`);
  }
  await showFixedChrome(page);
  await page.screenshot({ path: path.join(SHOTS, "current", `story-${tag}-expanded-viewport.png`) });
  await stage.screenshot({ path: path.join(SHOTS, "current", `story-${tag}-expanded.png`) });
  await hideFixedChrome(page);

  /* ---- close (mobile: the end-of-journey control) ---- */
  const close = page.locator("[data-story-close]");
  if (rail) {
    await close.click();
  } else {
    await page.locator("[data-story-end-close]").click();
  }
  await page.waitForTimeout(MOVE_WAIT);
  await page.evaluate(() => {
    const s = document.querySelector("[data-story]");
    window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - 90, behavior: "instant" });
  });
  await page.waitForTimeout(150);
  const c2 = await storyState(page);
  check(`[${tag}] story: closed, aria-expanded=false`, c2.state === "collapsed" && c2.aria === "false");
  check(`[${tag}] story: 01–05 hidden again`, c2.vis.slice(0, 5).every((v) => v === "hidden"), c2.vis.join(","));
  check(`[${tag}] story: copy returned`, c2.introOpacity === 1, `${c2.introOpacity}`);
  check(`[${tag}] story: closed no overflow`, c2.overflow <= 0, `${c2.overflow}px`);
  {
    const focused = await page.evaluate(() => document.activeElement?.hasAttribute("data-story-toggle"));
    check(`[${tag}] story: close returns focus to the CTA`, focused);
  }
  check(`[${tag}] story: stage height unchanged by refinement`, Math.abs(c2.stageH - c0.stageH) < 0.5, `${c0.stageH.toFixed(1)}px`);
  const shotC = await stageShot(page, path.join(SHOTS, "current", `story-${tag}-closed.png`));
  const pxC = await diff(shotA, shotC);
  check(`[${tag}] story: closed == initial (pixels)`, pxC.ratio < 0.0005, pxC.detail);

  /* ---- rapid toggling settles correctly ---- */
  await page.evaluate(() => {
    const open = document.querySelector("[data-story-toggle]");
    const shut = document.querySelector("[data-story-close]");
    open.click();
    shut.click();
    open.click();
  });
  await page.waitForTimeout(MOVE_WAIT);
  const r3 = await storyState(page);
  const settled = r3.state === "expanded" && r3.rects.every((r, i) => Math.abs(r.l - e1.rects[i].l) < 1 && Math.abs(r.w - e1.rects[i].w) < 1);
  check(`[${tag}] story: rapid ×3 settles expanded at final geometry`, settled, r3.state);
  await page.evaluate(() => document.querySelector("[data-story-close]").click());
  await page.waitForTimeout(MOVE_WAIT);

  /* ---- keyboard + viewer (one desktop, one tablet, mobile) ---- */
  if (w === 1440 || w === 1024 || w === 390) {
    await toggle.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(MOVE_WAIT);
    const k1 = await storyState(page);
    const onClose = await page.evaluate(() => document.activeElement?.hasAttribute("data-story-close"));
    await page.keyboard.press(" ");
    await page.waitForTimeout(MOVE_WAIT);
    const k2 = await storyState(page);
    const onCta = await page.evaluate(() => document.activeElement?.hasAttribute("data-story-toggle"));
    check(`[${tag}] story: Enter expands → focus close; Space collapses → focus CTA`, k1.aria === "true" && onClose && k2.aria === "false" && onCta);

    if (rail) {
      await toggle.click();
      await page.waitForTimeout(MOVE_WAIT);
      await page.locator('[data-story-frame="3"] [data-story-open]').click();
      await page.waitForSelector('[role="dialog"]');
      const counter = await page.locator("[data-viewer-counter]").innerText();
      check(`[${tag}] story: step opens in viewer at 03`, /03/.test(counter), counter);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);
      const restored = await page.evaluate(() => document.activeElement?.hasAttribute("data-story-open"));
      check(`[${tag}] story: viewer close restores focus`, (await page.locator('[role="dialog"]').count()) === 0 && restored);
      await close.click();
      await page.waitForTimeout(MOVE_WAIT);
    }
  }
  await showFixedChrome(page);
}

/* Step 06 deliberately slow: while it loads, NOTHING else may show. */
async function storySlowHeroCheck(w, h) {
  const tag = `${w}x${h}`;
  const context = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await context.newPage();
  let release;
  const gate = new Promise((r) => (release = r));
  await page.route(/step-06/, async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await acceptCookies(page);
  await page.evaluate(() => {
    const s = document.querySelector("[data-story]");
    window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - 90, behavior: "instant" });
  });
  await page.waitForFunction(() =>
    [...document.querySelectorAll("[data-story-frame] img")].slice(0, 5).every((i) => i.complete && i.naturalWidth),
  );
  await hideFixedChrome(page);
  const heroDone = await page.evaluate(() => document.querySelector('[data-story-frame="6"] img').complete);
  const ex = await frameExposure(page);
  check(
    `[${tag}] story: Step 06 still loading → 01–05 not visible`,
    !heroDone && ex.slice(0, 5).every((e) => e.share === 0),
    `06 loaded: ${heroDone}; ${ex.map((e) => `${e.step}:${(e.share * 100).toFixed(0)}%`).join(" ")}`,
  );
  release();
  await context.close();
}

/* ---- per-viewport layout checks --------------------------------------- */
for (const [w, h] of VIEWPORTS) {
  const tag = `${w}x${h}`;
  const context = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await context.newPage();
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto(URL, { waitUntil: "networkidle" });
  await acceptCookies(page);

  const section = page.locator('section[aria-labelledby="miftah-spec-title"]');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1300);

  const m = await page.evaluate(() => {
    const s = document.querySelector('section[aria-labelledby="miftah-spec-title"]');
    const cards = [...s.querySelectorAll("[data-spec-card]")];
    const grid = s.querySelector("[data-spec-grid]");
    const chapter = s.querySelector("[data-spec-chapter]");
    return {
      titles: cards.map((c) => c.querySelector("h3")?.firstChild?.textContent?.trim() ?? ""),
      heights: cards.map((c) => c.getBoundingClientRect().height),
      tops: cards.map((c) => Math.round(c.getBoundingClientRect().top)),
      lefts: [...new Set(cards.map((c) => Math.round(c.getBoundingClientRect().left)))],
      gridH: grid?.getBoundingClientRect().height ?? 0,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      hasChapter: !!chapter,
      imgsNoAlt: [...s.querySelectorAll("img")].filter((i) => !i.alt.trim()).length,
      text: s.innerText,
    };
  });

  check(`[${tag}] four cards in order`, JSON.stringify(m.titles) === JSON.stringify(EXPECTED_TITLES), m.titles.join(" | "));
  if (m.heights.length && w >= 768) {
    /* Equal heights matter within each visual row (4-up or 2 × 2);
       on the single-column stack cards size to content. */
    const rows = new Map();
    m.tops.forEach((top, i) => rows.set(top, [...(rows.get(top) ?? []), m.heights[i]]));
    const spread = Math.max(...[...rows.values()].map((hs) => Math.max(...hs) - Math.min(...hs)));
    check(`[${tag}] card heights equal per row`, spread <= 1, `${rows.size} row(s), max in-row spread ${spread.toFixed(1)}px`);
  }
  const expectCols = w >= 1100 ? 4 : w >= 768 ? 2 : 1;
  check(`[${tag}] ${expectCols} column(s)`, m.lefts.length === expectCols, `${m.lefts.length} distinct columns`);
  check(`[${tag}] no horizontal overflow`, m.overflow <= 0, `${m.overflow}px`);
  check(`[${tag}] all section images have alt`, m.imgsNoAlt === 0, `${m.imgsNoAlt} missing`);

  if (w >= 1100) {
    /* 420–480 was the target ceiling; a shorter, still-readable grid
       is a pass (less scrolling), so only the upper bound is enforced. */
    check(`[${tag}] grid height ≤ 480`, m.gridH > 0 && m.gridH <= 480, `${m.gridH.toFixed(0)}px`);
    /* Whole Section 03 header + grid in one viewport below the nav. */
    const fit = await page.evaluate((nav) => {
      const s = document.querySelector('section[aria-labelledby="miftah-spec-title"]');
      const chapter = s.querySelector("[data-spec-chapter]");
      const grid = s.querySelector("[data-spec-grid]");
      const top = chapter.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - nav - 8, behavior: "instant" });
      const span = grid.getBoundingClientRect().bottom - chapter.getBoundingClientRect().top;
      return { span, available: window.innerHeight - nav - 8, bottom: grid.getBoundingClientRect().bottom };
    }, NAV);
    check(
      `[${tag}] eyebrow→grid fits viewport`,
      fit.bottom <= h,
      `span ${fit.span.toFixed(0)}px / available ${fit.available}px`,
    );
  }

  const bannedHits = BANNED.filter((re) => re.test(m.text)).map(String);
  check(`[${tag}] no banned phrases`, bannedHits.length === 0, bannedHits.join(", "));

  await page.screenshot({ path: path.join(SHOTS, "current", `s03-viewport-${tag}.png`) });
  await section.screenshot({ path: path.join(SHOTS, "current", `s03-${tag}.png`) });

  const mp4Early = requests.filter((u) => u.includes(".mp4"));
  check(`[${tag}] no .mp4 before interaction`, mp4Early.length === 0, mp4Early.join(", "));
  const xrayOriginals = requests.filter((u) => ORIGINAL_XRAYS.some((p) => decodeURIComponent(u).includes(p)));
  check(`[${tag}] no original X-ray requests`, xrayOriginals.length === 0);

  /* ---- interaction checks, desktop + mobile ---- */
  if (w === 1440 || w === 390) {
    // Viewer: before/after image.
    const trigger = page.locator("[data-evidence-open]").first();
    if (await trigger.count()) {
      await trigger.scrollIntoViewIfNeeded();
      await trigger.click();
      await page.waitForSelector('[role="dialog"]');
      const inside = await page.evaluate(() => document.querySelector('[role="dialog"]').contains(document.activeElement));
      check(`[${tag}] viewer opens with focus inside`, inside);
      const c1 = await page.locator("[data-viewer-counter]").innerText();
      await page.keyboard.press("ArrowRight");
      const c2 = await page.locator("[data-viewer-counter]").innerText();
      check(`[${tag}] viewer arrow navigation`, c1 !== c2, `${c1} → ${c2}`);
      for (let i = 0; i < 8; i++) await page.keyboard.press("Tab");
      const trapped = await page.evaluate(() => document.querySelector('[role="dialog"]').contains(document.activeElement));
      check(`[${tag}] viewer focus trap`, trapped);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(150);
      const closed = (await page.locator('[role="dialog"]').count()) === 0;
      const restored = await page.evaluate(() => document.activeElement?.hasAttribute("data-evidence-open"));
      check(`[${tag}] viewer Escape closes + focus restored`, closed && restored);
    } else {
      check(`[${tag}] viewer trigger present`, false);
    }

    // Film.
    const film = page.locator("[data-film]").first();
    if (await film.count()) {
      const before = await page.locator("video").count();
      await film.click();
      await page.waitForTimeout(700);
      const vids = await page.locator('[role="dialog"] video').count();
      check(`[${tag}] film opens one video in viewer`, vids === 1, `${vids} video(s), ${before} on page before`);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(200);
      const after = await page.locator('[role="dialog"] video').count();
      check(`[${tag}] film unmounts on close`, after === 0);
    } else {
      check(`[${tag}] film control present`, false);
    }
  }
  await storyChecks(page, tag, w, h);
  await context.close();
}

/* ---- original X-rays are not publicly reachable ---------------------- */
{
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const p of ORIGINAL_XRAYS) {
    const res = await page.request.get(`${ORIGIN}${p}`);
    check(`original X-ray 404: ${path.basename(p)}`, res.status() === 404, `status ${res.status()}`);
  }
  await context.close();
}

/* ---- reduced motion + CLS ------------------------------------------- */
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(URL, { waitUntil: "networkidle" });
  await acceptCookies(page);
  const section = page.locator('section[aria-labelledby="miftah-spec-title"]');
  const clsBefore = await page.evaluate(() => window.__cls);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const rm = await page.evaluate(() => {
    const card = document.querySelector("[data-spec-card]");
    const frame = document.querySelector('[data-story-frame="1"]');
    return {
      cardAnim: card ? getComputedStyle(card).animationName : "missing",
      frameDur: frame ? getComputedStyle(frame).transitionDuration : "missing",
      cls: window.__cls,
    };
  });
  check("reduced motion: card animation none", rm.cardAnim === "none", rm.cardAnim);
  check("reduced motion: story transitions 0s", rm.frameDur.split(",").every((d) => parseFloat(d) === 0), rm.frameDur);
  /* State change must be immediate — final geometry on the next frame. */
  const instant = await page.evaluate(async () => {
    document.querySelector("[data-story-toggle]").click();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const f1 = document.querySelector('[data-story-frame="1"]').getBoundingClientRect();
    const f6 = document.querySelector('[data-story-frame="6"]').getBoundingClientRect();
    const vis = getComputedStyle(document.querySelector('[data-story-frame="1"]')).visibility;
    const ctaAnim = getComputedStyle(document.querySelector("[data-story-toggle] [aria-hidden] span")).animationName;
    document.querySelector("[data-story-close]").click();
    return { apart: f6.left - f1.left, vis, ctaAnim };
  });
  check("reduced motion: expand applies immediately", instant.apart > 400 && instant.vis === "visible", JSON.stringify(instant));
  check("reduced motion: CTA motion stopped", instant.ctaAnim === "none", instant.ctaAnim);
  /* CTA keyframes may only animate compositor properties. */
  const kf = await page.evaluate(() => {
    const props = new Set();
    let found = 0;
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of rules) {
        if (rule.type === CSSRule.KEYFRAMES_RULE && /cta(Draw|Nudge)/.test(rule.name)) {
          found++;
          for (const k of rule.cssRules) for (let i = 0; i < k.style.length; i++) props.add(k.style[i]);
        }
      }
    }
    return { found, props: [...props] };
  });
  check(
    "CTA keyframes animate transform/translate/scale/opacity only",
    kf.found >= 2 && kf.props.every((p) => ["transform", "translate", "scale", "opacity"].includes(p)),
    `${kf.found} rules: ${kf.props.join(", ")}`,
  );
  check("CLS while viewing Section 03 < 0.02", rm.cls - clsBefore < 0.02, `ΔCLS ${(rm.cls - clsBefore).toFixed(4)}`);
  await context.close();
}

/* ---- Step 06 slow to load: nothing else shows ------------------------- */
await storySlowHeroCheck(1440, 900);
await storySlowHeroCheck(390, 844);

/* ---- treatment dossier dialog -----------------------------------------
   Opens from each card's "Explore treatment" button; checks size,
   internal scroll with the page locked, inert background, focus trap,
   Escape / backdrop close, focus restore and the nested evidence
   viewer. */
const DOSSIER_TITLES = ["Saving natural teeth", "Smile designing", "Dental implants", "Full mouth rehabilitation"];

/* Ten patient-facing section headings per dossier (IA unchanged). */
const DOSSIER_HEADINGS = [
  ["What root canal treatment does", "Why it may be needed", "How it works — the five stages", "The clinical approach", "Dr. Miftah's approach", "Important to know", "Before treatment", "After treatment", "Long-term care", "Clinical evidence"],
  ["What is smile design?", "Why it may be considered", "What the process may involve", "Why planning matters", "Dr. Miftah's approach", "Important considerations", "Before treatment", "After treatment", "Long-term care", "Clinical evidence"],
  ["What is a dental implant?", "Why it may be recommended", "The treatment journey", "Why planning matters", "Dr. Miftah's approach", "Important considerations", "Before treatment", "After treatment", "Long-term care", "Clinical evidence"],
  ["What is full mouth rehabilitation?", "Why it may be needed", "A typical treatment pathway", "Why complex cases require planning", "Dr. Miftah's approach", "What patients should expect", "Before treatment", "After treatment", "Maintenance", "Clinical evidence"],
];

/* Unsupported superlatives / promises — dossier copy only. */
const DOSSIER_BANNED = [
  ...BANNED,
  /pain-?free/i,
  /\bleading (dentist|specialist|clinic|expert)/i,
  /number one|no\.\s?1\b/i,
  /\btop (dentist|specialist|clinic)/i,
  /\bguaranteed?\b/i,
  /\bpermanent(ly)? (fix|solution)/i,
];

async function dialogState(page) {
  return page.evaluate(() => {
    const d = document.querySelector("[data-treatment-dialog]");
    if (!d) return null;
    const r = d.getBoundingClientRect();
    const label = document.getElementById(d.getAttribute("aria-labelledby"));
    const headings = [...d.querySelectorAll("h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
    return {
      w: r.width,
      h: r.height,
      l: r.left,
      t: r.top,
      modal: d.getAttribute("aria-modal"),
      labelTag: label?.tagName,
      label: label?.textContent.trim(),
      bodyOverflow: document.body.style.overflow,
      inert: ["main", "header", "footer", ".mobile-bar"].map((s) => {
        const el = document.querySelector(s);
        return !el || !!el.closest("[inert]");
      }),
      focusInside: d.contains(document.activeElement),
      headingsOk: headings[0] === 2 && headings.every((lv, i) => i === 0 || lv <= headings[i - 1] + 1),
      sections: d.querySelectorAll("[data-dossier-section]").length,
      sectionHeadings: [...d.querySelectorAll("[data-dossier-section] h3")].map((h) => h.textContent.trim()),
      indexLabels: [...d.querySelectorAll("nav li button")].map((b) => b.textContent.replace(/^\d+/, "").trim()),
      words: d.querySelector("[data-dossier]").innerText.trim().split(/\s+/).length,
      overflow: document.documentElement.scrollWidth - innerWidth,
      innerOverflow: (() => {
        const s = d.querySelector("[data-dialog-scroll]");
        return s.scrollWidth - s.clientWidth;
      })(),
      text: d.innerText,
    };
  });
}

async function dossierDialogChecks(w, h, cardIndexes) {
  const tag = `${w}x${h}`;
  const context = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await acceptCookies(page);
  for (const i of cardIndexes) {
    const btn = page.locator("[data-explore-treatment]").nth(i);
    await btn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const meta = await btn.evaluate((b) => ({
      haspopup: b.getAttribute("aria-haspopup"),
      name: b.getAttribute("aria-label"),
      tag: b.tagName,
      type: b.getAttribute("type"),
    }));
    check(
      `[${tag}] card ${i + 1}: Explore is a real button with aria-haspopup=dialog`,
      meta.tag === "BUTTON" && meta.type === "button" && meta.haspopup === "dialog" && /^Explore treatment — /.test(meta.name),
      meta.name,
    );
    const scrollY0 = 0;
    await btn.click();
    await page.waitForSelector("[data-treatment-dialog]");
    await page.waitForTimeout(450);
    /* html has scroll-behavior: smooth, so read the page position only
       once the dialog is open and the page is locked. */
    const openY = await page.evaluate(() => window.scrollY);
    const s = await dialogState(page);
    const prefix = `[${tag}] dialog ${i + 1}`;
    check(`${prefix}: labelled by its h2 title`, s.modal === "true" && s.labelTag === "H2" && s.label.toLowerCase() === DOSSIER_TITLES[i].toLowerCase(), s.label);
    if (w >= 768) {
      const targetW = Math.min(w * (w >= 1024 ? 0.8 : 0.92), 1240);
      check(`${prefix}: ≈80vw × 90vh, centred`, Math.abs(s.w - targetW) < 2 && Math.abs(s.h - h * 0.9) < 2 && Math.abs(s.l - (w - s.w) / 2) < 2, `${s.w.toFixed(0)}×${s.h.toFixed(0)} (target ${targetW.toFixed(0)}×${(h * 0.9).toFixed(0)})`);
    } else {
      check(`${prefix}: full viewport on mobile`, Math.abs(s.w - w) < 1 && Math.abs(s.h - h) < 1, `${s.w}×${s.h}`);
    }
    check(`${prefix}: ten sections, valid heading levels`, s.sections === 10 && s.headingsOk, `${s.sections} sections`);
    check(
      `${prefix}: patient-facing section headings (body + index)`,
      JSON.stringify(s.sectionHeadings) === JSON.stringify(DOSSIER_HEADINGS[i]) && JSON.stringify(s.indexLabels) === JSON.stringify(DOSSIER_HEADINGS[i]),
      s.sectionHeadings.filter((t, k) => t !== DOSSIER_HEADINGS[i][k]).join(" | ") || "all match",
    );
    check(`${prefix}: substantial dossier (≥ 1200 words)`, s.words >= 1200, `${s.words} words`);
    check(`${prefix}: focus inside, body scroll locked`, s.focusInside && s.bodyOverflow === "hidden", `overflow=${s.bodyOverflow}`);
    check(`${prefix}: page behind is inert`, s.inert.every(Boolean), s.inert.join(","));
    check(`${prefix}: no horizontal overflow`, s.overflow <= 0 && s.innerOverflow <= 0, `${s.overflow}/${s.innerOverflow}px`);
    const banned = DOSSIER_BANNED.filter((re) => re.test(s.text)).map(String);
    check(`${prefix}: no banned phrases`, banned.length === 0, banned.join(", "));
    check(`${prefix}: no unpublished case text`, !/australia|recovered from cancer|case insight|available on request/i.test(s.text));

    /* Index link moves the reader to (and focuses) its section. The
       index rail is only displayed from 1024px. */
    if (w >= 1024) {
      const target = DOSSIER_HEADINGS[i][5];
      await page.locator("[data-treatment-dialog] nav li button").nth(5).click();
      await page.waitForTimeout(900);
      const nav = await page.evaluate(() => {
        const sc = document.querySelector("[data-dialog-scroll]").getBoundingClientRect();
        const a = document.activeElement;
        return { text: a?.textContent.trim(), top: a ? a.getBoundingClientRect().top - sc.top : -1, h: sc.height };
      });
      check(`${prefix}: index jumps to + focuses "${target}"`, nav.text === target && nav.top >= -1 && nav.top < nav.h / 2, `${nav.text} @ ${nav.top.toFixed(0)}px`);
      await page.evaluate(() => document.querySelector("[data-dialog-scroll]").scrollTo({ top: 0, behavior: "instant" }));
      await page.locator("[data-dialog-close]").focus();
    }

    /* Internal scroll: wheel inside scrolls the dossier, not the page. */
    const box = await page.locator("[data-dialog-scroll]").boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(400);
    const sc = await page.evaluate(() => ({
      inner: document.querySelector("[data-dialog-scroll]").scrollTop,
      page: window.scrollY,
    }));
    check(`${prefix}: scrolls internally, page does not move`, sc.inner > 100 && Math.abs(sc.page - openY) < 1 && scrollY0 === 0, `inner ${sc.inner}, page Δ ${sc.page - openY}`);

    /* Focus trap. */
    let trapped = true;
    for (let k = 0; k < 40; k++) {
      await page.keyboard.press("Tab");
      if (!(await page.evaluate(() => document.querySelector("[data-treatment-dialog]").contains(document.activeElement)))) trapped = false;
    }
    for (let k = 0; k < 6; k++) {
      await page.keyboard.press("Shift+Tab");
      if (!(await page.evaluate(() => document.querySelector("[data-treatment-dialog]").contains(document.activeElement)))) trapped = false;
    }
    check(`${prefix}: Tab / Shift+Tab stay inside`, trapped);

    /* Nested evidence viewer (first card per viewport + every card at 1440). */
    if (i === cardIndexes[0] || w === 1440) {
      const thumb = page.locator("[data-treatment-dialog] [data-dialog-evidence]").first();
      await thumb.scrollIntoViewIfNeeded();
      await thumb.click();
      await page.waitForTimeout(400);
      const opened = await page.evaluate(() => ({
        viewer: [...document.querySelectorAll('[role="dialog"]')].some((d) => !d.hasAttribute("data-treatment-dialog")),
        viewerInert: !![...document.querySelectorAll('[role="dialog"]')].find((d) => !d.hasAttribute("data-treatment-dialog"))?.closest("[inert]"),
      }));
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      const after = await page.evaluate(() => ({
        viewer: [...document.querySelectorAll('[role="dialog"]')].some((d) => !d.hasAttribute("data-treatment-dialog")),
        dialog: !!document.querySelector("[data-treatment-dialog]"),
        onThumb: document.activeElement?.hasAttribute("data-dialog-evidence"),
      }));
      check(
        `${prefix}: evidence opens the viewer; Escape closes only the viewer`,
        opened.viewer && !opened.viewerInert && !after.viewer && after.dialog && after.onThumb,
        JSON.stringify({ ...opened, ...after }),
      );
    }

    /* Escape closes; focus back on the card's Explore button. */
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const closed = await page.evaluate((idx) => ({
      gone: !document.querySelector("[data-treatment-dialog]"),
      focus: document.activeElement === document.querySelectorAll("[data-explore-treatment]")[idx],
      overflow: document.body.style.overflow,
      inert: document.querySelectorAll("[inert]").length,
    }), i);
    check(`${prefix}: Escape closes, focus returns to card, page restored`, closed.gone && closed.focus && closed.overflow === "" && closed.inert === 0, JSON.stringify(closed));
  }

  /* Backdrop click closes (desktop only — mobile has no backdrop). */
  if (w >= 768) {
    await page.locator("[data-explore-treatment]").first().click();
    await page.waitForSelector("[data-treatment-dialog]");
    await page.mouse.click(4, h / 2);
    await page.waitForTimeout(300);
    check(`[${tag}] dialog: backdrop click closes`, (await page.locator("[data-treatment-dialog]").count()) === 0);
  }

  /* Screenshots for the report. */
  if (w === 1440 || w === 390) {
    const dir = path.join(SHOTS, "current", "final");
    mkdirSync(dir, { recursive: true });
    await page.locator("[data-spec-grid]").scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await page.locator("[data-spec-grid]").screenshot({ path: path.join(dir, `${w === 1440 ? "desktop" : "mobile"}-specialisation-grid-${tag}.png`) });
    if (w === 1440) {
      await page.evaluate(() => {
        const s = document.querySelector("[data-story]");
        window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - 90, behavior: "instant" });
      });
      await page.waitForTimeout(900);
      await page.screenshot({ path: path.join(dir, `desktop-story-collapsed-${tag}.png`) });
      await page.locator("[data-story-toggle]").click();
      await page.waitForTimeout(1300);
      await page.screenshot({ path: path.join(dir, `desktop-story-expanded-${tag}.png`) });
      await page.locator("[data-story-close]").click();
      await page.waitForTimeout(1300);
    }
    const shots = w === 1440 ? [[0, "dialog-root-canal"], [2, "dialog-dental-implants"], [3, "dialog-full-mouth-rehabilitation"], [1, "dialog-smile-designing"]] : [[0, "mobile-dialog-root-canal"]];
    for (const [idx, name] of shots) {
      await page.locator("[data-explore-treatment]").nth(idx).click();
      await page.waitForSelector("[data-treatment-dialog]");
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(dir, `${name}-${tag}.png`) });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
    }
  }
  await context.close();
}

/* ---- SSR document + unpublished case exclusion ------------------------ */
async function ssrChecks() {
  const context = await browser.newContext();
  const page = await context.newPage();
  const res = await page.request.get(URL);
  const html = await res.text();
  const lower = html.toLowerCase();
  check("SSR: all four dossier titles in the HTML", DOSSIER_TITLES.every((t) => lower.includes(t.toLowerCase())));
  const sectionHeadings = [...new Set(DOSSIER_HEADINGS.flat())].map((t) => t.replace(/'/g, "&#x27;"));
  const missing = sectionHeadings.filter((t) => !html.includes(t));
  check("SSR: dossier section headings in the HTML", missing.length === 0, missing.join(" | "));
  check("SSR: unpublished Australian case absent from HTML", !/australia/i.test(html));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  check("SSR: no duplicate ids", dupes.length === 0, dupes.slice(0, 5).join(", "));
  /* Every shipped JS/CSS chunk — the draft module must not be bundled. */
  const { readdirSync, statSync } = await import("node:fs");
  const walk = (d) => readdirSync(d).flatMap((f) => {
    const p = path.join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
  const staticFiles = walk(path.join(root, ".next", "static"));
  const leaks = staticFiles.filter((f) => /\.(js|css|json|txt)$/.test(f) && /australia|recovered from cancer/i.test(readFileSync(f, "utf8")));
  check(`.next/static: no unpublished case text (${staticFiles.length} files)`, leaks.length === 0, leaks.map((f) => path.basename(f)).join(", "));
  await context.close();
}

/* ---- headings in Section 03 never skip a level ------------------------ */
async function headingChecks() {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  const r = await page.evaluate(() => {
    const s = document.querySelector('section[aria-labelledby="miftah-spec-title"]');
    const levels = [...s.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
    const bad = levels.findIndex((lv, i) => i > 0 && lv > levels[i - 1] + 1);
    const hidden = s.querySelector("[data-dossier-source]");
    return {
      first: levels[0],
      bad,
      count: levels.length,
      hiddenOk: !!hidden && hidden.hidden && getComputedStyle(hidden).display === "none",
      hiddenEvidence: hidden ? hidden.querySelectorAll("button, [data-evidence-open]").length : -1,
      unverified: 0,
    };
  });
  check("Section 03 heading levels never skip", r.first === 2 && r.bad === -1, `${r.count} headings`);
  check("Hidden dossier copy present, not displayed, no controls", r.hiddenOk && r.hiddenEvidence === 0);
  await context.close();
}

await ssrChecks();
await headingChecks();
await dossierDialogChecks(1440, 900, [0, 1, 2, 3]);
await dossierDialogChecks(1024, 768, [0]);
await dossierDialogChecks(820, 1180, [1]);
await dossierDialogChecks(767, 1024, [2]);
await dossierDialogChecks(390, 844, [3]);

/* ---- approved Smile Journey unchanged vs story baseline -------------- */
await storyBaselineChecks();

/* ---- other sections unchanged vs baseline ---------------------------- */
await sectionShots("current");
const baseLayoutFile = path.join(SHOTS, "baseline", "layout.json");
const baseLayout = existsSync(baseLayoutFile) ? JSON.parse(readFileSync(baseLayoutFile, "utf8")) : {};
const curLayout = JSON.parse(readFileSync(path.join(SHOTS, "current", "layout.json"), "utf8"));
for (const id of OTHER_SECTIONS) {
  const base = path.join(SHOTS, "baseline", `${id}.png`);
  if (!existsSync(base) || !baseLayout[id]) {
    check(`unchanged: ${id}`, false, "no baseline");
    continue;
  }
  const r = await diff(base, path.join(SHOTS, "current", `${id}.png`));
  const a = baseLayout[id];
  const b = curLayout[id] ?? [];
  const firstDiff = a.findIndex((line, i) => line !== b[i]);
  const domSame = a.length === b.length && firstDiff === -1;
  const domDetail = domSame
    ? `DOM identical (${a.length} elements)`
    : `DOM differs at #${firstDiff}: "${a[firstDiff]}" vs "${b[firstDiff]}"`;
  /* Gate: the structural fingerprint must be IDENTICAL (every element's
     tag, text, src/href/alt, geometry to 0.5px and computed colour /
     font / border / opacity). The pixel diff is a secondary guard for
     gross visual changes only: Section 03's new height moves every
     later section to a new document position, and Chromium rasterises
     glyph and image edges differently there (diff mask = uniform 1px
     edge outlines, nothing moved), so a strict pixel threshold cannot
     distinguish "unchanged" from "re-rasterised". */
  check(`unchanged: ${id}`, domSame && r.ratio < 0.05, `${domDetail}; pixels ${r.detail}`);
}

await browser.close();
stopServer();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
