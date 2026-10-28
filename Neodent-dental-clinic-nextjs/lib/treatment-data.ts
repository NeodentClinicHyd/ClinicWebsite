import type { ReactNode } from "react";
import { featuredTreatmentTitle } from "@/lib/featured-treatment-catalog";

/**
 * Treatment data for Section 02 — Treatment Atlas
 * 
 * Content verified against Neodent source material.
 * General dental education used conservatively with appropriate qualifiers.
 * Real Neodent before/after case evidence integrated where verified.
 */

export interface TreatmentMetadata {
  label: string;
  value: string;
}

export interface BeforeAfterCase {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  caption: string;
}

export interface TreatmentVideoCase {
  src: string;
  caption: string;
}

export interface TreatmentImageCase {
  src: string;
  alt: string;
  caption: string;
}

export interface Treatment {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: ReactNode;
  metadata?: TreatmentMetadata[];
  beforeAfter?: BeforeAfterCase;
  video?: TreatmentVideoCase;
  image?: TreatmentImageCase;
  /**
   * Doctor-profile deep link for treatments led by a named specialist.
   * Only set where the doctor is named on the site (Dr. Miftah for
   * implants, full mouth rehabilitation and smile design); the anchor
   * renders in TreatmentAct when present.
   */
  doctorHref?: string;
}

export const featuredTreatment: Treatment = {
  id: "full-mouth-rehabilitation",
  number: "01",
  eyebrow: `01 / ${featuredTreatmentTitle("full-mouth-rehabilitation")}`,
  title: featuredTreatmentTitle("full-mouth-rehabilitation"),
  doctorHref: "/doctors/dr-miftah-ur-rahman",
  description: null, // Will be filled with JSX including EditorialHighlight
  metadata: [
    {
      label: "CLINICAL AREA",
      value: "Comprehensive Rehabilitation",
    },
    {
      label: "CONCERNS ADDRESSED",
      value: "Multiple missing or damaged teeth, functional restoration",
    },
  ],
  beforeAfter: {
    beforeSrc: "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - before surgery.jpg",
    afterSrc: "/assets/treatment/Neodent dental Hospital Mehdipatnam - full mouth rehab with implants - after surgery.jpg",
    beforeLabel: "Before Surgery",
    afterLabel: "After Surgery",
    caption: "Full mouth rehabilitation with dental implants — Mehdipatnam",
  },
};

export const treatmentAtlas: Treatment[] = [
  {
    id: "composite-build-up",
    number: "02",
    eyebrow: `02 / ${featuredTreatmentTitle("composite-build-up")}`,
    title: featuredTreatmentTitle("composite-build-up"),
    description: null,
    metadata: [
      {
        label: "CONCERNS ADDRESSED",
        value: "Chipped, worn or uneven teeth; small gaps or misshapen edges",
      },
    ],
    beforeAfter: {
      beforeSrc: "/assets/treatment/Neodent dental hospital Treatment - Composite build up smile design  before.jpg",
      afterSrc: "/assets/treatment/Neodent dental hospital Treatment - Composite build up smile design after.jpg",
      beforeLabel: "Before Treatment",
      afterLabel: "After Treatment",
      caption: "Composite Build-up — Neodent Dental Hospital",
    },
  },
  {
    id: "dental-implants",
    number: "03",
    eyebrow: `03 / ${featuredTreatmentTitle("dental-implants")}`,
    title: featuredTreatmentTitle("dental-implants"),
    doctorHref: "/doctors/dr-miftah-ur-rahman",
    description: null, // Will be filled with JSX
    metadata: [
      {
        label: "CONCERNS ADDRESSED",
        value: "Missing teeth, tooth loss",
      },
    ],
    beforeAfter: {
      beforeSrc: "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - before surgery.jpg",
      afterSrc: "/assets/treatment/Neodent dental hospital Nampally - Upper Arch Rehab with implants - after surgery.jpg",
      beforeLabel: "Before Surgery",
      afterLabel: "After Surgery",
      caption: "Upper arch rehabilitation with dental implants — Nampally",
    },
  },
  {
    id: "root-canal-treatment",
    number: "04",
    eyebrow: `04 / ${featuredTreatmentTitle("root-canal-treatment")}`,
    title: featuredTreatmentTitle("root-canal-treatment"),
    description: null, // Will be filled with JSX
    metadata: [
      {
        label: "CLINICAL GOAL",
        value: "Tooth preservation where appropriate",
      },
    ],
    video: {
      src: "/assets/treatment-video/Dr. Miftah Neodent dental clinic Hyderabad-Root canal treatment.mp4",
      caption: "Root Canal Treatment — Dr. Md. Miftah Ur Rahman, Neodent Dental Hospital",
    },
  },
  {
    id: "braces-orthodontics",
    number: "05",
    eyebrow: `05 / ${featuredTreatmentTitle("braces-orthodontics")}`,
    title: featuredTreatmentTitle("braces-orthodontics"),
    description: null, // Will be filled with JSX
    metadata: [
      {
        label: "CONCERNS ADDRESSED",
        value: "Tooth alignment, spacing, crowding, bite irregularities",
      },
    ],
    beforeAfter: {
      beforeSrc: "/assets/treatment/Orthodontics before treatment - neodent dental hospital nampally.jpeg",
      afterSrc: "/assets/treatment/Orthodontics after treatment - neodent dental hospital nampally.jpeg",
      beforeLabel: "Before Treatment",
      afterLabel: "After Treatment",
      caption: "Braces & Orthodontics — Neodent Dental Hospital Nampally",
    },
  },
  {
    id: "smile-design",
    number: "06",
    eyebrow: `06 / ${featuredTreatmentTitle("smile-design")}`,
    title: featuredTreatmentTitle("smile-design"),
    doctorHref: "/doctors/dr-miftah-ur-rahman",
    description: null, // Will be filled with JSX
    metadata: [
      {
        label: "TREATMENT CONSIDERATIONS",
        value: "Tooth condition, aesthetic goals, clinical appropriateness",
      },
    ],
    beforeAfter: {
      beforeSrc: "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -before treatment.jpg",
      afterSrc: "/assets/treatment/Neodent dental hospital Hyderabad - Anterior Smile design of an accident case with zirconia crowns -after treatment.jpg",
      beforeLabel: "Before Treatment",
      afterLabel: "After Treatment",
      caption: "Anterior smile design with zirconia crowns — accident case restoration",
    },
  },
  {
    id: "scaling-polishing",
    number: "07",
    eyebrow: `07 / ${featuredTreatmentTitle("scaling-polishing")}`,
    title: featuredTreatmentTitle("scaling-polishing"),
    description: null,
    metadata: [
      {
        label: "CONCERNS ADDRESSED",
        value: "Plaque and tartar build-up; routine gum and oral hygiene care",
      },
    ],
    beforeAfter: {
      beforeSrc: "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment before.jpg",
      afterSrc: "/assets/treatment/neodent dental hospital mehdipatnam - scaling and polishing treatment after.jpg",
      beforeLabel: "Before Treatment",
      afterLabel: "After Treatment",
      caption: "Scaling & Polishing — Neodent Dental Hospital, Mehdipatnam",
    },
  },
];

export interface ServiceGroup {
  title: string;
  services: string[];
}

export const additionalServices: ServiceGroup[] = [
  {
    title: "Restorative & Prosthodontics",
    services: [
      "Crowns & Bridges",
      "Complete Dentures",
      "Removable Partial Dentures",
      "Fillings & Sealants",
    ],
  },
  {
    title: "Cosmetic Dentistry",
    services: [
      "Veneers",
      "Teeth Whitening",
      "Teeth Reshaping",
      "Cosmetic Procedures",
    ],
  },
  {
    title: "General & Preventive",
    services: [
      "Teeth Cleaning",
      "Extractions",
      "Paediatric Dentistry",
      "Mouth Guards",
    ],
  },
  {
    title: "Surgical",
    services: [
      "Oral Surgery",
      "Laser Dentistry",
    ],
  },
];
