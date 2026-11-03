import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

/**
 * Chapter heading for the composite build-up page (fork of
 * components/treatments/dental-implants/SectionHeader.tsx). DM Serif Display,
 * a first line in ink or ivory and a second line that is either the red
 * italic accent or, with `plain`, the heading colour and upright. No eyebrow,
 * no numerals. `children` is the optional intro paragraph (a `.section-lede`).
 *
 * Decision D2: a real space sits between the two lines, so the heading reads
 * "What is a composite build-up?" as text. The words are unchanged.
 */
export function SectionHeader({
  titleId,
  sans,
  accent,
  tone = "light",
  compact = false,
  plain = false,
  children,
}: {
  titleId: string;
  sans: string;
  accent: string;
  tone?: "light" | "dark";
  /** Smaller title for slim bands (the related-treatments band). */
  compact?: boolean;
  /** Second line in the heading colour and upright (no red italic accent). */
  plain?: boolean;
  children?: ReactNode;
}) {
  return (
    <header
      className={`${styles.header} ${tone === "dark" ? styles.dark : ""} ${compact ? styles.compact : ""}`}
    >
      <h2 id={titleId} className={styles.title}>
        <span>{sans}</span>{" "}
        <span className={`${styles.accent} ${plain ? styles.plainAccent : ""}`}>{accent}</span>
      </h2>
      {children ? <div className={styles.intro}>{children}</div> : null}
    </header>
  );
}
