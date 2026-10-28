/* ------------------------------------------------------------------
   /treatments/braces-and-orthodontics â€” single source of truth.

   Flags, route constants, breadcrumb trail, FAQ, related treatments and
   ALL section copy live here, so the visible page, the metadata and the
   JSON-LD can never drift apart. Phones, addresses, hours and directions
   links are NOT defined here; they come from lib/site-data.ts.

   Copy rules for this file (owner brief + research pack): the main term is
   "braces and orthodontics"; the one synonym ("teeth straightening")
   appears once, in the first FAQ. No prices, no lifespans, no success
   rates, and NO treatment duration of any kind: where sources disagree the
   page says there is no standard timeline and that it is confirmed at the
   consultation. Outside the types section (section 4) and its FAQ answer,
   nothing here names an appliance beyond fixed braces, retainers, removable
   appliances, headgear and elastics (no aligners, no ceramic, no lingual
   braces), and nothing calls anyone an orthodontist or specialist. Which records are taken is never listed.
   ------------------------------------------------------------------ */
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";
import { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE } from "@/lib/dental-implants-page";
import type { ArtSlotId, PhotoSlotId } from "@/lib/braces-slots";

/* Re-exported so this file stays the one import for the page. Both values
   are owned by the implants lib (same wording, same links). */
export { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE };

export const PAGE_PATH = "/treatments/braces-and-orthodontics";

/** Single switch for the WHOLE cases section (before and after photographs,
 *  disclaimer). Default FALSE: the pair does not visibly show braces, both
 *  photographs show part of a patient's face, and the master reference says
 *  no before-and-after photographs until advertising compliance is cleared.
 *  Typed as boolean (not the literal `false`) so the flag-on branch is still
 *  type-checked. The hero uses a non-patient clinic photograph and is
 *  unaffected. */
export const SHOW_BRACES_CASE_IMAGES: boolean = false;

/** Rendered only when BOTH are non-empty. */
export const REVIEWED_BY = "";
export const LAST_REVIEWED = "";

/* Breadcrumb trail, shared by the visible breadcrumb and the
   BreadcrumbList JSON-LD. */
export const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treatments", path: "/treatments" },
  { name: featuredTreatmentTitle("braces-orthodontics"), path: PAGE_PATH },
];

/* ---------------- Metadata ---------------- */
export const META_TITLE = "Braces & Orthodontics in Nampally & Mehdipatnam | Neodent";
export const META_DESCRIPTION =
  "Learn how braces and orthodontic treatment work, the stages, daily care and retainers. Consultations at Neodent's Nampally and Mehdipatnam clinics.";
export const PROCEDURE_NAME = "Orthodontic treatment with braces";

/* ---------------- Rich text (highlighted phrases) ---------------- */
export type RichPart = string | { h: string; tone: "primary" | "secondary" | "quiet" };
export type Rich = RichPart[];
export type TextLink = { text: string; href: string };

/* ---------------- 1. Hero ---------------- */
export const HERO = {
  sans: "Braces and orthodontics,",
  accent: "from fitting to retainers.",
  lede: [
    "Braces gradually move teeth into a better position, then ",
    { h: "retainers help keep them there", tone: "primary" },
    ". The outcome depends on your assessment and on daily care, so an ",
    { h: "orthodontic consultation", tone: "quiet" },
    " is the place to find what is suitable.",
  ] as Rich,
  /* Non-patient clinic photograph: a treatment room with two dental chairs
     (1280 x 960 WebP copy of the Mehdipatnam "treatment room 1" original).
     No people, no banner, no legible text. It is the same room the implants
     hero uses: the other Mehdipatnam and Nampally photographs carry name
     boards, fee signs, banners or patient images. */
  image:
    "/assets/neodent-clinic-mehdipatnam/web/neodent-dental-hospital-mehdipatnam-treatment-room-1-1280.webp",
  imageAlt:
    "Treatment room with two dental chairs, Neodent Dental Hospital, Mehdipatnam",
  captionLabel: "Treatment room",
  captionPlace: "Mehdipatnam",
};

/* ---------------- 2. What are braces and orthodontic treatment ---------------- */
export const OVERVIEW = {
  sans: "What are braces and",
  accent: "orthodontic treatment?",
  /* Verbatim: the home card / hub description (expertise-data.ts). */
  lede: [
    "Orthodontic treatment moves teeth gradually, usually with braces, and is followed by a ",
    { h: "retention phase to help keep teeth in their new positions", tone: "primary" },
    ". An orthodontic assessment considers your teeth, bite and goals. Treatment length varies, and careful daily cleaning and keeping adjustment appointments are important while treatment is under way.",
  ] as Rich,
  cards: [
    {
      title: "How braces work",
      text: "Brackets are bonded to the teeth and joined by wires. Over time, the teeth are moved gradually into a better position.",
    },
    {
      title: "Two phases",
      text: "Treatment has an active phase, when the teeth are moved, followed by a retention phase, when retainers help hold them in place.",
    },
    {
      title: "Daily habits matter",
      text: "Braces depend heavily on daily habits. Careful daily cleaning and keeping adjustment appointments are important while treatment is under way.",
    },
  ],
  termsTitle: "Terms you may hear",
  terms: [
    { term: "Bracket", meaning: "A small fitting bonded to a tooth that holds the wire." },
    { term: "Wire", meaning: "Runs through the brackets and guides the teeth as they move." },
    { term: "Active phase", meaning: "The part of treatment when the teeth are being moved." },
    {
      term: "Retention phase",
      meaning: "The part after treatment when retainers help hold the teeth in place.",
    },
    {
      term: "Retainer",
      meaning:
        "A removable or fixed appliance given after treatment to help hold the teeth in place.",
    },
  ],
};

/* ---------------- 3. Is orthodontic treatment right for me ---------------- */
export const WHEN = {
  sans: "Is orthodontic treatment",
  accent: "right for me?",
  intro: "These are common reasons to book an assessment, not a diagnosis.",
  strip:
    "Appearance and function are both discussed, and your clinician decides whether treatment is advisable.",
  /* Titles are the existing home card points, verbatim. */
  cards: [
    { slot: "B2a", title: "Crowded or crooked teeth" },
    { slot: "B2b", title: "Gaps between teeth" },
    { slot: "B2c", title: "Bite concerns such as an overbite or underbite" },
  ] as { slot: ArtSlotId; title: string }[],
  pair: [
    {
      title: "What an assessment considers",
      text: "Your teeth, bite and goals. Which records are taken is confirmed at your consultation.",
    },
    {
      title: "Alternatives and good dental health",
      text: "Your clinician discusses the alternatives. Braces depend on you keeping your teeth clean: if cleaning is not possible, accepting the teeth as they are may be the only option. Good dental health is needed before treatment.",
    },
  ],
};

/* ---------------- 4. Types of braces and appliances ---------------- */
/* Build 3: the four types the dentist confirmed verbally (27 Oct 2026):
   metal, ceramic and self-ligating braces, and clear aligners. Written
   confirmation is still needed (see the dentist review list), so
   REVIEWED_BY and LAST_REVIEWED stay empty. The words "ceramic",
   "self-ligating", "clear aligner(s)", "tooth-coloured" and "removable" are
   allowed ONLY in this section and in the "What types of braces are there?"
   FAQ answer. Every type states what it is and widely agreed trade-offs only:
   no claim on comfort, pain, speed, visits, cost or results. Lingual braces
   are deliberately not mentioned. */
export const TYPES = {
  sans: "Types of braces",
  accent: "and appliances.",
  intro:
    "Braces come in more than one form. These are general descriptions of four types, so you can ask informed questions. Which of them suits your teeth, and which are available at which clinic, is confirmed at your consultation.",
  fixedLine:
    "Metal, ceramic and self-ligating braces are all fixed braces: brackets bonded to the teeth and joined by a wire. Clear aligners are removable.",
  tablistLabel: "Types of braces",
  note: "A good question for your assessment: Which options suit me, and why?",
  otherTitle: "Other appliances you may hear about",
  /* Existing copy, verbatim. B3a (fixed braces) is no longer shown: the
     metal, ceramic and self-ligating types now cover it. */
  cards: [
    {
      slot: "B3b",
      name: "Removable appliances and headgear",
      text: "Removable functional appliances and headgear are used in some cases, often for younger patients, to improve the bite.",
    },
    {
      slot: "B3c",
      name: "Elastics",
      text: "Small elastic bands, worn as instructed in some cases.",
    },
  ] as { slot: ArtSlotId; name: string; text: string }[],
  whichTitle: "Which appliance is right for you?",
  whichText:
    "Your clinician explains which options suit your teeth and why. What Neodent offers, and who carries out your treatment, is confirmed at your consultation.",
};

/* The four confirmed appliance types and their current illustrative images.
   Photo slots BT1-BT4 (lib/braces-slots.ts) read these. */
export type BraceTypeId =
  | "metal-braces"
  | "ceramic-braces"
  | "self-ligating-braces"
  | "clear-aligners";

export type BraceType = {
  id: BraceTypeId;
  slot: PhotoSlotId;
  name: string;
  image: { src: string; alt: string; ready: boolean };
  summary: string;
  whatItIs: string;
  different: string;
  keyFacts: { label: string; value: string }[];
  worthKnowing: string[];
};

const TYPES_IMAGE_DIR = "/assets/treatment/braces-types/web";

export const BRACE_IMAGE_CAPTION =
  "AI-generated illustrative images; these are not patient photographs.";

export const BRACE_TYPES: BraceType[] = [
  {
    id: "metal-braces",
    slot: "BT1",
    name: "Metal braces",
    image: {
      src: `${TYPES_IMAGE_DIR}/metal-braces-1200.webp`,
      alt: "Illustrative close-up of teeth fitted with conventional metal braces",
      ready: true,
    },
    summary: "Fixed braces with metal brackets and a wire.",
    whatItIs:
      "Small metal brackets are bonded to the teeth and joined by a wire. Over time, the wire guides the teeth into a better position. Small elastic ties usually hold the wire in each bracket.",
    different:
      "This is the standard way to move teeth, and the type most people picture when they think of braces. The brackets are visible on the teeth.",
    keyFacts: [
      { label: "How it is worn", value: "Fixed to the teeth" },
      { label: "What you see", value: "Metal brackets and a wire" },
    ],
    worthKnowing: [
      "The braces stay on the teeth throughout the active phase.",
      "Hard, chewy and sticky foods can break a bracket or the wire.",
      "Careful daily cleaning around the brackets and under the wire matters.",
    ],
  },
  {
    id: "ceramic-braces",
    slot: "BT2",
    name: "Ceramic braces",
    image: {
      src: `${TYPES_IMAGE_DIR}/ceramic-braces-1200.webp`,
      alt: "Illustrative close-up of teeth fitted with ceramic braces",
      ready: true,
    },
    summary: "Fixed braces with tooth-coloured brackets.",
    whatItIs:
      "Ceramic braces work in the same way as metal braces. The brackets are made of a tooth-coloured ceramic material instead of metal, and they are joined by a wire.",
    different:
      "The brackets blend more closely with the colour of the teeth, so they are less noticeable than metal brackets.",
    keyFacts: [
      { label: "How it is worn", value: "Fixed to the teeth" },
      { label: "What you see", value: "Tooth-coloured brackets and a wire" },
    ],
    worthKnowing: [
      "Ceramic is more brittle than metal, so brackets can chip or break.",
      "Elastic ties can pick up stain from some foods and drinks.",
      "Careful daily cleaning around the brackets matters, just as it does with metal braces.",
    ],
  },
  {
    id: "self-ligating-braces",
    slot: "BT3",
    name: "Self-ligating braces",
    image: {
      src: `${TYPES_IMAGE_DIR}/self-ligating-braces-1200.webp`,
      alt: "Illustrative close-up of teeth fitted with self-ligating braces",
      ready: true,
    },
    summary: "Fixed braces with a built-in clip instead of elastic ties.",
    whatItIs:
      "Self-ligating braces are fixed braces. Each bracket has a small built-in clip or sliding door that holds the wire, instead of the small elastic ties used with other braces.",
    different:
      "The clip is part of the bracket itself. Self-ligating brackets can be made of metal or ceramic, and which is used is confirmed at your consultation.",
    keyFacts: [
      { label: "How it is worn", value: "Fixed to the teeth" },
      { label: "What you see", value: "Brackets with a built-in clip, and a wire" },
    ],
    worthKnowing: [
      "The wire is adjusted at regular visits, as with other fixed braces. How often you attend is confirmed at your consultation.",
      "Careful daily cleaning around the brackets and under the wire still matters.",
      "Hard, chewy and sticky foods can still damage the brackets.",
    ],
  },
  {
    id: "clear-aligners",
    slot: "BT4",
    name: "Clear aligners",
    image: {
      src: `${TYPES_IMAGE_DIR}/clear-aligners-1200.webp`,
      alt: "Illustrative close-up of teeth wearing a clear aligner",
      ready: true,
    },
    summary: "Removable clear plastic trays, made for your teeth.",
    whatItIs:
      "Clear aligners are a series of clear plastic trays, each made to fit your teeth. You change from one tray to the next as your teeth are moved gradually into position.",
    different:
      "Unlike fixed braces, aligners can be taken out, for example to eat and to clean your teeth. They are also less noticeable than brackets and a wire.",
    keyFacts: [
      { label: "How it is worn", value: "Removable" },
      { label: "What you see", value: "Clear plastic trays" },
    ],
    worthKnowing: [
      "Aligners only work if they are worn as your clinician instructs, so they suit people who can keep to that routine.",
      "Aligners are not suitable for every case. Your assessment shows whether they are an option for you.",
      "Cleaning the aligners, and your teeth, as instructed matters.",
    ],
  },
];
/* ---------------- 5. What happens at each stage ---------------- */
export const STAGES = {
  sans: "What happens",
  accent: "at each stage.",
  intro: "General information on a typical course of treatment. Your own plan may differ.",
  /* The phase bar: the active phase covers the first three stages, the
     retention phase the last. `span` is the number of stage columns. No
     durations. */
  phases: [
    { label: "Active phase", span: 3 },
    { label: "Retention phase", span: 1 },
  ],
  stages: [
    {
      slot: "B5a",
      title: "Assessment and a plan",
      text: "Your clinician looks at your teeth, bite and goals and makes a plan, including whether any teeth need to be removed.",
    },
    {
      slot: "B5b",
      title: "Fitting the appliance",
      text: "The braces or other appliance are fitted. Your teeth may ache for a few days afterwards.",
    },
    {
      slot: "B5c",
      title: "Adjustment visits",
      text: "The appliance is adjusted at regular visits. How often you attend is confirmed at your consultation.",
    },
    {
      slot: "B5d",
      title: "Removal and retainers",
      text: "When the active phase is finished, the braces are removed and retainers are given.",
    },
  ] as { slot: ArtSlotId; title: string; text: string }[],
  lengthTitle: "How long does it take?",
  length:
    "There is no standard timeline. Treatment length varies from person to person, and missed appointments or broken braces can lengthen treatment. How long yours may take, and how often you will visit, is confirmed at your consultation.",
  statementLead: "A plan built around",
  statementEm: "your teeth.",
  statementSub:
    "The steps, the appliances used and the length of treatment depend on you. Your clinician explains them at your consultation.",
};

/* ---------------- 6. Adults, teenagers and parents ---------------- */
export const READERS = {
  sans: "Braces for adults,",
  accent: "teenagers and parents.",
  intro: "The same treatment raises different questions, depending on who is asking.",
  cards: [
    {
      slot: "B6a",
      name: "Adults",
      text: "An assessment looks at your teeth, bite and goals. Good dental health is needed before treatment starts, and careful daily cleaning matters throughout. Retainers help keep the result afterwards.",
      featured: true,
    },
    {
      slot: "B6b",
      name: "Teenagers",
      text: "Some appliances, such as removable functional appliances or headgear, are used in some cases, often for younger patients. Whether any applies is confirmed at your assessment. Cleaning around the braces every day and keeping appointments are what treatment depends on.",
      featured: false,
    },
    {
      slot: "B6c",
      name: "Parents",
      text: "It helps to ask what each visit involves, how often visits are needed, who to call if a brace breaks and how retainers will be handled. Missed appointments and broken braces can lengthen treatment.",
      featured: false,
    },
  ] as { slot: ArtSlotId; name: string; text: string; featured: boolean }[],
};

/* ---------------- 7. Daily care, risks and when to call ---------------- */
export const CARE = {
  sans: "Looking after your teeth",
  accent: "with braces.",
  careTitle: "Daily care",
  care: [
    {
      slot: "B7a",
      text: "Brush two to three times a day for two to three minutes, using fluoride toothpaste.",
    },
    {
      slot: "B7b",
      text: "Clean around the brackets and under the wire with interdental brushes.",
    },
    {
      slot: "B7c",
      text: "Avoid hard, chewy and sticky foods that can break the brace.",
    },
    { slot: "B7d", text: "Wax can ease a sharp part until it is repaired." },
  ] as { slot: ArtSlotId; text: string }[],
  careNote: "General information only: follow your own clinician's instructions.",
  risksTitle: "Risks",
  risksIntro: "Your clinician talks these through before treatment.",
  risks: [
    "Teeth can ache for a few days after fitting and after adjustments.",
    "White or brown marks can appear on the enamel after poor cleaning, and gum problems can develop.",
    "The roots of the teeth can become shorter, usually by a few millimetres and occasionally more.",
    "In some cases, treatment may be stopped early if cleaning is not adequate.",
    "Teeth can drift after treatment.",
  ],
  risksNote: "Outcomes vary from person to person.",
  urgentTitle: "Call the clinic where you were treated if you have:",
  urgent: ["a broken brace with sharp edges", "a loose band", "swelling or severe pain"],
};

/* ---------------- 8. Retainers ---------------- */
export const RETAINERS = {
  sans: "Retainers and",
  accent: "keeping the result.",
  intro:
    "Retainers, removable or fixed, are given after treatment to help hold the teeth in their new positions.",
  cards: [
    {
      slot: "B8a",
      title: "Why retainers matter",
      text: "Teeth tend to move back, and they can drift after treatment. Retainers are usually needed to help keep the result.",
    },
    {
      slot: "B8b",
      title: "How long they are worn",
      text: "Several sources recommend wearing retainers long term, often part-time. Your own retainer advice, and any charge for replacements, is confirmed at your consultation.",
    },
  ] as { slot: ArtSlotId; title: string; text: string }[],
  note: "Regular dental check-ups, fluoride toothpaste and limiting acidic, sugary and fizzy drinks help protect your teeth during and after treatment.",
};

/* ---------------- 9. Cases (gated by SHOW_BRACES_CASE_IMAGES) ---------------- */
export const CASES = {
  sans: "Orthodontic cases",
  accent: "from Neodent.",
  images: [
    {
      src: "/assets/treatment/web/orthodontics-before-treatment-neodent-dental-hospital-nampally-1600.webp",
      alt: "Intraoral photograph before orthodontic treatment",
      label: "Before",
    },
    {
      src: "/assets/treatment/web/orthodontics-after-treatment-neodent-dental-hospital-nampally-1600.webp",
      alt: "Intraoral photograph after orthodontic treatment",
      label: "After",
    },
  ],
  width: 1600,
  height: 1200,
  statement: "Every case is different, and these images are not a prediction for your own mouth.",
  evidence:
    "Supplied clinical photographs, shown for patient understanding. Images are published in line with our ",
  privacyLinkText: "privacy policy",
  privacyHref: "/privacy-policy",
};

/* ---------------- 10. Questions to ask + doctor ---------------- */
export const QUESTIONS = {
  sans: "Questions to",
  accent: "ask at your assessment.",
  list: [
    "What is the problem with my bite or alignment, and what happens if I leave it?",
    "Which options suit me, and why?",
    "How long might treatment take, and how often will I visit?",
    "Will any teeth need to be removed?",
    "What retainer will I need, and for how long?",
    "Who looks after my brace in an emergency?",
  ],
  doctor: {
    name: "Dr. Md. Miftah Ur Rahman",
    designation: "Prosthodontist and Implantologist",
    qualifications: "BDS, MDS, FICOI",
    treatmentLabel: "Your treatment",
    treatment: [
      "Which clinician assesses and carries out your orthodontic treatment is ",
      { h: "confirmed at your consultation", tone: "primary" },
      ".",
    ] as Rich,
    profileHref: "/doctors/dr-miftah-ur-rahman",
    imageAlt: "Dr. Md. Miftah Ur Rahman, smiling, arms folded, in a white coat",
  },
};

/* ---------------- 11. FAQ ---------------- */
/* ONE source for the visible accordion and the FAQPage JSON-LD. Answers are
   plain text; `links` only tells the accordion which words to link. */
export type BracesFaqItem = {
  question: string;
  answer: string;
  links?: TextLink[];
};

export const FAQ_HEADING = { sans: "Braces and orthodontics:", accent: "your questions." };

export const BRACES_FAQ: BracesFaqItem[] = [
  {
    question: "How do braces straighten teeth?",
    /* The ONE use of "teeth straightening", placed in the answer. */
    answer:
      "For teeth straightening, braces use brackets bonded to the teeth and joined by wires to gradually move teeth into a better position. Retainers are worn afterwards to help keep them there. An assessment shows whether this is suitable for you.",
  },
  {
    question: "What types of braces are there?",
    answer:
      "This page describes four types: metal braces, ceramic braces, self-ligating braces and clear aligners. The first three are fixed braces, with brackets bonded to the teeth and joined by a wire. Clear aligners are removable. Your clinician explains which options suit your teeth and why.",
  },
  {
    question: "Can adults have braces?",
    answer:
      "An assessment looks at your teeth, bite and goals, and your clinician decides whether treatment is advisable. Good dental health is needed before treatment starts, and careful daily cleaning matters throughout.",
  },
  {
    question: "How long does orthodontic treatment take?",
    /* Adapted from the implants duration answer: "is a process measured in
       months, not a single visit" is changed to the no-timeline wording (no
       duration may be stated), "the bone available ... how you heal" is
       changed to the factors the research pack gives for braces, and the
       pack's missed-appointments sentence is added. */
    answer:
      "Orthodontic treatment is a process, not a single visit, and there is no standard timeline. The time depends on your teeth, bite and goals, whether anything needs treating first, and how well daily care and appointments are kept. Missed appointments and broken braces can lengthen treatment. Your clinician will give you a plan for your own case at your consultation.",
  },
  {
    question: "How often will I need appointments?",
    answer:
      "The appliance is adjusted at regular visits. How often you attend is confirmed at your consultation.",
  },
  {
    question: "Do braces hurt?",
    answer:
      "Teeth may ache for a few days after fitting and after adjustments. Wax can ease a sharp part until it is repaired. If you have swelling or severe pain, call the clinic.",
  },
  {
    question: "What can I eat with braces?",
    answer:
      "Avoid hard, chewy and sticky foods that can break the brace. Follow your own clinician's instructions.",
  },
  {
    question: "How do I clean my teeth with braces?",
    answer:
      "Brush two to three times a day for two to three minutes with fluoride toothpaste, and clean around the brackets and under the wire with interdental brushes.",
  },
  {
    question: "Do I need a retainer afterwards?",
    answer:
      "Retainers, removable or fixed, are given after treatment to help hold the teeth in place, because teeth tend to move back. Your own retainer advice, and any charge for replacements, is confirmed at your consultation.",
  },
  {
    question: "How much do braces cost?",
    /* Adapted from the root canal cost answer: "which tooth is being
       treated" becomes "which appliance is used", "the type of restoration"
       becomes "how your treatment is planned", "dentist" becomes
       "clinician" and "examination" becomes "assessment". No price. */
    answer:
      "The cost depends on which appliance is used, whether anything needs treating first, and how your treatment is planned. Your clinician can give you an estimate for your own plan after an assessment.",
  },
  {
    question: "Where can I have braces and orthodontic treatment?",
    /* Adapted from the root canal "where" answer (treatment noun changed). */
    answer:
      "Neodent Dental Hospital offers braces and orthodontic treatment consultations at its Nampally and Mehdipatnam clinics in Hyderabad. Call the clinic you would like to visit.",
    links: [
      { text: "Nampally", href: BRANCH_PAGE_HREF.nampally },
      { text: "Mehdipatnam", href: BRANCH_PAGE_HREF.mehdipatnam },
    ],
  },
];

export const FAQ_CTA_TITLE = "Ready to talk it through?";

/* ---------------- 12. Locations ---------------- */
export const LOCATIONS = {
  sans: "Where to",
  accent: "find us.",
  intro: [
    { h: "Braces and orthodontic treatment consultations", tone: "primary" },
    " are available at ",
    { h: "both Neodent clinics", tone: "secondary" },
    " in Hyderabad. Call ",
    { h: "the clinic you would like to visit", tone: "quiet" },
    ".",
  ] as Rich,
};

/* ---------------- 13. Related ---------------- */
/* Descriptions are the existing homepage card summaries
   (components/sections/expertise-data.ts), not newly written. Hrefs are the
   ones the implants, FMR and root canal pages use for the same treatments. */
export const RELATED = [
  {
    title: featuredTreatmentTitle("smile-design"),
    description: "Plan cosmetic options around the changes you want to make to your smile.",
    href: "/treatments/smile-design",
  },
  {
    title: featuredTreatmentTitle("scaling-polishing"),
    description: "Remove plaque and tartar, then polish the tooth surfaces.",
    href: "/treatments/scaling-and-polishing",
  },
  {
    title: featuredTreatmentTitle("full-mouth-rehabilitation"),
    description: "Plan staged care when many teeth or the bite need attention.",
    href: "/treatments/full-mouth-rehabilitation",
  },
];
