"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import {
  directions,
  mehdipatnamAddress,
  mehdipatnamExteriorImage,
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
import { useReveal } from "./useReveal";
import shared from "./ClinicShared.module.css";
import styles from "./ChooseClinic.module.css";

/* ------------------------------------------------------------------
   Clinic -- "Find your clinic."

   Pattern: the About doctor card (label / value facts in one grouped
   block) scaled up to a branch card, with a photograph on top and the
   home buttons underneath. Phones, addresses, hours and directions all
   come from lib/site-data.ts. The wrapper ids (#mehdipatnam,
   #nampally) are the anchors the Footer links to.

   Directions opens in a new tab, as it did before; AppButton renders a
   plain anchor without target/rel, so that one button is a local anchor
   carrying the same `button button-ghost` classes.
   ------------------------------------------------------------------ */

type Branch = {
  id: "mehdipatnam" | "nampally";
  name: string;
  locality: string;
  photo: { src: string; alt: string; caption: string; position: string };
  body: ReactNode;
  address: string;
  phone: string;
  tel: string;
  hours: string;
  directions: string;
};

const branches: Branch[] = [
  {
    id: "mehdipatnam",
    name: "Mehdipatnam",
    locality: "Humayun Nagar · Hyderabad",
    photo: {
      src: mehdipatnamExteriorImage,
      alt: "Neodent Dental Hospital Mehdipatnam — carved entrance doorway and exterior",
      caption: "Entrance",
      position: "50% 36%",
    },
    body: (
      <>
        Neodent&apos;s{" "}
        <EditorialHighlight tone="primary">Mehdipatnam clinic</EditorialHighlight>{" "}
        in Humayun Nagar is the original Hyderabad location, providing
        patients access to{" "}
        <EditorialHighlight tone="secondary">
          specialist-led dental care
        </EditorialHighlight>{" "}
        across restorative, prosthodontic, implant and preventive needs — the
        practice that began here in 1994 and continues today.
      </>
    ),
    address: mehdipatnamAddress,
    phone,
    tel: telPhone,
    hours: mehdipatnamHours,
    directions,
  },
  {
    id: "nampally",
    name: "Nampally",
    locality: "Medwin Hospital Complex · Hyderabad",
    photo: {
      src: nampallyExteriorImage,
      alt: "Neodent Dental Hospital Nampally — street frontage and signage",
      caption: "Street frontage",
      position: "50% 38%",
    },
    body: (
      <>
        The{" "}
        <EditorialHighlight tone="primary">Nampally clinic</EditorialHighlight>{" "}
        brings the same Neodent clinical approach to central Hyderabad,
        supporting patients through{" "}
        <EditorialHighlight tone="secondary">
          consultation, treatment planning, treatment and follow-up
        </EditorialHighlight>{" "}
        care within the Medwin Hospital Complex.
      </>
    ),
    address: nampallyAddress,
    phone: nampallyPhone,
    tel: nampallyTelPhone,
    hours: nampallyHours,
    directions: nampallyDirections,
  },
];

export function ChooseClinic() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory} ${shared.grid} ${styles.choose}`}
      id="our-clinics"
      aria-labelledby="choose-title"
    >
      <div className={shared.container}>
        <h2 id="choose-title" className={shared.title} data-reveal>
          Find your clinic. <span>Mehdipatnam or Nampally.</span>
        </h2>

        <ul className={styles.branches}>
          {branches.map((branch) => (
            <li
              key={branch.id}
              id={branch.id}
              className={styles.branch}
              data-reveal
            >
              <article
                className={styles.card}
                aria-labelledby={`${branch.id}-name`}
              >
                <figure className={styles.figure}>
                  <div className={`${shared.photo} ${shared.shade} ${styles.photo}`}>
                    <Image
                      src={branch.photo.src}
                      alt={branch.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 570px, (min-width: 768px) 46vw, 92vw"
                      style={{ objectPosition: branch.photo.position }}
                    />
                    <figcaption className={shared.inCaption}>
                      {branch.photo.caption}
                    </figcaption>
                  </div>
                </figure>

                <div className={styles.cardBody}>
                  <div>
                    <h3 id={`${branch.id}-name`} className={styles.name}>
                      {branch.name}
                    </h3>
                    <p className={shared.label}>{branch.locality}</p>
                  </div>

                  <p className={`${shared.body} ${styles.description}`}>
                    {branch.body}
                  </p>

                  <dl className={`${shared.facts} ${styles.facts}`}>
                    <div className={shared.fact}>
                      <dt>Address</dt>
                      <dd>{branch.address}</dd>
                    </div>
                    <div className={shared.fact}>
                      <dt>Phone</dt>
                      <dd className={shared.strong}>
                        <a
                          href={branch.tel}
                          className={styles.phone}
                          aria-label={`Call Neodent ${branch.name}`}
                        >
                          {branch.phone}
                        </a>
                      </dd>
                    </div>
                    <div className={shared.fact}>
                      <dt>Hours</dt>
                      <dd>{branch.hours}</dd>
                    </div>
                  </dl>

                  <div className={styles.actions}>
                    <AppButton href={branch.tel} variant="primary">
                      <Phone size={15} aria-hidden="true" /> Call
                      <span className={shared.srOnly}> Neodent {branch.name}</span>
                    </AppButton>
                    <a
                      href={branch.directions}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`button button-ghost ${styles.directions}`}
                    >
                      <MapPin size={15} aria-hidden="true" /> Get directions
                      <span className={shared.srOnly}>
                        {" "}
                        to Neodent {branch.name} (opens in a new tab)
                      </span>
                    </a>
                  </div>
                </div>
              </article>

              <a href="/doctors/dr-miftah-ur-rahman" className={styles.doctor}>
                <span>Dr. Md. Miftah Ur Rahman practises here</span>
                <ArrowRight size={16} aria-hidden="true" className={styles.doctorArrow} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
