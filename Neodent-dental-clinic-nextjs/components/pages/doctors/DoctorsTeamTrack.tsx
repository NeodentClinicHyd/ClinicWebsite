"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./DoctorsTeam.module.css";

/* ------------------------------------------------------------------
   Track for the wider clinical team. From 1024px it is a wrapping flex
   row (5 across at 1280px and wider, 3 across below, the last row
   centred). Below 1024px the same list is one scroll-snap row with
   progress dots (no "02 / 05" counter). Every card is always in the DOM
   once, in the server HTML: the cards arrive as children rendered on the
   server, and this client part only handles the dots.
   ------------------------------------------------------------------ */

type Props = {
  label: string;
  /** One accessible name per card, for the dots. */
  names: readonly string[];
  /** The <li> cards. */
  children: ReactNode;
};

export function DoctorsTeamTrack({ label, names, children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const getTrack = useCallback(
    () => wrapRef.current?.querySelector<HTMLUListElement>("ul") ?? null,
    [],
  );

  const sync = useCallback(() => {
    const track = getTrack();
    if (!track) return;
    const items = Array.from(track.children) as HTMLElement[];
    let best = 0;
    let bestDist = Infinity;
    items.forEach((el, i) => {
      const dist = Math.abs(el.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    // At the far end the last card can never reach the start edge.
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) best = items.length - 1;
    setActive(best);
  }, [getTrack]);

  useEffect(() => {
    const track = getTrack();
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [getTrack, sync]);

  const goTo = (index: number) => {
    const track = getTrack();
    const el = track?.children[index] as HTMLElement | undefined;
    if (!track || !el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: el.offsetLeft - track.offsetLeft,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <div ref={wrapRef} className={styles.trackWrap}>
      <Reveal
        as="ul"
        className={styles.track}
        stagger={80}
        aria-label={label}
        tabIndex={0}
      >
        {children}
      </Reveal>
      {names.length > 1 && (
        <div className={styles.dots}>
          {names.map((name, i) => (
            <button
              key={name}
              type="button"
              className={styles.dot}
              aria-label={`Show ${name}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
