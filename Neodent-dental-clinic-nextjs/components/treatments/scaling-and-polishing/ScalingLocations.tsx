import { BranchCards } from "@/components/ui/BranchCards";
import { BRANCH_PAGE_HREF, LOCATIONS } from "@/lib/scaling-and-polishing-page";
import { SectionHeader } from "@/components/treatments/dental-implants/SectionHeader";
import { RichText } from "./RichText";
import styles from "./ScalingLocations.module.css";

/* 12. Where to find us (dark)
   Pattern: the Smile Design / FMR locations section (SpacesDesignedAroundCare
   via ImplantsLocations). Dark ground, title + lede, then the branch panels
   (BranchCards). All facts come from lib/site-data.ts. */
export function ScalingLocations() {
  return (
    <section className={styles.section} aria-labelledby="sp-locations-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="sp-locations-title"
          sans={LOCATIONS.sans}
          accent={LOCATIONS.accent}
          tone="dark"
        >
          <p className="section-lede section-lede--on-dark">
            <RichText parts={LOCATIONS.intro} onDark />
          </p>
        </SectionHeader>
        <div className={styles.cards}>
          <BranchCards detailsHref={BRANCH_PAGE_HREF} tone="dark" />
        </div>
      </div>
    </section>
  );
}
