import {
  clinicGalleryImages,
  directions,
  googleRating,
  mehdipatnamAddress,
  mehdipatnamExteriorImage,
  mehdipatnamHours,
  mehdipatnamInteriorImage,
  mehdipatnamStructuredAddress,
  nampallyAddress,
  nampallyExteriorImage,
  nampallyGoogleRating,
  nampallyHours,
  nampallyInteriorImage,
  nampallyStructuredAddress,
  nampallyDirections,
  nampallyPhone,
  nampallyTelPhone,
  phone,
  telPhone,
} from "@/lib/site-data";
import { featuredTreatmentCatalog } from "@/lib/featured-treatment-catalog";

export const clinicLocationSlugs = ["mehdipatnam", "nampally"] as const;

export type ClinicLocationSlug = (typeof clinicLocationSlugs)[number];

export type ClinicLocation = {
  slug: ClinicLocationSlug;
  name: string;
  locality: string;
  address: string;
  structuredAddress: typeof mehdipatnamStructuredAddress | typeof nampallyStructuredAddress;
  phone: string;
  tel: string;
  hours: string;
  weeklyHours: string;
  weeklyClosure: string;
  schemaOpeningHours: string;
  rating: { score: string; count: number };
  ratingNote: string;
  seo: { title: string; description: string };
  directions: string;
  primaryImage: { src: string; alt: string; label: string };
  secondaryImage: { src: string; alt: string; label: string };
  gallery: typeof clinicGalleryImages;
  doctors: readonly {
    name: string;
    role: string;
    href: string;
  }[];
  treatments: typeof clinicTreatments;
  patientStory: { video: string; quote: string; alt: string };
};

const treatmentRouteById = {
  "composite-build-up": "/treatments/composite-build-up",
  "dental-implants": "/treatments/dental-implants",
  "root-canal-treatment": "/treatments/root-canal-treatment",
  "braces-orthodontics": "/treatments/braces-and-orthodontics",
  "smile-design": "/treatments/smile-design",
  "full-mouth-rehabilitation": "/treatments/full-mouth-rehabilitation",
  "scaling-polishing": "/treatments/scaling-and-polishing",
} satisfies Record<(typeof featuredTreatmentCatalog)[number]["id"], string>;

export const clinicTreatments = featuredTreatmentCatalog.map((treatment) => ({
  ...treatment,
  href: treatmentRouteById[treatment.id],
}));

const sharedDoctor = {
  name: "Dr. Md. Miftah Ur Rahman",
  role: "Assistant Director · Prosthodontist & Implantologist",
  href: "/doctors/dr-miftah-ur-rahman",
} as const;

/**
 * The two clinic detail pages share this branch data. Contact and listing
 * values are imported from site-data.ts, while treatments come from the
 * canonical featured treatment catalog.
 */
export const clinicLocations = {
  mehdipatnam: {
    slug: "mehdipatnam",
    name: "Mehdipatnam",
    locality: "Humayun Nagar · Mehdipatnam · Hyderabad",
    address: mehdipatnamAddress,
    structuredAddress: mehdipatnamStructuredAddress,
    phone,
    tel: telPhone,
    hours: mehdipatnamHours,
    weeklyHours: "Monday–Saturday",
    weeklyClosure: "Sunday holiday",
    schemaOpeningHours: "Mo-Sa 16:00-20:00",
    rating: googleRating,
    ratingNote: "Google listing snapshot; rating and review count may change.",
    seo: {
      title: "Dental Hospital in Mehdipatnam, Hyderabad | Neodent",
      description:
        "Visit Neodent Dental Hospital in Humayun Nagar, Mehdipatnam. Check clinic hours, directions, clinician information and dental treatments near Asifnagar and Masab Tank.",
    },
    directions,
    primaryImage: {
      src: mehdipatnamInteriorImage,
      alt: "Patient waiting lounge at Neodent Dental Hospital, Mehdipatnam",
      label: "Waiting lounge",
    },
    secondaryImage: {
      src: mehdipatnamExteriorImage,
      alt: "Entrance to Neodent Dental Hospital, Mehdipatnam",
      label: "Entrance",
    },
    gallery: clinicGalleryImages.filter((image) => image.branch === "Mehdipatnam"),
    doctors: [sharedDoctor],
    treatments: clinicTreatments,
    patientStory: {
      video: "/assets/happy-patients/Neodent dental hospital Mehdipatnam - Happy Patients after treatment.mp4",
      quote: "It was very beneficial, and I am feeling good.",
      alt: "Patient testimonial filmed after treatment at Neodent Dental Hospital, Mehdipatnam",
    },
  },
  nampally: {
    slug: "nampally",
    name: "Nampally",
    locality: "Nampally · Hyderabad",
    address: nampallyAddress,
    structuredAddress: nampallyStructuredAddress,
    phone: nampallyPhone,
    tel: nampallyTelPhone,
    hours: nampallyHours,
    weeklyHours: "Monday–Saturday",
    weeklyClosure: "Sunday holiday",
    schemaOpeningHours: "Mo-Sa 10:30-17:00",
    rating: nampallyGoogleRating,
    ratingNote: "Google listing snapshot; rating and review count may change.",
    seo: {
      title: "Dental Hospital in Nampally, Hyderabad | Neodent",
      description:
        "Find Neodent Dental Hospital in Medwin Hospital Complex, Nampally. Check clinic hours, directions, clinician information and dental treatments near Abids and Afzalgunj.",
    },
    directions: nampallyDirections,
    primaryImage: {
      src: nampallyExteriorImage,
      alt: "Street frontage of Neodent Dental Hospital, Nampally",
      label: "Street frontage",
    },
    secondaryImage: {
      src: nampallyInteriorImage,
      alt: "Reception and staircase inside Neodent Dental Hospital, Nampally",
      label: "Reception",
    },
    gallery: clinicGalleryImages.filter((image) => image.branch === "Nampally"),
    doctors: [sharedDoctor],
    treatments: clinicTreatments,
    patientStory: {
      video: "/assets/happy-patients/Neodent dental hospital Nampally- Happy Patients after treatment.mp4",
      quote: "It went even better than we expected.",
      alt: "Patient testimonial filmed after treatment at Neodent Dental Hospital, Nampally",
    },
  },
} satisfies Record<ClinicLocationSlug, ClinicLocation>;

export function getClinicLocation(slug: string): ClinicLocation | undefined {
  if (!clinicLocationSlugs.includes(slug as ClinicLocationSlug)) return undefined;
  return clinicLocations[slug as ClinicLocationSlug];
}
