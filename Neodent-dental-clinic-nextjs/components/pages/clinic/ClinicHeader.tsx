import Image from "next/image";
import { Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { clinicLocations } from "@/lib/clinic-data";
import { ClinicBackdrop } from "./ClinicBackdrop";
import styles from "./ClinicHeader.module.css";

/* ------------------------------------------------------------------
   Clinics hub -- S0 page header.

   Forked from components/clinic/ClinicHero.tsx (the original stays as it
   was). Eyebrow, h1, paragraph, both call buttons, the photo, its alt
   text and its caption are the old header's own, word for word. The
   paragraph's two EditorialHighlight marks are gone (a marker underline
   is not allowed in dark body text); every word is kept and the key
   phrase is set in a heavier weight. Removed: the grid lines, the red
   offset frame and the corner tick.

   Added (PAGE_PLAN Q5, default applied): two dark glass cards with each
   clinic's name and hours, read from lib/clinic-data.ts.

   The photo is the one preloaded image on the page. This repo is on
   Next 16, where `preload` replaces the deprecated `priority`.
   ------------------------------------------------------------------ */

const { mehdipatnam, nampally } = clinicLocations;
const hoursCards = [mehdipatnam, nampally];

export function ClinicHeader() {
  return (
    <section className={styles.header} aria-labelledby="clinic-title">
      <ClinicBackdrop withFilter />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} ${styles.in1}`}>
            Our clinics · Hyderabad
          </p>
          <h1 id="clinic-title" className={`${styles.headline} ${styles.in2}`}>
            Two locations.
            <span className={styles.accent}>One Neodent standard.</span>
          </h1>
          <p className={`${styles.lede} ${styles.in3}`}>
            Neodent Dental Hospital provides{" "}
            <strong className={styles.key}>specialist-led dental care</strong>{" "}
            across two Hyderabad locations — in Mehdipatnam and Nampally. Each
            clinic serves patients seeking restorative, implant, prosthodontic,
            preventive and smile-focused treatment within the same Neodent
            clinical environment.
          </p>
          <div className={`${styles.actions} ${styles.in4}`}>
            <AppButton href={mehdipatnam.tel} variant="primary">
              <Phone size={15} aria-hidden="true" /> Call Mehdipatnam
            </AppButton>
            <AppButton
              href={nampally.tel}
              variant="ghost"
              className={styles.ghost}
            >
              <Phone size={15} aria-hidden="true" /> Call Nampally
            </AppButton>
          </div>
        </div>

        <div className={styles.visual}>
          <figure className={`${styles.figure} ${styles.inPhoto}`}>
            <div className={styles.photo}>
              <Image
                className={styles.image}
                src={mehdipatnam.primaryImage.src}
                alt="Neodent Dental Hospital, Mehdipatnam — patient waiting lounge interior"
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 360px, 92vw"
                preload
              />
            </div>
            <figcaption className={`${styles.caption} ${styles.inCaption}`}>
              <b>Mehdipatnam</b>
              <span>Waiting lounge</span>
            </figcaption>
          </figure>

          <ul className={styles.hours} aria-label="Clinic opening hours">
            {hoursCards.map((clinic, index) => (
              <li
                key={clinic.slug}
                className={`${styles.hoursCard} ${
                  index === 0 ? styles.inHours1 : styles.inHours2
                }`}
              >
                <span className={styles.hoursName}>{clinic.name}</span>
                <span className={styles.hoursTime}>{clinic.hours}</span>
                <span className={styles.hoursNote}>{clinic.weeklyClosure}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
