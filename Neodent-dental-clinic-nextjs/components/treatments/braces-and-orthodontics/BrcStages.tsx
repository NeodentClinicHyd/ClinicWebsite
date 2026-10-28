import type { CSSProperties } from "react";
import { STAGES } from "@/lib/braces-orthodontics-page";
import { SLOTS } from "@/lib/braces-slots";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./BrcSlot";
import styles from "./BrcStages.module.css";

/* 5. What happens at each stage (tan)
   Pattern: RctVisit / ImplantsStages / FmrPlan. The dominant element is the
   phase bar (B5p): one horizontal bar split into "Active phase" (the first
   three stages) and "Retention phase" (the last), with one dot per stage and
   no durations. Below it: four stage cards linked by ONE continuous vertical
   red connector (a node at each card, no numerals) beside a sticky,
   content-sized column: the "how long does it take?" card and the red
   statement card.

   The kit's IllustrationFrame has no wide ratio, so the bar is real markup
   (text, so it stays sharp and readable), not an illustration. Build 2 may
   set `art` on slot B5p to add a decorative strip inside it. */
export function BrcStages() {
  const BarArt = SLOTS.B5p.art;

  return (
    <section className={styles.section} aria-labelledby="brc-stages-title">
      <div className={styles.container}>
        <SectionHeader titleId="brc-stages-title" sans={STAGES.sans} accent={STAGES.accent}>
          <p className="section-lede">{STAGES.intro}</p>
        </SectionHeader>

        <ol className={styles.phaseBar} aria-label="The two phases of treatment" data-slot="B5p">
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
              {BarArt ? (
                <span className={styles.barArt} aria-hidden="true">
                  <BarArt />
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <div className={styles.composition}>
          <div className={styles.stepsCol}>
            <ol className={styles.steps}>
              {STAGES.stages.map((stage) => (
                <li key={stage.slot} className={styles.step}>
                  <Slot id={stage.slot} className={styles.tile} />
                  <div className={styles.stepBody}>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>
          </div>

          <div className={styles.side}>
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
          </div>
        </div>
      </div>
    </section>
  );
}
