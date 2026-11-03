import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import {
  clinicGalleryImages,
  mehdipatnamTreatmentRoomTwoImage,
  nampallyInteriorImage,
} from "@/lib/site-data";
import { ClinicBackdrop } from "./ClinicBackdrop";
import { SurroundingsPhotos } from "./SurroundingsPhotos";
import styles from "./Surroundings.module.css";

/* ------------------------------------------------------------------
   Clinics hub -- S3 "Different surroundings."

   Forked from components/clinic/ClinicalSettings.tsx (the original stays
   as it was). Heading, both photographs with their alt text, each
   photograph's clinic name and caption, and the statement are moved
   unchanged. The heading's second sentence is set in the normal heading
   style here (the red italic accent stays on the h1, S2 and S5).

   The caption boxes under the photos are now captions on a gradient at
   the bottom of each photo. Alt text, captions and crops still come from
   clinicGalleryImages.
   ------------------------------------------------------------------ */

const fromGallery = (src: string) => {
  const image = clinicGalleryImages.find((item) => item.src === src);
  if (!image) throw new Error(`Unknown clinic gallery image: ${src}`);
  return image;
};

const photos = [
  { image: fromGallery(mehdipatnamTreatmentRoomTwoImage), side: "left" },
  { image: fromGallery(nampallyInteriorImage), side: "right" },
] as const;

export function Surroundings() {
  return (
    <section
      className={styles.section}
      id="clinical-settings"
      aria-labelledby="settings-title"
    >
      <ClinicBackdrop />
      <div className={styles.container}>
        <Reveal
          as="h2"
          variant="mask"
          stagger={90}
          id="settings-title"
          className={styles.title}
        >
          {"Different surroundings. "}
          <span>The same approach to care.</span>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.red} delay={150}>
            <p className={styles.redText}>
              While the settings differ in character and location, both
              clinics follow the same <em>patient-focused approach</em> to
              consultation, treatment planning and follow-up care — the
              approach that has <em>defined Neodent since 1994</em>, carried
              forward across both Hyderabad branches.
            </p>
          </Reveal>

          <SurroundingsPhotos count={photos.length}>
            {photos.map(({ image, side }) => (
              <figure
                key={image.src}
                className={`${styles.figure} ${styles[side]}`}
              >
                <Reveal variant="mask">
                  <div className={styles.photo}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 46vw, 85vw"
                      style={{ objectPosition: image.position }}
                    />
                  </div>
                </Reveal>
                <figcaption className={styles.caption}>
                  <span className={styles.captionTitle}>{image.branch}</span>
                  <span className={styles.captionLine}>{image.label}</span>
                </figcaption>
              </figure>
            ))}
          </SurroundingsPhotos>
        </div>
      </div>
    </section>
  );
}
