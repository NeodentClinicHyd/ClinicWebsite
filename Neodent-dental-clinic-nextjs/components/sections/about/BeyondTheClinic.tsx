"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import {
  mehdipatnamInteriorImage,
  nampallyInteriorImage,
} from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./BeyondTheClinic.module.css";

/* ------------------------------------------------------------------
   About page — Section 02 — "Beyond The Clinic".

   Deep NeoDent charcoal surface, mirroring the dark-surface pattern
   already established by ClinicalLeadership / SpacesDesignedAroundCare
   / ContactNextStep: local --charcoal/--ivory/--muted/--red tokens
   layered over the same global type system (DM Serif Display + red
   italic emphasis, 10px/.2em eyebrow, mono metadata). Nothing here
   edits globals.css or any locked homepage section.

   Six editorial acts: a horizontal media archive of Dr. Siraj's public
   television/education appearances (10 YouTube videos, thumbnail
   facade -> inline iframe on click, no local MP4s), the Republic Day
   community address with a supporting interview plate, a short press
   archive continuation, and a return to present-day NeoDent across
   Mehdipatnam and Nampally — closing on two editorial links (no
   appointment booking). ------------------------------------------------------------------ */

type MediaArchiveItem = {
  index: string;
  id: string;
  category: string;
  title: string;
  description: string;
  ariaLabel: string;
};

/* Source of truth: the 10 YouTube videos supplied for this migration.
   IDs are extracted verbatim from the mapped URLs — do not substitute. */
const mediaArchive: MediaArchiveItem[] = [
  {
    index: "01",
    id: "wyoOo4rcJyw",
    category: "Dental Education",
    title: "Common problems in teeth and their treatment.",
    description:
      "Dr. Siraj discusses common dental problems and the treatment options available for them, on Doctor Aap Ka.",
    ariaLabel:
      "Dr. Mohd. Siraj Ur Rahman discusses common problems in teeth and their treatment, on Doctor Aap Ka",
  },
  {
    index: "02",
    id: "1mvFEQVS6Ng",
    category: "Dental Education",
    title: "Natural remedies for teeth problems.",
    description:
      "Dr. Siraj talks through natural remedies sometimes used for teeth problems, on Doctor Aap Ka.",
    ariaLabel:
      "Dr. Mohd. Siraj Ur Rahman on natural remedies for teeth problems, Doctor Aap Ka",
  },
  {
    index: "03",
    id: "fyOPiUwqlKg",
    category: "Media / Dental Care",
    title: "Doctor se Mulaqat with Dr. Siraj Ur Rahman.",
    description:
      "A televised conversation with Dr. Siraj Ur Rahman, MDS in Prosthodontics, on the programme Doctor se Mulaqat.",
    ariaLabel:
      "Doctor se Mulaqat — a televised conversation with Dr. Siraj Ur Rahman, MDS Prosthodontics",
  },
  {
    index: "04",
    id: "c0bN_Vp2saE",
    category: "Media / Dental Care",
    title: "Dr. Siraj Ur Rahman on ETV.",
    description: "Dr. Siraj Ur Rahman featured on an ETV health programme.",
    ariaLabel: "Dr. Siraj Ur Rahman featured on ETV",
  },
  {
    index: "05",
    id: "-FHNS50wXUY",
    category: "Media / Dental Care",
    title: "Aap Ki Sehat — Dr. Siraj Ur Rahman.",
    description:
      "Dr. Siraj appears on the televised health programme Aap Ki Sehat.",
    ariaLabel: "Dr. Siraj Ur Rahman on the television programme Aap Ki Sehat",
  },
  {
    index: "06",
    id: "DxihwtF4SMw",
    category: "Media / Dental Care",
    title: "Dr. Siraj Ur Rahman, Dentist.",
    description:
      "A short televised feature introducing Dr. Siraj Ur Rahman's work as a dentist.",
    ariaLabel:
      "A televised feature introducing Dr. Siraj Ur Rahman, dentist",
  },
  {
    index: "07",
    id: "T46vwgiUvm4",
    category: "Dental Education",
    title: "Early childhood dental caries: prevalence, risk factors and prevention.",
    description:
      "Dr. Siraj discusses early childhood dental caries — how common it is, its risk factors, and prevention.",
    ariaLabel:
      "Dr. Siraj Ur Rahman discusses early childhood dental caries: prevalence, risk factors and prevention",
  },
  {
    index: "08",
    id: "yF-UJruuj6k",
    category: "Oral Health Awareness",
    title: "Diabetes and dental health.",
    description:
      "Dr. Siraj discusses the connection between diabetes and dental health.",
    ariaLabel: "Dr. Siraj Ur Rahman discusses diabetes and dental health",
  },
  {
    index: "09",
    id: "u5DaLNpIHzE",
    category: "Oral Health Awareness",
    title: "Oral cancer — an awareness lecture.",
    description: "A lecture by Dr. Siraj on oral cancer awareness.",
    ariaLabel: "Dr. Siraj Ur Rahman's lecture on oral cancer awareness",
  },
  {
    index: "10",
    id: "PjNTMD_ZGy4",
    category: "Media / Dental Care",
    title: "Dr. Md Siraj Ur Rahman.",
    description: "A televised feature on Dr. Md Siraj Ur Rahman.",
    ariaLabel: "A televised feature on Dr. Md Siraj Ur Rahman",
  },
];

function MediaArchiveCard({ item }: { item: MediaArchiveItem }) {
  const [activated, setActivated] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;

  return (
    <article className={styles.videoCard} role="listitem">
      <div className={styles.videoCopy}>
        <p className={styles.actEyebrow}>
          {item.index} / {item.category}
        </p>
        <h3 className={styles.videoTitle}>{item.title}</h3>
        <p className={styles.videoText}>{item.description}</p>
      </div>
      <figure className={styles.videoFrame}>
        <span className={styles.videoRegistration} aria-hidden="true" />
        {activated ? (
          <iframe
            className={styles.mediaIframe}
            src={`https://www.youtube-nocookie.com/embed/${item.id}?rel=0`}
            title={item.ariaLabel}
            loading="lazy"
            allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            <button
              type="button"
              className={styles.mediaFacade}
              onClick={() => setActivated(true)}
              aria-label={`Play: ${item.ariaLabel}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnail} alt="" loading="lazy" />
              <span className={styles.mediaPlayButton} aria-hidden="true">
                <Play size={16} />
              </span>
            </button>
            <div className={styles.videoTop}>
              <span>
                {item.index} / {item.category}
              </span>
            </div>
          </>
        )}
      </figure>
    </article>
  );
}

function MediaArchiveCarousel({
  containerRef,
  visible,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  visible: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft >= max - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.86, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.archiveBlock} ${visible ? styles.blockVisible : ""}`}
    >
      <div className={styles.archiveHead}>
        <div>
          <p className={styles.actEyebrow}>Media Archive</p>
          <h2 className={styles.actTitle}>
            A public conversation about dental care.
          </h2>
        </div>
        <div className={styles.archiveNav}>
          <button
            type="button"
            className={styles.archiveNavBtn}
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Scroll to previous videos"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className={styles.archiveNavBtn}
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Scroll to next videos"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div ref={trackRef} className={styles.videoGrid} role="list">
        {mediaArchive.map((item) => (
          <MediaArchiveCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
}

export function BeyondTheClinic() {
  const [sectionRef, sectionVisible] = useReveal<HTMLElement>(0.05);
  const [introRef, introVisible] = useReveal<HTMLDivElement>();
  const [videosRef, videosVisible] = useReveal<HTMLDivElement>(0.06);
  const [communityRef, communityVisible] = useReveal<HTMLDivElement>();
  const [archiveRef, archiveVisible] = useReveal<HTMLDivElement>();
  const [todayRef, todayVisible] = useReveal<HTMLDivElement>();
  const [ctaRef, ctaVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${sectionVisible ? styles.visible : ""}`}
      id="beyond-the-clinic"
      aria-labelledby="beyond-title"
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.grid} />
        <span className={styles.arc} />
        <span className={styles.registrationDot} />
        <span className={styles.registrationDotSmall} />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.numeral} aria-hidden="true">
            02
          </span>
          <div className={styles.eyebrow}>02 / Beyond the clinic</div>
          <h2 id="beyond-title" className={styles.title}>
            A voice for <span>better dental care.</span>
          </h2>
        </header>

        <div
          ref={introRef}
          className={`${styles.intro} ${introVisible ? styles.blockVisible : ""}`}
        >
          <p>
            Dr. Siraj&apos;s work has not stayed confined to the treatment room.
            Over the years, he has taken part in{" "}
            <EditorialHighlight tone="primary" onDark>
              dental education talks, television discussions and public
              awareness efforts
            </EditorialHighlight>{" "}
            aimed at helping ordinary patients understand their own oral
            health — from childhood dental care to the wider links between
            the mouth and general wellbeing.
          </p>
          <p>
            These appearances sit alongside, rather than apart from,
            NeoDent&apos;s clinical work: the same{" "}
            <EditorialHighlight tone="secondary" onDark>
              patient-focused approach
            </EditorialHighlight>{" "}
            that shapes a consultation in Mehdipatnam or Nampally also
            shapes how Dr. Siraj talks about dental care in public — in{" "}
            <EditorialHighlight tone="quiet" onDark>
              plain, practical terms
            </EditorialHighlight>
            , rather than technical language.
          </p>
        </div>

        {/* ---- Act 01 — YouTube media archive -------------------------- */}
        <MediaArchiveCarousel containerRef={videosRef} visible={videosVisible} />

        {/* ---- Act 04 — Community presence + TV interview ------------ */}
        <div
          ref={communityRef}
          className={`${styles.community} ${communityVisible ? styles.blockVisible : ""}`}
        >
          <figure className={styles.communityImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/Dr Md Siraj addressing the gathering at govt dental collage and hospital hyderabd.jpg"
              alt="Dr. Mohd. Siraj Ur Rahman addressing the gathering at Government Dental College and Hospital, Hyderabad, on the occasion of the 73rd Republic Day"
              loading="lazy"
            />
            <figcaption>
              Republic Day address / Govt. Dental College &amp; Hospital,
              Hyderabad
            </figcaption>
          </figure>
          <div className={styles.communityCopy}>
            <p className={styles.actEyebrow}>Beyond the Dental Chair</p>
            <h2 className={styles.actTitle}>
              A presence in the wider community.
            </h2>
            <p className={styles.actText}>
              On the occasion of the{" "}
              <EditorialHighlight tone="secondary" onDark>
                73rd Republic Day
              </EditorialHighlight>
              , Dr. Siraj addressed a gathering at{" "}
              <EditorialHighlight tone="quiet" onDark>
                Government Dental College and Hospital, Hyderabad
              </EditorialHighlight>{" "}
              — a public appearance connected to the same institution where
              he has also held an academic teaching role.
            </p>
            <p className={styles.actText}>
              Dr. Siraj has also appeared in{" "}
              <EditorialHighlight tone="primary" onDark>
                televised interviews
              </EditorialHighlight>{" "}
              discussing dental health with the public, extending his
              clinical voice beyond NeoDent&apos;s own patients.
            </p>
            <figure className={styles.interviewPlate}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/dr-siraj-tv-interview.jpg"
                alt="Dr. Mohd. Siraj Ur Rahman during a News18 Urdu television interview"
                loading="lazy"
              />
              <figcaption>Television / News18 Urdu</figcaption>
            </figure>
          </div>
        </div>

        {/* ---- Act 05 — Archive continuation -------------------------- */}
        <div
          ref={archiveRef}
          className={`${styles.archiveContinuation} ${archiveVisible ? styles.blockVisible : ""}`}
        >
          <div className={styles.archiveCopy}>
            <p className={styles.actEyebrow}>Media Continuation</p>
            <p className={styles.actText}>
              The same press coverage that documents NeoDent&apos;s clinical
              history also records this public dimension of its work —
              lectures, health camps and media appearances that carried
              NeoDent&apos;s name from the clinic into the wider community.
            </p>
          </div>
          <div className={styles.archiveContinuationPlates}>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/news-articles/Dr siraj neodent dental clinic Nampally news article.jpg"
                alt="The Siasat Daily — feature on dental awareness delivered by Dr. Siraj"
                loading="lazy"
              />
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/news-articles/Dr siraj and Dr Miftah neodent dental clinic Nampally news.jpg"
                alt="The Siasat Daily — coverage of NeoDent's clinical team at Nampally"
                loading="lazy"
              />
            </figure>
          </div>
        </div>

        {/* ---- Act 06 — The practice today ------------------------------ */}
        <div
          ref={todayRef}
          className={`${styles.today} ${todayVisible ? styles.blockVisible : ""}`}
        >
          <div className={styles.todayImages}>
            <figure className={styles.todayPrimary}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mehdipatnamInteriorImage}
                alt="NeoDent Dental Hospital, Mehdipatnam — the patient waiting lounge"
                loading="lazy"
              />
              <figcaption>Mehdipatnam</figcaption>
            </figure>
            <figure className={styles.todaySecondary}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={nampallyInteriorImage}
                alt="NeoDent Dental Hospital, Nampally — the reception and consultation wing"
                loading="lazy"
              />
              <figcaption>Nampally</figcaption>
            </figure>
          </div>
          <div className={styles.todayCopy}>
            <p className={styles.actEyebrow}>06 / The Practice Today</p>
            <h2 className={styles.actTitle}>NeoDent today.</h2>
            <p className={styles.actText}>
              More than three decades after its founding, NeoDent Dental
              Hospital continues to practise across{" "}
              <EditorialHighlight tone="primary" onDark>
                two Hyderabad locations
              </EditorialHighlight>{" "}
              — Mehdipatnam, where the practice began, and Nampally. Both
              locations are led by the same clinical philosophy Dr. Siraj
              established in 1994.
            </p>
            <p className={styles.actText}>
              Day-to-day care is carried by{" "}
              <EditorialHighlight tone="secondary" onDark>
                the wider NeoDent clinical team
              </EditorialHighlight>
              , working alongside Dr. Siraj and Dr. Miftah, with{" "}
              <EditorialHighlight tone="quiet" onDark>
                specialist-led, patient-focused care
              </EditorialHighlight>{" "}
              carried into every consultation.
            </p>
            <p className={styles.actText}>
              To learn more about what NeoDent treats, visit{" "}
              <a className={styles.inlineLink} href="/expertise">
                our clinical expertise
              </a>
              , or see both locations in detail on{" "}
              <a className={styles.inlineLink} href="/clinic">
                our clinics page
              </a>
              .
            </p>
          </div>
        </div>

        {/* ---- Final CTA -------------------------------------------------- */}
        <div
          ref={ctaRef}
          className={`${styles.ctaRow} ${ctaVisible ? styles.blockVisible : ""}`}
        >
          <a className={styles.cta} href="/expertise">
            Explore our expertise <ArrowRight size={14} aria-hidden="true" />
          </a>
          <a className={styles.cta} href="/clinic">
            Visit our clinics <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
