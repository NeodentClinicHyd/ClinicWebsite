import { WHEN } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./BrcSlot";
import styles from "./BrcSigns.module.css";

/* 3. Is orthodontic treatment right for me? (light)
   Pattern: RctSigns (paper cards on ivory, icon tile beside its title). Order:
   heading and one line, the soft red strip, three icon tiles (B2a-c, titles
   only), then a matched pair of paper cards. */
export function BrcSigns() {
  return (
    <section className={styles.section} aria-labelledby="brc-signs-title">
      <div className={styles.container}>
        <SectionHeader titleId="brc-signs-title" sans={WHEN.sans} accent={WHEN.accent}>
          <p className="section-lede">{WHEN.intro}</p>
        </SectionHeader>

        <p className={styles.strip}>{WHEN.strip}</p>

        <ul className={styles.cards}>
          {WHEN.cards.map((card) => (
            <li className={styles.card} key={card.slot}>
              <Slot id={card.slot} />
              <h3 className={styles.title}>{card.title}</h3>
            </li>
          ))}
        </ul>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <div className={styles.pair}>
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
        </div>
      </div>
    </section>
  );
}
