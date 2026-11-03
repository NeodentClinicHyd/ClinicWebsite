"use client";

import { useRef, useState, type ReactNode, type UIEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./SwipeRow.module.css";

/* A row of cards that is a normal grid on wide screens (the caller's
   `rowClassName` decides) and a scroll-snap swipe row on narrow ones, with
   progress dots (44 px targets). Every card stays in the DOM. The row is a
   <Reveal> root with stagger, so the cards rise one after another. With a
   single card there is nothing to swipe, so no dots are drawn. */
export function SwipeRow({
  count,
  label,
  rowClassName,
  stagger = 90,
  tone = "light",
  scrollBelow = "tablet",
  children,
}: {
  count: number;
  /** Accessible name of the dot group. */
  label: string;
  rowClassName: string;
  stagger?: number;
  tone?: "light" | "dark";
  /** Where the row scrolls and the dots show: below 1024 px ("tablet", the
   *  default) or below 768 px ("phone"). */
  scrollBelow?: "tablet" | "phone";
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = (event: UIEvent<HTMLElement>) => {
    const scroller = event.currentTarget;
    const first = scroller.children[0] as HTMLElement | undefined;
    const second = scroller.children[1] as HTMLElement | undefined;
    if (!first) return;
    const step = second ? second.offsetLeft - first.offsetLeft : first.getBoundingClientRect().width;
    setActive(Math.min(count - 1, Math.max(0, Math.round(scroller.scrollLeft / (step || 1)))));
  };

  const goTo = (index: number) => {
    const scroller = wrapRef.current?.querySelector<HTMLElement>("[data-row]");
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;
    scroller.scrollTo({ left: card.offsetLeft - scroller.offsetLeft, behavior: "smooth" });
  };

  return (
    <div ref={wrapRef}>
      <Reveal className={rowClassName} stagger={stagger} data-row="" onScroll={onScroll}>
        {children}
      </Reveal>
      {count > 1 ? (
        <div
          className={`${scrollBelow === "phone" ? styles.dotsPhone : styles.dots} ${tone === "dark" ? styles.onDark : ""}`}
          role="group"
          aria-label={label}
        >
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              type="button"
              className={styles.dotButton}
              onClick={() => goTo(index)}
              aria-label={`Show card ${index + 1} of ${count}`}
              aria-current={active === index ? "true" : undefined}
            >
              <span className={styles.dot} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
