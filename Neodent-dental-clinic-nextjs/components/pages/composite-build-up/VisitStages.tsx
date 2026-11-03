import { Reveal } from "@/components/motion/Reveal";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { VISIT } from "@/lib/composite-build-up-page";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./VisitStages.module.css";

/* 5. What happens at the visit (tan). Plan 4.4.
   Pattern: the home WhatToExpect vertical stepper (P8). Four stage cards linked
   by ONE continuous red connector (a node at each card, no numerals), each with
   its scene at most 120 px tall (96 px on phones). Beside the stepper, the
   card "How long does it take?" and the red statement stretch to the stepper's
   height with their content vertically centred, so the side column is not
   half empty. Words, labels and the caption are those of the previous section
   (CbuVisit). */
export function VisitStages() {
  return (
    <section className={styles.section} aria-labelledby="cbu-visit-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="cbu-visit-title" sans={VISIT.sans} accent={VISIT.accent} plain>
            <p className="section-lede">{VISIT.intro}</p>
          </SectionHeader>
        </Reveal>

        <div className={styles.composition}>
          <div className={styles.stepsCol}>
            <Reveal as="ol" className={styles.steps} stagger={100}>
              {VISIT.stages.map((stage) => (
                <li key={stage.slot} className={styles.step}>
                  <span className={styles.connector} aria-hidden="true" />
                  <div className={styles.tile}>
                    <Slot id={stage.slot} />
                  </div>
                  <div className={styles.stepBody}>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </div>
                </li>
              ))}
            </Reveal>
            <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>
          </div>

          <Reveal className={styles.side} stagger={120}>
            <article className={styles.stat} aria-labelledby="cbu-time-title">
              <span className={styles.rule} aria-hidden="true" />
              <h3 id="cbu-time-title" className={styles.statTitle}>
                {VISIT.timeTitle}
              </h3>
              <p className={styles.statText}>{VISIT.time}</p>
            </article>
            <div className={styles.statement}>
              <p className={styles.statementText}>
                {VISIT.statementLead}
                <em>{VISIT.statementEm}</em>
              </p>
              <p className={styles.statementSub}>{VISIT.statementSub}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
