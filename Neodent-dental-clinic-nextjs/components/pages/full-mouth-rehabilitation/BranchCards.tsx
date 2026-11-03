import Image from "next/image";
import Link from "next/link";
import { AppButton } from "@/components/ui/AppButton";
import { Reveal } from "@/components/motion/Reveal";
import {
  SITE_NAME,
  directions,
  mehdipatnamAddress,
  mehdipatnamHours,
  nampallyAddress,
  nampallyDirections,
  nampallyExteriorImage,
  nampallyHours,
  nampallyPhone,
  nampallyTelPhone,
  phone,
  telPhone,
} from "@/lib/site-data";
import {
  MEHDIPATNAM_INTERIOR_ALT,
  MEHDIPATNAM_INTERIOR_IMAGE,
} from "@/lib/pages/full-mouth-rehabilitation-content";
import styles from "./BranchCards.module.css";

type BranchHrefs = { nampally: string; mehdipatnam: string };

/**
 * Two branch cards (Nampally, Mehdipatnam), fork for the full mouth
 * rehabilitation page. The Mehdipatnam photograph is the interior shot (D7). Every fact is read from
 * lib/site-data.ts — nothing is retyped here. Pattern: the
 * SpacesDesignedAroundCare branch panel (photograph plate, serif branch
 * name, label / value rows) inside the ContactNextStep card surface.
 * `detailsHref` supplies each "Clinic details" link. Branch names are h3,
 * so the host section supplies the h2.
 */
export function BranchCards({
  detailsHref,
  tone = "dark",
}: {
  detailsHref: BranchHrefs;
  tone?: "dark" | "light";
}) {
  const branches = [
    {
      key: "nampally",
      name: "Nampally",
      address: nampallyAddress,
      phoneLabel: nampallyPhone,
      tel: nampallyTelPhone,
      hours: nampallyHours,
      directions: nampallyDirections,
      details: detailsHref.nampally,
      image: nampallyExteriorImage,
      alt: "Street front of Neodent Dental Hospital, Nampally, with a yellow signboard above two shutters and a red-framed glass door",
      position: "50% 40%",
    },
    {
      key: "mehdipatnam",
      name: "Mehdipatnam",
      address: mehdipatnamAddress,
      phoneLabel: phone,
      tel: telPhone,
      hours: mehdipatnamHours,
      directions,
      details: detailsHref.mehdipatnam,
      image: MEHDIPATNAM_INTERIOR_IMAGE,
      alt: MEHDIPATNAM_INTERIOR_ALT,
      position: "50% 42%",
    },
  ];

  return (
    <Reveal
      className={`${styles.branches} ${tone === "light" ? styles.light : ""}`}
      stagger={120}
    >
      {branches.map((branch) => (
        <article className={styles.branch} key={branch.key}>
          <Reveal variant="mask" className={styles.photo}>
            <Image
              src={branch.image}
              alt={branch.alt}
              fill
              sizes="(max-width: 767px) 92vw, 44vw"
              style={{ objectPosition: branch.position }}
            />
          </Reveal>
          <div className={styles.body}>
            <p className={styles.brand}>{SITE_NAME}</p>
            <h3 className={styles.name}>{branch.name}</h3>
            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt>Address</dt>
                <dd>{branch.address}</dd>
              </div>
              <div className={styles.fact}>
                <dt>Hours</dt>
                <dd>
                  {branch.hours}
                  <span className={styles.holiday}>Sunday holiday</span>
                </dd>
              </div>
              <div className={styles.fact}>
                <dt>Phone</dt>
                <dd>
                  <a className={styles.phone} href={branch.tel}>
                    {branch.phoneLabel}
                  </a>
                </dd>
              </div>
            </dl>
            <div className={styles.actions}>
              <AppButton
                href={branch.directions}
                variant={tone === "light" ? "dark" : "light"}
              >
                Directions
              </AppButton>
              <Link className={`button button-ghost ${styles.details}`} href={branch.details}>
                Clinic details
              </Link>
            </div>
          </div>
        </article>
      ))}
    </Reveal>
  );
}
