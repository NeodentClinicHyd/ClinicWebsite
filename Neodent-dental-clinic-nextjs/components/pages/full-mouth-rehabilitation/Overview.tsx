import { OVERVIEW } from "@/lib/full-mouth-rehabilitation-page";
import { ILLUSTRATION_NOTE } from "@/lib/pages/full-mouth-rehabilitation-content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./Slot";
import styles from "./Overview.module.css";

/* What is full mouth rehabilitation? (tan)
   Two columns on desktop. Left: heading, a larger lede, the "also called"
   note, and the three ideas as paper cards. Right: the overview scene
   (capped at min(46dvh, 440px), captions under it) over the dark "terms you
   may hear" card, which takes the height left over so both columns end
   together. Phones: lede, scene, note, cards, terms in reading order. */
export function Overview() {
  return (
    <section className={styles.section} aria-labelledby="fmr-overview-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Reveal>
              <SectionHeader
                titleId="fmr-overview-title"
                sans={OVERVIEW.sans}
                accent={OVERVIEW.accent}
                plain
              />
            </Reveal>
            <Reveal className={styles.lede} delay={80}>
              <p>
                <RichText parts={OVERVIEW.lede} />
              </p>
            </Reveal>
            <Reveal className={styles.note} delay={120}>
              <p>
                <RichText parts={OVERVIEW.note} />
              </p>
            </Reveal>
            <Reveal as="ul" className={styles.cards} stagger={100}>
              {OVERVIEW.cards.map((card) => (
                <li className={styles.card} key={card.title}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.text}</p>
                </li>
              ))}
            </Reveal>
          </div>

          <div className={styles.side}>
            <Reveal variant="mask" as="figure" className={styles.media}>
              <div className={styles.diagram}>
                <Slot id="M1" ratio="fill" />
              </div>
              <figcaption className={styles.caption}>
                {OVERVIEW.mediaCaption}
                <span className={styles.captionNote}>{ILLUSTRATION_NOTE}</span>
              </figcaption>
            </Reveal>
            <Reveal className={styles.termsWrap} delay={120}>
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
