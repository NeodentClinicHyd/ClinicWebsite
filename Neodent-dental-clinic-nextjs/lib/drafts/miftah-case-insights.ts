/* ==================================================================
   DRAFT — UNPUBLISHED PATIENT CASE MATERIAL.

   DO NOT IMPORT THIS FILE from any page, component or library module
   until ALL of the following are true:
     1. every fact below is verified by Dr. Md. Miftah Ur Rahman
        (set `verified: true` per fact),
     2. written publication consent has been obtained from the patient
        (`approvals.patientConsent: true`),
     3. Dr. Miftah / Neodent have approved the final wording
        (`approvals.doctor: true`),
     4. `published` is set to true.

   Nothing in the site imports this module, so none of this text is in
   the rendered HTML or in any JS bundle (the bundler only ships what
   is imported). scripts/specialties-qa.mjs asserts that the page HTML
   and every file in .next/static are free of this case text.

   Facts are limited to what the practice has supplied. Do NOT add the
   cancer type, medication, diabetes status, implant system, dates,
   measurements, reasons for the earlier implants' condition, success
   percentages or anything that could identify the patient.
   ================================================================== */

import type { CaseInsight } from "@/lib/miftah-treatment-dossiers";

export const MIFTAH_CASE_INSIGHTS: CaseInsight[] = [
  {
    id: "implants-case-01",
    dossierId: "dental-implants",
    published: false,
    heading: "A complex implant case from Australia",
    facts: [
      { text: "The patient travelled from Australia for treatment.", verified: false },
      { text: "The patient had previously recovered from cancer.", verified: false },
      { text: "The patient has diabetes, which added medical complexity to planning.", verified: false },
      { text: "Implants had been placed elsewhere approximately ten years earlier.", verified: false },
      { text: "The case presented additional clinical challenges that required careful planning.", verified: false },
      {
        text: "Dr. Miftah subsequently managed the implant-related treatment successfully, according to case information provided by the practice.",
        verified: false,
      },
    ],
    approvals: { doctor: false, patientConsent: false },
  },
];
