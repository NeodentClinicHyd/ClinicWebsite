/* ------------------------------------------------------------------
   /treatments/dental-implants — constants and flags only.

   Phones, addresses, hours and directions links are NOT defined here;
   they come from lib/site-data.ts.
   ------------------------------------------------------------------ */

/** Single switch for ALL patient imagery and the patient video on this
 *  page (the hero uses a non-patient clinic photo and is unaffected).
 *  Set to false if the National Dental Commission advisory review requires it.
 *  Typed as boolean (not the literal `true`) so the flag-off branch is
 *  still type-checked. */
export const SHOW_IMPLANT_CASE_IMAGES: boolean = true;

/** Rendered only when non-empty (together with LAST_REVIEWED). */
export const REVIEWED_BY = "";
/** Rendered only when non-empty (date string). */
export const LAST_REVIEWED = "";

/* TODO: switch to /clinic/nampally and /clinic/mehdipatnam when those
   pages exist. Both ids were confirmed to render on /clinic. */
export const BRANCH_PAGE_HREF = {
  nampally: "/clinic#nampally",
  mehdipatnam: "/clinic#mehdipatnam",
};

/* Hrefs verified against the rendered /treatments page: elements with
   id="full-mouth-rehabilitation" and id="smile-design" exist there.
   There is no scaling-and-polishing id, so that entry links to plain
   /treatments. */
export const RELATED = [
  {
    title: "Full mouth rehabilitation",
    description: "A planned, phased approach when many teeth are affected.",
    // TODO: switch to /treatments/full-mouth-rehabilitation when built
    href: "/treatments#full-mouth-rehabilitation",
  },
  {
    title: "Smile design",
    description: "A planned approach to improving the look of your teeth.",
    // TODO: switch to /treatments/smile-design when built
    href: "/treatments#smile-design",
  },
  {
    title: "Scaling and polishing",
    description: "Cleaning and gum checks, before and after implants.",
    // TODO: switch to /treatments/scaling-and-polishing when built
    href: "/treatments",
  },
];

/* Breadcrumb trail, shared by the visible breadcrumb and the
   BreadcrumbList JSON-LD so the two can never drift apart. */
export const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Treatments", path: "/treatments" },
  { name: "Dental implants", path: "/treatments/dental-implants" },
];

export const PAGE_PATH = "/treatments/dental-implants";

/* Small print at the end of the Related treatments band. */
export const GENERAL_INFO_NOTE =
  "General information only. A website cannot determine what treatment an individual needs. Only an examination by a dentist can.";

/* Body-text link targets, taken from RELATED so the hrefs cannot drift. */
const relatedHref = (title: string) =>
  RELATED.find((item) => item.title === title)?.href ?? "/treatments";
export const FULL_MOUTH_REHAB_HREF = relatedHref("Full mouth rehabilitation");
export const SCALING_HREF = relatedHref("Scaling and polishing");

/* ONE source for the visible FAQ accordion and the FAQPage JSON-LD, so the
   two texts match exactly. Answers are plain text; `links` only tells the
   visible accordion which words to turn into links. */
export type ImplantFaq = {
  question: string;
  answer: string;
  links?: { text: string; href: string }[];
};

export const IMPLANT_FAQ: ImplantFaq[] = [
  {
    question: "How long does dental implant treatment take?",
    answer:
      "Implant treatment is a process measured in months, not a single visit. The time depends on the bone available, whether anything needs treating first, such as gum disease or a bone graft, and how you heal. Your dentist will give you a plan for your own case at your consultation.",
  },
  {
    question: "Is dental implant surgery painful?",
    answer:
      "The implant is placed under local anaesthetic. Some discomfort and swelling for several days afterwards is usual, and your dentist will advise on pain relief. Contact the clinic if pain or swelling increases.",
  },
  {
    question: "Who can have a dental implant?",
    answer:
      "Whether an implant suits you can only be decided after an examination. Your dentist checks your gums, your jawbone, your general health and whether you can keep up with cleaning and check-ups. Untreated gum disease, too little bone, smoking and conditions such as diabetes may need attention first.",
  },
  {
    question: "What is the difference between a dental implant and a bridge?",
    answer:
      "A bridge is a replacement tooth held in place by crowns on the teeth either side of the gap, so those teeth may need to be reduced. An implant is a post placed in the jawbone that supports its own crown, so the teeth beside it are not used for support. An implant involves minor surgery and months of healing, while a bridge involves no surgery in the jaw. Your dentist can explain which suits you.",
  },
  {
    question: "Can dental implants help with a loose denture?",
    answer:
      "A loose denture can sometimes be made firmer by attaching it to implants. Your dentist can tell you whether this is an option for you.",
  },
  {
    question: "What if I do not have enough bone for an implant?",
    answer:
      "Your dentist checks the amount of bone with X-rays and, in some cases, 3D imaging. Where there is not enough bone, a bone graft may be advised first. This adds time to the plan, but it does not rule an implant out.",
  },
  {
    question: "How do I look after a dental implant?",
    answer:
      "Clean around it every day as your dentist shows you, and keep your regular check-ups. An implant itself cannot decay, but the gums and bone around it still need care. If you smoke, stopping is strongly advised.",
  },
  {
    question: "How long do dental implants last?",
    answer:
      "No one can promise a set number of years. How long an implant lasts depends on the health of your gums, how well it is cleaned, your check-ups, and factors such as smoking and grinding of teeth. The crown, bridge or denture on top wears over time and may need replacing. Your dentist can tell you what to expect in your case.",
  },
  {
    question: "How much do dental implants cost?",
    answer:
      "The cost depends on how many teeth are being replaced, whether anything needs treating first, and the type of restoration. Your dentist can give you an estimate for your own plan after an examination.",
  },
  {
    question: "Where can I get dental implant treatment in Hyderabad?",
    answer:
      "Neodent Dental Hospital offers dental implant consultations at its Nampally and Mehdipatnam clinics in Hyderabad. Call the clinic you would like to visit.",
    links: [
      { text: "Nampally", href: BRANCH_PAGE_HREF.nampally },
      { text: "Mehdipatnam", href: BRANCH_PAGE_HREF.mehdipatnam },
    ],
  },
];
