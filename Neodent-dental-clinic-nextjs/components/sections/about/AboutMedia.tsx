"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import { useCookieConsent } from "@/components/consent/CookieConsentContext";
import { useReveal } from "./useReveal";
import shared from "./shared.module.css";
import styles from "./AboutMedia.module.css";

/* ------------------------------------------------------------------
   About -- "A voice for better dental care."

   Pattern: Expertise (patterned dark ground, ivory cards, detail panel)
   with the PatientStories film framing. One large featured film on the
   right; every film is a small ivory card on the left, the selected one
   shown in white. Playback is unchanged from the previous page: a
   YouTube thumbnail facade, then (once embedded media is allowed) the
   youtube-nocookie iframe. Nothing loads from YouTube until the visitor
   asks to play.
   ------------------------------------------------------------------ */

type MediaItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  ariaLabel: string;
};

/* Source of truth: the 10 YouTube videos supplied for this migration.
   IDs are extracted verbatim from the mapped URLs -- do not substitute. */
const mediaArchive: MediaItem[] = [
  {
    id: "wyoOo4rcJyw",
    category: "Dental Education",
    title: "Common problems in teeth and their treatment.",
    description:
      "Dr. Mohd. Siraj Ur Rahman discusses common dental problems and the treatment options available for them, on Doctor Aap Ka.",
    ariaLabel:
      "Dr. Mohd. Siraj Ur Rahman discusses common problems in teeth and their treatment, on Doctor Aap Ka",
  },
  {
    id: "1mvFEQVS6Ng",
    category: "Dental Education",
    title: "Natural remedies for teeth problems.",
    description:
      "Dr. Mohd. Siraj Ur Rahman talks through natural remedies sometimes used for teeth problems, on Doctor Aap Ka.",
    ariaLabel:
      "Dr. Mohd. Siraj Ur Rahman on natural remedies for teeth problems, Doctor Aap Ka",
  },
  {
    id: "fyOPiUwqlKg",
    category: "Media / Dental Care",
    title: "Doctor se Mulaqat with Dr. Mohd. Siraj Ur Rahman.",
    description:
      "A televised conversation with Dr. Mohd. Siraj Ur Rahman, MDS in Prosthodontics, on the programme Doctor se Mulaqat.",
    ariaLabel:
      "Doctor se Mulaqat — a televised conversation with Dr. Mohd. Siraj Ur Rahman, MDS Prosthodontics",
  },
  {
    id: "c0bN_Vp2saE",
    category: "Media / Dental Care",
    title: "Dr. Mohd. Siraj Ur Rahman on ETV.",
    description:
      "Dr. Mohd. Siraj Ur Rahman featured on an ETV health programme.",
    ariaLabel: "Dr. Mohd. Siraj Ur Rahman featured on ETV",
  },
  {
    id: "-FHNS50wXUY",
    category: "Media / Dental Care",
    title: "Aap Ki Sehat — Dr. Mohd. Siraj Ur Rahman.",
    description:
      "Dr. Mohd. Siraj Ur Rahman appears on the televised health programme Aap Ki Sehat.",
    ariaLabel:
      "Dr. Mohd. Siraj Ur Rahman on the television programme Aap Ki Sehat",
  },
  {
    id: "DxihwtF4SMw",
    category: "Media / Dental Care",
    title: "Dr. Mohd. Siraj Ur Rahman, Dentist.",
    description:
      "A short televised feature introducing Dr. Mohd. Siraj Ur Rahman's work as a dentist.",
    ariaLabel:
      "A televised feature introducing Dr. Mohd. Siraj Ur Rahman, dentist",
  },
  {
    id: "T46vwgiUvm4",
    category: "Dental Education",
    title:
      "Early childhood dental caries: prevalence, risk factors and prevention.",
    description:
      "Dr. Mohd. Siraj Ur Rahman discusses early childhood dental caries — how common it is, its risk factors, and prevention.",
    ariaLabel:
      "Dr. Mohd. Siraj Ur Rahman discusses early childhood dental caries: prevalence, risk factors and prevention",
  },
  {
    id: "yF-UJruuj6k",
    category: "Oral Health Awareness",
    title: "Diabetes and dental health.",
    description:
      "Dr. Mohd. Siraj Ur Rahman discusses the connection between diabetes and dental health.",
    ariaLabel:
      "Dr. Mohd. Siraj Ur Rahman discusses diabetes and dental health",
  },
  {
    id: "u5DaLNpIHzE",
    category: "Oral Health Awareness",
    title: "Oral cancer — an awareness lecture.",
    description:
      "A lecture by Dr. Mohd. Siraj Ur Rahman on oral cancer awareness.",
    ariaLabel:
      "Dr. Mohd. Siraj Ur Rahman's lecture on oral cancer awareness",
  },
  {
    id: "PjNTMD_ZGy4",
    category: "Media / Dental Care",
    title: "Dr. Mohd. Siraj Ur Rahman.",
    description: "A televised feature on Dr. Mohd. Siraj Ur Rahman.",
    ariaLabel: "A televised feature on Dr. Mohd. Siraj Ur Rahman",
  },
];

/* The featured film. Re-mounted per film (keyed by id in the parent) so a
   new selection always starts from its thumbnail again. */
function FeaturedFilm({ item }: { item: MediaItem }) {
  // requestedPlay: the visitor pressed the thumbnail at least once. The
  // iframe only renders once that AND consent for embedded media exist;
  // otherwise a small inline consent gate takes the facade's place.
  const [requestedPlay, setRequestedPlay] = useState(false);
  const { consent, allowMedia, openPreferences } = useCookieConsent();
  const thumbnail = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;
  const mediaAllowed = consent?.media === true;

  return (
    <>
      <div className={styles.media}>
        {requestedPlay && mediaAllowed ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube-nocookie.com/embed/${item.id}?rel=0`}
            title={item.ariaLabel}
            loading="lazy"
            allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : requestedPlay ? (
          <div
            className={styles.gate}
            role="group"
            aria-label="Allow embedded YouTube content"
          >
            <p className={styles.gateText}>
              This video is hosted by YouTube. Allow embedded media to play it.
            </p>
            <div className={styles.gateActions}>
              <button
                type="button"
                className={styles.gateAllow}
                onClick={allowMedia}
                data-testid={`button-allow-media-${item.id}`}
              >
                Allow &amp; play
              </button>
              <button
                type="button"
                className={styles.gateManage}
                onClick={openPreferences}
                data-testid={`button-manage-media-${item.id}`}
              >
                Manage preferences
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={styles.facade}
            onClick={() => setRequestedPlay(true)}
            aria-label={`Play: ${item.ariaLabel}`}
          >
            <Image
              className={styles.poster}
              src={thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 460px, (min-width: 768px) 70vw, calc(100vw - 64px)"
              unoptimized
            />
            <span className={styles.play} aria-hidden="true">
              <Play size={18} />
            </span>
          </button>
        )}
      </div>
      <p className={styles.panelLabel}>{item.category}</p>
      <h3 className={styles.panelTitle}>{item.title}</h3>
      <p className={styles.panelText}>{item.description}</p>
    </>
  );
}

export function AboutMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = mediaArchive[activeIndex];

  const select = (index: number) => {
    setActiveIndex(index);
    // When the film panel is stacked above the cards (below 1024px),
    // bring it into view so the choice is visibly acted on.
    if (window.innerWidth < 1024) {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      panelRef.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`${shared.section} ${styles.media_section}`}
      id="media"
      aria-labelledby="media-title"
    >
      <span className={styles.seam} aria-hidden="true" />

      <div className={shared.container}>
        <div className={styles.shell}>
          <div className={styles.copy} data-reveal>
            <h2 id="media-title" className={styles.title}>
              A voice for <span>better dental care.</span>
            </h2>
            <p className={styles.lede}>
              Dr. Mohd. Siraj Ur Rahman&apos;s work has not stayed confined to
              the treatment room. Over the years, he has taken part in{" "}
              <EditorialHighlight tone="secondary" onDark>
                dental education talks, television discussions and public
                awareness efforts
              </EditorialHighlight>{" "}
              aimed at helping ordinary patients understand their own oral
              health — from childhood dental care to the wider links between
              the mouth and general wellbeing.
            </p>
            <p className={styles.lede}>
              These appearances sit alongside, rather than apart from,
              Neodent&apos;s clinical work: the same{" "}
              <EditorialHighlight tone="secondary" onDark>
                patient-focused approach
              </EditorialHighlight>{" "}
              that shapes a consultation in Mehdipatnam or Nampally also shapes
              how Dr. Mohd. Siraj Ur Rahman talks about dental care in public
              — in{" "}
              <EditorialHighlight tone="quiet" onDark>
                plain, practical terms
              </EditorialHighlight>
              , rather than technical language.
            </p>
          </div>

          <div className={styles.cards} data-reveal>
            <h3 className={styles.cardsTitle}>
              A public conversation about dental care.
            </h3>
            <ul className={styles.cardGrid}>
              {mediaArchive.map((item, index) => {
                const selected = index === activeIndex;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`${styles.card} ${selected ? styles.cardActive : ""}`}
                      onClick={() => select(index)}
                      aria-pressed={selected}
                      aria-label={`${item.title} ${item.category}`}
                    >
                      <span className={styles.cardTitle}>{item.title}</span>
                      <span className={styles.cardBottom}>
                        <span className={styles.cardIntent}>
                          {item.category}
                        </span>
                        <ArrowRight
                          className={styles.cardArrow}
                          size={16}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            ref={panelRef}
            className={styles.panel}
            aria-live="polite"
            data-reveal
          >
            <FeaturedFilm key={active.id} item={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
