import { Reveal } from "@/components/motion/Reveal";
import { BRANCH_PAGE_HREF, LOCATIONS } from "@/lib/smile-design-page";
import { BranchCards } from "./BranchCards";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import styles from "./Locations.module.css";

/* Where to find us (dark). Flat dark ground. Two equal clinic cards
   (BranchCards fork): photograph capped at 36dvh (28dvh on phones), label /
   value rows at 12 px, "Directions" and "Clinic details" buttons. The
   Mehdipatnam card shows the interior photograph (standing decision D7).
   Every fact comes from lib/site-data.ts via BranchCards. The three
   highlighted phrases in the introduction are ivory bold (D4). Plain
   heading. */
export function Locations() {
  return (
    <section className={styles.section} aria-labelledby="sd-locations-title">
      <div className={styles.container}>
        <Reveal>
          <SectionHeader
            titleId="sd-locations-title"
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
