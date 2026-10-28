import { BRACE_IMAGE_CAPTION, BRACE_TYPES, TYPES } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./BrcSlot";
import { BrcTypeTabs } from "./BrcTypeTabs";
import styles from "./BrcTypes.module.css";

/* 4. Types of braces and appliances (dark, patterned)
   Build 3. Header, then the selector (BrcTypeTabs: four image tiles and the
   panel for the selected type), the assessment question strip, the two
   "other appliances" cards (B3b, B3c) and the red band ("which appliance is
   right for you?"). The section stays dark patterned so the page's
   backgrounds still alternate. This component only passes data in; the
   interactive part is the small client component. */
export function BrcTypes() {
  return (
    <section className={styles.section} aria-labelledby="brc-types-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="brc-types-title"
          sans={TYPES.sans}
          accent={TYPES.accent}
          tone="dark"
        >
          <p className="section-lede section-lede--on-dark">{TYPES.intro}</p>
        </SectionHeader>
        <p className={styles.fixedLine}>{TYPES.fixedLine}</p>

        <BrcTypeTabs
          types={BRACE_TYPES}
          label={TYPES.tablistLabel}
          caption={BRACE_IMAGE_CAPTION}
        />

        <p className={styles.strip}>{TYPES.note}</p>

        <h3 className={styles.otherTitle}>{TYPES.otherTitle}</h3>
        <ul className={styles.others}>
          {TYPES.cards.map((card) => (
            <li key={card.slot} className={styles.card}>
              <Slot id={card.slot} className={styles.frame} />
              <div className={styles.body}>
                <h4 className={styles.name}>{card.name}</h4>
                <p className={styles.text}>{card.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <div className={styles.which}>
          <h3 className={styles.whichTitle}>{TYPES.whichTitle}</h3>
          <p className={styles.whichText}>{TYPES.whichText}</p>
        </div>
      </div>
    </section>
  );
}
