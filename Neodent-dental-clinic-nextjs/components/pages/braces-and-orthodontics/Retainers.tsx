import { RETAINERS } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import { SwipeRow } from "./SwipeRow";
import styles from "./Retainers.module.css";

/* 8. Retainers and keeping the result (tan). Plan 4.6.
   Two equal cards, each with its scene beside the title and text (scene at
   most min(22dvh, 190px) tall), and the check-up note directly beneath at full
   width with the red left rule. Below 1024 px the two cards are a swipe row
   (84 percent wide on a phone, dots, scene above the text at most
   min(18dvh, 150px) tall). */
export function Retainers() {
  return (
    <section className={styles.section} aria-labelledby="brc-retainers-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="brc-retainers-title"
            sans={RETAINERS.sans}
            accent={RETAINERS.accent}
            plain
          >
            <p className="section-lede">{RETAINERS.intro}</p>
          </SectionHeader>
        </Reveal>

        <div className={styles.rowWrap}>
          <SwipeRow
            count={RETAINERS.cards.length}
            label="Choose a retainer card"
            rowClassName={styles.cards}
            stagger={100}
          >
            {RETAINERS.cards.map((card) => (
              <article
                className={styles.card}
                key={card.slot}
                aria-labelledby={`brc-retainer-${card.slot}`}
              >
                <Slot id={card.slot} className={styles.frame} />
                <div className={styles.body}>
                  <h3 id={`brc-retainer-${card.slot}`} className={styles.cardTitle}>
                    {card.title}
                  </h3>
                  <p className={styles.cardText}>{card.text}</p>
                </div>
              </article>
            ))}
          </SwipeRow>
        </div>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <Reveal delay={80}>
          <p className={styles.note}>{RETAINERS.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
