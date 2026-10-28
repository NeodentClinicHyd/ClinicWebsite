import { IllustrationFrame } from "@/components/treatments/dental-implants/IllustrationFrame";
import { SLOTS, type SlotId } from "@/lib/full-mouth-slots";
import styles from "./FmrSlot.module.css";

/* TODO(illustration-pass): temporary tile shown for every slot that has no
   artwork yet. It is a neutral tinted tile with the slot id, sized by the
   IllustrationFrame around it, so each card already looks finished. It is
   decorative (aria-hidden) and disappears as soon as a slot gets `art` in
   lib/full-mouth-slots.ts. */
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
 */
export function Slot({
  id,
  caption,
  note,
  tone,
  className,
}: {
  id: SlotId;
  caption?: string;
  note?: string;
  tone?: "light" | "dark";
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
      ratio={def.ratio}
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
