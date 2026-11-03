import { IllustrationFrame } from "./IllustrationFrame";
import { SLOTS, type ArtSlotId } from "@/lib/braces-slots";
import styles from "./Slot.module.css";

/**
 * One illustration slot: an IllustrationFrame of the slot's ratio holding its
 * artwork (fork of the page's BrcSlot, using the forked frame). Scene slots
 * fill the width of their parent; icon slots are fixed-size tiles (66 px
 * frame for the 48 px icons, 58 px for the 40 px icons: artwork size plus the
 * frame's 8 px padding and 1 px border).
 */
export function Slot({
  id,
  caption,
  note,
  tone,
  className,
}: {
  id: ArtSlotId;
  caption?: string;
  note?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const def = SLOTS[id];
  const Art = def.art;
  const isIcon = def.kind === "icon";
  const ratio = def.ratio === "4 / 1" ? "4 / 3" : def.ratio;
  const classes = [
    isIcon ? (def.iconSize === 48 ? styles.icon48 : styles.icon40) : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <IllustrationFrame
      ratio={ratio}
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
