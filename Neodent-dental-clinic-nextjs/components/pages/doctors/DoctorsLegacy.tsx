import Link from "next/link";
import styles from "./DoctorsLegacy.module.css";

/* ------------------------------------------------------------------
   TRANSIENT (R2). R2 replaced the two flat doctor cards with
   DoctorsLeadership (their text moved word for word). What remains of
   the old page is the closing line, kept word for word and link for link
   until R4 moves it to the bottom of the clinics band (S5). It sits on a
   light strip with ink-and-red links, because small red text on charcoal
   fails the contrast rule.
   ------------------------------------------------------------------ */

export function DoctorsLegacy() {
  return (
    <section className={styles.section} aria-label="Clinics and contact">
      <div className={styles.container}>
        <p className={styles.footnote}>
          See both branches on the{" "}
          <Link href="/clinic" className={styles.inline}>
            clinics page
          </Link>{" "}
          or{" "}
          <Link href="/contact" className={styles.inline}>
            get in touch
          </Link>{" "}
          to begin.
        </p>
      </div>
    </section>
  );
}
