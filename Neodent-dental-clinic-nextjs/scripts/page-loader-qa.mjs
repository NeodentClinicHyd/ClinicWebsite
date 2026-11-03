// QA for the page loader. Usage: node scripts/page-loader-qa.mjs [first|nav|all]
// Runs against QA_BASE (default http://localhost:3000) with the cache off
// and a throttled network.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.QA_BASE ?? "http://localhost:3000";
const MODE = process.argv[2] ?? "all";
const OUT = "qa-shots/page-loader";
mkdirSync(OUT, { recursive: true });

const fails = [];
const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) fails.push(label);
};

/* Installed before any page script: records, at the moment <html> gets
   data-page-ready, every rendered <img> that is not fully loaded, plus
   the time (ms since navigation start) the loader was hidden. Also
   records whether the loader was ever seen visible. */
const RECORDER = () => {
  window.__qa = { readyAt: null, hiddenAt: null, unloaded: null, seenVisible: false, firstFrame: null };
  // First frame in which the loader exists: rAF runs after style and
  // layout, right before the browser paints that frame.
  const probeFrame = () => {
    const l = document.querySelector("[data-page-loader]");
    if (!l) return requestAnimationFrame(probeFrame);
    const r = l.getBoundingClientRect();
    const main = document.querySelector("main, .site");
    window.__qa.firstFrame = {
      t: Math.round(performance.now()),
      state: l.dataset.state,
      opacity: getComputedStyle(l).opacity,
      covers: r.width >= innerWidth && r.height >= innerHeight && getComputedStyle(l).position === "fixed",
      contentBefore: !!main && main.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_FOLLOWING ? "content-above-in-dom" : "n/a",
    };
  };
  requestAnimationFrame(probeFrame);
  const rendered = (el) => el.getClientRects().length > 0;
  const snapshot = () =>
    [...document.querySelectorAll("img")]
      .filter((i) => !i.closest("[data-page-loader]") && rendered(i))
      .filter((i) => !(i.complete && i.naturalWidth > 0))
      .map((i) => i.currentSrc || i.src);
  const watch = () => {
    new MutationObserver(() => {
      const html = document.documentElement;
      if (html.dataset.pageReady && window.__qa.readyAt === null) {
        window.__qa.readyAt = performance.now();
        window.__qa.unloaded = snapshot();
      }
      if (!html.dataset.pageReady) window.__qa.readyAt = null;
      const l = document.querySelector("[data-page-loader]");
      if (l && l.dataset.state === "visible") window.__qa.seenVisible = true;
      if (l && l.dataset.state === "hidden" && window.__qa.hiddenAt === null) window.__qa.hiddenAt = performance.now();
      if (l && l.dataset.state === "visible") window.__qa.hiddenAt = null;
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ["data-page-ready", "data-state"] });
  };
  if (document.documentElement) watch();
  else document.addEventListener("readystatechange", watch, { once: true });
};

async function throttled(browser, { width = 390, height = 844, mobile = true, js = true } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, isMobile: mobile, hasTouch: mobile, javaScriptEnabled: js });
  await ctx.addInitScript(RECORDER);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  // Roughly "fast 3G": 1.6 Mbps down, 150ms RTT.
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8,
  });
  return { ctx, page };
}

const qa = (page) => page.evaluate(() => window.__qa);
const waitHidden = (page, timeout = 20000) =>
  page.waitForFunction(() => document.querySelector("[data-page-loader]")?.dataset.state === "hidden", null, { timeout, polling: 50 });

async function firstLoad(browser) {
  console.log("\n== First load (throttled, no cache, 390px)");
  for (const path of ["/", "/about"]) {
    const { ctx, page } = await throttled(browser);
    await page.goto(BASE + path, { waitUntil: "commit" });
    await page.waitForFunction(() => window.__qa?.firstFrame, null, { timeout: 20000, polling: 20 });
    const firstPaint = (await qa(page)).firstFrame;
    check(firstPaint.state === "visible" && firstPaint.opacity === "1" && firstPaint.covers, `${path}: overlay covers the screen in the first frame ${JSON.stringify(firstPaint)}`);
    await page.screenshot({ path: `${OUT}/first${path.replace(/\W/g, "_")}-early.png` });
    await waitHidden(page);
    const r = await qa(page);
    const hitCap = r.readyAt >= 7900;
    check(hitCap || (r.unloaded && r.unloaded.length === 0), `${path}: every rendered image loaded when the overlay left (${r.unloaded?.length ?? "?"} pending${hitCap ? ", cap reached" : ""}) ${r.unloaded?.slice(0, 3).join(" ") ?? ""}`);
    check(r.hiddenAt !== null && r.hiddenAt < 8000 + 600, `${path}: hidden at ${Math.round(r.hiddenAt)}ms since navigation start (cap 8.6s)`);
    await page.screenshot({ path: `${OUT}/first${path.replace(/\W/g, "_")}-ready.png` });
    await ctx.close();
  }

  console.log("\n== Cap: one image never finishes");
  {
    const { ctx, page } = await throttled(browser);
    await page.route(/neodent-awards-recognition|_next\/image.*awards/i, () => {}); // never responds
    await page.goto(BASE + "/", { waitUntil: "commit" });
    await waitHidden(page, 15000);
    const r = await qa(page);
    check(r.hiddenAt < 8000 + 600, `loader gave up at ${Math.round(r.hiddenAt)}ms with a hung image (cap 8.6s)`);
    await ctx.close();
  }

  console.log("\n== Fast connection: minimum time");
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    await ctx.addInitScript(RECORDER);
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" }); // warm cache
    await page.reload({ waitUntil: "commit" });
    await waitHidden(page);
    const r = await qa(page);
    check(r.hiddenAt >= 600, `warm reload: hidden at ${Math.round(r.hiddenAt)}ms (min 600ms + fade)`);
    await ctx.close();
  }

  console.log("\n== JavaScript disabled");
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "load" });
    const d = await page.evaluate(() => {
      const l = document.querySelector("[data-page-loader]");
      return { exists: !!l, display: l ? getComputedStyle(l).display : null, overflow: getComputedStyle(document.documentElement).overflow };
    });
    check(d.exists && d.display === "none" && d.overflow !== "hidden", `no-JS: overlay hidden, page scrollable ${JSON.stringify(d)}`);
    const heroVisible = await page.evaluate(() => {
      const t = document.querySelector("#hero-title");
      const r = t.getBoundingClientRect();
      return getComputedStyle(t).opacity !== "0" && r.height > 0;
    });
    check(heroVisible, "no-JS: hero title visible");
    await page.screenshot({ path: `${OUT}/nojs-home.png` });
    await ctx.close();
  }
}

async function navigation(browser) {
  console.log("\n== Page changes (throttled, no cache, 390px)");
  const { ctx, page } = await throttled(browser);
  await page.goto(BASE + "/", { waitUntil: "commit" });
  await waitHidden(page);
  try { await page.getByRole("button", { name: /reject non-essential/i }).first().click({ timeout: 4000 }); } catch {}

  // Clicks a link that matches `selector` on the current page and checks
  // the overlay comes up straight away and leaves only once the
  // destination page is fully loaded.
  async function go(label, selector, expectPath) {
    await page.evaluate(() => { window.__qa.seenVisible = false; });
    const link = page.locator(selector).first();
    await link.scrollIntoViewIfNeeded().catch(() => {});
    await link.evaluate((a) => a.click()); // DOM click: same as a tap, no hover menus needed
    const shownQuickly = await page
      .waitForFunction(() => document.querySelector("[data-page-loader]")?.dataset.state === "visible", null, { timeout: 400, polling: 16 })
      .then(() => true, () => false);
    await page.waitForURL((u) => u.pathname === expectPath, { timeout: 20000 });
    await waitHidden(page);
    const r = await qa(page);
    check(shownQuickly, `${label}: overlay shown immediately on click`);
    check(r.unloaded && r.unloaded.length === 0, `${label}: destination fully loaded when the overlay left (${r.unloaded?.length ?? "?"} pending) ${r.unloaded?.slice(0, 3).join(" ") ?? ""}`);
    await page.screenshot({ path: `${OUT}/nav-${expectPath.replace(/\W/g, "_") || "home"}.png` });
  }

  await go("Home → About", "a[href='/about']", "/about");
  await go("About → Dental implants", "a[href='/treatments/dental-implants']", "/treatments/dental-implants");

  // Back
  await page.evaluate(() => { window.__qa.seenVisible = false; });
  await page.goBack();
  await page.waitForURL((u) => u.pathname === "/about", { timeout: 20000 });
  await waitHidden(page);
  const back = await qa(page);
  check(back.seenVisible, "Back: overlay shown");
  check(back.unloaded && back.unloaded.length === 0, `Back: page fully loaded when the overlay left (${back.unloaded?.length ?? "?"} pending)`);

  // Links that must never show the overlay.
  for (const [label, href] of [["tel:", "tel:+910000000000"], ["same-page #hash", "#main"], ["external", "https://example.com/"], ["new tab", "/contact"]]) {
    await page.evaluate(([h, isNewTab]) => {
      window.__qa.seenVisible = false;
      const a = document.createElement("a");
      a.href = h;
      a.textContent = "qa";
      if (isNewTab) a.target = "_blank";
      a.id = "qa-link";
      // Stop the browser actually following it; the loader listens on
      // window (bubble), so a capture listener here runs first, and
      // defaultPrevented is ignored by the loader for these cases anyway.
      a.addEventListener("click", (e) => e.preventDefault());
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, [href, label === "new tab"]);
    await page.waitForTimeout(250);
    const seen = await page.evaluate(() => window.__qa.seenVisible);
    check(!seen, `${label} link: overlay not shown`);
  }
  await ctx.close();
}

const browser = await chromium.launch();
if (MODE === "first" || MODE === "all") await firstLoad(browser);
if (MODE === "nav" || MODE === "all") await navigation(browser);
await browser.close();
console.log(fails.length ? `\n${fails.length} FAILED` : "\nALL PASS");
process.exit(fails.length ? 1 : 0);
