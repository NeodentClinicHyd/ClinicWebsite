import treatmentMedia from "@/lib/miftah-treatment-media.json";
import type { EvidenceItem } from "@/components/doctors/TreatmentEvidenceViewer";

/* ------------------------------------------------------------------
   Real treatment evidence for Dr. Miftah's four featured specialties —
   shared by the Section 03 cards and the treatment dossier dialog.
   Moved verbatim from DrMiftahProfile.tsx. Copy is neutral: supplied
   images are described as supplied clinical photographs; no claim is
   made about patients being the same or about outcomes.
   ------------------------------------------------------------------ */

export type MediaKey = keyof typeof treatmentMedia;

export const RCT_STAGES: { key: MediaKey; label: string; stage: string }[] = [
  { key: "rctPre", label: "Pre", stage: "pre-treatment" },
  { key: "rctMid", label: "Mid", stage: "mid-treatment" },
  { key: "rctPost", label: "Post", stage: "post-treatment" },
];

export const RCT_FILMS: { short: string; item: EvidenceItem }[] = [
  {
    short: "Explainer",
    item: {
      kind: "video",
      src: "/assets/dr-miftah/treatments/dr-md-miftah-ur-rahman-root-canal-treatment-explainer.mp4",
      caption: "Root canal treatment — explainer film",
      label: "Root canal treatment explainer film",
    },
  },
  {
    short: "Treatment",
    item: {
      kind: "video",
      src: "/assets/dr-miftah/treatments/dr-md-miftah-ur-rahman-root-canal-treatment.mp4",
      caption: "Root canal treatment — treatment film",
      label: "Root canal treatment film",
    },
  },
];

export const RCT_XRAY_ITEMS: EvidenceItem[] = RCT_STAGES.map(({ key, stage }) => ({
  kind: "image",
  src: treatmentMedia[key].src,
  width: treatmentMedia[key].width,
  height: treatmentMedia[key].height,
  alt: `Root canal treatment radiograph — ${stage} stage`,
  caption: `Root canal treatment — ${stage} radiograph`,
}));

export function pairItems(name: string, before: MediaKey, after: MediaKey): EvidenceItem[] {
  return (
    [
      [before, "before"],
      [after, "after"],
    ] as const
  ).map(([key, when]) => ({
    kind: "image",
    src: treatmentMedia[key].src,
    width: treatmentMedia[key].width,
    height: treatmentMedia[key].height,
    alt: `${name} — supplied ${when}-treatment clinical photograph, Neodent Dental Hospital`,
    caption: `${name} — ${when} treatment`,
  }));
}
