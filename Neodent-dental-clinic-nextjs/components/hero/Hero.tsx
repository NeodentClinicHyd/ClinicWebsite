"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";
import {
  HERO_AUTOPLAY_MS,
  type HeroRecordItem,
  googleRating,
  heroBranches,
  heroRecordItems,
  heroSlideMeta,
  phone,
  recognitionImage,
  telPhone,
  whatsappConsultLink,
} from "@/lib/site-data";

const inertAttr = (isInert: boolean) =>
  (isInert ? { inert: true } : {}) as Record<string, boolean>;

/* Slide 03's evidence is split at the data level rather than by index
   inside the markup, so removing a plate from heroRecordItems is a
   one-line data change that cannot leave a dangling grid cell behind. */
const heroRecordPrimary = heroRecordItems[0];
const heroRecordSecondary = heroRecordItems.slice(1);

function RecordPlate({ item }: { item: HeroRecordItem }) {
  return (
    <figure className={`hero-record-item hero-record-item-${item.variant}`}>
      <div className="hero-record-stack">
        <div className="hero-record-plate">
          <Image
            className="hero-record-photo"
            src={item.src}
            alt={item.alt}
            fill
            sizes={item.sizes}
          />
        </div>
      </div>
      {/* Non-breaking space before each separator keeps the "·" bound to
          the preceding word, so a wrapped line never opens with a stray
          dot. */}
      <figcaption className="hero-record-source">
        {item.source.join("\u00A0· ")}
      </figcaption>
    </figure>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % heroSlideMeta.length);
    }, HERO_AUTOPLAY_MS);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setActive(index);
    startTimer();
  };
  const goRelative = (delta: number) => {
    goTo((active + delta + heroSlideMeta.length) % heroSlideMeta.length);
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-slides">
        {/* Slide 01 — Dr. Siraj, the founder identity */}
        <article
          className={`hero-slide hero-slide-founder ${active === 0 ? "hero-slide-active" : ""}`}
          aria-hidden={active !== 0}
          {...inertAttr(active !== 0)}
        >
          <div className="hero-founder">
            <div className="hero-founder-bg" aria-hidden="true">
              <span className="hero-founder-gridlines" />
            </div>
            <span className="hero-founder-vertical-label" aria-hidden="true">
              Mehdipatnam &nbsp;·&nbsp; Nampally &nbsp;·&nbsp; Hyderabad
            </span>
            <div className="container hero-founder-inner">
              <div className="hero-founder-copy">
                <div className="hero-eyebrow">NeoDent Dental Hospitals</div>
                <p className="hero-founder-tagline">
                  Changing smiles since 3 decades.
                </p>
                <h1 id="hero-title" className="hero-title hero-founder-title">
                  Three decades{" "}
                  <span className="serif">of changing smiles.</span>
                </h1>
                <div className="hero-founder-identity">
                  <p className="hero-credentials">Dr. Mohd. Siraj Ur Rahman</p>
                  <p className="hero-founder-expertise">
                    Dental Surgeon · Prosthodontist · Implantologist
                  </p>
                </div>
                <div className="hero-rating" data-testid="text-hero-rating">
                  <span className="hero-rating-stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={13}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                  </span>
                  <span className="hero-rating-score">
                    {googleRating.score}
                  </span>
                  <span className="hero-rating-divider" aria-hidden="true">
                    ·
                  </span>
                  <span>{googleRating.count} Google reviews</span>
                </div>
                <div
                  className="hero-founder-locations"
                  aria-label="Two NeoDent locations in Hyderabad"
                >
                  <MapPin size={13} aria-hidden="true" />
                  <span>2 Hyderabad locations</span>
                  <span aria-hidden="true">·</span>
                  <span>Mehdipatnam</span>
                  <span aria-hidden="true">·</span>
                  <span>Nampally</span>
                </div>
                <div className="hero-actions">
                  <AppButton href={telPhone} variant="primary">
                    Call for Consultation <ArrowRight size={15} />
                  </AppButton>
                  <AppButton href={whatsappConsultLink} variant="ghost">
                    WhatsApp the Clinic <MessageCircle size={14} />
                  </AppButton>
                </div>
              </div>
              <div className="hero-founder-visual">
                <span className="hero-founder-frame" aria-hidden="true" />
                <span className="hero-founder-frame-tick hero-founder-frame-tick-a" aria-hidden="true" />
                <span className="hero-founder-frame-tick hero-founder-frame-tick-b" aria-hidden="true" />
                <span className="hero-founder-mark" aria-hidden="true">
                  30<span>+</span>
                </span>
                <span className="hero-founder-mark-caption" aria-hidden="true">
                  Years of changing smiles
                </span>
                <span className="hero-founder-groundline" aria-hidden="true" />
                <span className="hero-founder-portrait-glow" aria-hidden="true" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="hero-founder-portrait"
                  src={recognitionImage}
                  alt="Dr. Mohd. Siraj Ur Rahman, BDS, FCIP, MDS, Director of NeoDent Dental Hospitals, Hyderabad"
                  loading="eager"
                />
                <div className="hero-founder-visual-location" aria-label="NeoDent Hyderabad locations">
                  <span>2 Hyderabad locations</span>
                  <strong>Mehdipatnam <i aria-hidden="true">·</i> Nampally</strong>
                </div>
                <div className="hero-founder-visual-contact">
                  <span className="hero-founder-contact-label">
                    Call today for a consultation
                  </span>
                  <a
                    className="hero-founder-phone"
                    href={telPhone}
                    data-testid="link-hero-phone"
                  >
                    <Phone size={16} aria-hidden="true" />
                    {phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Slide 02 — Where NeoDent is: the two Hyderabad locations.
            An editorial "location atlas": one copy column, then two
            staggered photographic plates whose scale, plate shape and
            frame offsets are mirrored rather than repeated, so the
            branches read as two destinations inside one brand instead
            of two equal cards. */}
        <article
          className={`hero-slide hero-slide-place ${active === 1 ? "hero-slide-active" : ""}`}
          aria-hidden={active !== 1}
          {...inertAttr(active !== 1)}
          aria-labelledby="hero-place-title"
        >
          <div className="hero-place">
            <div className="hero-place-bg" aria-hidden="true">
              <span className="hero-place-gridlines" />
            </div>
            <span className="hero-place-vertical-label" aria-hidden="true">
              Hyderabad &nbsp;·&nbsp; Telangana
            </span>
            <div className="container hero-place-inner">
              <div className="hero-place-copy">
                <div className="hero-eyebrow">NeoDent Dental Hospitals</div>
                <h2 id="hero-place-title" className="hero-title hero-place-title">
                  <span>Where</span>
                  <span>NeoDent</span>
                  <span className="serif">is.</span>
                </h2>
                <p className="hero-place-tagline">
                  <span>Two Hyderabad locations.</span>
                  <span>One standard of care.</span>
                </p>
                {/* Wayfinding legend. Decorative: the same two branches are
                    announced properly by each figure's caption below, so this
                    index is hidden from assistive tech to avoid duplication. */}
                <ul className="hero-place-legend" aria-hidden="true">
                  {heroBranches.map((branch) => (
                    <li key={branch.index}>
                      <span>{branch.index}</span>
                      {branch.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hero-place-atlas">
                {heroBranches.map((branch) => (
                  <figure
                    key={branch.index}
                    className={`hero-place-branch hero-place-branch-${branch.variant}`}
                  >
                    <span className="hero-place-ghost" aria-hidden="true">
                      {branch.index}
                    </span>
                    <div className="hero-place-stack">
                      <div className="hero-place-plate">
                        <Image
                          className="hero-place-photo"
                          src={branch.plate.src}
                          alt={branch.plate.alt}
                          fill
                          sizes="(max-width: 767px) 60vw, (max-width: 1023px) 46vw, 34vw"
                        />
                        <div className="hero-place-inset">
                          <Image
                            className="hero-place-photo hero-place-photo-inset"
                            src={branch.inset.src}
                            alt={branch.inset.alt}
                            fill
                            sizes="(max-width: 767px) 26vw, 15vw"
                          />
                        </div>
                      </div>
                    </div>
                    <figcaption className="hero-place-caption">
                      <span className="hero-place-caption-index" aria-hidden="true">
                        {branch.index}
                      </span>
                      <div className="hero-place-caption-text">
                        <h3 className="hero-place-name">{branch.name}</h3>
                        {/* Non-breaking space before each separator keeps
                            the "·" bound to the preceding word, so a
                            wrapped line never opens with a stray dot. */}
                        <small className="hero-place-meta">
                          {branch.meta.join("\u00A0· ")}
                        </small>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Slide 03 — Why you can trust us: the work, on the public
            record. An editorial "dossier": one copy column, then a
            dominant press artifact with two stepped secondary planes
            (broadcast, then institutional recognition), so the three
            channels read as accumulated credibility rather than as a
            news feed.

            The subject is NEODENT DENTAL HOSPITALS, not a doctor. That
            is enforced by the copy: no doctor's name appears in any
            visible string on this slide, and every caption names the
            OUTLET only. Doctors visible inside the genuine artifacts
            are evidence of the institution's public record. */}
        <article
          className={`hero-slide hero-slide-record ${active === 2 ? "hero-slide-active" : ""}`}
          aria-hidden={active !== 2}
          {...inertAttr(active !== 2)}
          aria-labelledby="hero-record-title"
        >
          <div className="hero-record">
            <div className="hero-record-bg" aria-hidden="true">
              <span className="hero-record-gridlines" />
            </div>
            <span className="hero-record-vertical-label" aria-hidden="true">
              In print &nbsp;·&nbsp; On air &nbsp;·&nbsp; Hyderabad
            </span>
            {/* The oversized numeral, same language as Slide 01's 30+ and
                Slide 02's 01/02. Sits behind the plates and is partly
                cropped by .hero's overflow. */}
            <span className="hero-record-ghost" aria-hidden="true">
              03
            </span>
            <div className="container hero-record-inner">
              <div className="hero-record-copy">
                <div className="hero-eyebrow">NeoDent Dental Hospitals</div>
                <h2 id="hero-record-title" className="hero-title hero-record-title">
                  <span>Recognised</span>
                  <span>beyond the</span>
                  <span className="serif">clinic.</span>
                </h2>
                <p className="hero-record-tagline">
                  <span>Documented in print and on air.</span>
                  <span>Practised the same way, every day.</span>
                </p>
                {/* Channel index. Decorative: each figure's caption below
                    names its own outlet to assistive tech, so this index
                    is hidden to avoid announcing the same evidence twice
                    (same rationale as Slide 02's wayfinding legend). */}
                <ul className="hero-record-index" aria-hidden="true">
                  {heroRecordItems.map((item) => (
                    <li key={item.index}>
                      <span>{item.index}</span>
                      {item.channel}
                    </li>
                  ))}
                </ul>
              </div>

              {/* The dossier: the dominant press plate in column one, and
                  the remaining planes gathered into their own stack in
                  column two. The stack is a real element rather than two
                  grid-placed figures because the dominant plate is taller
                  than the two secondaries combined — spanning it across
                  two grid rows would stretch those rows apart and break
                  the stepped composition. */}
              <div className="hero-record-dossier">
                {heroRecordPrimary ? (
                  <RecordPlate item={heroRecordPrimary} />
                ) : null}
                <div className="hero-record-stack-group">
                  {heroRecordSecondary.map((item) => (
                    <RecordPlate key={item.index} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="hero-nav" aria-label="Hero slide navigation">
        <button
          type="button"
          className="hero-nav-arrow"
          onClick={() => goRelative(-1)}
          aria-label="Previous slide"
          data-testid="button-hero-prev"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="hero-nav-dots">
          {heroSlideMeta.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-nav-dot ${active === index ? "hero-nav-dot-active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Show ${slide.label} slide`}
              aria-current={active === index}
              data-testid={`button-hero-dot-${slide.id}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="hero-nav-arrow"
          onClick={() => goRelative(1)}
          aria-label="Next slide"
          data-testid="button-hero-next"
        >
          <ChevronRight size={16} />
        </button>
        <span className="hero-nav-index" aria-hidden="true">
          {String(active + 1).padStart(2, "0")} / 0{heroSlideMeta.length}
        </span>
      </div>
    </section>
  );
}
