import { WHEN } from "@/lib/composite-build-up-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./CbuSlot";
import styles from "./CbuWhen.module.css";

/* 3. When might your dentist suggest one? (light)
   Pattern: FmrWhen ("When might it be discussed?"). Dominant element: four
   equal paper cards in a 2 x 2 grid, each a square scene (C2a-d) beside its
   title and line. The soft red strip closes the section with the "book an
   assessment" line (the root canal signs strip). */
export function CbuWhen() {
  return (
    <section className={styles.section} aria-labelledby="cbu-when-title">
      <div className={styles.container}>
        <SectionHeader titleId="cbu-when-title" sans={WHEN.sans} accent={WHEN.accent}>
          <p className="section-lede">{WHEN.intro}</p>
        </SectionHeader>

        <ul className={styles.cards}>
          {WHEN.cards.map((card) => (
            <li className={styles.card} key={card.slot}>
              <Slot id={card.slot} className={styles.frame} />
              <div className={styles.body}>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.text}>{card.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <p className={styles.strip}>{WHEN.strip}</p>
      </div>
    </section>
  );
}
