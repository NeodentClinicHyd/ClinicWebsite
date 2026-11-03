import { SLOTS, type SlotId } from "@/lib/smile-design-slots";
import { IllustrationFrame, type FrameRatio } from "./IllustrationFrame";
import styles from "./Slot.module.css";

/**
 * One illustration slot: an IllustrationFrame holding the slot's artwork
 * (lib/smile-design-slots.ts, read only). Scene slots fill the width of their
 * parent (or the height, with `ratio="fill"`); icon slots are fixed-size
 * tiles (66 px frame for the 48 px icons, 58 px for the 40 px icons, i.e.
 * artwork size plus the frame's 8 px padding and 1 px border).
 * Fork of components/treatments/smile-design/SmileSlot.tsx without the
 * temporary placeholder (every slot has artwork, R0 item t).
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
  /** Overrides the slot's own ratio ("fill" takes the parent's height). */
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
      {Art ? <Art /> : null}
    </IllustrationFrame>
  );
}
