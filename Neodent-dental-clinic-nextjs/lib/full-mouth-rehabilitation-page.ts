/* ------------------------------------------------------------------
   /treatments/full-mouth-rehabilitation — single source of truth.

   Flags, route constants, breadcrumb trail, FAQ, related treatments and
   ALL section copy live here, so the visible page, the metadata and the
   JSON-LD can never drift apart. Phones, addresses, hours and directions
   links are NOT defined here; they come from lib/site-data.ts.

   Copy rules for this file (owner brief): the main term is "full mouth
   rehabilitation"; the alternative term appears exactly once (the overview
   note). No prices, no timelines, no outcome promises, no success rates.
   ------------------------------------------------------------------ */
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";
import { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE } from "@/lib/dental-implants-page";

/* Re-exported so this file stays the one import for the page. Both values
   are owned by the implants lib (same wording, same links). */
export { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE };

export const PAGE_PATH = "/treatments/full-mouth-rehabilitation";

/** Single switch for the WHOLE cases section (all patient imagery and the
 *  patient film). The hero uses a non-patient clinic photograph and is
 *  unaffected. Typed as boolean (not the literal `true`) so the flag-off
 *  branch is still type-checked. */
export const SHOW_FMR_CASE_IMAGES: boolean = true;

/** Dr. Miftah's full mouth rehabilitation pair is withheld by default: the
 *  "after" photograph shows an unmasked lower face (nose, beard, moles), and
 *  no consent record for publishing it is known. Set to true only once the
 *  owner confirms consent. Only has an effect while SHOW_FMR_CASE_IMAGES is
 *  true. */
export const SHOW_MIFTAH_FMR_PAIR: boolean = false;

/** Rendered only when BOTH are non-empty. */
export const REVIEWED_BY = "";
export const LAST_REVIEWED = "";

/* Breadcrumb trail, shared by the visible breadcrumb and the
   BreadcrumbList JSON-LD. */
export const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treatments", path: "/treatments" },
  { name: featuredTreatmentTitle("full-mouth-rehabilitation"), path: PAGE_PATH },
];

/* ---------------- Metadata ---------------- */
export const META_TITLE = "Full Mouth Rehabilitation in Nampally & Mehdipatnam | Neodent";
export const META_DESCRIPTION =
  "A planned, step-by-step approach for many affected teeth: what a plan can include, how it is made, risks, and questions to ask. Both Neodent clinics.";
export const PROCEDURE_NAME = "Full mouth rehabilitation";

/* ---------------- Rich text (highlighted phrases) ---------------- */
export type RichPart = string | { h: string; tone: "primary" | "secondary" | "quiet" };
export type Rich = RichPart[];

/* ---------------- 1. Hero ---------------- */
export const HERO = {
  sans: "Full mouth rehabilitation,",
  accent: "planned step by step.",
  lede: [
    "Full mouth rehabilitation is a ",
    { h: "planned, step-by-step", tone: "primary" },
    " approach to restoring the health, function and appearance of the teeth when ",
    { h: "many teeth are affected", tone: "secondary" },
    ". What it includes depends on a ",
    { h: "detailed assessment", tone: "quiet" },
    " by your dentist.",
  ] as Rich,
  image: "/assets/neodent-clinic-mehdipatnam/web/neodent-dental-hospital-mehdipatnam-treatment-room-2-1280.jpg",
  imageAlt: "Treatment room with a pink dental chair and wooden cabinets, Neodent Dental Hospital, Mehdipatnam",
  captionLabel: "Treatment room",
  captionPlace: "Mehdipatnam",
};

/* ---------------- 2. What is it ---------------- */
export const OVERVIEW = {
  sans: "What is full mouth",
  accent: "rehabilitation?",
  lede: [
    "Full mouth rehabilitation is a ",
    { h: "coordinated plan", tone: "primary" },
    " to restore the health, function and appearance of the whole mouth when many teeth are affected. It is not one procedure. It brings several kinds of dental care together and puts them in a sensible order.",
  ] as Rich,
  /* The ONLY mention of the alternative term on the page. The second and
     third sentences are existing site copy (expertise-data / TreatmentAtlas),
     kept verbatim. */
  note: [
    "The same idea is also called full mouth reconstruction. Depending on the assessment, it may combine ",
    { h: "restorative, implant, gum or bite-related care", tone: "quiet" },
    ". The dentist explains what the plan includes, the order of treatment and how follow-up will work; there is no single plan that suits everyone.",
  ] as Rich,
  mediaCaption: "How several kinds of care come together in one plan",
  cards: [
    {
      title: "A plan, not one procedure",
      text: "Separate treatments are joined into one coordinated plan.",
    },
    {
      title: "Planned around the whole mouth",
      text: "Teeth, gums and the way your teeth meet are considered together.",
    },
    {
      title: "Shaped by your assessment",
      text: "What it includes depends on an examination. Worn or sensitive teeth alone do not mean you need it.",
    },
  ],
  termsTitle: "Terms you may hear",
  terms: [
    { term: "Bruxism", meaning: "grinding or clenching of the teeth" },
    { term: "Tooth wear", meaning: "loss of tooth surface from grinding, chewing or acid" },
    { term: "Bite height", meaning: "how far apart the upper and lower teeth sit when closed" },
    { term: "Occlusion", meaning: "the way the upper and lower teeth meet" },
  ],
};

/* ---------------- 3. When might it be discussed ---------------- */
export const WHEN = {
  sans: "When might it be",
  accent: "discussed?",
  intro: [
    "Your dentist may raise it when problems affect ",
    { h: "many teeth rather than one", tone: "primary" },
    ". These are reasons to book an assessment, not a diagnosis.",
  ] as Rich,
  cards: [
    {
      slot: "M2a",
      title: "Multiple missing teeth",
      text: "Several teeth are missing, or cannot be saved.",
    },
    {
      slot: "M2b",
      title: "Worn or damaged teeth",
      text: "Heavy wear, cracked or broken teeth, decay, or large fillings that are failing.",
    },
    {
      slot: "M2c",
      title: "Bite and grinding",
      text: "Significant bite problems, or heavy wear from grinding. Severe wear can reduce the remaining tooth structure and change how the bite meets.",
    },
    {
      slot: "M2d",
      title: "Gum health",
      text: "Severe gum disease. Gum health is usually dealt with early in a plan.",
    },
  ] as { slot: "M2a" | "M2b" | "M2c" | "M2d"; title: string; text: string }[],
  foot: "Worn or sensitive teeth do not, on their own, mean this treatment is needed. Only an examination can say.",
};

/* ---------------- 4. What a plan can include ---------------- */
export type IncludeLink = { label: string; href: string };
export const INCLUDE = {
  sans: "What a plan can",
  accent: "include.",
  intro: [
    "A plan is built from the care your mouth needs, so it ",
    { h: "differs from person to person", tone: "primary", },
    ". These are kinds of treatment a plan may draw on.",
  ] as Rich,
  examplesLabel: "Examples:",
  cards: [
    {
      slot: "M3a",
      title: "Restorative",
      text: "Rebuilding or replacing damaged and missing teeth.",
      examples: "onlays, crowns, bridges, veneers, implants, dentures",
      links: [
        { label: featuredTreatmentTitle("dental-implants"), href: "/treatments/dental-implants" },
        { label: featuredTreatmentTitle("composite-build-up"), href: "/treatments/composite-build-up" },
      ] as IncludeLink[],
    },
    {
      slot: "M3b",
      title: "Gum health",
      text: "Gum health is usually looked at early.",
      examples: "scaling and root planing, gum grafting",
      links: [
        { label: featuredTreatmentTitle("scaling-polishing"), href: "/treatments/scaling-and-polishing" },
      ] as IncludeLink[],
    },
    {
      slot: "M3c",
      title: "Alignment",
      text: "Where the position of teeth contributes to the problem.",
      examples: "braces",
      links: [
        { label: featuredTreatmentTitle("braces-orthodontics"), href: "/treatments/braces-and-orthodontics" },
      ] as IncludeLink[],
    },
    {
      slot: "M3d",
      title: "Bite",
      text: "Protecting how your teeth meet.",
      examples: "adjusting the bite, a splint where grinding is involved",
      links: [] as IncludeLink[],
    },
    {
      slot: "M3e",
      title: "Cosmetic",
      text: "Shape and colour.",
      examples: "whitening, bonding, reshaping",
      links: [
        { label: featuredTreatmentTitle("smile-design"), href: "/treatments/smile-design" },
      ] as IncludeLink[],
    },
  ] as {
    slot: "M3a" | "M3b" | "M3c" | "M3d" | "M3e";
    title: string;
    text: string;
    examples: string;
    links: IncludeLink[];
  }[],
  note: "Which of these are part of your plan, and which clinicians carry out each part, is confirmed at your consultation.",
};

/* ---------------- 5. How a plan is made, then treated in stages ---------------- */
export const PLAN = {
  /* Section heading: "How a plan is <em>made</em>, then treated in stages."
     (two lines: "How a plan is made," / "then treated in stages."). */
  headingLine1: ["How a plan is ", "made", ","] as [string, string, string],
  headingLine2: "then treated in stages.",
  recordsTitle: "How a plan is made",
  recordsIntro: "A plan starts with understanding what is happening in your mouth, and why.",
  records: [
    { slot: "M4a", title: "Your history", text: "Your medical and dental history." },
    { slot: "M4b", title: "Examination and X-rays", text: "A check of your teeth, gums and bite, with X-rays." },
    { slot: "M4c", title: "Scans or impressions", text: "Models of your teeth to plan the work." },
  ] as { slot: "M4a" | "M4b" | "M4c"; title: string; text: string }[],
  recordsNote: "Which records your dentist takes is confirmed at your consultation.",
  stagesTitle: "Treated in stages.",
  stagesIntro: [
    "These are the ",
    { h: "usual stages", tone: "primary" },
    ". Your own plan may differ.",
  ] as Rich,
  stages: [
    {
      slot: "M5a",
      title: "Detailed assessment",
      text: "Your history, examination and records are reviewed to understand what is causing the problems.",
    },
    {
      slot: "M5b",
      title: "A written plan",
      text: "The plan sets out the order of treatment. Urgent problems and gum health are usually dealt with first.",
    },
    {
      slot: "M5c",
      title: "Treatment in phases",
      text: "Care is carried out over several visits, one phase at a time. The number of visits depends on your plan.",
    },
    {
      slot: "M5d",
      title: "Review and maintenance",
      text: "Your bite and restorations are reviewed and regular check-ups continue. Long-term results depend on recalls, and on protecting your teeth from grinding where that applies.",
    },
  ] as { slot: "M5a" | "M5b" | "M5c" | "M5d"; title: string; text: string }[],
  timelineTitle: "How long does it take?",
  timeline: [
    "There is ",
    { h: "no standard timeline", tone: "primary" },
    ". How long a plan takes depends on which treatments it includes, how you heal and how the phases are arranged. Your dentist will give you ",
    { h: "a plan for your own case", tone: "quiet" },
    " at your consultation.",
  ] as Rich,
  statementLead: "A plan built around your mouth,",
  statementEm: "not a template.",
};

/* ---------------- 6. Choosing how to treat many teeth ---------------- */
export const CHOICES = {
  sans: "Choosing how to treat",
  accent: "many teeth",
  intro: [
    "There is ",
    { h: "more than one way", tone: "primary" },
    " to approach several problems. The right choice depends on your mouth, your health and what you want from the result.",
  ] as Rich,
  involvesLabel: "What it involves",
  knowLabel: "Worth knowing",
  options: [
    {
      slot: "M6a",
      name: "Treating each tooth separately",
      involves: "Each problem is treated on its own, for example with a filling, a crown or an implant.",
      know: "Can suit a few separate problems. Your dentist can say whether the cause, such as grinding or gum disease, also needs attention.",
      featured: false,
    },
    {
      slot: "M6b",
      name: "A phased full mouth plan",
      involves: "Problems are assessed together and treated in a planned order over several visits.",
      know: "Involves time, cost and commitment. Ask whether you can pause between stages.",
      featured: true,
    },
    {
      slot: "M6c",
      name: "Review and monitor",
      involves: "Your dentist watches the problem and reviews it at check-ups.",
      know: "Some problems change over time. Severe wear, for example, can reduce the remaining tooth structure.",
      featured: false,
    },
  ] as {
    slot: "M6a" | "M6b" | "M6c";
    name: string;
    involves: string;
    know: string;
    featured: boolean;
  }[],
};

/* ---------------- 7. Aftercare, risks and limits ---------------- */
export const AFTERCARE = {
  sans: "Aftercare,",
  accent: "risks and limits",
  careTitle: "Looking after the results",
  careIntro: "Aftercare depends on which treatments are included. Follow your own dentist's written instructions.",
  care: [
    {
      slot: "M7a",
      lead: "Clean every day.",
      text: "Brush with fluoride toothpaste and clean between your teeth.",
    },
    {
      slot: "M7b",
      lead: "Keep your check-ups.",
      text: "How long restorations last depends on regular recalls.",
    },
    {
      slot: "M7c",
      lead: "Look after your gums.",
      text: "Gum disease and decay can be reduced with daily cleaning.",
    },
    {
      slot: "M7d",
      lead: "If you grind your teeth,",
      text: "ask about protection such as a splint. It may need to continue after treatment.",
    },
  ] as { slot: "M7a" | "M7b" | "M7c" | "M7d"; lead: string; text: string }[],
  risksTitle: "Risks and limits",
  risks: [
    {
      text: "Each treatment in a plan has its own risks. See the page for each treatment.",
      link: { label: featuredTreatmentTitle("dental-implants"), href: "/treatments/dental-implants" },
    },
    { text: "Grinding is linked to a higher chance of restorations failing, most often by fracturing." },
    { text: "Whether implants suit someone who grinds is decided case by case." },
    { text: "Large plans take time, cost and commitment." },
    {
      text: "There are few long-term studies, so plans rely heavily on your dentist's clinical judgement. Outcomes vary from person to person.",
    },
  ] as { text: string; link?: { label: string; href: string } }[],
  urgentTitle: "Call the clinic where you were treated if you notice:",
  urgent: [
    "increasing swelling",
    "fever",
    "bleeding that will not stop",
    "a loose crown, bridge or implant",
    "numbness that does not settle",
  ],
};

/* ---------------- 8. Cases ---------------- */
export const CASES = {
  sans: "Full mouth rehabilitation cases",
  accent: "from Neodent.",
  intro: [
    "Photographs from ",
    { h: "treatment at Neodent", tone: "secondary" },
    ", shown so you can see what treatment can involve. Every case is different, and these images are ",
    { h: "not a prediction for your own mouth", tone: "quiet" },
    ".",
  ] as Rich,
  /* Mehdipatnam pair (960x1280 and 527x704, both 3:4). A mosaic over the
     eyes is baked into both files; they are shown whole, never cropped. */
  mehdipatnam: {
    before: "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - before surgery.jpg",
    after: "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg",
    beforeAlt: "Lower face and teeth before full mouth rehabilitation with dental implants, Mehdipatnam case",
    afterAlt: "Lower face and teeth after full mouth rehabilitation with dental implants, Mehdipatnam case",
    place: "Mehdipatnam",
    label: "Full mouth rehabilitation with dental implants",
  },
  /* Dr. Miftah's pair (WebP copies). Gated by SHOW_MIFTAH_FMR_PAIR. */
  miftah: {
    before: "/assets/dr-miftah/treatments/web/dr-md-miftah-ur-rahman-full-mouth-rehabilitation-before.webp",
    after: "/assets/dr-miftah/treatments/web/dr-md-miftah-ur-rahman-full-mouth-rehabilitation-after.webp",
    beforeAlt: "Close-up of the mouth with implant abutments before treatment, Dr. Md. Miftah Ur Rahman's case",
    afterAlt: "Close-up of the smile after full mouth rehabilitation, Dr. Md. Miftah Ur Rahman's case",
    name: "Dr. Md. Miftah Ur Rahman",
    label: "Before and after treatment",
  },
  video: {
    src: "/assets/treatment-video/neodent-full-mouth-rehabilitation-using-dental-implants.mp4",
    poster:
      "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg",
    ariaLabel: "Full mouth rehabilitation using dental implants at Neodent Dental Hospital Mehdipatnam",
    playLabel: "Play the full mouth rehabilitation film",
    place: "Mehdipatnam",
    label: "Full mouth rehabilitation using dental implants",
  },
  evidence:
    "Supplied before and after clinical photographs from full mouth rehabilitation at Neodent. Photographs are shown for patient understanding; treatment and its outcome vary from patient to patient.",
  privacyLead: "Images are published in line with our ",
  privacyLinkText: "privacy policy",
  privacyHref: "/privacy-policy",
};

/* ---------------- 9. Questions to ask + doctor ---------------- */
export const QUESTIONS = {
  sans: "Questions to ask",
  accent: "your dentist",
  list: [
    "What is causing the problems, and will treating only the symptoms hold up?",
    "What does the full plan include, in what order, and with which clinicians?",
    "Can I do it in stages and stop between them?",
    "How will my bite be checked and protected afterwards?",
    "What will it involve in time and follow-up?",
    "What happens if one part of the plan fails?",
  ],
  doctor: {
    name: "Dr. Md. Miftah Ur Rahman",
    designation: "Prosthodontist and Implantologist",
    qualifications: "BDS, MDS, FICOI",
    treatmentLabel: "Your treatment",
    treatment: [
      "Which clinicians plan and carry out each stage of your treatment is ",
      { h: "confirmed at your consultation", tone: "primary" },
      ".",
    ] as Rich,
    profileHref: "/doctors/dr-miftah-ur-rahman",
    imageAlt: "Dr. Md. Miftah Ur Rahman, smiling, arms folded, in a white coat",
  },
};

/* ---------------- 10. FAQ ---------------- */
/* ONE source for the visible accordion and the FAQPage JSON-LD. Answers are
   plain text; `links` only tells the accordion which words to link. */
export type FmrFaqItem = {
  question: string;
  answer: string;
  links?: { text: string; href: string }[];
};

export const FAQ_HEADING = { sans: "Full mouth rehabilitation questions,", accent: "answered." };

export const FMR_FAQ: FmrFaqItem[] = [
  {
    question: "What is full mouth rehabilitation?",
    /* Verbatim from lib/treatments-hub.ts (TREATMENTS_FAQ). */
    answer:
      "Full mouth rehabilitation is a comprehensive approach to restoring oral health and function when multiple teeth are affected. It may involve a combination of treatments such as dental implants, crowns, bridges and other restorative procedures, planned together to address the overall condition.",
  },
  {
    question: "When might full mouth rehabilitation be discussed?",
    answer:
      "When many teeth are affected, for example by several missing teeth, cracked or broken teeth, decay or failing large fillings, heavy wear from grinding, significant bite problems or severe gum disease. These are reasons to book an assessment, not a diagnosis.",
  },
  {
    question: "How is a plan made?",
    answer:
      "Your dentist reviews your medical and dental history and examines your mouth. Records such as X-rays and scans or impressions may be taken. The plan sets out the order of treatment, usually dealing with urgent problems and gum health first.",
  },
  {
    question: "How long does full mouth rehabilitation take?",
    answer:
      "There is no standard timeline. It depends on which treatments are included, how you heal and how the phases are arranged. Your dentist will give you a plan for your own case at your consultation.",
  },
  {
    question: "Will I need dental implants?",
    answer:
      "Not necessarily. Implants are one way to replace missing teeth. A plan may use other restorations such as crowns, bridges or dentures, and may include other care. Your dentist explains the choices after an examination.",
  },
  {
    question: "Can it be done in stages?",
    answer:
      "Plans are usually carried out in phases over several visits. Whether there are points where you can pause depends on your plan, so it is worth asking at your consultation.",
  },
  {
    question: "What if I grind my teeth?",
    answer:
      "Heavy grinding can wear teeth and is linked to a higher chance of restorations failing, most often by fracturing. If grinding is part of the picture, your dentist may discuss protection such as a splint, which may need to continue after treatment. Whether implants suit someone who grinds is decided case by case.",
  },
  {
    question: "How much does full mouth rehabilitation cost?",
    answer:
      "The cost depends on which treatments your plan includes, how many teeth are involved and whether anything needs treating first. Your dentist can give you an estimate for your own plan after an examination. Large plans involve time, cost and commitment.",
  },
  {
    question: "How do I look after my teeth afterwards?",
    answer:
      "Aftercare depends on which treatments are included, so follow your own dentist's written instructions. In general, clean your teeth and between them every day, keep your check-ups and protect your teeth from grinding if advised.",
  },
  {
    question: "Where can I get full mouth rehabilitation in Hyderabad?",
    answer:
      "Neodent Dental Hospital offers full mouth rehabilitation consultations at its Nampally and Mehdipatnam clinics in Hyderabad. Call the clinic you would like to visit.",
    links: [
      { text: "Nampally", href: BRANCH_PAGE_HREF.nampally },
      { text: "Mehdipatnam", href: BRANCH_PAGE_HREF.mehdipatnam },
    ],
  },
];

export const FAQ_CTA_TITLE = "Ready to talk it through?";

/* ---------------- 11. Locations ---------------- */
export const LOCATIONS = {
  sans: "Where to",
  accent: "find us.",
  intro: [
    { h: "Full mouth rehabilitation consultations", tone: "primary" },
    " are available at ",
    { h: "both Neodent clinics", tone: "secondary" },
    " in Hyderabad. Call ",
    { h: "the clinic you would like to visit", tone: "quiet" },
    ".",
  ] as Rich,
};

/* ---------------- 12. Related ---------------- */
/* Descriptions are the existing homepage card summaries
   (components/sections/expertise-data.ts), not newly written. */
export const RELATED = [
  {
    title: featuredTreatmentTitle("dental-implants"),
    description: "Replace a missing tooth with an implant-supported crown, bridge or denture.",
    href: "/treatments/dental-implants",
  },
  {
    title: featuredTreatmentTitle("smile-design"),
    description: "Plan cosmetic options around the changes you want to make to your smile.",
    href: "/treatments/smile-design",
  },
  {
    title: featuredTreatmentTitle("composite-build-up"),
    description: "Rebuild part of a damaged tooth with tooth-coloured composite resin.",
    href: "/treatments/composite-build-up",
  },
];
