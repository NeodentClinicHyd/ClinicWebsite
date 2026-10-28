import { CHOICES } from "@/lib/full-mouth-rehabilitation-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./FmrSlot";
import styles from "./FmrChoices.module.css";

/* 6. Choosing how to treat many teeth (light)
   Pattern: the implants comparison cards. Three EQUAL cards with identical
   structure (scene, name, what it involves, worth knowing); the phased-plan
   card is told apart by a red top edge only. On wide screens the cards share
   rows (subgrid) so frames, names and both text blocks line up exactly. */
export function FmrChoices() {
  return (
    <section className={styles.section} aria-labelledby="fmr-choices-title">
      <div className={styles.container}>
        <SectionHeader titleId="fmr-choices-title" sans={CHOICES.sans} accent={CHOICES.accent}>
          <p className="section-lede">
            <RichText parts={CHOICES.intro} />
          </p>
        </SectionHeader>

        <div className={styles.compare}>
          {CHOICES.options.map((option) => (
            <article
              key={option.slot}
              className={`${styles.card} ${option.featured ? styles.featured : ""}`}
              aria-labelledby={`fmr-choice-${option.slot}`}
            >
              <Slot id={option.slot} className={styles.frame} />
              <h3 id={`fmr-choice-${option.slot}`} className={styles.name}>
                {option.name}
              </h3>
              <div className={styles.block}>
                <p className={styles.blockLabel}>{CHOICES.involvesLabel}</p>
                <p className={styles.blockText}>{option.involves}</p>
              </div>
              <div className={`${styles.block} ${styles.know}`}>
                <p className={styles.blockLabel}>{CHOICES.knowLabel}</p>
                <p className={styles.blockText}>{option.know}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
