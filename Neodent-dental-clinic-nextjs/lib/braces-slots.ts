/* ------------------------------------------------------------------
   /treatments/braces-and-orthodontics — illustration slots.

   Every piece of artwork on the page is a named slot. Build 2 (the
   illustration pass) filled each slot by setting its `art` component below;
   nothing else in the page needs to change, because each slot already sits
   inside an IllustrationFrame of the right ratio.

   A slot with no `art` would render the temporary placeholder tile
   (components/treatments/braces-and-orthodontics/BrcSlot.tsx). After Build 2
   every slot has art except B5p, which is real markup (BrcPhaseBar).

   `brief` says what Build 2 must draw. Every group of figures on the page
   carries the caption "Illustration, not to scale. Your own anatomy and plan
   will differ."

   Drawing rules for Build 2: no faces and no people; no brand or product
   names; no appliance the page does not describe (no aligner trays, no
   ceramic or lingual braces). The removable retainer (B8b) must read as an
   acrylic plate with a wire across the front teeth and must NOT read as a
   clear aligner tray.

   Existing parts to reuse: components/treatment/illustrations/arch.tsx
   (ArchFront: per-tooth `bracket`, `dx`, `dy`, `rot`) and the FMR scene
   IncludeAlignment (fmr-scenes.tsx) for brackets, wire and movement arrows.
   ------------------------------------------------------------------ */
import type { ComponentType } from "react";
import { BRACE_TYPES, type BraceTypeId } from "@/lib/braces-orthodontics-page";
import type { FrameRatio } from "@/components/treatments/dental-implants/IllustrationFrame";
import {
  IconAdult,
  IconBite,
  IconBrushing,
  IconCrowding,
  IconGaps,
  IconInterdental,
  IconParent,
  IconSweet,
  IconTeen,
  IconWax,
} from "@/components/treatment/illustrations/braces-icons";
import {
  ApplianceHeadgear,
  BracesOverview,
  ElasticsScene,
  FixedRetainerScene,
  RemovableRetainerScene,
  StageAdjustment,
  StageAssessment,
  StageFitting,
  StageRetainers,
} from "@/components/treatment/illustrations/braces-scenes";

export type SlotId =
  | "B1"
  | "B2a" | "B2b" | "B2c"
  | "B3b" | "B3c"
  | "B5p"
  | "B5a" | "B5b" | "B5c" | "B5d"
  | "B6a" | "B6b" | "B6c"
  | "B7a" | "B7b" | "B7c" | "B7d"
  | "B8a" | "B8b";

/** Every slot except the phase bar: these render through BrcSlot. */
export type ArtSlotId = Exclude<SlotId, "B5p">;

export type SlotDef = {
  /** The kit's IllustrationFrame has no wide ratio, so the phase bar (B5p)
   *  is sized by its own component (BrcPhaseBar) at about 4 / 1. */
  ratio: FrameRatio | "4 / 1";
  /** "scene" fills its card width; "icon" is a fixed-size tile; "bar" is the
   *  phase bar's decorative strip. */
  kind: "scene" | "icon" | "bar";
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
  B1: scene(
    "Frontal arch (upper and lower) with brackets bonded to the teeth and a wire running through them; labels: Bracket, Wire. Reuse ArchFront with bracket: true on every tooth.",
    BracesOverview,
  ),

  /* 3. Is it right for me (48px icons) */
  B2a: icon(48, "Crowded or crooked teeth: front teeth overlapping or turned", IconCrowding),
  B2b: icon(48, "Gaps between teeth: front teeth with visible spaces", IconGaps),
  B2c: icon(48, "Bite concerns: a side view showing an overbite and an underbite", IconBite),

  /* 4. Other appliances. B3a (fixed braces on the arch) is retired from the
        page in Build 3: the metal, ceramic and self-ligating types now cover
        it. Its scene, FixedBraces, stays in the illustration kit
        (braces-scenes.tsx). */
  B3b: scene(
    "A removable functional appliance (a generic acrylic plate, no brand) beside a simple headgear shape",
    ApplianceHeadgear,
    "sm",
  ),
  B3c: scene(
    "Small elastic bands stretched between upper and lower brackets, side view",
    ElasticsScene,
    "sm",
  ),

  /* 5. Stages. B5p is the phase bar; the labelled bar itself is real markup
        (BrcPhaseBar), so Build 2 only adds an optional decorative strip. */
  B5p: {
    ratio: "4 / 1",
    kind: "bar",
    brief:
      "Optional decorative strip inside the phase bar: Active phase (first three stages) and Retention phase (last stage). No durations, no dates, no numbers.",
  },
  B5a: scene(
    "Assessment and plan: the arch with dashed red arrows showing where teeth will move",
    StageAssessment,
    "sm",
  ),
  B5b: scene("Brackets and wire fitted on the arch", StageFitting, "sm"),
  B5c: scene("An adjustment visit: a magnifier over the wire at the brackets", StageAdjustment, "sm"),
  B5d: scene("Braces removed; retainers shown beside the arch", StageRetainers, "sm"),

  /* 6. Adults, teenagers, parents (48px icons). No faces, no people. */
  B6a: icon(48, "Adult path: a tooth with a bracket", IconAdult),
  B6b: icon(48, "Teenager path: a removable appliance (generic plate)", IconTeen),
  B6c: icon(48, "Parent path: a checklist", IconParent),

  /* 7. Daily care (40px icons) */
  B7a: icon(40, "Brushing", IconBrushing),
  B7b: icon(40, "Cleaning between teeth and around brackets with an interdental brush", IconInterdental),
  B7c: icon(40, "Foods to avoid: hard, chewy and sticky", IconSweet),
  B7d: icon(40, "Orthodontic wax", IconWax),

  /* 8. Retainers. B8b must not read as a clear aligner tray. */
  B8a: scene("Fixed retainer: a thin wire bonded behind the lower front teeth (view from behind)", FixedRetainerScene),
  B8b: scene(
    "Removable retainer: an acrylic plate with a wire across the front teeth. It must not read as a clear aligner tray.",
    RemovableRetainerScene,
  ),
};


/* ------------------------------------------------------------------
   Build 3: photo slots for the "Types of braces" selector (BrcTypeTabs).
   Unlike the illustration slots above these hold a photograph, not an
   `art` component, so they are a separate record and never go through
   <Slot>. Path and alt come from BRACE_TYPES (the one copy deck); the
   brief says what the picture must show.

   Image rules: a dental model only (no person, no face), no text, logo or
   brand, one bracket per tooth where brackets are shown. For the clear
   aligner photograph there must be no brackets and no wire. A source image
   that fails these checks is not used: the selector shows a neutral
   placeholder tile until a corrected optimised copy is dropped into
   public/assets/treatment/braces-types/web/ and `ready` is set to true in
   BRACE_TYPES.
   ------------------------------------------------------------------ */
export type PhotoSlotId = "BT1" | "BT2" | "BT3" | "BT4";

export type PhotoSlotDef = {
  ratio: "4 / 3";
  kind: "photo";
  type: BraceTypeId;
  /** Final optimised path (1200 px WebP, 4:3). */
  src: string;
  alt: string;
  /** What the photograph must show. */
  brief: string;
};

const photo = (type: BraceTypeId, brief: string): PhotoSlotDef => {
  const t = BRACE_TYPES.find((b) => b.id === type);
  if (!t) throw new Error(`Unknown brace type: ${type}`);
  return { ratio: "4 / 3", kind: "photo", type, src: t.image.src, alt: t.image.alt, brief };
};

export const PHOTO_SLOTS: Record<PhotoSlotId, PhotoSlotDef> = {
  BT1: photo(
    "metal-braces",
    "Dental model, front view: metal brackets bonded one per tooth, joined by a wire, with small elastic ties holding the wire. No person, no text.",
  ),
  BT2: photo(
    "ceramic-braces",
    "Dental model, front view: tooth-coloured or clear ceramic brackets, one per tooth, joined by a wire. No person, no text.",
  ),
  BT3: photo(
    "self-ligating-braces",
    "Dental model, front view: brackets with built-in clips or sliding doors holding the wire, and no elastic ties. No person, no text.",
  ),
  BT4: photo(
    "clear-aligners",
    "Dental model with a clear aligner tray fitted and a second tray beside it. No brackets, no wire, no person, no text.",
  ),
};