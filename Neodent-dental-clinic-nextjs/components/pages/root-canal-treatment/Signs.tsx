import { Reveal } from "@/components/motion/Reveal";
import { WHEN } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Signs.module.css";

/* Signs a tooth should be checked (ivory)
   Heading and one line, the soft red strip ("these signs alone do not
   confirm"), six sign cards (icons R2a to R2f, one icon size), then a
   matched pair of paper cards. Plain heading. */
export function Signs() {
  return (
    <section className={styles.section} aria-labelledby="rct-signs-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="rct-signs-title" sans={WHEN.sans} accent={WHEN.accent} plain>
            <p className="section-lede">{WHEN.intro}</p>
          </SectionHeader>
        </Reveal>

        <Reveal as="p" className={styles.strip} delay={90}>
          {WHEN.strip}
        </Reveal>

        <Reveal as="ul" className={styles.cards} stagger={80}>
          {WHEN.cards.map((card) => (
            <li className={styles.card} key={card.slot}>
              <Slot id={card.slot} />
              <div className={styles.body}>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.text}>{card.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <Reveal className={styles.pair} stagger={100}>
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
        </Reveal>
      </div>
    </section>
  );
}
