import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { closingCta, treatments } from "@/components/sections/expertise-data";
import { ClinicBackdrop } from "./ClinicBackdrop";
import styles from "./TreatmentsStrip.module.css";

/* ------------------------------------------------------------------
   Clinics hub -- S5 "Featured dental treatments, at both clinics."

   Forked from components/clinic/ClinicTreatments.tsx (the original stays
   as it was). Names, one-line summaries, category words, icons and
   destinations still come from components/sections/expertise-data.ts, so
   the cards cannot drift from the home page; the eighth card is the
   data's own `closingCta`.

   The heading is not hidden by a colour clash (see DISCOVERY 5(d)): the
   old page hid every reveal block until it was scrolled to. Here the
   heading uses the shared Reveal, which shows the final state without
   JavaScript, on reduced motion and for content already on screen.

   Added (PAGE_PLAN Q7, default applied): one plain supporting line.
   Category words are stored in capitals in the data; they stay as the
   same text in the DOM and CSS shows them as "Repair", "Replace", ...
   ------------------------------------------------------------------ */

export function TreatmentsStrip() {
  return (
    <section
      className={styles.section}
      id="clinic-treatments"
      aria-labelledby="clinic-treatments-title"
    >
      <ClinicBackdrop />
      <div className={styles.container}>
        <header className={styles.head}>
          <Reveal
            as="h2"
            variant="mask"
            stagger={90}
            id="clinic-treatments-title"
            className={styles.title}
          >
            {"Featured dental treatments, "}
            <span className={styles.accent}>at both clinics.</span>
          </Reveal>
          <Reveal as="p" delay={120} className={styles.support}>
            Both Neodent clinics in Hyderabad, Mehdipatnam and Nampally, offer
            all seven treatments.
          </Reveal>
        </header>

        <Reveal as="ul" stagger={90} className={styles.grid}>
          {treatments.map((treatment) => (
            <li key={treatment.number} className={styles.item}>
              <Link href={treatment.href} className={styles.card}>
                <span className={styles.cardTitle}>{treatment.title}</span>
                <span className={styles.cardSummary}>{treatment.summary}</span>
                <span className={styles.bottom}>
                  <treatment.icon className={styles.icon} aria-hidden="true" />
                  <span className={styles.action}>
                    <span className={styles.intent}>{treatment.intent}</span>
                    <ArrowRight className={styles.arrow} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
          <li className={styles.item}>
            <Link href={closingCta.href} className={`${styles.card} ${styles.cta}`}>
              <span className={styles.ctaHeading}>{closingCta.heading}</span>
              <span className={styles.ctaText}>{closingCta.text}</span>
              <span className={styles.ctaLink}>
                {closingCta.linkLabel}
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          </li>
        </Reveal>
      </div>
    </section>
  );
}
