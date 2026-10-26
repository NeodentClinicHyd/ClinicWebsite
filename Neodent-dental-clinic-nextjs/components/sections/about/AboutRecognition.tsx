"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReveal } from "./useReveal";
import shared from "./shared.module.css";
import styles from "./AboutRecognition.module.css";

/* ------------------------------------------------------------------
   About -- "Recognition earned over time."

   Pattern: the home red feature card ("Different generations. One
   standard of care.") -- the only red surface on this page -- paired
   with the awards photograph in place of the ivory stat card. A second
   photograph and the closing line sit underneath, the line set in the
   home's large display voice.
   ------------------------------------------------------------------ */

export function AboutRecognition() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.sand}`}
      id="recognition"
      aria-labelledby="recognition-title"
    >
      <div className={shared.container}>
        <div className={styles.top}>
          <div className={styles.red} data-reveal>
            <h2 id="recognition-title" className={styles.redTitle}>
              Recognition earned <em>over time.</em>
            </h2>
            <p className={styles.redText}>
              Over the decades, Neodent and its clinical team have received a
              number of{" "}
              <strong>
                certificates, mementos and professional recognitions
              </strong>{" "}
              — from dental societies, academic institutions and community
              organisations. Rather than list them individually, Neodent lets
              the record speak for itself:{" "}
              <strong>
                a practice that has stayed engaged with its professional
                community
              </strong>{" "}
              for as long as it has been treating patients in Hyderabad.
            </p>
          </div>

          <figure className={`${shared.figure} ${styles.awards}`} data-reveal>
            <div className={`${shared.photo} ${styles.awardsPhoto}`}>
              <Image
                src="/assets/neodent-awards-recognition.jpg"
                alt="Certificates, mementos and awards received by Neodent Dental Hospital, on display at the hospital"
                fill
                sizes="(min-width: 1024px) 460px, (min-width: 768px) 60vw, calc(100vw - 32px)"
                className={styles.awardsImg}
              />
            </div>
            <figcaption className={shared.caption}>
              <span className={shared.source}>Institutional recognition</span>
              <em className={shared.medium}>Neodent Dental Hospital</em>
            </figcaption>
          </figure>
        </div>

        <div className={styles.bottom}>
          <figure className={`${shared.figure} ${styles.ceremony}`} data-reveal>
            <div className={`${shared.photo} ${styles.ceremonyPhoto}`}>
              <Image
                src="/assets/dr-miftah/dr-miftah-award-recognition.jpg"
                alt="Dr. Md. Miftah Ur Rahman receiving a certificate at a professional ceremony"
                fill
                sizes="(min-width: 1024px) 440px, (min-width: 768px) 60vw, calc(100vw - 32px)"
                className={styles.ceremonyImg}
              />
            </div>
            <figcaption className={shared.caption}>
              <span className={shared.source}>Recognition ceremony</span>
              <em className={shared.medium}>Dr. Md. Miftah Ur Rahman</em>
            </figcaption>
          </figure>

          <p className={styles.statement} data-reveal>
            A legacy is built over time.
            <em>The work continues.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
