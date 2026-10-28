/* ------------------------------------------------------------------
   /treatments/full-mouth-rehabilitation — illustration slots.

   Every piece of artwork on the page is a named slot. Task 2 (the
   illustration pass) fills a slot by setting its `art` component below;
   nothing else in the page needs to change, because each slot already sits
   inside an IllustrationFrame of the right ratio.

   A slot with no `art` renders <SlotPlaceholder id="..." /> (a neutral
   tinted tile). The four aftercare icons (M7a-d) already have artwork: the
   existing icon family from components/treatment/illustrations/icons.
   ------------------------------------------------------------------ */
import type { ComponentType } from "react";
import type { FrameRatio } from "@/components/treatments/dental-implants/IllustrationFrame";
import {
  IconCheckup,
  IconCleaning,
  IconGumHealth,
  IconNightGuard,
} from "@/components/treatment/illustrations/icons";
import { IconHistory, IconScan, IconXray } from "@/components/treatment/illustrations/fmr-icons";
import {
  BiteGrindScene,
  ChoiceMonitor,
  ChoicePhased,
  ChoiceSeparate,
  ExamArch,
  GumHealthScene,
  IncludeAlignment,
  IncludeBite,
  IncludeCosmetic,
  IncludeGum,
  IncludeRestorative,
  MissingTeethScene,
  PlanAssessment,
  PlanPhases,
  PlanReview,
  PlanWritten,
  WornTeethScene,
} from "@/components/treatment/illustrations/fmr-scenes";

export type SlotId =
  | "M1"
  | "M2a" | "M2b" | "M2c" | "M2d"
  | "M3a" | "M3b" | "M3c" | "M3d" | "M3e"
  | "M4a" | "M4b" | "M4c"
  | "M5a" | "M5b" | "M5c" | "M5d"
  | "M6a" | "M6b" | "M6c"
  | "M7a" | "M7b" | "M7c" | "M7d";

export type SlotDef = {
  ratio: FrameRatio;
  /** "scene" fills its card width; "icon" is a fixed-size tile. */
  kind: "scene" | "icon";
  /** Artwork size inside an icon tile, in px (48 or 40). */
  iconSize?: 48 | 40;
  /** Short description of the artwork the illustration pass should make. */
  brief: string;
  /** Frame padding; dense scenes in small tiles use "sm". */
  padding?: "sm" | "md";
  /** Artwork component. Leave undefined until the artwork exists. */
  art?: ComponentType;
};

const scene = (brief: string, art?: ComponentType, padding?: "sm" | "md"): SlotDef => ({
  ratio: "4 / 3",
  kind: "scene",
  brief,
  art,
  padding,
});
const icon = (size: 48 | 40, brief: string, art?: ComponentType): SlotDef => ({
  ratio: "1 / 1",
  kind: "icon",
  iconSize: size,
  brief,
  art,
});

export const SLOTS: Record<SlotId, SlotDef> = {
  /* 2. Overview */
  M1: scene("Examination view: missing, worn, filled and receded teeth, with four labelled zones", ExamArch),

  /* 3. When might it be discussed */
  M2a: scene("Several missing teeth", MissingTeethScene, "sm"),
  M2b: scene("Worn, cracked or broken teeth", WornTeethScene, "sm"),
  M2c: scene("Bite problems and grinding", BiteGrindScene, "sm"),
  M2d: scene("Gum health", GumHealthScene, "sm"),

  /* 4. What a plan can include */
  M3a: scene("Restorative care", IncludeRestorative, "sm"),
  M3b: scene("Gum health care", IncludeGum, "sm"),
  M3c: scene("Alignment", IncludeAlignment, "sm"),
  M3d: scene("Bite protection", IncludeBite, "sm"),
  M3e: scene("Cosmetic shape and colour", IncludeCosmetic, "sm"),

  /* 5A. Records (48px icons) */
  M4a: icon(48, "Medical and dental history", IconHistory),
  M4b: icon(48, "Examination and X-rays", IconXray),
  M4c: icon(48, "Scans or impressions", IconScan),

  /* 5B. Stages */
  M5a: scene("Detailed assessment", PlanAssessment, "sm"),
  M5b: scene("A written plan", PlanWritten, "sm"),
  M5c: scene("Treatment in phases", PlanPhases, "sm"),
  M5d: scene("Review and maintenance", PlanReview, "sm"),

  /* 6. Choices */
  M6a: scene("Treating each tooth separately", ChoiceSeparate),
  M6b: scene("A phased full mouth plan", ChoicePhased),
  M6c: scene("Review and monitor", ChoiceMonitor),

  /* 7. Aftercare (40px icons, existing artwork) */
  M7a: icon(40, "Cleaning", IconCleaning),
  M7b: icon(40, "Check-ups", IconCheckup),
  M7c: icon(40, "Gum health", IconGumHealth),
  M7d: icon(40, "Night guard / splint", IconNightGuard),
};
