import { READERS } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import { SwipeRow } from "./SwipeRow";
import styles from "./WhoIsItFor.module.css";

/* 6. Braces for adults, teenagers and parents (ivory). Plan 4.5.
   Three EQUAL cards with identical structure (icon, name, text) on shared
   rows (subgrid) from 1024 px up, so icons, names and text line up. Below
   1024 px the cards are a swipe row (cards 84 percent wide on a phone, dots,
   every card in the DOM). Icons are the 48 px tiles. */
export function WhoIsItFor() {
  return (
    <section className={styles.section} aria-labelledby="brc-readers-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="brc-readers-title"
            sans={READERS.sans}
            accent={READERS.accent}
            plain
          >
            <p className="section-lede">{READERS.intro}</p>
          </SectionHeader>
        </Reveal>

        <div className={styles.rowWrap}>
          <SwipeRow
            count={READERS.cards.length}
            label="Choose a card"
            rowClassName={styles.compare}
            stagger={100}
          >
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
          </SwipeRow>
        </div>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>
      </div>
    </section>
  );
}
