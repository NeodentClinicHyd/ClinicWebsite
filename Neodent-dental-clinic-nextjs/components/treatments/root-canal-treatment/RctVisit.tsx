import { VISIT } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./RctSlot";
import styles from "./RctVisit.module.css";

/* 5. What happens at a visit (tan)
   Pattern: ImplantsStages / FmrPlan. Five stage cards linked by ONE
   continuous vertical red connector (a node at each card, no numerals) beside
   a sticky, content-sized column: the "how many visits" card and the red
   statement card. */
export function RctVisit() {
  return (
    <section className={styles.section} aria-labelledby="rct-visit-title">
      <div className={styles.container}>
        <SectionHeader titleId="rct-visit-title" sans={VISIT.sans} accent={VISIT.accent}>
          <p className="section-lede">{VISIT.intro}</p>
        </SectionHeader>

        <div className={styles.composition}>
          <div className={styles.stepsCol}>
            <ol className={styles.steps}>
              {VISIT.stages.map((stage) => (
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
            <article className={styles.stat} aria-labelledby="rct-visits-title">
              <span className={styles.rule} aria-hidden="true" />
              <h3 id="rct-visits-title" className={styles.statTitle}>
                {VISIT.visitsTitle}
              </h3>
              <p className={styles.statText}>{VISIT.visits}</p>
            </article>
            <div className={styles.statement}>
              <p className={styles.statementText}>
                {VISIT.statementLead}
                <em>{VISIT.statementEm}</em>
              </p>
              <p className={styles.statementSub}>{VISIT.statementSub}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
