import { ILLUSTRATION_NOTE, PLAN } from "@/lib/smile-design-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./SmileSlot";
import styles from "./SmilePlan.module.css";

/* 5. How your plan is made, then carried out (tan)
   Pattern: the implants stages and the full mouth rehabilitation plan. Four
   stage cards (scenes SD5a-d, no numbers) hang on one continuous red
   connector line beside a sticky, content-sized column: the "how long does it
   take?" card and the red statement card. Below, a row of three compact text
   cards: what a visit can involve for each method (general information). */
export function SmilePlan() {
  return (
    <section className={styles.section} aria-labelledby="sd-plan-title">
      <div className={styles.container}>
        <SectionHeader titleId="sd-plan-title" sans={PLAN.sans} accent={PLAN.accent}>
          <p className="section-lede">{PLAN.intro}</p>
        </SectionHeader>

        <div className={styles.composition}>
          <div className={styles.stages}>
            <ol className={styles.steps}>
              {PLAN.stages.map((stage) => (
                <li key={stage.slot} className={styles.step}>
                  <Slot id={stage.slot} className={styles.tile} />
                  <div className={styles.stepBody}>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={styles.figNote}>{ILLUSTRATION_NOTE}</p>
          </div>

          <div className={styles.side}>
            <article className={styles.stat} aria-labelledby="sd-timeline-title">
              <span className={styles.rule} aria-hidden="true" />
              <h3 id="sd-timeline-title" className={styles.statTitle}>
                {PLAN.timelineTitle}
              </h3>
              <p className={styles.statText}>
                <RichText parts={PLAN.timeline} />
              </p>
            </article>
            <div className={styles.statement}>
              <p className={styles.statementText}>
                {PLAN.statementLead}
                <em>{PLAN.statementEm}</em>
              </p>
              <p className={styles.statementNote}>{PLAN.statementNote}</p>
            </div>
          </div>
        </div>

        <div className={styles.visits}>
          <div className={styles.visitsHead}>
            <h3 className={styles.visitsTitle}>{PLAN.visitsTitle}</h3>
            <p className={styles.visitsLabel}>{PLAN.visitsLabel}</p>
          </div>
          <ul className={styles.visitList}>
            {PLAN.visits.map((visit) => (
              <li className={styles.visit} key={visit.title}>
                <h4>{visit.title}</h4>
                <p>{visit.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
