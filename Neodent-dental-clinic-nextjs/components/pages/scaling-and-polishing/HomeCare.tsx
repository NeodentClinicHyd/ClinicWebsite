import { Reveal } from "@/components/motion/Reveal";
import { HOME } from "@/lib/scaling-and-polishing-page";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import styles from "./HomeCare.module.css";

/* Looking after your gums at home (tan)
   Left: the heading, the lede and, pinned to the bottom of the column, one
   dark statement card. Right: the five care items as ONE grouped paper card
   of icon rows (G6a-e, framed at the same 48 px size as the other icon lists
   on the page). The two columns end on the same line. Plain heading. */
export function HomeCare() {
  return (
    <section className={styles.section} aria-labelledby="sp-home-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <Reveal>
              <SectionHeader titleId="sp-home-title" sans={HOME.sans} accent={HOME.accent} plain>
                <p className="section-lede">
                  <RichText parts={HOME.intro} />
                </p>
              </SectionHeader>
            </Reveal>
            <Reveal as="p" className={styles.statement} delay={120}>
              {HOME.statement}
            </Reveal>
          </div>

          <Reveal as="ul" className={styles.items} aria-label="Daily care for your gums" stagger={80}>
            {HOME.items.map((item) => (
              <li className={styles.item} key={item.slot}>
                <Slot id={item.slot} className={styles.icon} />
                <span className={styles.itemText}>{item.text}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
