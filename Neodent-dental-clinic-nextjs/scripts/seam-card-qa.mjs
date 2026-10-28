// TEMPORARY QA harness for SeamCard. Usage: node scripts/seam-card-qa.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.QA_BASE ?? "http://localhost:3000";
const OUT = "qa-shots/seam-card";
mkdirSync(OUT, { recursive: true });
const SEL = "[aria-label='Neodent brand statement'], [aria-label='Clinical philosophy']";

const VIEWPORTS = [
  [1366, 620], [1280, 600], [1440, 720], [1536, 730], [1920, 950],
  [1024, 700], [768, 1024], [390, 800], [360, 740],
];
const PAGES = [
  { name: "home", path: "/", above: ".exp-intro", below: ".archive", portrait: true,
    keepClear: [".exp-intro-cta", ".exp-intro-qualities", ".archive-route", ".archive-year", ".archive-title", ".archive-eyebrow"] },
  { name: "miftah", path: "/doctors/dr-miftah-ur-rahman", portrait: false,
    above: "section[aria-labelledby='miftah-index-title']", below: "section[aria-labelledby='miftah-bio-title']",
    keepClear: ["section[aria-labelledby='miftah-index-title'] dl", "section[aria-labelledby='miftah-bio-title'] [class*='chapter']", "#miftah-bio-title"] },
];

const fails = [], rows = [], notes = [];
const fail = (c, m) => fails.push(`${c} :: ${m}`);
const hit = (a, b) => a && b && b.w > 0 && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
const gapBetween = (a, b) => Math.max(b.top - a.bottom, a.top - b.bottom, b.left - a.right, a.left - b.right);

async function dismissCookies(page) {
  const reject = page.getByRole("button", { name: /reject non-essential/i });
  try { await reject.first().waitFor({ state: "visible", timeout: 4000 }); await reject.first().click(); } catch {}
  await page.waitForTimeout(400);
}
// Centre the card in the area below the fixed navbar (and above the phone call bar).
async function centreCard(page) {
  await page.evaluate((sel) => {   // walk through the upper section first so its own scroll-reveal fires
    const seam = document.querySelector(sel).parentElement.parentElement;
    window.scrollTo({ top: window.scrollY + seam.previousElementSibling.getBoundingClientRect().top, behavior: "instant" });
  }, SEL);
  await page.waitForTimeout(1400);
  await page.evaluate((sel) => {
    const card = document.querySelector(sel);
    const nav = document.querySelector(".nav").getBoundingClientRect().bottom;
    const bar = document.querySelector(".mobile-bar"); const barH = bar && getComputedStyle(bar).display !== "none" ? bar.getBoundingClientRect().height : 0;
    const b = card.getBoundingClientRect();
    const target = (nav + (window.innerHeight - barH)) / 2;
    window.scrollTo({ top: window.scrollY + b.top + b.height / 2 - target, behavior: "instant" });
  }, SEL);
  await page.waitForTimeout(2000);
  await page.evaluate(() => document.fonts.ready);
}

const measure = (page, pg) => page.evaluate(({ SEL, above, below, keepClear }) => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { left: b.left, right: b.right, top: b.top, bottom: b.bottom, w: b.width, h: b.height }; };
  const q = (s) => document.querySelector(s);
  const card = q(SEL); const stage = card.parentElement; const seam = stage.parentElement;
  const frame = card.children[0], surface = card.children[1];
  const img = card.querySelector("img"); const portrait = img?.parentElement;
  const copy = [...card.querySelectorAll("div")].find((d) => /copy/.test(d.className));
  const foot = [...card.querySelectorAll("div")].find((d) => /foot/.test(d.className)) ?? null;
  const emph = [...card.querySelectorAll("span")].find((s) => getComputedStyle(s).fontStyle === "italic");
  const nav = q(".nav"), cta = q(".floating-cta"), bar = q(".mobile-bar");
  const covers = (el) => { if (!el) return false; const b = el.getBoundingClientRect(); if (!b.width || getComputedStyle(el).display === "none") return false;
    const t = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return !!t && !el.contains(t) && card.contains(t); };
  const sb = getComputedStyle(surface), fb = getComputedStyle(frame.querySelector("rect")), hb = getComputedStyle(seam, "::before");
  const copyRect = copy.getBoundingClientRect();
  const kids = [...copy.children, ...(foot ? [...foot.children] : [])].map(r);
  let hands = null, face = null, opaque = null;
  if (img) { const ib = img.getBoundingClientRect(); const sx = ib.width / 714, sy = ib.height / 623;
    face = { left: ib.left + 298 * sx, right: ib.left + 484 * sx, top: ib.top + 13 * sy, bottom: ib.top + 315 * sy };
    hands = { left: ib.left + 205 * sx, right: ib.left + 545 * sx, top: ib.top + 465 * sy, bottom: ib.top + 571 * sy };
    opaque = { left: ib.left + 21 * sx, right: ib.left + 696 * sx, top: ib.top + 13 * sy, bottom: ib.top + 571 * sy }; }
  const lh = emph ? parseFloat(getComputedStyle(emph).lineHeight) : 0;
  const navB = nav.getBoundingClientRect().bottom;
  const barEl = bar && getComputedStyle(bar).display !== "none" ? bar.getBoundingClientRect() : null;
  return {
    docScrollW: document.documentElement.scrollWidth, vw: window.innerWidth, vh: window.innerHeight,
    card: r(card), frame: r(frame), stage: r(stage), seamTop: seam.getBoundingClientRect().top,
    aboveBox: r(q(above)), belowBox: r(q(below)), navB, barTop: barEl ? barEl.top : window.innerHeight,
    clear: keepClear.map((s) => ({ s, box: r(q(s)) })), nav: r(nav),
    img: r(img), pbox: r(portrait), face, hands, opaque, nat: img ? [img.naturalWidth, img.complete, img.naturalWidth / img.naturalHeight] : null,
    copyRect: r(copy), kids: kids.map((b) => [Math.round(b.top), Math.round(b.bottom)]),
    copyFits: kids.every((b) => b.top >= copyRect.top - 0.5 && b.bottom <= copyRect.bottom + 0.5 && b.right <= copyRect.right + 0.5),
    emphLines: emph ? Math.round(emph.getBoundingClientRect().height / lh) : null, emphFont: emph ? getComputedStyle(emph).fontSize : null,
    radius: sb.borderTopLeftRadius,
    frameStyle: `dotted ${fb.strokeWidth} dash=${fb.strokeDasharray} cap=${fb.strokeLinecap} rx=${fb.rx}`,
    hair: `${hb.height} ${hb.backgroundColor} w=${hb.width}`,
    cardTransform: getComputedStyle(card).transform,
    layerTransforms: [frame, portrait, card.lastElementChild].filter(Boolean).map((e) => getComputedStyle(e).transform),
    covered: { navbar: covers(nav), cta: covers(cta), bar: covers(bar) },
    cls: window.__cls,
  };
}, { SEL, above: pg.above, below: pg.below, keepClear: pg.keepClear });

const IDENT2 = /^matrix\(1, 0, 0, 1, 0, 0\)$/, IDENT3 = /^matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1\)$/;
const isIdent = (s) => s === "none" || IDENT2.test(s) || IDENT3.test(s);
const angles = (s) => { const m = s.match(/matrix3d\((.*)\)/); if (!m) return { rx: 0, ry: 0 }; const v = m[1].split(",").map(Number);
  return { ry: (Math.asin(Math.max(-1, Math.min(1, v[8]))) * 180) / Math.PI, rx: (-Math.asin(Math.max(-1, Math.min(1, v[9]))) * 180) / Math.PI }; };

const browser = await chromium.launch();
for (const pg of PAGES) {
  for (const [w, h] of VIEWPORTS) {
    const ctx = `${pg.name}@${w}x${h}`;
    const context = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__cls = [];
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput)
        window.__cls.push({ v: e.value, nodes: (e.sources || []).map((s) => (s.node && s.node.nodeType === 1 ? `${s.node.tagName}.${String(s.node.className).slice(0, 60)}` : "?")) }); }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(BASE + pg.path, { waitUntil: "load" });
    await page.waitForSelector(SEL);
    await dismissCookies(page);
    await centreCard(page);
    const m = await measure(page, pg);
    const mobile = w <= 767, desk = w >= 861;
    const pct = (m.card.h / m.vh) * 100;
    const visAbove = m.card.top - m.navB, visBelow = m.barTop - m.card.bottom;

    // --- the hard rule ---
    if (m.card.h > m.vh * 0.405) fail(ctx, `card ${m.card.h.toFixed(0)}px = ${pct.toFixed(1)}% of viewport (> ~40%)`);
    if (m.card.h > 340.5) fail(ctx, `card taller than 340px`);
    if (m.card.top < m.navB || m.card.bottom > m.barTop) fail(ctx, "card not fully visible");
    if (visAbove < 120 || visBelow < 120) fail(ctx, `visible room above/below ${visAbove.toFixed(0)}/${visBelow.toFixed(0)} < 120`);
    // --- layout ---
    if (m.docScrollW !== m.vw) fail(ctx, `scrollWidth ${m.docScrollW} != ${m.vw}`);
    if (Math.abs(m.belowBox.top - m.aboveBox.bottom) > 1) fail(ctx, "sections do not touch");
    const up = m.seamTop - m.card.top, down = m.card.bottom - m.seamTop;
    if (Math.abs(up - down) > 1.5) fail(ctx, `not centred on the seam: ${up.toFixed(1)} / ${down.toFixed(1)}`);
    if (m.card.left < 0 || m.frame.right > m.vw) fail(ctx, "card/frame outside viewport");
    const minGap = mobile ? 36 : 40;
    for (const { s, box } of m.clear) { if (!box) { fail(ctx, `missing ${s}`); continue; } if (box.w === 0) continue;
      const g = gapBetween(m.card, box); if (hit(m.card, box) || hit(m.frame, box) || g < minGap) fail(ctx, `${s}: gap ${g.toFixed(0)} < ${minGap} or intersects`); }
    if (hit(m.card, m.nav)) fail(ctx, "card intersects navbar");
    for (const [k, v] of Object.entries(m.covered)) if (v) fail(ctx, `card covers ${k}`);
    if (!m.copyFits) fail(ctx, `copy overflows its zone ${JSON.stringify(m.kids)}`);
    if (!/^(20|18|16)px/.test(m.radius)) fail(ctx, `radius ${m.radius}`);
    if (!/dotted 1\.5px/.test(m.frameStyle) || !/cap=round/.test(m.frameStyle) || !/dash=0(px)?, 6(px)?/.test(m.frameStyle)) fail(ctx, `frame ${m.frameStyle}`);
    if (!/^1px/.test(m.hair)) fail(ctx, `seam hairline ${m.hair}`);
    if (!isIdent(m.cardTransform)) fail(ctx, `card not at rest: ${m.cardTransform}`);
    for (const lt of m.layerTransforms) if (!isIdent(lt)) fail(ctx, `layer not identity at rest: ${lt}`);
    let faceW = "-", panel = "-";
    if (pg.portrait) {
      if (!m.img) fail(ctx, "portrait missing");
      else {
        if (m.img.w > 450.5) fail(ctx, `portrait ${m.img.w.toFixed(0)}px > 450`);
        if (!m.nat[1] || !m.nat[0]) fail(ctx, "portrait not loaded");
        if (Math.abs(m.img.w / m.img.h - m.nat[2]) > 0.01) fail(ctx, "portrait distorted");
        const p = m.pbox, ins = (b, pad = 0.5) => b.left >= p.left - pad && b.right <= p.right + pad && b.top >= p.top - pad && b.bottom <= p.bottom + pad;
        if (!ins(m.face)) fail(ctx, "face cropped");
        if (!ins(m.hands)) fail(ctx, `hands/mic cropped: ${JSON.stringify(m.hands)} vs ${JSON.stringify(p)}`);
        const fade = (m.hands.right - (p.left + p.w * (mobile ? 0.87 : 0.8))) / (p.w * (mobile ? 0.13 : 0.2));
        if (fade > 0.6) fail(ctx, `hands run deep into the edge fade (${(fade * 100).toFixed(0)}%)`);
        if (Math.abs(m.opaque.bottom - m.card.bottom) > 3) fail(ctx, `figure not seated on the card bottom (${(m.opaque.bottom - m.card.bottom).toFixed(1)})`);
        const ph = p.h / m.card.h; if (ph < 0.85 || ph > 0.95) fail(ctx, `portrait height ${(ph * 100).toFixed(0)}% of card`);
        if (p.w < 120 || p.w > 232) fail(ctx, `portrait panel ${p.w.toFixed(0)}px`);
        faceW = ((m.face.right - m.face.left)).toFixed(0); panel = `${p.w.toFixed(0)}x${p.h.toFixed(0)} (${(ph * 100).toFixed(0)}%)`;
      }
      if (!mobile && m.emphLines !== 1) fail(ctx, `emphasis wraps to ${m.emphLines} lines`);
    } else if (m.img) fail(ctx, "unexpected portrait");
    const seamCls = m.cls.filter((e) => e.nodes.some((n) => /SeamCard-module/.test(n)));
    if (seamCls.length) fail(ctx, `CLS from card/image: ${JSON.stringify(seamCls)}`);
    rows.push({ viewport: `${w}x${h}`, page: pg.name, card: `${m.card.w.toFixed(0)}x${m.card.h.toFixed(0)}`, "%vh": pct.toFixed(1), above: visAbove.toFixed(0), below: visBelow.toFixed(0),
      panel, faceW, emph: `${m.emphLines}ln ${m.emphFont}`, cls: m.cls.reduce((a, e) => a + e.v, 0).toFixed(4) });
    await page.screenshot({ path: `${OUT}/${pg.name}-${w}x${h}.png` });

    // --- tilt (laptop/desktop pointer) ---
    if (!mobile) {
      const st = m.stage;
      await page.mouse.move((st.left + st.right) / 2, (st.top + st.bottom) / 2);
      await page.waitForTimeout(400);
      let worst = Infinity, maxRy = 0, maxRx = 0;
      for (const [name, [x, y]] of Object.entries({ tl: [st.left + 5, st.top + 5], tr: [st.right - 5, st.top + 5], bl: [st.left + 5, st.bottom - 5], br: [st.right - 5, st.bottom - 5] })) {
        await page.mouse.move(x, y, { steps: 6 });
        await page.waitForTimeout(700);
        const t = await measure(page, pg);
        const a = angles(t.cardTransform); maxRy = Math.max(maxRy, Math.abs(a.ry)); maxRx = Math.max(maxRx, Math.abs(a.rx));
        const union = { left: Math.min(t.card.left, t.frame.left), right: Math.max(t.card.right, t.frame.right), top: Math.min(t.card.top, t.frame.top), bottom: Math.max(t.card.bottom, t.frame.bottom) };
        if (isIdent(t.cardTransform)) fail(`${ctx} tilt-${name}`, "card did not tilt");
        if (t.docScrollW !== t.vw) fail(`${ctx} tilt-${name}`, "horizontal scroll while tilted");
        if (union.left < 0 || union.right > t.vw) fail(`${ctx} tilt-${name}`, "tilted card leaves the viewport");
        for (const { s, box } of t.clear) if (box && box.w > 0) { worst = Math.min(worst, gapBetween(union, box)); if (hit(union, box)) fail(`${ctx} tilt-${name}`, `tilted card touches ${s}`); }
        if (name === "tr" && w === 1366) await page.screenshot({ path: `${OUT}/${pg.name}-tilt-${w}x${h}.png` });
        if (name === "tl" && w === 1440 && pg.portrait) await page.screenshot({ path: `${OUT}/edge-tilt-2x-src.png`, clip: { x: t.card.left - 10, y: t.card.top - 12, width: 360, height: 70 } });
      }
      if (maxRy > 5.3 || maxRx > 4.3) fail(`${ctx} tilt`, `amplitude too large ry ${maxRy.toFixed(2)} rx ${maxRx.toFixed(2)}`);
      await page.mouse.move(2, h / 2, { steps: 4 });
      await page.waitForTimeout(200);
      const mid = await page.evaluate((sel) => getComputedStyle(document.querySelector(sel)).transform, SEL);
      await page.waitForTimeout(900);
      const end = await measure(page, pg);
      if (isIdent(mid)) notes.push(`${ctx}: already at rest 200ms after leaving (abrupt?)`);
      if (!isIdent(end.cardTransform)) fail(`${ctx} tilt-rest`, `did not return to rest: ${end.cardTransform}`);
      for (const lt of end.layerTransforms) if (!isIdent(lt)) fail(`${ctx} tilt-rest`, `layer not identity at rest: ${lt}`);
      notes.push(`${ctx}: tilt ry<=${maxRy.toFixed(1)} rx<=${maxRx.toFixed(1)}, closest approach to content ${worst === Infinity ? "n/a" : worst.toFixed(0)}px, returns to rest`);
    }
    await context.close();
  }
}

// touch device: no tilt
{
  const context = await browser.newContext({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" }); await page.waitForSelector(SEL); await dismissCookies(page); await centreCard(page);
  const b = await page.locator(SEL).boundingBox();
  await page.touchscreen.tap(b.x + b.width / 2, b.y + 40); await page.waitForTimeout(500);
  const t = await page.evaluate((sel) => getComputedStyle(document.querySelector(sel)).transform, SEL);
  if (!isIdent(t)) fail("touch@390", `touch tilted the card: ${t}`); else notes.push("touch@390: static (no tilt)");
  await context.close();
}
// reduced motion: no tilt
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 720 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" }); await page.waitForSelector(SEL); await dismissCookies(page); await centreCard(page);
  const b = await page.locator(SEL).boundingBox();
  await page.mouse.move(b.x + b.width - 20, b.y + 20, { steps: 5 }); await page.waitForTimeout(600);
  const t = await page.evaluate((sel) => getComputedStyle(document.querySelector(sel)).transform, SEL);
  if (!isIdent(t)) fail("reduced-motion@1440", `tilted: ${t}`); else notes.push("reduced-motion@1440: static (no tilt)");
  await context.close();
}
// retina crops: dotted frame corner + card top edge at rest
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 720 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" }); await page.waitForSelector(SEL); await dismissCookies(page); await centreCard(page);
  const f = await page.evaluate((sel) => { const c = document.querySelector(sel); const fb = c.children[0].getBoundingClientRect(), cb = c.getBoundingClientRect(); return { fx: fb.right, fy: fb.bottom, cx: cb.left, cy: cb.top }; }, SEL);
  await page.screenshot({ path: `${OUT}/frame-corner-2x.png`, clip: { x: f.fx - 100, y: f.fy - 70, width: 120, height: 90 } });
  await page.screenshot({ path: `${OUT}/edge-rest-2x.png`, clip: { x: f.cx - 10, y: f.cy - 12, width: 360, height: 70 } });
  await context.close();
}
await browser.close();
console.table(rows);
console.log(notes.join("\n"));
if (fails.length) { console.log("\nFAILURES:"); fails.forEach((f) => console.log(" - " + f)); process.exitCode = 1; } else console.log("\nALL CHECKS PASSED");
