"use client";

import {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type UIEvent,
} from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { Reveal } from "@/components/motion/Reveal";
import { clinicGalleryImages, type ClinicGalleryImage } from "@/lib/site-data";
import { GalleryLightbox } from "./GalleryLightbox";
import styles from "./SpacesGallery.module.css";

/* ------------------------------------------------------------------
   Clinics hub -- S4 "Spaces designed around care."

   Forked from components/clinic/InsideNeoDent.tsx (the original and the
   shared ClinicGalleryViewer stay as they were). Heading, paragraph,
   group headings, all ten photographs with their alt text and every
   caption are moved unchanged. The heading is set in the normal heading
   style here (no red italic accent).

   Tabs: both panels are in the server HTML and, without JavaScript, show
   one after the other. JavaScript adds the `enhanced` class that turns
   the tabs on (useSyncExternalStore: false on the server and during
   hydration, true afterwards, so there is no mismatch). The panel that
   becomes active fades in with a 12px rise.

   Desktop: a four-column bento for Mehdipatnam (first photograph spans
   two columns and two rows, the last spans two columns) and two photos
   side by side for Nampally. Phones: one snap-scrolling row per panel
   with progress dots; never two large photos stacked. A tap or Enter on
   a photograph opens the lightbox for that panel.
   ------------------------------------------------------------------ */

const BRANCHES = ["Mehdipatnam", "Nampally"] as const;
type Branch = (typeof BRANCHES)[number];

const groups = BRANCHES.map((branch) => ({
  branch,
  images: clinicGalleryImages.filter((image) => image.branch === branch),
}));

const noopSubscribe = () => () => {};
const useEnhanced = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

function Panel({
  branch,
  images,
  active,
  enhanced,
  onOpen,
}: {
  branch: Branch;
  images: readonly ClinicGalleryImage[];
  active: boolean;
  enhanced: boolean;
  onOpen: (index: number, trigger: HTMLElement) => void;
}) {
  const [dot, setDot] = useState(0);
  const isMain = branch === "Mehdipatnam";

  const onScroll = (event: UIEvent<HTMLElement>) => {
    const row = event.currentTarget;
    if (row.children.length < 2) return;
    const first = row.children[0] as HTMLElement;
    const second = row.children[1] as HTMLElement;
    const step = second.offsetLeft - first.offsetLeft;
    if (step <= 0) return;
    const next = Math.min(
      images.length - 1,
      Math.max(0, Math.round(row.scrollLeft / step)),
    );
    setDot((prev) => (prev === next ? prev : next));
  };

  const roleFor = (index: number) => {
    if (index === 0) return styles.key;
    if (isMain && index === images.length - 1) return styles.wide;
    return styles.small;
  };

  return (
    <div
      id={`spaces-panel-${branch}`}
      role={enhanced ? "tabpanel" : "group"}
      aria-labelledby={enhanced ? `spaces-tab-${branch}` : `spaces-name-${branch}`}
      className={`${styles.panel} ${active ? styles.panelOn : styles.panelOff} ${
        isMain ? styles.main : styles.pair
      }`}
    >
      <h3 id={`spaces-name-${branch}`} className={styles.groupName}>
        {branch}
      </h3>

      <Reveal
        stagger={80}
        className={styles.row}
        tabIndex={0}
        role="group"
        aria-label={`${branch} photographs`}
        onScroll={onScroll}
      >
        {images.map((image, index) => (
          <figure key={image.src} className={`${styles.tile} ${roleFor(index)}`}>
            {index === 0 ? (
              <Reveal variant="mask" className={styles.maskFill}>
                <Media image={image} index={index} role="key" onOpen={onOpen} />
              </Reveal>
            ) : (
              <Media
                image={image}
                index={index}
                role={roleFor(index) === styles.wide ? "wide" : "small"}
                onOpen={onOpen}
              />
            )}
            <figcaption className={styles.caption}>{image.label}</figcaption>
          </figure>
        ))}
      </Reveal>

      <div className={styles.dots} aria-hidden="true">
        {images.map((image, i) => (
          <span key={image.src} className={i === dot ? styles.dotOn : styles.dot} />
        ))}
      </div>
    </div>
  );
}

function Media({
  image,
  index,
  role,
  onOpen,
}: {
  image: ClinicGalleryImage;
  index: number;
  role: "key" | "wide" | "small";
  onOpen: (index: number, trigger: HTMLElement) => void;
}) {
  const sizes =
    role === "small"
      ? "(min-width: 1024px) 290px, (min-width: 768px) 28vw, 85vw"
      : "(min-width: 1024px) 590px, (min-width: 768px) 50vw, 85vw";
  return (
    <button
      type="button"
      className={styles.media}
      onClick={(event) => onOpen(index, event.currentTarget)}
      aria-label={`View full photograph: ${image.branch} — ${image.label}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        style={image.position ? { objectPosition: image.position } : undefined}
      />
      <span className={styles.zoom} aria-hidden="true">
        <ZoomIn size={16} />
      </span>
    </button>
  );
}

export function SpacesGallery() {
  const enhanced = useEnhanced();
  const [activeBranch, setActiveBranch] = useState<Branch>("Mehdipatnam");
  const [lightbox, setLightbox] = useState<{ branch: Branch; index: number } | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Partial<Record<Branch, HTMLButtonElement | null>>>({});

  const openLightbox = useCallback(
    (branch: Branch) => (index: number, el: HTMLElement) => {
      trigger.current = el;
      setLightbox({ branch, index });
    },
    [],
  );

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    trigger.current?.focus();
  }, []);

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, branch: Branch) => {
    const i = BRANCHES.indexOf(branch);
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (i + 1) % BRANCHES.length;
    else if (event.key === "ArrowLeft") next = (i - 1 + BRANCHES.length) % BRANCHES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = BRANCHES.length - 1;
    if (next === null) return;
    event.preventDefault();
    const target = BRANCHES[next];
    setActiveBranch(target);
    tabRefs.current[target]?.focus();
  };

  const lightboxImages = lightbox
    ? (groups.find((g) => g.branch === lightbox.branch)?.images ?? [])
    : [];

  return (
    <section
      className={`${styles.section} ${enhanced ? styles.enhanced : ""}`}
      id="inside-neodent"
      aria-labelledby="inside-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <Reveal
            as="h2"
            variant="mask"
            stagger={90}
            id="inside-title"
            className={styles.title}
          >
            {"Spaces designed "}
            <span>around care.</span>
          </Reveal>
          <Reveal as="p" delay={120} className={styles.lede}>
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
          </Reveal>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="Clinic photographs">
          {BRANCHES.map((branch) => {
            const selected = branch === activeBranch;
            return (
              <button
                key={branch}
                ref={(el) => {
                  tabRefs.current[branch] = el;
                }}
                id={`spaces-tab-${branch}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`spaces-panel-${branch}`}
                tabIndex={selected ? 0 : -1}
                className={`${styles.tab} ${selected ? styles.tabOn : ""}`}
                onClick={() => setActiveBranch(branch)}
                onKeyDown={(event) => onTabKey(event, branch)}
              >
                {branch}
              </button>
            );
          })}
        </div>

        <div className={styles.panels}>
          {groups.map(({ branch, images }) => (
            <Panel
              key={branch}
              branch={branch}
              images={images}
              active={branch === activeBranch}
              enhanced={enhanced}
              onOpen={openLightbox(branch)}
            />
          ))}
        </div>
      </div>

      <GalleryLightbox
        items={lightboxImages}
        index={lightbox ? lightbox.index : null}
        onIndexChange={(next) =>
          setLightbox((prev) => (prev ? { ...prev, index: next } : prev))
        }
        onClose={closeLightbox}
      />
    </section>
  );
}
