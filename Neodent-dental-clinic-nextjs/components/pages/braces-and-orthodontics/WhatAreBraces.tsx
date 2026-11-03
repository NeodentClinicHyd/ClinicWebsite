import { OVERVIEW } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { Reveal } from "@/components/motion/Reveal";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./WhatAreBraces.module.css";

/* 2. What are braces and orthodontic treatment? (tan). Plan 4.3.
   Grid areas, so the reading order on a phone is also the DOM order:
   copy (heading + lede), diagram, the three ideas, the dark "terms" card.
   Desktop: row 1 = copy | diagram, row 2 = three cards | terms. The terms
   card stretches to the height of the three cards, so both columns end
   together and neither is more than 35% empty. The diagram is capped at
   min(46dvh, 440px). */
export function WhatAreBraces() {
  return (
    <section className={styles.section} aria-labelledby="brc-overview-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Reveal>
              <SectionHeader
                titleId="brc-overview-title"
                sans={OVERVIEW.sans}
                accent={OVERVIEW.accent}
                plain
              />
            </Reveal>
            <Reveal delay={90}>
              <p className={styles.lede}>
                <RichText parts={OVERVIEW.lede} />
              </p>
            </Reveal>
          </div>

          <Reveal variant="mask" className={styles.media}>
            <Slot id="B1" caption={ILLUSTRATION_NOTE} />
          </Reveal>

          <Reveal as="ul" stagger={100} className={styles.cards}>
            {OVERVIEW.cards.map((card) => (
              <li className={styles.card} key={card.title}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className={styles.termsWrap} delay={120}>
            <article className={styles.terms} aria-labelledby="brc-terms-title">
              <h3 id="brc-terms-title" className={styles.termsTitle}>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
