"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ImageLightbox } from "./ImageLightbox";
import type { LightboxItem } from "./ImageLightbox";
import { DrMiftahBackdrop } from "./DrMiftahBackdrop";
import { SectionHead } from "./SectionHead";
import { PRESS_CLIPPINGS } from "@/lib/miftah-press-archive";
import styles from "./PressArchive.module.css";

/* ------------------------------------------------------------------
   09 Recognition (pattern P12). Dark band. Thirteen press clippings in
   one swipe row, each shown whole (contain) at the compact media cap and
   opening the zoom viewer (ImageLightbox, which moves through all
   thirteen). Previous and next buttons (44 px) scroll the row; a thin
   progress bar replaces dots. Every clipping is in the DOM once, with its
   alt text. The old endless marquee (three copies of the set, constantly
   moving) is gone: the row only moves when the visitor scrolls it.
   ------------------------------------------------------------------ */

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function PressArchive() {
  const items = PRESS_CLIPPINGS;
  const total = items.length;
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const el = railRef.current?.querySelector<HTMLElement>("[data-swipe]");
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollByPage = useCallback((dir: 1 | -1) => {
    const el = railRef.current?.querySelector<HTMLElement>("[data-swipe]");
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: reduced ? "auto" : "smooth" });
  }, []);

  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      items.map((item) => ({
        src: item.src,
        width: item.width,
        height: item.height,
        alt: item.alt,
        caption: item.publication,
      })),
    [items],
  );

  return (
    <section className={styles.section} aria-labelledby="miftah-recognition-title">
      <DrMiftahBackdrop />
      <div className={styles.container}>
        <div className={styles.headRow}>
          <SectionHead
            tone="dark"
            eyebrow="09 / RECOGNITION"
            id="miftah-recognition-title"
            title="Recognition earned over time."
          />
          <Reveal as="p" className={styles.meta}>
            <span>Press archive</span>
            <span>{pad(total)} clippings &middot; select to enlarge</span>
          </Reveal>
        </div>

        <div className={styles.rail} ref={railRef}>
          <Reveal
            as="ul"
            className={styles.row}
            stagger={60}
            aria-label="Press archive"
            data-swipe
          >
            {items.map((item, i) => (
              <li
                key={item.src}
                className={styles.item}
                style={{ "--ratio": (item.width / item.height).toFixed(4) } as CSSProperties}
              >
                <button
                  type="button"
                  className={styles.card}
                  onClick={() => setOpen(i)}
                  aria-label={`Open press clipping ${pad(i + 1)} of ${pad(total)} \u2014 ${item.publication}`}
                  aria-haspopup="dialog"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={`${Math.ceil((item.width / item.height) * 340)}px`}
                    className={styles.image}
                    draggable={false}
                  />
                </button>
                <span className={styles.index} aria-hidden="true">
                  {pad(i + 1)}
                </span>
              </li>
            ))}
          </Reveal>
        </div>

        <div className={styles.controls}>
          <div className={styles.track} aria-hidden="true">
            <span className={styles.fill} style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }} />
          </div>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.nav}
              onClick={() => scrollByPage(-1)}
              aria-label="Previous clippings"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.nav}
              onClick={() => scrollByPage(1)}
              aria-label="Next clippings"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {open !== null && (
        <ImageLightbox
          key="press-lightbox"
          title="Press archive"
          items={lightboxItems}
          initialIndex={open}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
