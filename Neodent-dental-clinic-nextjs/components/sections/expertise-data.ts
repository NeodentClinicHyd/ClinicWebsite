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
 * Links: /treatments has sections with ids for full mouth rehabilitation,
 * dental implants, orthodontics, root canal treatment and smile design, so
 * those treatments deep-link to them. Composite build-up (a smile-design
 * technique, per the case shown) links to the smile design section; scaling &
 * polishing has no section of its own, so it links to the directory.
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

/** The treatments directory page (also the closing CTA destination). */
export const allTreatmentsHref = "/treatments";

/** Heading above each treatment's supporting points in the detail panel. */
export const treatmentPointsHeading = "What it can help with";

export const rootCanalTreatmentVideo =
  "/assets/treatment-video/Dr. Miftah Neodent dental clinic Hyderabad-Root canal treatment.mp4";
export const defaultTreatmentVideo =
  "/assets/treatment-video/dr-miftah-neodent-clinical-treatment-detailed.mp4";

export type Treatment = {
  /** Two-digit id used for element ids and React keys (never shown). */
  number: string;
  /** Sentence-case title from source. */
  title: string;
  /** Action word (REPAIR / REPLACE / PRESERVE / ALIGN / REFINE / REBUILD / MAINTAIN). */
  intent: string;
  /** Lucide icon shown on the card while it is not selected. */
  icon: LucideIcon;
  /** One-line card description. */
  summary: string;
  /** Panel overview (about 40-60 words). */
  description: string;
  /** Two or three short supporting points for the panel. */
  points: string[];
  /** Case tag shown in the detail panel (small caps, red). */
  proof?: string;
  /** "After" / primary image (also used as the video poster). */
  visual: string;
  /** Alt text for the primary image. */
  alt: string;
  /** "Before" image — presence enables the before/after compare slider. */
  before?: string;
  /** Alt text for the before image. */
  beforeAlt?: string;
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
    title: "Composite build\u2011up",
    intent: "REPAIR",
    icon: Layers,
    summary: "Restore chipped, worn, or uneven teeth with tooth-coloured restorative material.",
    description:
      "Composite build-up uses tooth-coloured resin that is shaped and bonded directly onto the tooth. It is a conservative way to restore chipped, worn or uneven teeth and to refine the shape of a smile, usually while keeping as much natural tooth as possible. Whether it suits you depends on the tooth and your bite.",
    points: [
      "Chipped, worn or uneven edges",
      "Small gaps or misshapen teeth",
      "Smaller changes that may not need a crown",
    ],
    proof: "REAL CASE / COMPOSITE SMILE DESIGN",
    visual:
      "/assets/treatment/Neodent dental hospital Treatment - Composite build up smile design after.jpg",
    before:
      "/assets/treatment/Neodent dental hospital Treatment - Composite build up smile design  before.jpg",
    alt: "Composite build-up smile design after treatment",
    beforeAlt: "Smile before composite build-up treatment",
    video: true,
    href: "/treatments#smile-design",
  },
  {
    number: "02",
    title: "Dental implants",
    intent: "REPLACE",
    icon: Anchor,
    summary: "Replace missing teeth with implant-supported restorations planned for your needs.",
    description:
      "A dental implant is a small fixture placed in the jaw to support a crown, bridge or denture in place of a missing tooth. Treatment is planned around function, your bite and a natural-looking result, beginning with an assessment of your oral health and the bone available. Healing time and the number of visits vary from patient to patient.",
    points: [
      "Replacing a single missing tooth",
      "Restoring several teeth or a full arch",
      "Giving a bridge or denture firmer support",
    ],
    visual:
      "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - after surgery.jpg",
    before:
      "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - before surgery.jpg",
    alt: "Upper arch rehabilitation with implants after surgery at Neodent Dental Hospital",
    beforeAlt: "Upper arch rehabilitation before surgery at Neodent Dental Hospital",
    proof: "REAL CASE / UPPER ARCH REHABILITATION",
    href: "/treatments#dental-implants",
  },
  {
    number: "03",
    title: "Root canal treatment",
    intent: "PRESERVE",
    icon: Microscope,
    summary: "Treat infection inside a tooth while helping preserve your natural tooth.",
    description:
      "Root canal treatment removes infected or inflamed tissue from inside a tooth so that the natural tooth can often be kept. The canals are cleaned, shaped and sealed, and the tooth is then restored, commonly with a crown. After an examination and X-ray, your dentist will explain whether it is the right option for you.",
    points: [
      "Ongoing or throbbing tooth pain",
      "Deep decay that has reached the nerve",
      "A tooth that might otherwise need extracting",
    ],
    visual: "/assets/treatment/after treatment.jpg",
    alt: "Root canal treatment at Neodent Dental Hospital",
    proof: "REAL CASE / RESTORATIVE CARE",
    video: true,
    videoSrc: rootCanalTreatmentVideo,
    href: "/treatments#root-canal-treatment",
  },
  {
    number: "04",
    title: "Braces & orthodontics",
    intent: "ALIGN",
    icon: AlignHorizontalDistributeCenter,
    summary: "Improve tooth alignment and bite through a personalised orthodontic plan.",
    description:
      "Orthodontic treatment moves teeth gradually into better positions, improving how they fit together as well as how they look. After an assessment, your dentist will talk through the options that suit your teeth and bite, how long treatment may take and how to look after your teeth and gums while it is under way.",
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
    proof: "REAL CASE / SMILE ALIGNMENT",
    href: "/treatments#orthodontics",
  },
  {
    number: "05",
    title: "Smile design",
    intent: "REFINE",
    icon: Smile,
    summary: "Explore cosmetic treatments that improve the appearance of your smile.",
    description:
      "Smile design is a planned approach to improving how your smile looks. It considers the shape, colour and proportion of your teeth alongside your gums and face, then brings together suitable treatments, such as crowns, veneers or composite work, for a natural result. Planning starts with listening to what you would like to change.",
    points: [
      "Chipped, discoloured or uneven teeth",
      "Teeth that differ in size or shape",
      "Restoring a smile after an accident or wear",
    ],
    proof: "REAL CASE / ZIRCONIA CROWNS",
    visual:
      "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -after treatment.jpg",
    before:
      "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -before treatment.jpg",
    alt: "Anterior smile design with zirconia crowns after treatment",
    beforeAlt: "Anterior smile before zirconia crown treatment",
    href: "/treatments#smile-design",
  },
  {
    number: "06",
    title: "Full mouth rehabilitation",
    intent: "REBUILD",
    icon: Crown,
    summary: "Restore comfort and function through coordinated care for complex dental needs.",
    description:
      "Full mouth rehabilitation is a coordinated plan for patients whose teeth, bite or jaw function need attention across the whole mouth. It can bring together restorative work, dental implants and prosthodontic care, carried out in stages and sequenced around your oral health, so that function and appearance are rebuilt together.",
    points: [
      "Multiple missing or damaged teeth",
      "Worn teeth and changes in how you bite",
      "Care planned in stages over several visits",
    ],
    visual:
      "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg",
    before:
      "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - before surgery.jpg",
    alt: "Full mouth rehabilitation with implants after surgery",
    beforeAlt: "Full mouth condition before implant rehabilitation",
    proof: "REAL CASE / FULL MOUTH REHABILITATION",
    href: "/treatments#full-mouth-rehabilitation",
  },
  {
    number: "07",
    title: "Scaling & polishing",
    intent: "MAINTAIN",
    icon: Sparkles,
    summary: "Remove plaque and hardened deposits to support cleaner, healthier-feeling teeth.",
    description:
      "Scaling and polishing is a professional clean that removes plaque and tartar from the teeth, including just below the gum line, followed by polishing to lift surface stains. It supports gum health and everyday oral hygiene, and is usually part of regular dental check-ups rather than a one-off treatment.",
    points: [
      "Plaque and tartar build-up",
      "Surface stains from tea, coffee or tobacco",
      "Keeping gums healthy between check-ups",
    ],
    visual:
      "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment after.jpg",
    before:
      "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment before.jpg",
    alt: "Scaling and polishing result at Neodent Dental Hospital",
    beforeAlt: "Teeth before scaling and polishing at Neodent Dental Hospital",
    proof: "REAL CASE / GUM HEALTH",
    href: "/treatments",
  },
];

/** Closing discovery card (ivory surface). Links to the treatments directory. */
export const closingCta = {
  heading: "Not sure which treatment you need?",
  text: "Explore our treatments or speak with our team to understand your options.",
  linkLabel: "Explore all treatments",
  href: allTreatmentsHref,
};
