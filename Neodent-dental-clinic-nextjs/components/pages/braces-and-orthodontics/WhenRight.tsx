import { WHEN } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./WhenRight.module.css";

/* 3. Is orthodontic treatment right for me? (ivory). Plan 4.3.
   Heading and one line, the soft red strip at the full content width, three
   equal icon cards in one row (icons one size), the caption, then the matched
   pair of cards in unequal widths so the line counts match and neither card
   is more than 35% empty. On a phone the icon cards are compact rows. */
export function WhenRight() {
  return (
    <section className={styles.section} aria-labelledby="brc-signs-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="brc-signs-title" sans={WHEN.sans} accent={WHEN.accent} plain>
            <p className="section-lede">{WHEN.intro}</p>
          </SectionHeader>
        </Reveal>

        <Reveal className={styles.stripWrap} delay={80}>
          <p className={styles.strip}>{WHEN.strip}</p>
        </Reveal>

        <Reveal as="ul" stagger={100} className={styles.cards}>
          {WHEN.cards.map((card) => (
            <li className={styles.card} key={card.slot}>
              <Slot id={card.slot} />
              <h3 className={styles.title}>{card.title}</h3>
            </li>
          ))}
        </Reveal>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <Reveal className={styles.pair} stagger={100}>
          {WHEN.pair.map((card, index) => (
            <article
              className={styles.pairCard}
              key={card.title}
              aria-labelledby={`brc-signs-pair-${index}`}
            >
              <h3 id={`brc-signs-pair-${index}`} className={styles.pairTitle}>
                {card.title}
              </h3>
              <p className={styles.pairText}>{card.text}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
