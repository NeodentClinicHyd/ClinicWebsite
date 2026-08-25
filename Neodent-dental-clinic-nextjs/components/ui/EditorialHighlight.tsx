"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./EditorialHighlight.module.css";

/* ------------------------------------------------------------------
   Shared editorial text-highlight system for homepage Sections 01-04.

   Three restrained treatments layered on top of existing body copy --
   never a new heading scale, never hidden text. The actual phrase is
   always rendered as real text in the initial markup (this component
   only toggles a decoration class after mount), so search engines and
   any client with JavaScript disabled still get the complete,
   unmodified paragraph -- SEO/crawlability and accessibility are
   unaffected by the decoration layer:

   - primary   -> <strong>, NeoDent red, no background. One per
                  paragraph. <strong> gives the single most important
                  phrase real semantic weight for assistive tech and
                  search engines, matching how sparingly the design
                  system uses red emphasis elsewhere (.archive-title
                  span, .hero-title .serif).
   - secondary -> <mark>, semibold, thin editorial red underline
                  (a soft-tapered CSS gradient, not a literal <u>).
   - quiet     -> <mark>, semibold, extremely subtle translucent
                  gradient sweep behind the phrase (no box/pill).

   <mark> is used (with its default browser styling reset in the CSS
   module) rather than a bare <span> for the two lesser tones because
   it is the correct semantic element for "this phrase is relevant" --
   a meaningful signal for assistive tech, without stealing <strong>'s
   single-per-paragraph significance.

   The one-time reveal (each tone's decoration sweeping/fading in) is
   driven by a per-instance IntersectionObserver rather than a parent
   visibility class, since each of the four sections tracks visibility
   with a differently-named class/CSS-module. This keeps the highlight
   system fully self-contained and reusable. Respects
   prefers-reduced-motion by skipping straight to the revealed state. */

type HighlightTone = "primary" | "secondary" | "quiet";

const REVEAL_DELAY_MS: Record<HighlightTone, number> = {
  primary: 0,
  secondary: 90,
  quiet: 170,
};

export function EditorialHighlight({
  tone,
  onDark,
  children,
}: {
  tone: HighlightTone;
  /** Set for phrases sitting on a dark surface (e.g. Section 04's
   * charcoal background) so the quiet marker stays visible instead of
   * washing out against a light-surface-tuned opacity. */
  onDark?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const className = [
    styles.highlight,
    styles[tone],
    onDark ? styles.onDark : "",
    revealed ? styles.revealed : "",
  ]
    .filter(Boolean)
    .join(" ");
  const style: CSSProperties = { transitionDelay: `${REVEAL_DELAY_MS[tone]}ms` };

  if (tone === "primary") {
    return (
      <strong ref={ref} className={className} style={style}>
        {children}
      </strong>
    );
  }

  return (
    <mark ref={ref} className={className} style={style}>
      {children}
    </mark>
  );
}
