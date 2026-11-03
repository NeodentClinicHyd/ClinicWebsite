import { Reveal } from "@/components/motion/Reveal";
import { BRANCH_PAGE_HREF, LOCATIONS } from "@/lib/root-canal-treatment-page";
import { BranchCards } from "./BranchCards";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import styles from "./ClinicLocations.module.css";

/* Where to find us (dark)
   Flat dark ground. Two equal clinic cards (BranchCards fork): photograph
   capped at 36dvh (28dvh on phones), label / value rows at 12 px,
   "Directions" and "Clinic details" buttons. Every fact comes from
   lib/site-data.ts via BranchCards. The Mehdipatnam card shows the interior
   photograph (standing decision D7). The lede's highlighted phrases are
   ivory bold on this dark ground (D4). Plain heading. */
export function ClinicLocations() {
  return (
    <section className={styles.section} aria-labelledby="rct-locations-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="rct-locations-title"
            sans={LOCATIONS.sans}
            accent={LOCATIONS.accent}
            tone="dark"
            plain
          >
            <p className="section-lede section-lede--on-dark">
              <RichText parts={LOCATIONS.intro} onDark />
            </p>
          </SectionHeader>
        </Reveal>
        <div className={styles.cards}>
          <BranchCards detailsHref={BRANCH_PAGE_HREF} tone="dark" />
        </div>
      </div>
    </section>
  );
}
