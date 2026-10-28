import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AppButton } from "@/components/ui/AppButton";
import { BRANCH_PAGE_HREF, BREADCRUMBS, HERO } from "@/lib/scaling-and-polishing-page";
import { ctaTelPhone } from "@/lib/site-data";
import { RichText } from "./RichText";
import styles from "./ScalingHero.module.css";

/* 1. Hero (dark). Pattern: the Smile Design hero (home Hero ground, sans
   headline with one red serif phrase, `.section-lede--on-dark` lede, primary
   + ghost buttons, photograph bled to the viewport's right edge). The photo
   is a clinic interior with no people: the Mehdipatnam treatment room, a
   1280px file, cropped closer on the chair than the Braces and Implants
   heroes that share the room. It is the only preloaded image on the page. */
export function ScalingHero() {
  return (
    <section className={styles.hero} aria-labelledby="sp-hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Breadcrumbs items={BREADCRUMBS} tone="dark" />
          <h1 id="sp-hero-title" className={styles.title}>
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
