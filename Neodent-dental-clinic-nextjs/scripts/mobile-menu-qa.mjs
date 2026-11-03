// QA: the mobile menu's "Talk to Neodent" button must sit inside the
// viewport. Usage: node scripts/mobile-menu-qa.mjs  (QA_BASE overrides URL)
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.QA_BASE ?? "http://localhost:3000";
const OUT = "qa-shots/mobile-menu";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const fails = [];
for (const width of [320, 360, 390, 430]) {
  const page = await browser.newPage({ viewport: { width, height: 800 }, isMobile: true, hasTouch: true });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  // The page loader (if present) must be gone before interacting.
  await page.waitForFunction(() => document.querySelector("[data-page-loader]")?.dataset.state === "hidden", null, { timeout: 15000 }).catch(() => {});
  const reject = page.getByRole("button", { name: /reject non-essential/i });
  try { await reject.first().click({ timeout: 3000 }); } catch {}
  await page.click("[data-testid=button-mobile-menu]");
  await page.waitForTimeout(500);
  const m = await page.evaluate(() => {
    const btn = document.querySelector("#mobile-navigation .button");
    const menu = document.querySelector("#mobile-navigation");
    const b = btn.getBoundingClientRect();
    const n = menu.getBoundingClientRect();
    return {
      vw: window.innerWidth,
      left: b.left, right: b.right, width: b.width,
      menuLeft: n.left, menuRight: n.right,
      docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  const leftGap = m.left - m.menuLeft;
  const rightGap = m.menuRight - m.right;
  const ok = m.right <= m.vw && m.left >= 0 && Math.abs(leftGap - rightGap) <= 1 && m.docOverflow <= 0;
  console.log(`${width}px  btn ${m.left.toFixed(1)}â€“${m.right.toFixed(1)} (w ${m.width.toFixed(1)})  gaps L${leftGap.toFixed(1)} R${rightGap.toFixed(1)}  docOverflow ${m.docOverflow}  ${ok ? "PASS" : "FAIL"}`);
  if (!ok) fails.push(width);
  await page.screenshot({ path: `${OUT}/menu-${width}.png` });
  await page.close();
}
await browser.close();
if (fails.length) {
  console.log("FAIL at", fails.join(", "));
  process.exit(1);
}
console.log("ALL PASS");
