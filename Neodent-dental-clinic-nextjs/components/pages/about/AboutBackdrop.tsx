import styles from "./AboutBackdrop.module.css";

/* ------------------------------------------------------------------
   Dark-band layers (plan 3.6), used by every dark band on /about:
   charcoal gradient (set on the band), a red radial glow, and the
   dental icon pattern as a luminance mask over an ivory fill. The
   pattern is never a CSS background-image.

   `withFilter` renders the shared SVG filter that maps the tile's
   alpha so only its lines show. Render it once per page (the header
   does); every backdrop references it by id.
   ------------------------------------------------------------------ */

export function AboutBackdrop({ withFilter = false }: { withFilter?: boolean }) {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <span className={styles.glow} />
      <span className={styles.pattern}>
        <span className={styles.tile} />
      </span>
      {withFilter && (
        <svg className={styles.filter} width="0" height="0" focusable="false">
          <filter id="about-pattern-levels" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3.5 -0.5"
            />
          </filter>
        </svg>
      )}
    </div>
  );
}
