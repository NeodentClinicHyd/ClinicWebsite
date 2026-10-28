import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ILLUSTRATION_NOTE, OPTIONS } from "@/lib/smile-design-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { Slot } from "./SmileSlot";
import styles from "./SmileOptions.module.css";

/* 4. Whitening, bonding, veneers and straightening, compared (dark,
   patterned). THE ANGLE SECTION.
   Pattern: the implants options comparison (treatment-atlas ground, equal
   paper cards with identical structure: scene, name, "what it does", "worth
   knowing"). Five cards on a 6-column grid: the top three span two columns
   (vertical cards sharing rows by subgrid, so frames, names and both text
   blocks line up exactly), the bottom two span three columns (the same
   parts, laid out beside the scene). A red-edged strip closes the section
   with the one question to ask. No option is marked as carried out at
   Neodent: that is confirmed at the consultation. */
export function SmileOptions() {
  return (
    <section className={styles.section} aria-labelledby="sd-options-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="sd-options-title"
          sans={OPTIONS.sans}
          accent={OPTIONS.accent}
          tone="dark"
        >
          <p className="section-lede section-lede--on-dark">{OPTIONS.intro}</p>
        </SectionHeader>

        <div className={styles.grid}>
          {OPTIONS.cards.map((card, index) => (
            <article
              key={card.slot}
              className={`${styles.card} ${index < 3 ? styles.top : styles.bottom}`}
              aria-labelledby={`sd-option-${card.slot}`}
            >
              <Slot id={card.slot} className={styles.frame} />
              <div className={styles.head}>
                <h3 id={`sd-option-${card.slot}`} className={styles.name}>
                  {card.name}
                </h3>
                {card.link ? (
                  <Link className={styles.link} href={card.link.href}>
                    {card.link.label}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
              <div className={styles.block}>
                <p className={styles.blockLabel}>{OPTIONS.doesLabel}</p>
                <p className={styles.blockText}>{card.does}</p>
              </div>
              <div className={`${styles.block} ${styles.know}`}>
                <p className={styles.blockLabel}>{OPTIONS.knowLabel}</p>
                <p className={styles.blockText}>{card.know}</p>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.figNote}>{ILLUSTRATION_NOTE}</p>

        <p className={styles.closing}>{OPTIONS.closing}</p>
      </div>
    </section>
  );
}
