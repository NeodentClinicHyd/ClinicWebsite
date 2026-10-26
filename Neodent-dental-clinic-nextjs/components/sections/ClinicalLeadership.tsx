"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Pause, Play } from "lucide-react";
import styles from "./ClinicalLeadership.module.css";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { AppButton } from "@/components/ui/AppButton";

/* Authentic, client-supplied Dr. Miftah photography, all from
   /public/assets/dr-miftah. Nothing here is stock, generated or
   re-processed: the primary plate is the real Neodent operatory
   photograph (preferred over the transparent cutout portrait, which
   already appears elsewhere on the site), and the three portfolio
   plates are the recognition, teaching and academic frames. Captions
   and alt text stay strictly to what the photographs and their own
   filenames support -- no inferred award titles, outcomes or roles.

   Deliberately NOT used here:
     - dr-miftah-award-recognition.jpg -- a different ceremony to the
       recognition plate below, but already carried by the /about
       Recognition act; showing a second recognition frame here would
       read as a duplicate.
     - "Dr. Md. Miftah Ur Rahman during treatment- ...jpg" -- already
       the opening clinical image on /about; the profile film below
       covers the same "at work" territory in this section.
     - "Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png" -- the
       cutout portrait, already used by the Treatments page. */
const MIFTAH_MEDIA = {
  avatar: {
    src: "/assets/dr-miftah/banner_image.jpeg",
    alt: "Portrait of Dr. Md. Miftah Ur Rahman in a white coat at Neodent Dental Hospital",
  },
  portrait: {
    src: "/assets/dr-miftah/Dr Miftah ur Rahman at Neodent Dental Hospital.jpeg",
    alt:
      "Dr. Md. Miftah Ur Rahman, Prosthodontist and Implantologist, standing beside the dental chair in a treatment room at Neodent Dental Hospital, Hyderabad, holding a dental study model",
  },
  teaching: {
    src: "/assets/dr-miftah/Dr Md Miftah at Dept of Prosthodontics at SB Patil Dental College condicting seminar.jpeg",
    alt:
      "Dr. Md. Miftah Ur Rahman conducting a prosthodontics seminar for dental students at the Department of Prosthodontics, SB Patil Dental College & Hospital",
  },
  recognition: {
    src: "/assets/dr-miftah/Award presented to Dr Miftah ur Rahman by Dr K Mahendranadh Reddy.jpeg",
    alt:
      "Dr. Md. Miftah Ur Rahman receiving a framed certificate presented by Dr. K Mahendranadh Reddy",
  },
  academic: {
    src: "/assets/dr-miftah/Dr Md Miftah at Dept of Prosthodontics at SB Patil Dental College.jpeg",
    alt:
      "Dr. Md. Miftah Ur Rahman in a clinical coat at the entrance to the Department of Prosthodontics, SB Patil Dental College & Hospital",
  },
};

type TeamMember = {
  label: string;
  name: ReactNode;
  degrees: ReactNode;
  image: string | null;
  alt: string;
  initials?: string;
};

const team: TeamMember[] = [
  {
    label: "01 / SENIOR CLINICAL LEADERSHIP",
    name: <>Dr. Mohd. Siraj<br />Ur Rahman</>,
    degrees: <>BDS · FCIP · MDS (Chennai)<br />Professor · Director, Neodent · 30+ years</>,
    image: "/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png",
    alt: "Dr. Mohd. Siraj Ur Rahman",
  },
  {
    label: "02 / NEODENT TEAM",
    name: <>Dr. Md. Muti<br />Ur Rahman</>,
    degrees: <>MBBS (OSM) · MD (Gen. Med.)<br />5+ years</>,
    image: "/assets/Dr. Md. Muti Ur Rahman - Neodent  dental clinic.png",
    alt: "Dr. Md. Muti Ur Rahman",
  },
  {
    label: "03 / CLINICAL TEAM",
    name: <>Dr. Asiya<br />Siraj</>,
    degrees: <>MBBS (OSM) · MRSH (LON)<br />30+ years</>,
    image: null,
    alt: "Dr. Asiya Siraj",
    initials: "AS",
  },
  {
    label: "04 / CLINICAL TEAM",
    name: <>Dr. Safoora<br />Talha</>,
    degrees: <>BDS · 12+ years</>,
    image: null,
    alt: "Dr. Safoora Talha",
    initials: "ST",
  },
  {
    label: "05 / CLINICAL TEAM",
    name: <>Dr. Muqeet<br />Ur Rahman</>,
    degrees: <>BDS (OSM) · Dental Surgeon<br />4+ years</>,
    image: "/assets/Dr.Muqeet-ur-Rahman.png",
    alt: "Dr. Muqeet Ur Rahman",
  },
];

/* Editorial identity plate used only where no authentic Neodent
   portrait exists yet (Dr. Asiya, Dr. Safoora). It intentionally does
   NOT imply a likeness: an abstract, feature-less head-and-shoulders
   line sits far behind a ghost-serif initials mark, dressed in the
   same registration-dot / hairline / arc vocabulary used across the
   site (see .guide, .plateFocusRing, .frameRegistration). Never a
   stock photo or invented portrait standing in for a real, named
   clinician -- the plate is deliberately its own honest, on-brand
   object, sized to the same frame as a real photograph so all four
   cards still read as one design system. */
function EditorialPortraitPlaceholder({ initials, name }: { initials: string; name: string }) {
  return (
    <div className={styles.identityPlate} role="img" aria-label={`${name} — portrait not available`}>
      <svg className={styles.plateSilhouette} viewBox="0 0 120 160" fill="none" aria-hidden="true" focusable="false">
        <circle cx="60" cy="50" r="25" strokeWidth="1" />
        <path d="M14 158c0-31.5 20.6-57 46-57s46 25.5 46 57" strokeWidth="1" />
      </svg>
      <i className={styles.plateArc} aria-hidden="true" />
      <i className={styles.plateAxis} aria-hidden="true" />
      <i className={styles.plateRule} aria-hidden="true" />
      <i className={styles.plateDot} aria-hidden="true" />
      <span className={styles.plateInitials} aria-hidden="true">{initials}</span>
      <span className={styles.plateLabel} aria-hidden="true">Portrait not available</span>
    </div>
  );
}

export function ClinicalLeadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const folioRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [folioVisible, setFolioVisible] = useState(false);
  const [playing, setPlaying] = useState(true);

  /* Section reveal. Deliberately a one-shot, threshold-0 observer with
     a bottom rootMargin rather than the ratio-based check this section
     used while it was short: now that the Miftah profile carries a
     portrait, a portfolio field and the film, the section is several
     viewports tall, and any fractional threshold could never be
     satisfied on a small screen -- which would leave the whole section
     stuck at opacity 0. */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Portfolio field gets its own reveal so it still animates in on its
  // own scroll beat instead of having fired long before it is reached.
  useEffect(() => {
    const node = folioRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFolioVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Play/pause is bound to the film plate itself, not the section --
     resource-conscious autoplay that still works now the section is
     far taller than the viewport. */
  useEffect(() => {
    const node = filmRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void videoRef.current?.play().catch(() => undefined);
        else videoRef.current?.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section ref={sectionRef} className={`${styles.section} ${visible ? styles.visible : ""}`} id="leadership" aria-labelledby="leadership-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="leadership-title" className={styles.title}>
            A steady hand.<br /><span>A human approach.</span>
          </h2>
        </header>

        {/* Row 1: doctor card (left), photo + philosophy callout + CTA
            (right), tops aligned. Row 2: the narrative paragraphs across
            the full width. DOM order doubles as the mobile order: card,
            photo + callout, CTA, paragraphs. */}
        <div className={styles.feature}>
          <div className={styles.identityHead}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.avatar}>
                  <Image
                    className={styles.avatarImg}
                    src={MIFTAH_MEDIA.avatar.src}
                    alt={MIFTAH_MEDIA.avatar.alt}
                    fill
                    sizes="112px"
                  />
                </div>
                <div className={styles.identity}>
                  <h4 className={styles.cardName}>Dr. Md. Miftah Ur Rahman</h4>
                  <p className={styles.label}>Assistant Director, Neodent Dental Hospitals</p>
                </div>
                <p className={styles.exp}>
                  <strong>15+</strong>
                  <span>Years of clinical experience</span>
                </p>
              </div>

              <dl className={styles.facts}>
                <div className={styles.fact}>
                  <dt>Qualifications</dt>
                  <dd className={styles.quals}>BDS · MDS · FICOI (U.S.A.)</dd>
                </div>
                <div className={styles.fact}>
                  <dt>Specialism</dt>
                  <dd>Prosthodontist &amp; Implantologist · Smile Designer (expert in smile design)</dd>
                </div>
                <div className={styles.fact}>
                  <dt>Academic post</dt>
                  <dd>Assistant Professor, Department of Prosthodontics, SB Patil Dental College &amp; Hospital</dd>
                </div>
                <div className={styles.fact}>
                  <dt>Practising at</dt>
                  <dd>Mehdipatnam &amp; Nampally, Hyderabad</dd>
                </div>
                <div className={styles.fact}>
                  <dt>Recognition</dt>
                  <dd>University Gold Medalist · Madina Gold Medal (2023), awarded by Commissioner A. K. Khan</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className={styles.visual}>
            <figure className={styles.portrait}>
              <Image
                src={MIFTAH_MEDIA.portrait.src}
                alt={MIFTAH_MEDIA.portrait.alt}
                fill
                sizes="(max-width: 800px) 92vw, 46vw"
                className={styles.portraitImg}
              />
            </figure>
            <blockquote className={styles.quote}>
              <p>&ldquo;Save the natural teeth, even if they are mobile.&rdquo;</p>
            </blockquote>
            <div className={styles.ctaRow}>
              <AppButton href="/doctors/dr-miftah-ur-rahman" variant="primary">
                Explore Dr. Miftah <ArrowRight size={15} aria-hidden="true" />
              </AppButton>
            </div>
          </div>

          <div className={styles.identityBody}>
            <p className={`${styles.copy} section-lede section-lede--on-dark`}>
              Dr. Md. Miftah Ur Rahman is a{" "}
              <EditorialHighlight tone="primary" onDark>
                Prosthodontist and Implantologist
              </EditorialHighlight>{" "}
              and{" "}
              <EditorialHighlight tone="secondary" onDark>
                Assistant Director at Neodent Dental Hospital
              </EditorialHighlight>
              . He practises across both Neodent locations in Hyderabad —{" "}
              <EditorialHighlight tone="quiet" onDark>
                Mehdipatnam and Nampally
              </EditorialHighlight>{" "}
              — alongside the practice&apos;s founder, Dr. Mohd. Siraj Ur
              Rahman, in the same specialist disciplines Neodent has been
              built around since 1994.
            </p>
            <p className={`${styles.copy} section-lede section-lede--on-dark`}>
              His specialist grounding is in{" "}
              <EditorialHighlight tone="primary" onDark>
                prosthodontics and implantology
              </EditorialHighlight>{" "}
              — the{" "}
              <EditorialHighlight tone="secondary" onDark>
                rehabilitation and replacement of teeth
              </EditorialHighlight>
              , from crowns, bridges and dentures through to the surgical
              placement of dental implants. Much of that work is
              reconstructive rather than routine, which is why a
              consultation with him usually begins with{" "}
              <EditorialHighlight tone="quiet" onDark>
                a full assessment before any treatment plan
              </EditorialHighlight>{" "}
              is put forward.
            </p>
            <p className={`${styles.copy} section-lede section-lede--on-dark`}>
              Alongside clinical dentistry he teaches as an{" "}
              <EditorialHighlight tone="primary" onDark>
                Assistant Professor at SB Patil Dental College &amp; Hospital
              </EditorialHighlight>
              , in the{" "}
              <EditorialHighlight tone="secondary" onDark>
                Department of Prosthodontics
              </EditorialHighlight>
              . That academic involvement is not separate from his practice
              at Neodent:{" "}
              <EditorialHighlight tone="quiet" onDark>
                teaching keeps the clinical reasoning current
              </EditorialHighlight>
              , and the two have run in parallel throughout his career.
            </p>
            <p className={`${styles.copy} section-lede section-lede--on-dark`}>
              He qualified BDS and MDS, holds{" "}
              <EditorialHighlight tone="secondary" onDark>
                FICOI (U.S.A.)
              </EditorialHighlight>{" "}
              certification and is a{" "}
              <EditorialHighlight tone="primary" onDark>
                Gold Medallist
              </EditorialHighlight>
              , with 15+ years in clinical dentistry. As Assistant Director
              he carries that experience into{" "}
              <EditorialHighlight tone="quiet" onDark>
                how Neodent plans and explains treatment
              </EditorialHighlight>{" "}
              — precision, clear conversations, and care that stays
              personal even when the work ahead is complex.
            </p>
          </div>
        </div>

        {/* Portfolio field. Deliberately not an equal-card gallery: one
            dominant teaching plate, a medium recognition plate offset
            downward, a small academic plate and the profile film, laid
            out on the same 12-column staggered-plate grammar the /about
            press archive uses, with an index note carrying the factual
            captions. Compact enough that the supporting roster below is
            not pushed unnecessarily far down the page. */}
        <div
          ref={folioRef}
          className={`${styles.folio} ${folioVisible ? styles.folioVisible : ""}`}
        >
          <div className={styles.folioHeader}>
            <span>Portfolio / Professional moments</span>
            <em>Clinical practice · Recognition · Teaching · Academic</em>
          </div>

          <div className={styles.folioGrid}>
            <figure className={`${styles.folioPlate} ${styles.folioLead}`}>
              <span className={styles.folioIndex} aria-hidden="true">i</span>
              <span className={styles.frameRegistration} aria-hidden="true" />
              <div className={styles.folioFrame}>
                <Image
                  src={MIFTAH_MEDIA.teaching.src}
                  alt={MIFTAH_MEDIA.teaching.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 48vw"
                  className={styles.plateImage}
                />
              </div>
              <figcaption>
                <b>Teaching / Academic</b>
                <span>
                  Teaching prosthodontics at SB Patil Dental College &amp;
                  Hospital.
                </span>
              </figcaption>
            </figure>

            <figure className={`${styles.folioPlate} ${styles.folioRecognition}`}>
              <span className={styles.folioIndex} aria-hidden="true">ii</span>
              <div className={styles.folioFrame}>
                <Image
                  src={MIFTAH_MEDIA.recognition.src}
                  alt={MIFTAH_MEDIA.recognition.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 34vw"
                  className={styles.plateImage}
                />
              </div>
              <figcaption>
                <b>Recognition</b>
                <span>Professional recognition.</span>
              </figcaption>
            </figure>

            <div className={styles.folioNote}>
              <p className={styles.folioNoteCopy}>
                As Assistant Director at Neodent, his prosthodontic and implant
                work spans the Mehdipatnam and Nampally clinics. It centres on{" "}
                <EditorialHighlight tone="primary" onDark>
                  restoring what can be saved and rebuilding what cannot
                </EditorialHighlight>{" "}
                — implants, full-mouth rehabilitation and the restorative work
                that follows — with{" "}
                <EditorialHighlight tone="secondary" onDark>
                  a full assessment and a plan before treatment begins
                </EditorialHighlight>
                .
              </p>
              <p className={styles.folioNoteCopy}>
                Alongside clinical practice, he teaches and conducts seminars
                as Assistant Professor in the Department of Prosthodontics at
                SB Patil Dental College &amp; Hospital — and that{" "}
                <EditorialHighlight tone="quiet" onDark>
                  teaching keeps the clinical reasoning current
                </EditorialHighlight>
                .
              </p>
            </div>

            <figure className={`${styles.folioPlate} ${styles.folioAcademic}`}>
              <span className={styles.folioIndex} aria-hidden="true">iii</span>
              <div className={styles.folioFrame}>
                <Image
                  src={MIFTAH_MEDIA.academic.src}
                  alt={MIFTAH_MEDIA.academic.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 26vw"
                  className={styles.plateImage}
                />
              </div>
              <figcaption>
                <b>Academic / Institutional</b>
                <span>Academic teaching and professional development.</span>
              </figcaption>
            </figure>

            {/* The profile film stays, with its existing editorial
                treatment intact -- but as the closing supporting
                object in the portfolio field rather than the section's
                primary representation of Dr. Miftah. */}
            <figure ref={filmRef} className={`${styles.folioPlate} ${styles.film}`}>
              <span className={styles.folioIndex} aria-hidden="true">iv</span>
              <span className={styles.plateFocusRing} aria-hidden="true" />
              <span className={styles.frameRegistration} aria-hidden="true" />
              <div className={styles.filmFrame}>
                {/* TODO: replace with a caption-free Miftah profile clip when available.
                    This is the only Miftah profile clip in /public/assets -- its source
                    has a burned-in caption box baked into the frame. filmCaptionMask
                    below is a minimal, temporary mitigation only; remove once a clean
                    clip is supplied. */}
                <video ref={videoRef} src="/assets/treatment-video/Dr. Miftah Neodent dental clinic Hyderabad - treatment video.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Dr. Miftah Ur Rahman introduction and clinical profile film" />
                <span className={styles.filmCaptionMask} aria-hidden="true" />
                <div className={styles.filmTop}><span>04 / PROFILE FILM</span><span>NEODENT / 2026</span></div>
                <button type="button" className={styles.control} onClick={toggleVideo} aria-label={playing ? "Pause profile film" : "Play profile film"}>{playing ? <Pause size={14} /> : <Play size={14} />}</button>
              </div>
              <figcaption>
                <b>Clinical film</b>
                <span>Dr. Miftah Ur Rahman / In practice.</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className={styles.teamHeader}><span>Supporting clinical team</span><em>Established expertise / one practice</em></div>

        {/* Four consistent team cards -- same frame, same image aspect
            ratio, same label/name/degree stack -- so the roster reads as
            one coherent system. Hierarchy is carried by order and the
            numbered label text, not by unequal card sizes. Dr. Asiya and
            Dr. Safoora use the editorial identity plate above (never an
            invented likeness) so all four cards still share one
            identical design standard. */}
        <div className={styles.team}>
          {team.map((member) => (
            <article className={styles.member} key={member.label}>
              <div className={styles.memberImage}>
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.image} alt={member.alt} />
                ) : (
                  <EditorialPortraitPlaceholder initials={member.initials ?? ""} name={member.alt} />
                )}
              </div>
              <span>{member.label}</span>
              <h3>{member.name}</h3>
              <p>{member.degrees}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
