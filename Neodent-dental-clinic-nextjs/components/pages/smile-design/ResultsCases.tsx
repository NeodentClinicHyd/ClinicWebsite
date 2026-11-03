"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CASES, SHOW_SMILE_CASE_IMAGES } from "@/lib/smile-design-page";
import { Lightbox, type LightboxPhoto } from "./Lightbox";
import { SectionHeader } from "./SectionHeader";
import { SwipeRow } from "./SwipeRow";
import styles from "./ResultsCases.module.css";

/* Results, directly after the page header (plan 4.2).
   Desktop (1024 px and wider): a heading row (heading left, introduction
   right), one row of two equal-height cards (the before and after pair, then
   the six clinical photographs of one case) and a slim consent strip under
   both. Below 1024 px the two cards are one swipe row with progress dots.
   Every photograph opens a lightbox: the pair opens before and after
   together, the six open as a set with previous and next.

   The mosaic over the eyes is baked into the pair files, and the six tiles are
   cropped to the lower face in their files. Every file is used exactly as
   supplied. The whole section renders only while SHOW_SMILE_CASE_IMAGES is
   true. The page has no film. */

type OpenState = { group: "pair" | "series"; index: number } | null;

const { pair, steps } = CASES;

const PAIR_PHOTOS: LightboxPhoto[] = [
  { src: pair.before, alt: pair.beforeAlt, width: pair.width, height: pair.height, label: pair.beforeLabel },
  { src: pair.after, alt: pair.afterAlt, width: pair.width, height: pair.height, label: pair.afterLabel },
];

const SERIES_PHOTOS: LightboxPhoto[] = steps.map((step) => ({
  src: step.src,
  alt: step.alt,
  width: step.width,
  height: step.height,
  label: "",
}));

export function ResultsCases() {
  const [open, setOpen] = useState<OpenState>(null);

  if (!SHOW_SMILE_CASE_IMAGES) return null;

  return (
    <section id="results" className={styles.section} aria-labelledby="sd-cases-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <Reveal>
            <SectionHeader titleId="sd-cases-title" sans={CASES.sans} accent={CASES.accent} />
          </Reveal>
          <Reveal delay={90}>
            <p className={`${styles.lede} section-lede`}>{CASES.intro}</p>
          </Reveal>
        </div>

        <SwipeRow count={2} label="Choose a case" rowClassName={styles.row} stagger={100}>
          <figure className={`${styles.card} ${styles.pairCard}`}>
            <div className={styles.cardBody}>
              <Reveal variant="mask">
                <div className={styles.pair}>
                {PAIR_PHOTOS.map((photo, index) => (
                  <div className={styles.pairCol} key={photo.src}>
                    <button
                      type="button"
                      className={`${styles.thumb} ${styles.pairThumb}`}
                      onClick={() => setOpen({ group: "pair", index })}
                      aria-haspopup="dialog"
                      aria-label={`Enlarge before and after photographs. ${photo.alt}`}
                    >
                      <Image
                        className={styles.image}
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 767px) 140px, (max-width: 1100px) 22vw, 200px"
                      />
                    </button>
                    <p className={styles.label}>{photo.label}</p>
                  </div>
                ))}
                </div>
              </Reveal>
              <figcaption className={styles.caption}>{pair.caption}</figcaption>
            </div>
          </figure>

          <figure className={`${styles.card} ${styles.seriesCard}`}>
            <div className={styles.cardBody}>
              <Reveal variant="mask">
                <ol className={styles.series}>
                {SERIES_PHOTOS.map((photo, index) => (
                  <li className={styles.tile} key={photo.src}>
                    <button
                      type="button"
                      className={`${styles.thumb} ${styles.tileThumb}`}
                      onClick={() => setOpen({ group: "series", index })}
                      aria-haspopup="dialog"
                      aria-label={`Enlarge photograph. ${photo.alt}`}
                    >
                      <Image
                        className={styles.image}
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 767px) 130px, (max-width: 1100px) 22vw, 220px"
                      />
                    </button>
                  </li>
                ))}
                </ol>
              </Reveal>
              <figcaption className={styles.caption}>{CASES.stepsCaption}</figcaption>
            </div>
          </figure>
        </SwipeRow>

        <Reveal className={styles.consent} delay={120}>
          <aside className={styles.consentInner} aria-label="About these images">
            <p className={styles.evidence}>{CASES.evidence}</p>
            <p className={styles.privacy}>
              {CASES.privacyLead}
              <Link className={styles.privacyLink} href={CASES.privacyHref}>
                {CASES.privacyLinkText}
              </Link>
              .
            </p>
          </aside>
        </Reveal>
      </div>

      {open ? (
        <Lightbox
          title={CASES.sans + " " + CASES.accent}
          caption={open.group === "pair" ? pair.caption : CASES.stepsCaption}
          photos={open.group === "pair" ? PAIR_PHOTOS : SERIES_PHOTOS}
          layout={open.group}
          startIndex={open.index}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}
