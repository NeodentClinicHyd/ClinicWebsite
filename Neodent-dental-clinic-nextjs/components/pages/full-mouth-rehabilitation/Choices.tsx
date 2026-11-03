import { CHOICES } from "@/lib/full-mouth-rehabilitation-page";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./Slot";
import { SwipeRow } from "./SwipeRow";
import styles from "./Choices.module.css";

/* Choosing how to treat many teeth (ivory).
   Three EQUAL cards with identical structure (scene, name, what it
   involves, worth knowing); the phased-plan card is told apart by a red top
   edge only. Desktop: the cards share four rows (subgrid), so frames,
   names and both text blocks line up exactly. Below 1024 px: one swipe row
   with dots (cards 46% wide on a tablet, 84% on a phone), illustrations
   capped at min(18dvh, 150px). */
export function Choices() {
  return (
    <section className={styles.section} aria-labelledby="fmr-choices-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="fmr-choices-title"
            sans={CHOICES.sans}
            accent={CHOICES.accent}
            plain
          >
            <p className="section-lede">
              <RichText parts={CHOICES.intro} />
            </p>
          </SectionHeader>
        </Reveal>

        <div className={styles.rowWrap}>
          <SwipeRow
            count={CHOICES.options.length}
            label="Choose an approach"
            rowClassName={styles.compare}
            stagger={100}
          >
            {CHOICES.options.map((option) => (
              <article
                key={option.slot}
                className={`${styles.card} ${option.featured ? styles.featured : ""}`}
                aria-labelledby={`fmr-choice-${option.slot}`}
              >
                <div className={styles.media}>
                  <Slot id={option.slot} ratio="fill" />
                </div>
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
          </SwipeRow>
        </div>
      </div>
    </section>
  );
}
