/* New strings for /treatments/composite-build-up (lib/composite-build-up-page.ts
   is not edited). */

/* Standing decision D7: the Mehdipatnam card in "Where to find us" shows the
   interior photograph (960x1280, the waiting area), not the low-resolution
   exterior (382x510). The file is named exactly as the owner wrote it; it is
   the only file in public/assets/neodent-clinic-mehdipatnam/ whose name,
   ignoring spaces and hyphens, matches. The alt text describes what the
   photograph shows, names no person, and is longer than the old alt text
   ("Entrance of Neodent Dental Hospital, Mehdipatnam, with a carved wooden
   door and potted plants"). */
export const MEHDIPATNAM_INTERIOR = {
  src: "/assets/neodent-clinic-mehdipatnam/neodent dental hospital-mehdipatnam-interior.jpg",
  alt: "Waiting area at Neodent Dental Hospital, Mehdipatnam, with black leather sofas, coffee tables with magazines, a blue glass chandelier and consulting chambers behind frosted glass doors",
  /* The photograph is portrait; the card shows a landscape band of it. The
     focal point keeps the chandelier, the sofas and the table in the band. */
  position: "50% 38%",
} as const;
