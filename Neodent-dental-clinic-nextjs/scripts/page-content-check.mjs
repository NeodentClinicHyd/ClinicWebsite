// Page content check (internal-pages redesign tooling).
//
//   node scripts/page-content-check.mjs <slug> <route>
//
// Loads the route exactly as page-content-snapshot.mjs does (JavaScript off) and
// compares it with docs/internal-pages/<slug>/content-snapshot.json.
//
// Fails (exit 1) on: a snapshot sentence with no match; a missing heading; a
// missing link or changed anchor text; a missing image or an alt text that is
// missing or shorter; a missing video; a missing form field; a changed title,
// description, canonical, robots or social tag; a JSON-LD block or field that
// differs; more or fewer than one h1.
//
// docs/internal-pages/<slug>/content-allowlist.json (optional) is a list of
// { "text": "...", "reason": "..." }. Any finding whose description contains the
// text (compared after normalising) is printed as "allowed" and not counted.
// Exit codes: 0 pass, 1 content missing, 2 could not run.

import { chromium } from "playwright";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { BASE_URL, extractPage, normalise, snapshotPath } from "./page-content-snapshot.mjs";

const SHORTENED_RATIO = 0.9;

const [slug, route] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!slug || !route || !route.startsWith("/")) {
  console.error("Usage: node scripts/page-content-check.mjs <slug> <route>");
  process.exit(2);
}

const snapFile = snapshotPath(slug);
if (!existsSync(snapFile)) {
  console.error(`No snapshot for ${slug}: ${snapFile}\nRun: node scripts/page-content-snapshot.mjs ${slug} ${route}`);
  process.exit(2);
}
const before = JSON.parse(readFileSync(snapFile, "utf8"));

let allowlist = [];
const allowFile = path.resolve("docs", "internal-pages", slug, "content-allowlist.json");
if (existsSync(allowFile)) {
  try {
    allowlist = JSON.parse(readFileSync(allowFile, "utf8")).map((a) => ({ ...a, key: normalise(a.text) }));
  } catch (err) {
    console.error(`Could not read ${allowFile}: ${err.message}`);
    process.exit(2);
  }
}

let after;
const browser = await chromium.launch();
try {
  after = await extractPage(browser, route);
} catch (err) {
  console.error(`Check failed: ${err.message}\nIs the dev server running at ${BASE_URL}?`);
  await browser.close();
  process.exit(2);
}
await browser.close();

const missing = []; // { kind, text }
const shortened = [];
const allowed = [];

const report = (list, kind, text) => {
  const key = normalise(text);
  const hit = allowlist.find((a) => a.key && key.includes(a.key));
  if (hit) allowed.push({ kind, text, reason: hit.reason ?? "" });
  else list.push({ kind, text });
};

// ---- meta
const metaFields = ["title", "description", "canonical", "robots"];
for (const f of metaFields) {
  if ((before.meta?.[f] ?? "") !== (after.meta?.[f] ?? "")) {
    report(missing, `meta ${f}`, `was "${before.meta?.[f] ?? ""}" now "${after.meta?.[f] ?? ""}"`);
  }
}
for (const [key, vals] of Object.entries(before.meta?.social ?? {})) {
  const now = after.meta?.social?.[key] ?? [];
  if (JSON.stringify(vals) !== JSON.stringify(now)) {
    report(missing, `meta ${key}`, `was ${JSON.stringify(vals)} now ${JSON.stringify(now)}`);
  }
}
for (const key of Object.keys(after.meta?.social ?? {})) {
  if (!(key in (before.meta?.social ?? {}))) report(missing, `meta ${key}`, `new tag ${JSON.stringify(after.meta.social[key])}`);
}

// ---- h1
if (after.counts.h1 !== 1) report(missing, "h1", `page has ${after.counts.h1} h1 elements (expected exactly 1)`);

// ---- headings
{
  const pool = new Map();
  for (const h of after.headings) pool.set(normalise(h.text), (pool.get(normalise(h.text)) ?? 0) + 1);
  for (const h of before.headings) {
    const k = normalise(h.text);
    if ((pool.get(k) ?? 0) > 0) pool.set(k, pool.get(k) - 1);
    else report(missing, "heading", `h${h.level} "${h.text}"`);
  }
}

// ---- sentences
{
  const afterSentences = after.sentences.map((s) => normalise(s)).filter(Boolean);
  const exact = new Set(afterSentences);
  const fullText = ` ${afterSentences.join(" ")} `;
  const afterWordSets = afterSentences.map((s) => ({ words: s.split(" "), set: new Set(s.split(" ")) }));
  for (const s of before.sentences) {
    const n = normalise(s);
    if (!n) continue;
    if (exact.has(n) || fullText.includes(` ${n} `)) continue;
    const words = n.split(" ");
    let best = null;
    for (const cand of afterWordSets) {
      let hit = 0;
      for (const w of words) if (cand.set.has(w)) hit++;
      const ratio = hit / words.length;
      if (!best || ratio > best.ratio) best = { ratio, len: cand.words.length };
    }
    if (best && best.ratio >= SHORTENED_RATIO) {
      if (best.len < words.length) report(shortened, "shortened", s);
      // else: same words with extra words around them, counts as kept
    } else {
      report(missing, "sentence", s);
    }
  }
}

// ---- links (multiset on href + anchor text)
{
  const pool = after.links.map((l) => ({ href: l.href, text: normalise(l.text), used: false }));
  for (const l of before.links) {
    const t = normalise(l.text);
    const exact = pool.find((p) => !p.used && p.href === l.href && p.text === t);
    if (exact) {
      exact.used = true;
      continue;
    }
    const sameHref = pool.find((p) => !p.used && p.href === l.href);
    if (sameHref) {
      sameHref.used = true;
      report(missing, "link anchor", `${l.href} was "${l.text}" now "${after.links.find((x) => x.href === l.href && normalise(x.text) === sameHref.text)?.text ?? ""}"`);
    } else {
      report(missing, "link", `${l.href} "${l.text}"`);
    }
  }
}

// ---- images (by file name; alt must exist and not be shorter)
{
  for (const img of before.images) {
    const now = after.images.filter((i) => i.file === img.file);
    if (now.length === 0) {
      report(missing, "image", `${img.file} (alt "${img.alt ?? ""}")`);
      continue;
    }
    const wantAlt = normalise(img.alt ?? "");
    if (wantAlt) {
      const ok = now.some((i) => i.alt != null && normalise(i.alt).length >= wantAlt.length);
      if (!ok) {
        const best = now.map((i) => i.alt).find((a) => a != null);
        report(missing, "image alt", `${img.file} was "${img.alt}" now ${best == null ? "(no alt)" : `"${best}"`}`);
      }
    }
  }
  const countBefore = before.images.length;
  const countAfter = after.images.length;
  if (countAfter < countBefore) report(missing, "image count", `was ${countBefore} now ${countAfter}`);
}

// ---- videos
{
  const keyOf = (v) => [...v.sources.map((s) => s.file), v.poster?.file ?? ""].filter(Boolean).join("|");
  const afterKeys = after.videos.map(keyOf);
  for (const v of before.videos) {
    const k = keyOf(v);
    const hit = after.videos.find((a) => keyOf(a) === k) ?? after.videos.find((a) => v.sources.some((s) => a.sources.some((t) => t.file === s.file)));
    if (!hit) report(missing, "video", k || "(video without source)");
  }
  if (after.videos.length < before.videos.length && !afterKeys.length) report(missing, "video count", `was ${before.videos.length} now ${after.videos.length}`);
}

// ---- form fields
{
  // React useId tokens (_R_xxxx_) change between renders; strip them from names.
  const nameOf = (f) => String(f.name ?? "").replace(/_R_\w+_/g, "_R_");
  const pool = after.formFields.map((a) => ({ ...a, used: false }));
  for (const f of before.formFields) {
    // Radios and checkboxes share a name, so match on name + type + label first.
    const exact = pool.find(
      (a) => !a.used && nameOf(a) === nameOf(f) && a.type === f.type && normalise(a.label) === normalise(f.label) && normalise(a.placeholder) === normalise(f.placeholder),
    );
    if (exact) {
      exact.used = true;
      continue;
    }
    const sameName = pool.find((a) => !a.used && nameOf(a) === nameOf(f) && a.type === f.type);
    if (!sameName) {
      report(missing, "form field", `${f.tag} name="${f.name}" label="${f.label}"`);
    } else {
      sameName.used = true;
      report(missing, "form field text", `${f.name}: label "${f.label}" → "${sameName.label}", placeholder "${f.placeholder}" → "${sameName.placeholder}"`);
    }
  }
}

// ---- JSON-LD (deep compare, field by field)
{
  const diffs = [];
  const compare = (a, b, p) => {
    if (a === b) return;
    if (a && b && typeof a === "object" && typeof b === "object" && Array.isArray(a) === Array.isArray(b)) {
      const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
      for (const k of keys) {
        if (!(k in b)) diffs.push(`${p}.${k} removed`);
        else if (!(k in a)) diffs.push(`${p}.${k} added`);
        else compare(a[k], b[k], `${p}.${k}`);
      }
      return;
    }
    diffs.push(`${p} was ${JSON.stringify(a)?.slice(0, 80)} now ${JSON.stringify(b)?.slice(0, 80)}`);
  };
  if (before.jsonLd.length !== after.jsonLd.length) {
    report(missing, "json-ld", `block count was ${before.jsonLd.length} now ${after.jsonLd.length}`);
  }
  before.jsonLd.forEach((block, i) => {
    compare(block, after.jsonLd[i], `jsonld[${i}]${block?.["@type"] ? `(${[].concat(block["@type"]).join(",")})` : ""}`);
  });
  for (const d of diffs) report(missing, "json-ld", d);
}

// ---- summary
const line = (k) => k.padEnd(12);
console.log(`Content check: ${slug} ${route}`);
console.log(`Baseline: ${before.capturedAt}`);
console.log(
  `Counts (before → after): links ${before.counts.links}→${after.counts.links}, images ${before.counts.images}→${after.counts.images}, videos ${before.counts.videos}→${after.counts.videos}, headings ${before.counts.headings}→${after.counts.headings}, sentences ${before.counts.sentences}→${after.counts.sentences}, json-ld ${before.counts.jsonLdBlocks}→${after.counts.jsonLdBlocks}`,
);
console.log(`\nmissing ${missing.length}, shortened ${shortened.length}, allowed ${allowed.length}`);
for (const m of missing) console.log(`  MISSING   ${line(m.kind)} ${m.text}`);
for (const m of shortened) console.log(`  SHORTENED ${line(m.kind)} ${m.text}`);
for (const m of allowed) console.log(`  allowed   ${line(m.kind)} ${m.text}${m.reason ? `  (${m.reason})` : ""}`);

process.exit(missing.length + shortened.length > 0 ? 1 : 0);
