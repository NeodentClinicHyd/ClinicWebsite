import { HOME } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import { Slot } from "./ScalingSlot";
import styles from "./ScalingHomeCare.module.css";

/* 8. Looking after your gums at home (tan)
   Own composition. Left: the heading, the pack lede and, pinned to the
   bottom of the column, one dark statement card (the home dark card).
   Right: the five care items as ONE grouped paper card of icon rows
   (G6a-e). The two columns end on the same line. */
export function ScalingHomeCare() {
  return (
    <section className={styles.section} aria-labelledby="sp-home-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <SectionHeader titleId="sp-home-title" sans={HOME.sans} accent={HOME.accent}>
              <p className="section-lede">
                <RichText parts={HOME.intro} />
              </p>
            </SectionHeader>
            <p className={styles.statement}>{HOME.statement}</p>
          </div>

          <ul className={styles.items} aria-label="Daily care for your gums">
            {HOME.items.map((item) => (
              <li className={styles.item} key={item.slot}>
                <Slot id={item.slot} />
                <span className={styles.itemText}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
