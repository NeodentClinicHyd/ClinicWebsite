"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TreatmentEvidenceViewer } from "./TreatmentEvidenceViewer";
import { FilmCard } from "./FilmCard";
import { SectionHead } from "./SectionHead";
import { SwipeDots } from "./SwipeDots";
import { RCT_FILMS } from "@/lib/miftah-treatment-evidence";
import styles from "./AcademicResearch.module.css";

/* ------------------------------------------------------------------
   06 Academic and research (patterns P3 and P7). Light band.
   Left: the seminar photograph and the teaching card. Right: the
   publication cards and the PubMed link. Below: "Clinical teaching",
   the two root canal films (poster-first; each opens the shared
   evidence viewer, nothing plays in place). The heading, teaching card
   and publications sit directly under the section heading; the old
   empty column under "Clinical teaching" is gone.
   ------------------------------------------------------------------ */

const TEACHING_IMAGE = {
  src: "/assets/dr-miftah/Dr Md Miftah at Dept of Prosthodontics at SB Patil Dental College condicting seminar.jpeg",
  width: 1008,
  height: 1071,
  alt: "Dr. Md. Miftah Ur Rahman conducting a prosthodontics seminar for dental students at the Department of Prosthodontics, SB Patil Dental College & Hospital",
};

/* Publications: titles verbatim, external PubMed links. */
const PUBLICATIONS = [
  {
    title:
      "Patient-Reported Outcome Measures (PROMs) in Metal-Ceramic and All-Ceramic Fixed Partial Dentures: A Prospective Clinical Study",
    journal: "Cureus",
    year: "2026",
    href: "https://pubmed.ncbi.nlm.nih.gov/41798508/",
  },
  {
    title: "Clinical evaluation of peri-implantitis relation with implant material",
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

const PUBMED_LOGO = {
  src: "/assets/dr-miftah/pubmed-seeklogo.png",
  width: 2000,
  height: 710,
  alt: "PubMed",
};

/* Poster frames for the two RCT_FILMS (same order), 1080 x 1920. */
const RCT_FILM_POSTERS = [
  {
    src: "/assets/dr-miftah/treatments/dr-md-miftah-ur-rahman-root-canal-treatment-explainer.jpg",
    alt: "Dr. Md. Miftah Ur Rahman presenting the root canal treatment explainer film",
    title: "Root canal treatment \u2014 the explainer",
  },
  {
    src: "/assets/dr-miftah/treatments/dr-md-miftah-ur-rahman-root-canal-treatment.jpg",
    alt: "Dr. Md. Miftah Ur Rahman presenting the root canal treatment film",
    title: "Root canal treatment \u2014 the treatment film",
  },
];

export function AcademicResearch() {
  /* Index into RCT_FILMS of the film open in the shared viewer. */
  const [filmIndex, setFilmIndex] = useState<number | null>(null);
  const filmsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="published-work"
      className={styles.section}
      aria-labelledby="miftah-academic-title"
    >
      <div className={styles.container}>
        <SectionHead
          eyebrow="06 / ACADEMIC & RESEARCH"
          id="miftah-academic-title"
          title="Published work and teaching."
          lede={
            <>
              His clinical work is carried by an academic base &mdash; formal specialist
              training, published research and ongoing teaching.
            </>
          }
        />

        <div className={styles.grid}>
          <Reveal className={styles.teaching}>
            <figure className={styles.plate}>
              <div className={styles.frame}>
                <Image
                  src={TEACHING_IMAGE.src}
                  alt={TEACHING_IMAGE.alt}
                  fill
                  sizes="(max-width: 1023px) 92vw, 420px"
                  className={styles.image}
                  style={{ objectPosition: "50% 30%" }}
                />
              </div>
              <figcaption className={styles.plateCaption}>
                Seminar &middot; Dept. of Prosthodontics
              </figcaption>
            </figure>
            <div className={styles.teachingBlock}>
              <h3 className={styles.subhead}>Teaching</h3>
              <p className={styles.role}>
                Assistant Professor
                <span>
                  Department of Prosthodontics, SB Patil Dental College &amp; Hospital
                </span>
              </p>
              <p className={styles.body}>
                He teaches and conducts seminars for dental students alongside his clinical
                practice in Hyderabad.
              </p>
            </div>
          </Reveal>

          <div id="publications" className={styles.publications}>
            <Reveal className={styles.pubHead}>
              <h3 className={styles.subhead}>Selected Publications</h3>
              <p className={styles.pubmedIdentity}>
                <Image
                  src={PUBMED_LOGO.src}
                  alt={PUBMED_LOGO.alt}
                  width={PUBMED_LOGO.width}
                  height={PUBMED_LOGO.height}
                  sizes="100px"
                  className={styles.pubmedLogo}
                />
                <span className={styles.pubmedCount}>
                  Indexed on PubMed &middot; {String(PUBLICATIONS.length).padStart(2, "0")}{" "}
                  publications
                </span>
              </p>
            </Reveal>
            <Reveal as="ol" className={styles.pubList} stagger={80}>
              {PUBLICATIONS.map((publication, index) => (
                <li className={styles.pub} key={publication.href}>
                  <a
                    href={publication.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.pubLink}
                  >
                    <span className={styles.pubIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.pubBody}>
                      <span className={styles.pubMeta}>
                        {publication.journal} &middot; {publication.year}
                      </span>
                      <span className={styles.pubTitle}>{publication.title}</span>
                      <span className={styles.pubCue}>
                        Indexed &middot; PubMed
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                      <span className={styles.srOnly}> (opens PubMed in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </Reveal>
            <a
              href="https://pubmed.ncbi.nlm.nih.gov/?term=md+miftah+ur+rahman"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pubmedLink}
            >
              VIEW ON PUBMED <ArrowRight size={14} aria-hidden="true" />
              <span className={styles.srOnly}> (opens PubMed in a new tab)</span>
            </a>
          </div>
        </div>

        {/* Clinical teaching: the two root canal films. */}
        <div
          className={styles.teachingRow}
          role="group"
          aria-labelledby="miftah-teaching-films-title"
        >
          <Reveal className={styles.teachingIntro}>
            <h3 id="miftah-teaching-films-title" className={styles.subhead}>
              Clinical teaching
            </h3>
            <p className={styles.teachingFilmsLine}>Root canal treatment, explained.</p>
            <p className={styles.teachingNote}>
              Two short films in which Dr. Miftah explains root canal treatment.
            </p>
            <span className={styles.teachingMeta} aria-hidden="true">
              02 films &middot; Root canal treatment
            </span>
          </Reveal>
          <div ref={filmsRef} className={styles.filmsWrap}>
            <Reveal as="ul" className={styles.films} stagger={100} data-swipe>
              {RCT_FILMS.map((film, index) => {
                const poster = RCT_FILM_POSTERS[index];
                return (
                  <li key={film.short} className={styles.film}>
                    <FilmCard
                      number={String(index + 1).padStart(2, "0")}
                      poster={poster.src}
                      alt={poster.alt}
                      meta="Saving natural teeth"
                      title={poster.title}
                      cta="View film"
                      label={film.item.kind === "video" ? film.item.label : film.short}
                      sizes="(max-width: 767px) 60vw, 220px"
                      onOpen={() => setFilmIndex(index)}
                      dataAttrs={{ "data-teaching-film": String(index) }}
                    />
                  </li>
                );
              })}
            </Reveal>
            <SwipeDots listRef={filmsRef} count={RCT_FILMS.length} noun="Film" className={styles.dots} />
          </div>
        </div>
      </div>

      {filmIndex !== null && (
        <TreatmentEvidenceViewer
          key={`academic-film-${filmIndex}`}
          title="Root canal treatment · Films"
          items={RCT_FILMS.map((f) => f.item)}
          initialIndex={filmIndex}
          onClose={() => setFilmIndex(null)}
        />
      )}
    </section>
  );
}
