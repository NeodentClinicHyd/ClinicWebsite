/**
 * EditorialSeam — Architectural seam for treatments page.
 * 
 * Creates visual continuity between editorial acts using the NeoDent
 * design language: thin hairlines constrained to the same container
 * width as content, with proper horizontal inset matching the About
 * page's seam system.
 * 
 * Uses nested wrapper pattern to ensure hairline respects the editorial
 * grid (32px inset desktop, 16px inset mobile) while the outer wrapper
 * provides full-width background context.
 */

import styles from "./EditorialSeam.module.css";

interface EditorialSeamProps {
  /** Optional: Adds extra spacing for major chapter transitions */
  variant?: "standard" | "chapter";
  /** Optional: Shows a subtle red registration mark */
  withMark?: boolean;
  /** Optional: Surface context for line color (dark charcoal vs ivory) */
  surface?: "light" | "dark";
}

export function EditorialSeam({ 
  variant = "standard",
  withMark = false,
  surface = "light"
}: EditorialSeamProps) {
  return (
    <div 
      className={`${styles.seamWrapper} ${variant === "chapter" ? styles.chapter : ""}`}
      data-surface={surface}
      aria-hidden="true"
    >
      <div className={styles.seam}>
        <span className={styles.hairline} />
        {withMark && <span className={styles.registrationMark} />}
      </div>
    </div>
  );
}
