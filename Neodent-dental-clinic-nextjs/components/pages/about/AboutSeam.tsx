"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./AboutSeam.module.css";

/* ------------------------------------------------------------------
   About -- S8 seam card (used once on the page).

   One card straddling the boundary between S7 (light) and S9 (dark):
   the band behind it is ivory in the top half and the S9 dark in the
   bottom half. The closing statement is now a heading element (it was
   a paragraph); its words, the ceremony photo, alt and caption are
   moved unchanged from the previous AboutRecognition. No supporting
   text is added.
   ------------------------------------------------------------------ */

export function AboutSeam() {
  return (
    <section className={styles.seam} aria-labelledby="legacy-title">
      <div className={styles.inner}>
        <Reveal as="div" className={styles.card}>
          <h2 id="legacy-title" className={styles.statement}>
            A legacy is built over time.
            <em>The work continues.</em>
          </h2>

          <figure className={styles.figure}>
            <div className={styles.photo}>
              <Image
                src="/assets/dr-miftah/dr-miftah-award-recognition.jpg"
                alt="Dr. Md. Miftah Ur Rahman receiving a certificate at a professional ceremony"
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 40vw, calc(100vw - 64px)"
                className={styles.image}
              />
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.source}>Recognition ceremony</span>
              <em className={styles.medium}>Dr. Md. Miftah Ur Rahman</em>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
