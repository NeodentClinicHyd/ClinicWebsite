import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { CountUp } from "@/components/motion/CountUp";
import { ctaTelPhone } from "@/lib/site-data";
import {
  MIFTAH_BREADCRUMBS,
  MIFTAH_HEADER_PHOTO,
} from "@/lib/pages/dr-miftah-content";
import { DrMiftahBackdrop } from "./DrMiftahBackdrop";
import styles from "./DrMiftahHeader.module.css";

/* ------------------------------------------------------------------
   Dr. Miftah -- page header (PAGE_PLAN section 5, pattern P1).

   Words moved from the old hero: eyebrow, h1, tagline, credentials, role
   line, the two in-page links, the photograph tag and caption, the three
   facts, the ghost "DR.", the "Neodent · Hyd" mark and the "Scroll" cue
   (these three stay as quiet plain text until the owner approves their
   removal in content-allowlist.json). Added: the supporting line with two
   clinic links, the primary and secondary actions.

   The photo is the one preloaded image on the page. The load animation is
   plain CSS keyframes keyed to classes (transform and opacity), switched
   off under reduced motion, so it needs no JavaScript and never leaves
   content hidden.
   ------------------------------------------------------------------ */

export function DrMiftahHeader() {
  return (
    <section className={styles.header} aria-labelledby="miftah-hero-title">
      <DrMiftahBackdrop withFilter />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <nav className={`${styles.crumbs} ${styles.in0}`} aria-label="Breadcrumb">
            <ol className={styles.crumbList}>
              {MIFTAH_BREADCRUMBS.map((item, index) => {
                const last = index === MIFTAH_BREADCRUMBS.length - 1;
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

          <p className={`${styles.eyebrow} ${styles.in1}`}>
            NEODENT DENTAL HOSPITALS / CLINICAL TEAM
          </p>
          <h1 id="miftah-hero-title" className={styles.headline}>
            <span className={styles.line}>
              <span className={`${styles.lineInner} ${styles.lineIn1}`}>Dr. Md. Miftah</span>
            </span>
            <span className={styles.line}>
              <span className={`${styles.lineInner} ${styles.lineIn2}`}>Ur Rahman</span>
            </span>
          </h1>
          <p className={`${styles.tagline} ${styles.in2}`}>
            <span>A specialist&rsquo;s hand.</span>{" "}
            <em className={styles.accent}>A patient&rsquo;s pace.</em>
          </p>
          <p className={`${styles.credentials} ${styles.in2}`}>
            BDS &middot; MDS &middot; FICOI (U.S.A.) &middot; GOLD MEDALLIST
          </p>
          <p className={`${styles.role} ${styles.in2}`}>
            Prosthodontist &amp; Implantologist &middot; Assistant Director,
            Neodent Dental Hospital
          </p>
          <p className={`${styles.lede} ${styles.in3}`}>
            Prosthodontist and implantologist at Neodent Dental Hospital,
            practising in{" "}
            <Link href="/clinic/mehdipatnam" className={styles.inline}>
              Mehdipatnam
            </Link>{" "}
            and{" "}
            <Link href="/clinic/nampally" className={styles.inline}>
              Nampally
            </Link>
            , Hyderabad.
          </p>
          <div className={`${styles.actions} ${styles.in4}`}>
            <AppButton href={ctaTelPhone} variant="primary">
              Call for Consultation <ArrowRight size={15} aria-hidden="true" />
            </AppButton>
            <Link href="/contact" className={`button button-ghost ${styles.ghost}`}>
              Send an enquiry
            </Link>
          </div>
          <div className={`${styles.textLinks} ${styles.in4}`}>
            <a href="#clinical-focus" className={styles.textLink}>
              View Clinical Specialties <ArrowRight size={13} aria-hidden="true" />
            </a>
            <a href="#publications" className={styles.textLink}>
              Read PubMed Articles <ArrowRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className={`${styles.figure} ${styles.inPhoto}`}>
          <div className={styles.photo}>
            <Image
              className={styles.image}
              src={MIFTAH_HEADER_PHOTO.src}
              alt={MIFTAH_HEADER_PHOTO.alt}
              fill
              sizes="(min-width: 1024px) 560px, (min-width: 768px) 640px, 92vw"
              style={{ objectPosition: MIFTAH_HEADER_PHOTO.focal }}
              preload
            />
            <span className={styles.tag}>01 / Clinical practice</span>
            <figcaption className={styles.caption}>
              <b>Dr. Md. Miftah Ur Rahman</b>
              <span>Neodent Dental Hospital &middot; Hyderabad</span>
            </figcaption>
          </div>
        </figure>
      </div>

      <ul className={`${styles.facts} ${styles.in5}`} aria-label="Dr. Miftah at a glance">
        <li className={styles.fact}>
          <span className={styles.mono} aria-hidden="true">
            DR.
          </span>
          <span>
            <CountUp to={15} suffix="+" grouping={false} /> years clinical practice
          </span>
        </li>
        <li className={styles.fact}>Prosthodontics + Implantology</li>
        <li className={styles.fact}>Nampally / Mehdipatnam</li>
        <li className={`${styles.fact} ${styles.factQuiet}`}>
          <span>NEODENT · HYD</span>
          <span className={styles.scroll} aria-hidden="true">
            Scroll
            <ArrowDown size={13} />
          </span>
        </li>
      </ul>
    </section>
  );
}
