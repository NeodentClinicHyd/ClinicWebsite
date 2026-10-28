import { MATERIALS } from "@/lib/composite-build-up-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./CbuSlot";
import styles from "./CbuMaterials.module.css";

/* 4. Composite, amalgam and other materials (dark, patterned)
   The ANGLE section. Pattern: the implants "bridges and dentures"
   comparison / RctOptions. Four EQUAL paper cards with identical structure:
   a scene at identical scale (C3a-d), the material name, then two
   label-and-value rows ("What it is", "Main trade-off") inside the card, not
   a table. On wide screens the cards share rows (subgrid) so frames, names
   and both rows line up. Beneath: the page's red statement card. */
export function CbuMaterials() {
  return (
    <section className={styles.section} aria-labelledby="cbu-materials-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="cbu-materials-title"
          sans={MATERIALS.sans}
          accent={MATERIALS.accent}
          tone="dark"
        >
          <p className="section-lede section-lede--on-dark">{MATERIALS.intro}</p>
        </SectionHeader>

        <div className={styles.compare}>
          {MATERIALS.cards.map((card) => (
            <article
              key={card.slot}
              className={styles.card}
              aria-labelledby={`cbu-material-${card.slot}`}
            >
              <Slot id={card.slot} className={styles.frame} />
              <h3 id={`cbu-material-${card.slot}`} className={styles.name}>
                {card.name}
              </h3>
              <dl className={styles.rows}>
                <div className={styles.row}>
                  <dt className={styles.label}>{MATERIALS.whatLabel}</dt>
                  <dd className={styles.value}>{card.what}</dd>
                </div>
                <div className={`${styles.row} ${styles.trade}`}>
                  <dt className={styles.label}>{MATERIALS.tradeLabel}</dt>
                  <dd className={styles.value}>{card.trade}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <div className={styles.statement}>
          <p className={styles.statementLead}>{MATERIALS.statementLead}</p>
          <p className={styles.statementText}>{MATERIALS.statementText}</p>
        </div>
      </div>
    </section>
  );
}
