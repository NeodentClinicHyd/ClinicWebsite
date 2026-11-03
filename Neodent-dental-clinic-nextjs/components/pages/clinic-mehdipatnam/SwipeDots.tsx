"use client";

import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";
import styles from "./SwipeDots.module.css";

/* ------------------------------------------------------------------
   SwipeDots -- progress dots for a horizontally scrolling row
   (overflow-x: auto, scroll-snap). Copied from the Dr. Miftah page's
   SwipeDots (that file stays as it was); the active dot is stretched
   with transform instead of animating its width. Each dot is a button
   with a 44 px tap area and an accessible name; the active dot follows
   the scroll position. The parent hides it above the breakpoint where
   the row stops scrolling.
   ------------------------------------------------------------------ */

type Props = {
  listRef: RefObject<HTMLElement | null>;
  count: number;
  /** What the dots stand for, e.g. "Photograph" gives "Photograph 1 of 6". */
  noun: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SwipeDots({ listRef, count, noun, tone = "light", className }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = listRef.current;
    const el = (wrap?.querySelector("[data-swipe]") as HTMLElement | null) ?? wrap;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = el.scrollWidth - el.clientWidth;
      const ratio = max > 0 ? el.scrollLeft / max : 0;
      setActive(Math.round(ratio * (count - 1)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [listRef, count]);

  const go = useCallback(
    (i: number) => {
      const wrap = listRef.current;
      const el = (wrap?.querySelector("[data-swipe]") as HTMLElement | null) ?? wrap;
      const child = el?.children[i] as HTMLElement | undefined;
      if (!el || !child) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: reduced ? "auto" : "smooth" });
    },
    [listRef],
  );

  return (
    <div
      className={`${styles.dots} ${tone === "dark" ? styles.dark : ""} ${className ?? ""}`}
      role="group"
      aria-label={`${noun} navigation`}
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          className={styles.dot}
          aria-label={`${noun} ${i + 1} of ${count}`}
          aria-current={i === active ? "true" : undefined}
          onClick={() => go(i)}
        >
          <span className={styles.mark} />
        </button>
      ))}
    </div>
  );
}
