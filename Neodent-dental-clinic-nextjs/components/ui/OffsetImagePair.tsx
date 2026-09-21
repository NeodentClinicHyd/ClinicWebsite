"use client";

import Image from "next/image";
import styles from "./OffsetImagePair.module.css";

/* ------------------------------------------------------------------
   OffsetImagePair — the site's canonical offset image composition:
   a large primary plate with a smaller secondary image overlapping
   one of its corners. Extracted from the three one-off implementations
   of the same pattern:

   - OurClinics.module.css (.primaryWrap/.primaryFrame/.secondaryFrame)
   - BeyondTheClinic.module.css (.todayPrimary/.todaySecondary:
     width 46%, margin -14% 0 0 auto, right -6%, editorial shadow)
   - ClinicalSettings.module.css (.branchPrimary/.branchSecondary)

   The overlap/shadow/label values below follow the BeyondTheClinic
   "today" composition, adapted to surface via a `onDark` flag.
   ------------------------------------------------------------------ */

export interface OffsetImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Caption micro-label shown under the plate (uppercase mono style). */
  label?: string;
}

export interface OffsetImagePairProps {
  primary: OffsetImage;
  /** Optional smaller overlapping plate; omitted when only one image is wanted. */
  secondary?: OffsetImage;
  /** Set when the composition sits on a dark surface (shadow strength). */
  onDark?: boolean;
  /** Show the thin red offset frame behind the primary plate. */
  offsetFrame?: boolean;
  /** Whether the secondary image is lazy-loaded (default: lazy). */
  priority?: boolean;
  className?: string;
}

export function OffsetImagePair({
  primary,
  secondary,
  onDark = false,
  offsetFrame = true,
  priority = false,
  className = "",
}: OffsetImagePairProps) {
  return (
    <div className={`${styles.pair} ${onDark ? styles.onDark : ""} ${className}`}>
      <div className={styles.primaryWrap}>
        {offsetFrame && <span className={styles.offsetFrame} aria-hidden="true" />}
        <div className={styles.primaryFrame}>
          <Image
            src={primary.src}
            alt={primary.alt}
            width={primary.width}
            height={primary.height}
            sizes="(max-width: 767px) 86vw, (max-width: 1023px) 52vw, 40vw"
            priority={priority}
            className={styles.image}
          />
          <span className={styles.shade} aria-hidden="true" />
        </div>
        {primary.label && <span className={styles.primaryLabel}>{primary.label}</span>}
      </div>
      {secondary && (
        <figure className={styles.secondaryFrame}>
          <Image
            src={secondary.src}
            alt={secondary.alt}
            width={secondary.width}
            height={secondary.height}
            sizes="(max-width: 767px) 44vw, 220px"
            className={styles.image}
          />
          {secondary.label && <span className={styles.secondaryLabel}>{secondary.label}</span>}
        </figure>
      )}
    </div>
  );
}
