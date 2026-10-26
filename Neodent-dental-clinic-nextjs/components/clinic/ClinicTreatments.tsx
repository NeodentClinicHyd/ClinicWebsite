"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  closingCta,
  treatments,
} from "@/components/sections/expertise-data";
import { useReveal } from "./useReveal";
import shared from "./ClinicShared.module.css";
import styles from "./ClinicTreatments.module.css";

/* ------------------------------------------------------------------
   Clinic -- "All seven treatments, at both clinics."

   Pattern: the home "What can we help you with?" card grid -- same
   cards, same data. Names, one-line summaries, action words, icons and
   destinations all come from components/sections/expertise-data.ts, so
   the cards can never drift from the home page. The eighth slot is the
   home's own ivory closing card (`closingCta`). No new copy.
   ------------------------------------------------------------------ */

export function ClinicTreatments() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.dark} ${shared.atlas}`}
      id="clinic-treatments"
      aria-labelledby="clinic-treatments-title"
    >
      <div className={shared.container}>
        <h2 id="clinic-treatments-title" className={shared.title} data-reveal>
          All seven treatments, <span>at both clinics.</span>
        </h2>

        <ul className={styles.grid} data-reveal>
          {treatments.map((treatment) => (
            <li key={treatment.number}>
              <a href={treatment.href} className={styles.card}>
                <span className={styles.cardTitle}>{treatment.title}</span>
                <span className={styles.cardSummary}>{treatment.summary}</span>
                <span className={styles.cardBottom}>
                  <treatment.icon className={styles.icon} aria-hidden="true" />
                  <span className={styles.action}>
                    <span className={styles.intent}>{treatment.intent}</span>
                    <ArrowRight className={styles.arrow} aria-hidden="true" />
                  </span>
                </span>
              </a>
            </li>
          ))}
          <li>
            <a href={closingCta.href} className={`${styles.card} ${styles.cta}`}>
              <span className={styles.ctaHeading}>{closingCta.heading}</span>
              <span className={styles.ctaText}>{closingCta.text}</span>
              <span className={styles.ctaLink}>
                {closingCta.linkLabel}
                <ArrowRight aria-hidden="true" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
