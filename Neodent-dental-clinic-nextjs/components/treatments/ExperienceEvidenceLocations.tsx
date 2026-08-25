"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ExperienceEvidenceLocations.module.css";

/* ------------------------------------------------------------------
   Treatments page — Section 07 — Trust & Evidence.

   Dark charcoal surface. Three acts:
     — Experience metrics (Established 1994, Specialist-Led, Two Locations)
     — Patient review ratings (branch-specific, no addresses or CTAs)
     — Quiet editorial closing statement

   All location directory content (addresses, hours, phone, WhatsApp,
   Directions) has been removed. Section 08 is the correct contact
   destination. This section focuses on trust evidence only.
   ------------------------------------------------------------------ */

const branchRatings = [
  {
    branch: "Mehdipatnam",
    score: "4.3",
    stars: "★★★★☆",
    reviews: "260 reviews",
  },
  {
    branch: "Nampally",
    score: "4.5",
    stars: "★★★★½",
    reviews: "155 reviews",
  },
];

export function ExperienceEvidenceLocations() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      aria-labelledby="experience-title"
    >
      {/* Background geometry */}
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.verticalRail} />
      </div>

      <div className={styles.container}>

        {/* Header — ghost numeral + red-hairline eyebrow + serif heading */}
        <header className={styles.header}>
          <span className={styles.numeral} aria-hidden="true">07</span>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            07 / Trust &amp; evidence
          </div>
          <h2 id="experience-title" className={styles.title}>
            Experience, evidence<br /><span>&amp; what patients see.</span>
          </h2>
        </header>

        {/* Experience metrics */}
        <div className={styles.experience}>
          <div className={styles.experienceItem}>
            <strong>Established 1994</strong>
            <span>Three decades of clinical practice in Hyderabad</span>
          </div>
          <div className={styles.experienceItem}>
            <strong>Specialist-Led</strong>
            <span>Prosthodontic and implant expertise</span>
          </div>
          <div className={styles.experienceItem}>
            <strong>Two Locations</strong>
            <span>Mehdipatnam and Nampally, Hyderabad</span>
          </div>
        </div>

        {/* Patient reviews — ratings only, no contact info */}
        <div className={styles.evidence}>
          <div className={styles.evidenceLabel}>Patient reviews</div>
          <div className={styles.ratings}>
            {branchRatings.map((rating) => (
              <div key={rating.branch} className={styles.rating}>
                <div className={styles.branchName}>{rating.branch}</div>
                <div className={styles.score}>
                  <span className={styles.number}>{rating.score}</span>
                  <span className={styles.stars}>{rating.stars}</span>
                </div>
                <p className={styles.ratingText}>{rating.reviews}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial closing statement */}
        <div className={styles.closing}>
          <p className={styles.closingStatement}>
            Three decades of practice, two Hyderabad locations, and a clinical
            approach built around considered care.
          </p>
        </div>

      </div>
    </section>
  );
}
