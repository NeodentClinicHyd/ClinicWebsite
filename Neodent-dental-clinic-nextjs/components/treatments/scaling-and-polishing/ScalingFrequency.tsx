import { FREQUENCY } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./ScalingSlot";
import styles from "./ScalingFrequency.module.css";

/* 6. How often do you need one? (light)
   THE SECOND ANGLE ELEMENT: the answer is "your dentist decides", and the
   section is built around that. Left: the dark "Your dentist decides" card
   (the dominant element) over the evidence note. Right: "what can change the
   answer" as one paper card of five icon rows (G5a-e). The red statement
   closes the section. No number of months appears anywhere. */
export function ScalingFrequency() {
  const { decide, research } = FREQUENCY;

  return (
    <section className={styles.section} aria-labelledby="sp-frequency-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="sp-frequency-title"
          sans={FREQUENCY.sans}
          accent={FREQUENCY.accent}
        >
          <p className="section-lede">
            <RichText parts={FREQUENCY.intro} />
          </p>
        </SectionHeader>

        <div className={styles.layout}>
          <div className={styles.left}>
            <article className={styles.decide} aria-labelledby="sp-decide-title">
              <h3 id="sp-decide-title" className={styles.decideTitle}>
                {decide.title}
              </h3>
              <p className={styles.decideText}>{decide.text}</p>
            </article>

            <article className={styles.research} aria-labelledby="sp-research-title">
              <h3 id="sp-research-title" className={styles.researchTitle}>
                {research.title}
              </h3>
              <p className={styles.researchText}>{research.text}</p>
            </article>
          </div>

          <article className={styles.factors} aria-labelledby="sp-factors-title">
            <h3 id="sp-factors-title" className={styles.factorsTitle}>
              {FREQUENCY.factorsTitle}
            </h3>
            <ul className={styles.factorList}>
              {FREQUENCY.factors.map((factor) => (
                <li className={styles.factor} key={factor.slot}>
                  <Slot id={factor.slot} />
                  <span className={styles.factorText}>{factor.text}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <aside className={styles.statement} aria-label="Summary">
          <p className={styles.statementText}>
            {FREQUENCY.statementLead}
            <em>{FREQUENCY.statementEm}</em>
          </p>
        </aside>
      </div>
    </section>
  );
}
