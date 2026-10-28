"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppButton } from "@/components/ui/AppButton";
import { ContactEnquiryForm } from "@/components/contact/ContactEnquiryForm";
import { useReveal } from "@/components/clinic/useReveal";
import shared from "@/components/clinic/ClinicShared.module.css";
import choose from "@/components/clinic/ChooseClinic.module.css";
import {
  clinicGalleryImages,
  ctaPhone,
  ctaTelPhone,
  directions,
  mehdipatnamAddress,
  mehdipatnamExteriorImage,
  mehdipatnamHours,
  mehdipatnamTreatmentRoomOneImage,
  nampallyAddress,
  nampallyDirections,
  nampallyExteriorImage,
  nampallyHours,
  nampallyInteriorImage,
  nampallyPhone,
  nampallyTelPhone,
  phone,
  telPhone,
} from "@/lib/site-data";
import styles from "./contact.module.css";

/* ------------------------------------------------------------------
   /contact -- design pass only. Form logic, validation, the enquiry API,
   email and Turnstile are untouched (see components/contact).

   Rhythm, as on home / about / clinic: dark hero -> ivory (clinics) ->
   dark (before your visit) -> ivory (enquiry) -> footer.

   Every phone number, address, opening time and map link is read from
   lib/site-data.ts. The page copy is the page's existing copy.
   ------------------------------------------------------------------ */

const heroPhoto = clinicGalleryImages.find(
  (image) => image.src === nampallyInteriorImage,
);
const roomPhoto = clinicGalleryImages.find(
  (image) => image.src === mehdipatnamTreatmentRoomOneImage,
);

type Branch = {
  id: "mehdipatnam" | "nampally";
  name: string;
  locality: string;
  photo: { src: string; alt: string; caption: string; position: string };
  address: string;
  phone: string;
  tel: string;
  hours: string;
  directions: string;
};

/* Same branch cards, photographs and captions as /clinic. */
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
    address: nampallyAddress,
    phone: nampallyPhone,
    tel: nampallyTelPhone,
    hours: nampallyHours,
    directions: nampallyDirections,
  },
];

export function ContactClientChrome() {
  const clinicsRef = useRef<HTMLElement>(null);
  const visitRef = useRef<HTMLElement>(null);
  const enquiryRef = useRef<HTMLElement>(null);
  useReveal(clinicsRef);
  useReveal(visitRef);
  useReveal(enquiryRef);

  return (
    <div className="site">
      <Navbar overHero />
      <main>
        {/* 1 ── Hero ─────────────────────────────────────────────── */}
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className={styles.bg} aria-hidden="true">
            <span className={styles.gridlines} />
          </div>

          <div className={styles.inner}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Contact</p>
              <h1 id="contact-title" className={styles.headline}>
                Let&apos;s make a
                <span className={styles.accent}>beginning.</span>
              </h1>
              <p className={styles.lede}>
                Good care starts with a conversation. Reach the Neodent team at
                the branch that suits you, and we&apos;ll take it from there.
              </p>
              <div className={styles.actions}>
                <AppButton href={ctaTelPhone} variant="primary">
                  <Phone size={15} aria-hidden="true" /> Call {ctaPhone}
                </AppButton>
                <AppButton href="#enquiry" variant="ghost" className={styles.ghost}>
                  Send an enquiry
                </AppButton>
              </div>
            </div>

            <figure className={styles.visual}>
              <div className={styles.frame}>
                <div className={styles.imageBox}>
                  <Image
                    className={styles.image}
                    src={nampallyInteriorImage}
                    alt={
                      heroPhoto?.alt ??
                      "Neodent Dental Hospital Nampally — the double-height reception and consultation wing"
                    }
                    fill
                    sizes="(min-width: 1024px) 468px, (min-width: 768px) 420px, 90vw"
                    preload
                  />
                </div>
                <div className={styles.callCard}>
                  <span className={styles.callLabel}>
                    Call today for a consultation
                  </span>
                  <a
                    className={styles.callPhone}
                    href={ctaTelPhone}
                    data-testid="link-contact-hero-phone"
                  >
                    <Phone size={16} aria-hidden="true" />
                    {ctaPhone}
                  </a>
                </div>
              </div>
              <figcaption className={styles.caption}>
                <b>Nampally</b>
                <span>{heroPhoto?.label ?? "Reception & staircase"}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 2 ── Choose a clinic ──────────────────────────────────── */}
        <section
          ref={clinicsRef}
          className={`${shared.section} ${shared.ivory} ${shared.grid} ${styles.clinics}`}
          id="clinics"
          aria-labelledby="directory-title"
        >
          <div className={shared.container}>
            <h2 id="directory-title" className={shared.title} data-reveal>
              Two doors into <span>Neodent.</span>
            </h2>

            <ul className={choose.branches}>
              {branches.map((branch) => (
                <li
                  key={branch.id}
                  id={branch.id}
                  className={choose.branch}
                  data-reveal
                >
                  <article
                    className={choose.card}
                    aria-labelledby={`${branch.id}-name`}
                  >
                    <figure className={choose.figure}>
                      <div
                        className={`${shared.photo} ${shared.shade} ${choose.photo}`}
                      >
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

                    <div className={choose.cardBody}>
                      <div>
                        <h3 id={`${branch.id}-name`} className={choose.name}>
                          {branch.name}
                        </h3>
                        <p className={shared.label}>{branch.locality}</p>
                      </div>

                      <dl className={`${shared.facts} ${choose.facts}`}>
                        <div className={shared.fact}>
                          <dt>Address</dt>
                          <dd>{branch.address}</dd>
                        </div>
                        <div className={shared.fact}>
                          <dt>Phone</dt>
                          <dd className={shared.strong}>
                            <a
                              href={branch.tel}
                              className={choose.phone}
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

                      <div className={choose.actions}>
                        <AppButton href={branch.tel} variant="primary">
                          <Phone size={15} aria-hidden="true" /> Call
                          <span className={shared.srOnly}> Neodent {branch.name}</span>
                        </AppButton>
                        <a
                          href={branch.directions}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`button button-ghost ${choose.directions}`}
                        >
                          <MapPin size={15} aria-hidden="true" /> Directions
                          <span className={shared.srOnly}>
                            {" "}
                            to Neodent {branch.name} (opens in a new tab)
                          </span>
                        </a>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 ── Before your visit ────────────────────────────────── */}
        <section
          ref={visitRef}
          className={`${shared.section} ${shared.dark} ${shared.atlas}`}
          id="before-your-visit"
          aria-labelledby="visit-title"
        >
          <div className={shared.container}>
            <h2 id="visit-title" className={shared.title} data-reveal>
              A little clarity <span>goes a long way.</span>
            </h2>

            <div className={styles.visitGrid}>
              <article className={`${styles.vCard} ${styles.vChoose}`} data-reveal>
                <h3 className={styles.vTitle}>Choose your branch</h3>
                <p className={styles.vText}>
                  Start with the location that is easiest for you.
                </p>
                <ul className={styles.branchLinks}>
                  {branches.map((branch) => (
                    <li key={branch.id}>
                      <a href={`#${branch.id}`} className={styles.branchLink}>
                        <Image
                          src={branch.photo.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 330px, (min-width: 768px) 46vw, 92vw"
                          style={{ objectPosition: branch.photo.position }}
                        />
                        <span className={styles.branchLinkName}>{branch.name}</span>
                        <ArrowRight
                          className={styles.branchLinkArrow}
                          size={18}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </article>

              <figure className={styles.vPhoto} data-reveal>
                <Image
                  src="/assets/neodent-dental-hospital-doctors.jpeg"
                  alt="Five people in clinical attire standing together in front of red-framed consultation chamber doors at Neodent Dental Hospital"
                  fill
                  sizes="(min-width: 1024px) 780px, 92vw"
                />
              </figure>

              <article className={`${styles.vCard} ${styles.vCall}`} data-reveal>
                <h3 className={styles.vTitle}>Speak with our team</h3>
                <p className={styles.vText}>
                  Call us and we will guide the next step.
                </p>
                <a href={ctaTelPhone} className={styles.callFigure}>
                  <Phone size={20} aria-hidden="true" />
                  {ctaPhone}
                </a>
              </article>

              <article className={`${styles.vCard} ${styles.vArrive}`} data-reveal>
                <h3 className={styles.vTitle}>Arrive with clarity</h3>
                <p className={styles.arriveText}>
                  Your first visit begins with time to understand.
                </p>
              </article>

              <div className={`${styles.vCard} ${styles.vFee}`} data-reveal>
                <p className={styles.feeLabel}>Consultation</p>
                <p className={styles.feeValue}>Rs. 500</p>
              </div>

              <div className={styles.vCta} data-reveal>
                <AppButton href="#enquiry" variant="primary">
                  Start a conversation <ArrowRight size={15} aria-hidden="true" />
                </AppButton>
              </div>
            </div>
          </div>
        </section>

        {/* 4 ── Enquiry ──────────────────────────────────────────── */}
        <section
          ref={enquiryRef}
          className={`${shared.section} ${shared.ivory} ${shared.grid} ${styles.enquiry}`}
          id="enquiry"
          aria-labelledby="enquiry-title"
        >
          <div className={shared.container}>
            <div className={styles.enquiryGrid}>
              <div className={styles.aside} data-reveal>
                <h2 id="enquiry-title" className={shared.title}>
                  Have a question? <span>Let&apos;s talk.</span>
                </h2>
                <p className={shared.lede}>
                  Have a question about a treatment, clinic location or your next
                  step? Send us a message and the Neodent team will get back to
                  you.
                </p>

                <figure className={styles.asidePhoto}>
                  <div className={`${shared.photo} ${shared.shade} ${styles.asideFrame}`}>
                    <Image
                      src={mehdipatnamTreatmentRoomOneImage}
                      alt={
                        roomPhoto?.alt ??
                        "Neodent Dental Hospital Mehdipatnam — a fully equipped dental treatment room"
                      }
                      fill
                      sizes="(min-width: 1024px) 460px, 92vw"
                      style={{ objectPosition: roomPhoto?.position ?? "50% 55%" }}
                    />
                    <figcaption className={shared.inCaption}>
                      Mehdipatnam · {roomPhoto?.label ?? "Treatment room"}
                    </figcaption>
                  </div>
                </figure>

                <section className={styles.callList} aria-labelledby="prefer-call-title">
                  <h3 id="prefer-call-title">Prefer to call?</h3>
                  <dl className={styles.callRows}>
                    <div className={styles.callRow}>
                      <dt>General</dt>
                      <dd>
                        <a href={ctaTelPhone}>{ctaPhone}</a>
                      </dd>
                    </div>
                    <div className={styles.callRow}>
                      <dt>Mehdipatnam</dt>
                      <dd>
                        <a href={telPhone}>{phone}</a>
                      </dd>
                    </div>
                    <div className={styles.callRow}>
                      <dt>Nampally</dt>
                      <dd>
                        <a href={nampallyTelPhone}>{nampallyPhone}</a>
                      </dd>
                    </div>
                  </dl>
                </section>
              </div>

              <div className={styles.formCard} data-reveal>
                <ContactEnquiryForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ContactClientChrome;
