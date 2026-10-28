import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AppButton } from "@/components/ui/AppButton";
import { BRANCH_PAGE_HREF, BREADCRUMBS, HERO } from "@/lib/smile-design-page";
import { ctaTelPhone } from "@/lib/site-data";
import { RichText } from "./RichText";
import styles from "./SmileHero.module.css";

/* 1. Hero (dark). Pattern: the full mouth rehabilitation hero (home Hero
   ground, sans headline with one red serif phrase, `.section-lede--on-dark`
   lede, primary + ghost buttons, photograph bled to the viewport's right
   edge). The photo is a clinic interior with no people: the Nampally
   reception, cropped to the staircase wing, a 1280px file. It is the only
   preloaded image on the page. */
export function SmileHero() {
  return (
    <section className={styles.hero} aria-labelledby="sd-hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Breadcrumbs items={BREADCRUMBS} tone="dark" />
          <h1 id="sd-hero-title" className={styles.title}>
            <span className={styles.sans}>{HERO.sans}</span>{" "}
            <span className={styles.accent}>{HERO.accent}</span>
          </h1>
          <p className={`${styles.lede} section-lede section-lede--on-dark`}>
            <RichText parts={HERO.lede} onDark />
          </p>
          <div className={styles.actions}>
            <AppButton href="/contact" variant="primary">
              Send an enquiry
            </AppButton>
            <AppButton href={ctaTelPhone} variant="ghost">
              Call us
            </AppButton>
          </div>
          <p className={styles.consult}>
            <span>Consultations at both clinics:</span>
            <Link className={styles.consultLink} href={BRANCH_PAGE_HREF.nampally}>
              Nampally
            </Link>
            <Link className={styles.consultLink} href={BRANCH_PAGE_HREF.mehdipatnam}>
              Mehdipatnam
            </Link>
          </p>
        </div>

        <figure className={styles.visual}>
          <div className={styles.frame}>
            <Image
              className={styles.photo}
              src={HERO.image}
              alt={HERO.imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 56vw"
              style={{ objectPosition: HERO.imagePosition }}
              preload
            />
          </div>
          <figcaption className={styles.meta}>
            <b>{HERO.captionLabel}</b>
            <span>{HERO.captionPlace}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
