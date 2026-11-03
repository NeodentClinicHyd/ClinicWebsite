import { Reveal } from "@/components/motion/Reveal";
import { OVERVIEW } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "./SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./Slot";
import styles from "./Overview.module.css";

/* What is root canal treatment? (beige)
   Left: heading, a larger lede and the three ideas as a stack of paper
   cards. Right: the tooth cross-section (capped at min(46dvh, 440px)) over
   the dark "terms you may hear" card, which takes the height left over so
   both columns end together. Plain heading (the accent stays on the page
   h1 and three other sections). */
export function Overview() {
  return (
    <section className={styles.section} aria-labelledby="rct-overview-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Reveal>
              <SectionHeader
                titleId="rct-overview-title"
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
              <Slot id="R1" caption={ILLUSTRATION_NOTE} />
            </Reveal>
            <Reveal as="article" className={styles.terms} aria-labelledby="rct-terms-title" delay={120}>
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
