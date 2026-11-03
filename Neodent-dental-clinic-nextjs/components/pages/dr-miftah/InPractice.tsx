"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TreatmentEvidenceViewer } from "./TreatmentEvidenceViewer";
import { FilmCard } from "./FilmCard";
import { DrMiftahBackdrop } from "./DrMiftahBackdrop";
import { SectionHead } from "./SectionHead";
import { SwipeDots } from "./SwipeDots";
import { PRACTICE_FILMS } from "@/lib/miftah-treatment-evidence";
import styles from "./InPractice.module.css";

/* ------------------------------------------------------------------
   07 In practice (pattern P7, videos). Dark band. From 1024 px: the
   heading on the left, the three reels on the right; below 1024 px a
   swipe row with progress dots. Each reel is a 9:16 poster capped by
   --media-max-h; it opens the shared evidence viewer (nothing plays in
   place, so there is no autoplay and at most one film plays at a time).
   ------------------------------------------------------------------ */

export function InPractice() {
  const [filmIndex, setFilmIndex] = useState<number | null>(null);
  const reelsRef = useRef<HTMLDivElement>(null);
  return (
    <section className={styles.section} aria-labelledby="miftah-practice-title">
      <DrMiftahBackdrop />
      <div className={styles.container}>
        <div className={styles.layout}>
          <SectionHead
            tone="dark"
            className={styles.head}
            eyebrow="07 / IN PRACTICE"
            id="miftah-practice-title"
            title="See the work behind the treatment."
            lede={<>Real clinical films from Dr. Miftah&rsquo;s work at Neodent.</>}
          />
          <div className={styles.reel}>
            <Reveal className={styles.reelRule} aria-hidden="true">
              <span>Clinical films</span>
              <span>01 &mdash; {String(PRACTICE_FILMS.length).padStart(2, "0")}</span>
            </Reveal>
            <div ref={reelsRef}>
              <Reveal as="ul" className={styles.films} stagger={100} data-swipe>
                {PRACTICE_FILMS.map((film, index) => (
                  <li className={styles.film} key={film.item.src}>
                    <FilmCard
                      tone="dark"
                      number={String(index + 1).padStart(2, "0")}
                      poster={film.poster}
                      alt={film.posterAlt}
                      meta="Dr. Md. Miftah Ur Rahman · Neodent"
                      title={film.title}
                      cta="View film"
                      label={film.item.label}
                      sizes="(max-width: 1023px) 62vw, 260px"
                      onOpen={() => setFilmIndex(index)}
                      dataAttrs={{ "data-practice-film": String(index) }}
                    />
                  </li>
                ))}
              </Reveal>
              <SwipeDots
                listRef={reelsRef}
                count={PRACTICE_FILMS.length}
                noun="Film"
                tone="dark"
                className={styles.dots}
              />
            </div>
            <Reveal className={styles.footer}>
              <span>Clinical work &middot; Neodent Hyderabad</span>
              <span>{String(PRACTICE_FILMS.length).padStart(2, "0")} films</span>
            </Reveal>
          </div>
        </div>
      </div>
      {filmIndex !== null && (
        <TreatmentEvidenceViewer
          key={`practice-film-${filmIndex}`}
          title="In practice · Clinical films"
          items={PRACTICE_FILMS.map((f) => f.item)}
          initialIndex={filmIndex}
          onClose={() => setFilmIndex(null)}
        />
      )}
    </section>
  );
}
