// QA: "Before you go" banner with Dr. Siraj's portrait.
// Usage: node scripts/lead-capture-qa.mjs   (QA_BASE overrides URL)
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.QA_BASE ?? "http://localhost:3000";
const OUT = "qa-shots/lead-capture";
mkdirSync(OUT, { recursive: true });
const fails = [];
const check = (ok, label) => { console.log(`${ok ? "PASS" : "FAIL"}  ${label}`); if (!ok) fails.push(label); };

const browser = await chromium.launch();
for (const [w, h] of [[1280, 800], [768, 1024], [390, 844], [360, 640]]) {
  const mobile = w < 768;
  const page = await browser.newPage({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile });
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForFunction(() => document.querySelector("[data-page-loader]")?.dataset.state === "hidden", null, { timeout: 20000 }).catch(() => {});
  try { await page.getByRole("button", { name: /reject non-essential/i }).first().click({ timeout: 3000 }); } catch {}
  await page.evaluate(() => sessionStorage.clear());
  await page.evaluate(() => window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * 0.75));
  await page.waitForSelector(".lead-panel", { timeout: 5000 });
  await page.waitForFunction(() => { const i = document.querySelector(".lead-portrait-image"); return i && i.complete && i.naturalWidth > 0; }, null, { timeout: 15000 });
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => {
    const panel = document.querySelector(".lead-panel").getBoundingClientRect();
    const media = document.querySelector(".lead-portrait-media").getBoundingClientRect();
    const img = document.querySelector(".lead-portrait-image");
    const body = document.querySelector(".lead-body");
    return {
      panel: { l: panel.left, r: panel.right, t: panel.top, b: panel.bottom, w: panel.width, h: panel.height },
      media: { t: media.top, w: media.width, h: media.height },
      alt: img.alt,
      text: document.querySelector(".lead-sub").textContent.replace(/\s+/g, " ").trim(),
      title: document.querySelector("#lead-capture-title").textContent,
      bodyOverflowX: body.scrollWidth - body.clientWidth,
      vw: innerWidth, vh: innerHeight,
    };
  });
  check(m.panel.l >= 0 && m.panel.r <= m.vw + 0.5 && m.bodyOverflowX <= 0, `${w}px: panel inside viewport, no sideways overflow`);
  check(m.media.w > 40 && m.media.h > 40 && m.alt.includes("Siraj"), `${w}px: portrait shown (${Math.round(m.media.w)}x${Math.round(m.media.h)}) alt="${m.alt}"`);
  check(m.title === "Let's make it easy to visit." && m.text === "Call the clinic, or find your way to Humayun Nagar — whichever feels right.", `${w}px: copy unchanged`);
  if (w <= 560) {
    check(m.panel.h <= m.vh * 0.85 + 1, `${w}px: sheet within 85% of screen height (${Math.round(m.panel.h)} / ${m.vh})`);
    check(m.media.t < m.panel.t, `${w}px: portrait rises above the sheet edge`);
  }
  await page.screenshot({ path: `${OUT}/lead-${w}.png` });

  // Keyboard: Close and Call reachable by Tab.
  const reached = new Set();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    reached.add(await page.evaluate(() => {
      const a = document.activeElement;
      if (!a?.closest(".lead-panel")) return "outside";
      return a.matches(".lead-close") ? "close" : a.matches(".button-primary") ? "call" : a.matches(".lead-directions") ? "directions" : "other";
    }));
  }
  check(reached.has("close") && reached.has("call") && reached.has("directions"), `${w}px: keyboard reaches close, call, directions`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  check(!(await page.$(".lead-panel")), `${w}px: Escape closes`);
  await page.close();
}
await browser.close();
console.log(fails.length ? `\n${fails.length} FAILED` : "\nALL PASS");
process.exit(fails.length ? 1 : 0);
