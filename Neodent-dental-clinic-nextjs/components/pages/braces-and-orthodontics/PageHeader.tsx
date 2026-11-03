import Image from "next/image";
import Link from "next/link";
import { AppButton } from "@/components/ui/AppButton";
import { Breadcrumbs } from "./Breadcrumbs";
import { RichText } from "./RichText";
import { BRANCH_PAGE_HREF, BREADCRUMBS, HERO } from "@/lib/braces-orthodontics-page";
import { ctaTelPhone } from "@/lib/site-data";
import styles from "./PageHeader.module.css";

/* Compact page header (plan 4.1 / 5). Pattern: the home Hero, reduced:
   charcoal ground, red glow and the icon pattern behind the photograph
   (both from 768 px up), two columns on desktop, photograph last on
   phones. Words, links and alt text are those of the previous header
   (BrcHero); only the two button labels changed (standing decision D1) and
   the highlighted phrases are ivory bold on this dark band (D4).
   The photograph is the only preloaded image on the page.

   Motion is a CSS load sequence keyed to the .enter class: every step ends
   in the finished state, so the header reads the same with JavaScript off
   and under prefers-reduced-motion (no animation at all). */
export function PageHeader() {
  return (
    <section className={styles.header} aria-labelledby="brc-hero-title">
      {/* Alpha levels for the pattern mask (same filter the home hero uses). */}
      <svg className={styles.filterDefs} width="0" height="0" focusable="false" aria-hidden="true">
        <filter id="brc-pattern-levels" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3.5 -0.5"
          />
        </filter>
      </svg>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.glow} />
        <span className={styles.pattern}>
          <span className={styles.tile} />
        </span>
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={`${styles.enter} ${styles.s0}`}>
            <Breadcrumbs items={BREADCRUMBS} tone="dark" />
          </div>
          <h1 id="brc-hero-title" className={styles.title}>
            <span className={`${styles.line} ${styles.enter} ${styles.s1}`}>{HERO.sans}</span>{" "}
            <span className={`${styles.line} ${styles.accent} ${styles.enter} ${styles.s2}`}>
              {HERO.accent}
            </span>
          </h1>
          <p className={`${styles.lede} section-lede section-lede--on-dark ${styles.enter} ${styles.s3}`}>
            <RichText parts={HERO.lede} onDark />
          </p>
          <div className={`${styles.actions} ${styles.enter} ${styles.s4}`}>
            <AppButton href={ctaTelPhone} variant="primary">
              Call for Consultation
            </AppButton>
            <AppButton href="/contact" variant="ghost">
              Send an enquiry
            </AppButton>
          </div>
          <p className={`${styles.consult} ${styles.enter} ${styles.s5}`}>
            <span>Consultations at both clinics:</span>
            <Link className={styles.consultLink} href={BRANCH_PAGE_HREF.nampally}>
              Nampally
            </Link>
            <Link className={styles.consultLink} href={BRANCH_PAGE_HREF.mehdipatnam}>
              Mehdipatnam
            </Link>
          </p>
        </div>

        <figure className={`${styles.visual} ${styles.enterPhoto}`}>
          <div className={styles.frame}>
            <Image
              className={styles.photo}
              src={HERO.image}
              alt={HERO.imageAlt}
              fill
              sizes="(max-width: 900px) 92vw, 46vw"
              preload
            />
            <figcaption className={styles.meta}>
              <b>{HERO.captionLabel}</b>
              <span>{HERO.captionPlace}</span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
