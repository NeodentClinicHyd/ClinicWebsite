import { Resend } from "resend";
import { validateEnquiry, type EnquiryInput } from "@/lib/enquiry-schema";
import { readTurnstileToken, verifyTurnstileToken } from "@/lib/turnstile";

/* ------------------------------------------------------------------
   POST /api/enquiry — receives the Contact page "Send an enquiry"
   form, validates it server-side (never trusting the client), applies
   anti-abuse checks, and forwards it to the Neodent team inbox via
   Resend.

   This is a public, unauthenticated, network-exposed endpoint (it has
   to be -- it's a public contact form). Anti-abuse layers, in order:
   best-effort in-memory rate limit, strict field length caps, a
   honeypot, and Cloudflare Turnstile verification.

   Turnstile is the layer the email delivery depends on: the submitted
   token is verified against Cloudflare's Siteverify API BEFORE anything
   is handed to Resend, so a scripted POST that cannot produce a valid
   token never reaches the email provider at all. The token is untrusted
   input -- the client-side widget merely produces it (see
   components/contact/TurnstileWidget.tsx); it proves nothing until
   lib/turnstile.ts has confirmed it here.

   RESEND_API_KEY and TURNSTILE_SECRET_KEY are read only in server-only
   modules and are never exposed to the client bundle.
   ------------------------------------------------------------------ */

export const runtime = "nodejs";

// Best-effort, in-memory, per-instance rate limit. On Vercel's
// serverless platform this resets on cold start and is NOT shared
// across concurrent instances/regions -- it blocks naive scripted
// abuse from a single warm instance, but it is not a substitute for a
// real distributed rate limiter (e.g. Upstash) if abuse becomes a
// real problem later.
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

// Wording shown to the visitor when Turnstile verification fails.
// Deliberately identical for every failure mode (missing, forged,
// expired, replayed or unexpected-hostname token) so the response tells
// a bot nothing about how it was caught.
const TURNSTILE_REJECTED_MESSAGE =
  "Please complete the verification and try again.";

// Used when Siteverify itself cannot be reached. Cloudflare's own error
// text is never passed on to the visitor.
const TURNSTILE_UNAVAILABLE_MESSAGE =
  "We could not verify your submission right now. Please try again in a moment.";

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

// Minimal HTML-escaping so visitor-submitted text can never break out
// of the email template or inject markup/links into the notification
// email sent to clinic staff.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(data: EnquiryInput) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "Not provided"],
    ["Preferred clinic", data.clinic],
    ["Enquiry type", data.enquiryType || "Not specified"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#171717;max-width:560px">
      <h2 style="font-size:18px;margin:0 0 16px">New Neodent website enquiry</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 12px 6px 0;color:#65625d;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
            <td style="padding:6px 0;vertical-align:top">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="font-size:13px;color:#65625d;margin:16px 0 4px">Message</p>
      <p style="font-size:14px;white-space:pre-wrap;border-left:2px solid #d71920;padding-left:12px;margin:0">${escapeHtml(data.message)}</p>
      <p style="font-size:12px;color:#aaa69e;margin-top:24px">Received ${escapeHtml(timestamp)} (IST) via neodentdentalhospitals.com/contact</p>
    </div>
  `.trim();

  const text = [
    "New enquiry received from the Neodent website.",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "Not provided"}`,
    `Preferred clinic: ${data.clinic}`,
    `Enquiry type: ${data.enquiryType || "Not specified"}`,
    "",
    "Message:",
    data.message,
    "",
    `Timestamp: ${timestamp} (IST)`,
  ].join("\n");

  return {
    subject: `New Neodent Website Enquiry — ${data.clinic}`,
    html,
    text,
  };
}

export async function POST(request: Request) {
  try {
    const clientKey = getClientKey(request);
    if (isRateLimited(clientKey)) {
      return Response.json(
        { ok: false, message: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { ok: false, message: "Invalid request." },
        { status: 400 },
      );
    }

    const validation = validateEnquiry(body);
    if (!validation.success) {
      return Response.json(
        { ok: false, message: "Please check the form and try again.", errors: validation.errors },
        { status: 400 },
      );
    }

    const data = validation.data;

    // Honeypot tripped -- silently pretend success so the bot gets no
    // signal that it was caught, but never send an email. Checked before
    // Turnstile so a tripped trap still looks like an ordinary success.
    if (data.company) {
      return Response.json({ ok: true });
    }

    /* ---- Turnstile: bot protection, ahead of the email layer ------
       Order matters. The token is verified with Cloudflare's Siteverify
       API first and only a verified token lets the request continue to
       Resend below. A missing token is rejected outright, so a scripted
       POST can never produce an email in the first place. */
    const turnstileToken = readTurnstileToken(body);
    if (!turnstileToken) {
      return Response.json(
        { ok: false, message: TURNSTILE_REJECTED_MESSAGE },
        { status: 403 },
      );
    }

    const clientIp = getClientKey(request);
    const turnstile = await verifyTurnstileToken(
      turnstileToken,
      clientIp === "unknown" ? undefined : clientIp,
    );

    if (!turnstile.success) {
      if (turnstile.reason === "missing-secret") {
        // Configuration problem. Logged server-side only -- the secret
        // value itself is never printed.
        console.error(
          "Enquiry blocked: TURNSTILE_SECRET_KEY is not set, so Turnstile tokens cannot be verified.",
        );
        return Response.json(
          {
            ok: false,
            message:
              "Something went wrong while sending your enquiry. Please try again or contact Neodent directly.",
          },
          { status: 500 },
        );
      }

      if (turnstile.reason === "unavailable") {
        // Fail closed: Siteverify could not be reached, so nothing is
        // sent and the visitor is invited to try again.
        console.error(
          "Enquiry blocked: Cloudflare Siteverify could not be reached.",
        );
        return Response.json(
          { ok: false, message: TURNSTILE_UNAVAILABLE_MESSAGE },
          { status: 503 },
        );
      }

      // Safe diagnostics only: a failure category and Cloudflare's error
      // codes (e.g. invalid-input-response, timeout-or-duplicate). Never
      // the token, the secret, or the form payload.
      console.warn(
        `Enquiry blocked: Turnstile verification failed (${turnstile.reason}${
          turnstile.errorCodes.length
            ? `: ${turnstile.errorCodes.join(", ")}`
            : ""
        }).`,
      );
      return Response.json(
        { ok: false, message: TURNSTILE_REJECTED_MESSAGE },
        { status: 403 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromAddress = process.env.RESEND_FROM_EMAIL;
    const toAddress = process.env.CONTACT_INBOX_EMAIL;

    if (!apiKey || !fromAddress || !toAddress) {
      // Never leak configuration details to the client -- log server-side
      // only, and return the same friendly failure message a visitor
      // would see for any other delivery problem.
      console.error(
        "Enquiry email not sent: missing RESEND_API_KEY, RESEND_FROM_EMAIL, or CONTACT_INBOX_EMAIL.",
      );
      return Response.json(
        {
          ok: false,
          message:
            "Something went wrong while sending your enquiry. Please try again or contact Neodent directly.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const email = buildEmail(data);

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      ...(data.email ? { replyTo: data.email } : {}),
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    if (error) {
      console.error("Resend error while sending enquiry email:", error);
      return Response.json(
        {
          ok: false,
          message:
            "Something went wrong while sending your enquiry. Please try again or contact Neodent directly.",
        },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Unexpected error handling enquiry submission:", error);
    return Response.json(
      {
        ok: false,
        message:
          "Something went wrong while sending your enquiry. Please try again or contact Neodent directly.",
      },
      { status: 500 },
    );
  }
}
