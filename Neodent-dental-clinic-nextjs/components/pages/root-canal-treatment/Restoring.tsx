import { Reveal } from "@/components/motion/Reveal";
import { RESTORE } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Restoring.module.css";

/* Why the tooth usually needs a filling or crown (ivory)
   Two equal-height cards side by side (decision D5), each with its scene
   capped at min(22dvh, 190px) beside the title and text; compact rows with
   a 96 px scene on phones, so two tall illustrations never stack. The hedge
   note keeps the overview's red left rule. Plain heading. */
export function Restoring() {
  return (
    <section className={styles.section} aria-labelledby="rct-restoring-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="rct-restoring-title"
            sans={RESTORE.sans}
            accent={RESTORE.accent}
            plain
          >
            <p className="section-lede">{RESTORE.intro}</p>
          </SectionHeader>
        </Reveal>

        <Reveal className={styles.cards} stagger={100}>
          {RESTORE.cards.map((card) => (
            <article
              className={styles.card}
              key={card.slot}
              aria-labelledby={`rct-restore-${card.slot}`}
            >
              <Slot id={card.slot} fill />
              <h3 id={`rct-restore-${card.slot}`} className={styles.cardTitle}>
                {card.title}
              </h3>
              <p className={styles.cardText}>{card.text}</p>
            </article>
          ))}
        </Reveal>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <Reveal as="p" className={styles.note} delay={80}>
          {RESTORE.note}
        </Reveal>
      </div>
    </section>
  );
}
