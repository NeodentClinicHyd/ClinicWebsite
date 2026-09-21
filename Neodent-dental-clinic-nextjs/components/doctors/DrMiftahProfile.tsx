"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, ArrowDown, Play, Pause } from "lucide-react";
import styles from "./DrMiftahProfile.module.css";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { AppButton } from "@/components/ui/AppButton";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { OffsetImagePair } from "@/components/ui/OffsetImagePair";
import {
  directions,
  nampallyDirections,
  nampallyPhone,
  nampallyTelPhone,
  phone,
  telPhone,
} from "@/lib/site-data";

/* ------------------------------------------------------------------
   Doctor profile page — Dr. Md. Miftah Ur Rahman.

   Twelve editorial chapters on alternating cream (ivory) and charcoal
   bands, written entirely in the site's existing design language:
   the archive grammar's eyebrow + ghost numeral, DM Serif Display
   two-line headings with the red-italic second line, the shared
   EditorialHighlight component for inline red phrases, offset image
   plates, and the roman-numeral folio grid already established by
   ClinicalLeadership.

   Every fact (credentials, posts, institutions, publications,
   reviews, addresses) is reproduced verbatim from the client brief.
   No graduation years, no opening hours (the Google Business Profile
   discrepancy is being resolved separately), no invented awards.
   Patient review text is unedited.
   ------------------------------------------------------------------ */

/* Hero portrait — the client-supplied photograph at the Department of
   Prosthodontics, SB Patil Dental College & Hospital. Also the source
   for the OG crop (scripts/derive-og-miftah.mjs). */
const PORTRAIT = {
  src: "/assets/dr-miftah/Dr Md Miftah at Dept of Prosthodontics at SB Patil Dental College.jpeg",
  width: 853,
  height: 1280,
  alt: "Dr. Md. Miftah Ur Rahman at the Department of Prosthodontics, SB Patil Dental College & Hospital",
};

const TREATMENT_IMAGE = {
  src: "/assets/dr-miftah/Dr. Md. Miftah Ur Rahman during treatment- Neodent Dental Hospital.jpg",
  width: 704,
  height: 1372,
  alt: "Dr. Md. Miftah Ur Rahman performing a dental treatment procedure at Neodent Dental Hospital, Hyderabad",
};

/* Operatory interior reused from the /clinic imagery for the biography
   composition's secondary plate. */
const TREATMENT_ROOM_IMAGE = {
  src: "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam treatment room 1.jpeg",
  width: 4032,
  height: 3024,
  alt: "Treatment room interior at Neodent Dental Hospital Mehdipatnam, where Dr. Md. Miftah Ur Rahman practises",
};

const TEACHING_IMAGE = {
  src: "/assets/dr-miftah/Dr Md Miftah at Dept of Prosthodontics at SB Patil Dental College condicting seminar.jpeg",
  width: 1008,
  height: 1071,
  alt: "Dr. Md. Miftah Ur Rahman conducting a prosthodontics seminar for dental students at the Department of Prosthodontics, SB Patil Dental College & Hospital",
};

/* Section 05 recognition plate — award photograph presented to him
   at a ceremony (also plate i of the Section 07 folio). */
const ACADEMIC_FRAME_IMAGE = {
  src: "/assets/dr-miftah/Award presented to Dr Miftah ur Rahman by Dr K Mahendranadh Reddy.jpeg",
  width: 1170,
  height: 1150,
  alt: "Dr. Md. Miftah Ur Rahman receiving a framed certificate presented by Dr. K Mahendranadh Reddy",
};

/* Recognition folio — existing certificate, award and press imagery. */
const RECOGNITION_PLATES = [
  {
    index: "i",
    src: "/assets/dr-miftah/Award presented to Dr Miftah ur Rahman by Dr K Mahendranadh Reddy.jpeg",
    width: 1170,
    height: 1150,
    alt: "Dr. Md. Miftah Ur Rahman receiving a framed certificate presented by Dr. K Mahendranadh Reddy",
    caption: "Certificate / presented at ceremony",
  },
  {
    index: "ii",
    src: "/assets/dr-miftah/dr-miftah-award-recognition.jpg",
    width: 1280,
    height: 960,
    alt: "Dr. Md. Miftah Ur Rahman receiving a certificate at a professional ceremony",
    caption: "Recognition / professional ceremony",
  },
  {
    index: "iii",
    src: "/assets/news-articles/Dr miftah neodent dental clinic hyderabad news.jpg",
    width: 530,
    height: 1280,
    alt: "Newspaper coverage featuring Dr. Md. Miftah Ur Rahman at Neodent Dental Clinic, Hyderabad",
    caption: "Press / Hyderabad daily",
  },
  {
    index: "iv",
    src: "/assets/news-articles/neodent-media-siasat-01.jpg",
    width: 631,
    height: 1280,
    alt: "The Siasat Daily, Hyderabad — newspaper coverage of a Neodent Dental Hospital dental implant camp and lecture",
    caption: "Press / The Siasat Daily",
  },
];

/* Clinical films already on the site (RealTreatmentWork / homepage). */
const CLINICAL_FILMS = [
  {
    number: "01",
    title: "DMLS crowns — masticatory efficiency",
    src: "/assets/treatment-video/dr-miftah-explains-dmls-crowns-masticatory-efficiency.mp4",
    poster:
      "/assets/dr-miftah/Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png",
    label:
      "Dr. Md. Miftah Ur Rahman explaining DMLS crowns and masticatory efficiency",
  },
  {
    number: "02",
    title: "Crown cementation",
    src: "/assets/treatment-video/dr-miftah-neodent-crown-cementation-procedure.mp4",
    poster: "/assets/neodent-dmls-crowns-dental-model-side-view.jpg",
    label:
      "Crown cementation procedure performed by Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital",
  },
  {
    number: "03",
    title: "Treatment in practice",
    src: "/assets/treatment-video/dr-miftah-neodent-dental-treatment-procedure.mp4",
    poster:
      "/assets/Dr Siraj and Dr. Miftah Neodent dental clinic - during treatment.webp",
    label:
      "Clinical dental procedure carried out by Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital",
  },
];

/* Section 04 — the site's numbered treatment rows (number left, title,
   verb right), mirroring the homepage Expertise treatment list. Rows
   02/05/06 carry the specialist-focus tag. Anchors point at the
   matching sections on /treatments; composite build-up and scaling &
   polishing have no dedicated anchor there, so they use the atlas
   section itself. */
const SCOPE_ROWS = [
  {
    number: "01",
    title: "Composite build-up",
    verb: "REPAIR",
    href: "/treatments#treatment-atlas",
    focus: false,
  },
  {
    number: "02",
    title: "Dental implants",
    verb: "REPLACE",
    href: "/treatments#dental-implants",
    focus: true,
  },
  {
    number: "03",
    title: "Root canal treatment",
    verb: "PRESERVE",
    href: "/treatments#root-canal-treatment",
    focus: false,
  },
  {
    number: "04",
    title: "Braces & orthodontics",
    verb: "ALIGN",
    href: "/treatments#orthodontics",
    focus: false,
  },
  {
    number: "05",
    title: "Smile design",
    verb: "REFINE",
    href: "/treatments#smile-design",
    focus: true,
  },
  {
    number: "06",
    title: "Full mouth rehabilitation",
    verb: "REBUILD",
    href: "/treatments#full-mouth-rehabilitation",
    focus: true,
  },
  {
    number: "07",
    title: "Scaling & polishing",
    verb: "MAINTAIN",
    href: "/treatments#treatment-atlas",
    focus: false,
  },
];

/* Publications — titles verbatim, external PubMed links. */
const PUBLICATIONS = [
  {
    title:
      "Patient-Reported Outcome Measures (PROMs) in Metal-Ceramic and All-Ceramic Fixed Partial Dentures: A Prospective Clinical Study",
    journal: "Cureus",
    year: "2026",
    href: "https://pubmed.ncbi.nlm.nih.gov/41798508/",
  },
  {
    title:
      "Clinical evaluation of peri-implantitis relation with implant material",
    journal: "Bioinformation",
    year: "2026",
    href: "https://pubmed.ncbi.nlm.nih.gov/42662028/",
  },
  {
    title:
      "Evaluation of Different Materials used in Prosthetic of Dental Implants: A Comparative Study",
    journal: "Journal of Pharmacy and Bioallied Sciences",
    year: "2024",
    href: "https://pubmed.ncbi.nlm.nih.gov/39346305/",
  },
];

/* Patient voices — verbatim Google review excerpts. Unedited. */
const REVIEWS = [
  {
    index: "01",
    quote:
      "I've got My front smile teeth placed here. Wow. Dr Miftah has done an excellent job. I'm happy with my smile.",
    author: "Victory Technical",
    meta: "2 months ago",
  },
  {
    index: "02",
    quote:
      "I had restricted mouth opening. Alhamdulillah Dr Miftah treated me and I'm recovering. Painless treatment.",
    author: "Khaja Pasha",
    meta: "5 months ago",
  },
  {
    index: "03",
    quote:
      "I've got implants placed here by Dr Miftah. It's been 1 month and I'm fully satisfied.",
    author: "Syed Moinuddin",
    meta: "1 year ago",
  },
  {
    index: "04",
    quote:
      "I got my Root canal treatment done here. Very nice treatment by Dr Miftah. I highly recommend.",
    author: "M Kishore",
    meta: "4 months ago",
  },
  {
    index: "05",
    quote: "Dr Miftah had made me confident by changing my smile.",
    author: "Laxminarayana Chikkula",
    meta: "1 year ago",
  },
];

/* Google Business Profile listing — the practice's Google listing. */
const GOOGLE_PROFILE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJn1I062KXyzsRImvgKIkDcJQ";

/* Branch image plates for section 10 — the same /clinic imagery and
   composition (exterior primary, interior secondary overlap). */
const MEHDIPATNAM_PLATES = {
  primary: {
    src: "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam exterior of clinic.jpeg",
    width: 4032,
    height: 3024,
    alt: "Neodent Dental Hospital Mehdipatnam — exterior of the clinic on Humayun Nagar Road, Hyderabad",
    label: "01 / MEHDIPATNAM · EXTERIOR",
  },
  secondary: {
    src: "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam interior of clinic.jpeg",
    width: 3024,
    height: 4032,
    alt: "Neodent Dental Hospital Mehdipatnam — clinic interior where Dr. Md. Miftah Ur Rahman consults",
    label: "Interior",
  },
};

const NAMPALLY_PLATES = {
  primary: {
    src: "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Exterior.jpg",
    width: 1280,
    height: 960,
    alt: "Neodent Dental Hospital Nampally — street frontage and signage at the Medwin Hospital Complex, Hyderabad",
    label: "02 / NAMPALLY · EXTERIOR",
  },
  secondary: {
    src: "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg",
    width: 1280,
    height: 1707,
    alt: "Neodent Dental Hospital Nampally — reception and consultation wing interior",
    label: "Interior",
  },
};

function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

function SectionHeading({
  line1,
  line2,
  id,
}: {
  line1: string;
  line2: string;
  id: string;
}) {
  return (
    <h2 id={id} className="section-heading">
      {line1}
      <br />
      <span className="serif">{line2}</span>
    </h2>
  );
}

function Eyebrow({ numeral, label }: { numeral?: string; label: string }) {
  return (
    <div className={styles.chapter}>
      {numeral && (
        <span className={styles.numeral} aria-hidden="true">
          {numeral}
        </span>
      )}
      <div className="eyebrow">{label}</div>
    </div>
  );
}

export function DrMiftahProfile() {
  return (
    <>
      <Hero />
      <ProfileIndex />
      <Biography />
      <Specialisation />
      <FullScope />
      <Education />
      <AcademicResearch />
      <InPractice />
      <PatientVoices />
      <RecognitionSection />
      <WhereToFindHim />
      <ClosingCta />
    </>
  );
}

/* ------------------------------------------------------------------
   HERO — dark band. Atmosphere uses the /contact hero geometry
   (arc + partial detail arc + red halo dot) and the ClinicalSettings
   coordTag, all via the shared Atmosphere component. The visible
   breadcrumb trail mirrors the JSON-LD BreadcrumbList exactly.
   ------------------------------------------------------------------ */
function Hero() {
  return (
    <section
      className={`${styles.section} ${styles.dark} ${styles.hero}`}
      aria-labelledby="miftah-hero-title"
    >
      <Atmosphere
        surface="dark"
        arc
        detailArc
        haloDot
        dots
        coordTag="NEODENT · HYD"
      />
      <div className={`container ${styles.heroContainer}`}>
        {/* Breadcrumb sits on its own axis at the very top of the hero,
            mirroring the JSON-LD BreadcrumbList exactly. The doctor's
            name block is vertically centred below it. */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/doctors/dr-miftah-ur-rahman" aria-current="page">
            Doctors
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Dr. Md. Miftah Ur Rahman</span>
        </nav>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            {/* Ghost chapter mark — behind the title, same axis as the
                eyebrow, per the OurClinics/LegacyStory numeral grammar
                (never red, low opacity, bleeds into the eyebrow). */}
            <span className={styles.heroGhost} aria-hidden="true">
              DR.
            </span>
            <div className="eyebrow">
              NEODENT DENTAL HOSPITALS / CLINICAL TEAM
            </div>
            <h1 id="miftah-hero-title" className={styles.heroTitle}>
              Dr. Md. Miftah
              <br />
              Ur Rahman
            </h1>
            <p className={styles.heroSubhead}>
              A specialist&rsquo;s hand.
              <br />
              <span className={styles.heroSubheadAccent}>
                A patient&rsquo;s pace.
              </span>
            </p>
            <p className={styles.heroCredentials}>
              BDS &middot; MDS &middot; FICOI (U.S.A.) &middot; GOLD MEDALLIST
            </p>
            <p className={styles.heroRole}>
              Prosthodontist &amp; Implantologist &middot; Assistant Director,
              Neodent Dental Hospital
            </p>
            <div className={styles.heroActions}>
              <AppButton
                href={nampallyTelPhone}
                variant="primary"
                className={styles.heroCta}
              >
                Call Nampally <ArrowRight size={14} aria-hidden="true" />
              </AppButton>
              <AppButton
                href={telPhone}
                variant="ghost"
                className={styles.heroCta}
              >
                <Phone size={14} aria-hidden="true" /> Call Mehdipatnam{" "}
                <ArrowRight size={14} aria-hidden="true" />
              </AppButton>
            </div>
          </div>
          {/* Single creative portrait plate — the same framing grammar
              ClinicalLeadership uses for the doctor's photograph: hairline
              3/4 frame, faint focus-ring circle, red registration tick into
              the top edge, one film-corner micro-label, mono caption below.
              The overlapping secondary image is deliberately gone. */}
          <figure className={styles.heroPortrait}>
            <span className={styles.plateFocusRing} aria-hidden="true" />
            <span className={styles.frameRegistration} aria-hidden="true" />
            <div className={styles.portraitFrame}>
              <Image
                src={PORTRAIT.src}
                alt={PORTRAIT.alt}
                fill
                sizes="(max-width: 767px) 86vw, (max-width: 1023px) 52vw, 44vw"
                priority
                className={styles.portraitImage}
              />
              <div className={styles.filmTop}>
                <span>01 / Clinical practice</span>
              </div>
            </div>
            <figcaption className={styles.portraitCaption}>
              <b>Dr. Md. Miftah Ur Rahman</b>
              <span>
                Dept. of Prosthodontics &middot; SB Patil Dental College &amp;
                Hospital
              </span>
            </figcaption>
          </figure>
        </div>
        {/* Bottom meta rail — the floor of the full-height band. Hairline
            rule, four mono micro-facts spread across the container, and a
            scroll cue. Fills the dead space below the copy/portrait and
            gives the 100vh height something to stand on. */}
        <div className={styles.heroMeta} aria-hidden="true">
          <span className={styles.heroMetaItem}>
            15+ years clinical practice
          </span>
          <span className={styles.heroMetaItem}>
            Prosthodontics + Implantology
          </span>
          <span className={styles.heroMetaItem}>Nampally / Mehdipatnam</span>
          <span className={styles.heroMetaScroll}>
            Scroll
            <ArrowDown size={12} />
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   01 — PROFILE INDEX (cream)
   ------------------------------------------------------------------ */
const PROFILE_ROWS = [
  { term: "Practising at", detail: "Mehdipatnam · Nampally, Hyderabad" },
  { term: "Clinical focus", detail: "Prosthodontics & Implantology" },
  {
    term: "Academic post",
    detail:
      "Assistant Professor, Dept. of Prosthodontics, SB Patil Dental College & Hospital",
  },
  { term: "Experience", detail: "15+ years" },
];

function ProfileIndex() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.1);
  return (
    <section
      className={`${styles.section} ${styles.light} ${styles.profileIndex}`}
      aria-labelledby="miftah-index-title"
    >
      <div className={`container ${styles.container}`}>
        <Eyebrow numeral="01" label="01 / PROFILE INDEX" />
        <div
          ref={ref}
          className={`${styles.indexGrid} ${visible ? styles.blockVisible : ""}`}
        >
          <SectionHeading
            id="miftah-index-title"
            line1="The record,"
            line2="in brief."
          />
          <span className={styles.indexRail} aria-hidden="true" />
          <dl className={styles.indexRows}>
            {PROFILE_ROWS.map((row) => (
              <div className={styles.indexRow} key={row.term}>
                <dt>{row.term}</dt>
                <dd>{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   02 — BIOGRAPHY (cream) — body copy verbatim from the brief, with the
   two marked phrases carried by the shared EditorialHighlight system.
   ------------------------------------------------------------------ */
function Biography() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  return (
    <section
      className={`${styles.section} ${styles.light} ${styles.biography}`}
      aria-labelledby="miftah-bio-title"
    >
      <div className={`container ${styles.container}`}>
        <Eyebrow numeral="02" label="02 / BIOGRAPHY" />
        <div
          ref={ref}
          className={`${styles.bioGrid} ${visible ? styles.blockVisible : ""}`}
        >
          <div className={styles.bioCopy}>
            <SectionHeading
              id="miftah-bio-title"
              line1="A steady hand."
              line2="A considered approach."
            />
            <p className={styles.bodyCopy}>
              Dr. Md. Miftah Ur Rahman is a Prosthodontist and Implantologist at
              Neodent Dental Hospital, practising across both the Mehdipatnam
              and Nampally clinics. His work centres on{" "}
              <EditorialHighlight tone="primary">
                restoring what can be saved and rebuilding what cannot
              </EditorialHighlight>{" "}
              — implants, full-mouth rehabilitation and the prosthodontic work
              that follows.
            </p>
            <p className={styles.bodyCopy}>
              Prosthodontics is the branch of dentistry concerned with replacing
              and restoring teeth. In practice, that means the cases other
              clinics often describe as complicated: a tooth that has been
              recommended for extraction, a bite that no longer meets correctly,
              or a full arch that needs rebuilding rather than patching. Much of
              his day is spent on{" "}
              <EditorialHighlight tone="quiet">
                planning before treatment begins
              </EditorialHighlight>
              .
            </p>
            <p className={styles.bodyCopy}>
              Alongside clinical practice, he holds an academic post as
              Assistant Professor in the Department of Prosthodontics at SB
              Patil Dental College &amp; Hospital, where he{" "}
              <EditorialHighlight tone="quiet">
                teaches and conducts seminars
              </EditorialHighlight>{" "}
              for dental students, and he has published clinical research on
              implant and prosthetic materials.
            </p>
            {/* Fourth beat — the SEO paragraph: credentials restated in the
                visible body copy, the city ("Hyderabad") named explicitly,
                and the patient-intent conditions (who visits him). Every
                fact is brief-sourced and already established elsewhere on
                the page (hero credentials strip, Profile Index rows). */}
            <p className={styles.bodyCopy}>
              He holds a BDS and an MDS in Prosthodontics &amp; Implantology,
              along with a FICOI (U.S.A.) fellowship, and brings{" "}
              <EditorialHighlight tone="quiet">
                more than fifteen years
              </EditorialHighlight>{" "}
              of clinical practice to Neodent. Patients from across Hyderabad
              visit the Mehdipatnam and Nampally clinics with missing teeth,
              failing crowns and bridges, worn or collapsed bites, and teeth
              other clinics have recommended for extraction.
            </p>
            <a className="text-link" href="/treatments">
              See the treatments he performs{" "}
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          {/* Plate composition — the hero portrait's framing grammar
              (hairline frame, faint focus-ring circle, red registration
              tick, film-corner micro-label, mono caption) re-seated on
              the light surface, with the operatory interior as the offset
              secondary plate. Replaces the raw OffsetImagePair render so
              section 02 matches the framing system used across the other
              pages. The extreme 1:1.95 source ratio is replaced by a 4/5
              plate crop tuned to the subject's face. */}
          <figure className={styles.bioMedia}>
            <span className={styles.plateFocusRing} aria-hidden="true" />
            <span className={styles.frameRegistration} aria-hidden="true" />
            <div className={styles.bioPlateFrame}>
              <Image
                src={TREATMENT_IMAGE.src}
                alt={TREATMENT_IMAGE.alt}
                fill
                sizes="(max-width: 767px) 86vw, (max-width: 1023px) 60vw, 36vw"
                className={styles.bioPlateImage}
                style={{ objectPosition: "50% 30%" }}
              />
              <div className={styles.filmTop}>
                <span>02 / In the operatory</span>
              </div>
            </div>
            <figcaption className={styles.bioPlateCaption}>
              <b>Dr. Md. Miftah Ur Rahman</b>
              <span>
                In the operatory &middot; Neodent Dental Hospital, Hyderabad
              </span>
            </figcaption>
            <figure className={styles.bioSecondary}>
              <Image
                src={TREATMENT_ROOM_IMAGE.src}
                alt={TREATMENT_ROOM_IMAGE.alt}
                width={TREATMENT_ROOM_IMAGE.width}
                height={TREATMENT_ROOM_IMAGE.height}
                sizes="(max-width: 767px) 44vw, 240px"
                className={styles.bioSecondaryImage}
              />
              <span className={styles.bioSecondaryLabel}>
                Treatment room &middot; Mehdipatnam
              </span>
            </figure>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   03 — SPECIALISATION (dark) — three numbered cards, each carrying a
   rebuilt editorial clinical illustration: a cross-section (implant),
   an occlusal arch plan (full mouth rehabilitation) and a front-
   facing smile (cosmetic design). Shared system — 1.5px primary
   strokes at 70% ivory fully visible at REST (meaning never waits
   for hover), 1px details at 42%, dashed construction at 26%, soft
   mass fills, one red markup accent per figure. aria-hidden — the
   h3 + copy carry the meaning.
   ------------------------------------------------------------------ */

function ImplantsFigure() {
  return (
    <svg viewBox="0 0 200 128" fill="none" className={styles.specFigureSvg}>
      {/* registration ticks */}
      <path
        className={styles.specFigConstruct}
        d="M10 10 H15 M10 10 V15 M190 118 H185 M190 118 V113"
      />
      {/* gum band — soft mass with hairline crest */}
      <path
        className={styles.specFigMass}
        d="M14 62 Q100 56 186 62 L186 70 Q100 64 14 70 Z"
      />
      <path className={styles.specFigDetail} d="M14 62 Q100 56 186 62" />
      {/* bone texture */}
      <path
        className={styles.specFigConstruct}
        d="M28 80 L36 74 M26 96 L34 90 M40 108 L48 102 M158 78 L166 72 M160 96 L168 90 M150 108 L158 102"
      />
      {/* flanking natural teeth — root anchored in bone */}
      <path
        className={styles.specFigDetail}
        d="M46 62 C46 54 48 46 54 46 C60 46 62 54 62 62 C62 73 59 87 55 95 C53 98 51 97 50 93 C47 84 46 72 46 62 Z"
      />
      <path
        className={styles.specFigDetail}
        d="M138 62 C138 54 140 46 146 46 C152 46 154 54 154 62 C154 73 151 87 147 95 C145 98 143 97 142 93 C139 84 138 72 138 62 Z"
      />
      {/* threaded fixture crossing the gum into the bone */}
      <path
        className={styles.specFigPrimary}
        d="M90 61 L110 61 L106 110 L94 110 Z"
      />
      <path
        className={styles.specFigDetail}
        d="M89 72 H111 M90 80 H110 M91 88 H109 M92 96 H108 M93 104 H107"
      />
      {/* abutment collar */}
      <path
        className={styles.specFigPrimary}
        d="M95 56 L105 56 L107 62 L93 62 Z"
      />
      {/* crown — the restored tooth */}
      <path
        className={styles.specFigMass}
        d="M84 52 C84 36 90 26 100 26 C110 26 116 36 116 52 C116 55 113 56 110 56 L90 56 C87 56 84 55 84 52 Z"
      />
      <path
        className={styles.specFigPrimary}
        d="M84 52 C84 36 90 26 100 26 C110 26 116 36 116 52 C116 55 113 56 110 56 L90 56 C87 56 84 55 84 52 Z"
      />
      {/* red — osseointegration marks on the gum line at the fixture */}
      <path className={styles.specFigAccent} d="M84 61 H89 M111 61 H116" />
    </svg>
  );
}

function RehabilitationFigure() {
  return (
    <svg viewBox="0 0 200 128" fill="none" className={styles.specFigureSvg}>
      {/* registration ticks */}
      <path
        className={styles.specFigConstruct}
        d="M10 10 H15 M10 10 V15 M190 118 H185 M190 118 V113"
      />
      {/* arch band — mass between the outer and inner curves */}
      <path
        className={styles.specFigMass}
        fillRule="evenodd"
        d="M52 108 C40 84 42 52 62 34 C82 17 118 17 138 34 C158 52 160 84 148 108 L128 108 C136 90 134 62 120 48 C108 37 92 37 80 48 C66 62 64 90 72 108 Z"
      />
      {/* arch curves */}
      <path
        className={styles.specFigPrimary}
        d="M52 108 C40 84 42 52 62 34 C82 17 118 17 138 34 C158 52 160 84 148 108"
      />
      <path
        className={styles.specFigDetail}
        d="M72 108 C64 90 66 62 80 48 C92 41 108 41 120 48 C134 62 132 90 124 108"
      />
      {/* tooth stations around the band */}
      <path
        className={styles.specFigDetail}
        d="M84 22 L87 45 M116 22 L113 45 M68 30 L78 52 M132 30 L122 52 M56 52 L74 62 M144 52 L126 62 M50 78 L72 76 M150 78 L128 76 M58 100 L78 88 M142 100 L122 88"
      />
      {/* restored teeth — filled stations within the span */}
      <rect
        className={styles.specFigRestored}
        x="96.5"
        y="25"
        width="7"
        height="15"
        rx="2.5"
      />
      <rect
        className={styles.specFigRestored}
        x="63"
        y="36"
        width="7"
        height="15"
        rx="2.5"
        transform="rotate(-24 66.5 43.5)"
      />
      <rect
        className={styles.specFigRestored}
        x="130"
        y="36"
        width="7"
        height="15"
        rx="2.5"
        transform="rotate(24 133.5 43.5)"
      />
      {/* red — the restoration span across the arch */}
      <path className={styles.specFigAccent} d="M72 30 C82 24 118 24 128 30" />
      {/* occlusal reference + centre registration */}
      <path
        className={styles.specFigConstruct}
        d="M60 116 H140 M100 60 V68 M96 64 H104"
        strokeDasharray="2 5"
      />
    </svg>
  );
}

function SmileFigure() {
  return (
    <svg viewBox="0 0 200 128" fill="none" className={styles.specFigureSvg}>
      {/* registration ticks */}
      <path
        className={styles.specFigConstruct}
        d="M10 10 H15 M10 10 V15 M190 118 H185 M190 118 V113"
      />
      {/* face contour — cropped at the brow */}
      <path
        className={styles.specFigPrimary}
        d="M46 14 C40 42 40 72 52 92 C62 108 80 114 100 114 C120 114 138 108 148 92 C160 72 160 42 154 14"
      />
      {/* facial midline + incisal plane — construction guides */}
      <path
        className={styles.specFigConstruct}
        d="M100 20 V110 M52 80 H148"
        strokeDasharray="2 5"
      />
      {/* lips — upper lip line + smile line */}
      <path className={styles.specFigDetail} d="M58 60 C78 48 122 48 142 60" />
      <path className={styles.specFigPrimary} d="M62 66 C80 90 120 90 138 66" />
      {/* upper anterior teeth — canines, laterals, centrals */}
      <rect
        className={styles.specFigPrimary}
        x="65"
        y="60"
        width="10"
        height="13"
        rx="3.5"
        transform="rotate(-16 70 66)"
      />
      <rect
        className={styles.specFigPrimary}
        x="78"
        y="57"
        width="10"
        height="17"
        rx="3.5"
        transform="rotate(-8 83 65)"
      />
      <rect
        className={styles.specFigPrimary}
        x="89"
        y="55"
        width="11"
        height="22"
        rx="4"
        transform="rotate(-2 94.5 66)"
      />
      <rect
        className={styles.specFigPrimary}
        x="100"
        y="55"
        width="11"
        height="22"
        rx="4"
        transform="rotate(2 105.5 66)"
      />
      <rect
        className={styles.specFigPrimary}
        x="112"
        y="57"
        width="10"
        height="17"
        rx="3.5"
        transform="rotate(8 117 65)"
      />
      <rect
        className={styles.specFigPrimary}
        x="125"
        y="60"
        width="10"
        height="13"
        rx="3.5"
        transform="rotate(16 130 66)"
      />
      {/* red — veneer markup on the centrals */}
      <rect
        className={styles.specFigAccent}
        x="88"
        y="53"
        width="12"
        height="26"
        rx="4"
      />
      <rect
        className={styles.specFigAccent}
        x="100"
        y="53"
        width="12"
        height="26"
        rx="4"
      />
    </svg>
  );
}

const SPEC_FIGURES: Record<"implants" | "rehabilitation" | "smile", ReactNode> =
  {
    implants: <ImplantsFigure />,
    rehabilitation: <RehabilitationFigure />,
    smile: <SmileFigure />,
  };

const SPECIALISATION_CARDS: {
  number: string;
  figure: "implants" | "rehabilitation" | "smile";
  title: string;
  copy: string;
  href: string;
}[] = [
  {
    number: "01",
    figure: "implants",
    title: "DENTAL IMPLANTS",
    copy: "Replacing a missing tooth at the root, so the replacement functions and is maintained like a natural tooth rather than resting on the teeth beside it.",
    href: "/treatments#dental-implants",
  },
  {
    number: "02",
    figure: "rehabilitation",
    title: "FULL MOUTH REHABILITATION",
    copy: "Rebuilding an entire bite — function, alignment and appearance together — planned as one treatment rather than a series of separate repairs.",
    href: "/treatments#full-mouth-rehabilitation",
  },
  {
    number: "03",
    figure: "smile",
    title: "SMILE DESIGN & COSMETIC",
    copy: "Restorative work where appearance matters as much as function: shape, shade and proportion planned around the patient's own face.",
    href: "/treatments#smile-design",
  },
];

function Specialisation() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  return (
    <section
      className={`${styles.section} ${styles.dark}`}
      aria-labelledby="miftah-spec-title"
    >
      <div className={`container ${styles.container}`}>
        <Eyebrow numeral="03" label="03 / SPECIALISATION" />
        <div ref={ref} className={`${visible ? styles.blockVisible : ""}`}>
          <SectionHeading
            id="miftah-spec-title"
            line1="Where his work"
            line2="goes deepest."
          />
          <p className={styles.lede}>
            Three areas where his specialist training is most directly applied.
          </p>
          <div className={styles.specGrid}>
            {SPECIALISATION_CARDS.map((card) => (
              <a className={styles.specCard} key={card.number} href={card.href}>
                <span className={styles.specCardNumber} aria-hidden="true">
                  {card.number}
                </span>
                <h3 className={styles.specCardTitle}>{card.title}</h3>
                <div className={styles.specFigure} aria-hidden="true">
                  {SPEC_FIGURES[card.figure]}
                </div>
                <p className={styles.specCardCopy}>{card.copy}</p>
                <span className={styles.specCardLink}>
                  On treatments <ArrowRight size={13} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   04 — FULL SCOPE (cream) — compact editorial treatment index:
   breadth to Specialisation's depth. Ruled 4-column tile grid, each
   tile = number + compact 32-grid index icon + serif name + focus
   tag/verb + View treatment arrow. Icons are a companion system to
   the Specialisation illustrations (FEATURE vs INDEX) — silhouette
   first, one red accent each, aria-hidden (the name carries the
   meaning), fully visible at rest.
   ------------------------------------------------------------------ */
function ScopeIconComposite() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path
        className={styles.scopeIconPrimary}
        d="M10 12 C10 9.5 12 8 14 8.2 C15 8.4 15.5 9 16 9 C16.5 9 17 8.4 18 8.2 C20 8 22 9.5 22 12 C22 15 21 16 20.7 19 C20.4 22.5 20 26 18.5 26 C17 26 17.2 21.5 16 21.5 C14.8 21.5 15 26 13.5 26 C12 26 11.6 22.5 11.3 19 C11 16 10 15 10 12 Z"
      />
      <path
        className={styles.scopeIconRedFill}
        d="M17.6 10.6 C19.2 11 20.3 12 20.6 13.4 C20.8 14.2 20.7 14.8 20.5 15.2 L17.2 14.4 C17.3 13.1 17.4 11.8 17.6 10.6 Z"
      />
    </svg>
  );
}

function ScopeIconImplant() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path className={styles.scopeIconDetail} d="M5 18 H27" />
      <path
        className={styles.scopeIconPrimary}
        d="M11.5 9 C11.5 7 13 5.8 16 5.8 C19 5.8 20.5 7 20.5 9 L20.5 12.5 L11.5 12.5 Z"
      />
      <path
        className={styles.scopeIconPrimary}
        d="M14 12.5 H18 L18.7 14.5 H13.3 Z"
      />
      <path
        className={styles.scopeIconPrimary}
        d="M13 14.5 L19 14.5 L18.2 25.5 L13.8 25.5 Z"
      />
      <path
        className={styles.scopeIconDetail}
        d="M12.9 17.5 H19.1 M13.1 20 H18.9 M13.4 22.5 H18.6"
      />
      <path className={styles.scopeIconAccent} d="M9 18 H12.2 M19.8 18 H23" />
    </svg>
  );
}

function ScopeIconRootCanal() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path
        className={styles.scopeIconPrimary}
        d="M10 12 C10 9.5 12 8 14 8.2 C15 8.4 15.5 9 16 9 C16.5 9 17 8.4 18 8.2 C20 8 22 9.5 22 12 C22 15 21 16 20.7 19 C20.4 22.5 20 26 18.5 26 C17 26 17.2 21.5 16 21.5 C14.8 21.5 15 26 13.5 26 C12 26 11.6 22.5 11.3 19 C11 16 10 15 10 12 Z"
      />
      <path
        className={styles.scopeIconDetail}
        d="M14.7 12 C14.3 16 14 20 13.6 23.5 M17.3 12 C17.7 16 18 20 18.4 23.5"
      />
      <circle className={styles.scopeIconRedFill} cx="16" cy="11" r="1.5" />
    </svg>
  );
}

function ScopeIconOrthodontics() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path className={styles.scopeIconDetail} d="M6.5 13 H25.5" />
      <rect
        className={styles.scopeIconPrimary}
        x="7.5"
        y="13"
        width="4"
        height="8.5"
        rx="2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="12.5"
        y="13"
        width="4"
        height="8.5"
        rx="2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="17.5"
        y="13"
        width="4"
        height="8.5"
        rx="2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="22.5"
        y="13"
        width="4"
        height="8.5"
        rx="2"
      />
      <path className={styles.scopeIconPrimary} d="M5.5 17 H26.5" />
      <rect
        className={styles.scopeIconInkFill}
        x="13.2"
        y="15.4"
        width="3.2"
        height="3.2"
        rx="0.6"
      />
      <rect
        className={styles.scopeIconRedFill}
        x="17.6"
        y="15.4"
        width="3.2"
        height="3.2"
        rx="0.6"
      />
    </svg>
  );
}

function ScopeIconSmile() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path
        className={styles.scopeIconPrimary}
        d="M6.5 10.5 C9 22 23 22 25.5 10.5"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="8"
        y="11"
        width="3"
        height="6.5"
        rx="1.2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="11.7"
        y="11"
        width="3"
        height="6.5"
        rx="1.2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="15.4"
        y="11"
        width="3"
        height="6.5"
        rx="1.2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="19.1"
        y="11"
        width="3"
        height="6.5"
        rx="1.2"
      />
      <rect
        className={styles.scopeIconPrimary}
        x="22.8"
        y="11"
        width="3"
        height="6.5"
        rx="1.2"
      />
      <path
        className={styles.scopeIconAccentDash}
        d="M9.5 20.5 C12.5 24 19.5 24 22.5 20.5"
      />
    </svg>
  );
}

function ScopeIconRehabilitation() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path
        className={styles.scopeIconPrimary}
        d="M9 5 C9 11 12 13.5 16 13.5 C20 13.5 23 11 23 5"
      />
      <path
        className={styles.scopeIconPrimary}
        d="M9 27 C9 21 12 18.5 16 18.5 C20 18.5 23 21 23 27"
      />
      <path
        className={styles.scopeIconDetail}
        d="M12 5 C12 9.5 13.5 11.5 16 11.5 C18.5 11.5 20 9.5 20 5 M12 27 C12 22.5 13.5 20.5 16 20.5 C18.5 20.5 20 22.5 20 27"
      />
      <path className={styles.scopeIconAccent} d="M16 14 V18 M14.2 16 H17.8" />
    </svg>
  );
}

function ScopeIconScaling() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={styles.scopeIconSvg}>
      <path
        className={styles.scopeIconPrimary}
        d="M10 12 C10 9.5 12 8 14 8.2 C15 8.4 15.5 9 16 9 C16.5 9 17 8.4 18 8.2 C20 8 22 9.5 22 12 C22 15 21 16 20.7 19 C20.4 22.5 20 26 18.5 26 C17 26 17.2 21.5 16 21.5 C14.8 21.5 15 26 13.5 26 C12 26 11.6 22.5 11.3 19 C11 16 10 15 10 12 Z"
      />
      <path
        className={styles.scopeIconAccent}
        d="M23.5 8 L25.5 6 M25.5 11 L28 10 M22.5 4.5 L23.3 2.5"
      />
    </svg>
  );
}

const SCOPE_ICONS: Record<string, ReactNode> = {
  "01": <ScopeIconComposite />,
  "02": <ScopeIconImplant />,
  "03": <ScopeIconRootCanal />,
  "04": <ScopeIconOrthodontics />,
  "05": <ScopeIconSmile />,
  "06": <ScopeIconRehabilitation />,
  "07": <ScopeIconScaling />,
};

function FullScope() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  return (
    <section
      className={`${styles.section} ${styles.light}`}
      aria-labelledby="miftah-scope-title"
    >
      <div className={`container ${styles.container}`}>
        <Eyebrow numeral="04" label="04 / FULL SCOPE" />
        <div ref={ref} className={`${visible ? styles.blockVisible : ""}`}>
          <SectionHeading
            id="miftah-scope-title"
            line1="Seven areas"
            line2="of clinical focus."
          />
          <div className={styles.scopeGrid}>
            {SCOPE_ROWS.map((row) => (
              <a className={styles.scopeTile} key={row.number} href={row.href}>
                <span className={styles.scopeTileTop}>
                  <span className={styles.scopeNumber} aria-hidden="true">
                    {row.number}
                  </span>
                  <span className={styles.scopeIcon} aria-hidden="true">
                    {SCOPE_ICONS[row.number]}
                  </span>
                </span>
                <span className={styles.scopeTitle}>{row.title}</span>
                <span className={styles.scopeMeta}>
                  {row.focus && (
                    <span className={styles.scopeFocus}>
                      ● SPECIALIST FOCUS
                    </span>
                  )}
                  <span className={styles.scopeVerb}>{row.verb}</span>
                </span>
                <span className={styles.scopeLink}>
                  View treatment <ArrowRight size={12} aria-hidden="true" />
                </span>
              </a>
            ))}
            <div className={styles.scopeFiller} aria-hidden="true">
              <p className={styles.scopeFillerCopy}>
                Seven treatment areas
                <br />
                full range of care
              </p>
              <span className={styles.scopeFillerDot} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   05 — EDUCATION & TRAINING (dark) — editorial career timeline
   (training → specialisation → fellowship) concluding on the
   recognition beat, anchored by the real award photograph on the
   right. Undated; ordered for the story, not the calendar.
   ------------------------------------------------------------------ */
const EDUCATION_STEPS = [
  {
    label: "MDS — PROSTHODONTICS & IMPLANTOLOGY",
    lines: [
      "Sri Sai College of Dental Surgery",
      "Kaloji Narayana Rao University of Health Sciences",
    ],
  },
  {
    label: "INTERNSHIP",
    lines: ["Osmania Government Dental College, Hyderabad"],
  },
  {
    label: "BDS",
    lines: [
      "Sri Sai College of Dental Surgery",
      "Dr. NTR University of Health Sciences",
    ],
  },
  {
    label: "FELLOWSHIP — FICOI (U.S.A.)",
    lines: [],
  },
  {
    label: "RECOGNITION — GOLD MEDALLIST",
    lines: [],
  },
];

function Education() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  return (
    <section
      className={`${styles.section} ${styles.dark}`}
      aria-labelledby="miftah-edu-title"
    >
      <div className={`container ${styles.container}`}>
        <Eyebrow numeral="05" label="05 / EDUCATION & TRAINING" />
        <div ref={ref} className={`${visible ? styles.blockVisible : ""}`}>
          <SectionHeading
            id="miftah-edu-title"
            line1="A foundation"
            line2="built formally."
          />
          <p className={styles.lede}>
            His specialist practice rests on formal training in prosthodontics
            and implantology, carried through dental school, clinical
            internship, fellowship and formal recognition.
          </p>
          <div className={styles.eduGrid}>
            <div className={styles.eduTimelineCol}>
              <ol className={styles.timeline}>
                {EDUCATION_STEPS.map((step, index) => (
                  <li
                    className={styles.timelineStep}
                    key={step.label}
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <span className={styles.timelineMarker} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className={styles.timelineLabel}>{step.label}</h3>
                    {step.lines.map((line) => (
                      <p className={styles.timelineLine} key={line}>
                        {line}
                      </p>
                    ))}
                  </li>
                ))}
              </ol>
              <div className={styles.eduFacts} aria-hidden="true">
                <span>05 Stages</span>
                <span>04 Institutions</span>
                <span>FICOI — U.S.A.</span>
              </div>
            </div>
            <div className={styles.eduProof}>
              <div className={styles.eduProofHead}>
                <span className={styles.eduProofMark} aria-hidden="true" />
                <span className={styles.eduProofEyebrow}>
                  Recognition — Evidence
                </span>
              </div>
              <figure className={styles.eduPlate}>
                <div className={styles.eduPlateFrame}>
                  <Image
                    src={ACADEMIC_FRAME_IMAGE.src}
                    alt={ACADEMIC_FRAME_IMAGE.alt}
                    width={ACADEMIC_FRAME_IMAGE.width}
                    height={ACADEMIC_FRAME_IMAGE.height}
                    sizes="(max-width: 1023px) 88vw, 34vw"
                    className={styles.eduPlateImage}
                  />
                  <span className={styles.eduPlateTick} aria-hidden="true" />
                </div>
                <figcaption className={styles.eduCaption}>
                  <span className={styles.eduCaptionText}>
                    Award presented to Dr. Miftah Ur Rahman by Dr. K.
                    Mahendranadh Reddy
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   06 — ACADEMIC & RESEARCH (cream)
   ------------------------------------------------------------------ */
function AcademicResearch() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  return (
    <section
      className={`${styles.section} ${styles.light}`}
      aria-labelledby="miftah-academic-title"
    >
      <div className={`container ${styles.container}`}>
        <Eyebrow numeral="06" label="06 / ACADEMIC & RESEARCH" />
        <div ref={ref} className={`${visible ? styles.blockVisible : ""}`}>
          <SectionHeading
            id="miftah-academic-title"
            line1="Published work"
            line2="and teaching."
          />
          <p className={styles.lede}>
            His clinical work is carried by an academic base — formal specialist
            training, published research and ongoing teaching.
          </p>
          <div className={styles.academicGrid}>
            <div className={styles.academicTeaching}>
              <figure className={styles.academicPlate}>
                <div className={styles.academicPlateFrame}>
                  <Image
                    src={TEACHING_IMAGE.src}
                    alt={TEACHING_IMAGE.alt}
                    width={TEACHING_IMAGE.width}
                    height={TEACHING_IMAGE.height}
                    sizes="(max-width: 1023px) 88vw, 30vw"
                    className={styles.academicPlateImage}
                  />
                  <span
                    className={styles.academicPlateTick}
                    aria-hidden="true"
                  />
                </div>
                <figcaption className={styles.academicPlateCaption}>
                  Seminar &middot; Dept. of Prosthodontics
                </figcaption>
              </figure>
              <div className={styles.academicTeachingBlock}>
                <div className={styles.academicProofHead}>
                  <span
                    className={styles.academicProofMark}
                    aria-hidden="true"
                  />
                  <h3 className={styles.academicSubhead}>Teaching</h3>
                </div>
                <p className={styles.academicRole}>
                  Assistant Professor
                  <span>
                    Department of Prosthodontics, SB Patil Dental College &amp;
                    Hospital
                  </span>
                </p>
                <p className={styles.bodyCopy}>
                  He teaches and conducts seminars for dental students alongside
                  his clinical practice in Hyderabad.
                </p>
              </div>
            </div>
            <span className={styles.academicRule} aria-hidden="true" />
            <div className={styles.academicPublications}>
              <h3 className={styles.academicSubhead}>Selected Publications</h3>
              <ol className={styles.publicationList}>
                {PUBLICATIONS.map((publication, index) => (
                  <li className={styles.publication} key={publication.href}>
                    <a
                      href={publication.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.publicationLink}
                      style={{ animationDelay: `${index * 90}ms` }}
                    >
                      <span
                        className={styles.publicationIndex}
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.publicationBody}>
                        <span className={styles.publicationTitle}>
                          {publication.title}
                        </span>
                        <span className={styles.publicationMeta}>
                          {publication.journal} &middot; {publication.year}
                        </span>
                      </span>
                      <ArrowRight
                        size={13}
                        aria-hidden="true"
                        className={styles.publicationArrow}
                      />
                    </a>
                  </li>
                ))}
              </ol>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/?term=md+miftah+ur+rahman"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pubmedLink}
              >
                VIEW ON PUBMED <ArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   07 — IN PRACTICE (dark) — existing clinical films
   ------------------------------------------------------------------ */
function InPractice() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  /* Poster-first reel archive: nothing is fetched until a film is
     actively played (preload="none" + custom play control). Only one
     film plays at a time. */
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [activeFilm, setActiveFilm] = useState<string | null>(null);

  const toggleFilm = (number: string) => {
    const video = videoRefs.current[number];
    if (!video) return;
    if (activeFilm === number) {
      video.pause();
      setActiveFilm(null);
      return;
    }
    if (activeFilm) {
      videoRefs.current[activeFilm]?.pause();
    }
    setActiveFilm(number);
    video.play().catch(() => setActiveFilm(null));
  };

  return (
    <section
      className={`${styles.section} ${styles.dark}`}
      aria-labelledby="miftah-practice-title"
    >
      <div className={`container ${styles.container}`}>
        <Eyebrow numeral="07" label="07 / IN PRACTICE" />
        <div ref={ref} className={`${visible ? styles.blockVisible : ""}`}>
          <SectionHeading
            id="miftah-practice-title"
            line1="See the work"
            line2="behind the treatment."
          />
          <p className={styles.lede}>
            Real clinical films from Dr. Miftah&rsquo;s work at Neodent.
          </p>
          <div className={styles.filmGrid}>
            {CLINICAL_FILMS.map((film, index) => (
              <figure
                className={styles.filmPlate}
                key={film.number}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className={styles.filmFrame}>
                  <video
                    ref={(el) => {
                      videoRefs.current[film.number] = el;
                    }}
                    className={styles.filmVideo}
                    src={film.src}
                    poster={film.poster}
                    playsInline
                    preload="none"
                    controls={activeFilm === film.number}
                    onEnded={() => setActiveFilm(null)}
                    onPause={() =>
                      activeFilm === film.number && setActiveFilm(null)
                    }
                    aria-label={film.label}
                  />
                  <span className={styles.filmScrim} aria-hidden="true" />
                  <span className={styles.filmIndex} aria-hidden="true">
                    {film.number}
                  </span>
                  <button
                    type="button"
                    className={`${styles.filmPlayBtn} ${activeFilm === film.number ? styles.filmPlayBtnHidden : ""}`}
                    tabIndex={activeFilm === film.number ? -1 : undefined}
                    onClick={() => toggleFilm(film.number)}
                    aria-label={
                      activeFilm === film.number
                        ? `Pause film: ${film.title}`
                        : `Play film: ${film.title}`
                    }
                  >
                    {activeFilm === film.number ? (
                      <Pause size={12} />
                    ) : (
                      <Play size={12} />
                    )}
                  </button>
                </div>
                <figcaption className={styles.filmCaption}>
                  <h3 className={styles.filmTitle}>{film.title}</h3>
                  <span>DR. MD. MIFTAH UR RAHMAN &middot; NEODENT</span>
                  <button
                    type="button"
                    className={styles.filmCta}
                    onClick={() => toggleFilm(film.number)}
                    aria-label={
                      activeFilm === film.number
                        ? `Pause film: ${film.title}`
                        : `View film: ${film.title}`
                    }
                  >
                    {activeFilm === film.number ? "PAUSE FILM" : "VIEW FILM"}{" "}
                    <ArrowRight size={12} aria-hidden="true" />
                  </button>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className={styles.filmFooter}>
            <span>Clinical work &middot; Neodent Hyderabad</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   08 — PATIENT VOICES (cream) — verbatim Google reviews. No Review or
   AggregateRating structured data anywhere on this page.
   ------------------------------------------------------------------ */
function PatientVoices() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  return (
    <section
      className={`${styles.section} ${styles.light}`}
      aria-labelledby="miftah-voices-title"
    >
      <div className={`container ${styles.container}`}>
        <Eyebrow numeral="08" label="08 / PATIENT VOICES" />
        <div ref={ref} className={`${visible ? styles.blockVisible : ""}`}>
          <SectionHeading
            id="miftah-voices-title"
            line1="What patients say."
            line2="In their own words."
          />
          <p className={styles.lede}>
            Verbatim from Google reviews. Individual results vary.
          </p>
          <div className={styles.reviewGrid}>
            {REVIEWS.map((review, reviewIndex) => (
              <figure
                className={`${styles.reviewCard} ${reviewIndex < 2 ? styles.reviewFeature : ""}`}
                key={review.index}
                style={{ animationDelay: `${reviewIndex * 90}ms` }}
              >
                <span className={styles.reviewIndex} aria-hidden="true">
                  {review.index}
                </span>
                <blockquote className={styles.reviewQuote}>
                  <p>&ldquo;{review.quote}&rdquo;</p>
                </blockquote>
                <figcaption className={styles.reviewMeta}>
                  <span className={styles.reviewAuthor}>— {review.author}</span>
                  <span className={styles.reviewWhen}>{review.meta}</span>
                  <span className={styles.reviewVia}>VIA GOOGLE</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className={styles.voicesCta}>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pubmedLink}
            >
              READ ALL REVIEWS ON GOOGLE{" "}
              <ArrowRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   09 — RECOGNITION (dark) — roman-numeral folio grid
   ------------------------------------------------------------------ */
function RecognitionSection() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  return (
    <section
      className={`${styles.section} ${styles.dark}`}
      aria-labelledby="miftah-recognition-title"
    >
      <div className={`container ${styles.container}`}>
        <Eyebrow numeral="09" label="09 / RECOGNITION" />
        <div ref={ref} className={`${visible ? styles.blockVisible : ""}`}>
          <SectionHeading
            id="miftah-recognition-title"
            line1="Recognition"
            line2="earned over time."
          />
          <div className={styles.folioGrid}>
            {RECOGNITION_PLATES.map((plate, plateIndex) => (
              <figure
                className={styles.folioPlate}
                key={plate.index}
                style={{ animationDelay: `${plateIndex * 90}ms` }}
              >
                <span className={styles.folioIndex} aria-hidden="true">
                  {plate.index}
                </span>
                <div className={styles.folioFrame}>
                  <Image
                    src={plate.src}
                    alt={plate.alt}
                    width={plate.width}
                    height={plate.height}
                    sizes="(max-width: 640px) 92vw, (max-width: 1023px) 46vw, 26vw"
                    className={styles.folioImage}
                  />
                </div>
                <figcaption className={styles.folioCaption}>
                  {plate.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   10 — WHERE TO FIND HIM (cream) — the /clinic two-branch block's
   content, verbatim. Opening hours deliberately OFF this page while
   the site / Google Business Profile discrepancy is being resolved.
   ------------------------------------------------------------------ */
function WhereToFindHim() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.08);
  return (
    <section
      className={`${styles.section} ${styles.light} ${styles.wash}`}
      aria-labelledby="miftah-locations-title"
    >
      <Atmosphere surface="light" rails dots />
      <div className={`container ${styles.container}`}>
        <Eyebrow numeral="10" label="10 / WHERE TO FIND HIM" />
        <div ref={ref} className={`${visible ? styles.blockVisible : ""}`}>
          <SectionHeading
            id="miftah-locations-title"
            line1="Two doors."
            line2="One standard of care."
          />
          <div className={styles.branchGrid}>
            <article className={styles.branchCard} id="mehdipatnam">
              <OffsetImagePair
                primary={MEHDIPATNAM_PLATES.primary}
                secondary={MEHDIPATNAM_PLATES.secondary}
                offsetFrame={false}
              />
              <p className={styles.branchIndex}>01 / MEHDIPATNAM — HYDERABAD</p>
              <address className={styles.branchAddress}>
                10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal
                Colony, Mehdipatnam, Hyderabad, Telangana 500006
              </address>
              <div className={styles.branchActions}>
                <a href={telPhone} className={styles.branchPhone}>
                  {phone}
                </a>
                <a
                  href={directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.branchDirections}
                >
                  Directions <ArrowRight size={12} aria-hidden="true" />
                </a>
              </div>
            </article>
            <article className={styles.branchCard} id="nampally">
              <OffsetImagePair
                primary={NAMPALLY_PLATES.primary}
                secondary={NAMPALLY_PLATES.secondary}
                offsetFrame={false}
              />
              <p className={styles.branchIndex}>02 / NAMPALLY — HYDERABAD</p>
              <address className={styles.branchAddress}>
                Medwin Hospital Complex, Pillar #A1270, Raghav Ratna Towers,
                Chirag Ali Lane, Mahesh Nagar Colony, Nampally, Hyderabad, Telangana 500001
              </address>
              <div className={styles.branchActions}>
                <a href={nampallyTelPhone} className={styles.branchPhone}>
                  {nampallyPhone}
                </a>
                <a
                  href={nampallyDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.branchDirections}
                >
                  Directions <ArrowRight size={12} aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>
          <p className={styles.locationsFootnote}>
            Both branches are profiled on{" "}
            <a href="/clinic" className={styles.inlineLink}>
              the clinics page
            </a>
            , and the wider practice story continues on{" "}
            <a href="/about" className={styles.inlineLink}>
              About Neodent
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   11 — CLOSING CTA (dark) — the FinalCta pattern, both branch numbers
   ------------------------------------------------------------------ */
function ClosingCta() {
  const [ref, visible] = useReveal<HTMLDivElement>(0.1);
  return (
    <section
      className={`${styles.section} ${styles.dark} ${styles.closingCta}`}
      aria-labelledby="miftah-cta-title"
    >
      <div className={`container ${styles.container}`} ref={ref}>
        <div
          className={`${styles.ctaInner} ${visible ? styles.blockVisible : ""}`}
        >
          <div className="eyebrow">Your next visit</div>
          <h2 id="miftah-cta-title" className="section-heading">
            Begin with a <span className="serif">conversation.</span>
          </h2>
          <p className={styles.lede}>
            Choose your preferred location, then let&rsquo;s begin.
          </p>
          <div className={styles.ctaActions}>
            <AppButton
              href={telPhone}
              variant="primary"
              className={styles.heroCta}
            >
              <Phone size={14} aria-hidden="true" /> Call Mehdipatnam &middot;{" "}
              {phone}
            </AppButton>
            <AppButton
              href={nampallyTelPhone}
              variant="ghost"
              className={styles.heroCta}
            >
              <Phone size={14} aria-hidden="true" /> Call Nampally &middot;{" "}
              {nampallyPhone}
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   12 — CLOSING BAND — the "1994 / Changing smiles since decades."
   treatment used above the footer on other pages, then the global
   Footer (rendered by DoctorProfileClientChrome).
   ------------------------------------------------------------------ */
