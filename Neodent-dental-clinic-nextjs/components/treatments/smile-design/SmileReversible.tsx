import { UNDONE } from "@/lib/smile-design-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./SmileSlot";
import styles from "./SmileReversible.module.css";

/* 6. What can be undone, and what cannot (light)
   Pattern: the full mouth rehabilitation "when" layout language (paper
   cards, tinted ground, red dash). Left: the cross-section scene (SD7, the
   dominant element) over the red "Ask your dentist" card. Right: three
   grouped paper cards, the first one (the change that cannot be reversed)
   told apart by a red top edge. */
export function SmileReversible() {
  return (
    <section className={styles.section} aria-labelledby="sd-undone-title">
      <div className={styles.container}>
        <SectionHeader titleId="sd-undone-title" sans={UNDONE.sans} accent={UNDONE.accent}>
          <p className="section-lede">{UNDONE.intro}</p>
        </SectionHeader>

        <div className={styles.layout}>
          <div className={styles.left}>
            <div className={styles.scene}>
              <Slot id="SD7" caption={UNDONE.mediaCaption} />
            </div>
            <aside className={styles.ask} aria-labelledby="sd-ask-title">
              <h3 id="sd-ask-title" className={styles.askTitle}>
                {UNDONE.askTitle}
              </h3>
              <p className={styles.askText}>{UNDONE.ask}</p>
            </aside>
          </div>

          <ul className={styles.cards}>
            {UNDONE.cards.map((card) => (
              <li
                className={`${styles.card} ${card.featured ? styles.featured : ""}`}
                key={card.title}
              >
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.text}>{card.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
