"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { treatments } from "@/components/sections/expertise-data";
import {
  legacyStats,
  mehdipatnamInteriorImage,
  nampallyTelPhone,
  telPhone,
} from "@/lib/site-data";
import shared from "./ClinicShared.module.css";
import styles from "./ClinicHero.module.css";

/* ------------------------------------------------------------------
   Clinic -- page hero + "at a glance" strip.

   Pattern: the About hero (itself the home Hero's founder slide): dark
   ground, 64px grid, framed photograph with a small caption, sans
   headline with a red serif accent. The strip underneath is the About
   "At a glance" strip, with this page's four approved figures.

   The Navbar is rendered with `overHero` by ClinicClientChrome so it
   stays transparent over this dark ground.
   ------------------------------------------------------------------ */

const glance: { value: string; label: string }[] = [
  { value: `Since ${legacyStats.established}`, label: "in Hyderabad" },
  { value: "2", label: "clinics" },
  { value: String(treatments.length), label: "treatments at each clinic" },
  { value: legacyStats.patientsTreated, label: "patients treated" },
];

export function ClinicHero() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="clinic-title">
        <div className={styles.bg} aria-hidden="true">
          <span className={styles.gridlines} />
        </div>

        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Our clinics · Hyderabad</p>
            <h1 id="clinic-title" className={styles.headline}>
              Two locations.
              <span className={styles.accent}>One Neodent standard.</span>
            </h1>
            <p className={styles.lede}>
              Neodent Dental Hospital provides{" "}
              <EditorialHighlight tone="secondary" onDark>
                specialist-led dental care
              </EditorialHighlight>{" "}
              across two Hyderabad locations — in{" "}
              <EditorialHighlight tone="quiet" onDark>
                Mehdipatnam and Nampally
              </EditorialHighlight>
              . Each clinic serves patients seeking restorative, implant,
              prosthodontic, preventive and smile-focused treatment within the
              same Neodent clinical environment.
            </p>
            <div className={styles.actions}>
              <AppButton href={telPhone} variant="primary">
                <Phone size={15} aria-hidden="true" /> Call Mehdipatnam
              </AppButton>
              <AppButton
                href={nampallyTelPhone}
                variant="ghost"
                className={styles.ghost}
              >
                <Phone size={15} aria-hidden="true" /> Call Nampally
              </AppButton>
            </div>
          </div>

          <figure className={styles.visual}>
            <div className={styles.frame}>
              <div className={styles.imageBox}>
                <Image
                  className={styles.image}
                  src={mehdipatnamInteriorImage}
                  alt="Neodent Dental Hospital, Mehdipatnam — patient waiting lounge interior"
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 360px, 80vw"
                  preload
                />
              </div>
            </div>
            <figcaption className={styles.caption}>
              <b>Mehdipatnam</b>
              <span>Waiting lounge</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className={`${shared.ivory} ${styles.stripSection}`}
        aria-label="Neodent at a glance"
      >
        <div className={shared.container}>
          <div className={styles.why}>
            <p className={styles.whyTitle} aria-hidden="true">
              At a glance
            </p>
            <ul className={styles.whyList} aria-label="Neodent at a glance">
              {glance.map(({ value, label }) => (
                <li className={styles.whyCell} key={label}>
                  <span className={styles.whyValue}>{value}</span>
                  <span className={styles.whyLabel}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
