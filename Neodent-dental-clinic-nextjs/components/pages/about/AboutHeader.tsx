import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { ctaTelPhone } from "@/lib/site-data";
import { AboutBackdrop } from "./AboutBackdrop";
import styles from "./AboutHeader.module.css";

/* ------------------------------------------------------------------
   About -- S1 page header.

   Copy, eyebrow, h1 and the photo caption are moved unchanged from the
   previous AboutHero. Added (standard 3.5, not in the old header): the
   action pair. Removed: the grid lines and the red offset frame around
   the photo. The photo is the only priority image on the page.
   ------------------------------------------------------------------ */

export function AboutHeader() {
  return (
    <section className={styles.header} aria-labelledby="about-title">
      <AboutBackdrop withFilter />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} ${styles.in1}`}>
            Established 1994 · Hyderabad
          </p>
          <h1 id="about-title" className={`${styles.headline} ${styles.in2}`}>
            Decades of changing smiles.
            <span className={styles.accent}>A legacy that continues.</span>
          </h1>
          <p className={`${styles.lede} ${styles.in3}`}>
            Neodent Dental Hospital was founded in Hyderabad in 1994 by Dr.
            Mohd. Siraj Ur Rahman, opening its first practice in Mehdipatnam.
            In the decades since, that single clinic has grown into Neodent
            Dental Hospital, now practising across Mehdipatnam and Nampally,
            built on specialist-led dental care that has shaped every year
            since.
          </p>
          <div className={`${styles.actions} ${styles.in4}`}>
            <AppButton
              href={ctaTelPhone}
              variant="primary"
              className={styles.primary}
            >
              Call for Consultation <ArrowRight size={15} aria-hidden="true" />
            </AppButton>
            <Link href="/contact" className={`button button-ghost ${styles.secondary}`}>
              Send an enquiry
            </Link>
          </div>
        </div>

        <figure className={`${styles.visual} ${styles.inPhoto}`}>
          <div className={styles.photo}>
            <Image
              className={styles.image}
              src="/assets/dr-miftah/Dr. Md. Miftah Ur Rahman during treatment- Neodent Dental Hospital.jpg"
              alt="Dr. Md. Miftah Ur Rahman performing a dental treatment procedure at Neodent Dental Hospital, Hyderabad"
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 360px, 100vw"
              preload
            />
          </div>
          <figcaption className={`${styles.caption} ${styles.inCaption}`}>
            <b>Dr. Md. Miftah Ur Rahman</b>
            <span>Prosthodontist &amp; Implantologist</span>
            <span>Assistant Director · Neodent</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
