"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import {
  address,
  directions,
  googleRating,
  mehdipatnamExteriorImage,
  mehdipatnamHours,
  mehdipatnamInteriorImage,
  nampallyAddress,
  nampallyDirections,
  nampallyExteriorImage,
  nampallyHours,
  nampallyInteriorImage,
  nampallyPhone,
  nampallyTelPhone,
  phone,
  telPhone,
} from "@/lib/site-data";
import { EditorialHighlight } from "@/components/ui/EditorialHighlight";
import styles from "./SpacesDesignedAroundCare.module.css";

/* ------------------------------------------------------------------
   Homepage Section 07 — "Spaces designed around care."

   One composed location panel per branch: the selected branch's name,
   supporting copy, contact details, Google rating and directions on
   the left, its photographs on the right. Selecting a branch swaps the
   whole panel on a single active index.

   PHOTOGRAPHY: every photograph is rendered at its own aspect ratio
   (width/height attributes + `height: auto`) -- never cropped,
   stretched or object-fit'd. The primary plate's width is capped in
   CSS so its height stays laptop-friendly; the smaller entrance /
   frontage plate sits beside it (bottom-aligned), never over it.
   Pixel sizes below were measured from the files in /public/assets.

   GOOGLE RATING: the figures are values read from the supplied Google
   listing screenshots, not live data, and are kept inside each branch
   record so they cannot be swapped. Mehdipatnam reuses the existing
   `googleRating` constant (4.3 / 261, also used by the Hero). Nampally
   (4.6 / 157) comes from the client-supplied screenshot.

   DIRECTIONS LINKS: the two share.google links supplied for this
   section redirect to a generic "Neodent Dental Hospital" search with
   no address/name that distinguishes the branches, so they could not
   be matched confidently and are NOT used. Each branch keeps its
   existing, address-based Google Maps directions link.

   Dark editorial surface scoped to `.section`'s local CSS variables;
   nothing here edits globals.css or any other section.
   ------------------------------------------------------------------ */

type BranchImage = { src: string; alt: string; label: string; width: number; height: number };
type Branch = {
  name: string;
  body: ReactNode;
  address: string;
  phone: string;
  tel: string;
  hours: string;
  google: { rating: string; reviews: number; href: string };
  primary: BranchImage;
  secondary: BranchImage;
};

const branches: Branch[] = [
  {
    name: "Mehdipatnam",
    body: (
      <>
        Neodent&apos;s{" "}
        <EditorialHighlight tone="primary" onDark>
          original Hyderabad location
        </EditorialHighlight>
        , in Humayun Nagar. The practice began here in 1994 and continues to
        offer{" "}
        <EditorialHighlight tone="secondary" onDark>
          specialist-led dental care
        </EditorialHighlight>{" "}
        across restorative, prosthodontic, implant and preventive needs.
      </>
    ),
    address,
    phone,
    tel: telPhone,
    hours: `${mehdipatnamHours} · Sunday holiday`,
    google: { rating: googleRating.score, reviews: googleRating.count, href: directions },
    primary: {
      src: mehdipatnamInteriorImage,
      alt: "Neodent Dental Hospital Mehdipatnam — the patient waiting lounge",
      label: "Waiting lounge",
      width: 960,
      height: 1280,
    },
    secondary: {
      src: mehdipatnamExteriorImage,
      alt: "Neodent Dental Hospital Mehdipatnam — the carved entrance doorway",
      label: "Entrance",
      width: 382,
      height: 510,
    },
  },
  {
    name: "Nampally",
    body: (
      <>
        Set within the{" "}
        <EditorialHighlight tone="secondary" onDark>
          Medwin Hospital Complex
        </EditorialHighlight>{" "}
        in central Hyderabad, the Nampally clinic offers{" "}
        <EditorialHighlight tone="primary" onDark>
          multi-speciality dental care
        </EditorialHighlight>
        : consultation, treatment planning, treatment and follow-up, with
        attention to comfort and long-term oral health.
      </>
    ),
    address: nampallyAddress,
    phone: nampallyPhone,
    tel: nampallyTelPhone,
    hours: `${nampallyHours} · Sunday holiday`,
    google: { rating: "4.6", reviews: 157, href: nampallyDirections },
    primary: {
      src: nampallyInteriorImage,
      alt: "Neodent Dental Hospital Nampally — the reception and consultation wing",
      label: "Reception",
      width: 1280,
      height: 1707,
    },
    secondary: {
      src: nampallyExteriorImage,
      alt: "Neodent Dental Hospital Nampally — the street frontage and signage",
      label: "Street frontage",
      width: 1280,
      height: 960,
    },
  },
];

export function SpacesDesignedAroundCare() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [switching, setSwitching] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const active = branches[activeIndex];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const selectBranch = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;

    if (prefersReducedMotion) {
      setActiveIndex(nextIndex);
      return;
    }

    // Fade out, swap once hidden, fade back in.
    setSwitching(true);
    window.setTimeout(() => {
      setActiveIndex(nextIndex);
      window.setTimeout(() => setSwitching(false), 20);
    }, 220);
  };

  const switchClass = switching ? styles.switching : "";

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      id="clinics"
      aria-labelledby="clinics-title"
    >
      <span className={styles.seam} aria-hidden="true" />

      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.draftVertical} />
        <span className={styles.draftHorizontal} />
      </div>

      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="clinics-title" className={styles.title}>
            Spaces designed
            <br />
            <span>around care.</span>
          </h2>
          <p className={`${styles.lede} section-lede section-lede--on-dark`}>
            Across Mehdipatnam and Nampally, Neodent brings the same{" "}
            <EditorialHighlight tone="primary" onDark>
              patient-focused approach
            </EditorialHighlight>{" "}
            into spaces designed for focused, comfortable dental care.
          </p>
        </header>

        <div className={styles.composition}>
          <div className={styles.panel}>
            <nav className={styles.selector} aria-label="Choose a Neodent clinic location">
              <ul>
                {branches.map((branch, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li key={branch.name}>
                      <button
                        type="button"
                        className={`${styles.selectorItem} ${isActive ? styles.selectorItemActive : ""}`}
                        onClick={() => selectBranch(index)}
                        aria-current={isActive ? "true" : undefined}
                        aria-label={`${branch.name}, Neodent Dental Hospital, Hyderabad`}
                      >
                        <span className={styles.selectorLabelGroup}>
                          <span className={styles.selectorName}>{branch.name}</span>
                          <span className={styles.selectorSub}>Neodent Dental Hospital · Hyderabad</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className={`${styles.details} ${switchClass}`} aria-live="polite">
              <p className={styles.description}>{active.body}</p>

              <dl className={styles.facts}>
                <div>
                  <dt>Address</dt>
                  <dd>{active.address}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={active.tel} className={styles.factLink} aria-label={`Call Neodent ${active.name}`}>
                      {active.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Hours</dt>
                  <dd>{active.hours}</dd>
                </div>
              </dl>

              <div className={styles.google}>
                <p className={styles.googleRating}>
                  <span className={styles.googleWord} aria-hidden="true">
                    <span style={{ color: "#8ab4f8" }}>G</span>
                    <span style={{ color: "#f28b82" }}>o</span>
                    <span style={{ color: "#fdd663" }}>o</span>
                    <span style={{ color: "#8ab4f8" }}>g</span>
                    <span style={{ color: "#81c995" }}>l</span>
                    <span style={{ color: "#f28b82" }}>e</span>
                  </span>
                  <span className={styles.srOnly}>Google rating: </span>
                  <span className={styles.googleScore}>
                    {active.google.rating}
                    <span className={styles.googleStar} aria-hidden="true">
                      {" "}
                      ★
                    </span>
                  </span>
                  <span className={styles.googleCount}>
                    {active.google.reviews} reviews
                  </span>
                </p>
                <a
                  href={active.google.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.googleLink}
                  aria-label={`Get directions to Neodent ${active.name} on Google Maps (opens in a new tab)`}
                >
                  Get directions <ArrowRight size={13} aria-hidden="true" />
                </a>
                <p className={styles.googleNote}>Rating as shown on the Google listing; it may have changed since.</p>
              </div>
            </div>
          </div>

          <figure className={styles.mediaCol} aria-label={`Neodent ${active.name} photographs`}>
            <div className={`${styles.plate} ${styles.plateMain} ${switchClass}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.primary.src}
                alt={active.primary.alt}
                width={active.primary.width}
                height={active.primary.height}
                loading="lazy"
              />
              <span className={styles.plateLabel}>{active.primary.label}</span>
            </div>

            <div className={`${styles.plate} ${styles.plateSide} ${switchClass}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.secondary.src}
                alt={active.secondary.alt}
                width={active.secondary.width}
                height={active.secondary.height}
                loading="lazy"
              />
              <span className={styles.plateLabel}>{active.secondary.label}</span>
            </div>
          </figure>
        </div>

        <div className={styles.ctaRow}>
          <p className={styles.brandLine}>
            <span className={styles.brandLineTick} aria-hidden="true" />
            Two locations. One Neodent standard.
          </p>
          <a href="/clinic" className={styles.cta}>
            Explore our clinics <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
