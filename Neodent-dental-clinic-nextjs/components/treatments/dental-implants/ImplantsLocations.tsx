import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { BranchCards } from "@/components/ui/BranchCards";
import { BRANCH_PAGE_HREF } from "@/lib/dental-implants-page";
import { SectionHeader } from "./SectionHeader";
import styles from "./ImplantsLocations.module.css";

/* Pattern: SpacesDesignedAroundCare. Dark ground, title + lede, then the
   branch panels (BranchCards). All facts come from lib/site-data.ts. */
export function ImplantsLocations() {
  return (
    <section className={styles.section} aria-labelledby="di-locations-title">
      <div className={styles.container}>
        <SectionHeader
          titleId="di-locations-title"
          sans="Where to"
          accent="find us."
          tone="dark"
        >
          <p className="section-lede section-lede--on-dark">
            <EditorialHighlight tone="primary" onDark>
              Dental implant consultations
            </EditorialHighlight>{" "}
            are available at{" "}
            <EditorialHighlight tone="secondary" onDark>
              both Neodent clinics
            </EditorialHighlight>{" "}
            in Hyderabad. Call{" "}
            <EditorialHighlight tone="quiet" onDark>
              the clinic you would like to visit
            </EditorialHighlight>
            .
          </p>
        </SectionHeader>
        <div className={styles.cards}>
          <BranchCards detailsHref={BRANCH_PAGE_HREF} tone="dark" />
        </div>
      </div>
    </section>
  );
}
