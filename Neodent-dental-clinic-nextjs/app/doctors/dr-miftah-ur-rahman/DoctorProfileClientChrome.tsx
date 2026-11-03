"use client";

import { DrMiftahPageView } from "@/components/pages/dr-miftah/DrMiftahPageView";

/* Client chrome for the doctor profile page. The page now lives in
   components/pages/dr-miftah/ (the old components/doctors/* copy stays in
   the repo, unused by this route). */
export function DoctorProfileClientChrome() {
  return <DrMiftahPageView />;
}
