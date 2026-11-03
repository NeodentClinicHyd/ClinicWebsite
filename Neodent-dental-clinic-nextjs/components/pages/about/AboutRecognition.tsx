"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import shared from "./AboutShared.module.css";
import styles from "./AboutRecognition.module.css";

/* ------------------------------------------------------------------
   About -- S7 "Recognition earned over time." (light, split)

   Decision D1 is unticked, so the red text card stays (it follows the
   red feature card on the home page). Heading, paragraph, both bold
   runs, the awards photo, its alt and its caption are moved unchanged
   from the previous AboutRecognition. Changes: the card no longer
   stretches to a tall minimum height (its text sits together), the
   photo is capped at --media-max-h, and the ceremony photo and closing
   statement (the old second row) moved to AboutSeam (S8).
   ------------------------------------------------------------------ */

export function AboutRecognition() {
  return (
    <section
      className={`${shared.section} ${shared.light} ${styles.recognition}`}
      id="recognition"
      aria-labelledby="recognition-title"
    >
      <div className={shared.container}>
        <div className={styles.grid}>
          <Reveal as="div" className={styles.red}>
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
          </Reveal>

          <figure className={`${shared.figure} ${styles.awards}`}>
            <Reveal variant="mask">
              <div className={styles.photo}>
                <Image
                  src="/assets/neodent-awards-recognition.jpg"
                  alt="Certificates, mementos and awards received by Neodent Dental Hospital, on display at the hospital"
                  fill
                  sizes="(min-width: 1024px) 460px, (min-width: 768px) 60vw, calc(100vw - 32px)"
                  className={styles.image}
                />
              </div>
            </Reveal>
            <figcaption className={shared.caption}>
              <span className={shared.source}>Institutional recognition</span>
              <em className={shared.medium}>Neodent Dental Hospital</em>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
