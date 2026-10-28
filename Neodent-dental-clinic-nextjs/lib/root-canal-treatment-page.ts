/* ------------------------------------------------------------------
   /treatments/root-canal-treatment — single source of truth.

   Flags, route constants, breadcrumb trail, FAQ, related treatments and
   ALL section copy live here, so the visible page, the metadata and the
   JSON-LD can never drift apart. Phones, addresses, hours and directions
   links are NOT defined here; they come from lib/site-data.ts.

   Copy rules for this file (owner brief): the main term is "root canal
   treatment"; the one synonym ("endodontic treatment") appears once, in the
   "Terms you may hear" card. No prices, no lifespans, no success rates, no
   visit count as a promise (one to three visits is a sourced range, always
   "confirmed at your consultation"). The word "nerve" appears once on the
   page (the "Inside the tooth" card). The word "permanent" is not used:
   the copy deck's "permanent restoration" is written "final restoration".
   ------------------------------------------------------------------ */
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";
import { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE } from "@/lib/dental-implants-page";
import type { SlotId } from "@/lib/root-canal-slots";

/* Re-exported so this file stays the one import for the page. Both values
   are owned by the implants lib (same wording, same links). */
export { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE };

export const PAGE_PATH = "/treatments/root-canal-treatment";

/** Single switch for the WHOLE cases section (radiographs, film, disclaimer).
 *  The hero uses a non-patient clinic photograph and is unaffected. Typed as
 *  boolean (not the literal `true`) so the flag-off branch is still
 *  type-checked. */
export const SHOW_RCT_CASE_MEDIA: boolean = true;

/** The three radiographs. Set true after viewing all three WebPs: none shows
 *  legible text (names, IDs, dates, clinic labels) or other identifying
 *  detail. Only has an effect while SHOW_RCT_CASE_MEDIA is true. */
export const SHOW_RCT_RADIOGRAPHS: boolean = true;

/** Rendered only when BOTH are non-empty. */
export const REVIEWED_BY = "";
export const LAST_REVIEWED = "";

/* Breadcrumb trail, shared by the visible breadcrumb and the
   BreadcrumbList JSON-LD. */
export const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treatments", path: "/treatments" },
  { name: featuredTreatmentTitle("root-canal-treatment"), path: PAGE_PATH },
];

/* ---------------- Metadata ---------------- */
export const META_TITLE = "Root Canal Treatment in Nampally & Mehdipatnam | Neodent";
export const META_DESCRIPTION =
  "Learn what root canal treatment is, the options, what happens at a visit and aftercare. Consultations at Neodent's Nampally and Mehdipatnam clinics.";
export const PROCEDURE_NAME = "Root canal treatment";

/* ---------------- Rich text (highlighted phrases) ---------------- */
export type RichPart = string | { h: string; tone: "primary" | "secondary" | "quiet" };
export type Rich = RichPart[];

/* ---------------- 1. Hero ---------------- */
export const HERO = {
  sans: "Root canal treatment,",
  accent: "what to expect.",
  lede: [
    "Root canal treatment removes the ",
    { h: "infected or inflamed centre of a tooth", tone: "primary" },
    " so the tooth can often be kept. Your dentist can tell you after an ",
    { h: "examination and X-rays", tone: "quiet" },
    " whether it is the right option.",
  ] as Rich,
  /* Non-patient clinic photograph: the Nampally reception and consultation
     chambers (1280 x 1707, used as the original; cropped to a landscape
     frame by object-position). Not used by the implants or FMR heroes. */
  image: "/assets/neodent-clinic-nampally/Neodent dental hospital - nampally Interior.jpg",
  imageAlt:
    "Reception counter, red armchairs and consultation chamber doors under a red balcony rail, Neodent Dental Hospital, Nampally",
  captionLabel: "Reception",
  captionPlace: "Nampally",
};

/* ---------------- 2. What is it ---------------- */
export const OVERVIEW = {
  sans: "What is",
  accent: "root canal treatment?",
  /* Verbatim: the home card / hub description (expertise-data.ts). */
  lede: [
    "Root canal treatment addresses ",
    { h: "inflammation or infection in the soft tissue at the centre of a tooth", tone: "primary" },
    ". The dentist cleans and seals the canals, then restores the tooth; a filling, onlay or crown may be needed. An examination and X-rays help determine whether the tooth can be restored and whether root canal treatment is appropriate.",
  ] as Rich,
  cards: [
    {
      title: "Inside the tooth",
      /* Existing dossier copy (miftah-treatment-dossiers.ts). This is the
         ONE place the page says "nerve" (as "nerves", beside "pulp"). */
      text: "Beneath the hard enamel and dentine is a soft core called the pulp. It contains nerves and blood vessels and runs from the crown of the tooth down through narrow channels in each root: the root canals.",
    },
    {
      title: "How it becomes a problem",
      text: "The pulp can become inflamed or infected after decay, a leaking filling or trauma.",
    },
    {
      title: "Why treat rather than remove",
      /* Existing dossier copy. */
      text: "The aim is to keep your own tooth, rather than remove it and then need to replace it. Whether that is possible depends on whether the tooth can be restored reliably.",
    },
  ],
  termsTitle: "Terms you may hear",
  terms: [
    { term: "Pulp", meaning: "The soft tissue at the centre of the tooth." },
    { term: "Root canals", meaning: "The narrow channels inside each root that hold the pulp." },
    { term: "Crown", meaning: "A cap that covers and protects the tooth for everyday biting." },
    { term: "Onlay", meaning: "A restoration that covers part of the chewing surface of a tooth." },
    { term: "Endodontic treatment", meaning: "Another name for root canal treatment." },
  ],
};

/* ---------------- 3. Signs a tooth should be checked ---------------- */
export const WHEN = {
  sans: "Signs a tooth",
  accent: "should be checked.",
  intro: "These are reasons to book an assessment, not a diagnosis.",
  strip:
    "These signs alone do not confirm that a root canal is needed. A dentist examines the tooth, takes X-rays and tests the response of the tooth before advising.",
  cards: [
    { slot: "R2a", title: "Toothache", text: "Ongoing or throbbing tooth pain." },
    {
      slot: "R2b",
      title: "Sensitivity to hot or cold",
      text: "Sensitivity that lingers after the hot or cold is gone.",
    },
    { slot: "R2c", title: "Pain when biting", text: "Pain when you bite or chew." },
    { slot: "R2d", title: "Gum swelling", text: "Swelling of the gum near a tooth." },
    { slot: "R2e", title: "Facial swelling", text: "Swelling of the face or cheek." },
    { slot: "R2f", title: "A hole in the tooth", text: "A visible hole, or deep decay in a tooth." },
  ] as { slot: SlotId; title: string; text: string }[],
  pair: [
    {
      title: "Sometimes there are no signs",
      text: "Some infected teeth cause no symptoms at all and are found on an X-ray.",
    },
    {
      title: "What an assessment checks",
      text: "Examination, X-rays, and often tests of how the tooth responds. Whether the tooth can be restored afterwards is part of the decision. Which tests are used is confirmed at your consultation.",
    },
  ],
};

/* ---------------- 4. Options and what if you wait ---------------- */
export type TextLink = { text: string; href: string };
export const OPTIONS = {
  sans: "Root canal treatment and",
  accent: "the alternatives.",
  intro: [
    "Your dentist explains the options after an ",
    { h: "examination and X-rays", tone: "primary" },
    ". No single option suits every tooth.",
  ] as Rich,
  cards: [
    {
      slot: "R3a",
      name: "Root canal treatment",
      text: "Usually followed by a filling, onlay or crown. The aim is to keep your own tooth where it can be restored reliably.",
      featured: true,
      links: [] as TextLink[],
    },
    {
      slot: "R3b",
      name: "Re-treatment",
      text: "Treating again a tooth that has had a root canal before. Your dentist can tell you whether this applies to your tooth.",
      featured: false,
      links: [] as TextLink[],
    },
    {
      slot: "R3c",
      name: "Removing the tooth",
      text: "With or without replacing it using an implant, bridge or partial denture. When a tooth cannot be restored reliably, removal and replacement may be discussed.",
      featured: false,
      links: [{ text: "implant", href: "/treatments/dental-implants" }] as TextLink[],
    },
  ] as {
    slot: SlotId;
    name: string;
    text: string;
    featured: boolean;
    links: TextLink[];
  }[],
  waitTitle: "What if you do not treat it?",
  waitText:
    "Leaving an infection untreated can cause an abscess and bone loss. The infection can spread, and the tooth may eventually need to be taken out. If you have any of the signs above, the next step is an examination.",
};

/* ---------------- 5. What happens at a visit ---------------- */
export const VISIT = {
  sans: "What happens",
  accent: "at a visit.",
  intro: "General information on a typical visit. Your own visit may differ.",
  stages: [
    {
      slot: "R4a",
      title: "The tooth is numbed",
      text: "A local anaesthetic numbs the tooth. A thin rubber sheet, called a dental dam, may be placed around it to keep it dry and clean.",
    },
    {
      slot: "R4b",
      title: "The pulp is reached",
      text: "A small opening is made through the biting surface to reach the pulp chamber. The infected or inflamed pulp is removed.",
    },
    {
      slot: "R4c",
      title: "The canals are cleaned",
      text: "Each canal is cleaned, shaped and disinfected along its length, down towards the tip of the root.",
    },
    {
      slot: "R4d",
      title: "A temporary filling",
      text: "A temporary filling is placed, sometimes with a medicated dressing if more than one visit is needed.",
    },
    {
      slot: "R4e",
      title: "The canals are filled",
      text: "The cleaned canals are filled with a sealing material, so bacteria have less opportunity to re-enter. The tooth is then restored.",
    },
  ] as { slot: SlotId; title: string; text: string }[],
  visitsTitle: "How many visits will it take?",
  visits:
    "Sources describe one to three visits, depending on the tooth and how difficult it is to treat. How many visits your tooth needs is confirmed at your consultation.",
  statementLead: "A plan built around",
  statementEm: "your tooth.",
  statementSub:
    "The steps, the tools used and the number of visits depend on the tooth. Your dentist explains them at your consultation.",
};

/* ---------------- 6. Restoring the tooth afterwards ---------------- */
export const RESTORE = {
  sans: "Why the tooth usually needs",
  accent: "a filling or crown.",
  intro: "Cleaning and sealing the canals treats the inside of the tooth. The tooth itself then needs protecting.",
  cards: [
    {
      slot: "R5a",
      title: "Before the final restoration",
      text: "The tooth may have a temporary filling. Avoid chewing on the tooth until its final restoration is in place.",
    },
    {
      slot: "R5b",
      title: "The final restoration",
      text: "A final restoration is usually needed to protect the tooth and lower the risk of fracture. A well-sealed tooth that is not properly protected can still fracture.",
    },
  ] as { slot: SlotId; title: string; text: string }[],
  note: "What the tooth needs, when, and who provides the crown are confirmed at your consultation.",
};

/* ---------------- 7. After treatment, risks and when to call ---------------- */
export const AFTERCARE = {
  sans: "After the treatment,",
  accent: "risks and when to call.",
  careTitle: "After treatment",
  care: [
    { slot: "R6a", text: "The tooth may be sensitive for a few days." },
    { slot: "R6b", text: "Over-the-counter pain relief may help." },
    { slot: "R6c", text: "Avoid chewing on the tooth until it is restored." },
    { slot: "R6d", text: "Your dentist usually reviews the tooth about a year later." },
  ] as { slot: SlotId; text: string }[],
  careNote: "General information only: follow your own dentist's instructions.",
  risksTitle: "Risks",
  risksIntro: "These are uncommon, and your dentist will talk them through:",
  risks: [
    "pain or swelling afterwards",
    "a perforation (a hole through the wall of the tooth)",
    "a broken instrument left in the canal",
    "a fracture of the tooth or root",
    "canals that cannot be fully cleaned",
    "a result that is not successful",
  ],
  risksNote:
    "Results depend on the tooth, how quickly it is restored, and ongoing cleaning and check-ups. Outcomes vary from person to person.",
  urgentTitle: "Call the clinic where you were treated if you notice:",
  urgent: [
    "pain or pressure that lasts beyond a few days",
    "swelling",
    "fever",
    "a loose temporary filling",
  ],
};

/* ---------------- 8. Cases ---------------- */
export const CASES = {
  sans: "Root canal cases",
  accent: "from Neodent.",
  radiographs: {
    items: [
      {
        src: "/assets/dr-miftah/treatments/web/dr-md-miftah-ur-rahman-root-canal-treatment-pre-rct.webp",
        alt: "Root canal treatment radiograph — pre-treatment stage",
        label: "Pre-treatment",
      },
      {
        src: "/assets/dr-miftah/treatments/web/dr-md-miftah-ur-rahman-root-canal-treatment-mid-rct.webp",
        alt: "Root canal treatment radiograph — mid-treatment stage",
        label: "Mid-treatment",
      },
      {
        src: "/assets/dr-miftah/treatments/web/dr-md-miftah-ur-rahman-root-canal-treatment-post-rct.webp",
        alt: "Root canal treatment radiograph — post-treatment stage",
        label: "Post-treatment",
      },
    ],
    width: 1458,
    height: 1103,
    caption:
      "Radiographs from one root canal treatment, at the pre-treatment, mid-treatment and post-treatment stages.",
  },
  video: {
    /* 720 x 1280, 6.7 s. Poster: frame at 4.5 s (a hand and an educational
       model board, no face). */
    src: "/assets/treatment-video/Dr. Miftah Neodent dental clinic Hyderabad-Root canal treatment.mp4",
    poster: "/assets/treatment-video/posters/root-canal-treatment-poster.webp",
    width: 720,
    height: 1280,
    ariaLabel: "Root canal treatment film from Neodent Dental Hospital",
    playLabel: "Play the root canal treatment film",
    place: "Neodent",
    label: "Root canal treatment film",
  },
  statement: "Every case is different, and these images are not a prediction for your own mouth.",
  evidence:
    "Supplied clinical radiographs and film, shown for patient understanding. Images are published in line with our ",
  privacyLinkText: "privacy policy",
  privacyHref: "/privacy-policy",
};

/* ---------------- 9. Questions to ask + doctor ---------------- */
export const QUESTIONS = {
  sans: "Questions to",
  accent: "ask your dentist.",
  list: [
    "Does this tooth need a root canal or is there another option?",
    "How many visits do you expect, and what will it involve?",
    "What will the tooth need afterwards, and when?",
    "What are the chances it will need further treatment?",
    "Who should I call if pain returns?",
  ],
  doctor: {
    name: "Dr. Md. Miftah Ur Rahman",
    designation: "Prosthodontist and Implantologist",
    qualifications: "BDS, MDS, FICOI",
    treatmentLabel: "Your treatment",
    treatment: [
      "Which clinician carries out your root canal treatment is ",
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
export type RctFaqItem = {
  question: string;
  answer: string;
  links?: TextLink[];
};

export const FAQ_HEADING = { sans: "Root canal treatment:", accent: "your questions." };

export const RCT_FAQ: RctFaqItem[] = [
  {
    question: "What is root canal treatment?",
    /* Verbatim from lib/treatments-hub.ts (TREATMENTS_FAQ). */
    answer:
      "Root canal treatment is a procedure aimed at addressing problems within the inner portion of an affected tooth. The goal is to preserve the natural tooth where clinically appropriate, rather than extracting it.",
  },
  {
    question: "Does a root canal hurt?",
    answer:
      "The tooth is numbed with a local anaesthetic before treatment begins. How it feels varies from person to person, and the tooth may be sensitive for a few days afterwards. If you feel discomfort at any point, tell your dentist.",
  },
  {
    question: "How do I know if I need a root canal?",
    answer:
      "Signs such as toothache, gum swelling, sensitivity to hot or cold, a hole in the tooth or facial swelling are reasons to have the tooth checked. They do not confirm that a root canal is needed. A dentist examines the tooth, takes X-rays and tests how it responds before advising.",
  },
  {
    question: "How many visits does it take?",
    answer:
      "Sources describe one to three visits, depending on the tooth and how difficult it is to treat. There is no standard number that applies to every tooth. How many visits you need is confirmed at your consultation.",
  },
  {
    question: "What happens if I do not treat the tooth?",
    answer:
      "Leaving an infection untreated can cause an abscess and bone loss. The infection can spread, and the tooth may eventually need to be taken out. A dentist can tell you what applies to your tooth.",
  },
  {
    question: "Why does the tooth usually need a filling or crown afterwards?",
    answer:
      "A final restoration is usually needed to protect the tooth and lower the risk of fracture. Until then, avoid chewing on the tooth. What your tooth needs, and when, is confirmed at your consultation.",
  },
  {
    question: "Are there alternatives to a root canal?",
    answer:
      "Your dentist may discuss re-treatment of a tooth that has had a root canal before, or removing the tooth, with or without replacing it using an implant, bridge or partial denture. The right option depends on whether the tooth can be restored reliably.",
    links: [{ text: "implant", href: "/treatments/dental-implants" }],
  },
  {
    question: "How long will the tooth last afterwards?",
    answer:
      "Results depend on the tooth, how quickly it is restored, and ongoing cleaning and check-ups. Outcomes vary from person to person, and there is no standard figure that applies to every tooth.",
  },
  {
    question: "How much does root canal treatment cost?",
    /* Adapted from the implants cost answer: same wording, with "how many
       teeth are being replaced" changed to "which tooth is being treated". */
    answer:
      "The cost depends on which tooth is being treated, whether anything needs treating first, and the type of restoration. Your dentist can give you an estimate for your own plan after an examination.",
  },
  {
    question: "Where can I have root canal treatment?",
    /* Adapted from the implants "where" answer (treatment noun changed). */
    answer:
      "Neodent Dental Hospital offers root canal treatment consultations at its Nampally and Mehdipatnam clinics in Hyderabad. Call the clinic you would like to visit.",
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
    { h: "Root canal treatment consultations", tone: "primary" },
    " are available at ",
    { h: "both Neodent clinics", tone: "secondary" },
    " in Hyderabad. Call ",
    { h: "the clinic you would like to visit", tone: "quiet" },
    ".",
  ] as Rich,
};

/* ---------------- 12. Related ---------------- */
/* Descriptions are the existing homepage card summaries
   (components/sections/expertise-data.ts), not newly written. Hrefs are the
   ones the implants and FMR pages use for the same treatments. */
export const RELATED = [
  {
    title: featuredTreatmentTitle("composite-build-up"),
    description: "Rebuild part of a damaged tooth with tooth-coloured composite resin.",
    href: "/treatments/composite-build-up",
  },
  {
    title: featuredTreatmentTitle("scaling-polishing"),
    description: "Remove plaque and tartar, then polish the tooth surfaces.",
    href: "/treatments/scaling-and-polishing",
  },
  {
    title: featuredTreatmentTitle("dental-implants"),
    description: "Replace a missing tooth with an implant-supported crown, bridge or denture.",
    href: "/treatments/dental-implants",
  },
];
