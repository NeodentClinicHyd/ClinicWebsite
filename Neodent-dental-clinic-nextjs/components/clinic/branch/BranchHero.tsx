"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import type { ClinicLocation } from "@/lib/clinic-data";
import { branchContent, photoSize } from "./branch-content";
import styles from "./BranchHero.module.css";

/* ------------------------------------------------------------------
   Branch page -- hero.

   Pattern: the /clinic hero (dark ground, 64px grid, framed photograph
   with a small caption, sans headline with a red serif accent). The
   difference is the frame: its box takes the photograph's own aspect
   ratio, so the picture is shown whole -- never cropped or stretched.
   ------------------------------------------------------------------ */

export function BranchHero({ clinic }: { clinic: ClinicLocation }) {
  const content = branchContent[clinic.slug];
  const { src, alt, label } = clinic.primaryImage;
  const { width, height } = photoSize(src);
  const portrait = height > width;

  return (
    <section className={styles.hero} aria-labelledby="branch-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.gridlines} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
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

          <p className={styles.eyebrow}>{clinic.locality}</p>
          <h1 id="branch-title" className={styles.headline}>
            Neodent Dental Hospital
            <span className={styles.srOnly}>, </span>
            <span className={styles.accent}>{content.accent}</span>
          </h1>
          <p className={styles.lede}>{content.lede}</p>

          <p className={styles.hours}>
            <Clock size={15} aria-hidden="true" />
            <span>
              {clinic.weeklyHours} · {clinic.hours} · {clinic.weeklyClosure}
            </span>
          </p>

          <div className={styles.actions}>
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

        <figure
          className={`${styles.visual} ${portrait ? styles.portrait : styles.landscape}`}
        >
          <div className={styles.frame}>
            <div
              className={styles.imageBox}
              style={{ aspectRatio: `${width} / ${height}` }}
            >
              <Image
                className={styles.image}
                src={src}
                alt={alt}
                fill
                sizes={
                  portrait
                    ? "(min-width: 1024px) 380px, (min-width: 768px) 360px, 80vw"
                    : "(min-width: 1024px) 480px, (min-width: 768px) 440px, 92vw"
                }
                preload
              />
            </div>
          </div>
          <figcaption className={styles.caption}>
            <b>{clinic.name}</b>
            <span>{label}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
