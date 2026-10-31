/**
 * Data for Section 03 — Featured Treatment Atlas (homepage Expertise section).
 *
 * The component does not hard-code treatment content. Titles, card summaries,
 * action words, icons, panel overviews and supporting points, case tags, media
 * paths, alt text and links all live here.
 *
 * Panel copy is deliberately general: it explains what each treatment is for
 * and how care usually begins, drawing on what the /treatments page already
 * says. It makes no outcome promises; suitability is always an individual
 * decision after an examination.
 *
 * The canonical patient-facing treatment labels come from
 * lib/featured-treatment-catalog.ts. Treatment links target the matching
 * treatment entry on /treatments; Dental Implants has its own dedicated page.
 */
import {
  AlignHorizontalDistributeCenter,
  Anchor,
  Crown,
  Layers,
  Microscope,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";

/** The treatments directory page (also the closing CTA destination). */
export const allTreatmentsHref = "/treatments";

/** Heading above each treatment's supporting points in the detail panel. */
export const treatmentPointsHeading = "What it can help with";

export const rootCanalTreatmentVideo =
  "/assets/treatment-video/Dr. Miftah Neodent dental clinic Hyderabad-Root canal treatment.mp4";
export const defaultTreatmentVideo =
  "/assets/treatment-video/dr-miftah-neodent-clinical-treatment-detailed.mp4";

/**
 * Mouth-only crop for a photo in the home detail panel's 3:2 frame.
 * `focal` is used as both object-position and transform-origin, and the
 * image is scaled by `zoom` around it. The values were worked out from
 * each photo so the visible area starts below the nose: no eyes and none
 * of the triangle mosaic baked into the source files are ever in frame.
 */
export type MediaCrop = { focal: string; zoom?: number };

export type Treatment = {
  /** Two-digit id used for element ids and React keys (never shown). */
  number: string;
  /** Sentence-case title from source. */
  title: string;
  /** Action word (REPAIR / REPLACE / PRESERVE / ALIGN / REFINE / REBUILD / MAINTAIN). */
  intent: string;
  /** Lucide icon shown on the card (in every state) and in the panel. */
  icon: LucideIcon;
  /** One-line card description. */
  summary: string;
  /** Panel overview (about 40-60 words). */
  description: string;
  /** Two or three short supporting points for the panel. */
  points: string[];
  /** Case tag shown in the detail panel (small caps, red). Must describe
      the media actually shown for this treatment. */
  proof?: string;
  /** "After" / primary image (also the video poster unless `poster` is set).
      Also read by lib/treatments-hub.ts for the /treatments page. */
  visual: string;
  /** Alt text for the primary image. */
  alt: string;
  /** Home panel crop for `visual`. */
  visualCrop?: MediaCrop;
  /** "Before" image — presence enables the before/after compare slider. */
  before?: string;
  /** Alt text for the before image. */
  beforeAlt?: string;
  /** Home panel crop for `before`. */
  beforeCrop?: MediaCrop;
  /** Film poster for the home panel; falls back to `visual`. */
  poster?: string;
  /** Home panel crop for `poster`. */
  posterCrop?: MediaCrop;
  /** True when the media is a clinical film rather than a still comparison. */
  video?: boolean;
  /** Optional explicit video source; falls back to defaultTreatmentVideo. */
  videoSrc?: string;
  /** Destination for the panel's "Explore treatment" link. */
  href: string;
};

export const treatments: Treatment[] = [
  {
    number: "01",
    // Non-breaking hyphen (U+2011) so "build-up" never splits across lines.
    title: featuredTreatmentTitle("composite-build-up"),
    intent: "REPAIR",
    icon: Layers,
    summary: "Rebuild part of a damaged tooth with tooth-coloured composite resin.",
    description:
      "A composite build-up rebuilds part of a damaged tooth with tooth-coloured resin bonded directly to it. A dentist may discuss it for a chip, worn area or decay, after checking how much healthy tooth remains and where the damage is. A filling, inlay, onlay or crown may be more suitable in some cases.",
    points: [
      "Chipped, worn or uneven edges",
      "Small gaps or misshapen teeth",
      "Whether a build-up or another restoration is suitable",
    ],
    // The tag names this card's own photos. The case was previously labelled
    // "COMPOSITE SMILE DESIGN" and played the generic clinical film (a
    // different procedure and patient); the panel now shows this case's own
    // before/after pair in the compare slider.
    proof: "REAL CASE / COMPOSITE BUILD-UP",
    visual:
      "/assets/treatment/Neodent dental hospital Treatment - Composite build up smile design after.jpg",
    visualCrop: { focal: "50% 66%", zoom: 1.86 },
    before:
      "/assets/treatment/Neodent dental hospital Treatment - Composite build up smile design  before.jpg",
    beforeCrop: { focal: "60.2% 68%", zoom: 1.86 },
    alt: "Composite build-up smile design after treatment",
    beforeAlt: "Smile before composite build-up treatment",
    href: "/treatments/composite-build-up",
  },
  {
    number: "02",
    title: featuredTreatmentTitle("dental-implants"),
    intent: "REPLACE",
    icon: Anchor,
    summary: "Replace a missing tooth with an implant-supported crown, bridge or denture.",
    description:
      "A dental implant is a small post placed in the jaw to support a replacement crown, bridge or denture. It is a staged treatment: an assessment helps the dentist consider your oral health and available bone, followed by placement, healing and the restoration. The plan and timing vary from person to person, and implants need ongoing cleaning and check-ups.",
    points: [
      "Replacing a single missing tooth",
      "Restoring several teeth or a full arch",
      "Giving a bridge or denture firmer support",
    ],
    visual:
      "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - after surgery.jpg",
    visualCrop: { focal: "45.8% 70.5%", zoom: 1.6 },
    before:
      "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - before surgery.jpg",
    beforeCrop: { focal: "25% 65.3%", zoom: 1.14 },
    alt: "Upper arch rehabilitation with implants after surgery at Neodent Dental Hospital",
    beforeAlt: "Upper arch rehabilitation before surgery at Neodent Dental Hospital",
    proof: "REAL CASE / UPPER ARCH REHABILITATION",
    href: "/treatments/dental-implants",
  },
  {
    number: "03",
    title: featuredTreatmentTitle("root-canal-treatment"),
    intent: "PRESERVE",
    icon: Microscope,
    summary: "Treat infection or inflammation inside a tooth so it may be kept.",
    description:
      "Root canal treatment addresses inflammation or infection in the soft tissue at the centre of a tooth. The dentist cleans and seals the canals, then restores the tooth; a filling, onlay or crown may be needed. An examination and X-rays help determine whether the tooth can be restored and whether root canal treatment is appropriate.",
    points: [
      "Ongoing or throbbing tooth pain",
      "Deep decay that has reached the nerve",
      "A tooth that might otherwise need extracting",
    ],
    visual: "/assets/treatment/after treatment.jpg",
    alt: "Root canal treatment at Neodent Dental Hospital",
    // The panel shows the root canal film, which explains the treatment on a
    // model board (not a patient case), so the tag says film, not real case.
    // Its poster is the existing root canal page poster (a hand and the model
    // board, no face). `visual` stays for the /treatments hub.
    proof: "TREATMENT FILM / ROOT CANAL TREATMENT",
    poster: "/assets/treatment-video/posters/root-canal-treatment-poster.webp",
    posterCrop: { focal: "50% 46%" },
    video: true,
    videoSrc: rootCanalTreatmentVideo,
    href: "/treatments/root-canal-treatment",
  },
  {
    number: "04",
    title: featuredTreatmentTitle("braces-orthodontics"),
    intent: "ALIGN",
    icon: AlignHorizontalDistributeCenter,
    summary: "Gradually move teeth into position, then use retainers to help hold them.",
    description:
      "Orthodontic treatment moves teeth gradually, usually with braces, and is followed by a retention phase to help keep teeth in their new positions. An orthodontic assessment considers your teeth, bite and goals. Treatment length varies, and careful daily cleaning and keeping adjustment appointments are important while treatment is under way.",
    points: [
      "Crowded or crooked teeth",
      "Gaps between teeth",
      "Bite concerns such as an overbite or underbite",
    ],
    visual:
      "/assets/treatment/Orthodontics after treatment - neodent dental hospital nampally.jpeg",
    before:
      "/assets/treatment/Orthodontics before treatment - neodent dental hospital nampally.jpeg",
    alt: "Orthodontics result after treatment at Neodent Dental Hospital Nampally",
    beforeAlt: "Orthodontics before treatment at Neodent Dental Hospital Nampally",
    // Already a mouth-only photo (no eyes in the source).
    visualCrop: { focal: "50% 55%" },
    beforeCrop: { focal: "50% 55%" },
    proof: "REAL CASE / ORTHODONTICS",
    href: "/treatments/braces-and-orthodontics",
  },
  {
    number: "05",
    title: featuredTreatmentTitle("smile-design"),
    intent: "REFINE",
    icon: Smile,
    summary: "Plan cosmetic options around the changes you want to make to your smile.",
    description:
      "Smile design is a planning approach for people who want to change the appearance of their teeth. Depending on the concern, options may include whitening, bonding, veneers or straightening. The dentist discusses what you would like to change, examines your teeth and explains which options are suitable and what each involves.",
    points: [
      "Chipped, discoloured or uneven teeth",
      "Teeth that differ in colour, size or shape",
      "Comparing suitable cosmetic options",
    ],
    proof: "REAL CASE / SMILE DESIGN WITH ZIRCONIA CROWNS",
    visual:
      "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -after treatment.jpg",
    visualCrop: { focal: "61.8% 65.3%", zoom: 2.13 },
    before:
      "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -before treatment.jpg",
    beforeCrop: { focal: "70.8% 72.5%", zoom: 1.33 },
    alt: "Anterior smile design with zirconia crowns after treatment",
    beforeAlt: "Anterior smile before zirconia crown treatment",
    href: "/treatments/smile-design",
  },
  {
    number: "06",
    title: featuredTreatmentTitle("full-mouth-rehabilitation"),
    intent: "REBUILD",
    icon: Crown,
    summary: "Plan staged care when many teeth or the bite need attention.",
    description:
      "Full mouth rehabilitation is a step-by-step plan for restoring oral health, function and appearance when many teeth are affected. Depending on the assessment, it may combine restorative, implant, gum or bite-related care. The dentist explains what the plan includes, the order of treatment and how follow-up will work; there is no single plan that suits everyone.",
    points: [
      "Multiple missing or damaged teeth",
      "Worn teeth and changes in how you bite",
      "Care planned in stages over several visits",
    ],
    visual:
      "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg",
    visualCrop: { focal: "47.1% 35.7%", zoom: 1.03 },
    before:
      "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - before surgery.jpg",
    beforeCrop: { focal: "50% 61.8%", zoom: 1.07 },
    alt: "Full mouth rehabilitation with implants after surgery",
    beforeAlt: "Full mouth condition before implant rehabilitation",
    proof: "REAL CASE / FULL MOUTH REHABILITATION",
    href: "/treatments/full-mouth-rehabilitation",
  },
  {
    number: "07",
    title: featuredTreatmentTitle("scaling-polishing"),
    intent: "MAINTAIN",
    icon: Sparkles,
    summary: "Remove plaque and tartar, then polish the tooth surfaces.",
    description:
      "Scaling and polishing is a routine professional clean that removes plaque and hardened tartar from the teeth, then polishes their surfaces. It is different from deeper cleaning below the gumline, which may be considered for gum disease. A dentist or hygienist can check your gums and advise whether a routine clean is enough and how often you need one.",
    points: [
      "Plaque and tartar build-up",
      "Surface stains from tea, coffee or tobacco",
      "Advice on cleaning at home and a suitable recall interval",
    ],
    visual:
      "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment after.jpg",
    before:
      "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment before.jpg",
    alt: "Scaling and polishing result at Neodent Dental Hospital",
    beforeAlt: "Teeth before scaling and polishing at Neodent Dental Hospital",
    proof: "REAL CASE / SCALING AND POLISHING",
    href: "/treatments/scaling-and-polishing",
  },
];

/** Closing discovery card (ivory surface). Links to the treatments directory. */
export const closingCta = {
  heading: "Not sure which treatment you need?",
  text: "Explore our treatments or speak with our team to understand your options.",
  linkLabel: "Explore all treatments",
  href: allTreatmentsHref,
};
