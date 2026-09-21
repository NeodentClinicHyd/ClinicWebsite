import styles from "./Atmosphere.module.css";

/* ------------------------------------------------------------------
   Atmosphere — shared decorative geometry layer.

   The site's sections each re-declare the same barely-visible
   drafting vocabulary (draft lines, registration dots, arcs, ghost
   numerals, vertical micro-labels) inside their own CSS modules
   (ClinicalSettings, OurClinics, LegacyAndPeople, TreatmentsHero,
   contact.module.css...). This component extracts that duplicated
   vocabulary so future doctor pages (and this page) reuse one
   implementation. Every value below is copied verbatim from the
   existing modules:

   - draft lines / registration dots / coord tag: ClinicalSettings
     Section 02 (dark) and OurClinics Section 01 (light)
   - arc + partial detail arc + halo dot: /contact hero geometry
   - ghost numeral: /contact .ghost / .enquiryGhost recipe
   - vertical writing-mode label: globals .archive-atmosphere::after
     and ClinicalSettings .coordTag

   Purely decorative: the layer is aria-hidden, pointer-events none,
   z-index 0 behind content, and simplified on mobile the same way
   the source modules simplify theirs.
   ------------------------------------------------------------------ */

export type AtmosphereSurface = "light" | "dark";

export interface AtmosphereProps {
  surface?: AtmosphereSurface;
  /** Giant low-opacity serif ghost character/wordmark (/contact .ghost recipe). */
  ghost?: string;
  /** Vertical writing-mode micro-label (archive-atmosphere recipe). */
  verticalLabel?: string;
  /** Small horizontal mono coordinate tag (ClinicalSettings .coordTag). */
  coordTag?: string;
  /** Vertical + horizontal drafting lines (ClinicalSettings/OurClinics). */
  rails?: boolean;
  /** Solid hairline circle (/contact .arc recipe). */
  arc?: boolean;
  /** Partial rotated arc (/contact .detail recipe). */
  detailArc?: boolean;
  /** Red registration dot with halo (/contact .registrationDot). */
  haloDot?: boolean;
  /** Red registration dots (ClinicalSettings .registrationDot{,Small}). */
  dots?: boolean;
  className?: string;
}

export function Atmosphere({
  surface = "dark",
  ghost,
  verticalLabel,
  coordTag,
  rails,
  arc,
  detailArc,
  haloDot,
  dots,
  className = "",
}: AtmosphereProps) {
  const classes = [
    styles.atmosphere,
    surface === "light" ? styles.light : styles.dark,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-hidden="true">
      {rails && (
        <>
          <span className={styles.draftVertical} />
          <span className={styles.draftHorizontal} />
        </>
      )}
      {arc && <span className={styles.arc} />}
      {detailArc && <span className={styles.detailArc} />}
      {haloDot && <span className={styles.haloDot} />}
      {dots && (
        <>
          <span className={styles.registrationDot} />
          <span className={styles.registrationDotSmall} />
        </>
      )}
      {ghost && <span className={styles.ghost}>{ghost}</span>}
      {verticalLabel && <span className={styles.verticalLabel}>{verticalLabel}</span>}
      {coordTag && <span className={styles.coordTag}>{coordTag}</span>}
    </div>
  );
}
