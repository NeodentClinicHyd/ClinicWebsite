import type { ReactNode } from "react";

/**
 * Treatment data for Section 02 — Treatment Atlas
 * 
 * Content verified against NeoDent source material.
 * General dental education used conservatively with appropriate qualifiers.
 * Real NeoDent before/after case evidence integrated where verified.
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

export interface Treatment {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: ReactNode;
  metadata?: TreatmentMetadata[];
  beforeAfter?: BeforeAfterCase;
}

export const featuredTreatment: Treatment = {
  id: "full-mouth-rehabilitation",
  number: "01",
  eyebrow: "01 / FULL MOUTH REHABILITATION",
  title: "Full Mouth Rehabilitation",
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
    id: "dental-implants",
    number: "02",
    eyebrow: "02 / DENTAL IMPLANTS",
    title: "Dental Implants",
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
    id: "orthodontics",
    number: "03",
    eyebrow: "03 / ORTHODONTICS",
    title: "Orthodontics",
    description: null, // Will be filled with JSX
    metadata: [
      {
        label: "CONCERNS ADDRESSED",
        value: "Tooth alignment, spacing, crowding, bite irregularities",
      },
    ],
    // No verified before/after case — intentionally text-led
  },
  {
    id: "root-canal-treatment",
    number: "04",
    eyebrow: "04 / ROOT CANAL TREATMENT",
    title: "Root Canal Treatment",
    description: null, // Will be filled with JSX
    metadata: [
      {
        label: "CLINICAL GOAL",
        value: "Tooth preservation where appropriate",
      },
    ],
    // No verified before/after case — intentionally text-led
  },
  {
    id: "smile-design",
    number: "05",
    eyebrow: "05 / SMILE DESIGN & COSMETIC DENTISTRY",
    title: "Smile Design & Cosmetic Dentistry",
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
    id: "dentures-prosthodontics",
    number: "06",
    eyebrow: "06 / DENTURES & PROSTHODONTICS",
    title: "Dentures & Prosthodontics",
    description: null, // Will be filled with JSX
    metadata: [
      {
        label: "TREATMENT OPTIONS",
        value: "Complete dentures, partial dentures, implant-supported prostheses",
      },
    ],
    // No verified before/after case — intentionally text-led
  },
  {
    id: "veneers",
    number: "07",
    eyebrow: "07 / VENEERS",
    title: "Veneers",
    description: null, // Will be filled with JSX
    metadata: [
      {
        label: "MATERIAL OPTIONS",
        value: "Porcelain veneers, composite resin veneers",
      },
    ],
    // No verified before/after case — intentionally text-led
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
