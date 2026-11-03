"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CASES } from "@/lib/braces-orthodontics-page";
import { Lightbox, type LightboxPhoto } from "./Lightbox";
import { SectionHeader } from "./SectionHeader";
import { SwipeRow } from "./SwipeRow";
import styles from "./ResultsCases.module.css";

/* Results, directly after the page header (plan 4.2). The page has one real
   case today: one before photograph and one after photograph (intra-oral,
   supplied by the clinic). The section is driven by an array, so a second
   case later needs data only: with more than one case the cards become a
   row of equal cards (a swipe row with progress dots on phones).

   Desktop: heading, introduction and consent text in the left column, the
   case card in the right column. Phone: the same, stacked. Both photographs
   are exactly the supplied files (no blur, no retouching; cover with one
   shared crop). A click or tap opens a lightbox with the pair together.
   Rendered by the page chrome only while SHOW_BRACES_CASE_IMAGES is true. */
type CaseItem = { id: string; photos: LightboxPhoto[] };

const CASE_LIST: CaseItem[] = [
  {
    id: "case-1",
    photos: CASES.images.map((image) => ({
      src: image.src,
      alt: image.alt,
      label: image.label,
      width: CASES.width,
      height: CASES.height,
    })),
  },
];

const LIGHTBOX_TITLE = `${CASES.sans} ${CASES.accent}`;

export function ResultsCases() {
  const [open, setOpen] = useState<string | null>(null);
  const openCase = CASE_LIST.find((item) => item.id === open) ?? null;
  const multiple = CASE_LIST.length > 1;

  const card = (item: CaseItem) => (
    <figure className={styles.card} key={item.id}>
      <Reveal variant="mask" className={styles.media}>
        <div className={styles.pair}>
          {item.photos.map((photo) => (
            <button
              key={photo.src}
              type="button"
              className={styles.thumb}
              onClick={() => setOpen(item.id)}
              aria-haspopup="dialog"
              aria-label={`Enlarge before and after photographs. ${photo.alt}`}
            >
              <Image
                className={styles.image}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 767px) 44vw, (max-width: 1023px) 34vw, 300px"
              />
            </button>
          ))}
        </div>
      </Reveal>
      <figcaption className={styles.labels}>
        {item.photos.map((photo) => (
          <span key={photo.src}>{photo.label}</span>
        ))}
      </figcaption>
    </figure>
  );

  return (
    <section
      id="results"
      className={`${styles.section} ${multiple ? styles.multiple : ""}`}
      aria-labelledby="brc-cases-title"
    >
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.text}>
            <Reveal>
              <SectionHeader titleId="brc-cases-title" sans={CASES.sans} accent={CASES.accent} />
            </Reveal>
            <Reveal delay={90}>
              <p className={`section-lede ${styles.statement}`}>{CASES.statement}</p>
            </Reveal>
            <Reveal className={styles.consent} delay={160}>
              <p>
                {CASES.evidence}
                <Link className={styles.privacyLink} href={CASES.privacyHref}>
                  {CASES.privacyLinkText}
                </Link>
                .
              </p>
            </Reveal>
          </div>

          <div className={styles.cases}>
            {multiple ? (
              <SwipeRow
                count={CASE_LIST.length}
                label="Choose a case"
                rowClassName={styles.row}
                stagger={100}
              >
                {CASE_LIST.map(card)}
              </SwipeRow>
            ) : (
              CASE_LIST.map(card)
            )}
          </div>
        </div>
      </div>

      {openCase ? (
        <Lightbox
          title={LIGHTBOX_TITLE}
          caption={openCase.photos.map((photo) => photo.label).join(" and ")}
          photos={openCase.photos}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}
