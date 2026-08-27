import { Resend } from "resend";
import { validateEnquiry, type EnquiryInput } from "@/lib/enquiry-schema";

/* ------------------------------------------------------------------
   POST /api/enquiry — receives the Contact page "Send an enquiry"
   form, validates it server-side (never trusting the client), applies
   lightweight anti-abuse checks, and forwards it to the NeoDent team
   inbox via Resend.

   This is a public, unauthenticated, network-exposed endpoint (it has
   to be -- it's a public contact form). Anti-abuse measures below are
   deliberately lightweight (honeypot + best-effort in-memory rate
   limit + strict field length caps) rather than a full CAPTCHA, per
   the project's own requirements.

   RESEND_API_KEY is read only in this server-only module and is never
   exposed to the client bundle.
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
      <h2 style="font-size:18px;margin:0 0 16px">New NeoDent website enquiry</h2>
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
    "New enquiry received from the NeoDent website.",
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
    subject: `New NeoDent Website Enquiry — ${data.clinic}`,
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
    // signal that it was caught, but never send an email.
    if (data.company) {
      return Response.json({ ok: true });
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
            "Something went wrong while sending your enquiry. Please try again or contact NeoDent directly.",
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
            "Something went wrong while sending your enquiry. Please try again or contact NeoDent directly.",
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
          "Something went wrong while sending your enquiry. Please try again or contact NeoDent directly.",
      },
      { status: 500 },
    );
  }
}
