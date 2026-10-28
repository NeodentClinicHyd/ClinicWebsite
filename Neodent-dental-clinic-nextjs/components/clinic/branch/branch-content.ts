import type { ClinicLocationSlug } from "@/lib/clinic-data";
import {
  mehdipatnamDirectorOfficeImage,
  mehdipatnamExteriorImage,
  mehdipatnamInteriorImage,
  mehdipatnamPatientLoungeImage,
  mehdipatnamReceptionImage,
  mehdipatnamTreatmentRoomOneImage,
  mehdipatnamTreatmentRoomTwoImage,
  mehdipatnamWaitingHallImage,
  nampallyExteriorImage,
  nampallyInteriorImage,
} from "@/lib/site-data";

/* ------------------------------------------------------------------
   Branch page -- editorial copy and photograph geometry.

   Branch FACTS (address, phone, hours, rating, directions, photographs,
   treatments, doctor) are never written here: they come from
   lib/clinic-data.ts. This file holds only the page's own prose, which
   is deliberately different for each branch, plus the intrinsic pixel
   size of each photograph so it can be rendered at its true aspect
   ratio (no cropping, no stretching).

   Every statement below is traceable to existing project content:
     - founded 1994 in Mehdipatnam, original Hyderabad location, in
       Humayun Nagar (About page, home "Spaces" section, /clinic cards)
     - Nampally sits within the Medwin Hospital Complex (/clinic cards,
       site-data.ts comments about the branch signboard)
     - address parts, hours and photograph subjects (clinic-data.ts,
       site-data.ts)
   Nothing here names landmarks, travel times, parking, accessibility
   features, equipment, outcomes or neighbouring areas beyond what the
   branch's own address already states.
   ------------------------------------------------------------------ */

export type BranchContent = {
  /** Hero: red serif accent line under "Neodent Dental Hospital". */
  accent: string;
  /** Hero lede paragraph. */
  lede: string;
  /** Intro chapter title: plain line, then a red italic closing line. */
  introTitle: [string, string];
  /** Intro prose, one string per paragraph. */
  intro: string[];
  /** Gallery chapter title (plain line, red italic line). */
  galleryTitle: [string, string];
  /** Gallery lead-in sentence. */
  galleryLede: string;
  /** Treatments chapter title (plain line, red italic line). */
  treatmentsTitle: [string, string];
  /** Treatments lead-in sentence. */
  treatmentsLede: string;
  /** Closing red card title (plain line, italic line). */
  visitTitle: [string, string];
};

export const branchContent: Record<ClinicLocationSlug, BranchContent> = {
  mehdipatnam: {
    accent: "Mehdipatnam",
    lede: "Neodent’s original Hyderabad location is in Humayun Nagar, Mehdipatnam. The clinic offers evening appointments from Monday to Saturday.",
    introTitle: ["Where Neodent began,", "in Humayun Nagar."],
    intro: [
      "Founded here in 1994, Neodent’s original Hyderabad clinic is at 10-3-14B/11/1, near Masjid-e-Azizia in Humayun Nagar, Mehdipatnam. The address and directions are provided below so you can plan your visit.",
      "Patients looking for a dental hospital in Mehdipatnam or a dental clinic near Humayun Nagar, Asifnagar, Gudimalkapur or Masab Tank can check the branch address and map directions before setting out.",
      "This page brings together the Mehdipatnam clinic’s opening hours, contact details, photographs, featured treatments and Google rating. Call the branch to confirm appointment availability before travelling; hours are Monday to Saturday, 4:00 PM–8:00 PM, with Sunday as the weekly holiday.",
    ],
    galleryTitle: ["Inside Mehdipatnam,", "room by room."],
    galleryLede:
      "Photographs of the carved entrance, the reception counter, the waiting areas, the director’s consultation office and the treatment rooms at the Mehdipatnam clinic. Select any photograph to view it in full.",
    treatmentsTitle: ["Featured dental treatments", "at Mehdipatnam."],
    treatmentsLede:
      "Open a featured treatment page for a clear overview of what it involves. Additional dental services are listed below.",
    visitTitle: ["Planning a visit to Mehdipatnam?", "Call, or get directions."],
  },
  nampally: {
    accent: "Nampally",
    lede: "Neodent Dental Hospital’s Nampally clinic is inside Medwin Hospital Complex on Chirag Ali Lane, with daytime appointments from Monday to Saturday.",
    introTitle: ["Neodent, within the", "Medwin Hospital Complex."],
    intro: [
      "The Nampally clinic is at Medwin Hospital Complex, Pillar #A1270, Raghav Ratna Towers, Chirag Ali Lane, Mahesh Nagar Colony. Its street-frontage photograph below shows the clinic signage; the full address and directions are available in the visit details.",
      "People looking for a dental hospital in Nampally or a dental clinic near Abids, Afzalgunj, Begum Bazaar, Basheer Bagh, Malakpet or Santosh Nagar can use the address and map directions below to plan a visit.",
      "This page brings together the Nampally clinic’s opening hours, contact details, photographs, featured treatments and Google rating. Call the branch to confirm appointment availability before travelling; hours are Monday to Saturday, 10:30 AM–5:00 PM, with Sunday as the weekly holiday.",
    ],
    galleryTitle: ["Nampally, from the street", "to the reception."],
    galleryLede:
      "Two photographs of the Nampally clinic: the street frontage with its signage, and the reception and staircase inside. Select either photograph to view it in full.",
    treatmentsTitle: ["Featured dental treatments", "at Nampally."],
    treatmentsLede:
      "Open a featured treatment page for a clear overview of what it involves. Additional dental services are listed below.",
    visitTitle: ["Ready to visit Nampally?", "Call, or get directions."],
  },
};

/** Intrinsic pixel size of every branch photograph, measured from the files. */
const photoSizes: Record<string, { width: number; height: number }> = {
  [mehdipatnamInteriorImage]: { width: 960, height: 1280 },
  [mehdipatnamExteriorImage]: { width: 382, height: 510 },
  [mehdipatnamReceptionImage]: { width: 4032, height: 3024 },
  [mehdipatnamDirectorOfficeImage]: { width: 3024, height: 4032 },
  [mehdipatnamTreatmentRoomOneImage]: { width: 4032, height: 3024 },
  [mehdipatnamTreatmentRoomTwoImage]: { width: 3024, height: 4032 },
  [mehdipatnamPatientLoungeImage]: { width: 1280, height: 1707 },
  [mehdipatnamWaitingHallImage]: { width: 4032, height: 3024 },
  [nampallyExteriorImage]: { width: 1280, height: 960 },
  [nampallyInteriorImage]: { width: 1280, height: 1707 },
};

export function photoSize(src: string): { width: number; height: number } {
  const size = photoSizes[src];
  if (!size) throw new Error(`Unknown branch photograph size: ${src}`);
  return size;
}
