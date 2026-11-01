"use client";

import { useRef, useState, type ReactNode } from "react";
import styles from "./Surroundings.module.css";

/* The two photographs of S3. On tablet and desktop the wrapper is
   `display: contents`, so its figures sit in the section's grid. Below
   768px it is a snap-scrolling row (cards 85% wide, keyboard focusable)
   with progress dots. Both photographs are always in the DOM. */

export function SurroundingsPhotos({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const row = rowRef.current;
    if (!row || row.children.length < 2) return;
    const first = row.children[0] as HTMLElement;
    const second = row.children[1] as HTMLElement;
    const step = second.offsetLeft - first.offsetLeft;
    if (step <= 0) return;
    const next = Math.min(count - 1, Math.max(0, Math.round(row.scrollLeft / step)));
    setActive((prev) => (prev === next ? prev : next));
  };

  return (
    <>
      <div
        ref={rowRef}
        className={styles.photos}
        role="group"
        aria-label="Clinic photographs"
        tabIndex={0}
        onScroll={onScroll}
      >
        {children}
      </div>
      <div className={styles.dots} aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className={i === active ? styles.dotOn : styles.dot} />
        ))}
      </div>
    </>
  );
}
