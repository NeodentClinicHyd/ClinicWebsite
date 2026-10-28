"use client";

import { useEffect, type RefObject } from "react";

/* One 12px fade-up per block as it enters the viewport -- the same
   technique the About page uses. Content is visible by default: the
   hook only arms (data-reveal-ready) once JS has run, never arms for
   reduced-motion users or browsers without IntersectionObserver, and
   blocks already inside the first viewport are marked "instant".
   As a safety net every still-hidden block is revealed 6s after mount,
   so a missed intersection can never leave a blank gap. */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const items = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    const fold = window.innerHeight * 0.92;
    for (const el of items) {
      if (el.getBoundingClientRect().top < fold) el.dataset.shown = "instant";
    }
    root.dataset.revealReady = "true";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.shown = "true";
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    items.filter((el) => !el.dataset.shown).forEach((el) => observer.observe(el));

    const reveal = () => {
      for (const el of items) if (!el.dataset.shown) el.dataset.shown = "true";
    };
    const timer = window.setTimeout(reveal, 6000);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [rootRef]);
}
