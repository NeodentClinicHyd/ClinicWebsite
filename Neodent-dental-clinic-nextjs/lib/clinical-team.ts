import { founder } from "@/lib/site-data";

/** Placement of a transparent portrait cut-out inside the shared 4:5
    frame, so every face sits at the same height and size whatever the
    framing of the source file. `width` and `left` are % of the frame
    width, `top` is % of the frame height. Derived from each file's
    alpha mask (eye line at about 30% of the frame height). */
export type PortraitCrop = {
  /** Intrinsic size of the file, for next/image. */
  file: readonly [number, number];
  width: number;
  left: number;
  top: number;
};

export type ClinicalTeamMember = {
  id: string;
  /** Plain text group label, no numbering. */
  label: string;
  /** Position at Neodent, only where it has been supplied. */
  role?: string;
  /** "leadership" cards sit on top of the home section, "specialist" in the row below. */
  group: "leadership" | "specialist";
  nameLines: readonly [string, string];
  detailLines: readonly string[];
  /** Leadership cards only: qualifications, specialism, post. */
  credentials?: readonly { term: string; value: string }[];
  /** Leadership cards only: years of experience, shown under the portrait (e.g. "32+"). */
  experienceYears?: string;
  alt: string;
  image: string | null;
  crop?: PortraitCrop;
  initials?: string;
  href?: string;
};

/**
 * Public clinician details shared by the homepage and branch pages.
 * Keep credentials and experience aligned with the approved homepage copy.
 * Order matters: branch pages list members in this order, and the home
 * page keeps it within each group.
 */
export const clinicalTeam: readonly ClinicalTeamMember[] = [
  {
    id: "siraj",
    label: "Senior clinical leadership",
    // Home card: position at Neodent only. Professor sits in "Post"; the
    // years sit under the portrait, as on Dr. Miftah's card.
    role: "Founder · Director, Neodent Dental Hospitals",
    group: "leadership",
    nameLines: ["Dr. Mohd. Siraj", "Ur Rahman"],
    detailLines: [
      "BDS · FCIP · MDS (Chennai)",
      `Professor · Director, Neodent · ${founder.experienceYears} years`,
    ],
    credentials: [
      { term: "Qualifications", value: founder.qualifications },
      { term: "Specialism", value: "Prosthodontist & Implantologist" },
      { term: "Post", value: founder.academicPost },
    ],
    experienceYears: founder.experienceYears,
    alt: "Dr. Mohd. Siraj Ur Rahman",
    image: "/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png",
    crop: { file: [714, 623], width: 155, left: -34, top: 14 },
    href: "/about#founder",
  },
  {
    id: "muti",
    label: "Clinical team",
    group: "specialist",
    nameLines: ["Dr. Md. Muti", "Ur Rahman"],
    detailLines: ["MBBS (OSM) · MD (Gen. Med.)", "5+ years"],
    alt: "Dr. Md. Muti Ur Rahman",
    image: "/assets/Dr. Md. Muti Ur Rahman - Neodent  dental clinic.png",
    crop: { file: [478, 522], width: 178, left: -41, top: -15 },
  },
  {
    id: "asiya",
    label: "Clinical team",
    group: "specialist",
    nameLines: ["Dr. Asiya", "Siraj"],
    detailLines: ["MBBS (OSM) · MRSH (LON)", "30+ years"],
    alt: "Dr. Asiya Siraj",
    image: "/assets/Dr.Asiya-Siraj.png",
    crop: { file: [416, 556], width: 100, left: 0, top: 0 },
    initials: "AS",
  },
  {
    id: "safoora",
    label: "Clinical team",
    group: "specialist",
    nameLines: ["Dr. Safoora", "Talha"],
    detailLines: ["BDS · 12+ years"],
    alt: "Dr. Safoora Talha",
    image: "/assets/Dr.Safoora-Talha.png",
    crop: { file: [401, 550], width: 105, left: -5, top: -1 },
    initials: "ST",
  },
  {
    id: "muqeet",
    label: "Clinical team",
    group: "specialist",
    nameLines: ["Dr. Muqeet", "Ur Rahman"],
    detailLines: ["BDS (OSM) · Dental Surgeon", "4+ years"],
    alt: "Dr. Muqeet Ur Rahman",
    image: "/assets/Dr.Muqeet-ur-Rahman.png",
    crop: { file: [476, 524], width: 178, left: -32, top: -5 },
  },
  {
    id: "hafsa",
    label: "Clinical team",
    role: "Dental Surgeon",
    group: "specialist",
    nameLines: ["Dr. Hafsa", "Taha"],
    detailLines: ["BDS · Dental Surgeon", "5+ years"],
    alt: "Dr. Hafsa Taha",
    image: null,
    initials: "HT",
  },
  {
    id: "miftah",
    label: "Senior clinical leadership",
    role: "Assistant Director, Neodent Dental Hospitals",
    group: "leadership",
    nameLines: ["Dr. Md. Miftah", "Ur Rahman"],
    detailLines: ["Prosthodontist & Implantologist", "BDS · MDS · FICOI (U.S.A.)"],
    credentials: [
      { term: "Qualifications", value: "BDS · MDS · FICOI (U.S.A.) · Gold Medalist" },
      { term: "Specialism", value: "Prosthodontist & Implantologist" },
      {
        term: "Post",
        value: "Assistant Professor, Department of Prosthodontics, SB Patil Dental College & Hospital",
      },
    ],
    experienceYears: "15+",
    alt: "Dr. Md. Miftah Ur Rahman",
    image: "/assets/dr-miftah/Dr. Md. Miftah Ur Rahman - Neodent Dental Hospital.png",
    crop: { file: [794, 741], width: 210, left: -106, top: -27 },
    href: "/doctors/dr-miftah-ur-rahman",
  },
];

/** Home page: Dr. Siraj, then Dr. Miftah. */
export const homepageLeadership = clinicalTeam.filter((member) => member.group === "leadership");

/** Home page: the five specialists, the monogram card (no image) last. */
export const homepageSpecialists = clinicalTeam
  .filter((member) => member.group === "specialist")
  .sort((a, b) => Number(a.image === null) - Number(b.image === null));
