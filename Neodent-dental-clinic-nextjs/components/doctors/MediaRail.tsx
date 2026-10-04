"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FocusEvent, PointerEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./MediaRail.module.css";
import { TreatmentEvidenceViewer } from "@/components/doctors/TreatmentEvidenceViewer";
import type { EvidenceItem } from "@/components/doctors/TreatmentEvidenceViewer";
import type { PressClipping } from "@/lib/miftah-press-archive";

/* ------------------------------------------------------------------
   MediaRail — Dr. Miftah profile, Section 09.

   One continuous right-to-left strip of press clippings.

   Loop     The track holds three identical sets (clone, real, clone)
            and a pure CSS keyframe moves it by exactly one set
            (-1/3 to -2/3) on a linear infinite timeline, so the wrap
            is seamless. The clones are aria-hidden + inert (never
            focusable, never announced); the real set sits in the
            middle so keyboard focus can always bring an item in.
   Pause    Hover (mouse/pen), keyboard focus, the viewer being open, or
            the rail being off-screen ease the animation's playbackRate
            to 0 and back to 1. The CSS animation itself is never
            restarted, so it always resumes from the exact position.
            Touch has no hover: the strip keeps drifting, and the viewer
            pauses it while open.
   Motion   prefers-reduced-motion: the keyframe is removed in CSS and
            the strip becomes a static, natively scrollable row inside
            its own clip box.
   Viewer   The page's existing TreatmentEvidenceViewer (focus trap,
            Escape, backdrop close, body scroll lock). Focus is handed
            back to the clicked clipping on close.
   ------------------------------------------------------------------ */

interface MediaRailProps {
  items: readonly PressClipping[];
  /** Accessible name for the rail and the viewer title. */
  title: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function MediaRail({ items, title }: MediaRailProps) {
  const total = items.length;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  /* Pause reasons + the eased playback rate. Refs, not state: nothing
     here should re-render the strip. */
  const flags = useRef({
    hover: false,
    focus: false,
    viewer: false,
    visible: true,
    manual: false,
  });
  const rate = useRef({ cur: 1, target: 1, raf: 0, last: 0 });
  const tween = useRef(0);

  const update = useCallback(() => {
    const f = flags.current;
    const r = rate.current;
    r.target = f.hover || f.focus || f.viewer || f.manual || !f.visible ? 0 : 1;
    if (r.raf) return; /* a running ease picks up the new target */
    r.last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - r.last);
      r.last = now;
      r.cur += (r.target - r.cur) * (1 - Math.exp(-dt / 160));
      if (Math.abs(r.target - r.cur) < 0.005) r.cur = r.target;
      const anim = trackRef.current?.getAnimations()[0];
      if (anim) anim.playbackRate = r.cur;
      r.raf = r.cur === r.target ? 0 : requestAnimationFrame(tick);
    };
    r.raf = requestAnimationFrame(tick);
  }, []);

  /* Off-screen → stop driving the compositor. */
  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;
    const rateState = rate.current;
    const tweenRef = tween;
    const observer = new IntersectionObserver(
      ([entry]) => {
        flags.current.visible = entry.isIntersecting;
        update();
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rateState.raf);
      rateState.raf = 0;
      cancelAnimationFrame(tweenRef.current);
    };
  }, [update]);

  /* The viewer open = the strip holds still underneath it. */
  useEffect(() => {
    flags.current.viewer = viewerIndex !== null;
    update();
  }, [viewerIndex, update]);

  const onPointer = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; /* touch never pauses on contact */
    if (!flags.current.hover) {
      flags.current.hover = true;
      update();
    }
  };
  const onPointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    flags.current.hover = false;
    update();
  };

  /* Keyboard focus pauses the strip. The clipped viewport cannot scroll
     a focused-but-offscreen item into view (overflow: clip), so the
     animation is advanced instead until the item is centred. */
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    let keyboard = false;
    try {
      keyboard = target.matches(":focus-visible");
    } catch {
      keyboard = false;
    }
    if (!keyboard) return;
    flags.current.focus = true;
    update();

    /* Only clippings need bringing into view; the arrow buttons sit
       outside the clip box. */
    if (!viewportRef.current?.contains(target)) return;

    const anim = trackRef.current?.getAnimations()[0];
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const set = setRef.current;
    if (!anim || !viewport || !track || !set) return;
    const v = viewport.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    if (t.left >= v.left && t.right <= v.right) return;
    const duration = Number(anim.effect?.getComputedTiming().duration);
    const period = set.offsetWidth; /* one set = one loop */
    if (!duration || !period) return;
    /* Track offset o ∈ [period, 2·period] is what the keyframe sweeps.
       Centre the item if that offset exists, else the nearest one that
       still shows it. */
    const itemInTrack = t.left - track.getBoundingClientRect().left;
    const centred = itemInTrack - (v.width - t.width) / 2;
    const offset = Math.min(2 * period, Math.max(period, centred));
    anim.currentTime = ((offset - period) / period) * duration;
  };
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    flags.current.focus = false;
    update();
  };

  /* Manual step: tween the running animation's clock by ~75% of the
     visible width. Same keyframe, same clock, so the strip stays a
     single continuous loop and auto-drift resumes from wherever the
     step lands (unless hover/focus is holding it). */
  const step = (dir: 1 | -1) => {
    const viewport = viewportRef.current;
    const set = setRef.current;
    const anim = trackRef.current?.getAnimations()[0];
    if (!viewport || !set) return;
    const distance = viewport.clientWidth * 0.75;

    if (!anim) {
      /* Reduced motion: the strip is a plain scrollable row. */
      viewport.scrollBy({ left: dir * distance, behavior: "auto" });
      return;
    }
    const duration = Number(anim.effect?.getComputedTiming().duration);
    const period = set.offsetWidth;
    if (!duration || !period) return;

    /* Normalise to [D, 2D) so stepping backwards never goes below 0;
       identical visual position (infinite iterations). */
    const from = (Number(anim.currentTime ?? 0) % duration) + duration;
    const to = from + dir * (distance / period) * duration;
    anim.currentTime = from;

    cancelAnimationFrame(tween.current);
    flags.current.manual = true;
    update();
    const start = performance.now();
    const length = 650;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / length);
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      anim.currentTime = from + (to - from) * eased;
      if (p < 1) {
        tween.current = requestAnimationFrame(tick);
      } else {
        tween.current = 0;
        flags.current.manual = false;
        update();
      }
    };
    tween.current = requestAnimationFrame(tick);
  };

  const viewerItems = useMemo<EvidenceItem[]>(
    () =>
      items.map((item) => ({
        kind: "image",
        src: item.src,
        width: item.width,
        height: item.height,
        alt: item.alt,
        caption: item.publication,
      })),
    [items],
  );

  const open = (index: number, opener: HTMLElement) => {
    openerRef.current = opener;
    flags.current.hover = false;
    setViewerIndex(index);
  };

  const close = useCallback(() => {
    setViewerIndex(null);
    /* The viewer restores focus to document.activeElement at open time;
       Safari does not focus buttons on click, so hand it back explicitly. */
    const opener = openerRef.current;
    requestAnimationFrame(() => opener?.focus({ preventScroll: true }));
  }, []);

  const renderSet = (clone: boolean) => (
    <ul
      ref={clone ? undefined : setRef}
      className={`${styles.set} ${clone ? styles.setClone : ""}`}
      role={clone ? undefined : "list"}
      aria-hidden={clone ? true : undefined}
      inert={clone ? true : undefined}
      aria-label={clone ? undefined : title}
    >
      {items.map((item, i) => {
        const ratio = item.width / item.height;
        return (
          <li
            key={item.src}
            className={styles.item}
            style={{ "--ratio": ratio.toFixed(4) } as CSSProperties}
          >
            <button
              type="button"
              className={styles.card}
              onClick={(e) => open(i, e.currentTarget)}
              tabIndex={clone ? -1 : undefined}
              aria-label={`Open press clipping ${pad(i + 1)} of ${pad(total)} — ${item.publication}`}
              aria-haspopup="dialog"
            >
              <Image
                src={item.src}
                alt={clone ? "" : item.alt}
                fill
                sizes={`${Math.ceil(ratio * 430)}px`}
                className={styles.image}
                draggable={false}
                decoding="async"
              />
            </button>
            <span className={styles.index} aria-hidden="true">
              {pad(i + 1)}
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <div
        className={styles.rail}
        onPointerEnter={onPointer}
        onPointerMove={onPointer}
        onPointerLeave={onPointerLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <div ref={viewportRef} data-rail="viewport" className={styles.viewport}>
          <div ref={trackRef} data-rail="track" className={styles.track}>
            {renderSet(true)}
            {renderSet(false)}
            {renderSet(true)}
          </div>
        </div>

        {/* Manual stepping. "Previous" slides the strip back (content moves
            right), "Next" carries it on in its own direction. */}
        <button
          type="button"
          className={`${styles.nav} ${styles.navPrev}`}
          onClick={() => step(-1)}
          aria-label="Previous clippings"
        >
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`${styles.nav} ${styles.navNext}`}
          onClick={() => step(1)}
          aria-label="Next clippings"
        >
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      {/* Outside the handler element: React bubbles portal events through
          the tree, and the viewer must not count as rail hover/focus. */}
      {viewerIndex !== null && (
        <TreatmentEvidenceViewer
          title={title}
          items={viewerItems}
          initialIndex={viewerIndex}
          onClose={close}
        />
      )}
    </>
  );
}
