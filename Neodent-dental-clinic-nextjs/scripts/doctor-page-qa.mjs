/**
 * QA capture for the doctor profile page.
 *
 * If a server is already listening on the QA port (start it yourself
 * with `npx next start -p 3311`), set DOCTOR_QA_NO_SERVER=1 and this
 * script will only run the capture. Takes full-page screenshots at
 * desktop and mobile widths into qa-shots/ and prints basic
 * a11y-relevant counts from the live DOM. Mirrors exp-intro-qa.mjs.
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 3311;
const URL = `http://localhost:${PORT}/doctors/dr-miftah-ur-rahman`;
const SHOT_DIR = path.join(root, "qa-shots");

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
      if (String(d).match(/Ready|started|Local/i)) {
        clearTimeout(timer);
        cleanup();
        resolve();
      }
    };
    const cleanup = () => {
      server?.stdout?.off("data", onData);
      server?.stderr?.off("data", onData);
    };
    server.stdout?.on("data", onData);
    server.stderr?.on("data", onData);
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({
  path: path.join(SHOT_DIR, "miftah-desktop-full.png"),
  fullPage: true,
});

const audit = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll("img")];
  return {
    h1: document.querySelectorAll("h1").length,
    h2: document.querySelectorAll("h2").length,
    imgsWithoutAlt: imgs.filter((i) => !i.alt).length,
    imgCount: imgs.length,
    missingAltSrcs: imgs.filter((i) => !i.alt).map((i) => i.getAttribute("src") ?? i.src),
    breadcrumb: document.querySelector('nav[aria-label="Breadcrumb"]')?.textContent ?? null,
  };
});
console.log("desktop audit:", JSON.stringify(audit, null, 2));

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(URL, { waitUntil: "networkidle" });
await mobile.waitForTimeout(1200);
await mobile.screenshot({
  path: path.join(SHOT_DIR, "miftah-mobile-full.png"),
  fullPage: true,
});

await browser.close();
if (server) server.kill();
console.log("done");

