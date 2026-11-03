import { Reveal } from "@/components/motion/Reveal";
import { VISIT } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Visit.module.css";

/* What happens at a visit (beige)
   Five stage cards linked by one continuous vertical red connector (a node
   at each card, no numerals; the line draws with scroll where supported)
   beside a column holding the "how many visits" card and the red
   statement. The column is not sticky: it stretches to the height of the
   stepper, so neither side is left empty in a full-page view. Step
   illustrations are 120 px tall (96 px or less on phones). Plain heading. */
export function Visit() {
  return (
    <section className={styles.section} aria-labelledby="rct-visit-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="rct-visit-title" sans={VISIT.sans} accent={VISIT.accent} plain>
            <p className="section-lede">{VISIT.intro}</p>
          </SectionHeader>
        </Reveal>

        <div className={styles.composition}>
          <div className={styles.stepsCol}>
            <Reveal as="ol" className={styles.steps} stagger={100}>
              {VISIT.stages.map((stage) => (
                <li key={stage.slot} className={styles.step}>
                  <Slot id={stage.slot} className={styles.tile} />
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
