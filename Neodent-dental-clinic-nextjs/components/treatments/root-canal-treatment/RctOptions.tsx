import { OPTIONS } from "@/lib/root-canal-treatment-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { LinkedText } from "./LinkedText";
import { RichText } from "./RichText";
import { Slot } from "./RctSlot";
import styles from "./RctOptions.module.css";

/* 4. Root canal treatment and the alternatives (dark, patterned)
   Pattern: the implants options section / FmrChoices. Three EQUAL cards with
   identical structure (scene, name, one text block); the first is told
   apart by a red top edge only. On wide screens the cards share rows
   (subgrid) so frames, names and text line up. Beneath: the red card from
   FmrInclude's closing note, as a wide two-part band ("what if you do not
   treat it?"). */
export function RctOptions() {
  return (
    <section className={styles.section} aria-labelledby="rct-options-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="rct-options-title"
          sans={OPTIONS.sans}
          accent={OPTIONS.accent}
          tone="dark"
        >
          <p className="section-lede section-lede--on-dark">
            <RichText parts={OPTIONS.intro} onDark />
          </p>
        </SectionHeader>

        <div className={styles.compare}>
          {OPTIONS.cards.map((card) => (
            <article
              key={card.slot}
              className={`${styles.card} ${card.featured ? styles.featured : ""}`}
              aria-labelledby={`rct-option-${card.slot}`}
            >
              <Slot id={card.slot} className={styles.frame} />
              <h3 id={`rct-option-${card.slot}`} className={styles.name}>
                {card.name}
              </h3>
              <p className={styles.text}>
                <LinkedText text={card.text} links={card.links} linkClassName={styles.link} />
              </p>
            </article>
          ))}
        </div>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <div className={styles.wait}>
          <h3 className={styles.waitTitle}>{OPTIONS.waitTitle}</h3>
          <p className={styles.waitText}>{OPTIONS.waitText}</p>
        </div>
      </div>
    </section>
  );
}
