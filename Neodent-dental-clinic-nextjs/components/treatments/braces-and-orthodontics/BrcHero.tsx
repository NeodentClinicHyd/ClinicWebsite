import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AppButton } from "@/components/ui/AppButton";
import { BRANCH_PAGE_HREF, BREADCRUMBS, HERO } from "@/lib/braces-orthodontics-page";
import { ctaTelPhone } from "@/lib/site-data";
import { RichText } from "./RichText";
import styles from "./BrcHero.module.css";

/* 1. Hero (dark). Pattern: RctHero (itself the FMR / home hero): charcoal
   ground, sans headline with one red serif phrase, `.section-lede--on-dark`
   lede, primary + ghost buttons, one clinic photograph bled to the
   viewport's right edge. The photograph is a treatment room with no people,
   banners or legible text (never a patient). It is the only preloaded image
   on the page. */
export function BrcHero() {
  return (
    <section className={styles.hero} aria-labelledby="brc-hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Breadcrumbs items={BREADCRUMBS} tone="dark" />
          <h1 id="brc-hero-title" className={styles.title}>
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
