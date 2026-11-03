import type { ReactNode } from "react";
import styles from "./Emphasis.module.css";

/* Plain emphasis for phrases inside body text (replaces the underline /
   marker EditorialHighlight on this page). "primary" is <strong>, the other
   tones are <mark>. The words are always real text; there is no script and
   no decoration that needs it.
     primary    red, semibold (ivory bold on dark ground, D4)
     secondary  semibold
     quiet      semibold, slightly muted */
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
