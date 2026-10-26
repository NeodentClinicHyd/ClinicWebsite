"use client";

import { useEffect, type RefObject } from "react";

/* One 12px fade-up per block as it enters the viewport -- the same
   observer technique LegacyStory uses on the home page. Reduced motion
   never arms it, so nothing is ever hidden for those users. Blocks that
   are already inside the first viewport are marked "instant" so they
   never flash. */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
    return () => observer.disconnect();
  }, [rootRef]);
}
