import { Reveal } from "@/components/motion/Reveal";
import { FREQUENCY } from "@/lib/scaling-and-polishing-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Frequency.module.css";

/* How often do you need one? (ivory)
   The answer is "your dentist decides", and the section is built around that.
   Left: the dark "Your dentist decides" card over the evidence note. Right:
   "what can change the answer" as one paper card of five icon rows (G5a-e, all
   48 px frames). Both columns stretch to the same height. The red statement
   closes the section. No number of months appears anywhere in the new
   markup. Plain heading. */
export function Frequency() {
  const { decide, research } = FREQUENCY;

  return (
    <section className={styles.section} aria-labelledby="sp-frequency-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="sp-frequency-title"
            sans={FREQUENCY.sans}
            accent={FREQUENCY.accent}
            plain
          >
            <p className="section-lede">
              <RichText parts={FREQUENCY.intro} />
            </p>
          </SectionHeader>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.left} stagger={100}>
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
          </Reveal>

          <Reveal as="article" className={styles.factors} aria-labelledby="sp-factors-title" delay={120}>
            <h3 id="sp-factors-title" className={styles.factorsTitle}>
              {FREQUENCY.factorsTitle}
            </h3>
            <ul className={styles.factorList}>
              {FREQUENCY.factors.map((factor) => (
                <li className={styles.factor} key={factor.slot}>
                  <Slot id={factor.slot} className={styles.icon} />
                  <span className={styles.factorText}>{factor.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal as="aside" className={styles.statement} aria-label="Summary" delay={80}>
          <p className={styles.statementText}>
            {FREQUENCY.statementLead}
            <em>{FREQUENCY.statementEm}</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
