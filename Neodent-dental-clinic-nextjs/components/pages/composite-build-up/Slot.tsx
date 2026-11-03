import { SLOTS, type SlotId } from "@/lib/composite-build-up-slots";
import { IllustrationFrame, type FrameRatio } from "./IllustrationFrame";
import styles from "./Slot.module.css";

/* Temporary tile shown for any slot that has no artwork yet (every slot has
   artwork today). Decorative (aria-hidden). */
export function SlotPlaceholder({ id }: { id: SlotId }) {
  const small = SLOTS[id].kind === "icon";
  return (
    <div
      className={`${styles.placeholder} ${small ? styles.small : ""}`}
      data-slot={id}
      aria-hidden="true"
    >
      <span className={styles.mark} />
      {small ? null : <span className={styles.label}>{id}</span>}
    </div>
  );
}

/**
 * One illustration slot (fork of components/treatments/composite-build-up/
 * CbuSlot.tsx): the page's IllustrationFrame of the slot's ratio holding either
 * its artwork or the placeholder. Scene slots fill the width of their parent,
 * so a section caps the frame's size by giving its parent a width (width = cap
 * x ratio). `ratio` overrides the slot's ratio (for example the wide "16 / 9"
 * frame for card illustrations); the artwork scales to fit inside. Icon slots
 * are fixed-size tiles.
 */
export function Slot({
  id,
  caption,
  note,
  tone,
  ratio,
  className,
}: {
  id: SlotId;
  caption?: string;
  note?: string;
  tone?: "light" | "dark";
  ratio?: FrameRatio;
  className?: string;
}) {
  const def = SLOTS[id];
  const Art = def.art;
  const isIcon = def.kind === "icon";
  const classes = [
    isIcon ? (def.iconSize === 48 ? styles.icon48 : styles.icon40) : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <IllustrationFrame
      ratio={ratio ?? def.ratio}
      padding={def.padding ?? (isIcon ? "sm" : "md")}
      caption={caption}
      note={note}
      tone={tone}
      className={classes}
    >
      {Art ? <Art /> : <SlotPlaceholder id={id} />}
    </IllustrationFrame>
  );
}
