"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./ResponsiveDetails.module.css";

/* Native <details> that is open in the server HTML (so the full text is
   always there for crawlers and with JavaScript off). After mount it
   closes itself on screens under 768px, unless the visitor has already
   toggled it. From 768px up the summary is hidden and the text is
   always shown. */
export function ResponsiveDetails({
  summary,
  children,
  className = "",
}: {
  summary: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const touched = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      if (!mq.matches) {
        el.open = true;
        return;
      }
      if (!touched.current) el.open = false;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <details
      ref={ref}
      className={`${styles.details} ${className}`}
      open
      onToggle={(event) => {
        /* A toggle that matches the screen default was made by the script;
           a toggle that differs from it was made by the visitor. */
        const open = (event.currentTarget as HTMLDetailsElement).open;
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        if (isMobile && open) touched.current = true;
      }}
    >
      <summary className={styles.summary}>
        <span>{summary}</span>
        <ChevronDown aria-hidden="true" />
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
