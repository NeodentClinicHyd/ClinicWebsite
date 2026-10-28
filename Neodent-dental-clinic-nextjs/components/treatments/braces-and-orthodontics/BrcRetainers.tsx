import { RETAINERS } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./BrcSlot";
import styles from "./BrcRetainers.module.css";

/* 8. Retainers and keeping the result (tan)
   Pattern: RctRestoring (the implants overview's matched pair: same
   padding, radius and heading size), each card carrying its scene (B8a fixed
   retainer, B8b removable retainer) beside the title and text, and the
   check-up note below with the overview's red left rule. Tan ground here
   (RctRestoring is on ivory) so the section sits between dark care and
   either the light cases section or the dark questions section. */
export function BrcRetainers() {
  return (
    <section className={styles.section} aria-labelledby="brc-retainers-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="brc-retainers-title"
          sans={RETAINERS.sans}
          accent={RETAINERS.accent}
        >
          <p className="section-lede">{RETAINERS.intro}</p>
        </SectionHeader>

        <div className={styles.cards}>
          {RETAINERS.cards.map((card) => (
            <article
              className={styles.card}
              key={card.slot}
              aria-labelledby={`brc-retainer-${card.slot}`}
            >
              <Slot id={card.slot} />
              <h3 id={`brc-retainer-${card.slot}`} className={styles.cardTitle}>
                {card.title}
              </h3>
              <p className={styles.cardText}>{card.text}</p>
            </article>
          ))}
        </div>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <p className={styles.note}>{RETAINERS.note}</p>
      </div>
    </section>
  );
}
