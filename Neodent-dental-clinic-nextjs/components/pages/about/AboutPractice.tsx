"use client";

import { legacyStats } from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { Reveal } from "@/components/motion/Reveal";
import shared from "./AboutShared.module.css";
import styles from "./AboutPractice.module.css";

/* ------------------------------------------------------------------
   About -- S3 "A practice shaped by experience." (light, lede + depth)

   All four paragraphs and the facts card are moved unchanged from the
   previous AboutPractice. Paragraphs one and two stay visible; the two
   patient-facing paragraphs sit in a native <details> (full text in the
   server HTML). Two EditorialHighlight marks remain; the third is plain
   text with the same words. The old ghost "1994" behind the heading is
   gone from the page entirely (owner decision, Q5): the visible
   "Since 1994" in the fact strip and the facts card cover it.
   ------------------------------------------------------------------ */

export function AboutPractice() {
  return (
    <section
      className={`${shared.section} ${shared.light}`}
      id="practice"
      aria-labelledby="practice-title"
    >
      <div className={shared.container}>
        <div className={styles.grid}>
          <Reveal as="div" className={styles.head}>
            <h2 id="practice-title" className={shared.title}>
              A practice shaped by experience.
            </h2>
          </Reveal>

          <Reveal as="div" className={styles.p1}>
            <p className={shared.lede}>
              Neodent was founded in 1994 in Mehdipatnam, Hyderabad, at a time
              when specialist-led dental care of this kind was still uncommon
              in the city. Dr. Mohd. Siraj Ur Rahman established the practice
              around{" "}
              <EditorialHighlight tone="secondary">
                dentistry, prosthodontics and implantology
              </EditorialHighlight>
              , disciplines that would come to define Neodent&apos;s approach
              for the following three decades.
            </p>
          </Reveal>

          <Reveal as="div" className={styles.p2} delay={80}>
            <p className={shared.lede}>
              Rather than following a fixed template, Neodent&apos;s identity
              took shape gradually, through years of clinical practice: each
              technique adopted, each patient conversation had, each treatment
              carried out, added to a foundation the practice still stands on
              today. What started as a single clinic became, over time, a name
              associated in Hyderabad with{" "}
              <EditorialHighlight tone="primary">
                careful, considered dental care
              </EditorialHighlight>
              .
            </p>
          </Reveal>

          <Reveal as="aside" variant="fade" className={styles.card} aria-label="Neodent at a glance">
            <div className={shared.card}>
              <div className={shared.cardHead}>
                <div>
                  <h3 className={shared.cardName}>Neodent Dental Hospital</h3>
                  <p className={shared.label}>Specialist-led dental care</p>
                </div>
              </div>
              <Reveal as="dl" stagger={80} className={shared.facts}>
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
              </Reveal>
            </div>
          </Reveal>

          <details className={`${shared.more} ${styles.more}`}>
            <summary>Read more</summary>
            <div className={shared.moreBody}>
              <p className={shared.lede}>
                For patients, that history is not an abstraction. An
                appointment in Mehdipatnam or Nampally today draws on more than
                three decades of accumulated clinical experience — treatment
                planning and judgement built consultation by consultation, and
                carried forward by the wider clinical team that now works
                alongside the practice&apos;s founder. Neodent has always
                centred on the person in the chair, not just the procedure
                ahead of them.
              </p>
              <p className={shared.lede}>
                That continuity is what Neodent asks every patient to trust: a
                specialist-led clinical team, a clear explanation of every
                treatment option, and an approach that treats each visit —
                routine check-up or complex implant work alike — with the same
                attention it received in 1994.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
