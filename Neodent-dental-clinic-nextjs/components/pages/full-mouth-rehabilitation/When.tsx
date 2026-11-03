import { WHEN } from "@/lib/full-mouth-rehabilitation-page";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./Slot";
import styles from "./When.module.css";

/* When might it be discussed? (ivory)
   Four paper cards in a 2 x 2 grid. On desktop each card is a subgrid of
   the list (illustration | title | text) so the two titles and the two
   first text lines in a row share a baseline. On phones the cards are
   compact rows (illustration about 112 px at the left, text at the
   right), never four large illustrations stacked. A tinted strip closes
   the section with the "an examination decides" line. */
export function When() {
  return (
    <section className={styles.section} aria-labelledby="fmr-when-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="fmr-when-title" sans={WHEN.sans} accent={WHEN.accent} plain>
            <p className="section-lede">
              <RichText parts={WHEN.intro} />
            </p>
          </SectionHeader>
        </Reveal>

        <Reveal as="ul" className={styles.cards} stagger={100}>
          {WHEN.cards.map((card) => (
            <li className={styles.card} key={card.slot}>
              <Slot id={card.slot} className={styles.frame} />
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.text}>{card.text}</p>
            </li>
          ))}
        </Reveal>

        <Reveal as="p" className={styles.foot} delay={80}>
          {WHEN.foot}
        </Reveal>
      </div>
    </section>
  );
}
