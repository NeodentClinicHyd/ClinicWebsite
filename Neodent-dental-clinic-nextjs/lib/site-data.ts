// Shared site content and constants migrated verbatim from the
// React/Vite source (neodent-dental-hospitals-website/src/App.tsx).
// Keep this content in sync with the source of truth until the
// post-migration content/SEO pass.

/* ------------------------------------------------------------------
   SEO / site identity — single source of truth for the technical SEO
   layer (app/sitemap.ts, app/robots.ts, app/manifest.ts, app/layout.tsx
   metadata, and per-page metadata exports).

   SITE_URL is the real production domain (confirmed with the client),
   not a placeholder or preview URL. No trailing slash, so it composes
   cleanly with relative paths ("" + "/about" -> ".../about") and with
   Next's `metadataBase`.
   ------------------------------------------------------------------ */
export const SITE_URL = "https://www.neodentdentalhospitals.com";
export const SITE_NAME = "Neodent Dental Hospital";

/* ------------------------------------------------------------------
   Founding year — the clinic's "Since 1994" benchmark (home redesign
   reference, Parts 3.6 and 7). The clinic's age is always calculated,
   never hard-coded: 32 in 2026. Dr. Siraj founded the clinic that year,
   so his years of experience (founder.experienceYears) are counted from
   the same year: "32+" in 2026 (owner, 31 Oct 2026).
   legacyStats.established below still holds the same year as a string;
   it is left untouched until the sections that render it are migrated.
   ------------------------------------------------------------------ */
export const ESTABLISHED_YEAR = 1994;

export function yearsSinceEstablished(): number {
  return new Date().getFullYear() - ESTABLISHED_YEAR;
}

export const entranceImage = "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg";
export const waitingImage = "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg";
export const doctorImage = "/assets/dr-miftah/Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png";
export const recognitionImage =
  "/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png";
/* Home hero slide 1 portrait (the transparent cut-out of Dr. Siraj).
   To use a re-cut file, change this one path. The hero CSS lays the
   figure out from the current file's proportions (714x623, head centre
   0.168 x width from the top, face from 0.41 to 0.67 of the width; see
   "Slide 1: portrait stage" in app/globals.css), so a cut-out framed
   differently needs those numbers checked. Kept separate from
   recognitionImage, which other sections use. */
export const heroPortraitImage =
  "/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png";
export const treatmentVideo =
  "/assets/treatment-video/Dr. Miftah Neodent dental clinic Hyderabad - treatment video.mp4";
/* Section 01 (ExperienceIntro) primary visual: the vertical/reel-format
   hospital tour. Kept as its own export (distinct from treatmentVideo,
   which is Dr. Miftah's clinical demonstration used by Doctor.tsx)
   because the two videos serve different sections and subjects. */
export const tourVideo = "/assets/Neodent dental clinic tour video.mp4";
/* The part of the 21 s tour that ExperienceIntro plays, chosen from
   frames extracted at 1 s steps (home redesign P2). 0-2 s is a close-up
   of a red pillar, 17 s passes another pillar and 19-21 s is a promo
   card ("almost 3 decades", "free consultation") that conflicts with the
   site's "Since 1994" copy. 3-16.5 s is the waiting area, reception,
   awards wall and treatment rooms. The poster is the 3 s frame. */
export const tourVideoSegment = { start: 3, end: 16.5 } as const;
export const tourVideoPoster = "/assets/neodent-tour-video-poster-waiting-area.webp";
/* Section 01's atmospheric background layer -- a real, generic clinic
   interior (not tied to either Mehdipatnam or Nampally specifically,
   so it never repeats Hero Slide 02's location story). Used heavily
   desaturated and low-opacity behind a charcoal overlay: texture and
   environment, not a photograph. */
export const experienceIntroBackdrop =
  "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg";
export const treatmentImage = "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg";
export const equipmentImage = "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg";
export const detailImage = "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg";
export const philosophyImage = "/attached_assets/our-philosophy.webp";
export const legacyPressImage = "/assets/news-articles/neodent-media-siasat-01.jpg";
export const legacyInterviewImage = "/assets/dr-siraj-tv-interview.jpg";
export const legacyAwardImage = "/assets/dr-miftah/dr-miftah-award-recognition.jpg";
export const visitImage = "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg";
export const officialLogo = "/assets/Neodent dental hospital hyderabad logo.jpeg";

export const phone = "+91 90306 48393";
export const telPhone = "tel:+919030648393";
/* ------------------------------------------------------------------
   Generic "Call" CTA number — used by standalone call-to-action
   buttons that are not attributed to a specific branch (floating CTA,
   hero button, mobile bars, lead-capture popup, contact-card "Call
   Neodent" buttons, etc). Deliberately separate from `phone`/
   `telPhone` above, which remain the Mehdipatnam BRANCH contact
   number shown in branch directory listings (Footer, ContactNextStep,
   ClinicalSettings, the /contact branch directory) and must not
   change alongside the CTA number. ------------------------------------------------------------------ */
export const ctaPhone = "+91 9246348485";
export const ctaTelPhone = "tel:+919246348485";
export const address =
  "10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500006";
export const shortLocation = "Humayun Nagar, Hyderabad";
export const heroLocations = [
  {
    number: "01",
    name: "Humayun Nagar",
    detail: "Humayun Nagar, Hyderabad",
    href: "/clinic/mehdipatnam",
  },
  {
    number: "02",
    name: "Nampally",
    detail: "Medwin Hospital Complex, Nampally",
    href: "/clinic/nampally",
  },
] as const;
export const directions =
  "https://www.google.com/maps/search/?api=1&query=10-3-14B%2F11%2F1%2C%20near%20Masjid-e-Azizia%2C%20Humayun%20Nagar%2C%20Royal%20Colony%2C%20Mehdipatnam%2C%20Hyderabad%2C%20Telangana%20500006%2C%20India";
export const googleRating = { score: "4.3", count: 261 };

/* ------------------------------------------------------------------
   Section 08 (ContactNextStep) — Nampally branch contact details.
   Mehdipatnam reuses `phone` / `telPhone` / `directions` above
   (the primary branch number and address already established in this
   file). Nampally is client-supplied business information; the
   Nampally phone/address are client-supplied business information,
   kept verbatim for NAP (name/address/phone) consistency with the
   Google Business Profile. ------------------------------------------------------------------ */
export const nampallyPhone = "+91 90305 98081";
export const nampallyTelPhone = "tel:+919030598081";
export const nampallyDirections =
  "https://www.google.com/maps/search/?api=1&query=Neodent%20Dental%20Hospital%2C%20Medwin%20Hospital%20Complex%2C%20Pillar%20%23A1270%2C%20Raghav%20Ratna%20Towers%2C%20Chirag%20Ali%20Lane%2C%20Mahesh%20Nagar%20Colony%2C%20Nampally%2C%20Hyderabad%2C%20Telangana%20500001%2C%20India";
/* Nampally's Google rating -- the client-supplied listing figures
   already shown on the homepage's "Spaces designed around care"
   section (4.6 / 157). Mehdipatnam's counterpart is `googleRating`
   above. Snapshot values, not live data. */
export const nampallyGoogleRating = { score: "4.6", count: 157 };

/* ------------------------------------------------------------------
   Branch opening hours — the two branches keep different timings, so
   each is tracked separately rather than a single sitewide string.
   Source of truth for the /clinic and /contact branch listings, and
   for Section 08 (QuestionsContact) which already displayed these.
   ------------------------------------------------------------------ */
export const mehdipatnamHours = "4:00 PM – 8:00 PM";
export const nampallyHours = "10:30 AM – 5:00 PM";
export const LEAD_CAPTURE_SESSION_KEY = "neodent-lead-capture-shown";

/* ------------------------------------------------------------------
   Social profiles -- client-supplied, verified URLs only. Used by the
   Footer's brand column social icon row.
   ------------------------------------------------------------------ */
export type SocialLink = { label: string; href: string };
export const socialLinks: readonly SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/neodent.dental/" },
  { label: "Facebook", href: "https://www.facebook.com/drmdsiraj/photos" },
] as const;

export type NavItem = { label: string; href: string };
export const nampallyAddress = "Medwin Hospital Complex, Pillar #A1270, Raghav Ratna Towers, Chirag Ali Lane, Mahesh Nagar Colony, Nampally, Hyderabad, Telangana 500001";
export const mehdipatnamAddress = "10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam, Hyderabad, Telangana 500006";

/* ------------------------------------------------------------------
   Structured (schema.org PostalAddress-shaped) versions of the two
   verified branch addresses above, split into parts for JSON-LD.
   Derived directly from `mehdipatnamAddress` / `nampallyAddress` --
   no new address information is introduced. ------------------------------------------------------------------ */
export const mehdipatnamStructuredAddress = {
  streetAddress:
    "10-3-14B/11/1, near Masjid-e-Azizia, Humayun Nagar, Royal Colony, Mehdipatnam",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500006",
  addressCountry: "IN",
} as const;
export const nampallyStructuredAddress = {
  streetAddress: "Medwin Hospital Complex, Pillar #A1270, Raghav Ratna Towers, Chirag Ali Lane, Mahesh Nagar Colony, Nampally",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500001",
  addressCountry: "IN",
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Clinic", href: "/clinic" },
  { label: "Contact", href: "/contact" },
];

export const galleryItems = [
  {
    src: entranceImage,
    label: "The Neodent entrance",
    alt: "Entrance to Neodent Dental Hospital",
  },
  {
    src: waitingImage,
    label: "A considered waiting room",
    alt: "Neodent Dental Hospital waiting area",
  },
  {
    src: equipmentImage,
    label: "Treatment room",
    alt: "Dental treatment equipment in a Neodent room",
  },
  {
    src: treatmentImage,
    label: "Inside the clinic",
    alt: "Dental treatment room at Neodent",
  },
  {
    src: equipmentImage,
    label: "Clinical detail",
    alt: "Dental equipment in a treatment room",
  },
];

/* Slide 03 is the institutional recognition chapter (see
   heroRecordItems at the foot of this file). The nav dot's
   aria-label ("Show <label> slide") and its data-testid both read
   from here, so the label has to describe the slide's real subject. */
export const heroSlideMeta = [
  { id: "hospital", label: "Since 1994" },
  { id: "locations", label: "Our two clinics" },
  { id: "record", label: "Recognition" },
] as const;
export const HERO_AUTOPLAY_MS = 7000;

/* ------------------------------------------------------------------
   Hero Slide 02 — "Two clinics. One standard of care."

   One photograph per branch, shown at the same height, each with a
   tappable caption row that links to the branch page. Descriptors use
   only location detail already verified in this file (the Mehdipatnam
   address above, and "Medwin Hospital Complex" from heroLocations).
   Each branch uses the higher-resolution file of its pair, so no photo
   is upscaled:
     Mehdipatnam  interior  (960 x 1280, waiting lounge)
     Nampally     exterior  (2240 x 1680, street frontage and signage)
   ------------------------------------------------------------------ */
export const mehdipatnamExteriorImage =
  "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital - mehdipatnam Exterior.jpg";
export const mehdipatnamInteriorImage =
  "/assets/neodent-clinic-mehdipatnam/neodent dental hospital-mehdipatnam-interior.jpg";
export const nampallyExteriorImage =
  "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Exterior.jpg";
export const nampallyInteriorImage =
  "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg";

/* ------------------------------------------------------------------
   Clinic page — Section 03 (InsideNeoDent) full photograph set.

   Every real interior/exterior photograph available for both
   branches, used for the "Spaces designed around care." gallery.
   Mehdipatnam has the larger set (reception, director's office,
   two treatment chambers, two waiting areas); Nampally currently has
   only its two hero photographs (exterior + interior) — both are
   included rather than duplicated or invented.
   ------------------------------------------------------------------ */
export const mehdipatnamReceptionImage =
  "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam exterior of clinic.jpeg";
export const mehdipatnamDirectorOfficeImage =
  "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam interior of clinic.jpeg";
export const mehdipatnamTreatmentRoomOneImage =
  "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam treatment room 1.jpeg";
export const mehdipatnamTreatmentRoomTwoImage =
  "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam treatment room 2.jpeg";
export const mehdipatnamPatientLoungeImage =
  "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam waiting area.jpeg";
export const mehdipatnamWaitingHallImage =
  "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam waiting area wide area.jpeg";

export type ClinicGalleryImage = {
  src: string;
  alt: string;
  branch: "Mehdipatnam" | "Nampally";
  label: string;
  /** object-position tuned per photograph so the crop favours its
   * strongest architectural detail rather than a mechanical centre. */
  position?: string;
  /** Layout weight in the editorial bento grid — plain tiles when
   * omitted. Only the two strongest frames are "feature", and one
   * wide frame breaks the rhythm, matching the site's
   * "not equal cards" composition rule. */
  span?: "feature" | "wide";
};

export const clinicGalleryImages: readonly ClinicGalleryImage[] = [
  {
    src: mehdipatnamInteriorImage,
    alt: "Neodent Dental Hospital Mehdipatnam — the patient waiting lounge with its blue chandelier",
    branch: "Mehdipatnam",
    label: "Waiting lounge",
    position: "68% 42%",
    span: "feature",
  },
  {
    src: nampallyInteriorImage,
    alt: "Neodent Dental Hospital Nampally — the double-height reception and consultation wing",
    branch: "Nampally",
    label: "Reception & staircase",
    position: "50% 26%",
    span: "feature",
  },
  {
    src: mehdipatnamExteriorImage,
    alt: "Neodent Dental Hospital Mehdipatnam — the carved wooden entrance doorway",
    branch: "Mehdipatnam",
    label: "Entrance",
    position: "62% 30%",
  },
  {
    src: mehdipatnamReceptionImage,
    alt: "Neodent Dental Hospital Mehdipatnam — the front-desk reception counter",
    branch: "Mehdipatnam",
    label: "Reception counter",
    position: "50% 38%",
  },
  {
    src: mehdipatnamDirectorOfficeImage,
    alt: "Neodent Dental Hospital Mehdipatnam — the director's consultation office",
    branch: "Mehdipatnam",
    label: "Director's office",
    position: "50% 42%",
  },
  {
    src: mehdipatnamTreatmentRoomOneImage,
    alt: "Neodent Dental Hospital Mehdipatnam — a fully equipped dental treatment room",
    branch: "Mehdipatnam",
    label: "Treatment room",
    position: "50% 55%",
  },
  {
    src: mehdipatnamTreatmentRoomTwoImage,
    alt: "Neodent Dental Hospital Mehdipatnam — a second dental treatment chamber",
    branch: "Mehdipatnam",
    label: "Treatment chamber",
    position: "50% 48%",
  },
  {
    src: mehdipatnamPatientLoungeImage,
    alt: "Neodent Dental Hospital Mehdipatnam — a quiet patient lounge between chambers",
    branch: "Mehdipatnam",
    label: "Patient lounge",
    position: "50% 55%",
  },
  {
    src: mehdipatnamWaitingHallImage,
    alt: "Neodent Dental Hospital Mehdipatnam — the main waiting hall outside the consultation chambers",
    branch: "Mehdipatnam",
    label: "Waiting hall",
    position: "50% 42%",
    span: "wide",
  },
  {
    src: nampallyExteriorImage,
    alt: "Neodent Dental Hospital Nampally — the street frontage and signage",
    branch: "Nampally",
    label: "Street frontage",
    position: "50% 38%",
  },
] as const;

export type HeroBranch = {
  id: "mehdipatnam" | "nampally";
  name: string;
  /** Short location descriptor shown under the name. Never invented. */
  descriptor: string;
  href: string;
  photo: {
    src: string;
    alt: string;
    /** object-position focal point for the cover crop. */
    focal: string;
  };
};

export const heroBranches: readonly HeroBranch[] = [
  {
    id: "mehdipatnam",
    name: "Mehdipatnam",
    descriptor: "Humayun Nagar, Hyderabad",
    href: "/clinic/mehdipatnam",
    photo: {
      src: mehdipatnamInteriorImage,
      alt: "Neodent Dental Hospital Mehdipatnam interior, the patient waiting lounge",
      focal: "50% 40%",
    },
  },
  {
    id: "nampally",
    name: "Nampally",
    descriptor: "Medwin Hospital Complex, Hyderabad",
    href: "/clinic/nampally",
    photo: {
      src: nampallyExteriorImage,
      alt: "Neodent Dental Hospital Nampally exterior, the street frontage and signage",
      /* The 1280x960 photo is always cropped at the sides (the card is
         narrower than 4:3). The sign's lettering runs from about x 290
         to x 890. The card's height is capped by its width (hero CSS:
         1.45 x on phones, 1.52 x on desktop) so at least about 630
         source px stay visible; at 42% the visible window then starts
         at about x 273 and ends past x 900, so the whole name reads. */
      focal: "42% 50%",
    },
  },
] as const;

/* ------------------------------------------------------------------
   Hero Slide 03 — "Recognised beyond the clinic": the credibility
   chapter. The subject of this slide is NEODENT DENTAL HOSPITALS as
   an institution, not any individual doctor.

   That constraint is enforced through the copy, not just intent: no
   doctor's name appears in any VISIBLE string below. Captions name
   the OUTLET only ("The Siasat Daily", "News18 Urdu"). Doctors who
   appear inside the genuine media artifacts are supporting evidence
   for the institution's public record — they are not the subject.

   CONTENT ACCURACY — every label below is legible in its own
   artifact and nothing else is asserted:
     - "The Siasat Daily" / "Hyderabad"  -> printed in the masthead
     - "News18 Urdu"                     -> the channel bug on air
     - "Institutional recognition"       -> descriptive of the display
   Deliberately NOT quoted, even though both are legible in
   neodent-awards-recognition.jpg: the framed "National Dental
   Excellence Award 2017 — Top Dental Clinic" plaque and the Indian
   Prosthodontic Society certificate of affiliation. "Top Dental
   Clinic" is a ranking claim, and naming a specific award invites a
   date and a citation this project cannot substantiate. The artifact
   is allowed to speak for itself instead.

   ASSETS DELIBERATELY EXCLUDED:
     - dr-miftah-award-recognition.jpg — would make an individual
       doctor the focal point of an institutional slide. Dr. Miftah is
       introduced properly in his own Doctor section.
     - "Dr Md Siraj addressing the gathering at govt dental collage and
       hospital hyderabd.jpg" — carries burned-in subtitle text in a
       non-brand typeface across the lower third. Cropping it out
       removes the only thing that identifies the event; leaving it in
       breaks the type system. (Already used, uncropped, by the
       Republic Day address figure in BeyondTheClinic.tsx.)
     - neodent-mark.png, both doctor portraits, the treatment video —
       already carried by Slides 01/02 and the Doctor section.
   NOTE: neodent-media-siasat-02.jpg does not exist in this project.
   ------------------------------------------------------------------ */
export const siasatPressImage = "/assets/news-articles/neodent-media-siasat-01.jpg";
export const tvInterviewImage = "/assets/dr-siraj-tv-interview.jpg";
export const awardsWallImage = "/assets/neodent-awards-recognition.jpg";

export type HeroRecordItem = {
  id: "press" | "media" | "award";
  /** Caption: the outlet or what the artifact is, never a person. */
  caption: string;
  /** Documents (newspaper cuttings) use contain; photographs use cover. */
  kind: "document" | "photo";
  /** object-position focal point (photos only). */
  focal?: string;
  src: string;
  alt: string;
  sizes: string;
};

/* Reading order of the evidence: the press cutting (shown whole, as a
   document), then the broadcast frame, then the awards display.
   No English translation of the Siasat headline is shown: the proposed
   caption in the redesign reference (Part 8) still needs the clinic's
   approval. */
export const heroRecordItems: readonly HeroRecordItem[] = [
  {
    id: "press",
    caption: "The Siasat Daily, Hyderabad",
    kind: "document",
    src: siasatPressImage,
    alt: "The Siasat Daily, Hyderabad: newspaper coverage of a Neodent Dental Hospital dental implant camp and lecture.",
    sizes: "(max-width: 767px) 40vw, 300px",
  },
  {
    id: "media",
    caption: "News18 Urdu",
    kind: "photo",
    focal: "50% 30%",
    src: tvInterviewImage,
    alt: "News18 Urdu television: a dental health segment on the programme Hello Parwaz featuring Neodent Dental Hospital.",
    sizes: "(max-width: 767px) 60vw, 420px",
  },
  {
    id: "award",
    caption: "Awards and certificates",
    kind: "photo",
    focal: "50% 62%",
    src: awardsWallImage,
    alt: "Awards, mementos and certificates received by Neodent Dental Hospital, on display at the hospital.",
    sizes: "(max-width: 767px) 60vw, 420px",
  },
] as const;

/* ------------------------------------------------------------------
   Homepage legacy section (components/sections/LegacyStory.tsx) —
   single source of truth for the founder's facts and every numeric
   claim shown in that section. All values are client-confirmed. The
   component must read them from here and never hard-code them.

   Not yet migrated to read from here (still inline in their own
   components, left untouched on purpose): ClinicalLeadership.tsx
   (team[0]), ExperienceIntro.tsx (stats), Hero.tsx, Doctor.tsx,
   Experience.tsx, WhatToExpect.tsx, about/LegacyAndPeople.tsx,
   doctors/page.tsx.
   ------------------------------------------------------------------ */
const founderAcademicTitle = "Professor";
const founderAcademicInstitution =
  "Osmania Government Dental College & Hospital, Hyderabad";

export const founder = {
  name: "Dr. Mohd. Siraj Ur Rahman",
  shortName: "Dr. Siraj",
  role: "Founder · Director",
  qualifications: "BDS · FCIP · MDS (Chennai)",
  specialisms: ["Dental Surgeon", "Prosthodontist", "Implantologist"],
  academicTitle: founderAcademicTitle,
  academicInstitution: founderAcademicInstitution,
  academicPost: `${founderAcademicTitle}, ${founderAcademicInstitution}`,
  experienceYears: `${yearsSinceEstablished()}+`,
  image: recognitionImage,
  imageAlt:
    "Dr. Mohd. Siraj Ur Rahman, founder and director of Neodent Dental Hospital",
} as const;

export const legacyStats = {
  established: "1994",
  patientsTreated: "25,000+",
} as const;

export type LegacyPressItem = {
  id: "press" | "tv" | "recognition";
  src: string;
  alt: string;
  /** Outlet / origin, set in small caps in the caption. */
  source: string;
  /** Medium of the item, set in muted italic in the caption. */
  medium: string;
};

/* Reading order: press clipping (lead), television frame, recognition
   photo. The "Big Breaking" banner belongs to the television frame
   itself, not to a separate item. */
export const legacyPressItems: readonly LegacyPressItem[] = [
  {
    id: "press",
    src: legacyPressImage,
    alt: "Neodent feature in The Siasat Daily, Hyderabad",
    source: "The Siasat Daily · Hyderabad",
    medium: "Press feature, Urdu daily",
  },
  {
    id: "tv",
    src: legacyInterviewImage,
    alt: "Neodent doctor during a News18 Urdu television interview",
    source: "News18 Urdu",
    medium: "On-air interview segment",
  },
  {
    id: "recognition",
    src: legacyAwardImage,
    alt: "Neodent recognition archive",
    source: "Recognition",
    medium: "Recognition ceremony",
  },
] as const;
