import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

/**
 * Chapter heading for the dental-implants page, copied from the home
 * chapters (PatientStories / WhatToExpect / SpacesDesignedAroundCare
 * `.title`): DM Serif Display, a first line in ink or ivory and a red
 * italic closing line. No eyebrow, no numerals. `children` is the optional
 * intro paragraph (a `.section-lede`).
 */
export function SectionHeader({
  titleId,
  sans,
  accent,
  tone = "light",
  compact = false,
  children,
}: {
  titleId: string;
  sans: string;
  accent: string;
  tone?: "light" | "dark";
  /** Smaller title for slim bands (the related-treatments band). */
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <header
      className={`${styles.header} ${tone === "dark" ? styles.dark : ""} ${compact ? styles.compact : ""}`}
    >
      <h2 id={titleId} className={styles.title}>
        <span>{sans}</span>
        <span className={styles.accent}>{accent}</span>
      </h2>
      {children ? <div className={styles.intro}>{children}</div> : null}
    </header>
  );
}
