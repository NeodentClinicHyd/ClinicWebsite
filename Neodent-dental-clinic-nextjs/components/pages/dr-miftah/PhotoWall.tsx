"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { MIFTAH_PHOTOS } from "@/lib/pages/dr-miftah-content";
import { ImageLightbox } from "./ImageLightbox";
import type { LightboxItem } from "./ImageLightbox";
import { DrMiftahBackdrop } from "./DrMiftahBackdrop";
import { SectionHead } from "./SectionHead";
import styles from "./PhotoWall.module.css";

/* ------------------------------------------------------------------
   Photograph wall (PAGE_PLAN section 4, SW). Dark band between 09 and
   10. One <ul> of ten <li><a> tiles in DOM order 1 to 10. Not a slider:
   all ten are visible together as a justified mosaic.

   How the rows are made (CSS only, one copy of the markup): every tile
   has aspect-ratio from its real pixel size, and its width is its share
   of its row (ratio / sum of the ratios in that row) of the row's width
   minus the gaps. Equal widths-per-ratio give every tile in a row the
   same height. The shares for the three groupings are computed once here
   and written as custom properties; CSS picks the set for the breakpoint:
     desktop and laptop (from 900 px)  5 + 5
     tablet (640 to 899 px)            4 + 3 + 3
     phone (under 640 px)              3 + 2 + 2 + 3
   Tiles are real links to the original file, so with JavaScript off the
   link opens the full image; with JavaScript on it opens the zoom viewer.
   ------------------------------------------------------------------ */

const GROUPS = { d: [5, 5], t: [4, 3, 3], m: [3, 2, 2, 3] } as const;

/* The tallest portrait (photograph 8) is cropped by a few percent so its
   tile stays wide enough to tap: display ratio never below 0.5. */
const MIN_RATIO = 0.5;

function shares(ratios: number[], rows: readonly number[]) {
  const out: { w: number; n: number }[] = [];
  let start = 0;
  for (const count of rows) {
    const slice = ratios.slice(start, start + count);
    const sum = slice.reduce((a, b) => a + b, 0);
    for (const r of slice) out.push({ w: r / sum, n: count - 1 });
    start += count;
  }
  return out;
}

export function PhotoWall() {
  const [open, setOpen] = useState<number | null>(null);

  const tiles = useMemo(() => {
    const ratios = MIFTAH_PHOTOS.map((p) => Math.max(p.width / p.height, MIN_RATIO));
    const d = shares(ratios, GROUPS.d);
    const t = shares(ratios, GROUPS.t);
    const m = shares(ratios, GROUPS.m);
    return MIFTAH_PHOTOS.map((photo, i) => ({
      photo,
      style: {
        "--r": ratios[i].toFixed(4),
        "--wd": d[i].w.toFixed(5),
        "--nd": d[i].n,
        "--wt": t[i].w.toFixed(5),
        "--nt": t[i].n,
        "--wm": m[i].w.toFixed(5),
        "--nm": m[i].n,
      } as CSSProperties,
    }));
  }, []);

  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      MIFTAH_PHOTOS.map((p) => ({
        src: p.src,
        width: p.width,
        height: p.height,
        alt: p.alt,
        caption: p.alt,
      })),
    [],
  );

  return (
    <section className={styles.section} aria-labelledby="miftah-wall-title">
      <DrMiftahBackdrop />
      <div className={styles.container}>
        <SectionHead
          tone="dark"
          className={styles.head}
          eyebrow="Photographs"
          id="miftah-wall-title"
          title="Dr. Miftah, in photographs."
          lede="Ten photographs of Dr. Md. Miftah Ur Rahman at Neodent Dental Hospital in Hyderabad: in the treatment room, with colleagues, in the Department of Prosthodontics and receiving an award. Select any photograph to enlarge it."
        />

        <div className={styles.wall}>
          <Reveal as="ul" className={styles.list} stagger={70} aria-label="Photographs of Dr. Md. Miftah Ur Rahman">
            {tiles.map(({ photo, style }, i) => (
              <li key={photo.n} className={styles.tile} style={style}>
                <a
                  href={photo.src}
                  className={styles.link}
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(i);
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 34vw, 240px"
                    className={styles.image}
                  />
                </a>
              </li>
            ))}
          </Reveal>

          {/* Visible captions for search engines: closed, full text in the
              server HTML, no height while closed. */}
          <details className={styles.details}>
            <summary className={styles.summary}>Photograph details</summary>
            <ul className={styles.captions}>
              {MIFTAH_PHOTOS.map((photo) => (
                <li key={photo.n}>{photo.alt}</li>
              ))}
            </ul>
          </details>
        </div>
      </div>

      {open !== null && (
        <ImageLightbox
          title="Photographs"
          items={lightboxItems}
          initialIndex={open}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
