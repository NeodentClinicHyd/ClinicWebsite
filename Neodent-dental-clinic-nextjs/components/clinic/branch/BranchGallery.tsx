"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import type { ClinicLocation } from "@/lib/clinic-data";
import { ClinicGalleryViewer } from "../ClinicGalleryViewer";
import { branchContent, photoSize } from "./branch-content";
import { useReveal } from "../useReveal";
import shared from "../ClinicShared.module.css";
import styles from "./BranchGallery.module.css";

/* ------------------------------------------------------------------
   Branch page -- photograph gallery.

   Pattern: the /clinic "Spaces designed around care" photographs, but
   laid out as a column-flow (masonry) set so every photograph is shown
   whole at its own aspect ratio -- landscape and portrait frames sit
   together without being cropped to a common tile. Captions sit beneath
   the photographs rather than over them, so no detail is covered.
   The same branch-only set opens in the existing lightbox.
   ------------------------------------------------------------------ */

export function BranchGallery({ clinic }: { clinic: ClinicLocation }) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const content = branchContent[clinic.slug];
  const images = clinic.gallery;

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.dark} ${shared.charcoal}`}
      id="gallery"
      aria-labelledby="gallery-title"
    >
      <div className={shared.container}>
        <header className={styles.header} data-reveal>
          <h2 id="gallery-title" className={shared.title}>
            {content.galleryTitle[0]} <span>{content.galleryTitle[1]}</span>
          </h2>
          <p className={`${shared.lede} ${styles.lede}`}>{content.galleryLede}</p>
        </header>

        <ul
          className={`${styles.set} ${images.length <= 2 ? styles.pair : ""}`}
          aria-label={`Photographs of Neodent ${clinic.name}`}
        >
          {images.map((image, index) => {
            const { width, height } = photoSize(image.src);
            return (
              <li key={image.src} className={styles.item}>
                <figure className={styles.figure}>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => setViewerIndex(index)}
                    aria-label={`View full photograph: ${image.label}`}
                    aria-haspopup="dialog"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={width}
                      height={height}
                      sizes="(min-width: 1024px) 380px, (min-width: 560px) 46vw, 92vw"
                      className={styles.image}
                    />
                    <span className={styles.zoom} aria-hidden="true">
                      <ZoomIn size={15} />
                    </span>
                  </button>
                  <figcaption className={styles.caption}>{image.label}</figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      {viewerIndex !== null && (
        <ClinicGalleryViewer
          images={images}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </section>
  );
}
