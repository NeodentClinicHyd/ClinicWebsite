import { COMPARE } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./ScalingSlot";
import styles from "./ScalingCompare.module.css";

/* 4. Scale and polish, or deeper gum cleaning? (dark, patterned)
   THE ANGLE SECTION. Pattern: the implants options comparison and the FMR
   choices (treatment-atlas ground, two EQUAL paper cards with identical
   structure: scene, name, then four label-and-value rows). On wide screens
   the two cards share rows (subgrid), so the scenes, names and every row
   line up exactly. The label-and-value rows have no rules between them.
   The line under the cards is the one fact that frames both treatments;
   the red card closes the section with who decides and where. */
export function ScalingCompare() {
  const { labels } = COMPARE;

  return (
    <section className={styles.section} aria-labelledby="sp-compare-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="sp-compare-title"
          sans={COMPARE.sans}
          accent={COMPARE.accent}
          tone="dark"
        >
          <p className="section-lede section-lede--on-dark">{COMPARE.intro}</p>
        </SectionHeader>

        <div className={styles.compare}>
          {COMPARE.cards.map((card) => (
            <article
              key={card.slot}
              className={styles.card}
              aria-labelledby={`sp-compare-${card.slot}`}
            >
              <Slot id={card.slot} className={styles.frame} />
              <h3 id={`sp-compare-${card.slot}`} className={styles.name}>
                {card.name}
              </h3>
              <div className={styles.block}>
                <p className={styles.blockLabel}>{labels.purpose}</p>
                <p className={styles.blockText}>{card.purpose}</p>
              </div>
              <div className={styles.block}>
                <p className={styles.blockLabel}>{labels.who}</p>
                <p className={styles.blockText}>{card.who}</p>
              </div>
              <div className={styles.block}>
                <p className={styles.blockLabel}>{labels.visits}</p>
                <p className={styles.blockText}>{card.visits}</p>
              </div>
              <div className={styles.block}>
                <p className={styles.blockLabel}>{labels.aftercare}</p>
                <p className={styles.blockText}>{card.aftercare}</p>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.figNote}>{COMPARE.mediaCaption}</p>

        <p className={styles.line}>{COMPARE.line}</p>

        <aside className={styles.decide} aria-label="Who decides">
          <p className={styles.statement}>{COMPARE.statement}</p>
          <p className={styles.statementNote}>{COMPARE.statementNote}</p>
        </aside>
      </div>
    </section>
  );
}
