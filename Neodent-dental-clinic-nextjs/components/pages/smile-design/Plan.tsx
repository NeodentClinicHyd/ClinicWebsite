import { Reveal } from "@/components/motion/Reveal";
import { ILLUSTRATION_NOTE, PLAN } from "@/lib/smile-design-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Plan.module.css";

/* How your plan is made, then carried out (tan). Four stage cards (scenes
   SD5a-d, no numerals; 120 px tall on desktop, 72 px on phones) hang on one
   red connector that draws as the page scrolls, beside a sticky, content-sized
   column: the "How long does it take?" card and the red statement. Below, "What
   a visit can involve": one panel with three columns (veneers, bonding,
   whitening) divided by hairlines, so no single card is left half empty. */
export function Plan() {
  return (
    <section className={styles.section} aria-labelledby="sd-plan-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="sd-plan-title" sans={PLAN.sans} accent={PLAN.accent} plain>
            <p className="section-lede">{PLAN.intro}</p>
          </SectionHeader>
        </Reveal>

        <div className={styles.composition}>
          <div className={styles.stages}>
            <Reveal as="ol" className={styles.steps} stagger={110}>
              {PLAN.stages.map((stage) => (
                <li key={stage.slot} className={styles.step}>
                  <Slot id={stage.slot} className={styles.tile} />
                  <div className={styles.stepBody}>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </div>
                </li>
              ))}
            </Reveal>
            <p className={styles.figNote}>{ILLUSTRATION_NOTE}</p>
          </div>

          <div className={styles.side}>
            <Reveal delay={120} className={styles.sideItem}>
              <article className={styles.stat} aria-labelledby="sd-timeline-title">
                <span className={styles.rule} aria-hidden="true" />
                <h3 id="sd-timeline-title" className={styles.statTitle}>
                  {PLAN.timelineTitle}
                </h3>
                <p className={styles.statText}>
                  <RichText parts={PLAN.timeline} />
                </p>
              </article>
            </Reveal>
            <Reveal delay={220} className={styles.sideItem}>
              <div className={styles.statement}>
                <p className={styles.statementText}>
                  {PLAN.statementLead}
                  <em>{PLAN.statementEm}</em>
                </p>
                <p className={styles.statementNote}>{PLAN.statementNote}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className={styles.visits}>
          <Reveal className={styles.visitsHead}>
            <h3 className={styles.visitsTitle}>{PLAN.visitsTitle}</h3>
            <p className={styles.visitsLabel}>{PLAN.visitsLabel}</p>
          </Reveal>
          <Reveal as="ul" className={styles.visitList} stagger={100}>
            {PLAN.visits.map((visit) => (
              <li className={styles.visit} key={visit.title}>
                <h4>{visit.title}</h4>
                <p>{visit.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
