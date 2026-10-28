export type ClinicalTeamMember = {
  id: string;
  label: string;
  nameLines: readonly [string, string];
  detailLines: readonly string[];
  alt: string;
  image: string | null;
  initials?: string;
  homepage: boolean;
  href?: string;
};

/**
 * Public clinician details shared by the homepage and branch pages.
 * Keep credentials and experience aligned with the approved homepage copy.
 */
export const clinicalTeam: readonly ClinicalTeamMember[] = [
  {
    id: "siraj",
    label: "01 / SENIOR CLINICAL LEADERSHIP",
    nameLines: ["Dr. Mohd. Siraj", "Ur Rahman"],
    detailLines: ["BDS · FCIP · MDS (Chennai)", "Professor · Director, Neodent · 30+ years"],
    alt: "Dr. Mohd. Siraj Ur Rahman",
    image: "/assets/Dr. Mohd. Siraj Ur Rahman - Neodent Dental Hospital Hyd.png",
    homepage: true,
  },
  {
    id: "muti",
    label: "02 / NEODENT TEAM",
    nameLines: ["Dr. Md. Muti", "Ur Rahman"],
    detailLines: ["MBBS (OSM) · MD (Gen. Med.)", "5+ years"],
    alt: "Dr. Md. Muti Ur Rahman",
    image: "/assets/Dr. Md. Muti Ur Rahman - Neodent  dental clinic.png",
    homepage: true,
  },
  {
    id: "asiya",
    label: "03 / CLINICAL TEAM",
    nameLines: ["Dr. Asiya", "Siraj"],
    detailLines: ["MBBS (OSM) · MRSH (LON)", "30+ years"],
    alt: "Dr. Asiya Siraj",
    image: null,
    initials: "AS",
    homepage: true,
  },
  {
    id: "safoora",
    label: "04 / CLINICAL TEAM",
    nameLines: ["Dr. Safoora", "Talha"],
    detailLines: ["BDS · 12+ years"],
    alt: "Dr. Safoora Talha",
    image: null,
    initials: "ST",
    homepage: true,
  },
  {
    id: "muqeet",
    label: "05 / CLINICAL TEAM",
    nameLines: ["Dr. Muqeet", "Ur Rahman"],
    detailLines: ["BDS (OSM) · Dental Surgeon", "4+ years"],
    alt: "Dr. Muqeet Ur Rahman",
    image: "/assets/Dr.Muqeet-ur-Rahman.png",
    homepage: true,
  },
  {
    id: "miftah",
    label: "ASSISTANT DIRECTOR",
    nameLines: ["Dr. Md. Miftah", "Ur Rahman"],
    detailLines: ["Prosthodontist & Implantologist", "BDS · MDS · FICOI (U.S.A.)"],
    alt: "Dr. Md. Miftah Ur Rahman",
    image: "/assets/dr-miftah/Dr Miftah ur Rahman at Neodent Dental Hospital.jpeg",
    homepage: false,
    href: "/doctors/dr-miftah-ur-rahman",
  },
];

export const homepageClinicalTeam = clinicalTeam.filter((member) => member.homepage);

