import { PLAN } from "@/lib/full-mouth-rehabilitation-page";
import { RichText } from "./RichText";
import { Slot } from "./FmrSlot";
import styles from "./FmrPlan.module.css";

/* 5. How a plan is made, then treated in stages (tan, one section, two parts)
   Part A: what is gathered to make a plan: intro and note on the left, three
   record rows (icon slots M4a-c) on the right. Part B: the stages as a
   connector timeline (scenes M5a-d, no numbers) beside a sticky, content-
   sized column. The h2 is set here (not with SectionHeader) because its red
   italic word sits inside the first phrase. */
export function FmrPlan() {
  return (
    <section className={styles.section} aria-labelledby="fmr-plan-title">
      <div className={styles.container}>
        <h2 id="fmr-plan-title" className={styles.title}>
          <span>
            {PLAN.headingLine1[0]}
            <em>{PLAN.headingLine1[1]}</em>
            {PLAN.headingLine1[2]}
          </span>
          <span>{PLAN.headingLine2}</span>
        </h2>

        {/* ---- Part A: how a plan is made ---- */}
        <div className={styles.records}>
          <div className={styles.recordsCopy}>
            <h3 className={styles.partTitle}>{PLAN.recordsTitle}</h3>
            <p className={styles.partIntro}>{PLAN.recordsIntro}</p>
            <p className={styles.recordsNote}>{PLAN.recordsNote}</p>
          </div>
          <ul className={styles.recordList}>
            {PLAN.records.map((record) => (
              <li className={styles.record} key={record.slot}>
                <Slot id={record.slot} />
                <div className={styles.recordBody}>
                  <h4>{record.title}</h4>
                  <p>{record.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Part B: treated in stages ---- */}
        <div className={styles.stagesHead}>
          <h3 className={styles.partTitle}>{PLAN.stagesTitle}</h3>
          <p className={styles.partIntro}>
            <RichText parts={PLAN.stagesIntro} />
          </p>
        </div>

        <div className={styles.composition}>
          <ol className={styles.steps}>
            {PLAN.stages.map((stage) => (
              <li key={stage.slot} className={styles.step}>
                <Slot id={stage.slot} className={styles.tile} />
                <div className={styles.stepBody}>
                  <h4>{stage.title}</h4>
                  <p>{stage.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.side}>
            <article className={styles.stat} aria-labelledby="fmr-timeline-title">
              <span className={styles.rule} aria-hidden="true" />
              <h4 id="fmr-timeline-title" className={styles.statTitle}>
                {PLAN.timelineTitle}
              </h4>
              <p className={styles.statText}>
                <RichText parts={PLAN.timeline} />
              </p>
            </article>
            <div className={styles.statement}>
              <p className={styles.statementText}>
                {PLAN.statementLead}
                <em>{PLAN.statementEm}</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
