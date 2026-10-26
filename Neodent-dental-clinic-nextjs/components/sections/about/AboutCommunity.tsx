"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { useReveal } from "./useReveal";
import shared from "./shared.module.css";
import styles from "./AboutCommunity.module.css";

/* ------------------------------------------------------------------
   About -- "A presence in the wider community."

   Pattern: SpacesDesignedAroundCare's mixed photo layout (a larger and
   a smaller plate, bottom-aligned, never equal tiles) on the ivory
   ground, beside the text. Two press clippings close the composition
   at one common image height.
   ------------------------------------------------------------------ */

const NEWS = "/assets/news-articles/";

const clippings = [
  {
    src: `${NEWS}Dr siraj neodent dental clinic Nampally news article.jpg`,
    alt: "The Siasat Daily — feature on dental awareness delivered by Dr. Mohd. Siraj Ur Rahman",
    width: 811,
    height: 1280,
    caption: "Dental awareness feature",
    source: "The Siasat Daily · Nampally",
    sizes: "(min-width: 1024px) 370px, (min-width: 768px) 45vw, 56vw",
  },
  {
    src: `${NEWS}Dr siraj and Dr Miftah neodent dental clinic Nampally news.jpg`,
    alt: "The Siasat Daily — coverage of Neodent's clinical team at Nampally",
    width: 584,
    height: 1280,
    caption: "Clinical team coverage",
    source: "The Siasat Daily · Nampally",
    sizes: "(min-width: 1024px) 270px, (min-width: 768px) 33vw, 40vw",
  },
];

export function AboutCommunity() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${shared.ivory}`}
      id="community"
      aria-labelledby="community-title"
    >
      <div className={shared.container}>
        <div className={styles.layout}>
          <div className={styles.copy} data-reveal>
            <h2 id="community-title" className={shared.title}>
              A presence in the <span>wider community.</span>
            </h2>
            <div className={styles.prose}>
              <p className={shared.lede}>
                On the occasion of the{" "}
                <EditorialHighlight tone="secondary">
                  73rd Republic Day
                </EditorialHighlight>
                , Dr. Mohd. Siraj Ur Rahman addressed a gathering at{" "}
                <EditorialHighlight tone="quiet">
                  Government Dental College and Hospital, Hyderabad
                </EditorialHighlight>{" "}
                — a public appearance connected to the same institution where
                he has also held an academic teaching role.
              </p>
              <p className={shared.lede}>
                Dr. Mohd. Siraj Ur Rahman has also appeared in{" "}
                <EditorialHighlight tone="primary">
                  televised interviews
                </EditorialHighlight>{" "}
                discussing dental health with the public, extending his
                clinical voice beyond Neodent&apos;s own patients.
              </p>
              <p className={shared.lede}>
                The same press coverage that documents Neodent&apos;s clinical
                history also records this public dimension of its work —
                lectures, health camps and media appearances that carried
                Neodent&apos;s name from the clinic into the wider community.
              </p>
            </div>
          </div>

          <div className={styles.gallery}>
            <div className={styles.pair} data-reveal>
              <figure className={`${shared.figure} ${styles.main}`}>
                <div className={`${shared.photo} ${styles.wide}`}>
                  <Image
                    src="/assets/Dr Md Siraj addressing the gathering at govt dental collage and hospital hyderabd.jpg"
                    alt="Dr. Mohd. Siraj Ur Rahman addressing the gathering at Government Dental College and Hospital, Hyderabad, on the occasion of the 73rd Republic Day"
                    fill
                    sizes="(min-width: 1024px) 440px, (min-width: 768px) 56vw, 64vw"
                  />
                </div>
                <figcaption className={shared.caption}>
                  <span className={shared.source}>Republic Day address</span>
                  <em className={shared.medium}>
                    Govt. Dental College &amp; Hospital, Hyderabad
                  </em>
                </figcaption>
              </figure>

              <figure className={`${shared.figure} ${styles.side}`}>
                <div className={`${shared.photo} ${styles.wide}`}>
                  <Image
                    src="/assets/dr-siraj-tv-interview.jpg"
                    alt="Dr. Mohd. Siraj Ur Rahman during a News18 Urdu television interview"
                    fill
                    sizes="(min-width: 1024px) 250px, (min-width: 768px) 32vw, 36vw"
                  />
                </div>
                <figcaption className={shared.caption}>
                  <span className={shared.source}>Television</span>
                  <em className={shared.medium}>News18 Urdu</em>
                </figcaption>
              </figure>
            </div>

            <div className={styles.row} data-reveal>
              {clippings.map((clip) => (
                <figure
                  key={clip.src}
                  className={styles.clip}
                  style={{ "--ar": clip.width / clip.height } as CSSProperties}
                >
                  <div className={styles.frame}>
                    <Image
                      className={styles.img}
                      src={clip.src}
                      alt={clip.alt}
                      width={clip.width}
                      height={clip.height}
                      sizes={clip.sizes}
                    />
                  </div>
                  <figcaption className={shared.caption}>
                    <span className={shared.source}>{clip.caption}</span>
                    <em className={shared.medium}>{clip.source}</em>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
