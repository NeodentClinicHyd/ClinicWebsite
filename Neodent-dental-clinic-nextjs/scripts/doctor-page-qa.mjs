/**
 * QA harness for the doctor profile page (/doctors/dr-miftah-ur-rahman).
 *
 *   node scripts/doctor-page-qa.mjs
 *       builds nothing — spawns `next start -p 3311` (run `npm run build`
 *       first) and runs every check below.
 *   DOCTOR_QA_NO_SERVER=1 node scripts/doctor-page-qa.mjs
 *       reuse a server you started yourself on port 3311.
 *   DOCTOR_QA_URL=http://localhost:3000/doctors/dr-miftah-ur-rahman node ...
 *       run against any other server (e.g. `next dev`) instead.
 *   DOCTOR_QA_SHOTS=0  skip the per-section screenshots.
 *
 * Per viewport (1440×900 … 375×812):
 *   - no horizontal page overflow, no content escaping the viewport
 *   - mobile: no image taller than 65% of the viewport
 *   - no <video> element and no MP4 request before interaction
 *   - every film poster loads; every image in <main> has alt text
 *   - section headings clear the fixed header when scrolled to
 *   - nothing is left invisible once the page has been scrolled
 *   - cumulative layout shift < 0.05
 * Interaction (1440 + 390): teaching + In Practice film cards open the
 * right MP4 and return focus; Specialisation films, evidence viewer and
 * treatment dossier dialog open/close; publication URLs unchanged;
 * PubMed logo local + loaded.
 * Reduced motion (390): no running animations, nothing hidden.
 * Section screenshots → qa-shots/miftah/<viewport>/<nn>-<section>.jpg
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 3311;
const URL = process.env.DOCTOR_QA_URL ?? `http://localhost:${PORT}/doctors/dr-miftah-ur-rahman`;
const ORIGIN = new globalThis.URL(URL).origin;
const SHOTS = process.env.DOCTOR_QA_SHOTS !== "0";
/* DOCTOR_QA_TAG namespaces a run's captures, e.g. qa-shots/miftah-r2/. */
const SHOT_DIR = path.join(
  root,
  "qa-shots",
  process.env.DOCTOR_QA_TAG ? `miftah-${process.env.DOCTOR_QA_TAG}` : "miftah",
);

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1024", width: 1024, height: 768 },
  { name: "768", width: 768, height: 1024 },
  { name: "430", width: 430, height: 932 },
  { name: "390", width: 390, height: 844 },
  { name: "375", width: 375, height: 812 },
];
const INTERACTION_VPS = new Set(["1440", "390"]);

const ACADEMIC = 'section[aria-labelledby="miftah-academic-title"]';
const EXPECTED_PUBS = [
  "https://pubmed.ncbi.nlm.nih.gov/41798508/",
  "https://pubmed.ncbi.nlm.nih.gov/42662028/",
  "https://pubmed.ncbi.nlm.nih.gov/39346305/",
];
const TEACHING_FILMS = [
  "dr-md-miftah-ur-rahman-root-canal-treatment-explainer.mp4",
  "dr-md-miftah-ur-rahman-root-canal-treatment.mp4",
];
const PRACTICE_FILMS = [
  "dr-miftah-explains-dmls-crowns-masticatory-efficiency.mp4",
  "dr-miftah-neodent-crown-cementation-procedure.mp4",
  "dr-miftah-neodent-dental-treatment-procedure.mp4",
];

/* ---- server ------------------------------------------------------- */
let server;
if (!process.env.DOCTOR_QA_NO_SERVER && !process.env.DOCTOR_QA_URL) {
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

/* ---- reporting ---------------------------------------------------- */
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
};

/* ---- page helpers ------------------------------------------------- */
const INIT = () => {
  // Pre-accept cookies so the banner never covers captures.
  localStorage.setItem(
    "neodent-cookie-consent-v1",
    JSON.stringify({ necessary: true, media: false, timestamp: new Date().toISOString(), version: "1" }),
  );
  window.__cls = 0;
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
  }).observe({ type: "layout-shift", buffered: true });
};

async function scrollThrough(p) {
  await p.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await p.waitForTimeout(1400);
}

async function openPage(browser, vp, opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: opts.reducedMotion ?? "no-preference",
    hasTouch: vp.width < 768,
  });
  await ctx.addInitScript(INIT);
  const p = await ctx.newPage();
  const requests = [];
  p.on("request", (r) => requests.push(r.url()));
  await p.goto(URL, { waitUntil: "networkidle" });
  return { ctx, p, requests };
}

/* Visible, non-decorative content in <main> whose effective opacity is
   still ~0 (i.e. a reveal that never fired). */
const HIDDEN_PROBE = () => {
  const out = [];
  const sel = "main h1, main h2, main h3, main p, main img, main a, main button, main li, main figcaption";
  for (const el of document.querySelectorAll(sel)) {
    if (el.closest("[aria-hidden='true'], [hidden], [role='dialog']")) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    let o = 1;
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      o *= parseFloat(getComputedStyle(n).opacity);
    }
    if (o < 0.5) out.push(`${el.tagName.toLowerCase()}:${(el.textContent || el.getAttribute("alt") || "").trim().slice(0, 40)}`);
  }
  return out;
};

async function viewportChecks(browser, vp) {
  const { ctx, p, requests } = await openPage(browser, vp);
  const tag = `[${vp.name}]`;
  const mobile = vp.width <= 430;

  const videosBefore = await p.locator("main video").count();
  await scrollThrough(p);

  const overflow = await p.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  check(`${tag} no horizontal page overflow`, overflow <= 0, `delta ${overflow}px`);

  const escaping = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    for (const el of document.querySelectorAll(
      "main img, main h1, main h2, main h3, main p, main a, main button, main li, main dd, main dt, main address, main blockquote, main figcaption",
    )) {
      if (el.closest("[aria-hidden='true'], [hidden], [role='dialog']")) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (r.left < -1 || r.right > vw + 1) {
        out.push(`${el.tagName.toLowerCase()}(${Math.round(r.left)}→${Math.round(r.right)}):${(el.textContent || el.getAttribute("alt") || "").trim().slice(0, 30)}`);
      }
    }
    return out;
  });
  check(`${tag} no content escapes the viewport`, escaping.length === 0, escaping.slice(0, 6).join(" | "));

  if (mobile) {
    const tall = await p.evaluate(() => {
      const vh = window.innerHeight;
      return [...document.querySelectorAll("main img")]
        .filter((i) => !i.closest("[aria-hidden='true'], [hidden], [role='dialog']"))
        .map((i) => ({ h: Math.round(i.getBoundingClientRect().height), alt: i.alt.slice(0, 50) }))
        .filter((x) => x.h > vh * 0.65)
        .map((x) => `${x.h}px ${x.alt}`);
    });
    check(`${tag} no image taller than 65% of viewport`, tall.length === 0, tall.join(" | "));
  }

  check(`${tag} no <video> in DOM before interaction`, videosBefore === 0, `${videosBefore} found`);
  const mp4s = requests.filter((u) => /\.mp4(\?|$)/i.test(u));
  check(`${tag} no MP4 requested on load + scroll`, mp4s.length === 0, mp4s.map((u) => u.split("/").pop()).join(", "));

  const posters = await p.evaluate(() =>
    [...document.querySelectorAll("[data-film-card] img")].map((i) => ({
      ok: i.complete && i.naturalWidth > 0,
      alt: i.alt,
    })),
  );
  check(
    `${tag} all 5 film posters loaded`,
    posters.length === 5 && posters.every((x) => x.ok && x.alt),
    `${posters.filter((x) => x.ok).length}/${posters.length}`,
  );

  const noAlt = await p.evaluate(() =>
    [...document.querySelectorAll("main img")].filter((i) => !i.alt.trim()).map((i) => i.src.split("/").pop()),
  );
  check(`${tag} every image has alt text`, noAlt.length === 0, noAlt.join(", "));

  const hidden = await p.evaluate(HIDDEN_PROBE);
  check(`${tag} no content left hidden after scroll`, hidden.length === 0, hidden.slice(0, 6).join(" | "));

  const covered = await p.evaluate(async () => {
    const out = [];
    for (const h of document.querySelectorAll("main section h2")) {
      h.scrollIntoView({ block: "start", behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
      const r = h.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + Math.min(20, r.width / 2), r.top + 4);
      if (!hit || !h.contains(hit)) out.push(h.textContent.trim().slice(0, 30));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    return out;
  });
  check(`${tag} fixed header never covers section headings`, covered.length === 0, covered.join(" | "));

  const cls = await p.evaluate(() => window.__cls);
  check(`${tag} cumulative layout shift < 0.05`, cls < 0.05, cls.toFixed(4));

  if (vp.name === "1440") {
    const pubs = await p.$$eval(`${ACADEMIC} ol a`, (as) =>
      as.map((a) => ({ href: a.href, target: a.target, text: a.textContent })),
    );
    check("publication URLs unchanged", JSON.stringify(pubs.map((x) => x.href)) === JSON.stringify(EXPECTED_PUBS));
    check(
      "publication links open in new tab + announce it",
      pubs.length === 3 && pubs.every((x) => x.target === "_blank" && x.text.includes("opens PubMed in a new tab")),
    );
  }
  const logo = await p.evaluate((sel) => {
    const imgs = document.querySelectorAll(`${sel} img[alt="PubMed"]`);
    const img = imgs[0];
    if (!img) return null;
    const r = img.getBoundingClientRect();
    return { count: imgs.length, src: img.currentSrc || img.src, w: Math.round(r.width), h: Math.round(r.height), loaded: img.complete && img.naturalWidth > 0 };
  }, ACADEMIC);
  check(
    `${tag} single PubMed logo, local + loaded`,
    !!logo && logo.count === 1 && logo.loaded && decodeURIComponent(logo.src).includes("pubmed-seeklogo.png") && logo.src.startsWith(ORIGIN),
    logo ? `${logo.w}x${logo.h}` : "missing",
  );

  if (INTERACTION_VPS.has(vp.name)) {
    try {
      await interactionChecks(p, tag);
    } catch (err) {
      check(`${tag} interaction checks completed`, false, err.message.split("\n")[0]);
      await p.keyboard.press("Escape").catch(() => {});
    }
  }

  await scopeGridChecks(p, tag, vp);
  await heroChecks(p, tag);

  if (SHOTS) {
    const dir = path.join(SHOT_DIR, vp.name);
    await mkdir(dir, { recursive: true });
    // Captures show the page itself, not the fixed chrome over it.
    await p.addStyleTag({
      content: ".nav, .mobile-bar, .floating-cta, nextjs-portal { visibility: hidden !important; }",
    });
    const sections = p.locator("main section[aria-labelledby^='miftah-']");
    const n = await sections.count();
    for (let i = 0; i < n; i++) {
      const s = sections.nth(i);
      const id = ((await s.getAttribute("aria-labelledby")) ?? `s${i}`).replace(/^miftah-|-title$/g, "");
      await s.scrollIntoViewIfNeeded();
      await p.waitForTimeout(250);
      await s.screenshot({ path: path.join(dir, `${String(i).padStart(2, "0")}-${id}.jpg`), type: "jpeg", quality: 62 });
    }
  }
  await ctx.close();
}

async function filmCardCheck(p, tag, selector, films, label) {
  for (let i = 0; i < films.length; i++) {
    const card = p.locator(`[${selector}="${i}"]`);
    await card.scrollIntoViewIfNeeded({ timeout: 5000 });
    await card.click({ timeout: 5000 });
    const dialog = p.locator('[role="dialog"]');
    await dialog.waitFor({ timeout: 5000 });
    const src = await dialog.locator("video").getAttribute("src");
    check(`${tag} ${label} card ${i + 1} opens ${films[i]}`, !!src && src.endsWith(films[i]), src ?? "no video");
    await p.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" });
    const refocused = await card.evaluate((el) => el === document.activeElement);
    check(`${tag} ${label} card ${i + 1} focus restored`, refocused);
  }
}

async function interactionChecks(p, tag) {
  await filmCardCheck(p, tag, "data-teaching-film", TEACHING_FILMS, "teaching");
  await filmCardCheck(p, tag, "data-practice-film", PRACTICE_FILMS, "in-practice");

  // Keyboard: visible focus + Enter opens.
  const card0 = p.locator('[data-practice-film="0"]');
  await card0.focus();
  const outline = await card0.evaluate((el) => {
    const cs = getComputedStyle(el);
    return el === document.activeElement && cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
  });
  // :focus-visible only applies to keyboard focus — tab into it.
  await p.keyboard.press("Shift+Tab");
  await p.keyboard.press("Tab");
  const kbOutline = await card0.evaluate((el) => {
    const cs = getComputedStyle(el);
    return el === document.activeElement && cs.outlineStyle !== "none";
  });
  check(`${tag} film card keyboard focus visible`, outline || kbOutline);
  await p.keyboard.press("Enter");
  await p.locator('[role="dialog"]').waitFor({ timeout: 5000 });
  check(`${tag} film card opens via Enter`, true);
  await p.keyboard.press("Escape");
  await p.locator('[role="dialog"]').waitFor({ state: "detached" });

  // Specialisation — RCT film buttons, evidence viewer, dossier dialog.
  const specFilms = p.locator("[data-film]");
  check(`${tag} specialisation film buttons present`, (await specFilms.count()) === 2);
  for (let i = 0; i < 2; i++) {
    await specFilms.nth(i).scrollIntoViewIfNeeded();
    await specFilms.nth(i).click({ timeout: 5000 });
    const dialog = p.locator('[role="dialog"]');
    await dialog.waitFor();
    const src = await dialog.locator("video").getAttribute("src");
    check(`${tag} specialisation film ${i + 1} opens ${TEACHING_FILMS[i]}`, !!src && src.endsWith(TEACHING_FILMS[i]));
    await p.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" });
  }

  const cell = p.locator("[data-evidence-open]:not([data-film])").first();
  await cell.scrollIntoViewIfNeeded();
  await cell.click({ timeout: 5000 });
  const viewer = p.locator('[role="dialog"]');
  await viewer.waitFor();
  check(`${tag} evidence viewer opens with an image`, (await viewer.locator("img").count()) > 0);
  await p.keyboard.press("Escape");
  await viewer.waitFor({ state: "detached" });

  const explore = p.locator("[data-explore-treatment]").first();
  await explore.scrollIntoViewIfNeeded();
  await explore.click({ timeout: 5000 });
  const dossier = p.locator('[role="dialog"]');
  await dossier.waitFor();
  check(`${tag} treatment dossier dialog opens`, await dossier.isVisible());
  await p.keyboard.press("Escape");
  await dossier.waitFor({ state: "detached" });
  check(`${tag} dossier focus restored`, await explore.evaluate((el) => el === document.activeElement));
}

/* ---- hero CTAs, anchors ------------------------------------------- */
async function heroChecks(p, tag) {
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await p.waitForTimeout(300);
  const hero = await p.evaluate(() => {
    const box = document.querySelector("[class*='heroActions']");
    const section = document.querySelector("section[aria-labelledby='miftah-hero-title']");
    const links = box ? [...box.querySelectorAll("a")] : [];
    const r = links.map((a) => a.getBoundingClientRect());
    return {
      labels: links.map((a) => a.textContent.replace(/\s+/g, " ").trim()),
      hrefs: links.map((a) => a.getAttribute("href")),
      heights: r.map((b) => Math.round(b.height)),
      tel: section ? section.querySelectorAll("a[href^='tel:']").length : -1,
      clipped: links.filter((a) => a.scrollWidth > a.clientWidth + 1).length,
      overflowRight: r.some((b) => b.right > document.documentElement.clientWidth + 1),
    };
  });
  check(
    `${tag} hero has exactly the two contextual CTAs`,
    hero.labels.length === 2 &&
      hero.labels[0].startsWith("View Clinical Specialties") &&
      hero.labels[1].startsWith("Read PubMed Articles") &&
      hero.hrefs.join() === "#clinical-focus,#publications",
    hero.labels.join(" | "),
  );
  check(`${tag} no tel: link inside the hero`, hero.tel === 0, `${hero.tel} found`);
  check(
    `${tag} hero CTAs equal height, ≥48px, not clipped`,
    hero.heights.length === 2 && hero.heights[0] === hero.heights[1] && hero.heights[0] >= 48 && hero.clipped === 0 && !hero.overflowRight,
    hero.heights.join("/"),
  );

  const targets = [
    { index: 0, sel: "#clinical-focus", head: "#clinical-focus h2", name: "Clinical Specialties" },
    { index: 1, sel: "#publications", head: "#publications h3", name: "PubMed Articles" },
  ];
  for (const t of targets) {
    await p.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await p.waitForTimeout(200);
    await p.locator("[class*='heroActions'] a").nth(t.index).click();
    await p.waitForTimeout(1600); // smooth-scroll settle
    const landed = await p.evaluate(({ sel, head }) => {
      const target = document.querySelector(sel);
      const h = document.querySelector(head);
      if (!target || !h) return { ok: false, why: "missing target" };
      const tr = target.getBoundingClientRect();
      const hr = h.getBoundingClientRect();
      const navH = document.querySelector(".nav")?.getBoundingClientRect().bottom ?? 0;
      const hit = document.elementFromPoint(hr.left + Math.min(16, hr.width / 2), hr.top + Math.min(6, hr.height / 2));
      return {
        ok: hr.top >= navH - 1 && hr.bottom <= window.innerHeight && h.contains(hit) && Math.abs(tr.top) < window.innerHeight,
        headTop: Math.round(hr.top),
        navBottom: Math.round(navH),
      };
    }, t);
    check(`${tag} "${t.name}" CTA lands on its section, heading clear of the nav`, landed.ok, JSON.stringify(landed));
  }
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
}

/* ---- Seven areas grid geometry ------------------------------------ */
async function scopeGridChecks(p, tag, vp) {
  await p.locator("#clinical-focus").scrollIntoViewIfNeeded();
  await p.waitForTimeout(900);
  const g = await p.evaluate(() => {
    const tiles = [...document.querySelectorAll("#clinical-focus a[href^='/treatments']")];
    const grid = tiles[0]?.parentElement;
    if (!grid) return null;
    const gr = grid.getBoundingClientRect();
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const rects = tiles.map((t) => t.getBoundingClientRect());
    const rows = new Set(rects.map((r) => Math.round(r.top))).size;
    // text/box collisions: no child box of a tile may intersect a sibling child box
    let overlaps = 0;
    let clipped = 0;
    for (const t of tiles) {
      const kids = [...t.children].map((c) => c.getBoundingClientRect()).filter((b) => b.height > 0);
      for (let i = 0; i < kids.length; i++)
        for (let j = i + 1; j < kids.length; j++) {
          const a = kids[i], b = kids[j];
          if (a.left < b.right - 0.5 && b.left < a.right - 0.5 && a.top < b.bottom - 0.5 && b.top < a.bottom - 0.5) overlaps++;
        }
      for (const c of t.querySelectorAll("span")) if (c.scrollWidth > c.clientWidth + 1 && getComputedStyle(c).display !== "inline") clipped++;
      const tr = t.getBoundingClientRect();
      for (const c of t.children) {
        const cr = c.getBoundingClientRect();
        if (cr.right > tr.right + 0.5 || cr.left < tr.left - 0.5) clipped++;
      }
    }
    const last = rects[6];
    const minTitle = Math.min(...tiles.map((t) => parseFloat(getComputedStyle(t.querySelector("[class*='scopeTitle']")).fontSize)));
    const minH = Math.min(...rects.map((r) => r.height));
    return {
      count: tiles.length,
      cols,
      rows,
      lastWidthRatio: last.width / gr.width,
      lastLeftOffset: last.left - gr.left,
      overlaps,
      clipped,
      minTitle,
      minH,
      rowHeightsEven: [0, 2, 4].every((i) => Math.abs(rects[i].height - rects[i + 1].height) < 1.5),
      filler: getComputedStyle(grid.lastElementChild).display,
    };
  });
  if (!g) return check(`${tag} scope grid found`, false);
  check(`${tag} all seven clinical areas present`, g.count === 7, String(g.count));
  if (vp.width <= 767) {
    check(`${tag} scope grid is exactly two columns, four rows`, g.cols === 2 && g.rows === 4, `${g.cols} cols, ${g.rows} rows`);
    check(
      `${tag} 7th card is half width, left-aligned`,
      Math.abs(g.lastWidthRatio - 0.5) < 0.03 && g.lastLeftOffset < 2,
      `ratio ${g.lastWidthRatio.toFixed(2)}, left ${g.lastLeftOffset.toFixed(1)}`,
    );
    check(`${tag} paired cards share a row height`, g.rowHeightsEven);
    check(`${tag} scope tiles: no overlap, nothing clipped`, g.overlaps === 0 && g.clipped === 0, `overlap ${g.overlaps}, clipped ${g.clipped}`);
    check(`${tag} scope titles ≥17px, tiles ≥44px tall`, g.minTitle >= 17 && g.minH >= 44, `title ${g.minTitle}px, min tile ${Math.round(g.minH)}px`);
    check(`${tag} decorative filler hidden on phones`, g.filler === "none");
  }
}

/* ---- navbar states (doctor page vs homepage / other pages) -------- */
async function navbarChecks(browser) {
  const states = async (page, sel = ".nav") => {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(500);
    const top = await page.evaluate((s) => {
      const n = document.querySelector(s);
      return { solid: n.classList.contains("scrolled"), bg: getComputedStyle(n).backgroundColor };
    }, sel);
    await page.evaluate(() => window.scrollTo({ top: 220, behavior: "instant" }));
    await page.waitForTimeout(700);
    const down = await page.evaluate((s) => {
      const n = document.querySelector(s);
      return { solid: n.classList.contains("scrolled"), bg: getComputedStyle(n).backgroundColor };
    }, sel);
    return { top, down };
  };
  const transparent = (bg) => bg === "rgba(0, 0, 0, 0)" || bg === "transparent";

  for (const vp of [
    { name: "1440", width: 1440, height: 900 },
    { name: "390", width: 390, height: 844 },
  ]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    await ctx.addInitScript(INIT);
    const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: "networkidle" });
    const s = await states(p);
    check(
      `[nav ${vp.name}] doctor page: transparent at top, solid after scroll`,
      !s.top.solid && transparent(s.top.bg) && s.down.solid && !transparent(s.down.bg),
      `top ${s.top.bg} → ${s.down.bg}`,
    );
    await p.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await p.waitForTimeout(500);
    const topColors = await p.evaluate(() => ({
      nav: getComputedStyle(document.querySelector(".nav")).color,
    }));
    const lum = (c) => {
      const m = c.match(/[\d.]+/g).map(Number);
      return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
    };
    check(`[nav ${vp.name}] nav text is light over the dark hero`, lum(topColors.nav) > 0.8, topColors.nav);
    if (vp.width <= 900) {
      await p.locator(".menu-toggle").click();
      await p.waitForTimeout(600);
      const menu = await p.evaluate(() => ({
        solid: document.querySelector(".nav").classList.contains("scrolled"),
        open: document.querySelector(".mobile-menu")?.classList.contains("open"),
        panelH: Math.round(document.querySelector(".mobile-menu")?.getBoundingClientRect().height ?? 0),
        panelBg: getComputedStyle(document.querySelector(".mobile-menu")).backgroundColor,
        toggleAria: document.querySelector(".menu-toggle")?.getAttribute("aria-expanded"),
      }));
      check(
        `[nav ${vp.name}] menu open at top: bar stays transparent, cream panel below (homepage behaviour)`,
        !menu.solid && menu.open && menu.panelH > 100 && menu.toggleAria === "true",
        JSON.stringify(menu),
      );
      if (SHOTS) {
        await mkdir(path.join(SHOT_DIR, "nav"), { recursive: true });
        await p.screenshot({ path: path.join(SHOT_DIR, "nav", `doctor-${vp.name}-menu-open-top.jpg`), type: "jpeg", quality: 70 });
      }
      await p.locator(".menu-toggle").click();
    }
    if (SHOTS) {
      await mkdir(path.join(SHOT_DIR, "nav"), { recursive: true });
      await p.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await p.waitForTimeout(500);
      await p.screenshot({ path: path.join(SHOT_DIR, "nav", `doctor-${vp.name}-top.jpg`), type: "jpeg", quality: 70 });
      await p.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
      await p.waitForTimeout(700);
      await p.screenshot({ path: path.join(SHOT_DIR, "nav", `doctor-${vp.name}-scrolled.jpg`), type: "jpeg", quality: 70 });
    }

    // Controls — unchanged behaviour elsewhere.
    const home = await ctx.newPage();
    await home.goto(ORIGIN + "/", { waitUntil: "networkidle" });
    const h = await states(home);
    check(
      `[nav ${vp.name}] homepage unchanged: transparent at top, solid after scroll`,
      !h.top.solid && transparent(h.top.bg) && h.down.solid,
      `top ${h.top.bg} → ${h.down.bg}`,
    );
    if (SHOTS) {
      await home.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await home.waitForTimeout(500);
      await home.screenshot({ path: path.join(SHOT_DIR, "nav", `home-${vp.name}-top.jpg`), type: "jpeg", quality: 70 });
    }
    const about = await ctx.newPage();
    await about.goto(ORIGIN + "/about", { waitUntil: "networkidle" });
    const a = await states(about);
    check(`[nav ${vp.name}] other internal page (/about) unchanged: solid from the top`, a.top.solid && !transparent(a.top.bg), a.top.bg);
    await ctx.close();
  }
}

async function reducedMotionCheck(browser) {
  const vp = VIEWPORTS.find((v) => v.name === "390");
  const { ctx, p } = await openPage(browser, vp, { reducedMotion: "reduce" });
  await scrollThrough(p);
  const running = await p.evaluate(
    () => document.getAnimations().filter((a) => a.playState === "running").length,
  );
  check("[reduced-motion] no running animations", running === 0, `${running} running`);
  const hidden = await p.evaluate(HIDDEN_PROBE);
  check("[reduced-motion] all content visible", hidden.length === 0, hidden.slice(0, 6).join(" | "));
  await ctx.close();
}

/* ---- run ---------------------------------------------------------- */
const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    try {
      await viewportChecks(browser, vp);
    } catch (err) {
      check(`[${vp.name}] run completed`, false, err.message.split("\n")[0]);
    }
  }
  await reducedMotionCheck(browser);
  await navbarChecks(browser);
} finally {
  await browser.close();
  if (server) server.kill();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) {
  console.log("Failed:\n  " + failed.map((f) => f.name).join("\n  "));
  process.exitCode = 1;
}
