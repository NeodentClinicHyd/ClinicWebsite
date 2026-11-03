"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { clinicLocations } from "@/lib/clinic-data";
import {
  directions,
  nampallyDirections,
  nampallyPhone,
  nampallyTelPhone,
  phone,
  telPhone,
} from "@/lib/site-data";
import { SectionHead } from "./SectionHead";
import { SwipeDots } from "./SwipeDots";
import styles from "./Locations.module.css";

/* ------------------------------------------------------------------
   10 Where to find him (patterns P5 and P9). Light band. Two branch
   cards side by side from 768 px. Each: the exterior photograph, the
   interior photograph overlapping its lower corner, the address, the
   phone (tel link), "Directions" and (new) the opening hours, read from
   lib/clinic-data.ts (never typed here). Under 768 px each clinic's two
   photographs are a two-card swipe row. The sentence with its three
   links sits directly under the heading.
   ------------------------------------------------------------------ */

const BRANCHES = [
  {
    id: "mehdipatnam",
    label: "01 / MEHDIPATNAM \u2014 HYDERABAD",
    address:
      "10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500006",
    phone,
    tel: telPhone,
    directions,
    clinic: clinicLocations.mehdipatnam,
    primary: {
      src: "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam exterior of clinic.jpeg",
      width: 4032,
      height: 3024,
      alt: "Neodent Dental Hospital Mehdipatnam \u2014 exterior of the clinic on Humayun Nagar Road, Hyderabad",
      label: "01 / MEHDIPATNAM \u00b7 EXTERIOR",
    },
    secondary: {
      src: "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam interior of clinic.jpeg",
      width: 3024,
      height: 4032,
      alt: "Neodent Dental Hospital Mehdipatnam \u2014 clinic interior where Dr. Md. Miftah Ur Rahman consults",
      label: "Interior",
    },
  },
  {
    id: "nampally",
    label: "02 / NAMPALLY \u2014 HYDERABAD",
    address:
      "Medwin Hospital Complex, Pillar #A1270, Raghav Ratna Towers, Chirag Ali Lane, Mahesh Nagar Colony, Nampally, Hyderabad, Telangana 500001",
    phone: nampallyPhone,
    tel: nampallyTelPhone,
    directions: nampallyDirections,
    clinic: clinicLocations.nampally,
    primary: {
      src: "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Exterior.jpg",
      width: 1280,
      height: 960,
      alt: "Neodent Dental Hospital Nampally \u2014 street frontage and signage at the Medwin Hospital Complex, Hyderabad",
      label: "02 / NAMPALLY \u00b7 EXTERIOR",
    },
    secondary: {
      src: "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg",
      width: 1280,
      height: 1707,
      alt: "Neodent Dental Hospital Nampally \u2014 reception and consultation wing interior",
      label: "Interior",
    },
  },
];

function BranchPhotos({ branch }: { branch: (typeof BRANCHES)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={styles.photosWrap}>
      <ul className={styles.photos} data-swipe>
        <li className={styles.primary}>
          <figure className={styles.figure}>
            <div className={styles.frame}>
              <Image
                src={branch.primary.src}
                alt={branch.primary.alt}
                fill
                sizes="(max-width: 767px) 84vw, 520px"
                className={styles.image}
              />
            </div>
            <figcaption className={styles.caption}>{branch.primary.label}</figcaption>
          </figure>
        </li>
        <li className={styles.inset}>
          <figure className={styles.figure}>
            <div className={styles.insetFrame}>
              <Image
                src={branch.secondary.src}
                alt={branch.secondary.alt}
                fill
                sizes="(max-width: 767px) 84vw, 200px"
                className={styles.image}
              />
            </div>
            <figcaption className={styles.caption}>{branch.secondary.label}</figcaption>
          </figure>
        </li>
      </ul>
      <SwipeDots listRef={ref} count={2} noun="Photograph" className={styles.dots} />
    </div>
  );
}

export function Locations() {
  return (
    <section className={styles.section} aria-labelledby="miftah-locations-title">
      <div className={styles.container}>
        <SectionHead
          eyebrow="10 / WHERE TO FIND HIM"
          id="miftah-locations-title"
          title="Two doors. One standard of care."
          lede={
            <>
              Visit the{" "}
              <Link href="/clinic/mehdipatnam" className={styles.inlineLink}>
                Mehdipatnam clinic page
              </Link>{" "}
              or the{" "}
              <Link href="/clinic/nampally" className={styles.inlineLink}>
                Nampally clinic page
              </Link>
              , and read the wider practice story on{" "}
              <a href="/about" className={styles.inlineLink}>
                About Neodent
              </a>
              .
            </>
          }
        />

        <Reveal className={styles.grid} stagger={100}>
          {BRANCHES.map((branch) => (
            <article className={styles.card} id={branch.id} key={branch.id}>
              <BranchPhotos branch={branch} />
              <div className={styles.details}>
                <p className={styles.branchIndex}>{branch.label}</p>
                <address className={styles.address}>{branch.address}</address>
                <p className={styles.hours}>
                  <span>Opening hours</span>
                  {branch.clinic.weeklyHours}, {branch.clinic.hours}. {branch.clinic.weeklyClosure}.
                </p>
                <div className={styles.actions}>
                  <a href={branch.tel} className={styles.phone}>
                    {branch.phone}
                  </a>
                  <a
                    href={branch.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directions}
                  >
                    Directions <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
