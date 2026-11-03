import { Reveal } from "@/components/motion/Reveal";
import { OVERVIEW } from "@/lib/smile-design-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Overview.module.css";

/* What is smile design? (tan). Two columns on desktop. Left: heading, lede and
   the three ideas as paper cards. Right: the planning view (SD1) in a paper
   card, capped at min(46dvh, 440px) and centred with its caption, over the
   dark "Terms you may hear" card, which takes the height left over so both
   columns end together. On tablet and phone one column in reading order:
   heading, lede, diagram, the three ideas, terms. */
export function Overview() {
  return (
    <section className={styles.section} aria-labelledby="sd-overview-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Reveal>
              <SectionHeader
                titleId="sd-overview-title"
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
            <Reveal variant="mask" className={styles.media}>
              <div className={styles.mediaCard}>
                <div className={styles.diagram}>
                  <Slot id="SD1" caption={OVERVIEW.mediaCaption} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} className={styles.termsWrap}>
              <article className={styles.terms} aria-labelledby="sd-terms-title">
                <h3 id="sd-terms-title" className={styles.termsTitle}>
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
