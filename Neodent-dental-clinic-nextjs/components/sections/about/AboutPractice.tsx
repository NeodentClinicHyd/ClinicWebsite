"use client";

import { useRef } from "react";
import { legacyStats } from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { useReveal } from "./useReveal";
import shared from "./shared.module.css";
import styles from "./AboutPractice.module.css";

/* ------------------------------------------------------------------
   About -- "A practice shaped by experience."

   Pattern: LegacyStory's first chapter. The ghost year behind the
   heading is the only decorative number on the page, used once exactly
   as the home page does. The profile card is built like the doctor card
   (label / value rows) and holds only facts already stated in the copy.
   ------------------------------------------------------------------ */

export function AboutPractice() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.sand} ${styles.practice}`}
      id="practice"
      aria-labelledby="practice-title"
    >
      <div className={shared.container}>
        <div className={styles.story}>
          <div className={styles.left} data-reveal>
            <div className={styles.titleWrap}>
              <span className={styles.ghost} aria-hidden="true">
                {legacyStats.established}
              </span>
              <h2 id="practice-title" className={styles.title}>
                A practice shaped by <span>experience.</span>
              </h2>
            </div>

            <div className={styles.prose}>
              <p className={shared.lede}>
                Neodent was founded in 1994 in Mehdipatnam, Hyderabad, at a
                time when specialist-led dental care of this kind was still
                uncommon in the city. Dr. Mohd. Siraj Ur Rahman established
                the practice around{" "}
                <EditorialHighlight tone="secondary">
                  dentistry, prosthodontics and implantology
                </EditorialHighlight>
                , disciplines that would come to define Neodent&apos;s approach
                for the following three decades.
              </p>
              <p className={shared.lede}>
                Rather than following a fixed template, Neodent&apos;s identity
                took shape gradually, through years of clinical practice: each
                technique adopted, each patient conversation had, each
                treatment carried out, added to a foundation the practice still
                stands on today. What started as a single clinic became, over
                time, a name associated in Hyderabad with{" "}
                <EditorialHighlight tone="primary">
                  careful, considered dental care
                </EditorialHighlight>
                .
              </p>
            </div>
          </div>

          <aside className={styles.right} data-reveal aria-label="Neodent at a glance">
            <div className={shared.card}>
              <div className={shared.cardHead}>
                <div>
                  <h3 className={shared.cardName}>Neodent Dental Hospital</h3>
                  <p className={shared.label}>Specialist-led dental care</p>
                </div>
              </div>
              <dl className={shared.facts}>
                <div className={shared.fact}>
                  <dt>Founded</dt>
                  <dd className={shared.strong}>{legacyStats.established}</dd>
                </div>
                <div className={shared.fact}>
                  <dt>Founder</dt>
                  <dd>Dr. Mohd. Siraj Ur Rahman</dd>
                </div>
                <div className={shared.fact}>
                  <dt>Clinics</dt>
                  <dd>Mehdipatnam and Nampally</dd>
                </div>
                <div className={shared.fact}>
                  <dt>First practice</dt>
                  <dd>Mehdipatnam, Hyderabad</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <div className={`${shared.cols} ${styles.patients}`} data-reveal>
          <div>
            <p className={shared.lede}>
              For patients, that history is not an abstraction. An appointment
              in Mehdipatnam or Nampally today draws on more than three decades
              of accumulated clinical experience — treatment planning and
              judgement built consultation by consultation, and carried forward
              by the wider clinical team that now works alongside the
              practice&apos;s founder. Neodent has always centred on{" "}
              <EditorialHighlight tone="quiet">
                the person in the chair
              </EditorialHighlight>
              , not just the procedure ahead of them.
            </p>
          </div>
          <div>
            <p className={shared.lede}>
              That continuity is what Neodent asks every patient to trust: a
              specialist-led clinical team, a clear explanation of every
              treatment option, and an approach that treats each visit —
              routine check-up or complex implant work alike — with the same
              attention it received in 1994.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
