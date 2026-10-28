/** Canonical patient-facing names for Neodent's featured dental treatments. */
export const featuredTreatmentCatalog = [
  { id: "composite-build-up", title: "Composite Build-up" },
  { id: "dental-implants", title: "Dental Implants" },
  { id: "root-canal-treatment", title: "Root Canal Treatment" },
  { id: "braces-orthodontics", title: "Braces & Orthodontics" },
  { id: "smile-design", title: "Smile Design & Cosmetic Dentistry" },
  { id: "full-mouth-rehabilitation", title: "Full Mouth Rehabilitation" },
  { id: "scaling-polishing", title: "Scaling & Polishing" },
] as const;

export type FeaturedTreatmentId =
  (typeof featuredTreatmentCatalog)[number]["id"];

export function featuredTreatmentTitle(id: FeaturedTreatmentId): string {
  const treatment = featuredTreatmentCatalog.find((item) => item.id === id);
  if (!treatment) throw new Error(`Unknown featured treatment: ${id}`);
  return treatment.title;
}
