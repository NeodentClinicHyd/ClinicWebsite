/* ------------------------------------------------------------------
   /treatments/composite-build-up — illustration slots.

   Every piece of artwork on the page is a named slot. Build 2 (the
   illustration pass) fills a slot by setting its `art` component below;
   nothing else in the page needs to change, because each slot already sits
   inside an IllustrationFrame of the right ratio.

   A slot with no `art` renders the temporary placeholder tile
   (components/treatments/composite-build-up/CbuSlot.tsx).

   `brief` says what Build 2 must draw. `labels` (C1 only) are the words the
   labelled cross-section must carry. Every group of figures on the page
   carries the caption "Illustration, not to scale. Your own anatomy and plan
   will differ."
   ------------------------------------------------------------------ */
import type { ComponentType } from "react";
import type { FrameRatio } from "@/components/treatments/dental-implants/IllustrationFrame";
import { IconCheckup, IconCleaning } from "@/components/treatment/illustrations/icons";
import { IconNumb, IconSensitive } from "@/components/treatment/illustrations/cbu-icons";
import {
  CbuAnatomy,
  CbuCheckup,
  CbuMaterialAmalgam,
  CbuMaterialInlay,
  CbuMaterialIonomer,
  CbuMaterialResin,
  CbuReasonChip,
  CbuReasonCrack,
  CbuReasonDecay,
  CbuReasonWear,
  CbuVisitBond,
  CbuVisitPolish,
  CbuVisitPrepare,
  CbuVisitRemove,
} from "@/components/treatment/illustrations/cbu-scenes";

export type SlotId =
  | "C1"
  | "C2a" | "C2b" | "C2c" | "C2d"
  | "C3a" | "C3b" | "C3c" | "C3d"
  | "C4a" | "C4b" | "C4c" | "C4d"
  | "C5"
  | "I1" | "I2" | "I3" | "I4";

export type SlotDef = {
  ratio: FrameRatio;
  /** "scene" fills its card width; "icon" is a fixed-size tile. */
  kind: "scene" | "icon";
  /** Artwork size inside an icon tile, in px. */
  iconSize?: 48 | 40;
  /** What the illustration pass must draw. */
  brief: string;
  /** Words the artwork must carry as labels (C1 only). */
  labels?: string[];
  /** Frame padding. */
  padding?: "sm" | "md";
  /** Artwork component. Leave undefined until the artwork exists. */
  art?: ComponentType;
};

const scene = (ratio: FrameRatio, brief: string, extra?: Partial<SlotDef>): SlotDef => ({
  ratio,
  kind: "scene",
  brief,
  ...extra,
});
const icon = (brief: string, art?: ComponentType): SlotDef => ({
  ratio: "1 / 1",
  kind: "icon",
  iconSize: 40,
  brief,
  art,
});

export const SLOTS: Record<SlotId, SlotDef> = {
  /* 2. Overview: the dominant figure (1 slot) */
  C1: scene(
    "4 / 3",
    "Tooth cross-section with the build-up layered on the damaged area",
    { labels: ["Enamel", "Dentin", "Pulp", "Composite build-up"], art: CbuAnatomy },
  ),

  /* 3. Reasons a build-up may be discussed (4 slots, 1:1) */
  C2a: scene("1 / 1", "Decay removed, leaving a gap in the tooth", { padding: "sm", art: CbuReasonDecay }),
  C2b: scene("1 / 1", "A chipped tooth", { padding: "sm", art: CbuReasonChip }),
  C2c: scene("1 / 1", "A cracked tooth", { padding: "sm", art: CbuReasonCrack }),
  C2d: scene("1 / 1", "A worn tooth", { padding: "sm", art: CbuReasonWear }),

  /* 4. Materials (4 slots, identical scale) */
  C3a: scene("4 / 3", "Resin composite, tooth-coloured, built up on a tooth", { padding: "sm", art: CbuMaterialResin }),
  C3b: scene("4 / 3", "Amalgam, a metal-coloured filling in a tooth", { padding: "sm", art: CbuMaterialAmalgam }),
  C3c: scene("4 / 3", "Glass ionomer, a tooth-coloured filling in a tooth", { padding: "sm", art: CbuMaterialIonomer }),
  C3d: scene("4 / 3", "A lab-made inlay or onlay beside the tooth it fits", { padding: "sm", art: CbuMaterialInlay }),

  /* 5. The visit (4 slots). No needles, no realistic instruments, no blood. */
  C4a: scene("4 / 3", "Prepare the tooth: a numbed tooth, with a dam around it", { padding: "sm", art: CbuVisitPrepare }),
  C4b: scene("4 / 3", "Remove decay and shape: the cavity cleaned and shaped", { padding: "sm", art: CbuVisitRemove }),
  C4c: scene("4 / 3", "Bond and layer: thin layers of resin added, then hardened", { padding: "sm", art: CbuVisitBond }),
  C4d: scene("4 / 3", "Shape and polish: the finished, smooth surface", { padding: "sm", art: CbuVisitPolish }),

  /* 6. How long it lasts */
  C5: scene("4 / 3", "A magnifier over the edge of a restoration, at a check-up", { art: CbuCheckup }),

  /* 6. After the visit (40px icons) */
  I1: icon("Numbness: eating on the numb side", IconNumb),
  I2: icon("Sensitivity", IconSensitive),
  I3: icon("Cleaning", IconCleaning),
  I4: icon("Check-up", IconCheckup),
};
