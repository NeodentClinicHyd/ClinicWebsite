/* ------------------------------------------------------------------
   /treatments/scaling-and-polishing — single source of truth.

   Flags, route constants, breadcrumb trail, FAQ, related treatments and
   ALL section copy live here, so the visible page, the metadata and the
   JSON-LD can never drift apart. Phones, addresses, hours and directions
   links are NOT defined here; they come from lib/site-data.ts.

   Copy rules for this file (owner brief): the main term in headings is
   "scaling and polishing"; "teeth cleaning" appears naturally twice (FAQ).
   No prices or packages, no lifespans, no success rates, no fixed recall
   interval, no visit length taken from a leaflet, no equipment or product
   names, no "painless", "best", "advanced" or "affordable". Anything not
   verified is "confirmed at your consultation": who carries out the clean,
   whether deeper gum cleaning is done at the clinic you visit, what the
   assessment includes, instruments, extra steps. Existing site copy is
   marked VERBATIM and must not be edited. Sentences marked NEW were written
   for this page and are listed for the owner in the final report.
   ------------------------------------------------------------------ */
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";
import { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE } from "@/lib/dental-implants-page";
import type { SlotId } from "@/lib/scaling-and-polishing-slots";

/* Re-exported so this file stays the one import for the page. Both values
   are owned by the implants lib (same wording, same links). */
export { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE };

export const PAGE_PATH = "/treatments/scaling-and-polishing";

/** Single switch for the WHOLE cases section (the only patient photographs on
 *  the page). The hero uses a non-patient clinic photograph and is
 *  unaffected. Typed as boolean (not the literal `true`) so the flag-off
 *  branch is still type-checked. With the flag off, the sections either side
 *  of the cases section (tan home care, dark questions) already differ in
 *  ground, so no variant is needed. */
export const SHOW_SCALING_CASE_IMAGES: boolean = true;

/** Rendered only when BOTH are non-empty. */
export const REVIEWED_BY = "";
export const LAST_REVIEWED = "";

/* Breadcrumb trail, shared by the visible breadcrumb and the
   BreadcrumbList JSON-LD. */
export const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treatments", path: "/treatments" },
  { name: featuredTreatmentTitle("scaling-polishing"), path: PAGE_PATH },
];

/* ---------------- Metadata ---------------- */
export const META_TITLE = "Scaling & Polishing in Nampally & Mehdipatnam | Neodent";
export const META_DESCRIPTION =
  "Scaling and polishing removes plaque, tartar and stains. Learn how a routine clean differs from deeper gum cleaning, and when to ask your dentist.";
export const PROCEDURE_NAME = "Scaling and polishing";

/** Shown with groups of illustrations (same wording as the implants page's
 *  ILLUSTRATION_NOTE). */
export const ILLUSTRATION_NOTE =
  "Illustration, not to scale. Your own anatomy and plan will differ.";

/* ---------------- Rich text (highlighted phrases) ---------------- */
export type RichPart = string | { h: string; tone: "primary" | "secondary" | "quiet" };
export type Rich = RichPart[];

/* ---------------- 1. Hero ---------------- */
export const HERO = {
  sans: "Scaling and polishing,",
  accent: "a routine clean explained.",
  /* VERBATIM (research pack short summary). */
  lede: [
    "Scaling and polishing removes ",
    { h: "plaque, tartar and stains", tone: "primary" },
    " from your teeth. How often you need it and whether you need a deeper gum treatment depends on ",
    { h: "the health of your gums", tone: "secondary" },
    ", which ",
    { h: "your dentist can check", tone: "quiet" },
    ".",
  ] as Rich,
  /* Clinic photograph, no patients: Mehdipatnam treatment room (1280 x 960
     WebP, 145 KB). No legible text. Every other clinic photograph was
     checked and rejected: the Mehdipatnam interior and both waiting-area
     photographs show posters with a phone number and the words "latest /
     advanced technology" or "painless treatment", or a consultation-fee
     sign; the exteriors and the director's office show names, timings and
     "affordable". This file is also the Braces hero and the (original
     resolution) Implants hero, so it is cropped differently here: a 1.16x
     crop anchored on the chair and the lamp arm (see ScalingHero.module.css). */
  image: "/assets/neodent-clinic-mehdipatnam/web/neodent-dental-hospital-mehdipatnam-treatment-room-1-1280.webp",
  imageAlt: "Treatment room with two dental chairs, Neodent Dental Hospital, Mehdipatnam",
  captionLabel: "Treatment room",
  captionPlace: "Mehdipatnam",
};

/* ---------------- 2. What is scaling and polishing ---------------- */
export const OVERVIEW = {
  sans: "What is",
  accent: "scaling and polishing?",
  /* VERBATIM (components/sections/expertise-data.ts, scaling & polishing
     card description). */
  lede: [
    "Scaling and polishing is a ",
    { h: "routine professional clean", tone: "primary" },
    " that removes plaque and hardened tartar from the teeth, then polishes their surfaces. It is different from ",
    { h: "deeper cleaning below the gumline", tone: "secondary" },
    ", which may be considered for gum disease. A dentist or hygienist can check your gums and advise whether a routine clean is enough and ",
    { h: "how often you need one", tone: "quiet" },
    ".",
  ] as Rich,
  mediaCaption: ILLUSTRATION_NOTE,
  cards: [
    {
      title: "Scaling",
      text: "Removes plaque, tartar and stain from the tooth surfaces.",
    },
    {
      title: "Polishing",
      /* NEW: built from the home card points. */
      text: "Polishes the tooth surfaces after scaling. Surface stains from tea, coffee or tobacco are part of what a clean can address.",
    },
    {
      title: "Advice",
      text: "Advice on cleaning at home and a suitable recall interval.",
    },
  ],
  termsTitle: "Terms you may hear",
  terms: [
    /* Plaque and tartar: NEW. Gingivitis and periodontitis: research pack
       (ADA). Scaling and root planing: pack. */
    { term: "Plaque", meaning: "The soft film that builds up on teeth." },
    { term: "Tartar (calculus)", meaning: "Plaque that has hardened on the teeth." },
    {
      term: "Gingivitis",
      meaning: "Inflammation of the gums. Professional cleaning is the standard treatment for gingivitis.",
    },
    {
      term: "Periodontitis",
      meaning: "A more advanced gum disease. Treatment depends on the type and how far it has progressed.",
    },
    {
      term: "Scaling and root planing",
      meaning: "A deeper cleaning below the gumline to treat gum disease.",
    },
  ],
};

/* ---------------- 3. When might a clean be discussed ---------------- */
export const WHEN = {
  sans: "When might",
  accent: "a clean be discussed?",
  intro: [
    "Visible tartar, bleeding gums, stained teeth or bad breath can ",
    { h: "lead to a check", tone: "primary" },
    ". These signs alone do not confirm the cause. ",
    { h: "Only an examination can.", tone: "quiet" },
  ] as Rich,
  /* The lead card sits apart from the three warning signs. */
  lead: {
    slot: "G7a" as SlotId,
    title: "Visible tartar or stains",
    /* NEW. */
    text: "Hard deposits or stains you can see on your teeth.",
  },
  signs: [
    {
      slot: "G7b" as SlotId,
      title: "Bleeding or tender gums",
      text: "Red, swollen, tender or easily bleeding gums are listed as warning signs of gum disease.",
    },
    {
      slot: "G7c" as SlotId,
      title: "Bad breath or taste",
      text: "Persistent bad breath or a persistent bad taste is another warning sign of gum disease.",
    },
    {
      slot: "G7d" as SlotId,
      title: "Receding gums or loose teeth",
      text: "Receding gums and loose teeth are also listed as warning signs of gum disease.",
    },
  ],
  mediaCaption: ILLUSTRATION_NOTE,
  note: "Gum disease can occur with no warning signs. Signs alone do not confirm the cause, and only an examination can.",
};

/* ---------------- 4. Scale and polish, or deeper gum cleaning ---------------- */
export const COMPARE = {
  sans: "Scale and polish,",
  accent: "or deeper gum cleaning?",
  /* NEW. */
  intro:
    "These are different treatments for different gum conditions. Your dentist decides which one suits you after checking your gums.",
  labels: {
    purpose: "Purpose",
    who: "Who it is for",
    visits: "Visits and comfort",
    aftercare: "Aftercare",
  },
  cards: [
    {
      slot: "G2a" as SlotId,
      name: "Routine scale and polish",
      purpose: "Removes plaque, tartar and stain from tooth surfaces.",
      who: "Gingivitis or healthy gums.",
      visits: "Usually a short visit.",
      aftercare: "Little needed.",
    },
    {
      slot: "G2b" as SlotId,
      name: "Scaling and root planing",
      purpose: "Deeper cleaning below the gumline to treat gum disease.",
      who: "Gum pockets too deep for a routine cleaning.",
      visits: "May take more than one visit and may need local anaesthetic.",
      aftercare: "Soreness for a day or two, sensitivity up to about a week.",
    },
  ],
  mediaCaption: ILLUSTRATION_NOTE,
  line: "Professional cleaning is the standard treatment for gingivitis, while treatment for periodontitis depends on the type and how far it has progressed.",
  /* NEW. The card's first sentence is the statement; the second runs as the
     note beneath it. */
  statement: "Which one you need is decided at an examination.",
  statementNote:
    "Whether deeper gum cleaning is carried out at the clinic you visit, and by whom, is confirmed at your consultation.",
};

/* ---------------- 5. What happens at the appointment ---------------- */
export const APPOINTMENT = {
  sans: "What happens",
  accent: "at the appointment.",
  /* NEW. */
  intro: "General information, not a promise of what your own visit will include.",
  stages: [
    {
      slot: "G4a" as SlotId,
      title: "Your gums are checked",
      text: "The dentist or hygienist checks your gums and decides whether a routine clean is enough. What the check includes, such as probing or X-rays, is confirmed at your consultation.",
    },
    {
      slot: "G4b" as SlotId,
      title: "Plaque and tartar are removed",
      text: "Plaque and hardened tartar are removed from the teeth. Which instruments are used is for your dentist to explain.",
    },
    {
      slot: "G4c" as SlotId,
      title: "Your teeth are polished",
      text: "The tooth surfaces are polished.",
    },
    {
      slot: "G4d" as SlotId,
      title: "You get advice for home",
      text: "Advice on brushing, cleaning between teeth and diet.",
    },
  ],
  mediaCaption: ILLUSTRATION_NOTE,
  timelineTitle: "How long does it take?",
  /* NEW adaptation of the built pages' no-timeline wording. */
  timeline: [
    "There is ",
    { h: "no standard length", tone: "primary" },
    " for a clean. It depends on what your dentist finds and what your mouth needs. A routine clean is ",
    { h: "usually a short visit", tone: "quiet" },
    ".",
  ] as Rich,
  /* NEW. */
  statementLead: "Your clean depends",
  statementEm: "on your gums.",
  statementNote:
    "What your visit includes depends on how healthy your gums are. Your own plan may differ.",
};

/* ---------------- 6. How often do you need one ---------------- */
export const FREQUENCY = {
  sans: "How often do",
  accent: "you need one?",
  /* VERBATIM (research pack). */
  intro: [
    "There is ",
    { h: "no single interval", tone: "primary" },
    " that suits everyone. How often you come back depends on ",
    { h: "the health of your gums", tone: "secondary" },
    " and your risk of gum disease, and ",
    { h: "your dentist advises it", tone: "quiet" },
    ".",
  ] as Rich,
  decide: {
    title: "Your dentist decides",
    text: "After checking your gums, your dentist can advise how often you should come back, and why.",
  },
  factorsTitle: "What can change the answer",
  factors: [
    { slot: "G5a" as SlotId, text: "Gum health" },
    { slot: "G5b" as SlotId, text: "Smoking or tobacco" },
    { slot: "G5c" as SlotId, text: "Diabetes" },
    { slot: "G5d" as SlotId, text: "How well your teeth are cleaned at home" },
    { slot: "G5e" as SlotId, text: "Some medicines" },
  ],
  /* OPTIONAL card (flagged in the report): remove the whole object and the
     <article> that renders it in ScalingFrequency to drop it. */
  research: {
    title: "What research says",
    text: "Studies in adults with healthy gums found that a clean on a fixed six-monthly or yearly schedule made little or no difference to gum health compared with cleaning only when a dentist judged it necessary. Scheduled cleaning slightly reduced tartar, and people felt their teeth were cleaner. This does not apply to people with gum disease.",
  },
  /* NEW. */
  statementLead: "The right interval is set for your gums,",
  statementEm: "not by a fixed calendar rule.",
};

/* ---------------- 7. After your clean, risks and when to call ---------------- */
export const AFTER = {
  sans: "After your clean,",
  accent: "risks and when to call.",
  careLabel: "General information",
  careTitle: "Aftercare",
  care: [
    { label: "After a routine clean", text: "Little aftercare is usually needed." },
    {
      label: "After deeper cleaning",
      text: "Expect soreness for a day or two and sensitivity for up to a week. Your gums may be swollen, tender or bleed.",
    },
    {
      label: "Home care after a visit",
      text: "Brush at least twice a day with fluoride toothpaste, spit out rather than rinse, and clean your tongue.",
    },
  ],
  careFoot: "General information only. Follow your own dentist's instructions.",
  risksTitle: "Risks",
  risksLead: "Sensitivity and bleeding are the usual effects after deeper cleaning.",
  /* The second sentence is NEW. */
  risksText:
    "Like any dental treatment, cleaning is not completely free of effects. Ask your dentist about sensitivity before you start.",
  urgentTitle: "Call the clinic where you were treated if you notice:",
  urgent: [
    "severe or increasing pain",
    "swelling",
    "fever",
    "bleeding that does not settle",
  ],
};

/* ---------------- 8. Looking after your gums at home ---------------- */
export const HOME = {
  sans: "Looking after",
  accent: "your gums at home.",
  /* VERBATIM (research pack). */
  intro: [
    "A clean does not last on its own. Results depend on ",
    { h: "daily care", tone: "primary" },
    " and ",
    { h: "regular check-ups", tone: "secondary" },
    ".",
  ] as Rich,
  items: [
    { slot: "G6a" as SlotId, text: "Brush twice a day with fluoride toothpaste." },
    { slot: "G6b" as SlotId, text: "Clean between your teeth every day." },
    { slot: "G6e" as SlotId, text: "Choose a balanced diet." },
    { slot: "G6d" as SlotId, text: "Avoid tobacco." },
    { slot: "G6c" as SlotId, text: "Keep regular check-ups." },
  ],
  statement: "Not every case of gum disease is preventable.",
};

/* ---------------- 9. Cases (gated by SHOW_SCALING_CASE_IMAGES) ---------------- */
export const CASES = {
  sans: "Scaling and polishing cases",
  accent: "from Neodent.",
  /* The built case sections' intro, unchanged (it names no treatment). */
  intro: [
    "Photographs from ",
    { h: "treatment at Neodent", tone: "secondary" },
    ", shown so you can see what treatment can involve. Every case is different, and these images are ",
    { h: "not a prediction for your own mouth", tone: "quiet" },
    ".",
  ] as Rich,
  /* The only real pair for this treatment (Mehdipatnam). Both files are tiny
     (437 x 239 and 445 x 238): they are shown whole, unoptimised, never
     cropped and never wider than their own pixels. Face status could not be
     confirmed: both show a close view of the mouth with lips and a stubble
     lower face; nothing is altered, cropped or enlarged. */
  pair: {
    before: "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment before.jpg",
    after: "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment after.jpg",
    beforeAlt: "Teeth before scaling and polishing at Neodent Dental Hospital",
    afterAlt: "Scaling and polishing result at Neodent Dental Hospital",
    beforeLabel: "Before Treatment",
    afterLabel: "After Treatment",
    beforeWidth: 437,
    beforeHeight: 239,
    afterWidth: 445,
    afterHeight: 238,
    /* VERBATIM (lib/treatment-data.ts). */
    caption: "Scaling & Polishing — Neodent Dental Hospital, Mehdipatnam",
  },
  /* The FMR / Smile Design disclaimer wording with the treatment swapped. */
  evidence:
    "Supplied before and after clinical photographs from scaling and polishing at Neodent. Photographs are shown for patient understanding; treatment and its outcome vary from patient to patient.",
  privacyLead: "Images are published in line with our ",
  privacyLinkText: "privacy policy",
  privacyHref: "/privacy-policy",
};

/* ---------------- 10. Questions to ask + doctor ---------------- */
export const QUESTIONS = {
  sans: "Questions to ask",
  accent: "your dentist.",
  /* VERBATIM (research pack). */
  list: [
    "Are my gums healthy, or do I need deeper treatment?",
    "How often should I come back, and why?",
    "What should I change in my brushing and cleaning between teeth?",
    "Will it be uncomfortable, and what can be done about sensitivity?",
  ],
  doctor: {
    name: "Dr. Md. Miftah Ur Rahman",
    designation: "Prosthodontist and Implantologist",
    qualifications: "BDS, MDS, FICOI",
    treatmentLabel: "Your treatment",
    /* NEW. */
    treatment: [
      "Which clinician carries out your clean, and who plans any deeper gum treatment, is ",
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
export type ScalingFaqItem = {
  question: string;
  answer: string;
  links?: { text: string; href: string }[];
};

export const FAQ_HEADING = { sans: "Scaling and polishing", accent: "questions, answered." };

export const FAQ: ScalingFaqItem[] = [
  {
    question: "What is scaling and polishing?",
    /* VERBATIM (home card). */
    answer:
      "Scaling and polishing is a routine professional clean. It removes plaque and hardened tartar from the teeth, then polishes their surfaces. A dentist or hygienist can check your gums and advise whether a routine clean is enough.",
  },
  {
    question: "What is the difference between scaling and polishing and a deep clean?",
    answer:
      "A routine scale and polish cleans the tooth surfaces and suits healthy gums or gingivitis. Scaling and root planing is a deeper cleaning below the gumline for gum disease, where the gum pockets are too deep for a routine clean. Your dentist decides which one you need after checking your gums.",
  },
  {
    question: "Do I need a clean every six months?",
    /* NEW wording from the pack. */
    answer:
      "Not necessarily. How often you need a teeth cleaning depends on the health of your gums and your risk of gum disease, and your dentist advises the interval. Ask at your check-up how often you should come back, and why.",
  },
  {
    question: "Will scaling and polishing hurt?",
    /* NEW. */
    answer:
      "How a clean feels differs from person to person, and some people have sensitive teeth or tender gums. Tell your dentist if you are worried, and ask what can be done about sensitivity.",
  },
  {
    question: "Why do my gums bleed?",
    /* NEW wording from the pack. */
    answer:
      "Red, swollen, tender or easily bleeding gums are listed among the warning signs of gum disease, but bleeding alone does not tell you the cause. Only an examination can. If your gums bleed, it is worth booking a check.",
  },
  {
    question: "Does scaling and polishing whiten teeth?",
    /* NEW. */
    answer:
      "A professional teeth clean removes surface stains, such as those from tea, coffee or tobacco, and polishes the teeth. It is not the same as whitening, which is a separate cosmetic option. Ask your dentist what suits your teeth, and see our smile design page for the options that are discussed.",
    links: [{ text: "smile design page", href: "/treatments/smile-design" }],
  },
  {
    question: "How long does a clean take?",
    /* Same wording as the sticky "How long does it take?" card. */
    answer:
      "There is no standard length for a clean. It depends on what your dentist finds and what your mouth needs. A routine clean is usually a short visit.",
  },
  {
    question: "How much does scaling and polishing cost?",
    /* The implants "cost" answer, kept in its structure. The implants wording
       is about "how many teeth are being replaced" and "the type of
       restoration", which does not apply to a clean, so those two factors are
       swapped for the ones that do. No prices. */
    answer:
      "The cost depends on what your teeth and gums need, and whether a routine clean or deeper gum cleaning is advised. Your dentist can give you an estimate for your own plan after an examination.",
  },
  {
    question: "Where can I get scaling and polishing in Hyderabad?",
    /* The built "where" answer with the treatment noun swapped. */
    answer:
      "Neodent Dental Hospital offers scaling and polishing consultations at its Nampally and Mehdipatnam clinics in Hyderabad. Call the clinic you would like to visit.",
    links: [
      { text: "Nampally", href: BRANCH_PAGE_HREF.nampally },
      { text: "Mehdipatnam", href: BRANCH_PAGE_HREF.mehdipatnam },
    ],
  },
  {
    question: "How do I keep my gums healthy after a clean?",
    /* VERBATIM-based (research pack). */
    answer:
      "A clean does not last on its own. Brush twice a day with fluoride toothpaste, clean between your teeth daily, eat a balanced diet, avoid tobacco and keep regular check-ups. Not every case of gum disease is preventable.",
  },
];

export const FAQ_CTA_TITLE = "Ready to talk it through?";

/* ---------------- 12. Locations ---------------- */
export const LOCATIONS = {
  sans: "Where to",
  accent: "find us.",
  /* The FMR wording with the treatment noun swapped. */
  intro: [
    { h: "Scaling and polishing consultations", tone: "primary" },
    " are available at ",
    { h: "both Neodent clinics", tone: "secondary" },
    " in Hyderabad. Call ",
    { h: "the clinic you would like to visit", tone: "quiet" },
    ".",
  ] as Rich,
};

/* ---------------- 13. Related ---------------- */
/* Descriptions are the existing homepage card summaries
   (components/sections/expertise-data.ts), not newly written. */
export const RELATED = [
  {
    title: featuredTreatmentTitle("dental-implants"),
    description: "Replace a missing tooth with an implant-supported crown, bridge or denture.",
    href: "/treatments/dental-implants",
  },
  {
    title: featuredTreatmentTitle("full-mouth-rehabilitation"),
    description: "Plan staged care when many teeth or the bite need attention.",
    href: "/treatments/full-mouth-rehabilitation",
  },
  {
    title: featuredTreatmentTitle("smile-design"),
    description: "Plan cosmetic options around the changes you want to make to your smile.",
    href: "/treatments/smile-design",
  },
];
