/* ------------------------------------------------------------------
   /treatments/smile-design — illustration slots.

   Every piece of artwork on the page is a named slot. The illustration pass
   (Build 2) fills a slot by setting its `art` component below; nothing else
   in the page needs to change, because each slot already sits inside an
   IllustrationFrame of the right ratio.

   A slot with no `art` renders the SlotPlaceholder (a tinted tile with a short
   label). Every slot now has its artwork (sd-scenes.tsx, sd-icons.tsx).

   Briefs for the illustration pass:
   SD1   planning view: frontal upper teeth with four dashed red zones
         labelled Shape, Colour, Size, Alignment. Shows planning, not a result.
   SD2   concern tiles: chipped or worn edge; colour difference between
         neighbouring teeth; uneven size and shape; gap and crowding.
   SD3   icons (48px): teeth, gums, bite, existing fillings and crowns.
   SD4   option tiles: whitening, bonding, porcelain veneer, crown, straightening.
   SD5   stage scenes: examination, healthy mouth first, planning,
         treatment and adjustment.
   SD7   enamel and veneer-preparation cross-section.
   SD8   aftercare icons (40px): brushing, cleaning between teeth, check-up,
         between teeth, check-up, hard objects, staining drinks.
   ------------------------------------------------------------------ */
import type { ComponentType } from "react";
import type { FrameRatio } from "@/components/treatments/dental-implants/IllustrationFrame";
import {
  ConcernChipped,
  ConcernColour,
  ConcernGaps,
  ConcernSize,
  EnamelPreparation,
  OptionBonding,
  OptionCrown,
  OptionStraightening,
  OptionVeneer,
  OptionWhitening,
  PlanningView,
  StageExamination,
  StageHealthyFirst,
  StagePlanning,
  StageTreatment,
} from "@/components/treatment/illustrations/sd-scenes";
import {
  IconSdBite,
  IconSdBrushing,
  IconSdCheckup,
  IconSdFloss,
  IconSdGums,
  IconSdHardObjects,
  IconSdStain,
  IconSdTeeth,
  IconSdWork,
} from "@/components/treatment/illustrations/sd-icons";

export type SlotId =
  | "SD1"
  | "SD2a" | "SD2b" | "SD2c" | "SD2d"
  | "SD3a" | "SD3b" | "SD3c" | "SD3d"
  | "SD4a" | "SD4b" | "SD4c" | "SD4d" | "SD4e"
  | "SD5a" | "SD5b" | "SD5c" | "SD5d"
  | "SD7"
  | "SD8a" | "SD8b" | "SD8c" | "SD8d" | "SD8e";

export type SlotDef = {
  ratio: FrameRatio;
  /** "scene" fills its card width; "icon" is a fixed-size tile. */
  kind: "scene" | "icon";
  /** Artwork size inside an icon tile, in px (48 or 40). */
  iconSize?: 48 | 40;
  /** Short label shown on the placeholder tile (scenes only). */
  label: string;
  /** What the illustration pass should draw. */
  brief: string;
  /** Frame padding; dense scenes in small tiles use "sm". */
  padding?: "sm" | "md";
  /** Artwork component. A slot without one shows the SlotPlaceholder. */
  art?: ComponentType;
};

const scene = (art: ComponentType, label: string, brief: string, padding?: "sm" | "md"): SlotDef => ({
  ratio: "4 / 3",
  kind: "scene",
  label,
  brief,
  padding,
  art,
});
const icon = (art: ComponentType, size: 48 | 40, label: string, brief: string): SlotDef => ({
  ratio: "1 / 1",
  kind: "icon",
  iconSize: size,
  label,
  brief,
  art,
});

export const SLOTS: Record<SlotId, SlotDef> = {
  /* 2. What is smile design? */
  SD1: scene(PlanningView, 
    "Illustration: planning view",
    "Frontal upper teeth with four dashed red zones labelled Shape, Colour, Size, Alignment",
  ),

  /* 3. Why people ask about it */
  SD2a: scene(ConcernChipped, "Illustration: chipped or worn edge", "Chipped or worn edge", "sm"),
  SD2b: scene(ConcernColour, "Illustration: colour difference", "Colour difference between neighbouring teeth", "sm"),
  SD2c: scene(ConcernSize, "Illustration: size and shape", "Uneven size and shape", "sm"),
  SD2d: scene(ConcernGaps, "Illustration: gap and crowding", "Gap and crowding", "sm"),
  SD3a: icon(IconSdTeeth, 48, "Teeth", "Teeth"),
  SD3b: icon(IconSdGums, 48, "Gums", "Gums"),
  SD3c: icon(IconSdBite, 48, "Bite", "Bite"),
  SD3d: icon(IconSdWork, 48, "Existing fillings and crowns", "Existing fillings and crowns"),

  /* 4. Options compared */
  SD4a: scene(OptionWhitening, "Illustration: whitening", "Whitening", "sm"),
  SD4b: scene(OptionBonding, "Illustration: bonding", "Bonding", "sm"),
  SD4c: scene(OptionVeneer, "Illustration: porcelain veneer", "Porcelain veneer", "sm"),
  SD4d: scene(OptionCrown, "Illustration: crown", "Crown", "sm"),
  SD4e: scene(OptionStraightening, "Illustration: straightening", "Straightening", "sm"),

  /* 5. How your plan is made */
  SD5a: scene(StageExamination, "Illustration: examination", "Examination", "sm"),
  SD5b: scene(StageHealthyFirst, "Illustration: healthy mouth first", "Healthy mouth first", "sm"),
  SD5c: scene(StagePlanning, "Illustration: planning", "Planning the options", "sm"),
  SD5d: scene(StageTreatment, "Illustration: treatment and adjustment", "Treatment and adjustment", "sm"),

  /* 6. What can be undone */
  SD7: scene(EnamelPreparation, 
    "Illustration: enamel and veneer preparation",
    "Single cross-section of enamel and veneer preparation",
  ),

  /* 7. Aftercare (40px icons) */
  SD8a: icon(IconSdBrushing, 40, "Brushing", "Brushing"),
  SD8b: icon(IconSdFloss, 40, "Cleaning between teeth", "Cleaning between teeth"),
  SD8c: icon(IconSdCheckup, 40, "Check-up", "Check-up"),
  SD8d: icon(IconSdHardObjects, 40, "Hard objects", "Avoid biting hard objects"),
  SD8e: icon(IconSdStain, 40, "Staining drinks", "Staining drinks"),
};
