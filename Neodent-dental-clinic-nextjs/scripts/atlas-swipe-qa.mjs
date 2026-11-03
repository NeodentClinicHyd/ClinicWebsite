// QA: the home page treatment card row must scroll horizontally with a
// touch swipe on phones. Usage: node scripts/atlas-swipe-qa.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.QA_BASE ?? "http://localhost:3000";
const OUT = "qa-shots/atlas-swipe";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
  userAgent: "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36",
});
const page = await ctx.newPage();
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.querySelector("[data-page-loader]")?.dataset.state === "hidden", null, { timeout: 15000 }).catch(() => {});
try { await page.getByRole("button", { name: /reject non-essential/i }).first().click({ timeout: 3000 }); } catch {}

// Scroll the row into view the way a user would, so Reveal fires.
await page.evaluate(() => document.querySelector(".treatment-atlas-tablist").scrollIntoView({ block: "center" }));
await page.waitForFunction(() => document.querySelector(".treatment-atlas-tablist").dataset.shown === "done", null, { timeout: 8000 }).catch(() => {});
await page.waitForTimeout(300);

const info = await page.evaluate(() => {
  const row = document.querySelector(".treatment-atlas-tablist");
  const cs = getComputedStyle(row);
  const r = row.getBoundingClientRect();
  return {
    scrollWidth: row.scrollWidth, clientWidth: row.clientWidth, scrollLeft: row.scrollLeft,
    overflowX: cs.overflowX, touchAction: cs.touchAction, transform: cs.transform,
    rect: { top: r.top, left: r.left, width: r.width, height: r.height },
    hitAtCentre: (() => { const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return el ? el.className : null; })(),
  };
});
console.log("row", JSON.stringify(info));

const cdp = await ctx.newCDPSession(page);
const y = info.rect.top + info.rect.height / 2;
async function swipe(x0, x1) {
  const steps = 12;
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: x0, y }] });
  for (let i = 1; i <= steps; i++) {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x0 + ((x1 - x0) * i) / steps, y }] });
    await page.waitForTimeout(16);
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await page.waitForTimeout(900);
}
const before = await page.evaluate(() => document.querySelector(".treatment-atlas-tablist").scrollLeft);
await swipe(330, 90);
const swiped = await page.evaluate(() => document.querySelector(".treatment-atlas-tablist").scrollLeft);
// Headless Chromium does not fling after a scripted touchEnd, so it can
// stop between cards. Snapping is checked separately: a scroll that ends
// between cards must settle on the next card's start.
await page.evaluate(async (left) => {
  const row = document.querySelector(".treatment-atlas-tablist");
  row.scrollTo({ left, behavior: "instant" });
  await new Promise((r) => setTimeout(r, 800));
}, swiped);
const after = await page.evaluate(() => {
  const row = document.querySelector(".treatment-atlas-tablist");
  const cards = [...row.querySelectorAll(".treatment-atlas-card")];
  const pad = parseFloat(getComputedStyle(row).scrollPaddingLeft) || 0;
  const rl = row.getBoundingClientRect().left + pad;
  const snapped = cards.findIndex((c) => Math.abs(c.getBoundingClientRect().left - rl) < 2);
  return { scrollLeft: row.scrollLeft, snapped, windowScrollX: window.scrollX };
});
console.log("swipe: scrollLeft", before, "->", swiped, "| settles at", after.scrollLeft, "snapped card index", after.snapped, "winX", after.windowScrollX);
await page.screenshot({ path: `${OUT}/after-swipe.png` });

// Tap still selects a card. Checked on a fresh page: after a scripted
// swipe that stops between cards, headless Chromium keeps the scroll
// gesture open and swallows the next tap (touchstart/touchend arrive,
// no click), which a real device does not do.
const tapPage = await ctx.newPage();
await tapPage.goto(BASE + "/", { waitUntil: "networkidle" });
await tapPage.waitForFunction(() => document.querySelector("[data-page-loader]")?.dataset.state === "hidden", null, { timeout: 20000 }).catch(() => {});
await tapPage.evaluate(() => document.querySelector(".treatment-atlas-tablist").scrollIntoView({ block: "center" }));
await tapPage.waitForFunction(() => document.querySelector(".treatment-atlas-tablist").dataset.shown === "done", null, { timeout: 8000 }).catch(() => {});
await tapPage.evaluate(async () => {
  document.querySelector(".treatment-atlas-tablist").scrollTo({ left: 312, behavior: "instant" });
  await new Promise((r) => setTimeout(r, 500));
});
const tapTarget = await tapPage.evaluate(() => {
  const row = document.querySelector(".treatment-atlas-tablist");
  const rr = row.getBoundingClientRect();
  const card = [...row.querySelectorAll("[role=tab]")].find((c) => {
    const b = c.getBoundingClientRect();
    return b.left >= rr.left && b.right <= rr.right && c.getAttribute("aria-selected") !== "true";
  });
  if (!card) return null;
  const b = card.getBoundingClientRect();
  return { id: card.id, x: b.left + b.width / 2, y: b.top + b.height / 2 };
});
let tapOk = false;
if (tapTarget) {
  await tapPage.touchscreen.tap(tapTarget.x, tapTarget.y);
  await tapPage.waitForTimeout(500);
  tapOk = await tapPage.evaluate((id) => document.getElementById(id)?.getAttribute("aria-selected") === "true", tapTarget.id);
}
console.log("tap selects card:", tapOk, tapTarget?.id);

await browser.close();
const ok = swiped > before + 50 && after.snapped > 0 && after.windowScrollX === 0 && tapOk;
console.log(ok ? "PASS" : "FAIL");
process.exit(ok ? 0 : 1);
