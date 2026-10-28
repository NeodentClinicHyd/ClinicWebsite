/* ------------------------------------------------------------------
   /treatments/scaling-and-polishing — illustration slots.

   Every piece of artwork on the page is a named slot. Build 2 (the
   illustration pass) fills a slot by setting its `art` component below;
   nothing else in the page needs to change, because each slot already sits
   inside an IllustrationFrame of the right ratio.

   A slot with no `art` would render the SlotPlaceholder (a tinted tile with
   a short label). Every slot now has its artwork.

   Slots that use an EXISTING kit icon (imported, kit files untouched):
     G5a gum health          IconGum         (icons.tsx, 48px)
     G5b smoking or tobacco  IconSmoking     (icons.tsx, 48px)
     G5c health conditions   IconHealth      (icons.tsx, 48px)
     G5e medicines           IconMedicine    (icons.tsx, 48px)
     G6a brushing            IconSdBrushing  (sd-icons.tsx, 40px)
     G6b between the teeth   IconSdFloss     (sd-icons.tsx, 40px)
     G6c check-up            IconCheckup     (icons.tsx, 40px)
     G6d no tobacco          IconNoSmoking   (icons.tsx, 40px; has a red
                             strike line, so it differs from G5b)
   New artwork (sp-scenes.tsx, sp-icons.tsx; kit files untouched):
     G1, G2a, G2b, G3, G4a-G4d scenes; G5d, G6e, G7a-G7d icons.

   Scene notes:
   G1   gum-margin cross-section with plaque and tartar. 4 / 3, padding lg.
   G2a / G2b drawn on the same tooth, scale and framing, 4 / 3 each.
   G3   healthy gums beside inflamed gums, one pair. 4 / 3.
   G4a-G4d gum check (no probe), scaling, polishing, home advice
        (4 / 3, padding sm).
   ------------------------------------------------------------------ */
import type { ComponentType } from "react";
import type { FrameRatio } from "@/components/treatments/dental-implants/IllustrationFrame";
import {
  IconCheckup,
  IconGum,
  IconHealth,
  IconMedicine,
  IconNoSmoking,
  IconSmoking,
} from "@/components/treatment/illustrations/icons";
import { IconSdBrushing, IconSdFloss } from "@/components/treatment/illustrations/sd-icons";
import {
  DeeperClean,
  GumCheck,
  GumMargin,
  GumsHealthyInflamed,
  HomeAdvice,
  PolishingStep,
  RoutineClean,
  ScalingStep,
} from "@/components/treatment/illustrations/sp-scenes";
import {
  IconSpBadBreath,
  IconSpBalancedDiet,
  IconSpBleedingGum,
  IconSpHomeCleaning,
  IconSpRecedingLoose,
  IconSpTartarStain,
} from "@/components/treatment/illustrations/sp-icons";

export type SlotId =
  | "G1"
  | "G2a" | "G2b"
  | "G3"
  | "G4a" | "G4b" | "G4c" | "G4d"
  | "G5a" | "G5b" | "G5c" | "G5d" | "G5e"
  | "G6a" | "G6b" | "G6c" | "G6d" | "G6e"
  | "G7a" | "G7b" | "G7c" | "G7d";

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
  /** Frame padding. */
  padding?: "sm" | "md" | "lg";
  /** Artwork component. A slot without one shows the SlotPlaceholder. */
  art?: ComponentType;
};

const scene = (
  label: string,
  brief: string,
  padding?: "sm" | "md" | "lg",
  art?: ComponentType,
): SlotDef => ({ ratio: "4 / 3", kind: "scene", label, brief, padding, art });

const icon = (
  size: 48 | 40,
  label: string,
  brief: string,
  art?: ComponentType,
): SlotDef => ({ ratio: "1 / 1", kind: "icon", iconSize: size, label, brief, art });

export const SLOTS: Record<SlotId, SlotDef> = {
  /* 2. What is scaling and polishing? */
  G1: scene(
    "Illustration: plaque and tartar at the gumline",
    "Gum-margin cross-section with plaque and tartar",
    "lg",
    GumMargin,
  ),

  /* 4. Scale and polish, or deeper gum cleaning? */
  G2a: scene("Illustration: routine clean above the gumline", "Routine clean above the gumline", undefined, RoutineClean),
  G2b: scene("Illustration: deeper cleaning below the gumline", "Deeper cleaning below the gumline", undefined, DeeperClean),

  /* 3. When might a clean be discussed? */
  G3: scene("Illustration: healthy gum and inflamed gum", "Healthy gum beside inflamed gum", undefined, GumsHealthyInflamed),
  G7a: icon(48, "Tartar and stain", "Tartar and stain", IconSpTartarStain),
  G7b: icon(48, "Bleeding gum", "Bleeding gum", IconSpBleedingGum),
  G7c: icon(48, "Bad breath", "Bad breath", IconSpBadBreath),
  G7d: icon(48, "Receding gum or loose tooth", "Receding gum or loose tooth", IconSpRecedingLoose),

  /* 5. What happens at the appointment */
  G4a: scene("Illustration: gum check", "Gum check", "sm", GumCheck),
  G4b: scene("Illustration: scaling", "Scaling", "sm", ScalingStep),
  G4c: scene("Illustration: polishing", "Polishing", "sm", PolishingStep),
  G4d: scene("Illustration: advice for home", "Advice for home", "sm", HomeAdvice),

  /* 6. How often do you need one? (48px) */
  G5a: icon(48, "Gum health", "Gum health", IconGum),
  G5b: icon(48, "Smoking or tobacco", "Smoking or tobacco", IconSmoking),
  G5c: icon(48, "Health conditions", "Health conditions such as diabetes", IconHealth),
  G5d: icon(48, "Cleaning at home", "Cleaning at home", IconSpHomeCleaning),
  G5e: icon(48, "Medicines", "Medicines", IconMedicine),

  /* 8. Looking after your gums at home (40px) */
  G6a: icon(40, "Brushing", "Brushing", IconSdBrushing),
  G6b: icon(40, "Between the teeth", "Cleaning between the teeth", IconSdFloss),
  G6c: icon(40, "Check-up", "Check-up", IconCheckup),
  G6d: icon(40, "No tobacco", "No tobacco", IconNoSmoking),
  G6e: icon(40, "Balanced diet", "Balanced diet", IconSpBalancedDiet),
};
