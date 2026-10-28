import { OVERVIEW } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./ScalingSlot";
import styles from "./ScalingOverview.module.css";

/* 2. What is scaling and polishing? (tan)
   Own composition from the FMR / Smile Design overview language. Row 1: the
   heading and the approved home-card lede beside the gum-margin scene (G1,
   the dominant element). Row 2: the three parts of a clean (scaling,
   polishing, advice) as one row of paper cards. Row 3: the "terms you may
   hear" card, the page's dark card (FMR pattern: serif caps terms, red dash
   markers), set as a band so the five terms sit side by side. */
export function ScalingOverview() {
  return (
    <section className={styles.section} aria-labelledby="sp-overview-title">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.copy}>
            <SectionHeader
              titleId="sp-overview-title"
              sans={OVERVIEW.sans}
              accent={OVERVIEW.accent}
            />
            <p className={styles.lede}>
              <RichText parts={OVERVIEW.lede} />
            </p>
          </div>
          <div className={styles.media}>
            <Slot id="G1" caption={OVERVIEW.mediaCaption} />
          </div>
        </div>

        <ul className={styles.cards}>
          {OVERVIEW.cards.map((card) => (
            <li className={styles.card} key={card.title}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </li>
          ))}
        </ul>

        <article className={styles.terms} aria-labelledby="sp-terms-title">
          <h3 id="sp-terms-title" className={styles.termsTitle}>
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
    </section>
  );
}
