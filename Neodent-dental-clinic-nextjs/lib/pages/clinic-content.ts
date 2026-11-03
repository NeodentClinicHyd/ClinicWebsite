/* ------------------------------------------------------------------
   /clinic hub: owner-approved additions (PAGE_PLAN Q6, approved
   31 Oct 2026): breadcrumbs and a five-question FAQ.

   The visible FAQ and the FAQPage JSON-LD both read CLINIC_FAQ, so the
   schema matches the page word for word. The visible breadcrumb and the
   BreadcrumbList JSON-LD both read CLINIC_BREADCRUMBS. Phone numbers,
   hours and the founding year come from lib/site-data.ts, the single
   source; nothing is typed twice.

   Every answer uses facts already on the site. No prices, outcomes or
   promises, and no rating data.
   ------------------------------------------------------------------ */
import {
  clinicGalleryImages,
  legacyStats,
  mehdipatnamHours,
  nampallyExteriorImage,
  nampallyHours,
  nampallyInteriorImage,
  nampallyPhone,
  phone,
  type ClinicGalleryImage,
} from "@/lib/site-data";

/* ------------------------------------------------------------------
   "Spaces designed around care." -- Nampally photographs on this hub.

   Kept here, not in clinicGalleryImages (lib/site-data.ts), because that
   shared array also feeds /clinic/nampally and other pages, which are
   not changing. The two original Nampally photographs are reused from
   it unchanged; the five newer ones are added. Each entry carries the
   file's real pixel size so the gallery can render it at its natural
   aspect ratio (no crop). Files are the untouched originals (JPEG).
   ------------------------------------------------------------------ */
export type SpacesGalleryImage = ClinicGalleryImage & {
  width: number;
  height: number;
};

const nampallyAsset = (file: string) => `/assets/neodent-clinic-nampally/${file}`;

function existingNampally(
  src: string,
  width: number,
  height: number,
): SpacesGalleryImage {
  const image = clinicGalleryImages.find((item) => item.src === src);
  if (!image) throw new Error(`Missing gallery image: ${src}`);
  return { ...image, width, height };
}

export const NAMPALLY_SPACES_IMAGES: readonly SpacesGalleryImage[] = [
  existingNampally(nampallyInteriorImage, 1280, 1707),
  existingNampally(nampallyExteriorImage, 1280, 960),
  {
    src: nampallyAsset("neodent-nampally-clinic-entrance-signboard.jpg"),
    alt: "Neodent Dental Hospital Nampally — the clinic entrance with its yellow signboard, red-railed steps and treatment posters",
    branch: "Nampally",
    label: "Clinic entrance",
    width: 3024,
    height: 4032,
  },
  {
    src: nampallyAsset("neodent-nampally-reception-registration-counter.jpg"),
    alt: "Neodent Dental Hospital Nampally — the reception and registration counter with the Neodent logo and the red staircase behind",
    branch: "Nampally",
    label: "Reception counter",
    width: 3120,
    height: 4160,
  },
  {
    src: nampallyAsset("neodent-nampally-doctors-consultation-desk.jpg"),
    alt: "Neodent Dental Hospital Nampally — the doctor's consultation room with a glass-topped desk and the director's nameplate",
    branch: "Nampally",
    label: "Consultation desk",
    width: 522,
    height: 691,
  },
  {
    src: nampallyAsset("neodent-nampally-dental-treatment-room-1.jpg"),
    alt: "Neodent Dental Hospital Nampally — a dental treatment room with a red patient chair and red-framed glass partitions",
    branch: "Nampally",
    label: "Treatment room",
    width: 522,
    height: 777,
  },
  {
    src: nampallyAsset("neodent-nampally-dental-treatment-room-2.jpg"),
    alt: "Neodent Dental Hospital Nampally — a second dental treatment room with a cream patient chair and overhead light",
    branch: "Nampally",
    label: "Treatment chamber",
    width: 522,
    height: 769,
  },
];

/** "4:00 PM – 8:00 PM" -> "4:00 PM to 8:00 PM" */
const spoken = (hours: string) => hours.replace(/\s*[-\u2013]\s*/, " to ");

export const CLINIC_BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Clinics", path: "/clinic" },
];

export const CLINIC_FAQ = [
  {
    question: "Where are Neodent's dental clinics in Hyderabad?",
    answer: `Neodent Dental Hospital has two clinics in Hyderabad: Mehdipatnam, in Humayun Nagar, and Nampally, in the Medwin Hospital Complex. Mehdipatnam is the original location, where the practice began in ${legacyStats.established}.`,
  },
  {
    question: "What are the opening hours of the Neodent clinics?",
    answer: `The Mehdipatnam clinic is open Monday to Saturday, ${spoken(mehdipatnamHours)}. The Nampally clinic is open Monday to Saturday, ${spoken(nampallyHours)}. Sunday is a holiday at both clinics.`,
  },
  {
    question: "Which treatments can I have at each clinic?",
    answer:
      "Both clinics offer all seven featured treatments: composite build-up, dental implants, root canal treatment, braces and orthodontics, smile design and cosmetic dentistry, full mouth rehabilitation, and scaling and polishing.",
  },
  {
    question: "How do I book a consultation?",
    answer: `Call the Mehdipatnam clinic on ${phone} or the Nampally clinic on ${nampallyPhone}, or send an enquiry through the contact page. A Neodent specialist will take you through consultation, treatment planning and follow-up care.`,
  },
  {
    question: "Is the care the same at both clinics?",
    answer: `Yes. Both clinics follow the same patient-focused approach to consultation, treatment planning and follow-up care that has defined Neodent since ${legacyStats.established}.`,
  },
];

/** FAQPage JSON-LD built from the same array the page renders. */
export function clinicFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CLINIC_FAQ.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
