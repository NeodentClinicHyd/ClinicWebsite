import { Reveal } from "@/components/motion/Reveal";
import {
  GENERAL_INFO_NOTE,
  LAST_REVIEWED,
  RELATED,
  REVIEWED_BY,
} from "@/lib/braces-orthodontics-page";
import { RelatedTreatments } from "./RelatedTreatments";
import { SectionHeader } from "./SectionHeader";
import styles from "./RelatedSection.module.css";

/* 13. Related treatments (tan). Plan 4.8. Heading left (above on phones),
   three equal-height cards in one row, and the general-information note
   directly under the row at full width, 14 px. Hrefs come from RELATED in
   lib/braces-orthodontics-page.ts. The reviewer line renders only when both
   REVIEWED_BY and LAST_REVIEWED are set (they are empty). Plain heading. */
export function RelatedSection() {
  const showReview = REVIEWED_BY !== "" && LAST_REVIEWED !== "";

  return (
    <section className={styles.section} aria-labelledby="brc-related-title">
      <div className={styles.container}>
        <div className={styles.row}>
          <Reveal className={styles.head}>
            <SectionHeader
              titleId="brc-related-title"
              sans="Related"
              accent="treatments."
              compact
              plain
            />
          </Reveal>
          <RelatedTreatments items={RELATED} compact />
        </div>
        <Reveal className={styles.note} delay={100}>
          <p>{GENERAL_INFO_NOTE}</p>
          {showReview ? (
            <p>
              Reviewed by {REVIEWED_BY} · Last reviewed {LAST_REVIEWED}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
