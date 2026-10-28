import { OVERVIEW } from "@/lib/full-mouth-rehabilitation-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./FmrSlot";
import styles from "./FmrOverview.module.css";

/* 2. What is full mouth rehabilitation? (tan)
   Pattern: the implants overview two-column intro, regrouped for this
   treatment. Left: heading, a larger lede, the "also called" note, and the
   three ideas as a stack of paper cards. Right: the overview scene (M1,
   the dominant element) over the dark "terms you may hear" card, which
   takes the height left over so both columns end together. */
export function FmrOverview() {
  return (
    <section className={styles.section} aria-labelledby="fmr-overview-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <SectionHeader
              titleId="fmr-overview-title"
              sans={OVERVIEW.sans}
              accent={OVERVIEW.accent}
            />
            <p className={styles.lede}>
              <RichText parts={OVERVIEW.lede} />
            </p>
            <p className={styles.note}>
              <RichText parts={OVERVIEW.note} />
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
              <Slot id="M1" caption={OVERVIEW.mediaCaption} note={ILLUSTRATION_NOTE} />
            </div>
            <article className={styles.terms} aria-labelledby="fmr-terms-title">
              <h3 id="fmr-terms-title" className={styles.termsTitle}>
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
