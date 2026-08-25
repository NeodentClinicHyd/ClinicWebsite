"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { ArchiveViewer, ARCHIVE_IMAGES } from "./ArchiveViewer";
import styles from "./LegacyAndPeople.module.css";

/* ------------------------------------------------------------------
   About page — Section 01 — "The People & The Legacy".

   Warm ivory editorial surface. Design language inherited from the
   homepage's canonical .archive-* system (LegacyStory.tsx /
   globals.css): DM Serif Display headings with a red-italic emphasis
   line, a 10px/.2em uppercase eyebrow with a red hairline, an
   oversized low-opacity serif numeral, thin registration/drafting
   marks, and 15px/1.7 muted body copy. Values are re-derived locally
   (this module never edits globals.css) but read off the same global
   tokens every locked homepage section already uses
   (--neodent-red, --app-font-serif, --neodent-ink, --neodent-muted).

   Five editorial "acts" live inside this single section rather than
   as independent full-screen chapters, per the page's structure
   rule: 1994/founding, the founder, clinical continuity, the press
   archive, and professional recognition — closing on a single
   editorial statement. Nothing here touches Home.tsx, Navbar,
   Footer, or any locked homepage section (01-08). ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>(threshold = 0.14) {
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

export function LegacyAndPeople() {
  const [sectionRef, sectionVisible] = useReveal<HTMLElement>(0.06);
  const [openingRef, openingVisible] = useReveal<HTMLDivElement>(0.08);
  const [introRef, introVisible] = useReveal<HTMLDivElement>();
  const [beginningRef, beginningVisible] = useReveal<HTMLDivElement>();
  const [founderRef, founderVisible] = useReveal<HTMLDivElement>();
  const [continuityRef, continuityVisible] = useReveal<HTMLDivElement>();
  const [archiveRef, archiveVisible] = useReveal<HTMLDivElement>(0.08);
  const [recognitionRef, recognitionVisible] = useReveal<HTMLDivElement>();
  const [closingRef, closingVisible] = useReveal<HTMLDivElement>();

  const [archiveOpen, setArchiveOpen] = useState(false);
  const [archiveStartIndex, setArchiveStartIndex] = useState(0);

  const openArchive = (index = 0) => {
    setArchiveStartIndex(index);
    setArchiveOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${sectionVisible ? styles.visible : ""}`}
      id="legacy-and-people"
      aria-labelledby="legacy-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.arch} />
        <span className={styles.draftHorizontal} />
        <span className={styles.draftVertical} />
        <span className={styles.registrationDot} />
        <span className={styles.registrationDotSmall} />
      </div>

      <div className={styles.container}>
        {/* ---- Opening editorial composition — unified title/text/image --- */}
        <div
          ref={openingRef}
          className={`${styles.openingComposition} ${openingVisible ? styles.blockVisible : ""}`}
        >
          {/* LEFT COLUMN — story */}
          <div className={styles.openingLeft}>
            <header className={styles.header}>
              <span className={styles.numeral} aria-hidden="true">
                01
              </span>
              <div className={styles.eyebrow}>The NeoDent Legacy</div>
              <h1 id="legacy-title" className={styles.title}>
                Decades of changing smiles.
                <br />
                <span>A legacy that continues.</span>
              </h1>
            </header>

            <p className={styles.established}>
              <span className={styles.establishedTick} aria-hidden="true" />
              Established 1994 · Hyderabad
            </p>

            <div
              ref={introRef}
              className={`${styles.intro} ${introVisible ? styles.blockVisible : ""}`}
            >
              <p>
                NeoDent Dental Hospital was founded in Hyderabad in{" "}
                <EditorialHighlight tone="primary">1994</EditorialHighlight> by Dr.
                Mohd. Siraj Ur Rahman, opening its first practice in Mehdipatnam.
                In the decades since, that single clinic has grown into{" "}
                <EditorialHighlight tone="secondary">
                  NeoDent Dental Hospitals
                </EditorialHighlight>
                , now practising across{" "}
                <EditorialHighlight tone="quiet">
                  Mehdipatnam and Nampally
                </EditorialHighlight>
                , built on specialist-led dental care that has shaped every year
                since.
              </p>
              <p>
                For patients, that history is not an abstraction. An appointment
                in Mehdipatnam or Nampally today draws on{" "}
                <EditorialHighlight tone="primary">
                  more than three decades of accumulated clinical experience
                </EditorialHighlight>{" "}
                — treatment planning and judgement built consultation by
                consultation, and carried forward by{" "}
                <EditorialHighlight tone="secondary">
                  the wider clinical team
                </EditorialHighlight>{" "}
                that now works alongside the practice&apos;s founder. NeoDent has
                always centred on{" "}
                <EditorialHighlight tone="quiet">
                  the person in the chair
                </EditorialHighlight>
                , not just the procedure ahead of them.
              </p>
              <p>
                That continuity is what NeoDent asks every patient to trust: a{" "}
                <EditorialHighlight tone="secondary">
                  specialist-led clinical team
                </EditorialHighlight>
                , a clear explanation of every treatment option, and an approach
                that treats each visit — routine check-up or complex implant
                work alike — with{" "}
                <EditorialHighlight tone="primary">
                  the same attention it received in 1994
                </EditorialHighlight>
                .
              </p>
            </div>

            {/* Clinical metadata — editorial annotation */}
            <div className={styles.openingMeta}>
              <span className={styles.openingMetaLabel}>Dr. Md. Miftah Ur Rahman</span>
              <span className={styles.openingMetaSub}>Prosthodontist &amp; Implantologist</span>
              <span className={styles.openingMetaSub}>Assistant Director · NeoDent</span>
            </div>
          </div>

          {/* RIGHT COLUMN — clinical image */}
          <figure className={styles.openingImage}>
            <span className={styles.openingRegistration} aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/dr-miftah/Dr. Md. Miftah Ur Rahman during treatment- Neodent Dental Hospital.jpg"
              alt="Dr. Md. Miftah Ur Rahman performing a dental treatment procedure at NeoDent Dental Hospital, Hyderabad"
              loading="eager"
            />
          </figure>
        </div>

        {/* Intro is now embedded inside openingComposition above, but we need
            a placeholder div here to preserve the existing reveal ref structure
            for the acts that follow */}
        <div
          style={{ display: "none" }}
          aria-hidden="true"
        />

        {/* ---- Act 01 — 1994 / The Beginning ------------------------ */}
        <div
          ref={beginningRef}
          className={`${styles.act} ${styles.beginning} ${beginningVisible ? styles.blockVisible : ""}`}
        >
          <span className={styles.actYear} aria-hidden="true">
            1994
          </span>
          <div className={styles.actBody}>
            <p className={styles.actEyebrow}>01 / The Beginning</p>
            <h2 className={styles.actTitle}>A practice shaped by experience.</h2>
            <p className={styles.actText}>
              NeoDent was founded in{" "}
              <EditorialHighlight tone="primary">1994</EditorialHighlight> in
              Mehdipatnam, Hyderabad, at a time when specialist-led dental
              care of this kind was still uncommon in the city. Dr. Mohd.
              Siraj Ur Rahman established the practice around{" "}
              <EditorialHighlight tone="secondary">
                dentistry, prosthodontics and implantology
              </EditorialHighlight>
              , disciplines that would come to define NeoDent&apos;s approach
              for the following three decades.
            </p>
            <p className={styles.actText}>
              Rather than following a fixed template, NeoDent&apos;s identity
              took shape gradually, through years of{" "}
              <EditorialHighlight tone="quiet">
                clinical practice
              </EditorialHighlight>
              : each technique adopted, each patient conversation had, each
              treatment carried out, added to a foundation the practice still
              stands on today. What started as a single clinic became, over
              time, a name associated in Hyderabad with{" "}
              <EditorialHighlight tone="primary">
                careful, considered dental care
              </EditorialHighlight>
              .
            </p>
          </div>
        </div>

        {/* ---- Act 02 — The Founder (centrepiece) ------------------- */}
        <div
          ref={founderRef}
          className={`${styles.founderFeature} ${founderVisible ? styles.blockVisible : ""}`}
        >
          <figure className={styles.founderPortrait}>
            <span className={styles.founderFrameOffset} aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png"
              alt="Dr. Mohd. Siraj Ur Rahman, founder and director of NeoDent Dental Hospitals"
              loading="lazy"
            />
            <figcaption>
              <b>Dr. Mohd. Siraj Ur Rahman</b>
              <span>Founder · Director · NeoDent</span>
            </figcaption>
          </figure>

          <div className={styles.founderCopy}>
            <p className={styles.actEyebrow}>02 / The Founder</p>
            <h2 className={styles.actTitle}>
              A career built on <span>specialist care.</span>
            </h2>
            <p className={styles.actText}>
              Dr. Mohd. Siraj Ur Rahman is the{" "}
              <EditorialHighlight tone="primary">
                founder and director
              </EditorialHighlight>{" "}
              of NeoDent Dental Hospitals. He established the practice in
              Hyderabad in 1994 and has led its clinical direction for{" "}
              <EditorialHighlight tone="secondary">
                more than three decades
              </EditorialHighlight>
              , building NeoDent around the disciplines of dentistry,
              prosthodontics and implantology.
            </p>
            <p className={styles.actText}>
              A dental surgeon by training, with{" "}
              <EditorialHighlight tone="quiet">
                BDS and MDS (Chennai) qualifications and FCIP
              </EditorialHighlight>
              , his specialisation lies in prosthodontics and implantology —
              the reconstruction and replacement of teeth, and the surgical
              placement of dental implants. That specialist grounding has
              informed NeoDent&apos;s clinical approach since its earliest
              years.
            </p>
            <p className={styles.actText}>
              Alongside his clinical practice, Dr. Siraj holds the position
              of{" "}
              <EditorialHighlight tone="primary">
                Professor at Osmania Government Dental College &amp; Hospital,
                Hyderabad
              </EditorialHighlight>
              , bringing an academic dimension to his work that complements
              decades of hands-on treatment. Teaching and clinical practice
              have run in parallel throughout his career, each informing the
              other.
            </p>
            <p className={styles.actText}>
              With{" "}
              <EditorialHighlight tone="secondary">
                35+ years of experience
              </EditorialHighlight>{" "}
              in dentistry, Dr. Siraj&apos;s clinical philosophy has always
              placed the patient conversation ahead of the procedure —
              understanding the concern before proposing the treatment. That
              approach, established at NeoDent&apos;s founding, continues to
              guide the practice today.
            </p>
            <p className={styles.actText}>
              As Director, Dr. Siraj continues to oversee NeoDent&apos;s two
              Hyderabad locations, Mehdipatnam and Nampally, while remaining
              directly involved in{" "}
              <EditorialHighlight tone="quiet">
                clinical work
              </EditorialHighlight>{" "}
              — a continuity that patients returning to NeoDent over many
              years have come to recognise. Learn more about{" "}
              <a className={styles.inlineLink} href="/expertise">
                NeoDent&apos;s clinical expertise
              </a>
              .
            </p>
          </div>
        </div>

        {/* ---- Act 03 — Clinical Continuity -------------------------- */}
        <div
          ref={continuityRef}
          className={`${styles.continuity} ${continuityVisible ? styles.blockVisible : ""}`}
        >
          <figure className={styles.continuityImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/Dr Siraj and Dr. Miftah Neodent dental clinic - during treatment.webp"
              alt="Dr. Mohd. Siraj Ur Rahman and Dr. Md. Miftah Ur Rahman during treatment at NeoDent Dental Clinic"
              loading="lazy"
            />
            <span className={styles.continuityRegistration} aria-hidden="true" />
            <figcaption>Dr. Siraj &amp; Dr. Miftah / In practice</figcaption>
          </figure>
          <div className={styles.continuityCopy}>
            <p className={styles.actEyebrow}>03 / Clinical Continuity</p>
            <h2 className={styles.actTitle}>Experience carried forward.</h2>
            <p className={styles.actText}>
              At NeoDent, clinical experience is not held by one person
              alone. Dr. Md. Miftah Ur Rahman,{" "}
              <EditorialHighlight tone="secondary">
                Prosthodontist and Implantologist
              </EditorialHighlight>{" "}
              and Assistant Director at NeoDent, works alongside Dr. Siraj
              across both the Mehdipatnam and Nampally locations, extending
              the same specialist disciplines into the practice&apos;s
              day-to-day clinical work.
            </p>
            <p className={styles.actText}>
              Alongside his role at NeoDent, Dr. Miftah is an{" "}
              <EditorialHighlight tone="quiet">
                Assistant Professor at SB Patil Dental College &amp; Hospital
              </EditorialHighlight>
              , echoing the academic dimension that has run through
              NeoDent&apos;s clinical leadership since 1994. Together with{" "}
              <EditorialHighlight tone="primary">
                the wider clinical team
              </EditorialHighlight>
              , this shared foundation of specialist training means no
              single appointment depends on one clinician&apos;s presence
              alone.
            </p>
          </div>
        </div>

        {/* ---- Act 04 — The NeoDent Archive --------------------------- */}
        <div
          ref={archiveRef}
          className={`${styles.archive} ${archiveVisible ? styles.blockVisible : ""}`}
        >
          <header className={styles.archiveHeader}>
            <p className={styles.actEyebrow}>04 / The NeoDent Archive</p>
            <h2 className={styles.actTitle}>A history that can be seen.</h2>
          </header>
          <p className={styles.actText}>
            Alongside its clinical work, NeoDent has been covered by the
            Urdu press in Hyderabad, principally{" "}
            <EditorialHighlight tone="secondary">
              The Siasat Daily
            </EditorialHighlight>
            — coverage of professional lectures, dental health camps,
            orthodontic treatment and{" "}
            <EditorialHighlight tone="quiet">
              academic recognition within NeoDent&apos;s clinical team
            </EditorialHighlight>
            .
          </p>
          <p className={styles.actText}>
            These clippings are not curated for effect — they are simply
            what has been written about NeoDent and its doctors over the
            years, kept as part of the practice&apos;s own record. Seen
            together, they trace{" "}
            <EditorialHighlight tone="primary">
              a consistent thread
            </EditorialHighlight>
            : a Hyderabad dental practice that has stayed visible in its own
            community for as long as it has been treating patients.
          </p>

          <div className={styles.archivePlates}>
            <figure className={styles.plateMain}>
              <span className={styles.plateIndex} aria-hidden="true">
                i
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/news-articles/Dr siraj neodent dental clinic Mehdipatnam news.jpg"
                alt="The Siasat Daily, Hyderabad — press coverage of a professional dental lecture given by Dr. Mohd. Siraj Ur Rahman"
                loading="lazy"
              />
              <figcaption>
                <b>The Siasat Daily</b>
                <span>Hyderabad</span>
              </figcaption>
            </figure>

            <figure className={styles.plateA}>
              <span className={styles.plateIndex} aria-hidden="true">
                ii
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/news-articles/Dr siraj and dr. Miftah neodent dental clinic Nampally news post.jpg"
                alt="The Siasat Daily — feature on modern orthodontic treatment involving NeoDent's clinical team"
                loading="lazy"
              />
              <figcaption>Orthodontic treatment feature</figcaption>
            </figure>

            <figure className={styles.plateB}>
              <span className={styles.plateIndex} aria-hidden="true">
                iii
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/news-articles/Dr siraj neodent dental clinic Nampally news about health.jpg"
                alt="The Siasat Daily — coverage of a NeoDent dental implant awareness camp"
                loading="lazy"
              />
              <figcaption>Dental implant awareness camp</figcaption>
            </figure>

            <figure className={styles.plateC}>
              <span className={styles.plateIndex} aria-hidden="true">
                iv
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/news-articles/Dr siraj neodent dental clinic Mehdipatnam news article.jpg"
                alt="The Siasat Daily — front-page feature on dental care at NeoDent"
                loading="lazy"
              />
              <figcaption>Front-page dental care feature</figcaption>
            </figure>

            <figure className={styles.plateD}>
              <span className={styles.plateIndex} aria-hidden="true">
                v
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/news-articles/Dr miftah neodent dental clinic hyderabad in the news.jpg"
                alt="The Siasat Daily — recognition of Dr. Md. Miftah Ur Rahman's academic achievement"
                loading="lazy"
              />
              <figcaption>Academic recognition</figcaption>
            </figure>
          </div>

          {/* ---- Archive trigger ------------------------------------ */}
          <div className={styles.archiveTriggerRow}>
            <p className={styles.archiveTriggerNote}>
              {ARCHIVE_IMAGES.length} press items in the archive
            </p>
            <button
              type="button"
              className={styles.archiveTriggerBtn}
              onClick={() => openArchive(0)}
              aria-label={`Open full archive — ${ARCHIVE_IMAGES.length} newspaper items`}
            >
              View full archive
              <ArrowRight size={12} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ---- Act 05 — Recognition ----------------------------------- */}
        <div
          ref={recognitionRef}
          className={`${styles.recognition} ${recognitionVisible ? styles.blockVisible : ""}`}
        >
          <div className={styles.recognitionCopy}>
            <p className={styles.actEyebrow}>05 / Recognition / Clinical Journey</p>
            <h2 className={styles.actTitle}>Recognition earned over time.</h2>
            <p className={styles.actText}>
              Over the decades, NeoDent and its clinical team have received
              a number of{" "}
              <EditorialHighlight tone="secondary">
                certificates, mementos and professional recognitions
              </EditorialHighlight>{" "}
              — from dental societies, academic institutions and community
              organisations. Rather than list them individually, NeoDent
              lets the record speak for itself:{" "}
              <EditorialHighlight tone="primary">
                a practice that has stayed engaged with its professional
                community
              </EditorialHighlight>{" "}
              for as long as it has been treating patients in Hyderabad.
            </p>
          </div>
          <div className={styles.recognitionImages}>
            <figure className={styles.recognitionPlate}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/neodent-awards-recognition.jpg"
                alt="Certificates, mementos and awards received by NeoDent Dental Hospitals, on display at the hospital"
                loading="lazy"
              />
              <figcaption>Institutional recognition</figcaption>
            </figure>
            <figure className={styles.recognitionPlateSmall}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/dr-miftah/dr-miftah-award-recognition.jpg"
                alt="Dr. Md. Miftah Ur Rahman receiving a certificate at a professional ceremony"
                loading="lazy"
              />
              <figcaption>Recognition ceremony</figcaption>
            </figure>
          </div>
        </div>

        {/* ---- Closing statement --------------------------------------- */}
        <div
          ref={closingRef}
          className={`${styles.closing} ${closingVisible ? styles.blockVisible : ""}`}
        >
          <p className={styles.closingStatement}>
            A legacy is built over time.
            <br />
            <span>The work continues.</span>
          </p>
          <p className={styles.established}>
            <span className={styles.establishedTick} aria-hidden="true" />
            Established 1994 · Hyderabad
          </p>
        </div>
      </div>

      {/* ---- Archive viewer modal ------------------------------------ */}
      {archiveOpen && (
        <ArchiveViewer
          initialIndex={archiveStartIndex}
          onClose={() => setArchiveOpen(false)}
        />
      )}
    </section>
  );
}
