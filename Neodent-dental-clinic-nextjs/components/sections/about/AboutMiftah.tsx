"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { AppButton } from "@/components/ui/AppButton";
import { useReveal } from "./useReveal";
import shared from "./shared.module.css";
import styles from "./AboutMiftah.module.css";

/* ------------------------------------------------------------------
   About -- "Experience carried forward."

   Pattern: the second doctor block of ClinicalLeadership (a smaller
   label / value card with its call to action) beside a large captioned
   photograph in LegacyStory's figure style, mirrored from the founder
   chapter above so the two profiles do not repeat one composition.
   ------------------------------------------------------------------ */

export function AboutMiftah() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.sand}`}
      id="continuity"
      aria-labelledby="continuity-title"
    >
      <div className={shared.container}>
        <h2 id="continuity-title" className={shared.title}>
          Experience <span>carried forward.</span>
        </h2>

        <div className={styles.feature}>
          <figure className={shared.figure} data-reveal>
            <div className={`${shared.photo} ${styles.photo}`}>
              <Image
                src="/assets/Dr Siraj and Dr. Miftah Neodent dental clinic - during treatment.webp"
                alt="Dr. Mohd. Siraj Ur Rahman and Dr. Md. Miftah Ur Rahman during treatment at Neodent Dental Clinic"
                fill
                sizes="(min-width: 1024px) 680px, (min-width: 768px) 92vw, calc(100vw - 32px)"
                className={styles.image}
              />
            </div>
            <figcaption className={shared.caption}>
              <span className={shared.source}>
                Dr. Mohd. Siraj Ur Rahman &amp; Dr. Md. Miftah Ur Rahman
              </span>
              <em className={shared.medium}>In practice</em>
            </figcaption>
          </figure>

          <div className={styles.side} data-reveal>
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
          </div>
        </div>

        <div className={`${shared.cols} ${styles.narrative}`} data-reveal>
          <div>
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
          </div>
          <div>
            <p className={shared.lede}>
              Alongside his role at Neodent, Dr. Md. Miftah Ur Rahman is an{" "}
              <EditorialHighlight tone="quiet">
                Assistant Professor at SB Patil Dental College &amp; Hospital
              </EditorialHighlight>
              , echoing the academic dimension that has run through
              Neodent&apos;s clinical leadership since 1994. Together with{" "}
              <EditorialHighlight tone="primary">
                the wider clinical team
              </EditorialHighlight>
              , this shared foundation of specialist training means no single
              appointment depends on one clinician&apos;s presence alone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
