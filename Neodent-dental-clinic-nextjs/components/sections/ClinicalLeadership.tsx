"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Pause, Play } from "lucide-react";
import styles from "./ClinicalLeadership.module.css";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";

const proofs = [
  ["01", "Credentials", "BDS · MDS · FICOI (U.S.A.)"],
  ["02", "Clinical role", "Prosthodontist & Implantologist"],
  ["03", "Recognition", "Gold Medallist"],
  ["04", "Experience / leadership", "15+ years · Assistant Director · NeoDent"],
];

/* Authentic, client-supplied Dr. Miftah photography, all from
   /public/assets/dr-miftah. Nothing here is stock, generated or
   re-processed: the primary plate is the real NeoDent operatory
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
  portrait: {
    src: "/assets/dr-miftah/Dr Miftah ur Rahman at Neodent Dental Hospital.jpeg",
    alt:
      "Dr. Md. Miftah Ur Rahman, Prosthodontist and Implantologist, standing beside the dental chair in a treatment room at NeoDent Dental Hospital, Hyderabad, holding a dental study model",
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
    degrees: <>BDS · FCIP · MDS (Chennai)<br />Professor · Director, NeoDent · 35+ years</>,
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
];

/* Editorial identity plate used only where no authentic NeoDent
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
      {/* Chapter-start seam -- top hairline + centred registration tick,
          carrying the section's own micro-label, marking a clear (but
          still dark) new-chapter boundary with Section 03. */}
      <span className={styles.seam} aria-hidden="true">
        <span className={styles.seamLabel}>04 / Portrait frame</span>
      </span>
      <div className={styles.guide} aria-hidden="true">
        <span /> <span /> <i /> <b />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          {/* Numeral sits in normal flow directly before the eyebrow with
              a negative bottom margin, exactly like Section 02's
              .archive-year bleeding into .archive-intro: later siblings
              paint over its lower portion in normal document order, so
              no z-index trick is needed and text stays fully readable. */}
          <span className={styles.numeral} aria-hidden="true">04</span>
          <div className={styles.eyebrow}>04 / The people behind the care</div>
          <div className={styles.metaLine}>Clinical leadership / NeoDent profile</div>
          <h2 id="leadership-title">A steady hand.<br /><span>A human approach.</span></h2>
        </header>

        {/* Primary profile. Three DOM blocks -- identity head, portrait
            plate, narrative body -- placed as an asymmetric two-column
            grid on desktop (head above body in the left track, plate
            spanning both rows on the right) purely so that mobile can
            re-order them into name -> real photograph -> credentials ->
            story, rather than making a visitor read four paragraphs
            before they ever see Dr. Miftah. */}
        <div className={styles.feature}>
          <div className={styles.identityHead}>
            <p className={styles.kicker}>A trusted face of NeoDent</p>
            <h3>Dr. Md. Miftah<br />Ur Rahman</h3>
            <p className={styles.role}>Prosthodontist &amp; Implantologist<br />Assistant Director · NeoDent</p>
          </div>

          {/* Right-hand aside: the portrait plate, then a profile index
              that absorbs whatever height the narrative column runs on
              past the photograph. Without it the plate simply stopped
              and left a tall void beside the last two paragraphs. The
              index rows distribute across the remaining space using the
              same space-between mechanic the credential rail uses, so
              the leftover height becomes rhythm rather than a dead
              zone -- and it carries verified metadata the rail does not
              (locations, clinical focus, academic post) rather than
              repeating it. */}
          <div className={styles.profileAside}>
            {/* The portrait plate is the section's information anchor: the
                real NeoDent operatory photograph pushed to the container's
                right edge, with the four proof points bound to it as an
                annotation rail rather than sitting beside it as an
                independent list. Each annotation's connecting tick
                terminates exactly at the frame's edge. */}
            <div className={styles.portraitPlate}>
              <div className={styles.rail}>
                {proofs.map(([number, label, value]) => (
                  <div className={styles.annotation} key={number}>
                    <span className={styles.annotationNumber}>{number}</span>
                    <div>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <figure className={styles.portrait}>
                <span className={styles.plateFocusRing} aria-hidden="true" />
                <span className={styles.frameRegistration} aria-hidden="true" />
                <div className={styles.portraitFrame}>
                  <Image
                    src={MIFTAH_MEDIA.portrait.src}
                    alt={MIFTAH_MEDIA.portrait.alt}
                    fill
                    sizes="(max-width: 800px) 92vw, (max-width: 1100px) 36vw, 480px"
                    className={styles.plateImage}
                  />
                  {/* One micro-label only -- the location and hospital are
                      already carried by the caption beneath the frame, and a
                      second label would crowd the narrower tablet width. */}
                  <div className={styles.filmTop}>
                    <span>01 / Clinical practice</span>
                  </div>
                </div>
                <figcaption className={styles.portraitCaption}>
                  <b>Dr. Miftah Ur Rahman</b>
                  <span>In the operatory · NeoDent Dental Hospital, Hyderabad</span>
                </figcaption>
              </figure>
            </div>

            <div className={styles.practiceIndex}>
              <p className={styles.practiceIndexLabel}>Profile index</p>
              <dl className={styles.practiceRows}>
                <div className={styles.practiceRow}>
                  <dt>Practising at</dt>
                  <dd>Mehdipatnam &amp; Nampally — Hyderabad</dd>
                </div>
                <div className={styles.practiceRow}>
                  <dt>Clinical focus</dt>
                  <dd>Prosthodontics · Implantology · Dental rehabilitation</dd>
                </div>
                <div className={styles.practiceRow}>
                  <dt>Academic post</dt>
                  <dd>
                    Assistant Professor — SB Patil Dental College &amp;
                    Hospital, Department of Prosthodontics
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className={styles.identityBody}>
            <p className={styles.copy}>
              Dr. Md. Miftah Ur Rahman is a{" "}
              <EditorialHighlight tone="primary" onDark>
                Prosthodontist and Implantologist
              </EditorialHighlight>{" "}
              and{" "}
              <EditorialHighlight tone="secondary" onDark>
                Assistant Director at NeoDent Dental Hospitals
              </EditorialHighlight>
              . He practises across both NeoDent locations in Hyderabad —{" "}
              <EditorialHighlight tone="quiet" onDark>
                Mehdipatnam and Nampally
              </EditorialHighlight>{" "}
              — alongside the practice&apos;s founder, Dr. Mohd. Siraj Ur
              Rahman, in the same specialist disciplines NeoDent has been
              built around since 1994.
            </p>
            <p className={styles.copy}>
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
            <p className={styles.copy}>
              Alongside clinical dentistry he teaches as an{" "}
              <EditorialHighlight tone="primary" onDark>
                Assistant Professor at SB Patil Dental College &amp; Hospital
              </EditorialHighlight>
              , in the{" "}
              <EditorialHighlight tone="secondary" onDark>
                Department of Prosthodontics
              </EditorialHighlight>
              . That academic involvement is not separate from his practice
              at NeoDent:{" "}
              <EditorialHighlight tone="quiet" onDark>
                teaching keeps the clinical reasoning current
              </EditorialHighlight>
              , and the two have run in parallel throughout his career.
            </p>
            <p className={styles.copy}>
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
                how NeoDent plans and explains treatment
              </EditorialHighlight>{" "}
              — precision, clear conversations, and care that stays
              personal even when the work ahead is complex.
            </p>
            <a className={styles.link} href="/about#legacy-and-people">
              Explore Dr. Miftah <ArrowRight size={15} aria-hidden="true" />
            </a>
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
                <EditorialHighlight tone="primary" onDark>
                  Clinical practice, teaching and recognition
                </EditorialHighlight>{" "}
                are three parts of one career rather than three separate
                stories — and the same{" "}
                <EditorialHighlight tone="secondary" onDark>
                  specialist grounding
                </EditorialHighlight>{" "}
                sits behind all of them, whether Dr. Miftah is planning a
                rehabilitation at NeoDent or{" "}
                <EditorialHighlight tone="quiet" onDark>
                  taking a seminar for dental students
                </EditorialHighlight>
                .
              </p>
              <dl className={styles.folioIndexList}>
                <div>
                  <dt>i · Teaching</dt>
                  <dd>Department of Prosthodontics, SB Patil Dental College &amp; Hospital</dd>
                </div>
                <div>
                  <dt>ii · Recognition</dt>
                  <dd>Certificate presented by Dr. K Mahendranadh Reddy</dd>
                </div>
                <div>
                  <dt>iii · Academic</dt>
                  <dd>Academic teaching and professional development</dd>
                </div>
                <div>
                  <dt>iv · Clinical film</dt>
                  <dd>NeoDent Dental Hospital, Hyderabad</dd>
                </div>
              </dl>
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
