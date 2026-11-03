import { Reveal } from "@/components/motion/Reveal";
import { OVERVIEW } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "./SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./Slot";
import styles from "./Overview.module.css";

/* What is scaling and polishing? (tan)
   Row 1: heading and the approved home-card lede on the left; the gum-margin
   scene (G1) on the right, capped at min(46dvh, 440px) tall and centred in
   its tile. Row 2: the three parts of a clean (scaling, polishing, advice) as
   one row of equal-height paper cards. Row 3: the dark "terms you may hear"
   card, five terms side by side whose names and meanings share baselines
   (subgrid). Plain heading (the accent stays on the page h1 and three other
   sections). */
export function Overview() {
  return (
    <section className={styles.section} aria-labelledby="sp-overview-title">
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.copy}>
            <Reveal>
              <SectionHeader
                titleId="sp-overview-title"
                sans={OVERVIEW.sans}
                accent={OVERVIEW.accent}
                plain
              />
            </Reveal>
            <Reveal className={styles.ledeWrap} delay={90}>
              <p className={styles.lede}>
                <RichText parts={OVERVIEW.lede} />
              </p>
            </Reveal>
          </div>
          <Reveal variant="mask" className={styles.media}>
            <div className={styles.diagram}>
              <Slot id="G1" caption={OVERVIEW.mediaCaption} />
            </div>
          </Reveal>
        </div>

        <Reveal as="ul" className={styles.cards} stagger={100}>
          {OVERVIEW.cards.map((card) => (
            <li className={styles.card} key={card.title}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </li>
          ))}
        </Reveal>

        <Reveal as="article" className={styles.terms} aria-labelledby="sp-terms-title" delay={100}>
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
        </Reveal>
      </div>
    </section>
  );
}
