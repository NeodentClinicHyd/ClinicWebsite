"use client";

import { useEffect, type RefObject } from "react";

/* ------------------------------------------------------------------
   Shared one-shot reveal observer for the home redesign.

   This is the observer that LegacyStory, components/sections/about/
   useReveal.ts and components/clinic/useReveal.ts each carry a copy of,
   extracted once. The data-attribute contract is unchanged, so any of
   those sections can switch to useRevealScope later without touching
   its CSS:

     root[data-reveal-ready]  set once JS has armed the observer
     item[data-shown]         "instant"  already above the fold at mount
                              "true"     entered the viewport

   Content is visible by default (SSR, no JS, reduced motion, no
   IntersectionObserver). Only blocks still below the fold at mount are
   ever hidden, so nothing that is already on screen can flash.
   ------------------------------------------------------------------ */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const FOLD_RATIO = 0.92;

export type ArmRevealOptions = {
  /** IntersectionObserver rootMargin. Default matches the existing hooks. */
  rootMargin?: string;
  /** Called after an item is marked data-shown="true". */
  onShow?: (el: HTMLElement) => void;
  /** Optional safety net: reveal everything after this many ms. Off by default. */
  safetyMs?: number;
};

export function canAnimateReveal(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof IntersectionObserver !== "undefined" &&
    !window.matchMedia(REDUCED_MOTION).matches
  );
}

/** Arms the observer for `items` inside `root`. Returns a cleanup function. */
export function armReveal(
  root: HTMLElement,
  items: HTMLElement[],
  { rootMargin = "0px 0px -8% 0px", onShow, safetyMs }: ArmRevealOptions = {},
): () => void {
  if (items.length === 0 || !canAnimateReveal()) return () => {};

  const fold = window.innerHeight * FOLD_RATIO;
  for (const el of items) {
    if (!el.dataset.shown && el.getBoundingClientRect().top < fold) {
      el.dataset.shown = "instant";
    }
  }
  root.dataset.revealReady = "true";

  const show = (el: HTMLElement) => {
    if (el.dataset.shown) return;
    el.dataset.shown = "true";
    onShow?.(el);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        show(el);
        observer.unobserve(el);
      }
    },
    { rootMargin, threshold: 0 },
  );
  for (const el of items) if (!el.dataset.shown) observer.observe(el);

  // Printing and full-page captures never scroll, so show everything.
  const showAll = () => items.forEach(show);
  window.addEventListener("beforeprint", showAll);
  const timer = safetyMs ? window.setTimeout(showAll, safetyMs) : undefined;

  return () => {
    if (timer) window.clearTimeout(timer);
    window.removeEventListener("beforeprint", showAll);
    observer.disconnect();
  };
}

/** Reveals every [data-reveal] descendant of rootRef (the existing contract). */
export function useRevealScope(
  rootRef: RefObject<HTMLElement | null>,
  options?: ArmRevealOptions,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    return armReveal(root, items, options);
    // Options are read once on mount, like the existing hooks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef]);
}
