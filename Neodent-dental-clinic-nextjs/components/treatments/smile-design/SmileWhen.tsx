import { ILLUSTRATION_NOTE, WHEN } from "@/lib/smile-design-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./SmileSlot";
import styles from "./SmileWhen.module.css";

/* 3. Why people ask about it (light)
   Pattern: the full mouth rehabilitation "when" section. Four paper cards in
   a 2 x 2 grid, each a scene (SD2a-d) beside its title and line, so the
   reasons read as pictures first. A tinted strip carries the "an examination
   decides" line. Below it, the matched pair from the implants overview:
   same height, padding, radius and heading size; the health card closes on
   the tinted footer strip, the check card lists what a dentist may look at
   (icons SD3a-d). */
export function SmileWhen() {
  const { health, check } = WHEN;

  return (
    <section className={styles.section} aria-labelledby="sd-when-title">
      <div className={styles.container}>
        <SectionHeader titleId="sd-when-title" sans={WHEN.sans} accent={WHEN.accent}>
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

        <p className={styles.figNote}>{ILLUSTRATION_NOTE}</p>

        <p className={styles.note}>{WHEN.note}</p>

        <div className={styles.pair}>
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
        </div>
      </div>
    </section>
  );
}
