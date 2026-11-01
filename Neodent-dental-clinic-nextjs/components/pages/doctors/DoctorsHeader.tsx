import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { ctaTelPhone } from "@/lib/site-data";
import {
  DOCTORS_BREADCRUMBS,
  DOCTORS_HEADER_FACTS,
  DOCTORS_HEADER_PHOTO,
} from "@/lib/pages/doctors-content";
import { DoctorsBackdrop } from "./DoctorsBackdrop";
import styles from "./DoctorsHeader.module.css";

/* ------------------------------------------------------------------
   Doctors -- page header (PAGE_PLAN section 5).

   The eyebrow, the h1 (with its red italic phrase) and the supporting
   sentence are the old header's own, moved word for word. Added: the
   visible breadcrumb, the two actions (tel link from lib/site-data.ts),
   one photograph and two dark glass cards read from existing facts.

   The photo is the one preloaded image on the page (Next 16: `preload`
   replaces the deprecated `priority`). The load animation is plain CSS
   keyframes keyed to classes (transform and opacity), switched off
   under reduced motion, so it needs no JavaScript and never leaves
   content hidden.
   ------------------------------------------------------------------ */

export function DoctorsHeader() {
  return (
    <section className={styles.header} aria-labelledby="doctors-title">
      <DoctorsBackdrop withFilter />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <nav className={`${styles.crumbs} ${styles.in0}`} aria-label="Breadcrumb">
            <ol className={styles.crumbList}>
              {DOCTORS_BREADCRUMBS.map((item, index) => {
                const last = index === DOCTORS_BREADCRUMBS.length - 1;
                return (
                  <li key={item.path} className={styles.crumb}>
                    {last ? (
                      <span aria-current="page">{item.name}</span>
                    ) : (
                      <>
                        <Link href={item.path} className={styles.crumbLink}>
                          {item.name}
                        </Link>
                        <span className={styles.sep} aria-hidden="true">
                          /
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <p className={`${styles.eyebrow} ${styles.in1}`}>Our doctors</p>
          <h1 id="doctors-title" className={styles.headline}>
            <span className={styles.line}>
              <span className={`${styles.lineInner} ${styles.lineIn1}`}>The clinical team</span>
            </span>{" "}
            <span className={styles.line}>
              <em className={`${styles.accent} ${styles.lineInner} ${styles.lineIn2}`}>
                behind Neodent.
              </em>
            </span>
          </h1>
          <p className={`${styles.lede} ${styles.in3}`}>
            Specialist-led dental care delivered across two Hyderabad
            locations, led by the clinicians who built the practice.
          </p>
          <div className={`${styles.actions} ${styles.in4}`}>
            <AppButton href={ctaTelPhone} variant="primary">
              Call for Consultation <ArrowRight size={15} aria-hidden="true" />
            </AppButton>
            <Link href="/contact" className={`button button-ghost ${styles.ghost}`}>
              Send an enquiry
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <figure className={`${styles.figure} ${styles.inPhoto}`}>
            <div className={styles.photo}>
              <Image
                className={styles.image}
                src={DOCTORS_HEADER_PHOTO.src}
                alt={DOCTORS_HEADER_PHOTO.alt}
                fill
                sizes="(min-width: 1024px) 560px, (min-width: 768px) 640px, 92vw"
                style={{ objectPosition: DOCTORS_HEADER_PHOTO.focal }}
                preload
              />
            </div>
          </figure>

          <ul className={styles.glassRow} aria-label="Neodent at a glance">
            {DOCTORS_HEADER_FACTS.map((fact, index) => (
              <li
                key={fact.key}
                className={`${styles.glass} ${index === 0 ? styles.inGlass1 : styles.inGlass2}`}
              >
                <span className={styles.glassTitle}>{fact.title}</span>
                <span className={styles.glassNote}>{fact.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
