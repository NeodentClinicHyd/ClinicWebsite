import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin, Phone } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { Reveal } from "@/components/motion/Reveal";
import { clinicLocations } from "@/lib/clinic-data";
import { mehdipatnamExteriorImage, nampallyExteriorImage } from "@/lib/site-data";
import styles from "./ClinicCards.module.css";

/* ------------------------------------------------------------------
   Clinics hub -- S2 "Find your clinic."

   Forked from components/clinic/ChooseClinic.tsx (the original and its
   CSS stay as they were; /contact still imports that CSS). Heading,
   kickers, both paragraphs, photo alt texts and captions, the Dr. rows
   and every button label are moved unchanged. Phone, address, hours and
   directions come from lib/clinic-data.ts.

   Added (PAGE_PLAN Q7, default applied): one plain supporting line under
   the heading, built from facts already on the page.

   The highlighted phrases are EditorialHighlight, kept as they were (two
   per paragraph). The ids #mehdipatnam and #nampally stay on the card
   wrappers.
   ------------------------------------------------------------------ */

const { mehdipatnam, nampally } = clinicLocations;

const branches = [
  {
    id: "mehdipatnam",
    clinic: mehdipatnam,
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
        in Humayun Nagar is the original Hyderabad location, providing patients
        access to{" "}
        <EditorialHighlight tone="secondary">
          specialist-led dental care
        </EditorialHighlight>{" "}
        across restorative, prosthodontic, implant and preventive needs — the
        practice that began here in 1994 and continues today.
      </>
    ),
  },
  {
    id: "nampally",
    clinic: nampally,
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
  },
] as const;

export function ClinicCards() {
  return (
    <section
      className={styles.section}
      id="our-clinics"
      aria-labelledby="choose-title"
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <Reveal
            as="h2"
            variant="mask"
            stagger={90}
            id="choose-title"
            className={styles.title}
          >
            {"Find your clinic. "}
            <span className={styles.accent}>Mehdipatnam or Nampally.</span>
          </Reveal>
          <Reveal as="p" delay={120} className={styles.support}>
            Two Neodent dental clinics in Hyderabad: Mehdipatnam in Humayun
            Nagar and Nampally in the Medwin Hospital Complex.
          </Reveal>
        </header>

        <Reveal as="ul" stagger={100} className={styles.branches}>
          {branches.map(({ id, clinic, locality, photo, body }) => (
            <li key={id} id={id} className={styles.branch}>
              <article className={styles.card} aria-labelledby={`${id}-name`}>
                <figure className={styles.figure}>
                  <Reveal variant="mask">
                    <div className={styles.photo}>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 570px, (min-width: 768px) 46vw, 92vw"
                        style={{ objectPosition: photo.position }}
                      />
                    </div>
                  </Reveal>
                  <figcaption className={styles.caption}>{photo.caption}</figcaption>
                </figure>

                <div className={styles.body}>
                  <div>
                    <h3 id={`${id}-name`} className={styles.name}>
                      {clinic.name}
                    </h3>
                    <p className={styles.kicker}>{locality}</p>
                  </div>

                  <p className={styles.description}>{body}</p>

                  <dl className={styles.facts}>
                    <div className={styles.fact}>
                      <dt>Address</dt>
                      <dd>{clinic.address}</dd>
                    </div>
                    <div className={styles.fact}>
                      <dt>Phone</dt>
                      <dd className={styles.strong}>
                        <a
                          href={clinic.tel}
                          className={styles.phone}
                          aria-label={`Call Neodent ${clinic.name}`}
                        >
                          {clinic.phone}
                        </a>
                      </dd>
                    </div>
                    <div className={styles.fact}>
                      <dt>Hours</dt>
                      <dd>
                        {clinic.hours} · {clinic.weeklyClosure}
                      </dd>
                    </div>
                  </dl>

                  <div className={styles.actions}>
                    <AppButton
                      href={clinic.tel}
                      variant="primary"
                      className={styles.call}
                    >
                      <Phone size={15} aria-hidden="true" /> Call
                      <span className={styles.srOnly}> Neodent {clinic.name}</span>
                    </AppButton>
                    <a
                      href={clinic.directions}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`button button-ghost ${styles.outline}`}
                    >
                      <MapPin size={15} aria-hidden="true" /> Get directions
                      <span className={styles.srOnly}>
                        {" "}
                        to Neodent {clinic.name} (opens in a new tab)
                      </span>
                    </a>
                    <Link
                      href={`/clinic/${id}`}
                      className={`button button-ghost ${styles.outline}`}
                    >
                      Clinic details <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>

              <Link href="/doctors/dr-miftah-ur-rahman" className={styles.doctor}>
                <span>Dr. Md. Miftah Ur Rahman practises here</span>
                <ChevronRight size={18} aria-hidden="true" className={styles.chevron} />
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
