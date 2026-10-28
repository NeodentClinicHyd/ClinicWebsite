"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { ArchiveViewer, ARCHIVE_IMAGES } from "./ArchiveViewer";
import { useReveal } from "./useReveal";
import shared from "./shared.module.css";
import styles from "./AboutPress.module.css";

/* ------------------------------------------------------------------
   About -- "A history that can be seen."

   Pattern: LegacyStory's press record (white-framed figures with a
   source line and an italic medium line) composed the way the home's
   mixed galleries are: one large featured clipping beside the intro,
   then a row of three smaller clippings at one common image height
   (widths follow each clipping's own proportions, so nothing is cropped
   or stretched). The archive lightbox is unchanged.
   ------------------------------------------------------------------ */

const NEWS = "/assets/news-articles/";

type Clip = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  source: string;
};

const featured: Clip = {
  src: `${NEWS}Dr siraj neodent dental clinic Mehdipatnam news.jpg`,
  alt: "The Siasat Daily, Hyderabad — press coverage of a professional dental lecture given by Dr. Mohd. Siraj Ur Rahman",
  width: 829,
  height: 1024,
  caption: "The Siasat Daily",
  source: "Hyderabad",
};

/* Order is the deliberate rhythm of the row: tall, wide, narrow. */
const supporting: Clip[] = [
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

const SMALL_SIZES = [
  "(min-width: 1024px) 300px, (min-width: 768px) 28vw, 48vw",
  "(min-width: 1024px) 580px, (min-width: 768px) 52vw, calc(100vw - 32px)",
  "(min-width: 1024px) 240px, (min-width: 768px) 22vw, 48vw",
];

export function AboutPress() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const [archiveOpen, setArchiveOpen] = useState(false);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory}`}
      id="archive"
      aria-labelledby="archive-title"
    >
      <div className={shared.container}>
        <div className={styles.head}>
          <div className={styles.text} data-reveal>
            <div>
              <h2 id="archive-title" className={shared.title}>
                A history that <span>can be seen.</span>
              </h2>
              <div className={styles.intro}>
                <p className={shared.lede}>
                  Alongside its clinical work, Neodent has been covered by the
                  Urdu press in Hyderabad, principally{" "}
                  <EditorialHighlight tone="secondary">
                    The Siasat Daily
                  </EditorialHighlight>{" "}
                  — coverage of professional lectures, dental health camps,
                  orthodontic treatment and{" "}
                  <EditorialHighlight tone="quiet">
                    academic recognition within Neodent&apos;s clinical team
                  </EditorialHighlight>
                  .
                </p>
                <p className={shared.lede}>
                  These clippings are not curated for effect — they are simply
                  what has been written about Neodent and its doctors over the
                  years, kept as part of the practice&apos;s own record. Seen
                  together, they trace{" "}
                  <EditorialHighlight tone="primary">
                    a consistent thread
                  </EditorialHighlight>
                  : a Hyderabad dental practice that has stayed visible in its
                  own community for as long as it has been treating patients.
                </p>
              </div>
            </div>

            <div className={styles.archiveLink}>
              <button
                type="button"
                className={shared.cta}
                onClick={() => setArchiveOpen(true)}
                aria-label={`Open full archive — ${ARCHIVE_IMAGES.length} newspaper items`}
              >
                View full archive
                <ArrowRight size={13} aria-hidden="true" />
              </button>
              <p className={shared.label}>
                {ARCHIVE_IMAGES.length} press items in the archive
              </p>
            </div>
          </div>

          <figure className={`${styles.clip} ${styles.lead}`} data-reveal>
            <div className={styles.frame}>
              <Image
                className={styles.img}
                src={featured.src}
                alt={featured.alt}
                width={featured.width}
                height={featured.height}
                sizes="(min-width: 1024px) 680px, (min-width: 768px) 92vw, calc(100vw - 32px)"
              />
            </div>
            <figcaption className={shared.caption}>
              <span className={shared.source}>{featured.caption}</span>
              <em className={shared.medium}>{featured.source}</em>
            </figcaption>
          </figure>
        </div>

        <div className={styles.row} data-reveal>
          {supporting.map((clip, index) => (
            <figure
              key={clip.src}
              className={`${styles.clip} ${index === 1 ? styles.wide : ""}`}
              style={{ "--ar": clip.width / clip.height } as CSSProperties}
            >
              <div className={styles.frame}>
                <Image
                  className={styles.img}
                  src={clip.src}
                  alt={clip.alt}
                  width={clip.width}
                  height={clip.height}
                  sizes={SMALL_SIZES[index]}
                />
              </div>
              <figcaption className={shared.caption}>
                <span className={shared.source}>{clip.caption}</span>
                <em className={shared.medium}>{clip.source}</em>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {archiveOpen && (
        <ArchiveViewer initialIndex={0} onClose={() => setArchiveOpen(false)} />
      )}
    </section>
  );
}
