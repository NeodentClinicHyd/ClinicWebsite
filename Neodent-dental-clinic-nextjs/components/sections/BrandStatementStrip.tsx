"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BrandStatementStrip.module.css";

/* ------------------------------------------------------------------
   Brand-statement interstitial — sits between Section 01
   (ExperienceIntro) and Section 02 (LegacyStory) only. Not a sixth
   homepage chapter: no numeral, no route/eyebrow-with-chapter-number
   system, deliberately compact (~220-300px on desktop). Functions as
   an editorial pause/surface-shift, borrowing Section 02's serif +
   red-italic-emphasis grammar for its one line of copy. Scoped
   entirely to BrandStatementStrip.module.css; neither neighbouring
   section nor globals.css is touched.
   ------------------------------------------------------------------ */

/* Content props default to the homepage "peak performance" statement, so
   `<BrandStatementStrip />` renders exactly as before. Other pages (e.g.
   the Dr. Miftah profile's clinical-philosophy strip) reuse the same
   component and stylesheet with their own copy; pass `null` to omit the
   attribution / location lines. */
type BrandStatementStripProps = {
  ariaLabel?: string;
  eyebrow?: string;
  support?: string;
  emphasis?: string;
  attribution?: string | null;
  location?: string | null;
  /* Set when the emphasis line is markedly longer than "peak performance"
     (16 chars): on very narrow phones it is sized to stay on one line
     instead of orphaning its last word. Default output is unchanged. */
  longEmphasis?: boolean;
};

export function BrandStatementStrip({
  ariaLabel = "Neodent brand statement",
  eyebrow = "Neodent Standard",
  support = "We maintain",
  emphasis = "peak performance",
  attribution = "— Neodent Dental Clinic",
  location = "Mehdipatnam · Nampally",
  longEmphasis = false,
}: BrandStatementStripProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const stripRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = stripRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={stripRef}
      className={`${styles.strip} ${isVisible ? styles.visible : ""} ${longEmphasis ? styles.longEmphasis : ""}`}
      aria-label={ariaLabel}
    >
      <span className={styles.seamTop} aria-hidden="true" />
      <span className={styles.seamBottom} aria-hidden="true" />
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.registerMark} />
        <span className={styles.arc} />
      </div>

      <div className={styles.container}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <p className={styles.statement}>
          <span className={styles.statementSupport}>{support}</span>
          <span className={styles.statementEmphasis}>{emphasis}</span>
        </p>
        <span className={styles.signatureLine} aria-hidden="true" />
        {attribution && <p className={styles.attribution}>{attribution}</p>}
        {location && <p className={styles.location}>{location}</p>}
      </div>
    </section>
  );
}
