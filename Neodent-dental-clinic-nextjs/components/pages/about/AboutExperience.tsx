"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { AppButton } from "@/components/ui/AppButton";
import { Reveal } from "@/components/motion/Reveal";
import shared from "./AboutShared.module.css";
import styles from "./AboutExperience.module.css";

/* ------------------------------------------------------------------
   About -- S5 "Experience carried forward." (light, mirrored split)

   Photo, caption, doctor card, "View profile" button (same label and
   href) and both paragraphs are moved unchanged from the previous
   AboutMiftah. Both paragraphs stay visible: together they are short.
   The photo is shown at its own 4:3 proportion, so nothing is cropped
   or filtered: the patient's face stays pixelated exactly as supplied.
   Highlight marks: two (the third is plain text, same words). The
   heading is plain ink; the red accent is kept for S4, S7 and S10.
   ------------------------------------------------------------------ */

export function AboutExperience() {
  return (
    <section
      className={`${shared.section} ${shared.light}`}
      id="continuity"
      aria-labelledby="continuity-title"
    >
      <div className={shared.container}>
        <div className={styles.grid}>
          <Reveal as="div" className={styles.head}>
            <h2 id="continuity-title" className={shared.title}>
              Experience carried forward.
            </h2>
          </Reveal>

          <Reveal as="div" className={styles.p1} delay={80}>
            <p className={shared.lede}>
              At Neodent, clinical experience is not held by one person alone.
              Dr. Md. Miftah Ur Rahman,{" "}
              <EditorialHighlight tone="secondary">
                Prosthodontist and Implantologist
              </EditorialHighlight>{" "}
              and Assistant Director at Neodent, works alongside Dr. Mohd.
              Siraj Ur Rahman across both the Mehdipatnam and Nampally
              locations, extending the same specialist disciplines into the
              practice&apos;s day-to-day clinical work.
            </p>
          </Reveal>

          <figure className={`${shared.figure} ${styles.fig}`}>
            <Reveal variant="mask">
              <div className={styles.photo}>
                <Image
                  src="/assets/Dr Siraj and Dr. Miftah Neodent dental clinic - during treatment.webp"
                  alt="Dr. Mohd. Siraj Ur Rahman and Dr. Md. Miftah Ur Rahman during treatment at Neodent Dental Clinic"
                  fill
                  sizes="(min-width: 1024px) 560px, (min-width: 768px) 92vw, calc(100vw - 32px)"
                  className={styles.image}
                />
              </div>
            </Reveal>
            <figcaption className={shared.caption}>
              <span className={shared.source}>
                Dr. Mohd. Siraj Ur Rahman &amp; Dr. Md. Miftah Ur Rahman
              </span>
              <em className={shared.medium}>In practice</em>
            </figcaption>
          </figure>

          <Reveal as="div" className={styles.cardWrap} delay={100}>
            <div className={shared.card}>
              <div className={shared.cardHead}>
                <div>
                  <h3 className={shared.cardName}>Dr. Md. Miftah Ur Rahman</h3>
                  <p className={shared.label}>Assistant Director · Neodent</p>
                </div>
              </div>
              <dl className={shared.facts}>
                <div className={shared.fact}>
                  <dt>Specialism</dt>
                  <dd className={shared.strong}>
                    Prosthodontist and Implantologist
                  </dd>
                </div>
                <div className={shared.fact}>
                  <dt>Academic post</dt>
                  <dd>
                    Assistant Professor, SB Patil Dental College &amp; Hospital
                  </dd>
                </div>
                <div className={shared.fact}>
                  <dt>Practising at</dt>
                  <dd>Mehdipatnam and Nampally</dd>
                </div>
              </dl>
            </div>
            <div className={styles.action}>
              <AppButton href="/doctors/dr-miftah-ur-rahman" variant="primary">
                View profile <ArrowRight size={15} aria-hidden="true" />
              </AppButton>
            </div>
          </Reveal>

          <Reveal as="div" className={styles.p2} delay={80}>
            <p className={shared.lede}>
              Alongside his role at Neodent, Dr. Md. Miftah Ur Rahman is an
              Assistant Professor at SB Patil Dental College &amp; Hospital,
              echoing the academic dimension that has run through
              Neodent&apos;s clinical leadership since 1994. Together with{" "}
              <EditorialHighlight tone="primary">
                the wider clinical team
              </EditorialHighlight>
              , this shared foundation of specialist training means no single
              appointment depends on one clinician&apos;s presence alone.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
