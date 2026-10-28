import { RelatedTreatments } from "@/components/ui/RelatedTreatments";
import {
  GENERAL_INFO_NOTE,
  LAST_REVIEWED,
  RELATED,
  REVIEWED_BY,
} from "@/lib/dental-implants-page";
import { SectionHeader } from "./SectionHeader";
import styles from "./ImplantsRelated.module.css";

/* Pattern: the small treatment cards of "What can we help you with" on
   ivory, in a slim band (about half the padding of the other sections).
   Hrefs come from RELATED in lib/dental-implants-page.ts. The page's one
   general-information line sits here as small print, with the reviewer
   line only when both REVIEWED_BY and LAST_REVIEWED are set. */
export function ImplantsRelated() {
  const showReview = REVIEWED_BY !== "" && LAST_REVIEWED !== "";

  return (
    <section className={styles.section} aria-labelledby="di-related-title">
      <div className={styles.container}>
        <div className={styles.row}>
          <SectionHeader
            titleId="di-related-title"
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