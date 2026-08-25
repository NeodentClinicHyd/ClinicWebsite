"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { AppButton } from "@/components/ui/AppButton";

export function AppointmentModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
  });
  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.phone.trim() || form.phone.trim().length < 10)
      next.phone = "Please enter a valid phone number.";
    if (!form.date) next.date = "Please choose a preferred date.";
    setErrors(next);
    if (!Object.keys(next).length) setSubmitted(true);
  };
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="appointment-title">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close appointment form"
          data-testid="button-close-appointment"
        >
          <X size={20} />
        </button>
        {submitted ? (
          <div className="success-state">
            <div className="success-mark">
              <Check size={27} />
            </div>
            <div className="eyebrow">Request received</div>
            <h2>Thank you, {form.name.split(" ")[0]}.</h2>
            <p>
              Your appointment request is ready for the Neodent team. We’ll use
              the phone number you shared to follow up.
            </p>
            <AppButton onClick={onClose}>Return to the clinic</AppButton>
          </div>
        ) : (
          <>
            <div className="eyebrow">Book a visit</div>
            <h2 id="appointment-title">Start with a conversation.</h2>
            <p className="modal-sub">
              Share a few details and the clinic team can help plan your visit.
            </p>
            <form onSubmit={submit} noValidate>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="appointment-name">Name</label>
                  <input
                    id="appointment-name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    data-testid="input-appointment-name"
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="appointment-phone">Phone</label>
                  <input
                    id="appointment-phone"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    placeholder="+91"
                    autoComplete="tel"
                    inputMode="tel"
                    data-testid="input-appointment-phone"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
                <div className="field">
                  <label htmlFor="appointment-date">Preferred date</label>
                  <input
                    id="appointment-date"
                    type="date"
                    value={form.date}
                    onChange={(event) => update("date", event.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    data-testid="input-appointment-date"
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>
                <div className="field full">
                  <label htmlFor="appointment-message">
                    Message{" "}
                    <span style={{ fontWeight: 500, opacity: 0.6 }}>(optional)</span>
                  </label>
                  <textarea
                    id="appointment-message"
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    placeholder="Anything you would like us to know?"
                    data-testid="input-appointment-message"
                  />
                </div>
              </div>
              <button
                className="button button-dark form-submit"
                type="submit"
                data-testid="button-submit-appointment"
              >
                Send appointment request <ArrowRight size={14} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
