import type { ReactNode } from "react";
import styles from "./IllustrationFrame.module.css";

/** Aspect ratios used on the dental-implants page. */
export type FrameRatio = "1 / 1" | "4 / 3" | "4 / 5";

/**
 * The one canvas every diagram or icon on the dental-implants page sits in:
 * a warm-ivory tile with a thin inner border, rounded like the site cards.
 *
 * The frame owns the aspect ratio and the breathing room; the artwork is
 * scaled to fit inside (SVG `meet`), so swapping the artwork later never
 * changes the layout. With a `caption` it renders a <figure>, without one a
 * plain <div>. The frame fills its parent: size icon frames by giving the
 * `className` a width (48px, 40px, 88px ...).
 */
export function IllustrationFrame({
  children,
  ratio = "4 / 3",
  caption,
  note,
  padding = "md",
  tone = "light",
  className,
}: {
  children: ReactNode;
  ratio?: FrameRatio;
  caption?: string;
  /** Small second line under the caption (e.g. the "not to scale" note). */
  note?: string;
  padding?: "sm" | "md" | "lg";
  /** Caption colour only: "dark" for captions on a dark ground. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const classes = [styles.root, tone === "dark" ? styles.onDark : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  const canvas = (
    <div
      className={`${styles.canvas} ${styles[`pad_${padding}`]}`}
      style={{ aspectRatio: ratio }}
    >
      <div className={styles.art}>{children}</div>
    </div>
  );

  if (caption) {
    return (
      <figure className={classes}>
        {canvas}
        <figcaption className={styles.caption}>
          {caption}
          {note ? <span className={styles.note}>{note}</span> : null}
        </figcaption>
      </figure>
    );
  }
  return <div className={classes}>{canvas}</div>;
}
