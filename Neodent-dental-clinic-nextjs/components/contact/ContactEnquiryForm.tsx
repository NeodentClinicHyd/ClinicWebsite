"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  enquiryClinicOptions,
  enquiryTypeOptions,
  validateEnquiry,
  type EnquiryFieldErrors,
  type EnquiryInput,
} from "@/lib/enquiry-schema";
import { TurnstileWidget, type TurnstileWidgetHandle } from "./TurnstileWidget";
import styles from "./ContactEnquiryForm.module.css";

/* ------------------------------------------------------------------
   ContactEnquiryForm — the form half of the Contact page's "Send an
   enquiry" section (see app/contact/ContactClientChrome.tsx for the
   editorial copy half). This is a plain enquiry form, not an
   appointment-booking flow: no date/time picker, no scheduling.

   Submission flow: validate locally with the shared zod schema (UX
   only) -> require a Cloudflare Turnstile token -> POST JSON to
   /api/enquiry -> the route handler re-validates every field, verifies
   the token against Cloudflare's Siteverify API, and only then sends the
   notification via Resend. Neither the Resend API key nor the Turnstile
   secret key ever reaches this component or the browser.

   Turnstile is what stops automated submissions reaching the email
   layer: this component only carries the widget's single-use token along
   with the enquiry, and asks for a fresh one after every attempt.
   ------------------------------------------------------------------ */

/* The public, browser-safe Turnstile sitekey, inlined at build time.
   NEXT_PUBLIC_* variables are the only ones exposed to the client
   bundle; the matching secret key is server-side only (lib/turnstile.ts). */
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

if (!turnstileSiteKey && process.env.NODE_ENV !== "production") {
  // Fail loudly in development instead of quietly disabling bot
  // protection. No credential value is ever printed.
  console.warn(
    "NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set — Turnstile cannot render, so enquiry submissions will be blocked.",
  );
}

// Mirrors the API route's 403 wording, so the visitor reads the same
// message whether the missing token was caught here or server-side.
const TURNSTILE_REQUIRED_MESSAGE =
  "Please complete the verification and try again.";

const TURNSTILE_UNAVAILABLE_MESSAGE =
  "Verification is temporarily unavailable, so this enquiry cannot be sent right now. Please try again shortly or call the clinic directly.";

/* Contract with /api/enquiry. The token travels alongside the validated
   enquiry fields rather than inside them: the shared schema is about
   visitor input only, and the route checks the token as its own step. */
type EnquiryPayload = EnquiryInput & { turnstileToken: string };

type EnquiryApiResponse = {
  ok?: boolean;
  message?: string;
  errors?: EnquiryFieldErrors;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  clinic: "" | EnquiryInput["clinic"];
  enquiryType: string;
  message: string;
  company: string; // honeypot -- must stay empty
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  clinic: "",
  enquiryType: "",
  message: "",
  company: "",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactEnquiryForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle | null>(null);

  const update = (key: keyof FormState, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  /* Every completed attempt consumes its token -- they are single-use and
     expire after five minutes -- so the old one is dropped and the
     challenge re-run before the visitor can submit again. */
  const resetTurnstile = () => {
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const validation = validateEnquiry(form);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    // Without a configured sitekey no token can ever be produced, so the
    // form stays locked instead of posting something the server must
    // reject.
    if (!turnstileSiteKey) {
      setErrors({});
      setStatus("error");
      setErrorMessage(TURNSTILE_UNAVAILABLE_MESSAGE);
      return;
    }

    // Never post without a solved challenge: /api/enquiry rejects an
    // unverified request anyway, and this spares the visitor a round-trip.
    if (!turnstileToken) {
      setErrors({});
      setStatus("error");
      setErrorMessage(TURNSTILE_REQUIRED_MESSAGE);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setErrorMessage("");

    const payload: EnquiryPayload = { ...validation.data, turnstileToken };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | EnquiryApiResponse
        | null;

      if (!response.ok || !result?.ok) {
        setStatus("error");
        setErrorMessage(
          result?.message ||
            "Something went wrong while sending your enquiry. Please try again or contact Neodent directly.",
        );
        if (result?.errors) setErrors(result.errors);
        resetTurnstile();
        return;
      }

      setTurnstileToken("");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong while sending your enquiry. Please try again or contact Neodent directly.",
      );
      resetTurnstile();
    }
  };

  const sendAnother = () => {
    setForm(initialForm);
    setErrors({});
    setErrorMessage("");
    setTurnstileToken("");
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className={styles.successState} data-testid="enquiry-success">
        <div className={styles.successMark}>
          <Check size={22} aria-hidden="true" />
        </div>
        <p className={styles.kicker}>Enquiry sent</p>
        <h3>Thank you for reaching out to Neodent.</h3>
        <p className={styles.successCopy}>
          Our team will review your message and get back to you.
        </p>
        <button
          type="button"
          className={styles.sendAnother}
          onClick={sendAnother}
          data-testid="button-send-another-enquiry"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className={styles.form} onSubmit={submit} noValidate data-testid="form-contact-enquiry">
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="enquiry-name">Full name</label>
          <input
            id="enquiry-name"
            type="text"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            autoComplete="name"
            maxLength={120}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            data-testid="input-enquiry-name"
          />
          {errors.name && (
            <span className={styles.errorText} id="enquiry-name-error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="enquiry-phone">Phone number</label>
          <input
            id="enquiry-phone"
            type="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
            data-testid="input-enquiry-phone"
          />
          {errors.phone && (
            <span className={styles.errorText} id="enquiry-phone-error" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="enquiry-email">
            Email address <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="enquiry-email"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
            maxLength={200}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            data-testid="input-enquiry-email"
          />
          {errors.email && (
            <span className={styles.errorText} id="enquiry-email-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="enquiry-clinic">Preferred clinic</label>
          <select
            id="enquiry-clinic"
            value={form.clinic}
            onChange={(event) => update("clinic", event.target.value)}
            aria-invalid={Boolean(errors.clinic)}
            aria-describedby={errors.clinic ? "enquiry-clinic-error" : undefined}
            data-testid="select-enquiry-clinic"
          >
            <option value="" disabled>
              Choose a branch
            </option>
            {enquiryClinicOptions.map((clinic) => (
              <option key={clinic} value={clinic}>
                {clinic}
              </option>
            ))}
          </select>
          {errors.clinic && (
            <span className={styles.errorText} id="enquiry-clinic-error" role="alert">
              {errors.clinic}
            </span>
          )}
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="enquiry-type">
            Treatment / enquiry type <span className={styles.optional}>(optional)</span>
          </label>
          <select
            id="enquiry-type"
            value={form.enquiryType}
            onChange={(event) => update("enquiryType", event.target.value)}
            data-testid="select-enquiry-type"
          >
            <option value="">Not sure yet</option>
            {enquiryTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="enquiry-message">Message</label>
          <textarea
            id="enquiry-message"
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            maxLength={2000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "enquiry-message-error" : "enquiry-privacy-note"}
            data-testid="input-enquiry-message"
          />
          {errors.message && (
            <span className={styles.errorText} id="enquiry-message-error" role="alert">
              {errors.message}
            </span>
          )}
          <p className={styles.privacyNote} id="enquiry-privacy-note">
            Please avoid sharing sensitive medical information in this form. Our team can
            discuss treatment details with you directly.
          </p>
        </div>

        {/* Honeypot -- hidden from sighted and screen-reader users alike.
            Real visitors never see or fill this field. Bots that
            auto-fill every input on the page will, and the submission
            is silently discarded server-side. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="enquiry-company">Company</label>
          <input
            id="enquiry-company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
          />
        </div>
      </div>

      {/* Verification sits between the fields and the submit button. It is
          only rendered when a sitekey is configured -- without one no
          token can exist, so the form stays locked rather than sending an
          unverified enquiry. */}
      {turnstileSiteKey && (
        <TurnstileWidget
          ref={turnstileRef}
          siteKey={turnstileSiteKey}
          onToken={setTurnstileToken}
          onTokenCleared={() => setTurnstileToken("")}
        />
      )}

      {status === "error" && (
        <p className={styles.formError} role="alert" data-testid="text-enquiry-error">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className={`button button-primary ${styles.submit}`}
        disabled={submitting}
        data-testid="button-submit-enquiry"
      >
        {submitting ? "Sending..." : "Send enquiry"}
        {!submitting && <ArrowRight size={14} aria-hidden="true" />}
      </button>
    </form>
  );
}

export default ContactEnquiryForm;
