/* ------------------------------------------------------------------
   /treatments/root-canal-treatment — illustration slots.

   Every piece of artwork on the page is a named slot. Build 2 (the
   illustration pass) fills a slot by setting its `art` component below;
   nothing else in the page needs to change, because each slot already sits
   inside an IllustrationFrame of the right ratio.

   A slot with no `art` renders the temporary placeholder tile
   (components/treatments/root-canal-treatment/RctSlot.tsx).

   `brief` says what Build 2 must draw. Every group of figures on the page
   carries the caption "Illustration, not to scale. Your own anatomy and plan
   will differ."
   ------------------------------------------------------------------ */
import type { ComponentType } from "react";
import type { FrameRatio } from "@/components/treatments/dental-implants/IllustrationFrame";
import {
  IconBiting,
  IconFacialSwelling,
  IconGumSwelling,
  IconHole,
  IconRelief,
  IconRest,
  IconRestoration,
  IconReview,
  IconSensitivity,
  IconToothache,
} from "@/components/treatment/illustrations/rct-icons";
import {
  OptionKeep,
  OptionRemove,
  OptionRetreat,
  RctAnatomy,
  RestoreCrown,
  RestoreTemporary,
  VisitClean,
  VisitFilled,
  VisitNumb,
  VisitOpen,
  VisitTemporary,
} from "@/components/treatment/illustrations/rct-scenes";

export type SlotId =
  | "R1"
  | "R2a" | "R2b" | "R2c" | "R2d" | "R2e" | "R2f"
  | "R3a" | "R3b" | "R3c"
  | "R4a" | "R4b" | "R4c" | "R4d" | "R4e"
  | "R5a" | "R5b"
  | "R6a" | "R6b" | "R6c" | "R6d";

export type SlotDef = {
  ratio: FrameRatio;
  /** "scene" fills its card width; "icon" is a fixed-size tile. */
  kind: "scene" | "icon";
  /** Artwork size inside an icon tile, in px (48 or 40). */
  iconSize?: 48 | 40;
  /** What the illustration pass must draw. */
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
  /* 2. Overview: the dominant figure */
  R1: scene(
    "Labelled tooth cross-section: enamel, dentin, pulp chamber, root canals, root tip, with gum and bone around the root",
    RctAnatomy,
  ),

  /* 3. Signs a tooth should be checked (48px icons) */
  R2a: icon(48, "Toothache", IconToothache),
  R2b: icon(48, "Sensitivity to hot or cold", IconSensitivity),
  R2c: icon(48, "Pain when biting", IconBiting),
  R2d: icon(48, "Gum swelling", IconGumSwelling),
  R2e: icon(48, "Facial swelling", IconFacialSwelling),
  R2f: icon(48, "A hole in the tooth", IconHole),

  /* 4. Options */
  R3a: scene("A root-treated tooth with its restoration", OptionKeep, "sm"),
  R3b: scene("Re-treatment of a tooth that has had a root canal before", OptionRetreat, "sm"),
  R3c: scene(
    "The gap after a tooth is removed, with the replacement shown as dashed outlines only",
    OptionRemove,
    "sm",
  ),

  /* 5. A visit. No needles, no realistic instruments, no blood. */
  R4a: scene("A numbed tooth with a dental dam around it", VisitNumb, "sm"),
  R4b: scene("The opening made to reach the pulp chamber", VisitOpen, "sm"),
  R4c: scene("Cleaned and shaped canals", VisitClean, "sm"),
  R4d: scene("A temporary filling in the tooth", VisitTemporary, "sm"),
  R4e: scene("Sealed canals with the tooth restored", VisitFilled, "sm"),

  /* 6. Restoring the tooth */
  R5a: scene("A temporary filling", RestoreTemporary),
  R5b: scene("The final restoration (a crown)", RestoreCrown),

  /* 7. Aftercare (40px icons) */
  R6a: icon(40, "Rest the tooth", IconRest),
  R6b: icon(40, "Relief", IconRelief),
  R6c: icon(40, "Restoration", IconRestoration),
  R6d: icon(40, "Review", IconReview),
};
