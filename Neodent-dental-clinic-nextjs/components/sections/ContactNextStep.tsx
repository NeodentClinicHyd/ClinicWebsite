"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import {
  enquiryClinicOptions,
  enquiryTypeOptions,
  validateEnquiry,
  type EnquiryFieldErrors,
  type EnquiryInput,
} from "@/lib/enquiry-schema";
import {
  mehdipatnamHours,
  nampallyHours,
  nampallyPhone,
  nampallyTelPhone,
  phone,
  telPhone,
} from "@/lib/site-data";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/contact/TurnstileWidget";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./ContactNextStep.module.css";

/* ------------------------------------------------------------------
   Home section: "Book a consultation" (id="get-in-touch").

   Left: the headline, one reassuring line, and a call card per clinic
   (number and hours from lib/site-data.ts). Right: a compact enquiry
   form that posts to the existing /api/enquiry route.

   The form uses the same contract as the Contact page form
   (components/contact/ContactEnquiryForm.tsx): the shared zod schema
   in lib/enquiry-schema.ts for client-side checks, the same field names
   (name, phone, clinic, enquiryType, message, company honeypot), and a
   Cloudflare Turnstile token sent alongside as `turnstileToken`. The
   route re-validates everything and verifies the token before Resend
   is called.

   MESSAGE: the shared schema requires a message of at least 10
   characters, but this short form makes it optional. When the visitor
   leaves it blank, the client sends a fixed line saying so
   (BLANK_MESSAGE), so the request still passes the unchanged server
   validation and the clinic can see that no message was written. A
   message of 1 to 9 characters gets the schema's own error.
   ------------------------------------------------------------------ */

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const BLANK_MESSAGE = "Consultation request from the home page. No message was added.";
const GENERIC_ERROR =
  "Something went wrong while sending your request. Please try again, or call the clinic directly.";
const TURNSTILE_REQUIRED_MESSAGE = "Please complete the verification and try again.";
const TURNSTILE_UNAVAILABLE_MESSAGE =
  "Verification is unavailable right now, so this request cannot be sent. Please call the clinic directly.";

type Clinic = EnquiryInput["clinic"];

const clinics: { name: Clinic; phone: string; tel: string; hours: string }[] = [
  { name: "Mehdipatnam", phone, tel: telPhone, hours: mehdipatnamHours },
  { name: "Nampally", phone: nampallyPhone, tel: nampallyTelPhone, hours: nampallyHours },
];

type FormState = {
  name: string;
  phone: string;
  clinic: "" | Clinic;
  enquiryType: string;
  message: string;
  company: string; // honeypot, must stay empty
};

const initialForm: FormState = { name: "", phone: "", clinic: "", enquiryType: "", message: "", company: "" };

type Status = "idle" | "submitting" | "success" | "error";
type ApiResponse = { ok?: boolean; message?: string; errors?: EnquiryFieldErrors };

export function ContactNextStep() {
  const uid = useId();
  const id = (field: string) => `consult-${field}-${uid}`;

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [sent, setSent] = useState<{ name: string; clinic: string } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /* Cloudflare's script and challenge (about 830 KB in Lighthouse) load
     only once the form is within 600px of the viewport, or as soon as
     anything in it gets focus. A box of the widget's height holds its
     place until then, so nothing shifts. */
  const [loadVerify, setLoadVerify] = useState(false);
  useEffect(() => {
    const node = formRef.current;
    if (loadVerify || !node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setLoadVerify(true);
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [loadVerify, status]);
  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key as keyof EnquiryFieldErrors]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  // Tokens are single-use: drop the old one and re-run the challenge.
  const resetTurnstile = () => {
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  const focusFirstError = (fieldErrors: EnquiryFieldErrors) => {
    const order: (keyof EnquiryFieldErrors)[] = ["name", "phone", "clinic", "enquiryType", "message"];
    const first = order.find((key) => fieldErrors[key]);
    if (!first) return;
    const target = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
    target?.focus();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const payloadFields = {
      name: form.name,
      phone: form.phone,
      clinic: form.clinic,
      enquiryType: form.enquiryType,
      message: form.message.trim() === "" ? BLANK_MESSAGE : form.message,
      company: form.company,
    };

    const validation = validateEnquiry(payloadFields);
    if (!validation.success) {
      setErrors(validation.errors);
      setStatus("idle");
      focusFirstError(validation.errors);
      return;
    }

    if (!turnstileSiteKey) {
      setErrors({});
      setStatus("error");
      setErrorMessage(TURNSTILE_UNAVAILABLE_MESSAGE);
      return;
    }
    if (!turnstileToken) {
      setErrors({});
      setStatus("error");
      setErrorMessage(TURNSTILE_REQUIRED_MESSAGE);
      return;
    }

    setErrors({});
    setErrorMessage("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validation.data, turnstileToken }),
      });
      const result = (await response.json().catch(() => null)) as ApiResponse | null;

      if (!response.ok || !result?.ok) {
        setStatus("error");
        setErrorMessage(result?.message || GENERIC_ERROR);
        if (result?.errors) {
          setErrors(result.errors);
          focusFirstError(result.errors);
        }
        resetTurnstile();
        return;
      }

      setTurnstileToken("");
      setSent({ name: validation.data.name, clinic: validation.data.clinic });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(GENERIC_ERROR);
      resetTurnstile();
    }
  };

  const sendAnother = () => {
    setForm(initialForm);
    setErrors({});
    setErrorMessage("");
    setTurnstileToken("");
    setSent(null);
    setStatus("idle");
  };

  const submitting = status === "submitting";
  const describe = (field: keyof EnquiryFieldErrors, extra?: string) =>
    [errors[field] ? id(`${field}-error`) : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <section className={styles.section} id="get-in-touch" aria-labelledby="get-in-touch-title">
      <div className={styles.container}>
        <Reveal className={styles.intro}>
          <h2 id="get-in-touch-title" className={styles.title}>
            Book a consultation
          </h2>
          <p className={`${styles.lede} section-lede section-lede--on-dark`}>
            Share a few details and our team will get back to you to arrange a visit. If you would rather
            talk now, call the clinic that suits you.
          </p>

          <ul className={styles.clinics} aria-label="Call a clinic">
            {clinics.map((clinic) => (
              <li key={clinic.name} className={styles.clinic}>
                <p className={styles.clinicName}>{clinic.name}</p>
                <p className={styles.clinicHours}>
                  Mon to Sat, {clinic.hours}
                  <br />
                  Sunday holiday
                </p>
                <a href={clinic.tel} className={styles.call} aria-label={`Call Neodent ${clinic.name}, ${clinic.phone}`}>
                  <Phone size={16} aria-hidden="true" />
                  {clinic.phone}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className={styles.card} delay={120}>
          {status === "success" && sent ? (
            <div className={styles.success} role="status" data-testid="consult-success">
              <span className={styles.successMark} aria-hidden="true">
                <Check size={22} />
              </span>
              <h3 className={styles.successTitle}>Thank you, {sent.name}.</h3>
              <p className={styles.successCopy}>
                Your request for the {sent.clinic} clinic has been sent. Our team will get back to you on the
                number you gave.
              </p>
              <button type="button" className={styles.secondary} onClick={sendAnother}>
                Send another request
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              className={styles.form}
              onSubmit={submit}
              onFocus={() => setLoadVerify(true)}
              noValidate
              aria-busy={submitting}
              aria-labelledby="get-in-touch-title"
              data-testid="form-consultation"
            >
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor={id("name")}>Your name</label>
                  <input
                    id={id("name")}
                    data-field="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    autoComplete="name"
                    maxLength={120}
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describe("name")}
                  />
                  {errors.name && (
                    <span className={styles.fieldError} id={id("name-error")}>
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor={id("phone")}>Phone number</label>
                  <input
                    id={id("phone")}
                    data-field="phone"
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    autoComplete="tel"
                    maxLength={20}
                    required
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={describe("phone")}
                  />
                  {errors.phone && (
                    <span className={styles.fieldError} id={id("phone-error")}>
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.row}>
                <fieldset className={styles.choice} aria-describedby={describe("clinic")}>
                  <legend>Clinic</legend>
                  <div className={styles.choiceRow}>
                    {enquiryClinicOptions.map((clinic, index) => (
                      <label key={clinic} className={styles.choiceOption}>
                        <input
                          type="radio"
                          name={id("clinic")}
                          value={clinic}
                          checked={form.clinic === clinic}
                          onChange={() => update("clinic", clinic)}
                          data-field={index === 0 ? "clinic" : undefined}
                          data-invalid={errors.clinic ? "true" : undefined}
                          required
                        />
                        <span>{clinic}</span>
                      </label>
                    ))}
                  </div>
                  {errors.clinic && (
                    <span className={styles.fieldError} id={id("clinic-error")}>
                      {errors.clinic}
                    </span>
                  )}
                </fieldset>

                <div className={styles.field}>
                  <label htmlFor={id("treatment")}>
                    Treatment <span className={styles.optional}>(optional)</span>
                  </label>
                  <select
                    id={id("treatment")}
                    data-field="enquiryType"
                    value={form.enquiryType}
                    onChange={(e) => update("enquiryType", e.target.value)}
                    aria-invalid={Boolean(errors.enquiryType)}
                    aria-describedby={describe("enquiryType")}
                  >
                    <option value="">Not sure yet</option>
                    {enquiryTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.enquiryType && (
                    <span className={styles.fieldError} id={id("enquiryType-error")}>
                      {errors.enquiryType}
                    </span>
                  )}
                </div>
              </div>


              <div className={styles.field}>
                <label htmlFor={id("message")}>
                  Message <span className={styles.optional}>(optional)</span>
                </label>
                <textarea
                  id={id("message")}
                  data-field="message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  maxLength={2000}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={describe("message", id("privacy"))}
                />
                {errors.message && (
                  <span className={styles.fieldError} id={id("message-error")}>
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Honeypot: hidden from everyone; anything typed here is discarded by the route. */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor={id("company")}>Company</label>
                <input
                  id={id("company")}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </div>

              <p className={styles.consent} id={id("privacy")}>
                By sending this form you agree that Neodent may contact you about your request. Please do not
                include sensitive medical details. See our <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>

              {turnstileSiteKey && (
                <div className={styles.verify}>
                  {loadVerify ? (
                    <TurnstileWidget
                      ref={turnstileRef}
                      siteKey={turnstileSiteKey}
                      onToken={setTurnstileToken}
                      onTokenCleared={() => setTurnstileToken("")}
                    />
                  ) : (
                    <div className={styles.verifyPending} aria-hidden="true" />
                  )}
                </div>
              )}

              {status === "error" && (
                <p className={styles.formError} role="alert" data-testid="consult-error">
                  {errorMessage}
                </p>
              )}

              <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send request <ArrowRight size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
