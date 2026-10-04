"use client";

import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import styles from "./FilmCard.module.css";

/* ------------------------------------------------------------------
   FilmCard — the doctor profile's single video-card system, shared by
   Clinical Teaching (Section 06) and In Practice (Section 07).

   Poster-first: the card is a button holding an optimised 9:16 poster
   (a real frame of the film it opens). No <video> element exists until
   the visitor activates the card; the parent then opens the shared
   TreatmentEvidenceViewer, which mounts and plays the film. Width is
   set by the parent grid — the frame keeps the native 9:16 ratio, so
   posters are never stretched or squashed.
   ------------------------------------------------------------------ */

export interface FilmCardProps {
  /** Display index, e.g. "01". */
  number: string;
  poster: string;
  alt: string;
  /** Small tracked metadata line above the title. */
  meta: string;
  title: string;
  /** Call-to-action label, e.g. "View film". */
  cta: string;
  /** Accessible film description — used as "Play film: …". */
  label: string;
  /** Surface the card sits on. */
  tone?: "light" | "dark";
  sizes?: string;
  onOpen: () => void;
  /** Hook for QA / analytics, e.g. { "data-practice-film": "0" }. */
  dataAttrs?: Record<`data-${string}`, string>;
}

export function FilmCard({
  number,
  poster,
  alt,
  meta,
  title,
  cta,
  label,
  tone = "light",
  sizes = "(max-width: 767px) 60vw, (max-width: 1099px) 30vw, 240px",
  onOpen,
  dataAttrs,
}: FilmCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${tone === "dark" ? styles.dark : styles.light}`}
      aria-haspopup="dialog"
      aria-label={`Play film: ${label}`}
      onClick={onOpen}
      data-film-card
      {...dataAttrs}
    >
      <span className={styles.frame}>
        <Image src={poster} alt={alt} fill sizes={sizes} className={styles.poster} />
        <span className={styles.scrim} aria-hidden="true" />
        <span className={styles.index} aria-hidden="true">
          {number}
        </span>
        <span className={styles.play} aria-hidden="true">
          <Play size={14} />
        </span>
      </span>
      <span className={styles.body} aria-hidden="true">
        <span className={styles.meta}>{meta}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.cta}>
          {cta}
          <ArrowRight size={12} />
        </span>
      </span>
    </button>
  );
}
