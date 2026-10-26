"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { clinicGalleryImages, type ClinicGalleryImage } from "@/lib/site-data";
import { ClinicGalleryViewer } from "./ClinicGalleryViewer";
import { useReveal } from "./useReveal";
import shared from "./ClinicShared.module.css";
import styles from "./InsideNeoDent.module.css";

/* ------------------------------------------------------------------
   Clinic -- "Spaces designed around care."

   Pattern: the home "Spaces designed around care" photographs, as a
   bento grid per branch: one large tile with smaller tiles beside it.
   The image-to-branch mapping is exactly the one in
   `clinicGalleryImages` (lib/site-data.ts); this component only groups
   by `image.branch` and keeps each image's original index, so the
   lightbox opens on the same photograph in the same order as before.

   Layout is plain CSS grid with content visible by default (no reveal
   on the tiles themselves), so nothing can be left hidden or clipped.
   ------------------------------------------------------------------ */

type Tile = { image: ClinicGalleryImage; index: number };

const groups: { branch: ClinicGalleryImage["branch"]; tiles: Tile[] }[] = (
  ["Mehdipatnam", "Nampally"] as const
).map((branch) => ({
  branch,
  tiles: clinicGalleryImages
    .map((image, index) => ({ image, index }))
    .filter((tile) => tile.image.branch === branch),
}));

const sizesFor = (role: "large" | "small" | "wide") =>
  role === "small"
    ? "(min-width: 1024px) 290px, (min-width: 768px) 28vw, 46vw"
    : "(min-width: 1024px) 590px, (min-width: 768px) 50vw, 92vw";

export function InsideNeoDent() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory}`}
      id="inside-neodent"
      aria-labelledby="inside-title"
    >
      <div className={shared.container}>
        <header className={styles.header} data-reveal>
          <h2 id="inside-title" className={shared.title}>
            Spaces designed <span>around care.</span>
          </h2>
          <p className={`${shared.lede} ${styles.lede}`}>
            Across{" "}
            <EditorialHighlight tone="secondary">
              Mehdipatnam and Nampally
            </EditorialHighlight>
            , Neodent&apos;s clinical spaces are shaped around the practical
            needs of dental care — from{" "}
            <EditorialHighlight tone="primary">
              consultation and treatment
            </EditorialHighlight>{" "}
            to follow-up. The surroundings differ between the two locations,
            but both reflect the same focus on clear, comfortable and
            clinically focused patient care.
          </p>
        </header>

        <div className={styles.groups}>
          {groups.map(({ branch, tiles }) => (
            <div
              key={branch}
              className={styles.group}
              role="group"
              aria-labelledby={`gallery-${branch}`}
            >
              <h3 id={`gallery-${branch}`} className={styles.groupName}>
                {branch}
              </h3>
              <div
                className={`${styles.bento} ${
                  branch === "Nampally" ? styles.bentoPair : styles.bentoSet
                }`}
              >
                {tiles.map(({ image, index }) => {
                  const role =
                    image.span === "feature"
                      ? "large"
                      : image.span === "wide"
                        ? "wide"
                        : "small";
                  return (
                    <figure
                      key={image.src}
                      className={`${shared.photo} ${shared.shade} ${styles.tile} ${styles[role]}`}
                    >
                      <button
                        type="button"
                        className={styles.tileButton}
                        onClick={() => setViewerIndex(index)}
                        aria-label={`View full photograph: ${image.branch} — ${image.label}`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes={sizesFor(role)}
                          style={
                            image.position
                              ? { objectPosition: image.position }
                              : undefined
                          }
                        />
                        <span className={styles.zoom} aria-hidden="true">
                          <ZoomIn size={15} />
                        </span>
                      </button>
                      <figcaption className={shared.inCaption}>
                        {image.label}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewerIndex !== null && (
        <ClinicGalleryViewer
          images={clinicGalleryImages}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </section>
  );
}
