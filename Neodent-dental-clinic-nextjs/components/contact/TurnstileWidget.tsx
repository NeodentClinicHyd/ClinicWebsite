"use client";

import Script from "next/script";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type Ref,
} from "react";
import styles from "./TurnstileWidget.module.css";

/* ------------------------------------------------------------------
   TurnstileWidget -- Cloudflare Turnstile's Managed widget, rendered
   explicitly (api.js?render=explicit) as the verification step of the
   contact enquiry form.

   Explicit rendering is used because this form is React-managed: the
   success state swaps the form out and back in, and a rejected
   submission needs a fresh challenge. `turnstile.render()` is therefore
   paired with `turnstile.remove()` on unmount and guarded by a ref, so
   exactly one widget instance exists at a time and re-renders never
   spawn duplicates.

   Only the public sitekey reaches this component
   (NEXT_PUBLIC_TURNSTILE_SITE_KEY). Verifying the token it produces
   happens server-side -- see lib/turnstile.ts.

   The widget renders an accessible iframe of its own; the label and
   group wrapper below give it a name in the form's reading order and
   keep keyboard focus where the browser expects it.
   ------------------------------------------------------------------ */

// Minimal typings for the parts of the Turnstile JS API this component
// uses (Cloudflare does not publish types for api.js).
type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "auto" | "light" | "dark";
  size?: "normal" | "flexible" | "compact";
  language?: string;
  callback?: (token: string) => void;
  "error-callback"?: (errorCode?: string) => void;
  "expired-callback"?: () => void;
  "timeout-callback"?: () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileWidgetHandle = {
  /** Re-runs the challenge so a fresh, single-use token can be issued. */
  reset: () => void;
};

type TurnstileWidgetProps = {
  /** Public sitekey, from NEXT_PUBLIC_TURNSTILE_SITE_KEY. */
  siteKey: string;
  /** Receives a new token each time the challenge is solved. */
  onToken: (token: string) => void;
  /** Tells the form its token is no longer usable (expired or errored). */
  onTokenCleared: () => void;
  ref?: Ref<TurnstileWidgetHandle>;
};

export function TurnstileWidget({
  siteKey,
  onToken,
  onTokenCleared,
  ref,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Held in a ref so the form's per-keystroke re-renders never touch the
  // already-rendered widget, while the callbacks stay current.
  const callbacksRef = useRef({ onToken, onTokenCleared });
  useEffect(() => {
    callbacksRef.current = { onToken, onTokenCleared };
  }, [onToken, onTokenCleared]);

  const renderWidget = useCallback(() => {
    const container = containerRef.current;
    const api = window.turnstile;

    // One widget per mounted container, ever.
    if (!container || !api || !siteKey || widgetIdRef.current) return;

    widgetIdRef.current = api.render(container, {
      sitekey: siteKey,
      theme: "light",
      size: "flexible",
      language: "en",
      callback: (token) => callbacksRef.current.onToken(token),
      "expired-callback": () => callbacksRef.current.onTokenCleared(),
      "timeout-callback": () => callbacksRef.current.onTokenCleared(),
      "error-callback": () => callbacksRef.current.onTokenCleared(),
    });
  }, [siteKey]);

  // api.js may already be on the page (the form remounts after the
  // success state is dismissed), in which case there is nothing left for
  // onReady to load and the widget can be rendered straight away.
  useEffect(() => {
    if (window.turnstile) renderWidget();
  }, [renderWidget]);

  // Hand the instance back to Turnstile instead of leaving it orphaned
  // behind a removed container.
  useEffect(
    () => () => {
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;
      if (widgetId) window.turnstile?.remove(widgetId);
    },
    [],
  );

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        const widgetId = widgetIdRef.current;
        if (widgetId) window.turnstile?.reset(widgetId);
      },
    }),
    [],
  );

  return (
    <>
      {/* Loaded after hydration so the script never blocks the page; the
          form cannot be submitted until a token exists either way. */}
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />

      <div className={styles.field}>
        <span className={styles.label} id="enquiry-verification-label">
          Verification
        </span>
        <div
          className={styles.widget}
          ref={containerRef}
          role="group"
          aria-labelledby="enquiry-verification-label"
          data-testid="turnstile-widget"
        />
      </div>
    </>
  );
}

export default TurnstileWidget;