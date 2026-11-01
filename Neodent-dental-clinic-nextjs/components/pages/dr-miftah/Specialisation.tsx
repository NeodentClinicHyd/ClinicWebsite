"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TreatmentEvidenceViewer } from "./TreatmentEvidenceViewer";
import type { EvidenceItem } from "./TreatmentEvidenceViewer";
import { SmileDesignStory } from "./SmileDesignStory";
import { TreatmentDossier } from "./TreatmentDossier";
import { TreatmentDetailDialog } from "./TreatmentDetailDialog";
import { DrMiftahBackdrop } from "./DrMiftahBackdrop";
import { SectionHead } from "./SectionHead";
import { SwipeDots } from "./SwipeDots";
import { SPEC_FIGURES } from "./SpecFigures";
import type { SpecFigureKey } from "./SpecFigures";
import treatmentMedia from "@/lib/miftah-treatment-media.json";
import { RCT_FILMS, RCT_STAGES, RCT_XRAY_ITEMS, pairItems } from "@/lib/miftah-treatment-evidence";
import { TREATMENT_DOSSIERS, dossierForCard } from "@/lib/miftah-treatment-dossiers";
import type { TreatmentDossier as Dossier } from "@/lib/miftah-treatment-dossiers";
import styles from "./Specialisation.module.css";

/* ------------------------------------------------------------------
   03 Specialisation (pattern P6 with P11 thumbnails) and, in the same
   dark band, the smile design case story.

   Four dark glass cards: one row from 1280 px, 2 x 2 from 768 px, a
   swipe row with progress dots below. Every thumbnail, label, link and
   description of the old cards is kept. "Explore treatment" opens the
   treatment dossier dialog (the dossiers are also in the server HTML in
   a hidden block). Thumbnails open the evidence viewer.
   ------------------------------------------------------------------ */

type MediaKey = keyof typeof treatmentMedia;

type SpecEvidence =
  | { kind: "rct" }
  | { kind: "pair"; before: MediaKey; after: MediaKey };

const SPECIALISATION_CARDS: {
  number: string;
  figure: SpecFigureKey;
  title: string;
  titleSuffix?: string;
  name: string;
  copy: string;
  evidence: SpecEvidence;
}[] = [
  {
    number: "01",
    figure: "rootCanal",
    title: "SAVING NATURAL TEETH",
    titleSuffix: "Root canal treatment",
    name: "Root canal treatment",
    copy: "Treatment within the tooth, aimed at keeping the natural tooth where appropriate rather than removing it.",
    evidence: { kind: "rct" },
  },
  {
    number: "02",
    figure: "smile",
    title: "SMILE DESIGNING",
    name: "Smile designing",
    copy: "Restorative work where appearance matters as much as function: shape, shade and proportion planned around the patient's own face.",
    evidence: { kind: "pair", before: "smileBefore", after: "smileAfter" },
  },
  {
    number: "03",
    figure: "implants",
    title: "DENTAL IMPLANTS",
    name: "Dental implants",
    copy: "Replacing a missing tooth at the root, so the replacement functions and is maintained like a natural tooth rather than resting on the teeth beside it.",
    evidence: { kind: "pair", before: "implantsBefore", after: "implantsAfter" },
  },
  {
    number: "04",
    figure: "rehabilitation",
    title: "FULL MOUTH REHABILITATION",
    name: "Full mouth rehabilitation",
    copy: "Rebuilding an entire bite \u2014 function, alignment and appearance together \u2014 planned as one treatment rather than a series of separate repairs.",
    evidence: { kind: "pair", before: "rehabBefore", after: "rehabAfter" },
  },
];

type OpenViewer = (title: string, items: EvidenceItem[], index: number) => void;

function EvidenceCell({
  mediaKey,
  alt,
  label,
  sizes,
  onOpen,
}: {
  mediaKey: MediaKey;
  alt: string;
  label: string;
  sizes: string;
  onOpen: () => void;
}) {
  const image = treatmentMedia[mediaKey];
  return (
    <button
      type="button"
      className={styles.cell}
      onClick={onOpen}
      aria-label={label}
      data-evidence-open
    >
      <Image
        src={image.src}
        alt={alt}
        fill
        sizes={sizes}
        className={styles.cellImage}
        style={{ objectPosition: image.objectPosition }}
      />
    </button>
  );
}

function BeforeAfterPair({
  name,
  before,
  after,
  onOpen,
}: {
  name: string;
  before: MediaKey;
  after: MediaKey;
  onOpen: OpenViewer;
}) {
  const items = pairItems(name, before, after);
  const open = (index: number) => onOpen(name, items, index);
  const sizes = "(max-width: 767px) 44vw, (max-width: 1279px) 22vw, 130px";
  return (
    <>
      <div className={`${styles.plate} ${styles.platePair}`}>
        <EvidenceCell
          mediaKey={before}
          alt={items[0].kind === "image" ? items[0].alt : ""}
          label={`Open ${name.toLowerCase()} before-treatment image`}
          sizes={sizes}
          onOpen={() => open(0)}
        />
        <EvidenceCell
          mediaKey={after}
          alt={items[1].kind === "image" ? items[1].alt : ""}
          label={`Open ${name.toLowerCase()} after-treatment image`}
          sizes={sizes}
          onOpen={() => open(1)}
        />
      </div>
      <div className={`${styles.captions} ${styles.captionsPair}`} aria-hidden="true">
        <span>Before</span>
        <span>After</span>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.action}
          onClick={() => open(0)}
          aria-label={`View ${name.toLowerCase()} before and after images`}
          data-evidence-open
        >
          View images <ArrowRight size={13} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}

function RootCanalEvidence({ onOpen }: { onOpen: OpenViewer }) {
  const sizes = "(max-width: 767px) 30vw, (max-width: 1279px) 15vw, 90px";
  return (
    <>
      <div className={`${styles.plate} ${styles.plateTriple}`}>
        {RCT_STAGES.map(({ key, stage }, index) => (
          <EvidenceCell
            key={key}
            mediaKey={key}
            alt={`Root canal treatment radiograph \u2014 ${stage} stage`}
            label={`Open root canal X-ray ${index + 1} of 3: ${stage} stage`}
            sizes={sizes}
            onOpen={() => onOpen("Root canal treatment \u00b7 Radiographs", RCT_XRAY_ITEMS, index)}
          />
        ))}
      </div>
      <div className={`${styles.captions} ${styles.captionsTriple}`} aria-hidden="true">
        {RCT_STAGES.map(({ key, label }) => (
          <span key={key}>{label}</span>
        ))}
      </div>
      <div className={styles.actions}>
        {RCT_FILMS.map((film, index) => (
          <button
            key={film.short}
            type="button"
            className={styles.action}
            onClick={() =>
              onOpen(
                "Root canal treatment \u00b7 Films",
                RCT_FILMS.map((f) => f.item),
                index,
              )
            }
            aria-label={`Play film: ${film.item.kind === "video" ? film.item.label : film.short}`}
            data-evidence-open
            data-film
          >
            <Play size={12} aria-hidden="true" /> {film.short}
          </button>
        ))}
      </div>
    </>
  );
}

export function Specialisation() {
  const [viewer, setViewer] = useState<{
    title: string;
    items: EvidenceItem[];
    index: number;
  } | null>(null);
  const openViewer: OpenViewer = (title, items, index) => setViewer({ title, items, index });

  /* The opener is kept so focus returns to the exact card control. */
  const [dossier, setDossier] = useState<{ dossier: Dossier; opener: HTMLElement } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.section} aria-labelledby="miftah-spec-title">
      <DrMiftahBackdrop />
      <div className={styles.container}>
        <SectionHead
          tone="dark"
          eyebrow="03 / SPECIALISATION"
          id="miftah-spec-title"
          title="Where his work goes deepest."
          lede="Four areas where his specialist training is most directly applied."
        />

        <div ref={gridRef}>
        <Reveal className={styles.grid} stagger={100} data-swipe>
          {SPECIALISATION_CARDS.map((card) => (
            <article
              className={styles.card}
              key={card.number}
              aria-labelledby={`miftah-spec-card-${card.number}`}
              data-spec-card
            >
              <div className={styles.cardTop}>
                <span className={styles.number} aria-hidden="true">
                  {card.number}
                </span>
                <div className={styles.figure} aria-hidden="true">
                  {SPEC_FIGURES[card.figure]}
                </div>
              </div>
              <h3 id={`miftah-spec-card-${card.number}`} className={styles.cardTitle}>
                {card.title}
                {card.titleSuffix && <span className={styles.cardSub}>{card.titleSuffix}</span>}
              </h3>
              {card.evidence.kind === "rct" ? (
                <RootCanalEvidence onOpen={openViewer} />
              ) : (
                <BeforeAfterPair
                  name={card.name}
                  before={card.evidence.before}
                  after={card.evidence.after}
                  onOpen={openViewer}
                />
              )}
              <p className={styles.copy}>{card.copy}</p>
              <div className={styles.foot}>
                {dossierForCard(card.number) && (
                  <button
                    type="button"
                    className={styles.explore}
                    aria-haspopup="dialog"
                    aria-label={`Explore treatment \u2014 ${card.name}`}
                    onClick={(e) =>
                      setDossier({
                        dossier: dossierForCard(card.number)!,
                        opener: e.currentTarget,
                      })
                    }
                    data-explore-treatment={card.number}
                  >
                    Explore treatment <ArrowRight size={14} aria-hidden="true" />
                  </button>
                )}
              </div>
            </article>
          ))}
        </Reveal>
        </div>
        <SwipeDots listRef={gridRef} count={SPECIALISATION_CARDS.length} noun="Specialisation" tone="dark" className={styles.dots} />

        {/* The four dossiers in the server-rendered document. The same
            structured content is presented in the treatment dialog; this
            copy is hidden from view and from assistive tech. */}
        <div hidden data-dossier-source>
          {TREATMENT_DOSSIERS.map((d) => (
            <TreatmentDossier key={d.id} dossier={d} idPrefix="dossier-src-" sectionLevel={4} title />
          ))}
        </div>

        <div className={styles.story}>
          <SmileDesignStory />
        </div>
      </div>

      {viewer && (
        <TreatmentEvidenceViewer
          key={`${viewer.title}-${viewer.index}`}
          title={viewer.title}
          items={viewer.items}
          initialIndex={viewer.index}
          onClose={() => setViewer(null)}
        />
      )}
      {dossier && (
        <TreatmentDetailDialog
          key={dossier.dossier.id}
          dossier={dossier.dossier}
          opener={dossier.opener}
          onClose={() => setDossier(null)}
        />
      )}
    </section>
  );
}
