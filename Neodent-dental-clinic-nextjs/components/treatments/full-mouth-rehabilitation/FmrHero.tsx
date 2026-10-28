import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AppButton } from "@/components/ui/AppButton";
import { BRANCH_PAGE_HREF, BREADCRUMBS, HERO } from "@/lib/full-mouth-rehabilitation-page";
import { ctaTelPhone } from "@/lib/site-data";
import { RichText } from "./RichText";
import styles from "./FmrHero.module.css";

/* 1. Hero. Pattern: the dental-implants hero (home Hero ground, sans
   headline with one red serif phrase, `.section-lede--on-dark` lede, primary
   + ghost buttons, photograph bled to the viewport's right edge). The photo
   is a clinic interior with no people (Mehdipatnam treatment room 2, a
   different room from the implants hero), a 1280px copy. It is the only
   preloaded image on the page. */
export function FmrHero() {
  return (
    <section className={styles.hero} aria-labelledby="fmr-hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Breadcrumbs items={BREADCRUMBS} tone="dark" />
          <h1 id="fmr-hero-title" className={styles.title}>
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
