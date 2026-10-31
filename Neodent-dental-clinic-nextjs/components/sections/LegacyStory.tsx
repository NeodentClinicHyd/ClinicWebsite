"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ZoomIn } from "lucide-react";
import {
  ESTABLISHED_YEAR,
  founder,
  legacyPressItems,
  yearsSinceEstablished,
  type LegacyPressItem,
} from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { Reveal, drawLineClass } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import styles from "./LegacyStory.module.css";

/* ------------------------------------------------------------------
   Homepage legacy section: "Decades of changing smiles."
   Reference: docs/home-redesign, Parts 3, 6.3 and 7.

     1. "Since 1994" lockup: a solid 1994, "Established in Hyderabad",
        and a hairline that draws toward "Today" with scroll (the shared
        drawLineClass: animation-timeline: view() inside @supports, and an
        observer-driven draw via the parent <Reveal> elsewhere). No
        milestones have been supplied (Part 8), so the line runs from
        1994 to Today only.
     2. Story: title, Dr. Siraj's card, one paragraph. Beside it the
        press record: the Siasat cutting whole (contain, height-capped,
        tap to enlarge) and two compact thumbnails. Below 768px the three
        items become one scroll-snap row.
     3. Closing band: years since 1994 (calculated, counted up) beside
        "Different generations. One standard of care." The "25,000+
        patients" figure is not repeated here because the stat strip
        above already shows it.

   The Siasat cutting has no English caption: the proposed translation
   in Part 8 is still waiting for the clinic's approval.
   ------------------------------------------------------------------ */

/** Intrinsic sizes of the files behind legacyPressItems (public/assets). */
const PRESS_SIZE: Record<LegacyPressItem["id"], { width: number; height: number }> = {
  press: { width: 631, height: 1280 },
  tv: { width: 1277, height: 712 },
  recognition: { width: 1280, height: 960 },
};

function ZoomButton({
  item,
  onOpen,
  children,
}: {
  item: LegacyPressItem;
  onOpen: (item: LegacyPressItem) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={styles.zoomButton}
      onClick={() => onOpen(item)}
      aria-label={`Enlarge: ${item.alt}`}
      aria-haspopup="dialog"
    >
      {children}
      <span className={styles.zoomHint} aria-hidden="true">
        <ZoomIn size={16} strokeWidth={1.8} />
      </span>
    </button>
  );
}

function Caption({ item }: { item: LegacyPressItem }) {
  return (
    <figcaption className={styles.caption}>
      <span className={styles.source}>{item.source}</span>
      <span className={styles.medium}>{item.medium}</span>
    </figcaption>
  );
}

function PressZoom({
  item,
  onClose,
}: {
  item: LegacyPressItem | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  const size = item ? PRESS_SIZE[item.id] : null;
  const isDocument = item?.id === "press";

  return (
    <dialog
      ref={ref}
      className={styles.zoom}
      data-kind={isDocument ? "document" : "photo"}
      aria-label={item ? item.alt : "Enlarged image"}
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop or the empty margin closes it.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      {item && size && (
        <figure className={styles.zoomFigure}>
          <button
            type="button"
            className={styles.zoomClose}
            onClick={() => ref.current?.close()}
            aria-label="Close enlarged image"
            autoFocus
          >
            <X size={20} />
          </button>
          <Image
            className={styles.zoomImg}
            src={item.src}
            alt={item.alt}
            width={size.width}
            height={size.height}
            sizes={isDocument ? `${size.width}px` : "(min-width: 1280px) 1280px, 100vw"}
            quality={90}
          />
          <figcaption className={styles.zoomCaption}>
            {item.source} · {item.medium}
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}

export function LegacyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [zoomed, setZoomed] = useState<LegacyPressItem | null>(null);
  const [lead, tv, recognition] = legacyPressItems;
  const thumbs = [tv, recognition];
  const years = yearsSinceEstablished();

  /* The draw lines use animation-timeline: view(). That only follows the
     page scroll if the page is their nearest scroll container; an
     ancestor with overflow: hidden (today `.site` in globals.css) turns
     the timeline into a static one and the line just sits fully drawn.
     When that is the case, or view() is unsupported, fall back to
     drawing each line once as its <Reveal> enters the viewport. */
  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const lines = [...root.querySelectorAll<HTMLElement>("[data-draw]")];
    const linked = lines.every((line) => {
      const timeline = line.getAnimations()[0]?.timeline as
        | (AnimationTimeline & { source?: Element | null })
        | null
        | undefined;
      return Boolean(timeline && timeline.source === document.scrollingElement);
    });
    root.dataset.drawLinked = linked ? "true" : "false";
  }, []);

  return (
    <section
      ref={sectionRef}
      /* `archive` is kept as a plain hook for scripts/seam-card-qa.mjs,
         which locates the section below the seam card by this class. */
      className={`archive ${styles.section}`}
      id="legacy"
      aria-labelledby="legacy-title"
    >
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* ---------- Since 1994 lockup ---------- */}
        <Reveal className={styles.lockup}>
          <p className={styles.year}>
            <span className={styles.since}>Since</span>
            <span className={styles.yearNum}>{ESTABLISHED_YEAR}</span>
          </p>
          <p className={styles.est}>
            <span>Established in</span> <span>Hyderabad</span>
          </p>
          <div className={styles.track} aria-hidden="true">
            <span className={styles.trackStart} />
            <span className={`${drawLineClass} ${styles.trackLine}`} data-draw />
            <span className={styles.trackEnd} />
          </div>
          <p className={styles.today}>
            <strong>Today</strong>
            <span>Mehdipatnam · Nampally</span>
          </p>
        </Reveal>

        <div className={styles.story}>
          {/* ---------- Left: title, founder, paragraph ---------- */}
          <div className={styles.left}>
            <Reveal
              as="h2"
              id="legacy-title"
              className={styles.title}
              variant="mask"
              stagger={90}
            >
              <span>Decades of</span>
              <em>changing smiles.</em>
            </Reveal>
            {/* Plain supporting line under the brand headline (rule R3). */}
            <p className={styles.support}>
              Specialist dental care in Hyderabad since {ESTABLISHED_YEAR}.
            </p>

            <Reveal className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.portrait}>
                  <Image
                    className={styles.portraitImg}
                    src={founder.image}
                    alt={founder.imageAlt}
                    fill
                    sizes="112px"
                  />
                </div>
                <div className={styles.identity}>
                  <h3 className={styles.name}>{founder.name}</h3>
                  <p className={styles.label}>{founder.role}</p>
                </div>
                <p className={styles.exp}>
                  <strong>{founder.experienceYears}</strong>
                  <span>Years of experience</span>
                </p>
              </div>

              <dl className={styles.facts}>
                <div className={styles.fact}>
                  <dt>Qualifications</dt>
                  <dd className={styles.quals}>{founder.qualifications}</dd>
                </div>
                <div className={styles.fact}>
                  <dt>Specialism</dt>
                  <dd>{founder.specialisms.join(" · ")}</dd>
                </div>
                <div className={styles.fact}>
                  <dt>Academic post</dt>
                  <dd>{founder.academicPost}</dd>
                </div>
              </dl>

              {/* Founder credentials (SEO ledger home-t92dba0cd), in the
                  server-rendered HTML; the profile link stays visible. */}
              <details className={`home-more ${styles.more}`}>
                <summary>About {founder.shortName}</summary>
                <div className="home-more-body">
                  <p>
                    A dental surgeon, prosthodontist and implantologist, and
                    Professor at Osmania Government Dental College &amp;
                    Hospital, Hyderabad, {founder.shortName} brings together
                    specialist clinical practice and academic experience — a
                    foundation that continues to guide the care delivered at
                    Neodent.
                  </p>
                </div>
              </details>
              <Link href="/about#founder" className={styles.profileLink}>
                {founder.name}&apos;s full profile <span aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <Reveal as="p" className={styles.body}>
              Established in {ESTABLISHED_YEAR}, Neodent has grown through{" "}
              <EditorialHighlight tone="primary">
                decades of clinical practice
              </EditorialHighlight>
              , specialist-led care and a commitment to making dentistry more
              reassuring, personal and precise. Founded and led by{" "}
              {founder.name}, Neodent&apos;s clinical philosophy has been shaped
              by {founder.experienceYears} years of experience in dentistry.
              Every visit draws on that accumulated experience, and the same{" "}
              <EditorialHighlight tone="secondary">
                specialist-led approach
              </EditorialHighlight>{" "}
              that shaped Neodent from the beginning still guides treatment
              today.
            </Reveal>
          </div>

          {/* ---------- Right: the press record ---------- */}
          <div className={styles.right}>
            {/* Plain title for the press row (SEO ledger home-tb4c932d1). */}
            <h3 className={styles.recordTitle}>Three decades, on record</h3>
            <Reveal
              className={styles.record}
              stagger={90}
              role="region"
              aria-label="Press and recognition"
              tabIndex={0}
            >
              <figure className={`${styles.figure} ${styles.lead}`}>
                <ZoomButton item={lead} onOpen={setZoomed}>
                  <span className={`media-frame media-frame--document ${styles.leadFrame}`}>
                    <Image
                      className={styles.leadImg}
                      src={lead.src}
                      alt={lead.alt}
                      width={PRESS_SIZE.press.width}
                      height={PRESS_SIZE.press.height}
                      sizes="(min-width: 768px) 340px, 200px"
                    />
                  </span>
                </ZoomButton>
                <Caption item={lead} />
              </figure>

              {thumbs.map((item) => (
                <figure key={item.id} className={`${styles.figure} ${styles.thumb}`}>
                  <ZoomButton item={item} onOpen={setZoomed}>
                    <span className={`${styles.thumbFrame} ${styles[`frame_${item.id}`]}`}>
                      <Image
                        className={styles.thumbImg}
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 220px, 84vw"
                      />
                    </span>
                  </ZoomButton>
                  <Caption item={item} />
                </figure>
              ))}
            </Reveal>
          </div>
        </div>

        {/* ---------- Closing band ---------- */}
        <Reveal className={styles.band}>
          <div className={styles.bandFigure}>
            <p className={styles.bandNumber}>
              <strong>
                <CountUp to={years} duration={1100} />
              </strong>
              <span>years of care</span>
            </p>
            <div className={styles.timeline}>
              <span>{ESTABLISHED_YEAR}</span>
              <span className={`${drawLineClass} ${styles.timelineLine}`} aria-hidden="true" data-draw />
              <span>Today</span>
            </div>
          </div>
          <p className={styles.statement}>
            Different generations.
            <em>One standard of care.</em>
          </p>
        </Reveal>
      </div>

      <PressZoom item={zoomed} onClose={() => setZoomed(null)} />
    </section>
  );
}
