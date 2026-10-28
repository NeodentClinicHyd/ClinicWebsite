/* ------------------------------------------------------------------
   /treatments/smile-design — single source of truth.

   Flags, route constants, breadcrumb trail, FAQ, related treatments and
   ALL section copy live here, so the visible page, the metadata and the
   JSON-LD can never drift apart. Phones, addresses, hours and directions
   links are NOT defined here; they come from lib/site-data.ts.

   Copy rules for this file (owner brief): the main term in headings is
   "smile design"; "cosmetic dentistry" is the wider term and is explained
   once (the "terms you may hear" card and the second FAQ). No prices, no
   lifespans, no timelines, no outcome promises, no success rates. The page
   never states which options (whitening, bonding, veneers, crowns) Neodent
   carries out: that is "confirmed at your consultation". Existing site copy
   is marked VERBATIM and must not be edited.
   ------------------------------------------------------------------ */
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";
import { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE } from "@/lib/dental-implants-page";
import type { SlotId } from "@/lib/smile-design-slots";

/* Re-exported so this file stays the one import for the page. Both values
   are owned by the implants lib (same wording, same links). */
export { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE };

export const PAGE_PATH = "/treatments/smile-design";

/** Single switch for the WHOLE cases section (every patient photograph).
 *  The hero uses a non-patient clinic photograph and is unaffected. Typed as
 *  boolean (not the literal `true`) so the flag-off branch is still
 *  type-checked. When false, the Questions section switches to its tan
 *  variant so it never sits next to the dark aftercare section. */
export const SHOW_SMILE_CASE_IMAGES: boolean = true;

/** Rendered only when BOTH are non-empty. */
export const REVIEWED_BY = "";
export const LAST_REVIEWED = "";

/* Breadcrumb trail, shared by the visible breadcrumb and the
   BreadcrumbList JSON-LD. */
export const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treatments", path: "/treatments" },
  { name: featuredTreatmentTitle("smile-design"), path: PAGE_PATH },
];

/* ---------------- Metadata ---------------- */
export const META_TITLE = "Smile Design & Cosmetic Dentistry in Nampally & Mehdipatnam | Neodent";
export const META_DESCRIPTION =
  "Smile design and cosmetic dentistry in Nampally and Mehdipatnam, Hyderabad. Your dentist explains which options suit your teeth after an examination.";
export const PROCEDURE_NAME = "Smile design and cosmetic dentistry";

/** Shown with every group of illustrations (same wording as the implants
 *  page's ILLUSTRATION_NOTE). */
export const ILLUSTRATION_NOTE =
  "Illustration, not to scale. Your own anatomy and plan will differ.";

/* ---------------- Rich text (highlighted phrases) ---------------- */
export type RichPart = string | { h: string; tone: "primary" | "secondary" | "quiet" };
export type Rich = RichPart[];

/* ---------------- 1. Hero ---------------- */
export const HERO = {
  sans: "Smile design & cosmetic dentistry,",
  accent: "planned around your teeth.",
  /* VERBATIM (research pack short summary). */
  lede: [
    "Smile design is a ",
    { h: "planned approach", tone: "primary" },
    " to improving the look of your teeth, which may combine options such as whitening, bonding, veneers or straightening. Your dentist can explain ",
    { h: "which are suitable", tone: "secondary" },
    " for your teeth and what each involves.",
  ] as Rich,
  /* Clinic photograph, no patients: Nampally reception (1280 x 1707). The
     crop favours the double-height wing and staircase (site-data gallery
     "Reception & staircase", 50% 26%). Alt text and caption come from the
     site-data gallery entry. */
  image: "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg",
  imageAlt: "Neodent Dental Hospital Nampally — the double-height reception and consultation wing",
  imagePosition: "50% 26%",
  captionLabel: "Reception & staircase",
  captionPlace: "Nampally",
};

/* ---------------- 2. What is smile design ---------------- */
export const OVERVIEW = {
  sans: "What is",
  accent: "smile design?",
  /* VERBATIM (components/sections/expertise-data.ts, smile design card). */
  lede: [
    "Smile design is a ",
    { h: "planning approach", tone: "primary" },
    " for people who want to change the appearance of their teeth. Depending on the concern, options may include whitening, bonding, veneers or straightening. The dentist discusses what you would like to change, examines your teeth and explains which options are suitable and what each involves.",
  ] as Rich,
  mediaCaption: ILLUSTRATION_NOTE,
  cards: [
    {
      title: "A plan, not one procedure",
      text: "Smile design is a planning conversation about the shape, colour, size and alignment of your teeth. The treatment that follows is chosen to carry out that plan.",
    },
    {
      title: "Often more than one treatment",
      text: "A plan may combine options such as whitening, bonding, veneers, crowns or straightening, depending on the concern. Which of these are carried out at Neodent is confirmed at your consultation.",
    },
    {
      title: "Health comes first",
      text: "Wanting to change how your teeth look is a valid reason to book a conversation. Your dentist checks the health of your teeth and gums first.",
    },
  ],
  termsTitle: "Terms you may hear",
  terms: [
    {
      term: "Cosmetic dentistry",
      meaning: "Dental treatment aimed mainly at how teeth look. Smile design is the planning side of it.",
    },
    { term: "Whitening", meaning: "Peroxide bleach that lightens stains on natural teeth." },
    {
      term: "Bonding",
      meaning: "Tooth-coloured resin shaped onto a tooth and hardened with a light.",
    },
    { term: "Veneer", meaning: "A thin covering bonded to the front of a tooth." },
    { term: "Crown", meaning: "A cover that fits over the whole tooth." },
  ],
};

/* ---------------- 3. Why people ask about it ---------------- */
export const WHEN = {
  sans: "Why people",
  accent: "ask about it.",
  intro:
    "These are some of the reasons people ask about smile design. They are reasons to book a conversation, not a diagnosis.",
  cards: [
    {
      slot: "SD2a",
      title: "Chipped or worn edges",
      text: "Chips, or edges that have worn down, are among the reasons people ask about their options.",
    },
    {
      slot: "SD2b",
      title: "Stained or uneven colour",
      text: "Some teeth are stained or differ in colour from their neighbours. Not all discolouration can be prevented; some follows injury or medicines.",
    },
    {
      slot: "SD2c",
      title: "Size and shape",
      text: "Teeth that look uneven in size or shape can also start the conversation.",
    },
    {
      slot: "SD2d",
      title: "Gaps and crooked teeth",
      text: "Options for gaps or crooked teeth depend on the case. Your dentist explains what may suit yours.",
    },
  ] as { slot: SlotId; title: string; text: string }[],
  note: "A concern like these tells you what you would like to change. It does not tell you what is wrong or which treatment you need. Only an examination can.",
  /* One passage, set as two parts: the first sentence is the body, the
     second runs in the card's tinted footer strip. */
  health: {
    title: "Starting with a healthy mouth",
    text: "Existing decay or gum disease is treated before cosmetic work.",
    foot: "Veneers in particular are not suited to teeth with untreated decay or gum disease.",
  },
  check: {
    title: "What your dentist may check",
    items: [
      { text: "Your teeth and gums", slots: ["SD3a", "SD3b"] },
      {
        text: "Your bite. Grinding, clenching or a deep overbite can make some options a poor choice.",
        slots: ["SD3c"],
      },
      {
        text: "Existing fillings and crowns, which do not change colour when teeth are whitened",
        slots: ["SD3d"],
      },
      {
        text: "Which photographs, scans or impressions are taken is confirmed at your consultation",
        slots: [],
      },
    ] as { text: string; slots: SlotId[] }[],
  },
};

/* ---------------- 4. Options compared ---------------- */
export const OPTIONS = {
  sans: "Whitening, bonding, veneers and straightening,",
  accent: "compared.",
  intro:
    "These are examples of options a dentist may discuss. Which ones suit you, and which are carried out at Neodent, is confirmed at your consultation.",
  doesLabel: "What it does",
  knowLabel: "Worth knowing",
  cards: [
    {
      slot: "SD4a",
      name: "Whitening",
      does: "Peroxide bleach lightens stains on natural teeth.",
      know: "Results vary and colour can fade. Sensitivity and gum irritation are common but usually temporary. Crowns, veneers and fillings do not change colour.",
    },
    {
      slot: "SD4b",
      name: "Bonding",
      does: "Tooth-coloured resin is shaped onto the tooth, hardened with a light, then smoothed and polished.",
      know: "May need less enamel removed and is easier to repair, but is less resistant to stains and wear and may need repair or replacement sooner.",
    },
    {
      slot: "SD4c",
      name: "Porcelain veneers",
      does: "A thin, natural-looking covering bonded to the front of a tooth, made from an impression or scan.",
      know: "A small amount of enamel is removed first, which cannot be undone. Veneers can chip, crack, wear or loosen, and decay can still form around them.",
    },
    {
      slot: "SD4d",
      name: "Crowns",
      does: "A cover that fits over the whole tooth.",
      know: "Needs more of the tooth to be prepared than other options.",
    },
    {
      slot: "SD4e",
      name: "Straightening",
      does: "Braces move teeth into a better position, and retainers help keep them there.",
      know: "Takes time, needs careful daily cleaning, and retainers are needed afterwards.",
      link: { label: "Braces and orthodontics", href: "/treatments/braces-and-orthodontics" },
    },
  ] as {
    slot: SlotId;
    name: string;
    does: string;
    know: string;
    link?: { label: string; href: string };
  }[],
  closing: "Ask which option is the least invasive for what you want.",
};

/* ---------------- 5. How your plan is made ---------------- */
export const PLAN = {
  sans: "How your plan is made,",
  accent: "then carried out.",
  intro: "General information. Your own plan may differ.",
  stages: [
    {
      slot: "SD5a",
      title: "Examination and conversation",
      text: "Your dentist asks what you would like to change, then examines your teeth, gums and bite.",
    },
    {
      slot: "SD5b",
      title: "A healthy mouth first",
      text: "Any decay or gum disease is treated before cosmetic work begins.",
    },
    {
      slot: "SD5c",
      title: "Planning the options",
      text: "Your dentist explains which options are suitable, what each involves and what cannot be undone. Whether photographs, scans, impressions or a mock-up are used is confirmed at your consultation.",
    },
    {
      slot: "SD5d",
      title: "Treatment and adjustment",
      text: "Treatment depends on the options chosen. Your dentist checks and adjusts the result, including your bite, and explains how to look after it.",
    },
  ] as { slot: SlotId; title: string; text: string }[],
  timelineTitle: "How long does it take?",
  /* The FMR timeline card is worded around "phases" of treatment, which this
     page cannot claim, so the owner's fallback wording is used. */
  timeline: [
    "There is ",
    { h: "no standard timeline", tone: "primary" },
    ". How long smile design takes depends on the options chosen and the number of teeth involved. Your dentist can explain what to expect for your plan.",
  ] as Rich,
  statementLead: "A plan built around your teeth,",
  statementEm: "not a template.",
  statementNote: "Your own plan may differ from the examples on this page.",
  visitsLabel:
    "General information. Which methods are used at Neodent is confirmed at your consultation.",
  visitsTitle: "What a visit can involve",
  visits: [
    {
      title: "Porcelain veneers",
      text: "The enamel is lightly reduced, an impression or scan is taken, a temporary may be worn, and the veneer is checked and bonded.",
    },
    {
      title: "Bonding",
      text: "The tooth is prepared, resin is sculpted, hardened with a light, smoothed and polished.",
    },
    {
      title: "Whitening",
      text: "Whitening can be done in a clinic, with trays supplied by a dentist, or with over-the-counter products. Your dentist advises which route suits you.",
    },
  ],
};

/* ---------------- 6. What can be undone ---------------- */
export const UNDONE = {
  sans: "What can be undone,",
  accent: "and what cannot.",
  intro:
    "Some changes can be reversed or repeated. Others cannot. Your dentist can tell you which is which for each option in your plan.",
  mediaCaption: ILLUSTRATION_NOTE,
  cards: [
    {
      title: "Cannot be undone",
      text: "Preparing a tooth for a porcelain veneer removes a small amount of enamel. That change cannot be reversed.",
      featured: true,
    },
    {
      title: "More tooth preparation",
      text: "Crowns need more of the tooth to be prepared than other options.",
      featured: false,
    },
    {
      title: "Colour can change back",
      text: "Whitening results vary and can fade. Colour may darken again and need repeat whitening.",
      featured: false,
    },
  ],
  askTitle: "Ask your dentist",
  ask: "For every option in your plan, ask what is reversible and what is not, and whether a less invasive option would meet your goal.",
};

/* ---------------- 7. Aftercare, risks and limits ---------------- */
export const AFTERCARE = {
  sans: "Aftercare, risks",
  accent: "and limits.",
  careLabel: "General information",
  careTitle: "Looking after your smile",
  care: [
    { slot: "SD8a", lead: "Brush twice a day with fluoride toothpaste", text: "" },
    { slot: "SD8b", lead: "Clean between your teeth every day", text: "" },
    { slot: "SD8c", lead: "Keep your regular check-ups", text: "" },
    { slot: "SD8d", lead: "Avoid biting nails and hard objects", text: "" },
    {
      slot: "SD8e",
      lead: "Limit drinks and foods that stain.",
      text: "During whitening, your dentist may advise avoiding strongly coloured foods.",
    },
  ] as { slot: SlotId; lead: string; text: string }[],
  careFoot:
    "Your bite may feel different at first, and your dentist should adjust it. Follow your own dentist's instructions.",
  risksTitle: "Risks and limits",
  risks: [
    "Veneers and bonding can chip, crack, wear or loosen, and decay can still form under or around them.",
    "Whitening results vary, can fade, and do not change existing fillings or veneers.",
    "Sensitivity and gum irritation from whitening are usually temporary. Effects on the tooth root are very rare.",
    "How long results last varies. It depends on the option chosen, your bite and how you look after your teeth.",
    "Cosmetic work done by unlicensed providers can cause tooth damage, nerve damage and infection. Ask who will carry out your treatment.",
  ],
  urgentTitle: "Call the clinic where you were treated if you notice:",
  urgent: [
    "a veneer, crown or bonded edge that chips or comes loose",
    "a bite that feels high or uneven",
    "sensitivity that does not settle",
    "swelling or gum irritation that does not settle",
    "increasing pain, or a fever",
  ],
};

/* ---------------- 8. Cases (gated by SHOW_SMILE_CASE_IMAGES) ---------------- */
export const CASES = {
  sans: "Smile design cases",
  accent: "from Neodent.",
  intro:
    "Real cases from our patients, shown for understanding. Every case is different, and these images are not a prediction for your own mouth.",
  /* Existing site case (treatment-data.ts / treatments-hub.ts). 960 x 1280
     portraits; an eye mosaic is baked into both files. Shown whole, never
     cropped, never above native size. */
  pair: {
    before: "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -before treatment.jpg",
    after: "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -after treatment.jpg",
    beforeAlt: "Anterior smile before zirconia crown treatment",
    afterAlt: "Anterior smile design with zirconia crowns after treatment",
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
    width: 960,
    height: 1280,
    /* VERBATIM (treatment-data.ts). */
    caption: "Anterior smile design with zirconia crowns — accident case restoration",
  },
  /* Six clinical photographs of one case (WebP copies), numeric filename
     order. About 5:4; sizes are native, and every tile is shown below them. */
  steps: [
    { n: 1, width: 632, height: 506 },
    { n: 2, width: 764, height: 611 },
    { n: 3, width: 766, height: 613 },
    { n: 4, width: 634, height: 508 },
    { n: 5, width: 620, height: 496 },
    { n: 6, width: 465, height: 372 },
  ].map((step) => ({
    ...step,
    src: `/assets/dr-miftah/treatments/web/dr-md-miftah-ur-rahman-smile-design-case-step-0${step.n}.webp`,
    alt: `Clinical photograph, step ${step.n} of 6 of one smile design case`,
  })),
  /* VERBATIM (lib/miftah-treatment-dossiers.ts, smile design "approach"). */
  stepsCaption:
    "It illustrates the step-by-step planning described here; it is not a promise of a particular outcome.",
  /* Disclaimer: the FMR evidence wording with the treatment noun swapped. */
  evidence:
    "Supplied before and after clinical photographs from smile design at Neodent. Photographs are shown for patient understanding; treatment and its outcome vary from patient to patient.",
  privacyLead: "Images are published in line with our ",
  privacyLinkText: "privacy policy",
  privacyHref: "/privacy-policy",
};

/* ---------------- 9. Questions to ask + doctor ---------------- */
export const QUESTIONS = {
  sans: "Questions to ask",
  accent: "your dentist.",
  list: [
    "Which option is least invasive for what I want?",
    "What is reversible and what is not?",
    "Will any of my existing fillings or crowns need replacing to match?",
    "Can I see a mock-up or plan before treatment?",
    "How will you adjust my bite, and what care will it need?",
    "Which of these options are carried out at this clinic, and by whom?",
  ],
  doctor: {
    name: "Dr. Md. Miftah Ur Rahman",
    designation: "Prosthodontist and Implantologist",
    qualifications: "BDS, MDS, FICOI",
    treatmentLabel: "Your treatment",
    treatment: [
      "Which clinician plans and carries out your treatment is ",
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
export type SmileFaqItem = {
  question: string;
  answer: string;
  links?: { text: string; href: string }[];
};

export const FAQ_HEADING = { sans: "Smile design questions,", accent: "answered." };

export const FAQ: SmileFaqItem[] = [
  {
    question: "What is smile design?",
    /* VERBATIM from lib/treatments-hub.ts (TREATMENTS_FAQ). */
    answer:
      "Smile designing refers to the aesthetic planning and treatment focused on improving the appearance of the smile. This may involve procedures such as veneers, crowns, orthodontics or other cosmetic dental work, depending on the patient's goals and clinical suitability.",
  },
  {
    question: "What is the difference between smile design and cosmetic dentistry?",
    answer:
      "Cosmetic dentistry is the wider term for dental treatment that mainly changes how teeth look. Smile design is the planning side: your dentist looks at the shape, colour, size and alignment of your teeth, then chooses treatments that carry out the plan.",
  },
  {
    question: "Which treatments can be part of a smile design plan?",
    answer:
      "Examples include whitening, bonding, veneers, crowns and straightening with braces, depending on your concern. Your dentist explains which options suit your teeth, and which are carried out at Neodent is confirmed at your consultation.",
  },
  {
    question: "Can I have cosmetic treatment if I have decay or gum disease?",
    answer:
      "Existing decay or gum disease needs treating first, so your dentist checks the health of your teeth and gums before planning cosmetic work. Treatment for these comes before any cosmetic changes.",
  },
  {
    question: "Will cosmetic treatment damage my teeth?",
    answer:
      "Some options remove a small amount of enamel, such as preparing a tooth for a porcelain veneer, and that cannot be undone. Others, such as bonding, may need less enamel removed. Ask which option is the least invasive for what you want.",
  },
  {
    question: "Is whitening suitable for everyone?",
    answer:
      "Whitening lightens stains, but it does not change crowns, veneers or fillings. Results vary, and sensitivity or gum irritation are common but usually temporary. Your dentist checks whether it suits your teeth.",
  },
  {
    question: "How long do the results last?",
    answer:
      "It varies. It depends on the option chosen, your bite, whether you grind or clench, and how you look after your teeth. Whitening can fade and may need repeating. Your dentist can explain what to expect for your plan.",
  },
  {
    question: "How long does smile design take?",
    /* Owner fallback wording: the built FMR answer refers to "phases". */
    answer:
      "There is no standard timeline. It depends on the options chosen and the number of teeth involved. Your dentist can explain what to expect for your plan.",
  },
  {
    question: "How much does smile design cost?",
    /* Owner fallback wording: the built implants answer is specific to
       replacing teeth. No prices. */
    answer:
      "Cost depends on the options in your plan and the number of teeth involved, so it can only be explained after an examination. Please call either clinic or send an enquiry to ask.",
  },
  {
    question: "Where can I get smile design and cosmetic dentistry in Hyderabad?",
    /* The built implants "where" answer with the treatment noun swapped. */
    answer:
      "Neodent Dental Hospital offers smile design and cosmetic dentistry consultations at its Nampally and Mehdipatnam clinics in Hyderabad. Call the clinic you would like to visit.",
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
  /* The FMR wording with the treatment noun swapped. */
  intro: [
    { h: "Smile design and cosmetic dentistry consultations", tone: "primary" },
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
    title: featuredTreatmentTitle("braces-orthodontics"),
    description: "Gradually move teeth into position, then use retainers to help hold them.",
    href: "/treatments/braces-and-orthodontics",
  },
  {
    title: featuredTreatmentTitle("composite-build-up"),
    description: "Rebuild part of a damaged tooth with tooth-coloured composite resin.",
    href: "/treatments/composite-build-up",
  },
  {
    title: featuredTreatmentTitle("full-mouth-rehabilitation"),
    description: "Plan staged care when many teeth or the bite need attention.",
    href: "/treatments/full-mouth-rehabilitation",
  },
];
