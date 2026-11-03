"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CASES, SHOW_COMPOSITE_CASE_IMAGES } from "@/lib/composite-build-up-page";
import { Lightbox, type LightboxPhoto } from "./Lightbox";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import { SwipeRow } from "./SwipeRow";
import styles from "./ResultsCases.module.css";

/* Results, directly after the page header (plan 4.2). Heading left and
   introduction right; one case card (before and after side by side, the
   caption and the statement beside them); the consent strip under it. The
   row is a SwipeRow so more cases can be added later: one row up to three
   cards, a scroll-snap swipe row with progress dots on phones. With the one
   case that exists there is nothing to swipe, so no dots are drawn.

   Every photograph opens a lightbox that shows the pair together, whole.
   The faces in the supplied files are mosaic-pixelated; the files are used
   exactly as supplied and are never cropped to reveal anything (on phones
   the square crop trims the sides only). There is no film for this
   treatment. Rendered only while SHOW_COMPOSITE_CASE_IMAGES is true. */
const CARDS = [
  {
    key: "composite-pair",
    title: "Composite build-up",
    photos: [CASES.before, CASES.after],
    caption: CASES.caption,
    statement: CASES.statement,
  },
];

export function ResultsCases() {
  const [open, setOpen] = useState<number | null>(null);

  if (!SHOW_COMPOSITE_CASE_IMAGES) return null;

  const lightboxPhotos = (index: number): LightboxPhoto[] =>
    CARDS[index].photos.map((photo) => ({
      src: photo.src,
      alt: photo.alt,
      width: CASES.width,
      height: CASES.height,
      label: photo.label,
    }));

  return (
    <section id="results" className={styles.section} aria-labelledby="cbu-cases-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <Reveal className={styles.headTitle}>
            <SectionHeader titleId="cbu-cases-title" sans={CASES.sans} accent={CASES.accent} />
          </Reveal>
          <Reveal className={styles.headLede} delay={90}>
            <p className="section-lede">
              <RichText parts={CASES.lede} />
            </p>
          </Reveal>
        </div>

        <SwipeRow count={CARDS.length} label="Choose a case" rowClassName={styles.row} stagger={100}>
          {CARDS.map((card, index) => (
            <figure className={styles.card} key={card.key}>
              <div className={styles.body}>
                <div className={styles.pairWrap}>
                  <Reveal variant="mask" className={styles.media}>
                    <div className={styles.pair}>
                      {card.photos.map((photo) => (
                        <button
                          type="button"
                          key={photo.src}
                          className={styles.thumb}
                          onClick={() => setOpen(index)}
                          aria-haspopup="dialog"
                          aria-label={`Enlarge before and after photographs. ${photo.alt}`}
                        >
                          <Image
                            className={styles.image}
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(max-width: 767px) 160px, 300px"
                          />
                        </button>
                      ))}
                    </div>
                  </Reveal>
                  <div className={styles.labels}>
                    {card.photos.map((photo) => (
                      <span key={photo.src}>{photo.label}</span>
                    ))}
                  </div>
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.captionLabel}>{card.caption}</span>
                  <p className={styles.statement}>{card.statement}</p>
                </figcaption>
              </div>
            </figure>
          ))}
        </SwipeRow>

        <Reveal className={styles.consent} delay={120}>
          <p>
            {CASES.evidence}
            <Link className={styles.privacyLink} href={CASES.privacyHref}>
              {CASES.privacyLinkText}
            </Link>
            .
          </p>
        </Reveal>
      </div>

      {open !== null ? (
        <Lightbox
          title={CARDS[open].title}
          caption={CARDS[open].caption}
          photos={lightboxPhotos(open)}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}
