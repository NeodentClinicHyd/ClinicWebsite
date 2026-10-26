"use client";

import Image from "next/image";
import { legacyStats } from "@/lib/site-data";
import shared from "./shared.module.css";
import styles from "./AboutHero.module.css";

/* ------------------------------------------------------------------
   About -- page hero + "at a glance" strip.

   Pattern: the home Hero (founder slide for the dark ground, grid and
   red frame; slide 02/03 for the supporting headline scale), a little
   shorter than the home hero. The strip underneath is the home "Why
   Neodent" strip without its icons or backdrop blur.

   The Navbar is rendered with `overHero` by AboutClientChrome so it
   stays transparent over this dark ground, exactly as on the home page.
   ------------------------------------------------------------------ */

const glance: { value: string; label: string }[] = [
  { value: `Since ${legacyStats.established}`, label: "in Hyderabad" },
  { value: "2", label: "clinics" },
  { value: legacyStats.patientsTreated, label: "patients treated" },
];

export function AboutHero() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.bg} aria-hidden="true">
          <span className={styles.gridlines} />
        </div>

        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Established 1994 · Hyderabad</p>
            <h1 id="about-title" className={styles.headline}>
              Decades of changing smiles.
              <span className={styles.accent}>A legacy that continues.</span>
            </h1>
            <p className={styles.lede}>
              Neodent Dental Hospital was founded in Hyderabad in 1994 by Dr.
              Mohd. Siraj Ur Rahman, opening its first practice in Mehdipatnam.
              In the decades since, that single clinic has grown into Neodent
              Dental Hospital, now practising across Mehdipatnam and Nampally,
              built on specialist-led dental care that has shaped every year
              since.
            </p>
          </div>

          <figure className={styles.visual}>
            <div className={styles.frame}>
              <div className={styles.imageBox}>
                <Image
                  className={styles.image}
                  src="/assets/dr-miftah/Dr. Md. Miftah Ur Rahman during treatment- Neodent Dental Hospital.jpg"
                  alt="Dr. Md. Miftah Ur Rahman performing a dental treatment procedure at Neodent Dental Hospital, Hyderabad"
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 360px, 80vw"
                  preload
                />
              </div>
            </div>
            <figcaption className={styles.caption}>
              <b>Dr. Md. Miftah Ur Rahman</b>
              <span>Prosthodontist &amp; Implantologist</span>
              <span>Assistant Director · Neodent</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className={`${shared.ivory} ${styles.stripSection}`}
        aria-label="Neodent at a glance"
      >
        <div className={shared.container}>
          <div className={styles.why}>
            <p className={styles.whyTitle} aria-hidden="true">
              At a glance
            </p>
            <ul className={styles.whyList} aria-label="Neodent at a glance">
              {glance.map(({ value, label }) => (
                <li className={styles.whyCell} key={value}>
                  <span className={styles.whyValue}>{value}</span>
                  <span className={styles.whyLabel}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
