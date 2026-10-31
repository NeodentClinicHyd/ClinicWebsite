"use client";

import { useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
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
  nampallyGoogleRating,
  nampallyHours,
  nampallyInteriorImage,
  nampallyPhone,
  nampallyTelPhone,
  phone,
  telPhone,
} from "@/lib/site-data";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./SpacesDesignedAroundCare.module.css";

/* ------------------------------------------------------------------
   Home section: "Spaces designed around care."

   One location panel per branch. The switcher picks a branch; the
   details (left) and the photographs (right) of every branch are all
   rendered, stacked in one grid cell each, and crossfade on the active
   index. Inactive copies are inert and aria-hidden. Because the stacks
   share a cell, switching never changes the section's height.

   PHOTOGRAPHY (reference Part 3.1): photographs are cropped with
   object-fit: cover around a per-image focal point. On desktop the
   primary photo fills the right column (as tall as the details column,
   capped at --media-max-h) and the second photo is a smaller inset over
   its lower-left corner. Below 900px the two photos are a scroll-snap row.

   OPEN-NOW CHIP: worked out in the browser from each branch's hours
   string in lib/site-data.ts, in Asia/Kolkata time. Both branches are
   open Monday to Saturday with Sunday as the weekly holiday (the same
   closure lib/clinic-data.ts lists for both). A branch whose hours
   string is empty or cannot be parsed gets no chip. The server render
   has no chip (the page is static), so there is no hydration mismatch.

   GOOGLE RATING: values read from the Google listing screenshots, not
   live data (googleRating / nampallyGoogleRating).

   DIRECTIONS: each branch keeps its address-based Google Maps link.
   ------------------------------------------------------------------ */

const TIME_ZONE = "Asia/Kolkata";
const CLOSED_WEEKDAYS = [0]; // Sunday

type BranchImage = { src: string; alt: string; label: string; focal: string; ratio: string };
type Branch = {
  id: string;
  name: string;
  locality: string;
  body: string;
  address: string;
  phone: string;
  tel: string;
  hours: string;
  directions: string;
  google: { score: string; count: number };
  primary: BranchImage;
  inset: BranchImage;
};

const branches: Branch[] = [
  {
    id: "mehdipatnam",
    name: "Mehdipatnam",
    locality: "Humayun Nagar",
    body:
      "Neodent's original Hyderabad location, in Humayun Nagar. The practice began here in 1994 and continues to offer specialist-led dental care across restorative, prosthodontic, implant and preventive needs.",
    address,
    phone,
    tel: telPhone,
    hours: mehdipatnamHours,
    directions,
    google: googleRating,
    primary: {
      src: mehdipatnamInteriorImage,
      alt: "Neodent Dental Hospital Mehdipatnam, the patient waiting lounge",
      label: "Waiting lounge",
      focal: "50% 45%",
      ratio: "3 / 4",
    },
    inset: {
      src: mehdipatnamExteriorImage,
      alt: "Neodent Dental Hospital Mehdipatnam, the carved entrance doorway",
      label: "Entrance",
      focal: "50% 40%",
      ratio: "4 / 5",
    },
  },
  {
    id: "nampally",
    name: "Nampally",
    locality: "Medwin Hospital Complex",
    body:
      "Set within the Medwin Hospital Complex in central Hyderabad, the Nampally clinic offers multi-speciality dental care: consultation, treatment planning, treatment and follow-up, with attention to comfort and long-term oral health.",
    address: nampallyAddress,
    phone: nampallyPhone,
    tel: nampallyTelPhone,
    hours: nampallyHours,
    directions: nampallyDirections,
    google: nampallyGoogleRating,
    primary: {
      src: nampallyInteriorImage,
      alt: "Neodent Dental Hospital Nampally, the reception and consultation wing",
      label: "Reception",
      focal: "40% 62%",
      ratio: "3 / 4",
    },
    inset: {
      src: nampallyExteriorImage,
      alt: "Neodent Dental Hospital Nampally, the street frontage and signage",
      label: "Street frontage",
      focal: "50% 30%",
      ratio: "4 / 3",
    },
  },
];

/* ---- Opening status --------------------------------------------------- */

type Hours = { open: number; close: number; openLabel: string };
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** "4:00 PM – 8:00 PM" -> minutes after midnight. Null if unparseable. */
function parseHours(text: string): Hours | null {
  const times = [...text.matchAll(/(\d{1,2}):(\d{2})\s*([AP])M/gi)];
  if (times.length !== 2) return null;
  const toMinutes = (m: RegExpMatchArray) => ((Number(m[1]) % 12) + (m[3].toUpperCase() === "P" ? 12 : 0)) * 60 + Number(m[2]);
  const open = toMinutes(times[0]);
  const close = toMinutes(times[1]);
  if (close <= open) return null;
  return { open, close, openLabel: times[0][0].replace(/\s*([AP]M)/i, " $1").toUpperCase() };
}

/** Weekday (0 = Sunday) and minutes after midnight in Asia/Kolkata. */
function kolkataNow(timestamp: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(timestamp));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

type Status = { open: boolean; label: string };

function openingStatus(hoursText: string, timestamp: number): Status | null {
  const hours = parseHours(hoursText);
  if (!hours) return null;
  const { day, minutes } = kolkataNow(timestamp);
  if (day < 0) return null;
  const openToday = !CLOSED_WEEKDAYS.includes(day);
  if (openToday && minutes >= hours.open && minutes < hours.close) return { open: true, label: "Open now" };
  if (openToday && minutes < hours.open) return { open: false, label: `Opens at ${hours.openLabel}` };
  // Closed for the rest of today: find the next open day.
  for (let ahead = 1; ahead <= 7; ahead += 1) {
    const next = (day + ahead) % 7;
    if (CLOSED_WEEKDAYS.includes(next)) continue;
    const when = ahead === 1 ? "tomorrow" : WEEKDAYS[next];
    return { open: false, label: `Opens ${when} at ${hours.openLabel}` };
  }
  return null;
}

// The current minute, re-read every 30s. null on the server.
const subscribeMinute = (onChange: () => void) => {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
};
const minuteSnapshot = () => Math.floor(Date.now() / 60_000) * 60_000;
const serverSnapshot = () => null;

/* ---- Component -------------------------------------------------------- */

export function SpacesDesignedAroundCare() {
  const [activeIndex, setActiveIndex] = useState(0);
  const now = useSyncExternalStore(subscribeMinute, minuteSnapshot, serverSnapshot);

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | null = null;
    if (event.key in keys) next = (activeIndex + keys[event.key] + branches.length) % branches.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = branches.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    document.getElementById(`clinic-tab-${branches[next].id}`)?.focus();
  };

  return (
    <section className={styles.section} id="clinics" aria-labelledby="clinics-title">
      <span className={styles.seam} aria-hidden="true" />

      <div className={styles.container}>
        <Reveal as="header" className={styles.header}>
          <h2 id="clinics-title" className={styles.title}>
            Spaces designed <span>around care.</span>
          </h2>
          <div className={styles.headerAside}>
            <p className={`${styles.lede} section-lede section-lede--on-dark`}>
              Across Mehdipatnam and Nampally, Neodent brings the same patient-focused approach into spaces
              designed for focused, comfortable dental care.
            </p>
            <Link href="/clinic" className={styles.cta}>
              Explore our clinics <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal className={styles.composition} delay={120}>
          <div className={styles.selector} role="tablist" aria-label="Choose a Neodent clinic">
            {branches.map((branch, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={branch.id}
                  id={`clinic-tab-${branch.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`clinic-panel-${branch.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={styles.selectorItem}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={onTabKey}
                >
                  <span className={styles.selectorName}>{branch.name}</span>
                  <span className={styles.selectorSub}>{branch.locality}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.mediaStack}>
            {branches.map((branch, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={branch.id}
                  className={styles.media}
                  data-active={isActive}
                  inert={!isActive}
                  aria-hidden={!isActive}
                  role="region"
                  aria-label={`Photographs of Neodent ${branch.name}`}
                  tabIndex={isActive ? 0 : -1}
                >
                  {[branch.primary, branch.inset].map((image, i) => (
                    <figure
                      key={image.src}
                      className={i === 0 ? styles.shotPrimary : styles.shotInset}
                      style={{ "--focal": image.focal, "--ratio": image.ratio } as CSSProperties}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes={
                          i === 0
                            ? "(min-width: 1228px) 540px, (min-width: 900px) 44vw, 84vw"
                            : "(min-width: 1228px) 200px, (min-width: 900px) 17vw, 84vw"
                        }
                      />
                      <figcaption className={styles.shotLabel}>{image.label}</figcaption>
                    </figure>
                  ))}
                </div>
              );
            })}
          </div>

          <div className={styles.detailStack}>
            {branches.map((branch, index) => {
              const isActive = index === activeIndex;
              const status = now === null ? null : openingStatus(branch.hours, now);
              return (
                <div
                  key={branch.id}
                  id={`clinic-panel-${branch.id}`}
                  role="tabpanel"
                  aria-labelledby={`clinic-tab-${branch.id}`}
                  className={styles.details}
                  data-active={isActive}
                  inert={!isActive}
                  aria-hidden={!isActive}
                >
                  <p className={styles.description}>{branch.body}</p>

                  <dl className={styles.facts}>
                    <div>
                      <dt>Address</dt>
                      <dd>{branch.address}</dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>{branch.phone}</dd>
                    </div>
                    <div>
                      <dt>Hours</dt>
                      <dd className={styles.hours}>
                        <span>{branch.hours} · Sunday holiday</span>
                        {status && (
                          <span className={styles.chip} data-open={status.open}>
                            <span className={styles.chipDot} aria-hidden="true" />
                            {status.label}
                          </span>
                        )}
                      </dd>
                    </div>
                  </dl>

                  <div className={styles.actions}>
                    <a href={branch.tel} className={`${styles.action} ${styles.actionPrimary}`}>
                      <Phone size={16} aria-hidden="true" />
                      Call {branch.name}
                    </a>
                    <a
                      href={branch.directions}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.action} ${styles.actionSecondary}`}
                      aria-label={`Directions to Neodent ${branch.name} on Google Maps (opens in a new tab)`}
                    >
                      <MapPin size={16} aria-hidden="true" />
                      Directions
                    </a>
                  </div>

                  <p className={styles.google}>
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
                      {branch.google.score}
                      <span className={styles.googleStar} aria-hidden="true">
                        {" "}★
                      </span>
                    </span>
                    <span className={styles.googleCount}>{branch.google.count} reviews</span>
                    <span className={styles.googleNote}>As shown on the Google listing; it may have changed since.</span>
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
