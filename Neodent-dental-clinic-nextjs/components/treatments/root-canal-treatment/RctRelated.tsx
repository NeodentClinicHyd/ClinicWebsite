import { RelatedTreatments } from "@/components/ui/RelatedTreatments";
import {
  GENERAL_INFO_NOTE,
  LAST_REVIEWED,
  RELATED,
  REVIEWED_BY,
} from "@/lib/root-canal-treatment-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import styles from "./RctRelated.module.css";

/* 12. Related treatments (tan)
   Pattern: FmrRelated / ImplantsRelated, in a slim band on tan (the FMR
   band is on ivory; here the section before is dark and the case-section
   order puts this band on tan). Three cards (composite build-up, scaling
   and polishing, dental implants) with the existing homepage summaries,
   then the page's one general-information line, with the reviewer line only
   when both REVIEWED_BY and LAST_REVIEWED are set. */
export function RctRelated() {
  const showReview = REVIEWED_BY !== "" && LAST_REVIEWED !== "";

  return (
    <section className={styles.section} aria-labelledby="rct-related-title">
      <div className={styles.container}>
        <div className={styles.row}>
          <SectionHeader
            titleId="rct-related-title"
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
