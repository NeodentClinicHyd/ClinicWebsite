import { IllustrationFrame } from "@/components/treatments/dental-implants/IllustrationFrame";
import { SLOTS, type ArtSlotId, type SlotId } from "@/lib/braces-slots";
import styles from "./BrcSlot.module.css";

// Fallback tile for a slot that has no artwork (none do after Build 2; the phase
// bar, B5p, is real markup and does not use this component). A neutral tinted
// tile with the slot id, sized by the IllustrationFrame around it, decorative
// (aria-hidden).
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
 * One illustration slot: an IllustrationFrame of the slot's ratio holding
 * either its artwork or the placeholder. Scene slots fill the width of
 * their parent; icon slots are fixed-size tiles (66px frame for the 48px
 * icons, 58px for the 40px icons, i.e. artwork size plus the frame's
 * 8px padding and 1px border).
 *
 * The phase bar slot (B5p) is not rendered here: the kit's frame has no
 * wide ratio, so BrcPhaseBar sizes it.
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
      {Art ? <Art /> : <SlotPlaceholder id={id} />}
    </IllustrationFrame>
  );
}

