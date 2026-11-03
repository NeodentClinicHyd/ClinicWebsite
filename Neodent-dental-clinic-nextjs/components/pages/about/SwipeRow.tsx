"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./SwipeRow.module.css";

/* ------------------------------------------------------------------
   Swipe row (plan section 4, mobile rule): below 768px the items sit
   in one scroll-snap row with progress dots; from 768px the same list
   is a plain flex row that the section styles however it likes. Every
   item is always in the DOM exactly once.
   ------------------------------------------------------------------ */

export type SwipeItem = {
  key: string;
  node: ReactNode;
  style?: CSSProperties;
};

type Props = {
  label: string;
  items: SwipeItem[];
  className?: string;
  itemClassName?: string;
  /** Keep the swipe layout up to 1023px instead of 767px (used where the
      items are too small to read side by side on a tablet). */
  wide?: boolean;
};

export function SwipeRow({ label, items, className, itemClassName, wide = false }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    let best = 0;
    let bestDist = Infinity;
    children.forEach((el, i) => {
      const dist = Math.abs(el.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    // At the far end the last item can never reach the start edge.
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) best = children.length - 1;
    setActive(best);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [sync]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const el = track?.children[index] as HTMLElement | undefined;
    if (!track || !el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: el.offsetLeft - track.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className={`${styles.swipe} ${wide ? styles.wide : ""}`}>
      <ul
        ref={trackRef}
        className={`${styles.track} ${className ?? ""}`}
        aria-label={label}
        tabIndex={0}
      >
        {items.map((item) => (
          <li
            key={item.key}
            className={`${styles.item} ${itemClassName ?? ""}`}
            style={item.style}
          >
            {item.node}
          </li>
        ))}
      </ul>
      {items.length > 1 && (
        <div className={styles.dots}>
          {items.map((item, i) => (
            <button
              key={item.key}
              type="button"
              className={styles.dot}
              aria-label={`Show item ${i + 1} of ${items.length}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
