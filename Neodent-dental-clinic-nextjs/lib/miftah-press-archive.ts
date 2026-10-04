/* ------------------------------------------------------------------
   Dr. Miftah profile, Section 09 — press archive dataset.

   Every entry is a real file in
   public/assets/dr-miftah/treatments/media (dimensions read from the
   files themselves). The folder holds 13 distinct clippings — no two
   files share a hash or an article, so nothing is dropped as a
   duplicate.

   File names are descriptive and keyword-bearing for image search:
     dr-md-miftah-ur-rahman-neodent-dental-hospital-hyderabad-
       <topic>-<publication>[-<year>].<ext>
   The year appears only where the masthead date is legible on the
   scan. `alt` repeats the same facts in a sentence for crawlers and
   screen readers; the on-screen viewer caption stays the masthead only.

   Order is editorial, not chronological: the clipping about Dr.
   Miftah's own MDS result leads, the single landscape supplement
   (Siasat Health) and the Sakshi online screenshot sit mid-strip so
   the rail's rhythm alternates between tall and wide frames.
   ------------------------------------------------------------------ */

export interface PressClipping {
  src: string;
  width: number;
  height: number;
  /** Masthead shown in the viewer caption. */
  publication: string;
  /** Descriptive alt text (image search + assistive tech). */
  alt: string;
}

const DIR = "/assets/dr-miftah/treatments/media/";
const PREFIX = "dr-md-miftah-ur-rahman-neodent-dental-hospital-hyderabad-";

const SIASAT = "The Siasat Daily, Hyderabad";

function alt(publication: string, topic: string) {
  return `${publication} newspaper clipping: ${topic} — Dr. Md. Miftah Ur Rahman, Neodent Dental Hospital, Hyderabad`;
}

export const PRESS_CLIPPINGS: readonly PressClipping[] = [
  {
    src: `${DIR}${PREFIX}mds-prosthodontics-gold-medallist-siasat-daily-news.jpg`,
    width: 530,
    height: 1280,
    publication: SIASAT,
    alt: alt(SIASAT, "Dr. Md. Miftah Ur Rahman's MDS in Prosthodontics result as Gold Medallist"),
  },
  {
    src: `${DIR}${PREFIX}dental-implant-camp-lecture-siasat-daily-news.jpeg`,
    width: 631,
    height: 1280,
    publication: SIASAT,
    alt: alt(SIASAT, "dental implant camp and lecture at Neodent Dental Hospital"),
  },
  {
    src: `${DIR}${PREFIX}natural-teeth-strengthening-dental-camp-siasat-daily-news.jpeg`,
    width: 803,
    height: 1280,
    publication: SIASAT,
    alt: alt(SIASAT, "dental camp on strengthening natural teeth"),
  },
  {
    src: `${DIR}${PREFIX}dental-implants-siasat-health-supplement.jpeg`,
    width: 1080,
    height: 879,
    publication: "Siasat Health supplement",
    alt: alt("Siasat Health supplement", "dental implants and natural teeth"),
  },
  {
    src: `${DIR}${PREFIX}natural-teeth-extraction-caution-dental-camp-siasat-daily-news.jpeg`,
    width: 835,
    height: 1280,
    publication: SIASAT,
    alt: alt(SIASAT, "caution before natural tooth extraction, dental implant camp"),
  },
  {
    src: `${DIR}${PREFIX}dental-care-inauguration-siasat-daily-news.jpeg`,
    width: 890,
    height: 1280,
    publication: SIASAT,
    alt: alt(SIASAT, "dental care inauguration"),
  },
  {
    src: `${DIR}${PREFIX}dental-care-awareness-sakshi-telugu-news.jpeg`,
    width: 759,
    height: 1280,
    publication: "Sakshi (online edition)",
    alt: alt("Sakshi (Telugu, online edition)", "dental care awareness"),
  },
  {
    src: `${DIR}${PREFIX}permanent-dental-implants-smile-siasat-daily-news.jpeg`,
    width: 788,
    height: 1226,
    publication: SIASAT,
    alt: alt(SIASAT, "permanent dental implants for a lasting smile"),
  },
  {
    src: `${DIR}${PREFIX}state-dental-conference-siasat-daily-news-2025.jpeg`,
    width: 497,
    height: 1280,
    publication: SIASAT,
    alt: alt(SIASAT, "state dental conference, February 2025"),
  },
  {
    src: `${DIR}${PREFIX}tobacco-oral-cancer-awareness-siasat-daily-news-2025.jpeg`,
    width: 811,
    height: 1280,
    publication: SIASAT,
    alt: alt(SIASAT, "tobacco and oral cancer awareness, June 2025"),
  },
  {
    src: `${DIR}${PREFIX}healthy-teeth-dental-camp-siasat-daily-news-2024.jpeg`,
    width: 741,
    height: 1280,
    publication: SIASAT,
    alt: alt(SIASAT, "healthy teeth dental camp, October 2024"),
  },
  {
    src: `${DIR}${PREFIX}dental-implants-natural-teeth-protection-siasat-daily-news.jpeg`,
    width: 772,
    height: 1280,
    publication: SIASAT,
    alt: alt(SIASAT, "dental implants protecting natural teeth"),
  },
  {
    src: `${DIR}${PREFIX}tooth-extraction-fixed-teeth-dental-implants-siasat-daily-news-2023.jpeg`,
    width: 584,
    height: 1280,
    publication: SIASAT,
    alt: alt(SIASAT, "tooth extraction alternatives, fixed teeth and dental implants, March 2023"),
  },
];
