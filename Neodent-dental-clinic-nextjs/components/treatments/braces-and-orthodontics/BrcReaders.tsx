import { READERS } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./BrcSlot";
import styles from "./BrcReaders.module.css";

/* 6. Braces for adults, teenagers and parents (light)
   Pattern: FmrChoices. Three EQUAL cards with identical structure (icon,
   name, text), each with the red top edge. On wide screens the cards share
   rows (subgrid) so names and text line up. The icons (B6a-c) are the
   48px tiles used on the signs section, not icon-in-circle badges. */
export function BrcReaders() {
  return (
    <section className={styles.section} aria-labelledby="brc-readers-title">
      <div className={styles.container}>
        <SectionHeader titleId="brc-readers-title" sans={READERS.sans} accent={READERS.accent}>
          <p className="section-lede">{READERS.intro}</p>
        </SectionHeader>

        <div className={styles.compare}>
          {READERS.cards.map((card) => (
            <article
              key={card.slot}
              className={styles.card}
              aria-labelledby={`brc-reader-${card.slot}`}
            >
              <Slot id={card.slot} className={styles.icon} />
              <h3 id={`brc-reader-${card.slot}`} className={styles.name}>
                {card.name}
              </h3>
              <p className={styles.text}>{card.text}</p>
            </article>
          ))}
        </div>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>
      </div>
    </section>
  );
}
