"use client";

import { useEffect, useRef } from "react";
import { canAnimateReveal } from "./useReveal";
import styles from "./motion.module.css";

/* ------------------------------------------------------------------
   <CountUp> — counts from 0 to `to` the first time it enters the
   viewport.

   SSR and the first client render both output the final value once, as
   real text, so hydration always matches and crawlers see the number
   once. The count only runs if, after mount, the number is still below
   the fold and motion is allowed; numbers already on screen,
   reduced-motion users and browsers without IntersectionObserver keep
   the final value with no animation.

   Formatting uses en-IN grouping (25,000 / 1,00,000). Pass
   grouping={false} for years ("1994"), and prefix / suffix for "+",
   "%" and similar.

   Example: <CountUp to={25000} suffix="+" />
            <CountUp to={yearsSinceEstablished()} />
   ------------------------------------------------------------------ */

export type CountUpProps = {
  to: number;
  /** Animation length in ms. */
  duration?: number;
  decimals?: number;
  grouping?: boolean;
  locale?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type FormatOptions = Pick<CountUpProps, "decimals" | "grouping" | "locale" | "prefix" | "suffix">;

function makeFormat({ decimals = 0, grouping = true, locale = "en-IN", prefix = "", suffix = "" }: FormatOptions) {
  const nf = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouping,
  });
  return (n: number) => `${prefix}${nf.format(n)}${suffix}`;
}

export function CountUp({
  to,
  duration = 1400,
  decimals = 0,
  grouping = true,
  locale = "en-IN",
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const finalRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);

  const finalText = makeFormat({ decimals, grouping, locale, prefix, suffix })(to);

  useEffect(() => {
    const finalEl = finalRef.current;
    const live = liveRef.current;
    if (!finalEl || !live) return;
    if (!canAnimateReveal()) return;
    if (finalEl.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    const text = makeFormat({ decimals, grouping, locale, prefix, suffix });
    const factor = Math.pow(10, decimals);
    let frame = 0;

    /* While counting, the final number stays in place (it keeps the width
       and stays readable to screen readers) at opacity 0, and the
       aria-hidden live copy shows the running value on top of it. When
       the count ends the live copy is emptied again. */
    const showFinal = () => {
      cancelAnimationFrame(frame);
      live.textContent = "";
      finalEl.style.opacity = "";
    };

    live.textContent = text(0);
    finalEl.style.opacity = "0";

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        if (t >= 1) {
          showFinal();
          return;
        }
        live.textContent = text(Math.round(to * easeOutCubic(t) * factor) / factor);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        run();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    observer.observe(finalEl);

    const onPrint = () => {
      observer.disconnect();
      showFinal();
    };
    window.addEventListener("beforeprint", onPrint);

    return () => {
      window.removeEventListener("beforeprint", onPrint);
      observer.disconnect();
      showFinal();
    };
  }, [to, duration, decimals, grouping, locale, prefix, suffix]);

  /* Server HTML holds the number once, as real text. The live span is
     empty in the HTML and only filled while the count runs (SEO rule R2:
     no duplicate or hidden copies of the number). */
  return (
    <span className={className ? `${styles.countUp} ${className}` : styles.countUp}>
      <span ref={finalRef} style={{ gridArea: "1 / 1" }}>
        {finalText}
      </span>
      <span ref={liveRef} className={styles.countUpLive} aria-hidden="true" />
    </span>
  );
}
