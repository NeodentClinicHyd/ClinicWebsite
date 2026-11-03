import { Reveal } from "@/components/motion/Reveal";
import { BRANCH_PAGE_HREF } from "@/lib/dental-implants-page";
import { BranchCards } from "./BranchCards";
import { Emphasis } from "./Emphasis";
import { SectionHeader } from "./SectionHeader";
import styles from "./ClinicLocations.module.css";

/* "Where to find us." (plan 4.9). Flat dark ground. Two equal clinic cards
   (BranchCards fork): photograph capped at 36dvh (28dvh on phones), label /
   value rows at 12 px, "Directions" and "Clinic details" buttons. Every
   fact comes from lib/site-data.ts via BranchCards. Plain heading. */
export function ClinicLocations() {
  return (
    <section className={styles.section} aria-labelledby="di-locations-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="di-locations-title"
            sans="Where to"
            accent="find us."
            tone="dark"
            plain
          >
            <p className="section-lede section-lede--on-dark">
              <Emphasis tone="primary" onDark>
                Dental implant consultations
              </Emphasis>{" "}
              are available at{" "}
              <Emphasis tone="secondary" onDark>
                both Neodent clinics
              </Emphasis>{" "}
              in Hyderabad. Call{" "}
              <Emphasis tone="quiet" onDark>
                the clinic you would like to visit
              </Emphasis>
              .
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
