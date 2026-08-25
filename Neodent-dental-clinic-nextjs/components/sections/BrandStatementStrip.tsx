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

export function BrandStatementStrip() {
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
      className={`${styles.strip} ${isVisible ? styles.visible : ""}`}
      aria-label="NeoDent brand statement"
    >
      <span className={styles.seamTop} aria-hidden="true" />
      <span className={styles.seamBottom} aria-hidden="true" />
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.registerMark} />
        <span className={styles.arc} />
      </div>

      <div className={styles.container}>
        <p className={styles.eyebrow}>NeoDent Standard</p>
        <p className={styles.statement}>
          <span className={styles.statementSupport}>We maintain</span>
          <span className={styles.statementEmphasis}>peak performance</span>
        </p>
        <span className={styles.signatureLine} aria-hidden="true" />
        <p className={styles.attribution}>— NeoDent Dental Clinic</p>
        <p className={styles.location}>Mehdipatnam · Nampally</p>
      </div>
    </section>
  );
}
