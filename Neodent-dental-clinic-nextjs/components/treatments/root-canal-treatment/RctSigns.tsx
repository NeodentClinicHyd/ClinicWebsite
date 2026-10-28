import { WHEN } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./RctSlot";
import styles from "./RctSigns.module.css";

/* 3. Signs a tooth should be checked (light)
   Pattern: FmrWhen (paper cards on ivory, scene beside its title and line)
   with the implants six-tile grid. Order: heading and one line, the soft red
   strip ("these signs alone do not confirm"), six sign cards (icons R2a-f),
   then a matched pair of paper cards. */
export function RctSigns() {
  return (
    <section className={styles.section} aria-labelledby="rct-signs-title">
      <div className={styles.container}>
        <SectionHeader titleId="rct-signs-title" sans={WHEN.sans} accent={WHEN.accent}>
          <p className="section-lede">{WHEN.intro}</p>
        </SectionHeader>

        <p className={styles.strip}>{WHEN.strip}</p>

        <ul className={styles.cards}>
          {WHEN.cards.map((card) => (
            <li className={styles.card} key={card.slot}>
              <Slot id={card.slot} />
              <div className={styles.body}>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.text}>{card.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <div className={styles.pair}>
          {WHEN.pair.map((card, index) => (
            <article
              className={styles.pairCard}
              key={card.title}
              aria-labelledby={`rct-signs-pair-${index}`}
            >
              <h3 id={`rct-signs-pair-${index}`} className={styles.pairTitle}>
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
