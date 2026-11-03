"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import neodentLogo from "@/public/assets/Neodent dental hospital hyderabad logo.jpeg";
import { waitForPageReady } from "@/lib/page-ready";
import styles from "./PageLoader.module.css";

/* ------------------------------------------------------------------
   Instrument icons for the orbit. Line drawings on a 24px grid, the
   same stroke weight as the lucide icons used elsewhere on the site.
   ------------------------------------------------------------------ */
const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

function ToothIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M7.2 3.2c-2.3 0-3.7 1.8-3.7 4.2 0 2.2.9 3.9 1.5 6 .6 2.1.9 4.6 1.7 6.6.4 1 1.6 1 2 0 .6-1.6.9-4.4 3.3-4.4s2.7 2.8 3.3 4.4c.4 1 1.6 1 2 0 .8-2 1.1-4.5 1.7-6.6.6-2.1 1.5-3.8 1.5-6 0-2.4-1.4-4.2-3.7-4.2-1.8 0-2.6.9-4.8.9s-3-.9-4.8-.9z" />
    </svg>
  );
}
function MirrorIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="16" cy="7.5" r="4" />
      <path d="M13.2 10.3 4 19.5" />
      <path d="M5.6 17.9 4 19.5" strokeWidth={2.6} />
    </svg>
  );
}
function ProbeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 20 15 9" />
      <path d="M15 9c1.4-1.4 1.6-3.2 3.2-4.4.9-.7 2.1.2 1.6 1.2" />
      <path d="M6.5 15.5l2 2M8.5 13.5l2 2" />
    </svg>
  );
}
function ImplantIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M8 3.5h8l-1.2 3.5H9.2z" />
      <path d="M10 7v10.5l2 3 2-3V7" />
      <path d="M9.4 10h5.2M9.4 12.8h5.2M9.6 15.6h4.8" />
    </svg>
  );
}
function CrossIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M9.5 4h5v5.5H20v5h-5.5V20h-5v-5.5H4v-5h5.5z" />
    </svg>
  );
}

const INSTRUMENTS = [
  { id: "tooth", Icon: ToothIcon, accent: false },
  { id: "mirror", Icon: MirrorIcon, accent: false },
  { id: "cross", Icon: CrossIcon, accent: true },
  { id: "implant", Icon: ImplantIcon, accent: false },
  { id: "probe", Icon: ProbeIcon, accent: false },
];

export type LoaderState = "visible" | "leaving" | "hidden";

/** The loader's markup. State is driven by the controller below.
    `controlled` marks that the script has taken over; until then a CSS
    fallback hides the overlay after 10s in case scripts never run. */
export function PageLoaderView({
  state,
  controlled = false,
}: {
  state: LoaderState;
  controlled?: boolean;
}) {
  return (
    <div
      className={styles.loader}
      data-page-loader=""
      data-state={state}
      data-js={controlled ? "" : undefined}
      role="status"
      aria-label="Loading Neodent Dental Hospital"
      aria-hidden={state === "visible" ? undefined : true}
    >
      <div className={styles.inner}>
        <div className={styles.stage}>
          <span className={styles.track} aria-hidden="true" />
          <span className={styles.ticks} aria-hidden="true">
            {[0, 90, 180, 270].map((a) => (
              <i key={a} style={{ "--a": `${a + 36}deg` } as React.CSSProperties} />
            ))}
          </span>
          <span className={styles.orbit} aria-hidden="true">
            {INSTRUMENTS.map(({ id, Icon, accent }, i) => (
              <span
                key={id}
                className={styles.slot}
                style={{ "--a": `${i * 72}deg` } as React.CSSProperties}
              >
                <span
                  className={accent ? `${styles.icon} ${styles.iconAccent}` : styles.icon}
                  style={{ "--d": `${i * -0.64}s` } as React.CSSProperties}
                >
                  <Icon />
                </span>
              </span>
            ))}
          </span>
          <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden="true">
            <circle className={styles.ringBase} cx="50" cy="50" r="49" />
            <circle className={styles.ringArc} cx="50" cy="50" r="49" />
          </svg>
          <span className={styles.disc}>
            <Image
              className={styles.logo}
              src={neodentLogo}
              alt=""
              fill
              preload
              sizes="124px"
            />
          </span>
        </div>
        <p className={styles.caption}>
          <span className={styles.eyebrow}>Neodent Dental Hospital</span>
          <span className={styles.srOnly}>Loading the page</span>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Controller.

   First load: the overlay is in the server HTML, so it covers the page
   from the first paint. After hydration it waits for the whole page
   (see lib/page-ready.ts), marks <html data-page-ready> and fades out.

   Page changes: a click on an internal link to another page shows the
   overlay at once, before the old page is replaced. Next <Link>
   navigations then change the pathname, and the overlay waits for the
   new page the same way. Plain <a> links reload the document, whose
   own first load takes over. Back/forward (popstate) works the same.
   Same-page #anchors, tel:, mailto:, downloads, new tabs and external
   sites never show it.
   ------------------------------------------------------------------ */

const MIN_MS = 600;
const MAX_MS = 8000;
const FADE_MS = 340;
/* No internal link on the site cancels its own click, so a click that
   shows the overlay always navigates. This only guards against a
   navigation that never commits (stopped load, network failure). */
const STUCK_MS = 12000;

function isPageNavigationClick(event: MouseEvent): boolean {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }
  const anchor = (event.target as Element | null)?.closest?.("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return false;
  if (anchor.hasAttribute("download")) return false;
  const target = anchor.getAttribute("target");
  if (target && target !== "_self") return false;
  const url = new URL(anchor.href, window.location.href);
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;
  if (url.origin !== window.location.origin) return false;
  return url.pathname !== window.location.pathname;
}

export function PageLoader() {
  const pathname = usePathname();
  const [state, setState] = useState<LoaderState>("visible");
  const [controlled, setControlled] = useState(false);
  const run = useRef(0);
  const startedAt = useRef(0);
  const lastPath = useRef(pathname);
  const pending = useRef(false);
  const stuckTimer = useRef<number | undefined>(undefined);

  const settle = useCallback(() => {
    const token = ++run.current;
    window.clearTimeout(stuckTimer.current);
    waitForPageReady({ startedAt: startedAt.current, minMs: MIN_MS, maxMs: MAX_MS }).then(() => {
      if (token !== run.current) return;
      document.documentElement.dataset.pageReady = "true";
      setState("leaving");
      window.setTimeout(() => {
        if (token === run.current) setState("hidden");
      }, FADE_MS);
    });
  }, []);

  const show = useCallback(() => {
    run.current++;
    startedAt.current = performance.now();
    delete document.documentElement.dataset.pageReady;
    setState("visible");
    window.clearTimeout(stuckTimer.current);
    stuckTimer.current = window.setTimeout(() => {
      pending.current = false;
      settle();
    }, STUCK_MS);
  }, [settle]);

  // First load. startedAt 0 = navigation start, so the minimum and the
  // cap count from when the visitor opened the page.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setControlled(true);
    settle();
  }, [settle]);

  // Route committed: the new page is in the DOM. A layout effect runs
  // before the browser paints it, so a navigation that did not start
  // with a click (router.push) is covered before it can be seen.
  useLayoutEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (!pending.current) show();
    pending.current = false;
    settle();
  }, [pathname, show, settle]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!isPageNavigationClick(event)) return;
      pending.current = true;
      show();
    };
    const onPopState = () => {
      if (window.location.pathname === lastPath.current) return;
      pending.current = true;
      show();
    };
    // Back/forward from the bfcache restores the page exactly as it was
    // left, i.e. with the overlay up from the click. Drop it.
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      run.current++;
      pending.current = false;
      window.clearTimeout(stuckTimer.current);
      document.documentElement.dataset.pageReady = "true";
      setState("hidden");
    };
    window.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pageshow", onPageShow);
      window.clearTimeout(stuckTimer.current);
    };
  }, [show]);

  return <PageLoaderView state={state} controlled={controlled} />;
}
