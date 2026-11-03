import { ESTABLISHED_YEAR, legacyStats, yearsSinceEstablished } from "@/lib/site-data";
import { clinicalTeam } from "@/lib/clinical-team";
import { clinicLocationSlugs } from "@/lib/clinic-data";

/* ------------------------------------------------------------------
   /doctors page content (PAGE_PLAN.md). Values that exist elsewhere
   are imported, never retyped: the team size comes from
   lib/clinical-team.ts, the years and the patients figure from
   lib/site-data.ts. Anything that is hard-coded inside a home component
   and not exported is copied here with a comment naming its source.
   ------------------------------------------------------------------ */

/** Visible breadcrumb. The BreadcrumbList JSON-LD in app/doctors/page.tsx
    is untouched and says the same (Home, Doctors). */
export const DOCTORS_BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Doctors", path: "/doctors" },
] as const;

/** Header photograph (R0, DISCOVERY section 7, candidate 1): five
    clinicians together. The file and its alt text are the ones
    components/clinic/branch/BranchClinicalTeam.tsx already uses. The
    picture is wide (3840 x 1728), so the frame is 2:1 and the focal
    point keeps all five faces. */
export const DOCTORS_HEADER_PHOTO = {
  src: "/assets/neodent-dental-hospital-doctors.jpeg",
  alt: "Neodent clinicians and team members gathered inside the hospital",
  width: 3840,
  height: 1728,
  focal: "50% 30%",
} as const;

/** Two glass cards over the header photo, from facts already on the
    site: the two clinics and the founding year. */
export const DOCTORS_HEADER_FACTS = [
  { key: "clinics", title: "Two clinics", note: "Mehdipatnam and Nampally" },
  { key: "since", title: `Since ${ESTABLISHED_YEAR}`, note: "Specialist-led dental care" },
] as const;

/* S1 fact strip. Labels for years, clinics and patients are the home
   stat strip's own (components/sections/ExperienceIntro.tsx, where the
   array is not exported). Years and the patients figure are read from
   lib/site-data.ts, the clinic count from lib/clinic-data.ts (the home
   strip types 2; both give 2). The patients figure is client-supplied
   and unverified (home code, and CONTENT_QUESTIONS Q3): change it in
   lib/site-data.ts only. */
const patientsTreated = Number(legacyStats.patientsTreated.replace(/\D/g, ""));
const patientsSuffix = legacyStats.patientsTreated.replace(/[\d,\s]/g, "");

export type DoctorsFact = {
  key: string;
  to: number;
  suffix?: string;
  label: string;
};

export function getDoctorsFacts(): DoctorsFact[] {
  return [
    { key: "doctors", to: clinicalTeam.length, label: "doctors across both clinics" },
    { key: "clinics", to: clinicLocationSlugs.length, label: "clinics, Mehdipatnam and Nampally" },
    {
      key: "years",
      to: yearsSinceEstablished(),
      label: `years of specialist care, since ${ESTABLISHED_YEAR}`,
    },
    { key: "patients", to: patientsTreated, suffix: patientsSuffix, label: "patients treated" },
  ];
}

/* ------------------------------------------------------------------
   S2 clinical leadership. The labels, names, credential lines and
   paragraphs are the old page's own, moved word for word. The two
   treatment words inside Dr. Miftah's paragraph are links; the text
   reads exactly as before. Portraits, years and links come from
   lib/clinical-team.ts (by id), never retyped.
   ------------------------------------------------------------------ */

export type LeaderSegment = string | { text: string; href: string };

export type DoctorsLeader = {
  /** id in lib/clinical-team.ts */
  id: "siraj" | "miftah";
  label: string;
  name: string;
  credentials: string;
  paragraph: readonly LeaderSegment[];
  /** Link text under the paragraph. */
  linkText: string;
};

export const DOCTORS_LEADERSHIP_HEADING = {
  eyebrow: "Clinical leadership",
  title: "Guiding care across Mehdipatnam and Nampally",
  /* Built only from facts already on the site: the founder and the
     Assistant Director (lib/clinical-team.ts roles) and the two clinics. */
  lede: "The founder and the Assistant Director guide care at both Neodent clinics in Hyderabad.",
} as const;

export const DOCTORS_LEADERS: readonly DoctorsLeader[] = [
  {
    id: "siraj",
    label: "Founder & Director",
    name: "Dr. Mohd. Siraj Ur Rahman",
    credentials: "Dental Surgeon · Prosthodontist · Implantologist",
    paragraph: [
      "Founded Neodent in Hyderabad in 1994 and continues to lead its clinical direction across Mehdipatnam and Nampally.",
    ],
    // His data entry links to /about#founder; the home card shows "View profile".
    linkText: "View profile",
  },
  {
    id: "miftah",
    label: "Prosthodontist & Implantologist",
    name: "Dr. Md. Miftah Ur Rahman",
    credentials: "BDS, MDS, FICOI · Assistant Professor of Prosthodontics",
    paragraph: [
      "Leads ",
      // Routes: lib/clinic-data.ts treatmentRouteById (both pages exist).
      { text: "implant", href: "/treatments/dental-implants" },
      ", prosthodontic and ",
      { text: "full mouth rehabilitation", href: "/treatments/full-mouth-rehabilitation" },
      " care at both Neodent branches.",
    ],
    linkText: "View full profile",
  },
];

/* ------------------------------------------------------------------
   S3 "Dr. Miftah at work". Copied verbatim from the AT_WORK constant
   and the JSX in components/sections/ClinicalLeadership.tsx (home), where
   it is hard-coded and not exported. Shared-change request: export it
   from lib so the two pages cannot drift.
   ------------------------------------------------------------------ */
export const DOCTORS_AT_WORK = {
  src: "/assets/dr-miftah/Dr Miftah ur Rahman at Neodent Dental Hospital.jpeg",
  alt: "Dr. Md. Miftah Ur Rahman, Prosthodontist and Implantologist, standing beside the dental chair in a treatment room at Neodent Dental Hospital, Hyderabad, holding a dental study model",
  width: 960,
  height: 1280,
  title: "Dr. Miftah at work",
  copy: "A Prosthodontist and Implantologist, Dr. Md. Miftah Ur Rahman restores and replaces teeth, from crowns and dentures to dental implants, and starts every case with a full assessment before a plan is put forward.",
  linkText: "See his work and profile",
  href: "/doctors/dr-miftah-ur-rahman",
} as const;

/* ------------------------------------------------------------------
   S4 the wider clinical team. One list, no grouping by specialty and no
   clinic tabs: the owner says the doctors work together in both clinics.
   Members come from homepageSpecialists in lib/clinical-team.ts (the
   home page's "Our clinical team" row, same order); the two leaders in
   S2 are not repeated, as on the home page.
   The heading wording is the plan's proposal and awaits owner approval
   (CONTENT_QUESTIONS, plan section 12 item 5).
   ------------------------------------------------------------------ */
export const DOCTORS_TEAM_HEADING = {
  eyebrow: "Clinical team",
  title: "Doctors working together across both clinics",
  lede: "The doctors of Neodent care for patients at both the Mehdipatnam and Nampally clinics.",
} as const;

/* ------------------------------------------------------------------
   S5 both clinics, one team. Heading wording is new copy built from
   facts already on the site (the doctors work together at both clinics).
   Clinic names, addresses, hours and phones are read from
   lib/clinic-data.ts (never typed here).
   ------------------------------------------------------------------ */
export const DOCTORS_CLINICS_HEADING = {
  eyebrow: "Both clinics",
  title: "One team, two Neodent clinics",
  lede: "The doctors work together at the Mehdipatnam and Nampally clinics in Hyderabad.",
} as const;
