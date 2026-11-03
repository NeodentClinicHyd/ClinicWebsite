// Page content snapshot (internal-pages redesign tooling).
//
//   node scripts/page-content-snapshot.mjs <slug> <route> [--force]
//   BASE_URL=http://localhost:3000 node scripts/page-content-snapshot.mjs clinic-nampally /clinic/nampally
//
// Loads the route with JavaScript disabled (what a crawler sees from the server
// HTML) and records: title, description, canonical, robots, Open Graph and
// Twitter tags; all headings; the full text split into sentences (including
// text inside closed <details>, aria-hidden and inert elements; excluding
// script and style); all links; all images (real file name, alt text); all
// videos; form fields; every JSON-LD block, parsed; and counts.
// Writes docs/internal-pages/<slug>/content-snapshot.json. Refuses to overwrite
// an existing snapshot unless --force is given.
//
// page-content-check.mjs imports extractPage and normalise from this file.

import { chromium } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const BASE_URL = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

/** Lower-case, strip accents and punctuation, collapse whitespace. */
export function normalise(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/** Runs inside the page. Must be self-contained. */
function extractInPage() {
  const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
  const attr = (el, name) => (el ? el.getAttribute(name) : null);

  const BLOCK = new Set([
    "ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "BR", "BUTTON", "DD", "DETAILS", "DIV", "DL", "DT",
    "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "H1", "H2", "H3", "H4", "H5", "H6",
    "HEADER", "HR", "LABEL", "LEGEND", "LI", "MAIN", "NAV", "OL", "OPTION", "P", "PRE", "SECTION",
    "SELECT", "SUMMARY", "TABLE", "TBODY", "TD", "TEXTAREA", "TFOOT", "TH", "THEAD", "TR", "UL",
  ]);
  const SKIP = new Set(["SCRIPT", "STYLE", "TEMPLATE", "SVG", "HEAD"]);

  // Text of an element with a space at block and <br> boundaries.
  const textOf = (root) => {
    let out = "";
    const walk = (n) => {
      if (n.nodeType === 3) {
        out += n.nodeValue;
        return;
      }
      if (n.nodeType !== 1 || SKIP.has(n.tagName.toUpperCase())) return;
      const block = BLOCK.has(n.tagName.toUpperCase());
      if (block) out += " ";
      for (const c of n.childNodes) walk(c);
      if (block) out += " ";
    };
    walk(root);
    return clean(out);
  };

  const fileOf = (src) => {
    if (!src) return "";
    if (src.startsWith("data:")) return "data-uri";
    try {
      const u = new URL(src, location.href);
      let p = u.pathname;
      if (p.startsWith("/_next/image")) {
        const inner = u.searchParams.get("url");
        if (inner) {
          try {
            p = new URL(inner, location.href).pathname;
          } catch {
            p = inner;
          }
        }
      }
      return decodeURIComponent(p.split("/").filter(Boolean).pop() ?? "");
    } catch {
      return src;
    }
  };

  const hrefOf = (raw) => {
    if (raw == null) return "";
    const v = raw.trim();
    if (v.startsWith(location.origin)) return v.slice(location.origin.length) || "/";
    return v;
  };

  // Metadata
  const metaContent = (sel) => attr(document.querySelector(sel), "content");
  const tags = {};
  for (const m of document.querySelectorAll("meta")) {
    const key = m.getAttribute("property") || m.getAttribute("name");
    if (!key || !/^(og:|twitter:|article:)/.test(key)) continue;
    (tags[key] ??= []).push(clean(m.getAttribute("content")));
  }
  const meta = {
    title: clean(document.title),
    description: clean(metaContent('meta[name="description"]')),
    canonical: hrefOf(attr(document.querySelector('link[rel="canonical"]'), "href")),
    robots: clean(metaContent('meta[name="robots"]')),
    social: tags,
  };

  // Headings
  const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => ({
    level: Number(h.tagName.slice(1)),
    text: textOf(h),
  }));

  // Text → blocks → sentences (closed <details>, aria-hidden and inert are included)
  const blocks = [];
  let buf = "";
  const flush = () => {
    const t = clean(buf);
    if (t) blocks.push(t);
    buf = "";
  };
  const walk = (n) => {
    if (n.nodeType === 3) {
      buf += n.nodeValue;
      return;
    }
    if (n.nodeType !== 1 || SKIP.has(n.tagName.toUpperCase())) return;
    const block = BLOCK.has(n.tagName.toUpperCase());
    if (block) flush();
    for (const c of n.childNodes) walk(c);
    if (block) flush();
  };
  walk(document.body);
  const sentences = [];
  for (const b of blocks) {
    for (const s of b.split(/(?<=[.!?])\s+/)) {
      const t = clean(s);
      if (/[\p{L}\p{N}]/u.test(t)) sentences.push(t);
    }
  }

  // Links
  const links = [...document.querySelectorAll("a[href]")].map((a) => ({
    href: hrefOf(a.getAttribute("href")),
    text: textOf(a) || clean(a.getAttribute("aria-label")) || clean(attr(a.querySelector("img[alt]"), "alt")),
  }));

  // Images
  const images = [...document.querySelectorAll("img")].map((img) => {
    const src = img.getAttribute("src") || img.currentSrc || "";
    return {
      file: fileOf(src),
      alt: img.hasAttribute("alt") ? clean(img.getAttribute("alt")) : null,
      loading: img.getAttribute("loading"),
      priority: img.getAttribute("fetchpriority") === "high",
    };
  });

  // Videos
  const videos = [...document.querySelectorAll("video")].map((v) => {
    const sources = [v.getAttribute("src"), ...[...v.querySelectorAll("source")].map((s) => s.getAttribute("src"))].filter(Boolean);
    return {
      sources: sources.map((s) => ({ src: hrefOf(s), file: fileOf(s) })),
      poster: v.getAttribute("poster") ? { src: hrefOf(v.getAttribute("poster")), file: fileOf(v.getAttribute("poster")) } : null,
      attributes: {
        controls: v.hasAttribute("controls"),
        autoplay: v.hasAttribute("autoplay"),
        loop: v.hasAttribute("loop"),
        muted: v.hasAttribute("muted"),
        playsinline: v.hasAttribute("playsinline"),
        preload: v.getAttribute("preload"),
      },
      tracks: [...v.querySelectorAll("track")].map((t) => ({ kind: t.getAttribute("kind"), src: hrefOf(t.getAttribute("src")) })),
    };
  });

  // Form fields
  const formFields = [...document.querySelectorAll("input, select, textarea")]
    .filter((f) => (f.getAttribute("type") || "").toLowerCase() !== "hidden")
    .map((f) => {
      let label = clean(f.getAttribute("aria-label"));
      if (!label && f.id) {
        const l = document.querySelector(`label[for="${CSS.escape(f.id)}"]`);
        if (l) label = textOf(l);
      }
      if (!label) {
        const l = f.closest("label");
        if (l) label = textOf(l);
      }
      if (!label && f.getAttribute("aria-labelledby")) {
        label = f
          .getAttribute("aria-labelledby")
          .split(/\s+/)
          .map((id) => textOf(document.getElementById(id) ?? document.createElement("i")))
          .join(" ")
          .trim();
      }
      return {
        tag: f.tagName.toLowerCase(),
        type: f.getAttribute("type"),
        name: f.getAttribute("name") || f.id || "",
        label,
        placeholder: clean(f.getAttribute("placeholder")),
      };
    });

  // JSON-LD
  const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
    try {
      return JSON.parse(s.textContent);
    } catch (err) {
      return { __parseError: String(err.message), raw: s.textContent.slice(0, 200) };
    }
  });

  return {
    meta,
    headings,
    sentences,
    links,
    images,
    videos,
    formFields,
    jsonLd,
    counts: {
      headings: headings.length,
      h1: headings.filter((h) => h.level === 1).length,
      sentences: sentences.length,
      links: links.length,
      images: images.length,
      videos: videos.length,
      formFields: formFields.length,
      jsonLdBlocks: jsonLd.length,
    },
  };
}

/** Loads route with JavaScript disabled and extracts everything. */
export async function extractPage(browser, route) {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1366, height: 800 } });
  try {
    const page = await context.newPage();
    const response = await page.goto(BASE_URL + route, { waitUntil: "load", timeout: 180_000 });
    if (!response || !response.ok()) {
      throw new Error(`${BASE_URL + route} responded ${response ? response.status() : "with no response"}`);
    }
    return await page.evaluate(extractInPage);
  } finally {
    await context.close();
  }
}

export function snapshotPath(slug) {
  return path.resolve("docs", "internal-pages", slug, "content-snapshot.json");
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const [slug, route] = args.filter((a) => !a.startsWith("--"));
  if (!slug || !route || !route.startsWith("/")) {
    console.error("Usage: node scripts/page-content-snapshot.mjs <slug> <route> [--force]");
    process.exit(2);
  }
  const file = snapshotPath(slug);
  if (existsSync(file) && !force) {
    console.log(`Snapshot already exists, keeping it: ${file}\n(use --force to overwrite)`);
    process.exit(0);
  }
  const browser = await chromium.launch();
  try {
    const data = await extractPage(browser, route);
    const snapshot = { slug, route, baseUrl: BASE_URL, capturedAt: new Date().toISOString(), ...data };
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, JSON.stringify(snapshot, null, 2));
    console.log(`Snapshot written: ${file}`);
    console.table(snapshot.counts);
  } catch (err) {
    console.error(`Snapshot failed: ${err.message}`);
    console.error(`Is the dev server running at ${BASE_URL}?`);
    process.exit(2);
  } finally {
    await browser.close();
  }
}

const isMain = (() => {
  try {
    const self = path.resolve(fileURLToPath(import.meta.url));
    const entry = path.resolve(process.argv[1] ?? "");
    return process.platform === "win32" ? self.toLowerCase() === entry.toLowerCase() : self === entry;
  } catch {
    return false;
  }
})();
if (isMain) await main();
