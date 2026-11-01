"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { Reveal } from "@/components/motion/Reveal";
import { DocumentViewer, type DocumentItem } from "./DocumentViewer";
import { SwipeRow } from "./SwipeRow";
import shared from "./AboutShared.module.css";
import styles from "./AboutCommunity.module.css";

/* ------------------------------------------------------------------
   About -- S10 "A presence in the wider community." (light)

   All three paragraphs, both photos (with captions and alts) and both
   press cuttings are moved unchanged from the previous AboutCommunity.
   The text drawn over the Republic Day photo is part of the picture
   (it is not DOM text), so the photo keeps its own 16:9 proportion and
   is not cropped. Paragraphs one and two are visible; the third sits in
   a native <details>. Two highlight marks remain (the third phrase is
   plain text). The red italic accent stays on this heading (S4, S7 and
   S10 are the sections allowed to carry it). Below 768px the two photos
   are one swipe row and the two cuttings are another; the cuttings open
   in DocumentViewer.
   ------------------------------------------------------------------ */

const NEWS = "/assets/news-articles/";

const photos = [
  {
    key: "republic-day",
    src: "/assets/Dr Md Siraj addressing the gathering at govt dental collage and hospital hyderabd.jpg",
    alt: "Dr. Mohd. Siraj Ur Rahman addressing the gathering at Government Dental College and Hospital, Hyderabad, on the occasion of the 73rd Republic Day",
    caption: "Republic Day address",
    source: "Govt. Dental College & Hospital, Hyderabad",
    sizes: "(min-width: 1024px) 360px, (min-width: 768px) 50vw, 86vw",
    weight: 64,
  },
  {
    key: "tv",
    src: "/assets/dr-siraj-tv-interview.jpg",
    alt: "Dr. Mohd. Siraj Ur Rahman during a News18 Urdu television interview",
    caption: "Television",
    source: "News18 Urdu",
    sizes: "(min-width: 1024px) 200px, (min-width: 768px) 28vw, 86vw",
    weight: 36,
  },
];

const clips: DocumentItem[] = [
  {
    src: `${NEWS}Dr siraj neodent dental clinic Nampally news article.jpg`,
    alt: "The Siasat Daily — feature on dental awareness delivered by Dr. Mohd. Siraj Ur Rahman",
    width: 811,
    height: 1280,
    caption: "Dental awareness feature",
    source: "The Siasat Daily · Nampally",
  },
  {
    src: `${NEWS}Dr siraj and Dr Miftah neodent dental clinic Nampally news.jpg`,
    alt: "The Siasat Daily — coverage of Neodent's clinical team at Nampally",
    width: 584,
    height: 1280,
    caption: "Clinical team coverage",
    source: "The Siasat Daily · Nampally",
  },
];

export function AboutCommunity() {
  const [viewer, setViewer] = useState<number | null>(null);

  return (
    <section
      className={`${shared.section} ${shared.light} ${styles.community}`}
      id="community"
      aria-labelledby="community-title"
    >
      <div className={shared.container}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <Reveal as="div">
              <h2 id="community-title" className={shared.title}>
                A presence in the{" "}
                <span className={shared.accent}>wider community.</span>
              </h2>
            </Reveal>
            <Reveal as="div" className={styles.prose} stagger={80}>
              <p className={shared.lede}>
                On the occasion of the{" "}
                <EditorialHighlight tone="secondary">
                  73rd Republic Day
                </EditorialHighlight>
                , Dr. Mohd. Siraj Ur Rahman addressed a gathering at Government
                Dental College and Hospital, Hyderabad — a public appearance
                connected to the same institution where he has also held an
                academic teaching role.
              </p>
              <p className={shared.lede}>
                Dr. Mohd. Siraj Ur Rahman has also appeared in{" "}
                <EditorialHighlight tone="primary">
                  televised interviews
                </EditorialHighlight>{" "}
                discussing dental health with the public, extending his
                clinical voice beyond Neodent&apos;s own patients.
              </p>
            </Reveal>
            <details className={shared.more}>
              <summary>Read more</summary>
              <div className={shared.moreBody}>
                <p className={shared.lede}>
                  The same press coverage that documents Neodent&apos;s
                  clinical history also records this public dimension of its
                  work — lectures, health camps and media appearances that
                  carried Neodent&apos;s name from the clinic into the wider
                  community.
                </p>
              </div>
            </details>
          </div>

          <div className={styles.gallery}>
            <SwipeRow
              label="Community photographs"
              className={styles.photoRow}
              itemClassName={styles.photoItem}
              items={photos.map((photo, index) => ({
                key: photo.key,
                style: { "--w": photo.weight } as CSSProperties,
                node: (
                  <figure className={shared.figure}>
                    <Reveal variant="mask" delay={index * 100}>
                      <div className={styles.photo}>
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes={photo.sizes}
                          className={styles.image}
                        />
                      </div>
                    </Reveal>
                    <figcaption className={shared.caption}>
                      <span className={shared.source}>{photo.caption}</span>
                      <em className={shared.medium}>{photo.source}</em>
                    </figcaption>
                  </figure>
                ),
              }))}
            />

            <Reveal as="div" delay={120}>
              <SwipeRow
                label="Press cuttings"
                className={styles.clipRow}
                itemClassName={styles.clipItem}
                items={clips.map((clip, index) => ({
                  key: clip.src,
                  style: { "--ar": clip.width / clip.height } as CSSProperties,
                  node: (
                    <figure className={shared.figure}>
                      <button
                        type="button"
                        className={styles.open}
                        onClick={() => setViewer(index)}
                        aria-label={`View larger: ${clip.caption}, ${clip.source}`}
                      >
                        <span className={styles.paper}>
                          <Image
                            className={styles.img}
                            src={clip.src}
                            alt={clip.alt}
                            fill
                            sizes="(min-width: 1024px) 240px, (min-width: 768px) 24vw, 60vw"
                          />
                        </span>
                      </button>
                      <figcaption className={shared.caption}>
                        <span className={shared.source}>{clip.caption}</span>
                        <em className={shared.medium}>{clip.source}</em>
                      </figcaption>
                    </figure>
                  ),
                }))}
              />
            </Reveal>
          </div>
        </div>
      </div>

      {viewer !== null && (
        <DocumentViewer
          items={clips}
          index={viewer}
          onIndexChange={setViewer}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
