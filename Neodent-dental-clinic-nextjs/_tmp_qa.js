const { chromium } = require("playwright");
const { spawn } = require("child_process");
const fs = require("fs");
const http = require("http");

const PORT = 3123;
const BASE = `http://localhost:${PORT}`;
const OUT = "_tmp_shots";
const WIDTHS = [320, 360, 390, 768, 1024, 1280, 1536];

function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      http
        .get(url, (res) => {
          res.resume();
          resolve();
        })
        .on("error", () => {
          if (Date.now() - start > timeoutMs) reject(new Error("server timeout"));
          else setTimeout(tick, 500);
        });
    };
    tick();
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    shell: true,
    stdio: "ignore",
  });

  const results = [];
  try {
    await waitForServer(BASE);
    const browser = await chromium.launch();

    for (const width of WIDTHS) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        deviceScaleFactor: 1,
      });
      await page.goto(BASE, { waitUntil: "networkidle" });

      // Scroll section into view and let lazy images load.
      await page.evaluate(() => {
        const el = document.getElementById("expertise");
        if (el) el.scrollIntoView({ block: "start" });
      });
      await page.waitForTimeout(900);

      // Document-level horizontal overflow check.
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          scrollW: doc.scrollWidth,
          clientW: doc.clientWidth,
          overflow: doc.scrollWidth - doc.clientWidth,
        };
      });

      // Section presence + key elements.
      const probe = await page.evaluate(() => {
        const s = document.getElementById("expertise");
        if (!s) return { found: false };
        const tabs = s.querySelectorAll('[role="tab"]').length;
        const panel = s.querySelector('#atlas-panel') ? true : false;
        const cta = s.querySelector(".treatment-atlas-cta") ? true : false;
        const title = s.querySelector("#treatment-atlas-title")?.textContent?.trim();
        const rect = s.getBoundingClientRect();
        // Section-level horizontal overflow of the card row.
        const row = s.querySelector(".treatment-atlas-tablist");
        const rowOverflow = row ? row.scrollWidth - row.clientWidth : null;
        return { found: true, tabs, panel, cta, title, sectionWidth: Math.round(rect.width), rowScrollable: rowOverflow };
      });

      const el = await page.$("#expertise");
      const file = `${OUT}/expertise-${width}.png`;
      if (el) await el.screenshot({ path: file });

      results.push({ width, overflow, probe });
      await page.close();
    }

    await browser.close();
  } finally {
    server.kill("SIGTERM");
    // give it a moment
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(JSON.stringify(results, null, 2));
})().catch((e) => {
  console.error("ERROR", e);
  process.exit(1);
});
