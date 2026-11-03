import { Reveal } from "@/components/motion/Reveal";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { MATERIALS } from "@/lib/composite-build-up-page";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import { SwipeRow } from "./SwipeRow";
import styles from "./Materials.module.css";

/* 4. Composite, amalgam and other materials (dark, patterned). Plan 4.4.
   The angle section. Four equal paper cards with identical structure: a short
   wide scene (C3a-d, capped at min(22dvh, 190px) tall), the material name,
   then two label-and-value rows ("What it is", "Main trade-off") inside the
   card. On wide screens the cards share rows (subgrid) so frames, names and
   both rows line up and the four trade-off boxes are one height. On phones the
   row is a swipe row (cards 84% wide, progress dots). Beneath: the page's red
   statement. The heading keeps the red accent line. Words, labels and the
   caption are those of the previous section (CbuMaterials). */
export function Materials() {
  return (
    <section className={styles.section} aria-labelledby="cbu-materials-title">
      <span className={styles.pattern} aria-hidden="true" />
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="cbu-materials-title"
            sans={MATERIALS.sans}
            accent={MATERIALS.accent}
            tone="dark"
          >
            <p className="section-lede section-lede--on-dark">{MATERIALS.intro}</p>
          </SectionHeader>
        </Reveal>

        <SwipeRow
          count={MATERIALS.cards.length}
          label="Choose a material"
          rowClassName={styles.compare}
          stagger={90}
          tone="dark"
          scrollBelow="phone"
        >
          {MATERIALS.cards.map((card) => (
            <article
              key={card.slot}
              className={styles.card}
              aria-labelledby={`cbu-material-${card.slot}`}
            >
              <div className={styles.ill}>
                <Slot id={card.slot} ratio="16 / 9" />
              </div>
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
        </SwipeRow>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <Reveal className={styles.statement} delay={80}>
          <p className={styles.statementLead}>{MATERIALS.statementLead}</p>
          <p className={styles.statementText}>{MATERIALS.statementText}</p>
        </Reveal>
      </div>
    </section>
  );
}
