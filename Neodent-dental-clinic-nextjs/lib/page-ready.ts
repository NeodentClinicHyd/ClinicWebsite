/* ------------------------------------------------------------------
   waitForPageReady: resolves when the page that is currently in the
   DOM has everything it shows: web fonts, every rendered <img> (lazy
   ones are switched to eager so they start now), CSS background and
   mask images on rendered elements, and <video> poster frames. Full
   video files are not waited for, and nothing from other pages is
   fetched.

   Failed images count as done. The whole wait is capped (maxMs from
   startedAt) and padded to a minimum (minMs from startedAt) so the
   loader neither hangs on a slow network nor flashes on a fast one.
   ------------------------------------------------------------------ */

export const LOADER_SELECTOR = "[data-page-loader]";

type Options = {
  /** performance.now() value the loader became visible at. */
  startedAt: number;
  minMs: number;
  maxMs: number;
};

const URL_RE = /url\(\s*(['"]?)(.*?)\1\s*\)/g;

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, Math.max(0, ms)));
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

/** Rendered = has a layout box. Skips display:none subtrees (e.g. a
    desktop-only image on a phone), which the browser would never paint. */
function isRendered(el: Element) {
  return el.getClientRects().length > 0;
}

function outsideLoader(el: Element) {
  return !el.closest(LOADER_SELECTOR);
}

function waitForImage(img: HTMLImageElement): Promise<void> {
  if (img.loading === "lazy") img.loading = "eager";
  const decode = () => (img.decode ? img.decode().catch(() => undefined) : undefined);
  if (img.complete) return Promise.resolve(img.naturalWidth > 0 ? decode() : undefined);
  return new Promise<void>((resolve) => {
    const done = () => {
      img.removeEventListener("load", done);
      img.removeEventListener("error", done);
      resolve();
    };
    img.addEventListener("load", done);
    img.addEventListener("error", done);
  }).then(decode);
}

/** Loads and decodes a URL; resolves on error too. */
function preloadUrl(url: string): Promise<void> {
  const probe = new Image();
  probe.decoding = "async";
  probe.src = url;
  return probe.decode().catch(() => undefined);
}

function cssImageUrls(): string[] {
  const urls = new Set<string>();
  for (const el of document.body.querySelectorAll<HTMLElement>("*")) {
    if (!outsideLoader(el)) continue;
    const cs = getComputedStyle(el);
    const values = [cs.backgroundImage, cs.maskImage || cs.getPropertyValue("-webkit-mask-image")];
    for (const value of values) {
      if (!value || value === "none" || !value.includes("url(")) continue;
      if (!isRendered(el)) break;
      for (const [, , raw] of value.matchAll(URL_RE)) {
        if (!raw || raw.startsWith("data:") || raw.startsWith("#")) continue;
        urls.add(new URL(raw, document.baseURI).href);
      }
    }
  }
  return [...urls];
}

function collect(seen: Set<Element>): Promise<void>[] {
  const work: Promise<void>[] = [];
  for (const img of document.body.querySelectorAll("img")) {
    if (seen.has(img) || !outsideLoader(img) || !isRendered(img)) continue;
    seen.add(img);
    work.push(waitForImage(img));
  }
  for (const video of document.body.querySelectorAll("video")) {
    if (seen.has(video) || !video.poster || !outsideLoader(video)) continue;
    seen.add(video);
    work.push(preloadUrl(video.poster));
  }
  return work;
}

export async function waitForPageReady({ startedAt, minMs, maxMs }: Options): Promise<void> {
  const elapsed = () => performance.now() - startedAt;

  const work = (async () => {
    // Two frames: lets client components that render after hydration
    // (or after a route change) put their images into the DOM.
    await nextFrame();
    await nextFrame();
    const seen = new Set<Element>();
    const fonts = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();
    await Promise.all([fonts, ...collect(seen), ...cssImageUrls().map(preloadUrl)]);
    // A second pass picks up anything the first batch caused to render.
    await nextFrame();
    await Promise.all(collect(seen));
  })();

  await Promise.race([work, sleep(maxMs - elapsed())]);
  await sleep(minMs - elapsed());
}
