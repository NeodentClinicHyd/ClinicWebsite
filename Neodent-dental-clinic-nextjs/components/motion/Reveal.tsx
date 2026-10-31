"use client";

import {
  Children,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { armReveal } from "./useReveal";
import styles from "./motion.module.css";

/* ------------------------------------------------------------------
   <Reveal> — the one shared scroll reveal for the home page
   (reference Part 3.5). One-shot: each instance animates once, the
   first time it enters the viewport, and is never hidden again.

     variant="rise"  12px fade-up (the site's existing reveal)
     variant="fade"  opacity only
     variant="mask"  each line slides up from behind a clip edge; media
                     inside also settles from scale 1.04 to 1

     delay    ms before the reveal starts
     stagger  ms added per direct child. With stagger the children
              animate one after another and the wrapper itself stays
              still. With variant="mask" and stagger, every child
              becomes its own masked line, so pass one child per
              headline line (text, <span>, <em>, an image...).

   Under prefers-reduced-motion, without JS, during SSR and for content
   already on screen at mount, the final state renders with no
   transform. Only transform and opacity are animated.

   Example:
     <Reveal as="ul" stagger={70}>{items.map(i => <li key={i.id}>…</li>)}</Reveal>
     <Reveal as="h2" variant="mask" stagger={90}>
       <span>Specialist-led care.</span><em>Since 1994.</em>
     </Reveal>
   ------------------------------------------------------------------ */

export type RevealVariant = "rise" | "fade" | "mask";

/** Keep in sync with --reveal-duration in motion.module.css. */
const DURATION_MS = 640;

type OwnProps<T extends ElementType> = {
  as?: T;
  delay?: number;
  stagger?: number;
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type RevealProps<T extends ElementType = "div"> = OwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof OwnProps<T>>;

export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  stagger = 0,
  variant = "rise",
  className,
  style,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  const isMask = variant === "mask";
  const staggered = stagger > 0;
  const mode = isMask ? "mask" : staggered ? "children" : "self";
  const childCount = Children.count(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Stagger index per moving layer, read by the CSS transition-delay.
    // A direct child marked data-reveal-contents (a display: contents
    // wrapper, e.g. one carrying an ARIA role) is stepped through: its
    // own children are the moving layers.
    const moving = staggered
      ? Array.from(el.children).flatMap((child) =>
          child.hasAttribute("data-reveal-contents") ? Array.from(child.children) : [child],
        )
      : [];
    moving.forEach((child, i) =>
      (child as HTMLElement).style.setProperty("--reveal-i", String(i)),
    );

    // After the last layer has finished, drop the reveal styles so the
    // children's own transitions (hover etc.) are no longer overridden.
    let doneTimer: number | undefined;
    const layers = staggered ? Math.max(moving.length, 1) : 1;
    const total = delay + stagger * (layers - 1) + DURATION_MS + 80;

    const cleanup = armReveal(el, [el], {
      onShow: (target) => {
        doneTimer = window.setTimeout(() => {
          target.dataset.shown = "done";
        }, total);
      },
    });
    return () => {
      if (doneTimer) window.clearTimeout(doneTimer);
      cleanup();
    };
  }, [delay, stagger, staggered, childCount]);

  const content = isMask
    ? (staggered ? Children.toArray(children) : [children]).map((child, i) => (
        <span key={i} className={styles.maskLine}>
          <span className={styles.maskInner}>{child}</span>
        </span>
      ))
    : children;

  return (
    <Tag
      ref={ref}
      className={className ? `${styles.reveal} ${className}` : styles.reveal}
      data-variant={variant}
      data-mode={mode}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-stagger": `${stagger}ms`,
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {content}
    </Tag>
  );
}

/** A hairline that draws left-to-right: scroll-linked where
    animation-timeline: view() is supported, otherwise drawn once when
    its parent <Reveal> is shown. Apply to an element with a set width
    and height, e.g. <span className={drawLineClass} aria-hidden="true" />. */
export const drawLineClass = styles.drawLine;
