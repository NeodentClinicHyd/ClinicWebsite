// Shared site content and constants migrated verbatim from the
// React/Vite source (neodent-dental-hospitals-website/src/App.tsx).
// Keep this content in sync with the source of truth until the
// post-migration content/SEO pass.

export const entranceImage = "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg";
export const waitingImage = "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg";
export const doctorImage = "/assets/dr-miftah/Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png";
export const recognitionImage =
  "/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png";
export const treatmentVideo =
  "/assets/treatment-video/Dr. Miftah Neodent dental clinic Hyderabad - treatment video.mp4";
/* Section 01 (ExperienceIntro) primary visual: the vertical/reel-format
   hospital tour. Kept as its own export (distinct from treatmentVideo,
   which is Dr. Miftah's clinical demonstration used by Doctor.tsx)
   because the two videos serve different sections and subjects. */
export const tourVideo = "/assets/Neodent dental clinic tour video.mp4";
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

export const phone = "+91 9030648393";
export const telPhone = "tel:+919030648393";
export const whatsappLink = `https://wa.me/919030648393?text=${encodeURIComponent(
  "Hi, I'd like to book an appointment at Neodent Dental Hospitals.",
)}`;
export const whatsappConsultLink = `https://wa.me/919030648393?text=${encodeURIComponent(
  "Hi, I'd like to enquire about a consultation at Neodent Dental Hospitals.",
)}`;
export const address =
  "Masjid-e-Azizia, Humayun Nagar Road, Royal Colony, Humayun Nagar, Hyderabad, Telangana, India";
export const shortLocation = "Humayun Nagar, Hyderabad";
export const heroLocations = [
  { number: "01", name: "Humayun Nagar", detail: "Humayun Nagar, Hyderabad" },
  {
    number: "02",
    name: "Nampally",
    detail: "Medwin Hospital Complex, Nampally",
  },
] as const;
export const directions =
  "https://www.google.com/maps/search/?api=1&query=Masjid-e-Azizia%2C%20Humayun%20Nagar%20Road%2C%20Royal%20Colony%2C%20Humayun%20Nagar%2C%20Hyderabad%2C%20Telangana%2C%20India";
export const googleRating = { score: "4.3", count: 259 };

/* ------------------------------------------------------------------
   Section 08 (ContactNextStep) — Nampally branch contact details.
   Mehdipatnam reuses `phone` / `telPhone` / `directions` above
   (the primary branch number and address already established in this
   file). Nampally is client-supplied business information; the
   Maps query text mirrors the already-verified `heroLocations`
   Nampally detail ("Medwin Hospital Complex, Nampally") rather than
   inventing a street address. ------------------------------------------------------------------ */
export const nampallyPhone = "+91 9030598081";
export const nampallyTelPhone = "tel:+919030598081";
export const nampallyDirections =
  "https://www.google.com/maps/search/?api=1&query=NeoDent%20Dental%20Hospital%2C%20Medwin%20Hospital%20Complex%2C%20Nampally%2C%20Hyderabad%2C%20Telangana%2C%20India";
export const LEAD_CAPTURE_SESSION_KEY = "neodent-lead-capture-shown";

export type NavItem = { label: string; href: string };
export const nampallyAddress = "Medwin Hospital Complex, Pillar #A1270, Nampally, Hyderabad, Telangana 500001";
export const mehdipatnamAddress = "10-3-14B/11/1, Humayun Nagar Rd, near Azzia Masjid, Royal Colony, Humayun Nagar, Hyderabad, Telangana 500006";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Expertise", href: "/treatments" },
  { label: "Clinic", href: "/clinic" },
  { label: "Contact", href: "/contact" },
];

export const galleryItems = [
  {
    src: entranceImage,
    label: "The Neodent entrance",
    alt: "Entrance to Neodent Dental Hospitals",
  },
  {
    src: waitingImage,
    label: "A considered waiting room",
    alt: "Neodent Dental Hospitals waiting area",
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
  { id: "hospital", label: "Hospitals" },
  { id: "locations", label: "Locations" },
  { id: "record", label: "Recognition" },
] as const;
export const HERO_AUTOPLAY_MS = 7000;

/* ------------------------------------------------------------------
   Hero Slide 02 — "Where NeoDent is": the two Hyderabad locations.

   Only branch names and location detail ALREADY VERIFIED inside this
   project are used here. Nampally's "Medwin Hospital Complex" comes
   from `heroLocations` above (and is legible on the branch's own
   signboard in the supplied photograph). No street address is
   invented for Mehdipatnam, so that branch carries the city only.

   Asset -> plate mapping is deliberate rather than mechanical. Each
   branch's LARGER plate uses the higher-resolution file of its pair,
   and the smaller overlapping plane uses the lower-resolution one, so
   no photograph is ever upscaled past its native size:

     Mehdipatnam  plate = interior  (960 x 1280)
                  inset = exterior  (384 x 512, entrance/threshold)
     Nampally     plate = exterior  (2240 x 1680, street frontage)
                  inset = interior  (1668 x 2224, reception)

   That also gives the two branches different subjects at different
   scales -- street presence vs. arrival -- instead of two identical
   cards.
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
    alt: "NeoDent Dental Hospital Mehdipatnam — the patient waiting lounge with its blue chandelier",
    branch: "Mehdipatnam",
    label: "Waiting lounge",
    position: "68% 42%",
    span: "feature",
  },
  {
    src: nampallyInteriorImage,
    alt: "NeoDent Dental Hospital Nampally — the double-height reception and consultation wing",
    branch: "Nampally",
    label: "Reception & staircase",
    position: "50% 26%",
    span: "feature",
  },
  {
    src: mehdipatnamExteriorImage,
    alt: "NeoDent Dental Hospital Mehdipatnam — the carved wooden entrance doorway",
    branch: "Mehdipatnam",
    label: "Entrance",
    position: "62% 30%",
  },
  {
    src: mehdipatnamReceptionImage,
    alt: "NeoDent Dental Hospital Mehdipatnam — the front-desk reception counter",
    branch: "Mehdipatnam",
    label: "Reception counter",
    position: "50% 38%",
  },
  {
    src: mehdipatnamDirectorOfficeImage,
    alt: "NeoDent Dental Hospital Mehdipatnam — the director's consultation office",
    branch: "Mehdipatnam",
    label: "Director's office",
    position: "50% 42%",
  },
  {
    src: mehdipatnamTreatmentRoomOneImage,
    alt: "NeoDent Dental Hospital Mehdipatnam — a fully equipped dental treatment room",
    branch: "Mehdipatnam",
    label: "Treatment room",
    position: "50% 55%",
  },
  {
    src: mehdipatnamTreatmentRoomTwoImage,
    alt: "NeoDent Dental Hospital Mehdipatnam — a second dental treatment chamber",
    branch: "Mehdipatnam",
    label: "Treatment chamber",
    position: "50% 48%",
  },
  {
    src: mehdipatnamPatientLoungeImage,
    alt: "NeoDent Dental Hospital Mehdipatnam — a quiet patient lounge between chambers",
    branch: "Mehdipatnam",
    label: "Patient lounge",
    position: "50% 55%",
  },
  {
    src: mehdipatnamWaitingHallImage,
    alt: "NeoDent Dental Hospital Mehdipatnam — the main waiting hall outside the consultation chambers",
    branch: "Mehdipatnam",
    label: "Waiting hall",
    position: "50% 42%",
    span: "wide",
  },
  {
    src: nampallyExteriorImage,
    alt: "NeoDent Dental Hospital Nampally — the street frontage and signage",
    branch: "Nampally",
    label: "Street frontage",
    position: "50% 38%",
  },
] as const;

export type HeroBranchPhoto = { src: string; alt: string };
export type HeroBranch = {
  /** Editorial index used for the oversized background numeral. */
  index: string;
  name: string;
  /**
   * Location metadata, one entry per segment. Never an invented address.
   * Kept as parts rather than a pre-joined string so the component can
   * bind each "·" separator to the word before it -- otherwise a narrow
   * mobile column wraps and leaves a separator stranded at the start of
   * a line.
   */
  meta: readonly string[];
  /** Variant token that drives this branch's composition in CSS. */
  variant: "a" | "b";
  plate: HeroBranchPhoto;
  inset: HeroBranchPhoto;
};

export const heroBranches: readonly HeroBranch[] = [
  {
    index: "01",
    name: "Mehdipatnam",
    meta: ["Dental hospital", "Hyderabad"],
    variant: "a",
    plate: {
      src: mehdipatnamInteriorImage,
      alt: "NeoDent Dental Hospital Mehdipatnam interior — the patient waiting lounge",
    },
    inset: {
      src: mehdipatnamExteriorImage,
      alt: "NeoDent Dental Hospital Mehdipatnam exterior — the entrance doorway and registration counter",
    },
  },
  {
    index: "02",
    name: "Nampally",
    meta: ["Medwin Hospital Complex", "Hyderabad"],
    variant: "b",
    plate: {
      src: nampallyExteriorImage,
      alt: "NeoDent Dental Hospital Nampally exterior — the street frontage and signage",
    },
    inset: {
      src: nampallyInteriorImage,
      alt: "NeoDent Dental Hospital Nampally interior — the reception and registration counter",
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
  /** Editorial index used by the channel list and the ghost numeral system. */
  index: string;
  /** Channel label for the index list. Kept to one or two words. */
  channel: string;
  /**
   * Caption parts, outlet only — never a person. Kept as parts rather
   * than a pre-joined string so the component can bind each "·"
   * separator to the word before it with a non-breaking space, exactly
   * as heroBranches does; otherwise a narrow column wraps and strands a
   * separator at the start of a line.
   */
  source: readonly string[];
  /** Variant token that drives this plate's composition in CSS. */
  variant: "press" | "media" | "award";
  src: string;
  alt: string;
  sizes: string;
};

/* Order is the reading order of the evidence: press, then public
   media, then the institutional recognition band. The awards plate is
   the conditional third plane — it earns its place only because the
   band crop (see --record-* tokens in globals.css) reads as a wall of
   recognition rather than a trophy shelf. */
export const heroRecordItems: readonly HeroRecordItem[] = [
  {
    index: "01",
    channel: "Press",
    source: ["The Siasat Daily", "Hyderabad"],
    variant: "press",
    src: siasatPressImage,
    alt: "The Siasat Daily, Hyderabad — newspaper coverage of a NeoDent Dental Hospitals dental implant camp and lecture.",
    sizes: "(max-width: 767px) 46vw, (max-width: 1023px) 40vw, 30vw",
  },
  {
    index: "02",
    channel: "Public media",
    source: ["News18 Urdu"],
    variant: "media",
    src: tvInterviewImage,
    alt: "News18 Urdu television — a dental health segment on the programme Hello Parwaz featuring NeoDent Dental Hospitals.",
    sizes: "(max-width: 767px) 40vw, (max-width: 1023px) 36vw, 27vw",
  },
  {
    index: "03",
    channel: "Recognition",
    source: ["Institutional recognition"],
    variant: "award",
    src: awardsWallImage,
    alt: "Awards, mementos and certificates received by NeoDent Dental Hospitals, on display at the hospital.",
    /* Deliberately larger than this plate's rendered width. The plate
       applies a crop zoom on top of object-position (see
       --record-crop-zoom in globals.css), so only part of the served
       file ends up on screen — requesting the plate's own width would
       leave the visible crop soft. */
    sizes: "(max-width: 767px) 70vw, (max-width: 1023px) 58vw, 44vw",
  },
] as const;
