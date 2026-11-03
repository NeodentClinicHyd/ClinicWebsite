import { Reveal } from "@/components/motion/Reveal";
import { ILLUSTRATION_NOTE, WHEN } from "@/lib/smile-design-page";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./When.module.css";

/* Why people ask about it (ivory). Four concern cards in a 2 x 2 grid, each a
   scene (SD2a-d, capped at min(22dvh, 190px)) beside its title and line; titles
   reserve two lines so the first text lines share baselines across a row. On
   phones the cards are compact rows (illustration about 96 px at the left).
   A tinted strip carries the "an examination decides" line. Below it, a
   matched pair: the health card (closing on the tinted footer strip) and the
   check card (what a dentist may look at; icons SD3a-d). */
export function When() {
  const { health, check } = WHEN;

  return (
    <section className={styles.section} aria-labelledby="sd-when-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="sd-when-title" sans={WHEN.sans} accent={WHEN.accent} plain>
            <p className="section-lede">{WHEN.intro}</p>
          </SectionHeader>
        </Reveal>

        <Reveal as="ul" className={styles.cards} stagger={100}>
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

        <p className={styles.figNote}>{ILLUSTRATION_NOTE}</p>

        <Reveal>
          <p className={styles.note}>{WHEN.note}</p>
        </Reveal>

        <Reveal as="div" className={styles.pair} stagger={100}>
          <article className={`${styles.pairCard} ${styles.health}`} aria-labelledby="sd-health-title">
            <h3 id="sd-health-title" className={styles.pairTitle}>
              {health.title}
            </h3>
            <p className={styles.pairText}>{health.text}</p>
            <p className={styles.pairFoot}>{health.foot}</p>
          </article>

          <article className={styles.pairCard} aria-labelledby="sd-check-title">
            <h3 id="sd-check-title" className={styles.pairTitle}>
              {check.title}
            </h3>
            <ul className={styles.checkList}>
              {check.items.map((item) => (
                <li className={styles.checkRow} key={item.text}>
                  {item.slots.length > 0 ? (
                    <span className={styles.icons}>
                      {item.slots.map((slot) => (
                        <Slot id={slot} key={slot} />
                      ))}
                    </span>
                  ) : (
                    <span className={`${styles.icons} ${styles.noIcons}`} aria-hidden="true" />
                  )}
                  <span className={styles.checkText}>{item.text}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
