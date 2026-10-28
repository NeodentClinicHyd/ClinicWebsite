import { RelatedTreatments } from "@/components/ui/RelatedTreatments";
import {
  GENERAL_INFO_NOTE,
  LAST_REVIEWED,
  RELATED,
  REVIEWED_BY,
} from "@/lib/composite-build-up-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import styles from "./CbuRelated.module.css";

/* 11. Related treatments (light)
   Pattern: FmrRelated / ImplantsRelated, in a slim band on ivory (the section
   before is the dark locations band). Three cards (root canal treatment,
   smile design, full mouth rehabilitation) with the existing homepage summaries,
   then the page's one general-information line, with the reviewer line only
   when both REVIEWED_BY and LAST_REVIEWED are set. */
export function CbuRelated() {
  const showReview = REVIEWED_BY !== "" && LAST_REVIEWED !== "";

  return (
    <section className={styles.section} aria-labelledby="cbu-related-title">
      <div className={styles.container}>
        <div className={styles.row}>
          <SectionHeader
            titleId="cbu-related-title"
            sans="Related"
            accent="treatments."
            compact
          />
          <RelatedTreatments items={RELATED} compact />
        </div>
        <div className={styles.note}>
          <p>{GENERAL_INFO_NOTE}</p>
          {showReview ? (
            <p>
              Reviewed by {REVIEWED_BY} · Last reviewed {LAST_REVIEWED}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
