import type { ReactNode } from "react";
import styles from "./Emphasis.module.css";

/* Plain emphasis for phrases inside body text (replaces the underline /
   marker EditorialHighlight on this page). "primary" renders as <strong>,
   the other tones as <mark>, as before. The words are always real text; no
   script and no decoration that needs one.
     primary    red, semibold (light bands); ivory bold on dark bands (D4)
     secondary  semibold; ivory bold on dark bands (D4)
     quiet      semibold, slightly muted; ivory bold on dark bands (D4)
   Red text on the charcoal ground is under 3:1, so on dark every tone is
   ivory and bold, with no underline. */
type Tone = "primary" | "secondary" | "quiet";

export function Emphasis({
  tone,
  onDark = false,
  children,
}: {
  tone: Tone;
  onDark?: boolean;
  children: ReactNode;
}) {
  const className = [styles.em, styles[tone], onDark ? styles.onDark : ""]
    .filter(Boolean)
    .join(" ");
  if (tone === "primary") return <strong className={className}>{children}</strong>;
  return <mark className={className}>{children}</mark>;
}
