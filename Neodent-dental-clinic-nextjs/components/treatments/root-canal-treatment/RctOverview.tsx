import { OVERVIEW } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./RctSlot";
import styles from "./RctOverview.module.css";

/* 2. What is root canal treatment? (tan)
   Pattern: the full-mouth-rehabilitation overview. Left: heading, a larger
   lede and the three ideas as a stack of paper cards. Right: the tooth
   cross-section (R1, the dominant element) over the dark "terms you may
   hear" card, which takes the height left over so both columns end
   together. */
export function RctOverview() {
  return (
    <section className={styles.section} aria-labelledby="rct-overview-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <SectionHeader
              titleId="rct-overview-title"
              sans={OVERVIEW.sans}
              accent={OVERVIEW.accent}
            />
            <p className={styles.lede}>
              <RichText parts={OVERVIEW.lede} />
            </p>
            <ul className={styles.cards}>
              {OVERVIEW.cards.map((card) => (
                <li className={styles.card} key={card.title}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.side}>
            <div className={styles.media}>
              <Slot id="R1" caption={ILLUSTRATION_NOTE} />
            </div>
            <article className={styles.terms} aria-labelledby="rct-terms-title">
              <h3 id="rct-terms-title" className={styles.termsTitle}>
                {OVERVIEW.termsTitle}
              </h3>
              <dl className={styles.termList}>
                {OVERVIEW.terms.map(({ term, meaning }) => (
                  <div className={styles.term} key={term}>
                    <dt>{term}</dt>
                    <dd>{meaning}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
