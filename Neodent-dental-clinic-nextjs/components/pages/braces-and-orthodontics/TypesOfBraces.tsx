import { BRACE_IMAGE_CAPTION, BRACE_TYPES, TYPES } from "@/lib/braces-orthodontics-page";
import { ILLUSTRATION_NOTE } from "@/components/treatments/dental-implants/ImplantIllustrations";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { Slot } from "./Slot";
import { TypeTabs } from "./TypeTabs";
import styles from "./TypesOfBraces.module.css";

/* 4. Types of braces and appliances (dark). Plan 4.4.
   Header (the red-italic accent stays here), the intro and the fixed/removable
   line, the selector (TypeTabs), the assessment question strip, "Other
   appliances you may hear about" as two compact cards, and the red band.
   Dark band recipe 3.6: charcoal gradient, a red glow, and the icon pattern
   as a luminance mask over an ivory fill that fades to zero before the text
   column (768 px and wider only). */
export function TypesOfBraces() {
  return (
    <section className={styles.section} aria-labelledby="brc-types-title">
      <svg className={styles.filterDefs} width="0" height="0" focusable="false" aria-hidden="true">
        <filter id="brc-types-pattern-levels" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3.5 -0.5"
          />
        </filter>
      </svg>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.glow} />
        <span className={styles.pattern}>
          <span className={styles.tile} />
        </span>
      </div>

      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="brc-types-title"
            sans={TYPES.sans}
            accent={TYPES.accent}
            tone="dark"
          >
            <p className="section-lede section-lede--on-dark">{TYPES.intro}</p>
          </SectionHeader>
          <p className={styles.fixedLine}>{TYPES.fixedLine}</p>
        </Reveal>

        <Reveal className={styles.tabsWrap} delay={80}>
          <TypeTabs types={BRACE_TYPES} label={TYPES.tablistLabel} caption={BRACE_IMAGE_CAPTION} />
        </Reveal>

        <Reveal>
          <p className={styles.strip}>{TYPES.note}</p>
        </Reveal>

        <Reveal>
          <h3 className={styles.otherTitle}>{TYPES.otherTitle}</h3>
        </Reveal>
        <Reveal as="ul" stagger={100} className={styles.others}>
          {TYPES.cards.map((card) => (
            <li key={card.slot} className={styles.card}>
              <Slot id={card.slot} className={styles.frame} />
              <div className={styles.body}>
                <h4 className={styles.name}>{card.name}</h4>
                <p className={styles.text}>{card.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
        <p className={styles.figureNote}>{ILLUSTRATION_NOTE}</p>

        <Reveal className={styles.which}>
          <h3 className={styles.whichTitle}>{TYPES.whichTitle}</h3>
          <p className={styles.whichText}>{TYPES.whichText}</p>
        </Reveal>
      </div>
    </section>
  );
}
