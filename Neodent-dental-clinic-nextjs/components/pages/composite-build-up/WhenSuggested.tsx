import { Reveal } from "@/components/motion/Reveal";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { WHEN } from "@/lib/composite-build-up-page";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./WhenSuggested.module.css";

/* 3. When might your dentist suggest one? (ivory). Plan 4.3.
   Four equal paper cards in a 2 x 2 grid, each a square scene (C2a-d) capped
   at min(22dvh, 190px) beside its title and line, so every card is filled by
   its content and the illustrations stay small. The soft red strip closes the
   section at full width. On phones each card is a compact row (illustration
   about 96 px). Words, labels and the caption are those of the previous
   section (CbuWhen). */
export function WhenSuggested() {
  return (
    <section className={styles.section} aria-labelledby="cbu-when-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="cbu-when-title" sans={WHEN.sans} accent={WHEN.accent} plain>
            <p className="section-lede">{WHEN.intro}</p>
          </SectionHeader>
        </Reveal>

        <Reveal as="ul" className={styles.cards} stagger={90}>
          {WHEN.cards.map((card) => (
            <li className={styles.card} key={card.slot}>
              <Slot id={card.slot} className={styles.frame} />
              <div className={styles.body}>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.text}>{card.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <Reveal delay={80}>
          <p className={styles.strip}>{WHEN.strip}</p>
        </Reveal>
      </div>
    </section>
  );
}
