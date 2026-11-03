// Page audit (internal-pages redesign tooling). Adapted from home-viewport-audit.mjs.
//
//   node scripts/page-audit.mjs <slug> <route> <run-id>
//   BASE_URL=http://localhost:3000 node scripts/page-audit.mjs clinic-nampally /clinic/nampally r1
//
// For 390x844, 768x1024 and 1366x650 it loads BASE_URL + route, scrolls through
// the page (30 s at most) so reveals fire, then reports:
//   (a) img / video / [data-media] taller than 70% of the viewport height
//       (visible height after ancestor clipping; [data-media-exempt] is skipped)
//   (b) horizontal overflow and the elements that cross the right edge
//   (c) at widths <= 768: links and buttons smaller than 44 x 44 px
//   (d) visible text smaller than 12 px
//   (e) page height
// Output goes to .audit/<slug>/<run-id>/ only:
//   desktop-full.png (1366), tablet-full.png (768), mobile-full.png (390),
//   mobile-nojs-full.png (390, JavaScript disabled), one screenshot per top-level
//   section of main per viewport (12 at most), and report.json.
// Exit code 1 if (a) or (b) has findings, 2 if the page could not be audited.

import { chromium } from "playwright";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
const LEAD_CAPTURE_SESSION_KEY = "neodent-lead-capture-shown"; // lib/site-data.ts
const MEDIA_LIMIT = 0.7;
const TAP_MIN = 44;
const TEXT_MIN = 12;
const DETAIL_CAP = 25;
const SECTION_SHOT_LIMIT = 12;
const SCROLL_BUDGET_MS = 30_000;

const [slug, route, runId] = process.argv.slice(2);
if (!slug || !route || !runId || !route.startsWith("/")) {
  console.error("Usage: node scripts/page-audit.mjs <slug> <route> <run-id>");
  process.exit(2);
}
if (!/^[\w.-]+$/.test(slug) || !/^[\w.-]+$/.test(runId)) {
  console.error("slug and run-id may only contain letters, digits, dot, dash and underscore.");
  process.exit(2);
}

const URL_UNDER_TEST = BASE_URL + route;
const OUT_DIR = path.resolve(".audit", slug, runId);

const VIEWPORTS = [
  { width: 390, height: 844, label: "mobile" },
  { width: 768, height: 1024, label: "tablet" },
  { width: 1366, height: 650, label: "desktop" },
].map((v) => ({ ...v, name: `${v.width}x${v.height}` }));

async function dismissCookies(page) {
  const reject = page.getByRole("button", { name: /reject non-essential/i });
  try {
    await reject.first().waitFor({ state: "visible", timeout: 4000 });
    await reject.first().click();
    await page.waitForTimeout(300);
  } catch {
    // no banner (already decided, or not rendered)
  }
}

async function scrollThrough(page, budgetMs) {
  await page.evaluate(async (budget) => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const started = Date.now();
    const step = Math.round(window.innerHeight * 0.6);
    let y = 0;
    // scrollHeight is re-read each step: content can grow as it reveals.
    while (y < document.documentElement.scrollHeight - window.innerHeight && Date.now() - started < budget - 2000) {
      y += step;
      window.scrollTo(0, y);
      await wait(140);
    }
    await wait(900);
    window.scrollTo(0, 0);
    await wait(400);
  }, budgetMs);
}

// Runs in the page. Collects findings (a) to (e) and the section list.
function collect({ MEDIA_LIMIT, TAP_MIN, TEXT_MIN, checkTaps }) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const doc = document.documentElement;

  const describe = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) return `${s}#${el.id}`;
    const cls = [...el.classList].slice(0, 2).map((c) => c.replace(/^(\w+)-module__\w+__/, "$1."));
    if (cls.length) s += "." + cls.join(".");
    return s;
  };
  const sectionOf = (el) => {
    const top = el.closest("main > *, footer, nav, header");
    return top ? describe(top) : "(outside main)";
  };
  const isShown = (el) =>
    el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && el.getClientRects().length > 0;

  // Rect after intersecting with every ancestor that clips overflow.
  const clippedRect = (el) => {
    const r = el.getBoundingClientRect();
    let { left, right, top, bottom } = r;
    for (let a = el.parentElement; a; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.position === "fixed") break;
      const ar = a.getBoundingClientRect();
      if (cs.overflowX !== "visible") {
        left = Math.max(left, ar.left);
        right = Math.min(right, ar.right);
      }
      if (cs.overflowY !== "visible") {
        top = Math.max(top, ar.top);
        bottom = Math.min(bottom, ar.bottom);
      }
    }
    return { left, right, top, bottom, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
  };
  const isFixed = (el) => {
    for (let a = el; a; a = a.parentElement) {
      if (getComputedStyle(a).position === "fixed") return true;
    }
    return false;
  };

  // (a) media height
  const media = [];
  for (const el of document.querySelectorAll("img, video, [data-media]")) {
    if (el.closest("[data-media-exempt]")) continue;
    if (!isShown(el)) continue;
    const c = clippedRect(el);
    if (c.width === 0 || c.height === 0) continue; // fully clipped (e.g. an off-screen slide)
    const h = c.height;
    if (h > vh * MEDIA_LIMIT) {
      media.push({
        el: describe(el),
        section: sectionOf(el),
        src: (el.currentSrc || el.getAttribute("src") || "").split("/").pop()?.slice(0, 60) ?? "",
        height: Math.round(h),
        pctOfViewport: Math.round((h / vh) * 100),
        decorative: el.getAttribute("aria-hidden") === "true" || el.getAttribute("alt") === "",
      });
    }
  }

  // (b) horizontal overflow: report only the origin of each overflow
  const overflowPx = doc.scrollWidth - vw;
  const overflowEls = [];
  if (overflowPx > 0) {
    const past = new Set();
    for (const el of document.body.querySelectorAll("*")) {
      if (!isShown(el) || isFixed(el)) continue;
      const c = clippedRect(el);
      if (c.width > 0 && c.right > vw + 0.5) past.add(el);
    }
    for (const el of past) {
      if (past.has(el.parentElement)) continue;
      overflowEls.push({
        el: describe(el),
        section: sectionOf(el),
        right: Math.round(el.getBoundingClientRect().right),
        width: Math.round(el.getBoundingClientRect().width),
      });
    }
  }

  // (c) tap targets
  const taps = [];
  if (checkTaps) {
    const sel = "a[href], button, [role='button'], input[type='submit'], input[type='button'], summary";
    for (const el of document.querySelectorAll(sel)) {
      if (!isShown(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.width <= 1 || r.height <= 1) continue; // visually hidden (skip links)
      if (r.width >= TAP_MIN && r.height >= TAP_MIN) continue;
      const cs = getComputedStyle(el);
      const inline = cs.display === "inline" && !!el.closest("p, li, dd, blockquote");
      taps.push({
        el: describe(el),
        section: sectionOf(el),
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40),
        size: `${Math.round(r.width)}x${Math.round(r.height)}`,
        inlineTextLink: inline,
      });
    }
  }

  // (d) small text, grouped per element
  const small = new Map();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const text = n.nodeValue.trim();
    if (!text) continue;
    const el = n.parentElement;
    if (!el || small.has(el) || el.closest("script, style, noscript, svg")) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs >= TEXT_MIN) continue;
    if (!isShown(el)) continue;
    const c = clippedRect(el);
    if (c.width <= 1 || c.height <= 1) continue; // sr-only
    small.set(el, {
      el: describe(el),
      section: sectionOf(el),
      fontSize: Math.round(fs * 10) / 10,
      text: text.replace(/\s+/g, " ").slice(0, 50),
    });
  }

  // Sections of main for screenshots
  const sections = [...document.querySelectorAll("main > *")]
    .filter((el) => el.getBoundingClientRect().height > 0)
    .map((el, i) => {
      el.setAttribute("data-audit-section", String(i));
      const id = el.id;
      const cls = [...el.classList][0] ?? "";
      const mod = cls.match(/^(\w+)-module__/);
      const name = id || (mod ? mod[1] : cls) || el.tagName.toLowerCase();
      return { index: i, name: name.replace(/[^\w-]+/g, "-") };
    });

  return {
    viewport: { width: vw, height: vh },
    media,
    overflow: { px: Math.max(0, overflowPx), scrollWidth: doc.scrollWidth, elements: overflowEls },
    taps,
    smallText: [...small.values()],
    pageHeight: doc.scrollHeight,
    sections,
  };
}

async function newContext(browser, vp, { javaScriptEnabled = true } = {}) {
  const mobile = vp.width <= 768;
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: mobile,
    hasTouch: mobile,
    javaScriptEnabled,
  });
  if (javaScriptEnabled) {
    await context.addInitScript((key) => {
      try {
        sessionStorage.setItem(key, "1"); // keep the 50%-scroll lead modal closed
      } catch {}
    }, LEAD_CAPTURE_SESSION_KEY);
  }
  return context;
}

async function auditViewport(browser, vp) {
  const started = Date.now();
  const context = await newContext(browser, vp);
  const page = await context.newPage();
  const response = await page.goto(URL_UNDER_TEST, { waitUntil: "load", timeout: 180_000 });
  if (!response || !response.ok()) throw new Error(`${URL_UNDER_TEST} responded ${response ? response.status() : "with no response"}`);
  await page.evaluate(() => document.fonts.ready);
  await dismissCookies(page);
  await scrollThrough(page, SCROLL_BUDGET_MS);

  const mobile = vp.width <= 768;
  const result = await page.evaluate(collect, { MEDIA_LIMIT, TAP_MIN, TEXT_MIN, checkTaps: mobile });

  mkdirSync(OUT_DIR, { recursive: true });
  const fullFile = path.join(OUT_DIR, `${vp.label}-full.png`);
  try {
    await page.screenshot({ path: fullFile, fullPage: true, animations: "disabled", timeout: 60_000 });
  } catch (err) {
    console.warn(`  [${vp.name}] full-page screenshot failed: ${err.message.split("\n")[0]}`);
  }

  // Findings are collected; hide fixed chrome so it is not stamped into each section shot.
  await page.evaluate(() => {
    document.querySelectorAll("nextjs-portal").forEach((el) => el.style.setProperty("display", "none", "important"));
    for (const el of document.body.querySelectorAll("*")) {
      if (getComputedStyle(el).position === "fixed") el.style.setProperty("visibility", "hidden", "important");
    }
  });
  const shots = [];
  for (const s of result.sections.slice(0, SECTION_SHOT_LIMIT)) {
    const file = path.join(OUT_DIR, `${vp.name}-${String(s.index + 1).padStart(2, "0")}-${s.name}.png`);
    try {
      await page.locator(`[data-audit-section="${s.index}"]`).screenshot({ path: file, animations: "disabled", timeout: 20_000 });
      shots.push(file);
    } catch (err) {
      console.warn(`  [${vp.name}] section screenshot failed for ${s.name}: ${err.message.split("\n")[0]}`);
    }
  }
  await context.close();
  return { name: vp.name, fullPage: fullFile, sectionShots: shots, seconds: Math.round((Date.now() - started) / 1000), ...result };
}

async function noJsShot(browser) {
  const vp = VIEWPORTS[0];
  const context = await newContext(browser, vp, { javaScriptEnabled: false });
  const page = await context.newPage();
  const file = path.join(OUT_DIR, "mobile-nojs-full.png");
  try {
    await page.goto(URL_UNDER_TEST, { waitUntil: "load", timeout: 180_000 });
    await page.screenshot({ path: file, fullPage: true, animations: "disabled", timeout: 60_000 });
    return file;
  } catch (err) {
    console.warn(`  [no-js] screenshot failed: ${err.message.split("\n")[0]}`);
    return null;
  } finally {
    await context.close();
  }
}

function printList(title, rows, fmt) {
  if (rows.length === 0) return;
  console.log(`  ${title} (${rows.length})`);
  for (const r of rows.slice(0, DETAIL_CAP)) console.log(`    - ${fmt(r)}`);
  if (rows.length > DETAIL_CAP) console.log(`    ... ${rows.length - DETAIL_CAP} more in report.json`);
}

const browser = await chromium.launch();
const results = [];
let noJs = null;
try {
  rmSync(OUT_DIR, { recursive: true, force: true }); // this run's folder only
  mkdirSync(OUT_DIR, { recursive: true });
  for (const vp of VIEWPORTS) {
    process.stdout.write(`Auditing ${vp.name} ... `);
    const r = await auditViewport(browser, vp);
    results.push(r);
    console.log(`done (${r.seconds}s)`);
  }
  process.stdout.write("No-JavaScript 390 shot ... ");
  noJs = await noJsShot(browser);
  console.log(noJs ? "done" : "failed");
} catch (err) {
  console.error(`\nAudit failed: ${err.message}`);
  console.error(`Is the dev server running at ${BASE_URL}?`);
  await browser.close();
  process.exit(2);
}
await browser.close();

writeFileSync(
  path.join(OUT_DIR, "report.json"),
  JSON.stringify({ slug, route, runId, url: URL_UNDER_TEST, date: new Date().toISOString(), noJsScreenshot: noJs, results }, null, 2),
);

console.log(`\nPage audit: ${URL_UNDER_TEST} (${slug} / ${runId})\n`);
console.table(
  Object.fromEntries(
    results.map((r) => [
      r.name,
      {
        "(a) media >70%": r.media.length,
        "(b) overflow px": r.overflow.px,
        "(b) overflow els": r.overflow.elements.length,
        "(c) taps <44": r.viewport.width <= 768 ? r.taps.length : "n/a",
        "(c) of which inline": r.viewport.width <= 768 ? r.taps.filter((t) => t.inlineTextLink).length : "n/a",
        "(d) text <12px": r.smallText.length,
        "(e) page height": r.pageHeight,
      },
    ]),
  ),
);

for (const r of results) {
  console.log(`\n${r.name}`);
  printList("(a) media taller than 70% of viewport", r.media, (m) =>
    `${m.section} > ${m.el} ${m.height}px (${m.pctOfViewport}%)${m.decorative ? " [decorative]" : ""} ${m.src}`,
  );
  if (r.overflow.px > 0) {
    console.log(`  (b) horizontal overflow: scrollWidth ${r.overflow.scrollWidth} > ${r.viewport.width} (+${r.overflow.px}px)`);
    printList("elements past the right edge", r.overflow.elements, (o) => `${o.section} > ${o.el} right=${o.right}px width=${o.width}px`);
  }
  printList("(c) tap targets under 44x44", r.taps, (t) => `${t.section} > ${t.el} ${t.size} "${t.label}"${t.inlineTextLink ? " [inline]" : ""}`);
  printList("(d) text under 12px", r.smallText, (t) => `${t.section} > ${t.el} ${t.fontSize}px "${t.text}"`);
}

console.log(`\nScreenshots and report.json in: ${OUT_DIR}`);
for (const r of results) console.log(`  ${r.name} full page: ${r.fullPage}`);
if (noJs) console.log(`  390 no-JavaScript full page: ${noJs}`);
const failing = results.some((r) => r.media.length > 0 || r.overflow.px > 0);
if (failing) console.log("FAIL: (a) media height or (b) horizontal overflow has findings.");
process.exit(failing ? 1 : 0);
