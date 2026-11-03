import { Reveal } from "@/components/motion/Reveal";
import { BRANCH_PAGE_HREF, LOCATIONS } from "@/lib/composite-build-up-page";
import { BranchCards } from "./BranchCards";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import styles from "./ClinicLocations.module.css";

/* 10. Where to find us (dark). Plan 4.8.
   Pattern: SpacesDesignedAroundCare. Flat dark ground (#14161a), plain heading
   with a real space, an intro whose highlights are ivory bold (decision D4),
   then the two branch cards. All facts come from lib/site-data.ts. */
export function ClinicLocations() {
  return (
    <section className={styles.section} aria-labelledby="cbu-locations-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="cbu-locations-title"
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
          <BranchCards detailsHref={BRANCH_PAGE_HREF} />
        </div>
      </div>
    </section>
  );
}
