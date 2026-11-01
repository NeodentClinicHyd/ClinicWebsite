"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { BranchBackdrop } from "@/components/pages/clinic-mehdipatnam/BranchBackdrop";
import { BranchLightbox } from "@/components/pages/clinic-mehdipatnam/BranchLightbox";
import { SwipeDots } from "@/components/pages/clinic-mehdipatnam/SwipeDots";
import type { ClinicLocation } from "@/lib/clinic-data";
import { branchContent, photoSize } from "./branch-content";
import styles from "./BranchGallery.module.css";

/* ------------------------------------------------------------------
   Branch page -- S3 photograph gallery (dark band).

   Heading, lede, every photograph, alt text and caption are the old
   gallery's own. The heading is set in plain ivory (no red italic).

   Desktop: a four-column set. Tall and short photographs sit together in
   a masonry flow, each with a fixed 3:4 or 4:3 frame (object-fit: cover,
   capped at --media-max-h-compact), a hairline and a soft shadow, with
   its caption beneath. Below 1024px: one snap-scrolling row, cards 86%
   wide so the next one peeks, progress dots, never two large photos
   stacked. Every photograph is in the DOM either way. A click or Enter
   opens the lightbox (a native dialog forked into this page's folder).
   ------------------------------------------------------------------ */

export function BranchGallery({ clinic }: { clinic: ClinicLocation }) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const content = branchContent[clinic.slug];
  const images = clinic.gallery;

  const close = () => {
    setViewerIndex(null);
    triggerRef.current?.focus();
  };

  return (
    <section className={styles.section} id="gallery" aria-labelledby="gallery-title">
      <BranchBackdrop />
      <div className={styles.container}>
        <header className={styles.head}>
          <Reveal as="h2" variant="mask" stagger={90} id="gallery-title" className={styles.title}>
            <span>{content.galleryTitle[0]} </span>
            <span>{content.galleryTitle[1]}</span>
          </Reveal>
          <Reveal as="p" className={styles.support} delay={140}>
            {content.galleryLede}
          </Reveal>
        </header>

        <div ref={listRef} className={styles.wrap}>
          <ul
            data-swipe
            className={`${styles.set} ${images.length <= 2 ? styles.pair : ""}`}
            tabIndex={0}
            aria-label={`Photographs of Neodent ${clinic.name}`}
          >
            {images.map((image, index) => {
              const { width, height } = photoSize(image.src);
              const tall = height > width;
              return (
                <li key={image.src} className={`${styles.item} ${tall ? styles.tall : styles.short}`}>
                  <figure className={styles.figure}>
                    <Reveal variant="mask" delay={(index % 4) * 90}>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={(event) => {
                          triggerRef.current = event.currentTarget;
                          setViewerIndex(index);
                        }}
                        aria-label={`View full photograph: ${image.label}`}
                        aria-haspopup="dialog"
                      >
                        <span className={styles.frame}>
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(min-width: 1024px) 290px, (min-width: 640px) 46vw, 86vw"
                            className={styles.image}
                          />
                        </span>
                        <span className={styles.zoom} aria-hidden="true">
                          <ZoomIn size={16} />
                        </span>
                      </button>
                    </Reveal>
                    <figcaption className={styles.caption}>{image.label}</figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
          <SwipeDots
            listRef={listRef}
            count={images.length}
            noun="Photograph"
            tone="dark"
            className={styles.dots}
          />
        </div>
      </div>

      <BranchLightbox
        items={images}
        heading={clinic.name}
        index={viewerIndex}
        onIndexChange={setViewerIndex}
        onClose={close}
      />
    </section>
  );
}
