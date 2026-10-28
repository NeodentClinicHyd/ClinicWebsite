import { RESTORE } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./RctSlot";
import styles from "./RctRestoring.module.css";

/* 6. Why the tooth usually needs a filling or crown (light)
   A new section. Pattern: the implants overview's matched pair (same
   padding, radius and heading size), each card carrying its scene (R5a, R5b)
   above the title and text, and the hedge note below, with the overview's
   red left rule. */
export function RctRestoring() {
  return (
    <section className={styles.section} aria-labelledby="rct-restoring-title">
      <div className={styles.container}>
        <SectionHeader titleId="rct-restoring-title" sans={RESTORE.sans} accent={RESTORE.accent}>
          <p className="section-lede">{RESTORE.intro}</p>
        </SectionHeader>

        <div className={styles.cards}>
          {RESTORE.cards.map((card) => (
            <article
              className={styles.card}
              key={card.slot}
              aria-labelledby={`rct-restore-${card.slot}`}
            >
              <Slot id={card.slot} />
              <h3 id={`rct-restore-${card.slot}`} className={styles.cardTitle}>
                {card.title}
              </h3>
              <p className={styles.cardText}>{card.text}</p>
            </article>
          ))}
        </div>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <p className={styles.note}>{RESTORE.note}</p>
      </div>
    </section>
  );
}
