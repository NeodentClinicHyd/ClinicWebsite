"use client";

import { useRef, useState, type UIEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CASES, SHOW_SCALING_CASE_IMAGES } from "@/lib/scaling-and-polishing-page";
import { Lightbox, type LightboxPhoto } from "./Lightbox";
import { RichText } from "./RichText";
import { SectionHeader } from "./SectionHeader";
import styles from "./ResultsCases.module.css";

/* Results, directly after the page header (plan 4.2). Heading row (heading
   left, the existing introduction right), then one case card holding the
   before and after photographs side by side, then a slim consent strip.
   The page has one case, so the card is the only slide of the row; the row is
   a scroll-snap swipe row below 1024 px and gets progress dots as soon as a
   second case exists. The two photographs are about 440 x 240 px at source:
   they are shown whole-frame at no more than their own size (unoptimised, so
   never resized or enlarged) and open in a lightbox that steps between
   before and after. Faces and the images themselves are shown exactly as
   supplied; nothing is cropped to reveal or altered.
   Rendered only while SHOW_SCALING_CASE_IMAGES is true. */
export function ResultsCases() {
  const { pair } = CASES;
  const cases = [pair];
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  if (!SHOW_SCALING_CASE_IMAGES) return null;

  const photos: LightboxPhoto[] = [
    { src: pair.before, alt: pair.beforeAlt, width: pair.beforeWidth, height: pair.beforeHeight, label: pair.beforeLabel },
    { src: pair.after, alt: pair.afterAlt, width: pair.afterWidth, height: pair.afterHeight, label: pair.afterLabel },
  ];

  const onScroll = (event: UIEvent<HTMLElement>) => {
    const scroller = event.currentTarget;
    const slides = Array.from(scroller.children) as HTMLElement[];
    if (slides.length < 2) return;
    const step = slides[1].offsetLeft - slides[0].offsetLeft || 1;
    setActive(Math.min(slides.length - 1, Math.max(0, Math.round(scroller.scrollLeft / step))));
  };

  const goTo = (index: number) => {
    const scroller = wrapRef.current?.querySelector<HTMLElement>("[data-row]");
    const slide = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !slide) return;
    scroller.scrollTo({ left: slide.offsetLeft - scroller.offsetLeft, behavior: "smooth" });
  };

  const plate = (src: string, alt: string, w: number, label: string, index: number) => (
    <div className={styles.plate}>
      <Reveal variant="mask" className={styles.media}>
        <button
          type="button"
          className={styles.thumb}
          onClick={() => setOpen(index)}
          aria-haspopup="dialog"
          aria-label={`Enlarge photograph. ${alt}`}
        >
          <Image className={styles.image} src={src} alt={alt} fill sizes={`${w}px`} unoptimized />
        </button>
      </Reveal>
      <span className={styles.label}>{label}</span>
    </div>
  );

  return (
    <section id="results" className={styles.section} aria-labelledby="sp-cases-title">
      <div className={styles.container}>
        <Reveal className={styles.head}>
          <SectionHeader titleId="sp-cases-title" sans={CASES.sans} accent={CASES.accent} />
          <p className={`${styles.intro} section-lede`}>
            <RichText parts={CASES.intro} />
          </p>
        </Reveal>

        <div ref={wrapRef}>
          <Reveal className={styles.row} stagger={100} data-row="" onScroll={onScroll}>
            {cases.map((item) => (
              <figure className={styles.card} key={item.before}>
                <div className={styles.inner}>
                  <div className={styles.pair}>
                    {plate(item.before, item.beforeAlt, item.beforeWidth, item.beforeLabel, 0)}
                    {plate(item.after, item.afterAlt, item.afterWidth, item.afterLabel, 1)}
                  </div>
                  <figcaption className={styles.caption}>{item.caption}</figcaption>
                </div>
              </figure>
            ))}
          </Reveal>
          {cases.length > 1 ? (
            <div className={styles.dots} role="group" aria-label="Choose a case">
              {cases.map((item, index) => (
                <button
                  key={item.before}
                  type="button"
                  className={styles.dotButton}
                  onClick={() => goTo(index)}
                  aria-label={`Show case ${index + 1} of ${cases.length}`}
                  aria-current={active === index ? "true" : undefined}
                >
                  <span className={styles.dot} />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <Reveal as="aside" className={styles.consent} delay={120} aria-label="About these images">
          <p className={styles.evidence}>{CASES.evidence}</p>
          <p className={styles.privacy}>
            {CASES.privacyLead}
            <Link className={styles.privacyLink} href={CASES.privacyHref}>
              {CASES.privacyLinkText}
            </Link>
            .
          </p>
        </Reveal>
      </div>

      {open !== null ? (
        <Lightbox
          title={pair.caption}
          photos={photos}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}
