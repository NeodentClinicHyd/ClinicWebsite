import { WHEN } from "@/lib/full-mouth-rehabilitation-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./FmrSlot";
import styles from "./FmrWhen.module.css";

/* 3. When might it be discussed? (light)
   Four paper cards in a 2 x 2 grid, each a scene (M2a-d) beside its title
   and line, so the reasons read as pictures first. A tinted strip closes the
   section with the "an examination decides" line. */
export function FmrWhen() {
  return (
    <section className={styles.section} aria-labelledby="fmr-when-title">
      <div className={styles.container}>
        <SectionHeader titleId="fmr-when-title" sans={WHEN.sans} accent={WHEN.accent}>
          <p className="section-lede">
            <RichText parts={WHEN.intro} />
          </p>
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

        <p className={styles.foot}>{WHEN.foot}</p>
      </div>
    </section>
  );
}
