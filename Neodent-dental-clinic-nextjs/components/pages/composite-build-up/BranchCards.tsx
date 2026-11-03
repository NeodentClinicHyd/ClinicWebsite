import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { AppButton } from "@/components/ui/AppButton";
import { MEHDIPATNAM_INTERIOR } from "@/lib/pages/composite-build-up-content";
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
import styles from "./BranchCards.module.css";

type BranchHrefs = { nampally: string; mehdipatnam: string };

/**
 * Two branch cards (Nampally, Mehdipatnam). Fork of components/ui/
 * BranchCards.tsx. Every fact is read from lib/site-data.ts, nothing is
 * retyped. Changes from the original: the photographs are capped in height
 * (36dvh on laptop, 28dvh on phones), the labels are 12 px or larger, phone
 * links are 44 px tall on small screens, the cards reveal one after another,
 * and (decision D7) the Mehdipatnam card shows the interior photograph with
 * its own alt text. The Nampally photograph, address, hours, phone and links
 * are unchanged. Branch names are h3, so the host section supplies the h2.
 */
export function BranchCards({ detailsHref }: { detailsHref: BranchHrefs }) {
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
      position: "50% 30%",
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
      image: MEHDIPATNAM_INTERIOR.src,
      alt: MEHDIPATNAM_INTERIOR.alt,
      position: MEHDIPATNAM_INTERIOR.position,
    },
  ];

  return (
    <Reveal className={styles.branches} stagger={120}>
      {branches.map((branch) => (
        <article className={styles.branch} key={branch.key}>
          <div className={styles.photo}>
            <Image
              src={branch.image}
              alt={branch.alt}
              fill
              sizes="(max-width: 767px) 92vw, 44vw"
              style={{ objectPosition: branch.position }}
            />
          </div>
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
              <AppButton href={branch.directions} variant="light">
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
