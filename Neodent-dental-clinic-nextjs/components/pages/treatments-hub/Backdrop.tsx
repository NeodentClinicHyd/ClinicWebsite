import type { CSSProperties } from "react";
import styles from "./TreatmentsHub.module.css";

/* Red glow plus the icon pattern for a dark band. The pattern is applied
   as a luminance mask over an ivory fill (never as a CSS background
   image) and its fade-out shape comes from --pattern-mask on the
   section, so it reaches zero before the text column. Decorative:
   aria-hidden. */
export function Backdrop({ style }: { style?: CSSProperties }) {
  return (
    <span aria-hidden="true" style={{ display: "contents", ...style }}>
      <span className={styles.glow} />
      <span className={styles.pattern}>
        <span className={styles.tile} />
      </span>
    </span>
  );
}
