import type { CSSProperties } from "react";
import { STAGES } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Stages.module.css";

/* 5. What happens at each stage (tan). Plan 4.5. Pattern: WhatToExpect.
   A slim phase bar ("Active phase" over the first three stages, "Retention
   phase" over the last, one dot per stage, no durations), then four stage
   rows linked by ONE continuous red connector (a node at each row, no
   numerals) beside a sticky, content-sized column: the "How long does it
   take?" card and the red statement. Stage illustrations are at most 120 px
   tall (112 px wide, 84 px tall, in a compact row on a phone). */
export function Stages() {
  return (
    <section className={styles.section} aria-labelledby="brc-stages-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="brc-stages-title" sans={STAGES.sans} accent={STAGES.accent} plain>
            <p className="section-lede">{STAGES.intro}</p>
          </SectionHeader>
        </Reveal>

        <Reveal as="ol" className={styles.phaseBar} delay={80} aria-label="The two phases of treatment">
          {STAGES.phases.map((phase, index) => (
            <li
              className={`${styles.phase} ${index === 0 ? styles.active : styles.retention}`}
              key={phase.label}
              style={{ "--span": phase.span } as CSSProperties}
            >
              <span className={styles.phaseLabel}>{phase.label}</span>
              <span
                className={styles.dots}
                aria-hidden="true"
                style={{ gridTemplateColumns: `repeat(${phase.span}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: phase.span }, (_, dot) => (
                  <i key={dot} />
                ))}
              </span>
            </li>
          ))}
        </Reveal>

        <div className={styles.composition}>
          <div className={styles.stepsCol}>
            <ol className={styles.steps}>
              {STAGES.stages.map((stage, index) => (
                <Reveal as="li" key={stage.slot} className={styles.step} delay={index * 60}>
                  <Slot id={stage.slot} className={styles.tile} />
                  <div className={styles.stepBody}>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>
          </div>

          <Reveal className={styles.side} delay={120}>
            <article className={styles.stat} aria-labelledby="brc-length-title">
              <span className={styles.rule} aria-hidden="true" />
              <h3 id="brc-length-title" className={styles.statTitle}>
                {STAGES.lengthTitle}
              </h3>
              <p className={styles.statText}>{STAGES.length}</p>
            </article>
            <div className={styles.statement}>
              <p className={styles.statementText}>
                {STAGES.statementLead}
                <em>{STAGES.statementEm}</em>
              </p>
              <p className={styles.statementSub}>{STAGES.statementSub}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
