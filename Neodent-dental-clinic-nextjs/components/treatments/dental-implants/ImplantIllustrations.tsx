import type { ReactNode } from "react";
import s from "@/components/treatment/illustrations/illustrations.module.css";

/* ------------------------------------------------------------------
   Compatibility layer for /treatments/dental-implants.

   The artwork now lives in components/treatment/illustrations/ (shared
   kit: geometry, parts, scenes, icons, and the IllustrationDefs that holds
   every gradient). This file keeps the names the page already imports.
   ------------------------------------------------------------------ */

export {
  ImplantAnatomy,
  PartIconAbutment,
  PartIconCrown,
  PartIconImplant,
  StageAssessment,
  StageHealing,
  StagePlacement,
  StagePreparation,
  StageRestoration,
  OptionBridge,
  OptionDenture,
  OptionImplant,
  HealingDetail,
  ScopeSingle,
  ScopeBridge,
  ScopeArch,
} from "@/components/treatment/illustrations/scenes";
export {
  NeedsAttentionIcons,
  AftercareIcons,
  IconTile,
  IconBone,
  IconCheckup,
  IconCleaning,
  IconGrinding,
  IconGum,
  IconGumHealth,
  IconHealth,
  IconMedicine,
  IconNightGuard,
  IconNoSmoking,
  IconSmoking,
} from "@/components/treatment/illustrations/icons";
export { IllustrationDefs } from "@/components/treatment/illustrations/IllustrationDefs";

/** Shown with every group of illustrations (NEW COPY). */
export const ILLUSTRATION_NOTE =
  "Illustration, not to scale. Your own anatomy and plan will differ.";

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

/** Plate every illustration sits on. */
export function IllustrationPlate({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx(s.plate, className)}>{children}</div>;
}

/** <figure> with a visible caption, the plate and the illustration note. */
export function IllustrationFigure({
  children,
  caption,
  tone = "light",
  className,
  plateClassName,
  note = true,
}: {
  children: ReactNode;
  caption: string;
  tone?: "light" | "dark";
  className?: string;
  plateClassName?: string;
  note?: boolean;
}) {
  return (
    <figure
      className={cx(s.figure, tone === "dark" && s.onDark, className)}
    >
      <IllustrationPlate className={plateClassName}>{children}</IllustrationPlate>
      <figcaption className={s.caption}>
        {caption}
        {note ? <span className={s.note}>{ILLUSTRATION_NOTE}</span> : null}
      </figcaption>
    </figure>
  );
}

/** Stand-alone illustration note, for groups that have no figure caption. */
export function IllustrationNote({ className }: { className?: string }) {
  return <p className={cx(s.note, className)}>{ILLUSTRATION_NOTE}</p>;
}
