import { Reveal } from "@/components/motion/Reveal";
import { UNDONE } from "@/lib/smile-design-page";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./Undone.module.css";

/* What can be undone, and what cannot (ivory). Left: the cross-section scene
   (SD7) in a paper card, capped at min(46dvh, 440px) and centred with its
   caption, over the red "Ask your dentist" card. Right: three grouped paper
   cards at equal height, the first (the change that cannot be reversed) told
   apart by a red top edge. Reading order on tablet and phone: scene, the three
   cards, then the red card. */
export function Undone() {
  return (
    <section className={styles.section} aria-labelledby="sd-undone-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader titleId="sd-undone-title" sans={UNDONE.sans} accent={UNDONE.accent} plain>
            <p className="section-lede">{UNDONE.intro}</p>
          </SectionHeader>
        </Reveal>

        <div className={styles.layout}>
          <div className={styles.left}>
            <Reveal variant="mask" className={styles.scene}>
              <div className={styles.sceneCard}>
                <div className={styles.diagram}>
                  <Slot id="SD7" caption={UNDONE.mediaCaption} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} className={styles.askWrap}>
              <aside className={styles.ask} aria-labelledby="sd-ask-title">
                <h3 id="sd-ask-title" className={styles.askTitle}>
                  {UNDONE.askTitle}
                </h3>
                <p className={styles.askText}>{UNDONE.ask}</p>
              </aside>
            </Reveal>
          </div>

          <Reveal as="ul" className={styles.cards} stagger={110}>
            {UNDONE.cards.map((card) => (
              <li
                className={`${styles.card} ${card.featured ? styles.featured : ""}`}
                key={card.title}
              >
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.text}>{card.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
