/* ------------------------------------------------------------------
   /treatments hub: constants, the treatment index, and the FAQ.

   Nothing here is new copy. Treatment names come from
   lib/featured-treatment-catalog.ts, short summaries / alt text / image
   paths from components/sections/expertise-data.ts (the home cards),
   long descriptions and the "concerns addressed" rows from
   lib/treatment-data.ts and expertise-data.ts, and every other string
   is moved verbatim from the previous /treatments components.
   ------------------------------------------------------------------ */
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";
import type { FeaturedTreatmentId } from "@/lib/featured-treatment-catalog";
import {
  additionalServices,
  featuredTreatment,
  treatmentAtlas,
} from "@/lib/treatment-data";
import {
  closingCta,
  treatments as homeTreatments,
} from "@/components/sections/expertise-data";
import { SITE_URL } from "@/lib/site-data";

/** Set to false if the National Dental Commission advisory review requires it. */
export const SHOW_TREATMENT_CASE_MEDIA = true;

export const HUB_PATH = "/treatments";
export const HUB_BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treatments", path: HUB_PATH },
];

/* ---------------- Names (one spelling on this page) ---------------- */
export const DR_SIRAJ = "Dr. Mohd. Siraj Ur Rahman";
export const DR_MIFTAH = "Dr. Md. Miftah Ur Rahman";
export const DR_MIFTAH_HREF = "/doctors/dr-miftah-ur-rahman";

/* ---------------- Treatment index ---------------- */
export type HubTreatmentImage = {
  src: string;
  alt: string;
  /** CSS object-position that keeps the teeth (not the face) in the card crop. */
  position: string;
  /** Optional zoom (about the same point) to keep the card crop on the teeth. */
  zoom?: number;
};

export type HubTreatmentRow = { label: string; value: string };

export type HubTreatment = {
  /** Target slug of the (future) dedicated page: /treatments/<slug>. */
  slug: string;
  /** id the home page and other pages already link to (/treatments#<anchorId>). */
  anchorId: FeaturedTreatmentId;
  title: string;
  summary: string;
  /** Existing "after" photo. Rendered only when SHOW_TREATMENT_CASE_MEDIA. */
  image?: HubTreatmentImage;
  alt: string;
  /** Only set once the dedicated page exists. */
  href?: string;
  /** Existing long description; rendered under "Read more" while href is unset. */
  longText: string;
  /** Existing "concerns addressed" style rows (shown with longText). */
  rows: HubTreatmentRow[];
  /** Existing "Treated by Dr. Md. Miftah Ur Rahman" deep link, if any. */
  doctorHref?: string;
  /** Existing treatment film (root canal), shown with longText. Patient media. */
  video?: { src: string; caption: string };
};

const ORDER: { id: FeaturedTreatmentId; slug: string; position: string; zoom?: number }[] = [
  { id: "full-mouth-rehabilitation", slug: "full-mouth-rehabilitation", position: "50% 48%" },
  { id: "composite-build-up", slug: "composite-build-up", position: "50% 78%", zoom: 1.45 },
  { id: "dental-implants", slug: "dental-implants", position: "50% 92%" },
  { id: "root-canal-treatment", slug: "root-canal-treatment", position: "50% 55%" },
  { id: "braces-orthodontics", slug: "braces-and-orthodontics", position: "42% 55%" },
  { id: "smile-design", slug: "smile-design", position: "50% 70%", zoom: 1.5 },
  { id: "scaling-polishing", slug: "scaling-and-polishing", position: "50% 50%" },
];

/* Dedicated pages that exist today. Add the slug here when a page ships. */
const EXISTING_PAGES = new Set([
  "dental-implants",
  "full-mouth-rehabilitation",
  "root-canal-treatment",
  "braces-and-orthodontics",
  "composite-build-up",
  "smile-design",
  "scaling-and-polishing",
]);

const atlasById = new Map(
  [featuredTreatment, ...treatmentAtlas].map((item) => [item.id, item]),
);

export const TREATMENTS: HubTreatment[] = ORDER.map(({ id, slug, position, zoom }) => {
  const title = featuredTreatmentTitle(id);
  const home = homeTreatments.find((item) => item.title === title);
  if (!home) throw new Error(`No home summary for ${title}`);
  const atlas = atlasById.get(id);
  return {
    slug,
    anchorId: id,
    title,
    summary: home.summary,
    image: { src: home.visual, alt: home.alt, position, zoom },
    alt: home.alt,
    href: EXISTING_PAGES.has(slug) ? `/treatments/${slug}` : undefined,
    longText: home.description,
    rows: (atlas?.metadata ?? []).map((m) => ({ label: m.label, value: m.value })),
    doctorHref: atlas?.doctorHref,
    video: atlas?.video,
  };
});

/* The home page's "Not sure which treatment you need?" card. Heading and
   text are the home card's own; it points at /contact on this page. */
export const NOT_SURE_CARD = {
  heading: closingCta.heading,
  text: closingCta.text,
  linkLabel: "Speak with our team",
  href: "/contact",
};

/* ---------------- Additional dental services ---------------- */
export const BEYOND = {
  title: "Additional dental",
  accent: "services.",
  intro:
    "Alongside the featured treatments, Neodent provides a broader range of restorative, cosmetic, preventive and surgical dental services. These services can form part of routine care or be considered alongside more comprehensive treatment, depending on the patient's clinical needs.",
  groups: additionalServices,
};

/* ---------------- Thinking behind treatment ---------------- */
export const DOCTORS = [
  {
    id: "siraj",
    name: DR_SIRAJ,
    role: "Founder & Director",
    image: "/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png",
    imageWidth: 714,
    imageHeight: 623,
    alt: `${DR_SIRAJ}, Prosthodontist and Implantologist, founder and director of Neodent Dental Hospital`,
    rows: [
      { label: "Qualifications", value: "BDS · FCIP · MDS (Chennai)" },
      { label: "Specialism", value: "Prosthodontist & Implantologist" },
      { label: "Experience", value: "30+ years of clinical practice" },
      {
        label: "Approach",
        value:
          "Specialist training in prosthodontics and implantology, and 30+ years of clinical practice, inform how Neodent assesses and plans treatment for each patient.",
      },
    ],
    href: undefined as string | undefined,
  },
  {
    id: "miftah",
    name: DR_MIFTAH,
    role: "Assistant Director",
    image: "/assets/dr-miftah/Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png",
    imageWidth: 794,
    imageHeight: 741,
    alt: `${DR_MIFTAH}, Prosthodontist and Implantologist, assistant director of Neodent Dental Hospital`,
    rows: [
      { label: "Qualifications", value: "BDS · MDS · FICOI (U.S.A.)" },
      { label: "Specialism", value: "Prosthodontist & Implantologist" },
      { label: "Recognition", value: "Gold Medallist" },
      {
        label: "Approach",
        value:
          "Specialist qualifications in prosthodontics and implantology, including FICOI (U.S.A.), underpin his approach to restorative and implant-based treatment at Neodent.",
      },
    ],
    href: DR_MIFTAH_HREF,
  },
];

/* ---------------- DMLS crowns film (Dr. Miftah explaining; no patient) ---------------- */
export const DMLS = {
  title: "Understanding DMLS Crowns",
  accent: "& Functional Strength",
  src: "/assets/treatment-video/dr-miftah-explains-dmls-crowns-masticatory-efficiency.mp4",
  poster: "/assets/neodent-dmls-crowns-dental-model-front-view.jpg",
  ariaLabel: `${DR_MIFTAH} explaining DMLS crowns and masticatory efficiency`,
  posterAlt:
    "A dental model of DMLS crowns held against a glass plate, front view",
  caption: `${DR_MIFTAH} / DMLS Crowns & Masticatory Efficiency`,
  rows: [
    { label: "Clinician", value: DR_MIFTAH },
    { label: "Qualifications", value: "BDS · MDS · FICOI (U.S.A.)" },
    { label: "Specialism", value: "Prosthodontist & Implantologist" },
  ],
};

/* ---------------- How treatment takes shape ---------------- */
export const PLANNING = {
  title: "How treatment",
  accent: "takes shape.",
  steps: [
    { label: "Understand", text: "Understand the patient's concern, symptoms and goals." },
    { label: "Assess", text: "Evaluate the dental condition and areas requiring attention." },
    { label: "Plan", text: "Consider suitable treatment options based on the clinical situation." },
    { label: "Treat", text: "Carry out the selected treatment and appropriate follow-up." },
  ],
  image: "/assets/neodent-clinic-mehdipatnam/Neodent dental hospital mehdipatnam treatment room 1.jpeg",
  imageAlt:
    "Neodent Dental Hospital Mehdipatnam — a fully equipped dental treatment room",
};

/* ---------------- Work: films + cases (patient media) ---------------- */
export const FEATURE_FILM = {
  title: "Full Mouth Rehabilitation",
  src: "/assets/treatment-video/neodent-full-mouth-rehabilitation-using-dental-implants.mp4",
  poster:
    "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg",
  ariaLabel:
    "Full mouth rehabilitation using dental implants at Neodent Dental Hospital Mehdipatnam",
  caption:
    "Full Mouth Rehabilitation Using Dental Implants / Neodent Dental Hospital · Mehdipatnam",
  metaLabel: "Clinical Film",
};

export const REELS = [
  {
    id: "clinical-detail",
    title: "Clinical Treatment Detail",
    context: "Real clinical treatment by the Neodent team",
    src: "/assets/treatment-video/dr-miftah-neodent-clinical-treatment-detailed.mp4",
    poster: "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg",
    posterAlt: "The reception and consultation wing at Neodent Dental Hospital Nampally",
  },
  {
    id: "crown-cementation",
    title: "Crown Cementation",
    context: `Cementation procedure / ${DR_MIFTAH}`,
    src: "/assets/treatment-video/dr-miftah-neodent-crown-cementation-procedure.mp4",
    poster: "/assets/neodent-dmls-crowns-dental-model-side-view.jpg",
    posterAlt: "A dental model of DMLS crowns held against a glass plate, side view",
  },
  {
    id: "procedure",
    title: "Treatment in Practice",
    context: "Clinical dental procedure at Neodent",
    src: "/assets/treatment-video/dr-miftah-neodent-dental-treatment-procedure.mp4",
    poster: "/assets/Dr Siraj and Dr. Miftah Neodent dental clinic - during treatment.webp",
    posterAlt: "Clinical dental treatment in progress at Neodent Dental Hospital",
  },
];

export const CASES = [
  {
    id: "smile-design",
    title: "Anterior Smile Design",
    description: "Smile restoration following an accident, using zirconia crowns",
    before:
      "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -before treatment.jpg",
    after:
      "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -after treatment.jpg",
    alt: "Anterior smile design case at Neodent",
    beforePosition: "50% 56%",
    afterPosition: "50% 66%",
  },
  {
    id: "full-mouth-mehdipatnam",
    title: "Full Mouth Rehabilitation with Implants",
    description: "Comprehensive rehabilitation using dental implants at Mehdipatnam",
    before:
      "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - before surgery.jpg",
    after:
      "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg",
    alt: "Full mouth rehabilitation case at Neodent Mehdipatnam",
    beforePosition: "50% 60%",
    afterPosition: "50% 48%",
  },
  {
    id: "upper-arch-nampally",
    title: "Upper Arch Rehabilitation with Implants",
    description: "Upper arch restoration using implant-supported prosthetics at Nampally",
    before:
      "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - before surgery.jpg",
    after:
      "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - after surgery.jpg",
    alt: "Upper arch rehabilitation case at Neodent Nampally",
    beforePosition: "50% 85%",
    afterPosition: "50% 92%",
  },
  {
    id: "scaling-polishing",
    title: "Scaling & Polishing",
    description: "Professional cleaning and polishing treatment",
    before:
      "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment before.jpg",
    after:
      "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment after.jpg",
    alt: "Scaling and polishing treatment at Neodent",
    beforePosition: "50% 50%",
    afterPosition: "50% 50%",
  },
];

/* ---------------- Experience, evidence ---------------- */
export const EVIDENCE = {
  title: "Experience, evidence",
  accent: "& what patients see.",
  statement:
    "Three decades of practice, two Hyderabad locations, and a clinical approach built around considered care.",
  experience: [
    { strong: "Established 1994", text: "Three decades of clinical practice in Hyderabad" },
    { strong: "Specialist-Led", text: "Prosthodontic and implant expertise" },
    { strong: "Two Locations", text: "Mehdipatnam and Nampally, Hyderabad" },
  ],
  ratingsLabel: "Patient reviews",
  ratings: [
    { branch: "Mehdipatnam", score: "4.3", stars: "★★★★☆", reviews: "260 reviews" },
    { branch: "Nampally", score: "4.5", stars: "★★★★½", reviews: "155 reviews" },
  ],
};

/* ---------------- FAQ (same array drives the accordion and the schema) ---------------- */
export const TREATMENTS_FAQ = [
  {
    question: "How do I know which dental treatment I need?",
    answer:
      "Treatment recommendations are based on a clinical assessment of your dental condition. During a consultation, the dentist will evaluate your oral health and discuss suitable treatment options with you based on your specific concerns and goals.",
  },
  {
    question: "What is full mouth rehabilitation?",
    answer:
      "Full mouth rehabilitation is a comprehensive approach to restoring oral health and function when multiple teeth are affected. It may involve a combination of treatments such as dental implants, crowns, bridges and other restorative procedures, planned together to address the overall condition.",
  },
  {
    question: "When are dental implants considered?",
    answer:
      "Dental implants may be considered as a treatment option for replacing one or more missing teeth. The suitability of implants depends on factors including the condition of the jawbone, overall oral health, and individual patient factors, which are assessed during consultation.",
  },
  {
    question: "What is root canal treatment?",
    answer:
      "Root canal treatment is a procedure aimed at addressing problems within the inner portion of an affected tooth. The goal is to preserve the natural tooth where clinically appropriate, rather than extracting it.",
  },
  {
    question: "What is smile designing?",
    answer:
      "Smile designing refers to the aesthetic planning and treatment focused on improving the appearance of the smile. This may involve procedures such as veneers, crowns, orthodontics or other cosmetic dental work, depending on the patient's goals and clinical suitability.",
  },
  {
    question: "Can multiple dental treatments be planned together?",
    answer:
      "Yes, in cases where multiple dental concerns need to be addressed, treatments can be coordinated as part of a comprehensive treatment plan. The sequence and approach will depend on your specific condition and priorities.",
  },
];

/* ---------------- JSON-LD builders ---------------- */
export function collectionPageJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dental treatments",
    url: `${SITE_URL}${HUB_PATH}`,
    description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: TREATMENTS.map((treatment, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: treatment.title,
        ...(treatment.href ? { url: `${SITE_URL}${treatment.href}` } : {}),
      })),
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TREATMENTS_FAQ.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
