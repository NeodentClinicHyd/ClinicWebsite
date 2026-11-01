import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { BranchBackdrop } from "@/components/pages/clinic-mehdipatnam/BranchBackdrop";
import type { ClinicLocation } from "@/lib/clinic-data";
import { branchContent, photoSize } from "./branch-content";
import styles from "./BranchHero.module.css";

/* ------------------------------------------------------------------
   Branch page -- S1 page header.

   Layout follows the /clinic hub header (copy left, framed photograph
   right, dark ground from BranchBackdrop). Every word, link, the photo,
   its alt text and its caption are the old header's own. The opening
   hours line moved from the copy column into a dark glass card that
   overlaps the photo's lower edge; a second glass card carries the
   location as already written in the lede ("Humayun Nagar,
   Mehdipatnam"). Hours, location, phone and directions are read from
   the clinic data by slug, so both branches render correctly.

   The load animation is plain CSS keyframes (transform and opacity),
   keyed off classes, so the page reads with JavaScript off.
   The photo is the one preloaded image on the page (Next 16 `preload`).
   ------------------------------------------------------------------ */

export function BranchHero({ clinic }: { clinic: ClinicLocation }) {
  const content = branchContent[clinic.slug];
  const { src, alt, label } = clinic.primaryImage;
  const { width, height } = photoSize(src);
  const portrait = height > width;

  return (
    <section className={styles.header} aria-labelledby="branch-title">
      <BranchBackdrop withFilter />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <nav aria-label="Breadcrumb" className={`${styles.crumbs} ${styles.in0}`}>
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/clinic">Clinics</Link>
              </li>
              <li>
                <span aria-current="page">{clinic.name}</span>
              </li>
            </ol>
          </nav>

          <p className={`${styles.eyebrow} ${styles.in1}`}>{clinic.locality}</p>
          <h1 id="branch-title" className={`${styles.headline} ${styles.in2}`}>
            Neodent Dental Hospital
            <span className={styles.srOnly}>, </span>
            <span className={styles.accent}>{content.accent}</span>
          </h1>
          <p className={`${styles.lede} ${styles.in3}`}>{content.lede}</p>

          <div className={`${styles.actions} ${styles.in4}`}>
            <AppButton href={clinic.tel} variant="primary">
              <Phone size={15} aria-hidden="true" /> Call {clinic.phone}
              <span className={styles.srOnly}> Neodent {clinic.name}</span>
            </AppButton>
            <a
              href={clinic.directions}
              target="_blank"
              rel="noopener noreferrer"
              className={`button button-ghost ${styles.ghost}`}
            >
              <MapPin size={15} aria-hidden="true" /> Get directions
              <span className={styles.srOnly}>
                {" "}
                to Neodent {clinic.name} (opens in a new tab)
              </span>
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <figure
            className={`${styles.figure} ${portrait ? styles.portrait : styles.landscape} ${styles.inPhoto}`}
          >
            <div className={styles.photo}>
              <Image
                className={styles.image}
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={
                  portrait
                    ? "(min-width: 1024px) 320px, (min-width: 768px) 360px, 92vw"
                    : "(min-width: 1024px) 480px, (min-width: 768px) 440px, 92vw"
                }
                preload
              />
            </div>
            <figcaption className={`${styles.caption} ${styles.inCaption}`}>
              <b>{clinic.name}</b>
              <span>{label}</span>
            </figcaption>
          </figure>

          <ul className={styles.facts} aria-label="Clinic hours and location">
            <li className={`${styles.card} ${styles.inCard1}`}>
              <Clock size={16} aria-hidden="true" className={styles.cardIcon} />
              <span className={styles.cardText}>
                <span className={styles.cardLabel}>Opening hours</span>
                <span className={styles.cardValue}>
                  {clinic.weeklyHours} · {clinic.hours} · {clinic.weeklyClosure}
                </span>
              </span>
            </li>
            <li className={`${styles.card} ${styles.inCard2}`}>
              <MapPin size={16} aria-hidden="true" className={styles.cardIcon} />
              <span className={styles.cardText}>
                <span className={styles.cardLabel}>Location</span>
                <span className={styles.cardValue}>{content.locationLine}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
