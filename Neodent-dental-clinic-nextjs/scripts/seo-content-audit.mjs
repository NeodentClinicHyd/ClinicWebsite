// SEO content preservation check (home redesign reference, Part 14.3).
//
//   BASELINE_URL=http://localhost:3100 CURRENT_URL=http://localhost:3101 \
//     node scripts/seo-content-audit.mjs
//
// Both URLs must serve production builds (next build + next start). The
// baseline is commit 0e62178 (reference 13.4); the current side is the
// working tree (or a snapshot copy of it).
//
// What it does, per side:
//   - Routes: /sitemap.xml of each side (paths only; the <loc> host is the
//     production SITE_URL), plus "/". If a sitemap cannot be read, the
//     routes are parsed from app/sitemap.ts and lib/clinic-data.ts.
//   - Each route is loaded in Chromium with javaScriptEnabled: false, so the
//     page is exactly the server-rendered HTML a crawler sees first.
//   - Extracted: title, meta description, canonical, robots meta, Open Graph
//     tags, headings (level + text), text blocks split into sentences
//     (including closed <details> content and CSS-hidden text, flagged),
//     internal / outbound / contact links (href + anchor), image alt text,
//     every JSON-LD block (parsed, @types, flattened fields), and word counts
//     per top-level section (home page: per <section> in <main>).
//
// Comparison (baseline -> current, same route):
//   - Sentences: case and punctuation normalised. Token overlap =
//     |baseline tokens found in the current sentence| / |baseline tokens|.
//     "kept": the normalised sentence still appears in the current page
//     text, or its best match has overlap >= 0.85. "shortened": best overlap
//     >= 0.40. Otherwise "removed". For "kept" by overlap and for
//     "shortened", the matched sentence must also be of comparable size
//     (Dice >= 0.3); without that gate a two-word label would count as kept
//     whenever its words occur somewhere in a long paragraph.
//   - Word boundaries: <br>, block elements and spans styled as block, flex,
//     grid or inline-block end a word, so "Where<br>Neodent" reads as two
//     words (textContent would join them).
//   - Headings and alt texts: same rule. Links: "removed" if the href is gone
//     from the route, "shortened" (anchor changed) if the href remains with a
//     different anchor. JSON-LD fields: "removed" if the path/value pair is
//     gone. Title / description / canonical / robots / OG changes are listed.
//   - Text that appears on at least 80% of baseline routes is site chrome
//     (navigation, footer, consent). It is compared once, as route "*".
//   - Home page only: a second, JavaScript-enabled load of the CURRENT home
//     page; sentences that appear only with JavaScript are listed (R2).
//
// Output (.audit/seo/):
//   baseline.json, current.json   raw extraction per route
//   diff.json                     ledger rows, per-route summary, checks
//   js-check.json                 JS-only text on the current home page
//   summary.md                    machine tables (the owner-facing report is
//                                 docs/home-redesign/SEO_CONTENT_DIFF.md)
//
// Owner decisions: a ledger row counts as decided if its id has a non-empty
// "Owner decision" cell in docs/home-redesign/SEO_CONTENT_DIFF.md, or a
// non-empty value in docs/home-redesign/seo-ledger-decisions.json
// ({ "<id>": "<decision>" }). Ids are stable hashes of route + kind + text.
//
// Exit code: 1 if any ledger row is "removed" and has no recorded decision,
// 2 if the audit could not run, 0 otherwise. Hero rows (HERO_NOTE) never
// count as undecided. The console also lists rows decided "visible" or
// "disclosure" that are still not "kept", so a restore run can check itself.

import { chromium } from "playwright";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASELINE_URL = trimSlash(process.env.BASELINE_URL ?? "");
const CURRENT_URL = trimSlash(process.env.CURRENT_URL ?? "");
const OUT_DIR = path.resolve(".audit", "seo");
const REPORT_MD = path.resolve("docs", "home-redesign", "SEO_CONTENT_DIFF.md");
const DECISIONS_JSON = path.resolve("docs", "home-redesign", "seo-ledger-decisions.json");
const KEPT = 0.85;
const PARTIAL = 0.4;
const CHROME_SHARE = 0.8;
const HERO_SECTION = "section#home";
const HERO_NOTE = "hero pass: no restoration in the S-series";

function trimSlash(u) {
  return u.replace(/\/+$/, "");
}

// ---------------------------------------------------------------- helpers

const norm = (s) =>
  String(s ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const tokens = (s) => norm(s).split(" ").filter(Boolean);
const words = (s) => (String(s).match(/[\p{L}\p{N}][\p{L}\p{N}'\u2019.,-]*/gu) ?? []).length;
const floor2 = (x) => Math.floor(x * 100 + 1e-9) / 100;
const hash = (s) => createHash("sha1").update(s).digest("hex").slice(0, 8);

function overlap(baseToks, curToks) {
  if (!baseToks.length) return 1;
  const bag = new Map();
  for (const t of curToks) bag.set(t, (bag.get(t) ?? 0) + 1);
  let hit = 0;
  for (const t of baseToks) {
    const n = bag.get(t) ?? 0;
    if (n > 0) {
      hit += 1;
      bag.set(t, n - 1);
    }
  }
  return hit / baseToks.length;
}

// Best match of one baseline string against a list of current strings.
// score = share of the baseline tokens found in the candidate (the 0.85
// "kept" rule). A partial match only counts as "shortened" when the
// candidate is also similar in size (Dice >= 0.3), so a two-word label is
// not "shortened" just because its words occur in some long sentence.
function bestMatch(text, candidates, fullText) {
  const n = norm(text);
  const bt = tokens(text);
  if (n && fullText.includes(` ${n} `)) return { score: 1, dice: 1, match: text, contained: true };
  let best = { score: 0, dice: 0, match: null, grade: -1 };
  for (const c of candidates) {
    const s = overlap(bt, c.toks);
    if (s < PARTIAL && best.grade >= 0 && s <= best.score) continue;
    const dice = (2 * s * bt.length) / (bt.length + c.toks.length || 1);
    const grade = dice >= DICE_MIN ? (s >= KEPT ? 2 : s >= PARTIAL ? 1 : 0) : 0;
    if (grade > best.grade || (grade === best.grade && (s > best.score || (s === best.score && dice > best.dice))))
      best = { score: s, dice, match: c.text, grade };
    if (grade === 2 && dice === 1) break;
  }
  return best;
}

const DICE_MIN = 0.3;
const statusOf = (m) =>
  m.contained || (m.score >= KEPT && m.dice >= DICE_MIN) ? "kept" : m.score >= PARTIAL && m.dice >= DICE_MIN ? "shortened" : "removed";

// Titles and initials that end in a full stop but do not end a sentence.
const NO_SPLIT = /(?:^|[\s(])(?:Dr|Drs|Mr|Mrs|Ms|Prof|Md|Mohd|St|Sr|Jr|No|vs|Rd|Opp|Nr|[A-Z])\.$/u;

function splitSentences(block) {
  const parts = block
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+(?=["'\u201C\u2018(]?[A-Z0-9])/u);
  const out = [];
  for (const p of parts) {
    if (out.length && NO_SPLIT.test(out[out.length - 1])) out[out.length - 1] += ` ${p}`;
    else out.push(p);
  }
  return out.map((s) => s.trim()).filter((s) => /[\p{L}\p{N}]/u.test(s));
}

function routeSlug(route) {
  return route === "/" ? "home" : route === "*" ? "chrome" : route.replace(/^\//, "").replace(/\//g, "-");
}

// ---------------------------------------------------------------- routes

async function sitemapPaths(base) {
  try {
    const res = await fetch(`${base}/sitemap.xml`);
    if (!res.ok) return { ok: false, status: res.status, paths: [], raw: "" };
    const raw = await res.text();
    const locs = [...raw.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
    const paths = locs.map((l) => {
      try {
        const p = new URL(l).pathname.replace(/\/+$/, "");
        return p || "/";
      } catch {
        return l;
      }
    });
    return { ok: true, status: res.status, paths, locs, raw };
  } catch (e) {
    return { ok: false, status: String(e), paths: [], raw: "" };
  }
}

function sitemapTsPaths() {
  const out = new Set(["/"]);
  try {
    const src = readFileSync(path.resolve("app", "sitemap.ts"), "utf8");
    for (const m of src.matchAll(/\$\{SITE_URL\}(\/[a-z0-9/_-]*)`/gi)) out.add(m[1]);
    if (/clinicLocationSlugs/.test(src)) {
      const cd = readFileSync(path.resolve("lib", "clinic-data.ts"), "utf8");
      const arr = cd.match(/clinicLocationSlugs\s*=\s*\[([^\]]*)\]/);
      if (arr) for (const s of arr[1].matchAll(/"([^"]+)"/g)) out.add(`/clinic/${s[1]}`);
    }
  } catch {
    // no source available
  }
  return [...out];
}

// ---------------------------------------------------------------- extraction (runs in the page)

function extractInPage() {
  const BLOCK = new Set(
    "ADDRESS ARTICLE ASIDE BLOCKQUOTE BR BUTTON CAPTION DD DETAILS DIALOG DIV DL DT FIELDSET FIGCAPTION FIGURE FOOTER FORM H1 H2 H3 H4 H5 H6 HEADER HR LABEL LEGEND LI MAIN NAV OL OPTION P PRE SECTION SELECT SUMMARY TABLE TBODY TD TFOOT TH THEAD TR UL A".split(" ")
  );
  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "SVG", "IFRAME", "VIDEO", "AUDIO", "CANVAS"]);
  const clean = (s) => (s ?? "").replace(/\s+/g, " ").trim();
  const cls = (el) =>
    [...el.classList]
      .slice(0, 2)
      .map((c) => c.replace(/^(\w+?)-module__[\w-]+?__/, "$1.").replace(/^(\w+?)_(\w+?)__[\w-]{5}$/, "$1.$2"))
      .join(".");
  const sectionOf = (el) => {
    const s = el.closest("main section, main > *, body > header, body > footer, header, footer, nav, [role=dialog], aside");
    if (!s) return "(page)";
    // For nested sections use the outermost section inside main.
    let top = s;
    let p = s.parentElement?.closest("main section");
    while (p) {
      top = p;
      p = p.parentElement?.closest("main section");
    }
    const tag = top.tagName.toLowerCase();
    if (top.id) return `${tag}#${top.id}`;
    const c = cls(top);
    return c ? `${tag}.${c}` : tag;
  };
  const isHidden = (el) => {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      if (e.hidden || e.getAttribute("aria-hidden") === "true") return true;
      if (e.tagName === "DETAILS" && !e.open && !(el.closest("summary") && el.closest("details") === e)) return "details";
      const cs = getComputedStyle(e);
      if (cs.display === "none" || cs.visibility === "hidden") return true;
    }
    return false;
  };

  // Text blocks: text nodes joined until a block boundary.
  const blocks = [];
  let buf = [];
  let bufEl = null;
  const flush = () => {
    const t = clean(buf.join(""));
    if (t && bufEl) blocks.push({ text: t, section: sectionOf(bufEl), hidden: isHidden(bufEl), tag: bufEl.tagName.toLowerCase() });
    buf = [];
    bufEl = null;
  };
  const walk = (node) => {
    if (node.nodeType === 3) {
      if (node.nodeValue.trim()) {
        if (!bufEl) bufEl = node.parentElement;
        buf.push(node.nodeValue);
      } else buf.push(" ");
      return;
    }
    if (node.nodeType !== 1) return;
    const tag = node.tagName.toUpperCase();
    if (SKIP.has(tag)) return;
    if (tag === "BR") {
      buf.push(" ");
      return;
    }
    const block = BLOCK.has(tag);
    // Spans styled as block / flex / grid (line-broken headlines) are word
    // boundaries but not new text blocks.
    const disp = block ? "" : getComputedStyle(node).display;
    const spaced = !block && disp && disp !== "inline" && disp !== "contents";
    if (block) flush();
    if (spaced) buf.push(" ");
    for (const c of node.childNodes) walk(c);
    if (spaced) buf.push(" ");
    if (block) flush();
  };
  walk(document.body);
  flush();

  // Text of one element with word breaks at <br> and block-styled children.
  function spacedText(root) {
    const out = [];
    const go = (n) => {
      if (n.nodeType === 3) return out.push(n.nodeValue);
      if (n.nodeType !== 1) return;
      const tag = n.tagName.toUpperCase();
      if (SKIP.has(tag)) return;
      if (tag === "BR") return out.push(" ");
      const d = getComputedStyle(n).display;
      const sp = BLOCK.has(tag) || (d && d !== "inline" && d !== "contents");
      if (sp) out.push(" ");
      n.childNodes.forEach(go);
      if (sp) out.push(" ");
    };
    go(root);
    return clean(out.join(""));
  }

  const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
  const og = {};
  document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]').forEach((m) => {
    og[m.getAttribute("property") ?? m.getAttribute("name")] = m.getAttribute("content");
  });

  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
    level: Number(h.tagName[1]),
    text: spacedText(h),
    section: sectionOf(h),
    hidden: isHidden(h),
  }));

  const links = [...document.querySelectorAll("a[href]")].map((a) => ({
    href: a.getAttribute("href"),
    text: spacedText(a) || clean(a.getAttribute("aria-label")) || clean(a.querySelector("img")?.getAttribute("alt")),
    section: sectionOf(a),
    hidden: isHidden(a),
  }));

  const images = [...document.querySelectorAll("img")].map((i) => ({
    src: i.getAttribute("src"),
    alt: i.hasAttribute("alt") ? i.getAttribute("alt") : null,
    decorative: i.getAttribute("alt") === "" || i.closest('[aria-hidden="true"]') != null,
    section: sectionOf(i),
  }));

  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent);

  return {
    title: document.title,
    titleCount: document.querySelectorAll("head title").length,
    description: meta('meta[name="description"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    robots: meta('meta[name="robots"]'),
    og,
    lang: document.documentElement.lang,
    headings,
    blocks,
    links,
    images,
    jsonld,
    sectionOrder: [...document.querySelectorAll("main > section, main > * > section, main section[id]")].map(
      (s) => sectionOf(s)
    ),
  };
}

// ---------------------------------------------------------------- per-route model

function jsonldTypes(node, out = new Set()) {
  if (Array.isArray(node)) node.forEach((n) => jsonldTypes(n, out));
  else if (node && typeof node === "object") {
    const t = node["@type"];
    if (t) (Array.isArray(t) ? t : [t]).forEach((x) => out.add(x));
    Object.values(node).forEach((v) => jsonldTypes(v, out));
  }
  return out;
}

// Flatten to "Type>path = value" pairs; array indexes dropped so order does
// not matter.
function jsonldFields(node, prefix, out) {
  if (Array.isArray(node)) node.forEach((n) => jsonldFields(n, prefix, out));
  else if (node && typeof node === "object") {
    const t = node["@type"];
    const p = t ? `${prefix ? prefix + ">" : ""}${Array.isArray(t) ? t.join("|") : t}` : prefix;
    for (const [k, v] of Object.entries(node)) {
      if (k === "@type") continue;
      jsonldFields(v, `${p}.${k}`, out);
    }
  } else out.push(`${prefix} = ${String(node)}`);
  return out;
}

function classifyLink(href, origins) {
  if (!href) return { kind: "none", key: "" };
  if (/^(tel|mailto|sms|whatsapp):/i.test(href)) return { kind: "contact", key: href.toLowerCase() };
  if (href.startsWith("#")) return { kind: "internal", key: href };
  try {
    const u = new URL(href, "http://relative.invalid");
    const host = u.host;
    if (host === "relative.invalid" || origins.has(host)) {
      const p = (u.pathname.replace(/\/+$/, "") || "/") + u.hash;
      return { kind: "internal", key: p };
    }
    if (/wa\.me|api\.whatsapp\.com/i.test(host)) return { kind: "outbound", key: u.href };
    return { kind: "outbound", key: u.href.replace(/\/+$/, "") };
  } catch {
    return { kind: "other", key: href };
  }
}

function buildModel(route, raw, origins) {
  const sentences = [];
  const seen = new Set();
  const sectionWords = {};
  for (const b of raw.blocks) {
    sectionWords[b.section] = (sectionWords[b.section] ?? 0) + words(b.text);
    for (const s of splitSentences(b.text)) {
      const k = `${b.section}|${norm(s)}`;
      if (!norm(s) || seen.has(k)) continue;
      seen.add(k);
      sentences.push({ text: s, section: b.section, hidden: b.hidden, tag: b.tag });
    }
  }
  const jsonld = raw.jsonld.map((txt, i) => {
    try {
      const data = JSON.parse(txt);
      return { index: i, ok: true, types: [...jsonldTypes(data)], fields: jsonldFields(data, "", []), bytes: txt.length };
    } catch (e) {
      return { index: i, ok: false, error: String(e.message ?? e), types: [], fields: [], bytes: txt.length };
    }
  });
  const links = raw.links.map((l) => ({ ...l, ...classifyLink(l.href, origins) }));
  const count = (k) => links.filter((l) => l.kind === k).length;
  const uniq = (k) => new Set(links.filter((l) => l.kind === k).map((l) => l.key)).size;
  return {
    route,
    title: raw.title,
    titleCount: raw.titleCount,
    description: raw.description,
    canonical: raw.canonical,
    robots: raw.robots,
    og: raw.og,
    lang: raw.lang,
    headings: raw.headings,
    sentences,
    links,
    images: raw.images,
    jsonld,
    sectionOrder: [...new Set(raw.sectionOrder)],
    sectionWords,
    totals: {
      words: raw.blocks.reduce((n, b) => n + words(b.text), 0),
      wordsHidden: raw.blocks.filter((b) => b.hidden).reduce((n, b) => n + words(b.text), 0),
      sentences: sentences.length,
      headings: raw.headings.length,
      internalLinks: count("internal"),
      internalLinksUnique: uniq("internal"),
      outboundLinks: count("outbound"),
      outboundLinksUnique: uniq("outbound"),
      contactLinks: count("contact"),
      images: raw.images.length,
      altTexts: raw.images.filter((i) => i.alt && i.alt.trim()).length,
      imagesMissingAlt: raw.images.filter((i) => i.alt === null).length,
      jsonldBlocks: jsonld.length,
      jsonldInvalid: jsonld.filter((j) => !j.ok).length,
      jsonldTypes: [...new Set(jsonld.flatMap((j) => j.types))].sort(),
    },
  };
}

// ---------------------------------------------------------------- fetch a side

async function crawlSide(browser, base, routes, label) {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  const out = {};
  for (const route of routes) {
    const url = base + (route === "/" ? "/" : route);
    try {
      const res = await page.goto(url, { waitUntil: "load", timeout: 60000 });
      const status = res?.status() ?? 0;
      const raw = await page.evaluate(extractInPage);
      const htmlBytes = (await res?.body())?.length ?? 0;
      out[route] = { status, htmlBytes, raw };
      process.stdout.write(`  ${label} ${status} ${route}\n`);
    } catch (e) {
      out[route] = { status: 0, error: String(e.message ?? e) };
      process.stdout.write(`  ${label} ERR ${route}: ${e.message}\n`);
    }
  }
  await ctx.close();
  return out;
}

async function jsEnabledHome(browser, base) {
  const ctx = await browser.newContext({ javaScriptEnabled: true, viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle", timeout: 90000 });
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    let y = 0;
    while (y < document.documentElement.scrollHeight - innerHeight) {
      y += Math.round(innerHeight * 0.6);
      scrollTo(0, y);
      await wait(120);
    }
    await wait(1500);
    scrollTo(0, 0);
  });
  // Let carousels and timers run through at least one full cycle.
  await page.waitForTimeout(8000);
  const raw = await page.evaluate(extractInPage);
  await ctx.close();
  return raw;
}

// ---------------------------------------------------------------- compare

function makeRow(route, kind, section, text, extra) {
  const id = `${routeSlug(route)}-${kind[0]}${hash(`${route}|${kind}|${section}|${norm(text)}|${extra?.key ?? ""}`)}`;
  return { id, route, kind, section, text, ...extra };
}

function compareRoute(route, base, cur, chromeSet, isChrome) {
  const rows = [];
  const keepChrome = (s) => (isChrome ? chromeSet.has(norm(s)) : !chromeSet.has(norm(s)));
  const curSent = cur.sentences.map((s) => ({ ...s, toks: tokens(s.text) }));
  const curFull = ` ${cur.sentences.map((s) => norm(s.text)).join(" ")} `;
  const hero = (section) => (section === HERO_SECTION ? HERO_NOTE : undefined);

  for (const s of base.sentences) {
    if (!keepChrome(s.text)) continue;
    const m = bestMatch(s.text, curSent, curFull);
    rows.push(
      makeRow(route, "text", s.section, s.text, {
        status: statusOf(m),
        score: floor2(m.score),
        match: statusOf(m) === "shortened" ? m.match : undefined,
        hiddenInBaseline: s.hidden || undefined,
        note: hero(s.section),
      })
    );
  }

  const curHeads = cur.headings.map((h) => ({ text: h.text, toks: tokens(h.text) }));
  const curHeadFull = ` ${cur.headings.map((h) => norm(h.text)).join(" ")} `;
  for (const h of base.headings) {
    if (!h.text || !keepChrome(h.text)) continue;
    const exact = cur.headings.find((c) => norm(c.text) === norm(h.text));
    const m = exact ? { score: 1, dice: 1, contained: true } : bestMatch(h.text, curHeads, curHeadFull);
    const lvl = exact && exact.level !== h.level ? `h${h.level} -> h${exact.level}` : undefined;
    rows.push(
      makeRow(route, "heading", h.section, h.text, {
        level: h.level,
        status: statusOf(m),
        score: floor2(m.score),
        match: statusOf(m) === "shortened" ? m.match : undefined,
        levelChange: lvl,
        textStillOnPage: statusOf(m) !== "kept" && curFull.includes(` ${norm(h.text)} `) ? true : undefined,
        note: hero(h.section),
      })
    );
  }

  const curLinks = new Map();
  for (const l of cur.links) {
    if (!curLinks.has(l.key)) curLinks.set(l.key, new Set());
    curLinks.get(l.key).add(norm(l.text));
  }
  const seenLinks = new Set();
  for (const l of base.links) {
    if (l.kind === "none") continue;
    const sig = `${l.key}|${norm(l.text)}`;
    if (seenLinks.has(sig)) continue;
    seenLinks.add(sig);
    if (!keepChrome(`${l.text} ${l.key}`)) continue;
    const anchors = curLinks.get(l.key);
    let status = "kept";
    if (!anchors) status = "removed";
    else if (!anchors.has(norm(l.text))) status = "shortened";
    rows.push(
      makeRow(route, "link", l.section, l.text || "(no anchor text)", {
        key: l.key,
        linkKind: l.kind,
        status,
        currentAnchors: status === "shortened" ? [...anchors].filter(Boolean) : undefined,
        note: hero(l.section),
      })
    );
  }

  const curAlts = cur.images.filter((i) => i.alt).map((i) => ({ text: i.alt, toks: tokens(i.alt) }));
  const curAltFull = ` ${curAlts.map((a) => norm(a.text)).join(" ")} `;
  const seenAlt = new Set();
  for (const i of base.images) {
    if (!i.alt || !i.alt.trim() || seenAlt.has(norm(i.alt))) continue;
    seenAlt.add(norm(i.alt));
    if (!keepChrome(`alt ${i.alt}`)) continue;
    const m = bestMatch(i.alt, curAlts, curAltFull);
    rows.push(
      makeRow(route, "alt", i.section, i.alt, {
        src: i.src,
        status: statusOf(m),
        score: floor2(m.score),
        match: statusOf(m) === "shortened" ? m.match : undefined,
        note: hero(i.section),
      })
    );
  }

  if (!isChrome) {
    const curFields = new Set(cur.jsonld.flatMap((j) => j.fields));
    const seenF = new Set();
    for (const f of base.jsonld.flatMap((j) => j.fields)) {
      if (seenF.has(f)) continue;
      seenF.add(f);
      rows.push(makeRow(route, "jsonld", "(head)", f, { status: curFields.has(f) ? "kept" : "removed" }));
    }
  }
  return rows;
}

function chromeKeys(models) {
  // Normalised sentence / heading / link / alt keys present on >= 80% of routes.
  const counts = new Map();
  const routes = Object.values(models);
  for (const m of routes) {
    const keys = new Set([
      ...m.sentences.map((s) => norm(s.text)),
      ...m.headings.map((h) => norm(h.text)),
      ...m.links.map((l) => norm(`${l.text} ${l.key}`)),
      ...m.images.filter((i) => i.alt).map((i) => norm(`alt ${i.alt}`)),
    ]);
    for (const k of keys) counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const min = Math.max(3, Math.ceil(routes.length * CHROME_SHARE));
  return new Set([...counts].filter(([, n]) => n >= min).map(([k]) => k));
}

function metaChanges(route, b, c) {
  const out = [];
  const cmp = (field, x, y) => {
    if ((x ?? null) !== (y ?? null)) out.push({ route, field, baseline: x ?? null, current: y ?? null });
  };
  cmp("title", b.title, c.title);
  cmp("description", b.description, c.description);
  cmp("canonical", b.canonical, c.canonical);
  cmp("robots", b.robots, c.robots);
  const keys = new Set([...Object.keys(b.og), ...Object.keys(c.og)]);
  for (const k of keys) cmp(k, b.og[k], c.og[k]);
  return out;
}

// ---------------------------------------------------------------- checks

function seoChecks(side, models, robotsTxt, sitemap) {
  const titles = new Map();
  const descs = new Map();
  const perRoute = [];
  for (const m of Object.values(models)) {
    titles.set(m.title, [...(titles.get(m.title) ?? []), m.route]);
    if (m.description) descs.set(m.description, [...(descs.get(m.description) ?? []), m.route]);
    const issues = [];
    if (!m.title) issues.push("no title");
    else if (m.title.length > 65) issues.push(`title ${m.title.length} chars`);
    if (m.titleCount !== 1) issues.push(`${m.titleCount} <title> tags`);
    if (!m.description) issues.push("no meta description");
    else if (m.description.length < 70 || m.description.length > 170) issues.push(`description ${m.description.length} chars`);
    if (!m.canonical) issues.push("no canonical");
    else {
      try {
        const cp = new URL(m.canonical).pathname.replace(/\/+$/, "") || "/";
        if (cp !== m.route) issues.push(`canonical path ${cp} != route`);
      } catch {
        issues.push(`canonical not absolute: ${m.canonical}`);
      }
    }
    if (m.robots && /noindex|nofollow/i.test(m.robots)) issues.push(`robots meta "${m.robots}"`);
    if (m.headings.filter((h) => h.level === 1).length !== 1) issues.push(`${m.headings.filter((h) => h.level === 1).length} h1`);
    if (m.totals.jsonldInvalid) issues.push(`${m.totals.jsonldInvalid} JSON-LD block(s) do not parse`);
    if (m.totals.imagesMissingAlt) issues.push(`${m.totals.imagesMissingAlt} img without alt attribute`);
    perRoute.push({ route: m.route, issues });
  }
  const dupTitles = [...titles].filter(([, r]) => r.length > 1).map(([t, r]) => ({ title: t, routes: r }));
  const dupDescs = [...descs].filter(([, r]) => r.length > 1).map(([d, r]) => ({ description: d, routes: r }));
  const robots = {
    status: robotsTxt.status,
    text: robotsTxt.text,
    allowsRoot: /allow:\s*\/\s*$/im.test(robotsTxt.text ?? ""),
    disallowAll: /disallow:\s*\/\s*$/im.test(robotsTxt.text ?? ""),
    sitemapLine: (robotsTxt.text ?? "").match(/^sitemap:\s*(\S+)/im)?.[1] ?? null,
  };
  return {
    side,
    robots,
    sitemap: { ok: sitemap.ok, status: sitemap.status, count: sitemap.paths.length, paths: sitemap.paths, hosts: [...new Set((sitemap.locs ?? []).map((l) => { try { return new URL(l).host; } catch { return l; } }))] },
    perRoute,
    dupTitles,
    dupDescs,
  };
}

async function getText(url) {
  try {
    const r = await fetch(url);
    return { status: r.status, text: await r.text() };
  } catch (e) {
    return { status: 0, text: null, error: String(e) };
  }
}

// ---------------------------------------------------------------- decisions

function loadDecisions() {
  const d = new Map();
  if (existsSync(DECISIONS_JSON)) {
    try {
      for (const [k, v] of Object.entries(JSON.parse(readFileSync(DECISIONS_JSON, "utf8")))) if (String(v).trim()) d.set(k, String(v).trim());
    } catch (e) {
      console.warn(`warning: could not parse ${DECISIONS_JSON}: ${e.message}`);
    }
  }
  if (existsSync(REPORT_MD)) {
    // Ledger rows: "| <id> | ... | <owner decision> |" ; the last cell is the decision.
    for (const line of readFileSync(REPORT_MD, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\|\s*`?([a-z0-9-]+-[thlaj][0-9a-f]{8})`?\s*\|/);
      if (!m) continue;
      const cells = line.split("|").slice(1, -1);
      const last = cells[cells.length - 1]?.trim();
      if (last) d.set(m[1], last);
    }
  }
  return d;
}

// ---------------------------------------------------------------- main

async function main() {
  if (!BASELINE_URL || !CURRENT_URL) {
    console.error("Set BASELINE_URL and CURRENT_URL (for example http://localhost:3100 and http://localhost:3101).");
    process.exit(2);
  }
  mkdirSync(OUT_DIR, { recursive: true });

  const [bMap, cMap] = await Promise.all([sitemapPaths(BASELINE_URL), sitemapPaths(CURRENT_URL)]);
  let routes = new Set(["/", ...bMap.paths, ...cMap.paths]);
  let routeSource = "sitemap.xml (both builds)";
  if (!bMap.ok && !cMap.ok) {
    routes = new Set(sitemapTsPaths());
    routeSource = "app/sitemap.ts (sitemap.xml unavailable)";
  }
  routes = [...routes].sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));
  console.log(`Routes (${routes.length}, from ${routeSource}):`);

  const origins = new Set(
    [BASELINE_URL, CURRENT_URL, ...(bMap.locs ?? []), ...(cMap.locs ?? [])]
      .map((u) => {
        try {
          return new URL(u).host;
        } catch {
          return null;
        }
      })
      .filter(Boolean)
  );
  // www and non-www of the production host count as internal.
  for (const h of [...origins]) origins.add(h.startsWith("www.") ? h.slice(4) : `www.${h}`);

  const browser = await chromium.launch();
  let bRaw, cRaw, jsRaw;
  try {
    bRaw = await crawlSide(browser, BASELINE_URL, routes, "baseline");
    cRaw = await crawlSide(browser, CURRENT_URL, routes, "current ");
    console.log("  current  JS-enabled load of /");
    jsRaw = await jsEnabledHome(browser, CURRENT_URL);
  } finally {
    await browser.close();
  }

  const models = { baseline: {}, current: {} };
  const missing = [];
  for (const r of routes) {
    for (const [side, raw] of [["baseline", bRaw], ["current", cRaw]]) {
      const e = raw[r];
      if (!e?.raw || e.status >= 400) {
        missing.push({ route: r, side, status: e?.status ?? 0, error: e?.error });
        continue;
      }
      models[side][r] = { status: e.status, htmlBytes: e.htmlBytes, ...buildModel(r, e.raw, origins) };
    }
  }
  writeFileSync(path.join(OUT_DIR, "baseline.json"), JSON.stringify({ url: BASELINE_URL, routes: models.baseline }, null, 1));
  writeFileSync(path.join(OUT_DIR, "current.json"), JSON.stringify({ url: CURRENT_URL, routes: models.current }, null, 1));

  // Compare.
  const chromeSet = chromeKeys(models.baseline);
  const rows = [];
  const metaDiffs = [];
  const summary = [];
  const both = routes.filter((r) => models.baseline[r] && models.current[r]);
  for (const r of both) {
    const b = models.baseline[r];
    const c = models.current[r];
    rows.push(...compareRoute(r, b, c, chromeSet, false));
    metaDiffs.push(...metaChanges(r, b, c));
    const bText = b.sentences.map((s) => norm(s.text)).join("\n");
    const cText = c.sentences.map((s) => norm(s.text)).join("\n");
    summary.push({
      route: r,
      textChanged: bText !== cText,
      baseline: b.totals,
      current: c.totals,
      sectionWords: { baseline: b.sectionWords, current: c.sectionWords },
      sectionOrder: { baseline: b.sectionOrder, current: c.sectionOrder },
    });
  }
  if (models.baseline["/"] && models.current["/"]) {
    rows.push(...compareRoute("*", models.baseline["/"], models.current["/"], chromeSet, true));
  }

  // Which other current routes still contain a non-kept sentence (for 14.1 option 4).
  const curIndex = Object.values(models.current).map((m) => ({
    route: m.route,
    full: ` ${m.sentences.map((s) => norm(s.text)).join(" ")} `,
    sent: m.sentences.map((s) => tokens(s.text)),
  }));
  for (const row of rows) {
    if (row.status === "kept" || row.kind === "jsonld" || row.kind === "link") continue;
    const n = norm(row.text);
    const bt = tokens(row.text);
    const found = curIndex
      .filter((ci) => ci.route !== row.route)
      .filter((ci) => ci.full.includes(` ${n} `) || ci.sent.some((t) => overlap(bt, t) >= KEPT && (2 * bt.length) / (bt.length + t.length) >= 0.6))
      .map((ci) => ci.route);
    if (found.length) row.alsoOnCurrent = found;
  }

  const decisions = loadDecisions();
  for (const row of rows) if (decisions.has(row.id)) row.decision = decisions.get(row.id);

  // JS-only text on the current home page.
  const ssrHome = models.current["/"];
  let jsOnly = [];
  if (ssrHome && jsRaw) {
    const jsModel = buildModel("/", jsRaw, origins);
    const ssrSent = ssrHome.sentences.map((s) => ({ text: s.text, toks: tokens(s.text) }));
    const ssrFull = ` ${ssrHome.sentences.map((s) => norm(s.text)).join(" ")} `;
    jsOnly = jsModel.sentences
      .map((s) => ({ ...s, ...bestMatch(s.text, ssrSent, ssrFull) }))
      .filter((s) => statusOf(s) !== "kept")
      .map((s) => ({ section: s.section, text: s.text, bestServerMatch: s.match, score: floor2(s.score), hidden: s.hidden || undefined }));
    const ssrHeads = new Set(ssrHome.headings.map((h) => norm(h.text)));
    const ssrLinks = new Set(ssrHome.links.map((l) => `${l.key}|${norm(l.text)}`));
    const ssrAlts = new Set(ssrHome.images.map((i) => norm(i.alt)));
    writeFileSync(
      path.join(OUT_DIR, "js-check.json"),
      JSON.stringify(
        {
          url: CURRENT_URL + "/",
          serverWords: ssrHome.totals.words,
          jsWords: jsModel.totals.words,
          jsOnlySentences: jsOnly,
          jsOnlyHeadings: jsModel.headings.filter((h) => !ssrHeads.has(norm(h.text))),
          jsOnlyLinks: jsModel.links.filter((l) => !ssrLinks.has(`${l.key}|${norm(l.text)}`)).map((l) => ({ href: l.href, text: l.text, section: l.section })),
          jsOnlyAlts: jsModel.images.filter((i) => i.alt && !ssrAlts.has(norm(i.alt))).map((i) => ({ alt: i.alt, section: i.section })),
          jsonldBlocks: { server: ssrHome.jsonld.length, js: jsModel.jsonld.length },
        },
        null,
        1
      )
    );
  }

  const [bRobots, cRobots] = await Promise.all([getText(`${BASELINE_URL}/robots.txt`), getText(`${CURRENT_URL}/robots.txt`)]);
  const checks = {
    baseline: seoChecks("baseline", models.baseline, bRobots, bMap),
    current: seoChecks("current", models.current, cRobots, cMap),
    robotsIdentical: bRobots.text === cRobots.text,
    sitemapPathsIdentical: JSON.stringify([...bMap.paths].sort()) === JSON.stringify([...cMap.paths].sort()),
  };

  const tally = (pred) => {
    const t = { kept: 0, shortened: 0, removed: 0 };
    for (const r of rows.filter(pred)) t[r.status] += 1;
    return t;
  };
  const byKind = {};
  for (const k of ["text", "heading", "link", "alt", "jsonld"]) byKind[k] = tally((r) => r.kind === k);
  // Hero rows (section#home) carry HERO_NOTE: the hero is redesigned in a
  // separate pass, so they are never counted as undecided (reference S2).
  const undecidedRemoved = rows.filter((r) => r.status === "removed" && !r.decision && r.note !== HERO_NOTE);

  const diff = {
    generatedAt: new Date().toISOString(),
    baselineUrl: BASELINE_URL,
    currentUrl: CURRENT_URL,
    routeSource,
    routes,
    missing,
    thresholds: { kept: KEPT, shortened: PARTIAL, chromeShare: CHROME_SHARE },
    totals: { all: tally(() => true), byKind, undecidedRemoved: undecidedRemoved.length },
    summary,
    metaDiffs,
    checks,
    jsOnlyCount: jsOnly.length,
    ledger: rows,
  };
  writeFileSync(path.join(OUT_DIR, "diff.json"), JSON.stringify(diff, null, 1));
  writeFileSync(path.join(OUT_DIR, "summary.md"), summaryMd(diff));

  console.log("");
  console.log(`Routes compared: ${both.length} (+ site chrome as "*"). Missing: ${missing.length}`);
  console.log(`Text changed on: ${summary.filter((s) => s.textChanged).map((s) => s.route).join(", ") || "none"}`);
  for (const [k, t] of Object.entries(byKind)) console.log(`  ${k.padEnd(8)} kept ${t.kept}  shortened ${t.shortened}  removed ${t.removed}`);
  const a = diff.totals.all;
  console.log(`  ALL      kept ${a.kept}  shortened ${a.shortened}  removed ${a.removed}`);
  console.log(`JS-only sentences on current home: ${jsOnly.length}`);
  console.log(`Removed rows without an owner decision: ${undecidedRemoved.length}`);
  const restoreKinds = new Set(["visible", "disclosure"]);
  const pending = rows.filter((r) => r.decision && restoreKinds.has(r.decision.split(":")[0].trim()) && r.status !== "kept");
  console.log(`Rows decided visible/disclosure but not yet kept: ${pending.length}`);
  for (const r of pending) console.log(`  ${r.id} [${r.decision.split(":")[0]}] ${r.status}: ${r.text.slice(0, 90)}`);
  console.log(`Output: ${path.relative(process.cwd(), OUT_DIR)}${path.sep}{baseline,current,diff,js-check}.json, summary.md`);
  if (missing.length) {
    console.error("Some routes could not be loaded:", missing);
    process.exit(2);
  }
  process.exit(undecidedRemoved.length ? 1 : 0);
}

function summaryMd(d) {
  const L = [];
  L.push(`# SEO content audit (machine summary)`, ``, `Generated ${d.generatedAt}. Baseline ${d.baselineUrl}, current ${d.currentUrl}.`, ``);
  L.push(`| Route | Words | Headings | Internal links | Outbound links | Alt texts | JSON-LD types | Text changed |`);
  L.push(`|---|---|---|---|---|---|---|---|`);
  for (const s of d.summary) {
    const b = s.baseline;
    const c = s.current;
    L.push(
      `| ${s.route} | ${b.words} -> ${c.words} | ${b.headings} -> ${c.headings} | ${b.internalLinks} -> ${c.internalLinks} | ${b.outboundLinks} -> ${c.outboundLinks} | ${b.altTexts} -> ${c.altTexts} | ${b.jsonldTypes.join(", ")} -> ${c.jsonldTypes.join(", ")} | ${s.textChanged ? "yes" : "no"} |`
    );
  }
  L.push(``, `| Kind | Kept | Shortened | Removed |`, `|---|---|---|---|`);
  for (const [k, t] of Object.entries(d.totals.byKind)) L.push(`| ${k} | ${t.kept} | ${t.shortened} | ${t.removed} |`);
  L.push(`| all | ${d.totals.all.kept} | ${d.totals.all.shortened} | ${d.totals.all.removed} |`, ``);
  L.push(`Removed rows without an owner decision: ${d.totals.undecidedRemoved}`, ``);
  return L.join("\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
