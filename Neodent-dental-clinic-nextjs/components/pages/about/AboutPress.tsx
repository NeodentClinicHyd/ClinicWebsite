"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ArchiveViewer, ARCHIVE_IMAGES } from "@/components/sections/about/ArchiveViewer";
import { AboutBackdrop } from "./AboutBackdrop";
import { DocumentViewer, type DocumentItem } from "./DocumentViewer";
import { SwipeRow } from "./SwipeRow";
import shared from "./AboutShared.module.css";
import styles from "./AboutPress.module.css";

/* ------------------------------------------------------------------
   About -- S6 "A history that can be seen." (dark, documents)

   Heading, both paragraphs, every caption, alt and the "View full
   archive" button (same aria-label, still opens the 16-item
   ArchiveViewer) are moved unchanged from the previous AboutPress.
   The four cuttings sit whole (contain) on paper plates at one common
   height, each opening in DocumentViewer. Below 768px they are one
   swipe row with dots. No highlight marks (dark band). Layout note:
   the plan put the large cutting beside the text; here all four share
   one row so they stay at one height cap and none exceeds 70% of the
   viewport (recorded in CHANGELOG R3).
   ------------------------------------------------------------------ */

const NEWS = "/assets/news-articles/";

const clips: DocumentItem[] = [
  {
    src: `${NEWS}Dr siraj neodent dental clinic Mehdipatnam news.jpg`,
    alt: "The Siasat Daily, Hyderabad — press coverage of a professional dental lecture given by Dr. Mohd. Siraj Ur Rahman",
    width: 829,
    height: 1024,
    caption: "The Siasat Daily",
    source: "Hyderabad",
  },
  {
    src: `${NEWS}Dr siraj neodent dental clinic Mehdipatnam news article.jpg`,
    alt: "The Siasat Daily — front-page feature on dental care at Neodent",
    width: 803,
    height: 1280,
    caption: "Front-page dental care feature",
    source: "The Siasat Daily · Mehdipatnam",
  },
  {
    src: `${NEWS}Dr siraj neodent dental clinic Nampally news about health.jpg`,
    alt: "The Siasat Daily — coverage of a Neodent dental implant awareness camp",
    width: 1080,
    height: 879,
    caption: "Dental implant awareness camp",
    source: "The Siasat Daily · Nampally",
  },
  {
    src: `${NEWS}Dr siraj and dr. Miftah neodent dental clinic Nampally news post.jpg`,
    alt: "The Siasat Daily — feature on modern orthodontic treatment involving Neodent's clinical team",
    width: 631,
    height: 1280,
    caption: "Orthodontic treatment feature",
    source: "The Siasat Daily · Nampally",
  },
];

export function AboutPress() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null);

  return (
    <section
      className={`${shared.section} ${shared.dark} ${styles.press}`}
      id="archive"
      aria-labelledby="archive-title"
    >
      <AboutBackdrop />
      <div className={shared.container}>
        <div className={styles.top}>
          <Reveal as="div" className={styles.head}>
            <h2 id="archive-title" className={shared.title}>
              A history that can be seen.
            </h2>
          </Reveal>

          <Reveal as="div" className={styles.text} stagger={80}>
            <p className={shared.lede}>
              Alongside its clinical work, Neodent has been covered by the Urdu
              press in Hyderabad, principally The Siasat Daily — coverage of
              professional lectures, dental health camps, orthodontic
              treatment and academic recognition within Neodent&apos;s clinical
              team.
            </p>
            <p className={shared.lede}>
              These clippings are not curated for effect — they are simply what
              has been written about Neodent and its doctors over the years,
              kept as part of the practice&apos;s own record. Seen together,
              they trace a consistent thread: a Hyderabad dental practice that
              has stayed visible in its own community for as long as it has
              been treating patients.
            </p>
          </Reveal>

          <Reveal as="div" className={styles.archive} delay={120}>
            <button
              type="button"
              className={styles.archiveBtn}
              onClick={() => setArchiveOpen(true)}
              aria-label={`Open full archive — ${ARCHIVE_IMAGES.length} newspaper items`}
            >
              View full archive
              <ArrowRight size={15} aria-hidden="true" />
            </button>
            <p className={shared.label}>
              {ARCHIVE_IMAGES.length} press items in the archive
            </p>
          </Reveal>
        </div>

        <Reveal as="div" className={styles.gallery} delay={100}>
          <SwipeRow
            label="Press cuttings"
            className={styles.row}
            itemClassName={styles.rowItem}
            wide
            items={clips.map((clip, index) => ({
              key: clip.src,
              style: { "--ar": clip.width / clip.height } as CSSProperties,
              node: (
                <figure className={styles.plate}>
                  <button
                    type="button"
                    className={styles.open}
                    onClick={() => setViewer(index)}
                    aria-label={`View larger: ${clip.caption}, ${clip.source}`}
                  >
                    <span className={styles.paper}>
                      <Image
                        className={styles.img}
                        src={clip.src}
                        alt={clip.alt}
                        fill
                        sizes="(min-width: 1024px) 300px, (min-width: 768px) 24vw, 70vw"
                      />
                    </span>
                  </button>
                  <figcaption className={shared.caption}>
                    <span className={shared.source}>{clip.caption}</span>
                    <em className={shared.medium}>{clip.source}</em>
                  </figcaption>
                </figure>
              ),
            }))}
          />
        </Reveal>
      </div>

      {archiveOpen && (
        <ArchiveViewer initialIndex={0} onClose={() => setArchiveOpen(false)} />
      )}
      {viewer !== null && (
        <DocumentViewer
          items={clips}
          index={viewer}
          onIndexChange={setViewer}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
