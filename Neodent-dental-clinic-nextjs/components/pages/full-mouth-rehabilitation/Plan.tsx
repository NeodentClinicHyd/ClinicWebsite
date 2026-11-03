import { PLAN } from "@/lib/full-mouth-rehabilitation-page";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./Slot";
import styles from "./Plan.module.css";

/* How a plan is made, then treated in stages (tan, one section, two parts).
   Part A: the heading block (title and line) with the "which records"
   note beside it, then the three records as one row of cards. Part B: the
   stages as a connector timeline (stage scenes at most 120 px tall, no
   numbers) beside a sticky, content-sized column holding the
   "How long does it take?" card and the red statement. The h2 keeps its
   words ("How a plan is made, then treated in stages."); the red italic on
   "made" is dropped (heading accents are limited to one section in three). */
export function Plan() {
  const [a, b, c] = PLAN.headingLine1;

  return (
    <section className={styles.section} aria-labelledby="fmr-plan-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="fmr-plan-title"
            sans={`${a}${b}${c}`}
            accent={PLAN.headingLine2}
            plain
          />
        </Reveal>

        {/* ---- Part A: how a plan is made ---- */}
        <div className={styles.records}>
          <Reveal as="h3" className={styles.partTitle}>
            {PLAN.recordsTitle}
          </Reveal>
          <Reveal as="p" className={styles.partIntro} delay={60}>
            {PLAN.recordsIntro}
          </Reveal>
          <Reveal as="p" className={styles.recordsNote} delay={100}>
            {PLAN.recordsNote}
          </Reveal>
          <Reveal as="ul" className={styles.recordList} stagger={100}>
            {PLAN.records.map((record) => (
              <li className={styles.record} key={record.slot}>
                <Slot id={record.slot} />
                <div className={styles.recordBody}>
                  <h4>{record.title}</h4>
                  <p>{record.text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>

        {/* ---- Part B: treated in stages ---- */}
        <div className={styles.stagesHead}>
          <Reveal as="h3" className={styles.partTitle}>
            {PLAN.stagesTitle}
          </Reveal>
          <Reveal as="p" className={styles.partIntro} delay={60}>
            <RichText parts={PLAN.stagesIntro} />
          </Reveal>
        </div>

        <div className={styles.composition}>
          <Reveal as="ol" className={styles.steps} stagger={100}>
            {PLAN.stages.map((stage) => (
              <li key={stage.slot} className={styles.step}>
                <Slot id={stage.slot} className={styles.tile} />
                <div className={styles.stepBody}>
                  <h4>{stage.title}</h4>
                  <p>{stage.text}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <div className={styles.side}>
            <Reveal delay={80}>
              <article className={styles.stat} aria-labelledby="fmr-timeline-title">
                <span className={styles.rule} aria-hidden="true" />
                <h4 id="fmr-timeline-title" className={styles.statTitle}>
                  {PLAN.timelineTitle}
                </h4>
                <p className={styles.statText}>
                  <RichText parts={PLAN.timeline} />
                </p>
              </article>
            </Reveal>
            <Reveal delay={160}>
              <div className={styles.statement}>
                <p className={styles.statementText}>
                  {PLAN.statementLead}
                  <em>{PLAN.statementEm}</em>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
