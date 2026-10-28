/* ------------------------------------------------------------------
   /treatments/composite-build-up — single source of truth.

   Flags, route constants, breadcrumb trail, FAQ, related treatments and
   ALL section copy live here, so the visible page, the metadata and the
   JSON-LD can never drift apart. Phones, addresses, hours and directions
   links are NOT defined here; they come from lib/site-data.ts.

   Copy rules for this file (owner brief): the main term is "composite
   build-up"; the synonyms (tooth-coloured filling, white filling, tooth
   bonding, core build-up) appear once, in the "Other names you may hear"
   card, apart from the FAQ question that asks about white fillings. No
   prices, no lifespans in years, no "permanent", no visit count, no
   timeline, no equipment or brand names, no ratings or testimonials. What
   Neodent offers, who provides it and how a case is planned are written as
   "confirmed at your consultation" or "may".
   ------------------------------------------------------------------ */
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";
import { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE } from "@/lib/dental-implants-page";
import type { SlotId } from "@/lib/composite-build-up-slots";

/* Re-exported so this file stays the one import for the page. Both values
   are owned by the implants lib (same wording, same links). */
export { BRANCH_PAGE_HREF, GENERAL_INFO_NOTE };

export const PAGE_PATH = "/treatments/composite-build-up";

/** Single switch for the WHOLE cases section (the before / after pair and
 *  its disclaimer). The hero uses a non-patient clinic photograph and is
 *  unaffected. Typed as boolean (not the literal `true`) so the flag-off
 *  branch is still type-checked. */
export const SHOW_COMPOSITE_CASE_IMAGES: boolean = true;

/** Rendered only when BOTH are non-empty. */
export const REVIEWED_BY = "";
export const LAST_REVIEWED = "";

/* Breadcrumb trail, shared by the visible breadcrumb and the
   BreadcrumbList JSON-LD. */
export const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treatments", path: "/treatments" },
  { name: featuredTreatmentTitle("composite-build-up"), path: PAGE_PATH },
];

/* ---------------- Metadata ---------------- */
export const META_TITLE = "Composite Build-Up in Nampally & Mehdipatnam | Neodent";
export const META_DESCRIPTION =
  "Composite build-up rebuilds part of a damaged tooth with tooth-coloured resin. See the alternatives and what to ask. Nampally and Mehdipatnam, Hyderabad.";
export const PROCEDURE_NAME = "Composite build-up";

/* ---------------- Rich text (highlighted phrases) ---------------- */
export type RichPart = string | { h: string; tone: "primary" | "secondary" | "quiet" };
export type Rich = RichPart[];
export type TextLink = { text: string; href: string };

/* ---------------- 1. Hero ---------------- */
export const HERO = {
  sans: "Composite build-up,",
  accent: "rebuilt layer by layer.",
  lede: [
    "A composite build-up rebuilds part of a damaged tooth with ",
    { h: "tooth-coloured resin", tone: "primary" },
    ". Whether it suits you depends on ",
    { h: "how much of the tooth is left", tone: "secondary" },
    " and where the damage sits, which your dentist can assess at an examination.",
  ] as Rich,
  /* Non-patient clinic photograph: Mehdipatnam treatment room 2 (1280 x 960
     derivative). Every other clean clinic photograph is already a hero on
     the implants (room 1), braces (room 1), root canal (Nampally interior)
     and FMR (room 2) pages; the remaining photographs show fee signs, name
     boards, phone numbers or patient posters. Room 2 is shared with FMR
     only. */
  image: "/assets/neodent-clinic-mehdipatnam/web/neodent-dental-hospital-mehdipatnam-treatment-room-2-1280.jpg",
  imageAlt:
    "Treatment room with a pink dental chair and wooden cabinets, Neodent Dental Hospital, Mehdipatnam",
  captionLabel: "Treatment room",
  captionPlace: "Mehdipatnam",
};

/* ---------------- 2. What is it ---------------- */
export const OVERVIEW = {
  sans: "What is a",
  accent: "composite build-up?",
  lede: [
    "A composite build-up rebuilds part of a damaged tooth with ",
    { h: "tooth-coloured resin bonded directly to it", tone: "primary" },
    ".",
  ] as Rich,
  what: {
    title: "What it is",
    text: "The resin is hardened with a blue light, then shaped and polished to replace tooth structure that has been lost.",
  },
  pair: {
    who: {
      title: "Who might be offered one",
      text: "A dentist may discuss it for a chip, worn area or decay, after checking how much healthy tooth remains and where the damage is.",
    },
    check: {
      title: "What an assessment checks",
      list: [
        "How much healthy tooth remains",
        "Where the edges of the damage sit",
        "Whether the tooth can be kept dry during treatment",
        "Your dentist usually uses X-rays to help decide.",
      ],
    },
  },
  names: {
    title: "Other names you may hear",
    text: "People often say tooth-coloured filling, white filling or tooth bonding. A core build-up is a related term, used when a tooth is rebuilt under a crown. Your dentist can explain how these differ for your tooth.",
  },
};

/* ---------------- 3. When might your dentist suggest one ---------------- */
export const WHEN = {
  sans: "When might your dentist",
  accent: "suggest one?",
  intro:
    "These are common reasons a composite build-up may be discussed. Your dentist decides after an examination.",
  cards: [
    {
      slot: "C2a",
      title: "Decay that has been removed",
      text: "Once decay is cleaned out, a gap may be left that needs rebuilding.",
    },
    {
      slot: "C2b",
      title: "A chipped tooth",
      text: "A chip can leave an uneven edge. A dentist may discuss rebuilding the missing part.",
    },
    {
      slot: "C2c",
      title: "A cracked tooth",
      text: "Cracks and fractures are among the reasons a composite restoration may be used. Whether a build-up is enough depends on the tooth.",
    },
    {
      slot: "C2d",
      title: "A worn tooth",
      text: "Wear can reduce the amount of tooth left. A build-up may be one option your dentist discusses.",
    },
  ] as { slot: SlotId; title: string; text: string }[],
  strip:
    "Sensitivity, a rough edge or food catching in a tooth are reasons to book an assessment. They do not tell you what is wrong. Only an examination can.",
};

/* ---------------- 4. Materials (the angle section) ---------------- */
export const MATERIALS = {
  sans: "Composite, amalgam and",
  accent: "other materials",
  intro: "Several materials can rebuild a tooth. Each has trade-offs, and the right choice depends on your tooth.",
  whatLabel: "What it is",
  tradeLabel: "Main trade-off",
  cards: [
    {
      slot: "C3a",
      name: "Resin composite",
      what: "Tooth-coloured resin that bonds to the tooth.",
      trade: "It needs a dry field and careful layering. Over time it can chip, roughen or discolour.",
    },
    {
      slot: "C3b",
      name: "Amalgam",
      what: "A strong, wear-resistant material.",
      trade: "It is not tooth-coloured.",
    },
    {
      slot: "C3c",
      name: "Glass ionomer",
      what: "A tooth-coloured material that releases fluoride.",
      trade: "It has lower fracture resistance, so it is not suited to areas that take heavy biting load.",
    },
    {
      slot: "C3d",
      name: "Inlay or onlay (lab-made)",
      what: "A restoration made in a laboratory, used where extra reinforcement is needed.",
      trade: "It needs more than one visit and removes more tooth.",
    },
  ] as { slot: SlotId; name: string; what: string; trade: string }[],
  /* First sentence = the existing home-card sentence, verbatim. */
  statementLead: "A filling, inlay, onlay or crown may be more suitable in some cases.",
  statementText:
    "Which of these materials suit your tooth, and which Neodent offers for it, is confirmed at your consultation.",
};

/* ---------------- 5. What happens at the visit ---------------- */
export const VISIT = {
  sans: "What happens",
  accent: "at the visit",
  intro: "This is general information. Your own visit may differ, and your dentist will explain each step.",
  stages: [
    {
      slot: "C4a",
      title: "Prepare the tooth",
      text: "Local anaesthetic is used if needed. A rubber dam may be placed to keep the tooth dry.",
    },
    {
      slot: "C4b",
      title: "Remove decay and shape",
      text: "Decay or damaged material is removed and the tooth is shaped.",
    },
    {
      slot: "C4c",
      title: "Bond and layer",
      text: "A bonding agent is applied, then the composite is built up in thin layers. Each layer is hardened with a blue light.",
    },
    {
      slot: "C4d",
      title: "Shape and polish",
      text: "The restoration is shaped and polished.",
    },
  ] as { slot: SlotId; title: string; text: string }[],
  timeTitle: "How long does it take?",
  time: "The number of visits depends on the tooth and what it needs. Your dentist will explain what to expect for yours.",
  statementLead: "A plan built around",
  statementEm: "your tooth.",
  statementSub: "How much of the tooth is left, where the damage sits and how you bite all shape the plan.",
};

/* ---------------- 6. Looking after the tooth, and how long it lasts ---------------- */
export const CARE = {
  sans: "Looking after the tooth,",
  accent: "and how long it lasts.",
  intro: "This is general information. Follow your own dentist's instructions.",
  lasts: {
    slot: "C5" as SlotId,
    title: "How long does it last?",
    text: "There is no standard lifespan. How long a build-up lasts depends on the size of the restoration, how hard you bite or grind your teeth, and how well the tooth is kept clean. Regular check-ups let your dentist monitor the edges. Outcomes vary from person to person.",
  },
  afterTitle: "After the visit",
  after: [
    {
      slot: "I1",
      text: "Numbness can last several hours. Avoid eating on the numb side, and avoid hot drinks until feeling returns.",
    },
    {
      slot: "I2",
      text: "Some sensitivity is normal and usually settles. Contact the clinic if it does not.",
    },
    {
      slot: "I3",
      text: "Brush twice a day with fluoride toothpaste and clean between your teeth daily.",
    },
    {
      slot: "I4",
      text: "Keep your regular check-ups so your dentist can monitor the edges of the restoration.",
    },
  ] as { slot: SlotId; text: string }[],
  risksTitle: "Risks to know about",
  risks: [
    "A composite can chip, roughen or discolour over time.",
    "Fracture or new decay at the edges can happen.",
    "It may need repair or replacement.",
    "Not all damage can be prevented.",
  ],
  urgentTitle: "Call the clinic where you were treated if you notice:",
  urgent: [
    "the bite feels high",
    "an edge feels sharp",
    "the filling comes out",
    "sensitivity that does not settle",
  ],
};

/* ---------------- 7. Cases ---------------- */
export const CASES = {
  sans: "Composite build-up cases",
  accent: "from Neodent.",
  lede: [
    "Photographs from ",
    { h: "composite build-up treatment at Neodent", tone: "secondary" },
    ", shown so you can see what treatment can involve.",
  ] as Rich,
  /* Two existing files; note the DOUBLE SPACE before "before". Shown whole
     at their own 4:3 ratio, never cropped, never above 1280 x 960. The eye
     area is mosaic-pixelated in the files; the lower face is visible. */
  before: {
    src: "/assets/treatment/Neodent dental hospital Treatment - Composite build up smile design  before.jpg",
    alt: "Tooth before composite build-up treatment",
    label: "Before",
  },
  after: {
    src: "/assets/treatment/Neodent dental hospital Treatment - Composite build up smile design after.jpg",
    alt: "Tooth after composite build-up treatment",
    label: "After Treatment",
  },
  width: 1280,
  height: 960,
  caption: "Composite Build-up — Neodent Dental Hospital",
  evidence:
    "Supplied before and after clinical photographs from composite build-up treatment at Neodent. Photographs are shown for patient understanding; composite build-up treatment and its outcome vary from patient to patient. Images are published in line with our ",
  privacyLinkText: "privacy policy",
  privacyHref: "/privacy-policy",
  statement: "Every case is different, and these images are not a prediction for your own mouth.",
};

/* ---------------- 8. Questions to ask + doctor ---------------- */
export const QUESTIONS = {
  sans: "Questions to ask",
  accent: "your dentist",
  list: [
    "Is a filling, a build-up, an inlay or onlay, or a crown more suitable for my tooth, and why?",
    "How will you keep the tooth dry while it is placed?",
    "What happens if the tooth needs more work later?",
    "How will you check it at follow-up?",
  ],
  doctor: {
    name: "Dr. Md. Miftah Ur Rahman",
    designation: "Prosthodontist and Implantologist",
    qualifications: "BDS, MDS, FICOI",
    treatmentLabel: "Your treatment",
    treatment: [
      "Which clinician assesses and carries out your composite build-up is ",
      { h: "confirmed at your consultation", tone: "primary" },
      ".",
    ] as Rich,
    profileHref: "/doctors/dr-miftah-ur-rahman",
    imageAlt: "Dr. Md. Miftah Ur Rahman, smiling, arms folded, in a white coat",
  },
};

/* ---------------- 9. FAQ ---------------- */
/* ONE source for the visible accordion and the FAQPage JSON-LD. Answers are
   plain text; `links` only tells the accordion which words to link. */
export type CompositeFaqItem = {
  question: string;
  answer: string;
  links?: TextLink[];
};

export const FAQ_HEADING = { sans: "Composite build-up", accent: "questions, answered." };

export const COMPOSITE_FAQ: CompositeFaqItem[] = [
  {
    question: "What is a composite build-up?",
    answer:
      "A composite build-up rebuilds part of a damaged tooth with tooth-coloured resin bonded directly to it. The resin is hardened with a blue light, then shaped and polished. Your dentist can tell you after an examination whether it suits your tooth.",
  },
  {
    question: "Is a composite build-up the same as a white filling?",
    answer:
      "The two terms overlap, because both use tooth-coloured resin bonded to the tooth. A build-up is often the term for rebuilding a larger part of a tooth than a small filling does. How Neodent describes each is confirmed at your consultation.",
  },
  {
    question: "Can a chipped tooth be repaired with a composite build-up?",
    answer:
      "A chipped tooth is one of the reasons a dentist may discuss a build-up, after checking how much healthy tooth remains. Whether it suits your tooth depends on an examination.",
  },
  {
    question: "What is the difference between a composite build-up, an inlay or onlay, and a crown?",
    answer:
      "A composite build-up is shaped directly on the tooth. An inlay or onlay is made in a laboratory and needs more than one visit. A crown covers the whole tooth. Your dentist can explain which may suit your tooth.",
  },
  {
    question: "Does a composite build-up hurt?",
    answer:
      "Local anaesthetic is used if needed, so the area is numb during treatment. Some sensitivity afterwards is normal and usually settles. Contact the clinic if it does not.",
  },
  {
    question: "How many visits does it take?",
    answer:
      "This depends on the tooth and what it needs. Your dentist will explain what to expect after an examination.",
  },
  {
    question: "How long does a composite build-up last?",
    answer:
      "There is no standard lifespan. It depends on the size of the restoration, how hard you bite or grind, and how well the tooth is cleaned. Regular check-ups let your dentist monitor the edges.",
  },
  {
    question: "How much does a composite build-up cost?",
    /* Same wording as the implants / root canal cost answers, with the
       treatment-specific clause adapted ("which tooth is being treated"),
       exactly as the root canal page does. */
    answer:
      "The cost depends on which tooth is being treated, whether anything needs treating first, and the type of restoration. Your dentist can give you an estimate for your own plan after an examination.",
  },
  {
    question: "How do I look after a composite build-up?",
    answer:
      "Brush twice a day with fluoride toothpaste, clean between your teeth daily and keep your regular check-ups. Follow your own dentist's instructions.",
  },
  {
    question: "Where can I get a composite build-up in Hyderabad?",
    answer:
      "Neodent Dental Hospital offers composite build-up consultations at its Nampally and Mehdipatnam clinics in Hyderabad. Call the clinic you would like to visit.",
    links: [
      { text: "Nampally", href: BRANCH_PAGE_HREF.nampally },
      { text: "Mehdipatnam", href: BRANCH_PAGE_HREF.mehdipatnam },
    ],
  },
];

export const FAQ_CTA_TITLE = "Ready to talk it through?";

/* ---------------- 10. Locations ---------------- */
export const LOCATIONS = {
  sans: "Where to",
  accent: "find us.",
  intro: [
    { h: "Composite build-up consultations", tone: "primary" },
    " are available at ",
    { h: "both Neodent clinics", tone: "secondary" },
    " in Hyderabad. Call ",
    { h: "the clinic you would like to visit", tone: "quiet" },
    ".",
  ] as Rich,
};

/* ---------------- 11. Related ---------------- */
/* Descriptions are the existing homepage card summaries
   (components/sections/expertise-data.ts), not newly written. The smile
   design page does not exist yet, so it uses the hub anchor. */
export const RELATED = [
  {
    title: featuredTreatmentTitle("root-canal-treatment"),
    description: "Treat infection or inflammation inside a tooth so it may be kept.",
    href: "/treatments/root-canal-treatment",
  },
  {
    title: featuredTreatmentTitle("smile-design"),
    description: "Plan cosmetic options around the changes you want to make to your smile.",
    href: "/treatments/smile-design",
  },
  {
    title: featuredTreatmentTitle("full-mouth-rehabilitation"),
    description: "Plan staged care when many teeth or the bite need attention.",
    href: "/treatments/full-mouth-rehabilitation",
  },
];
