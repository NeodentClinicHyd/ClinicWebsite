/* ------------------------------------------------------------------
   Server-only Cloudflare Turnstile verification.

   A Turnstile token proves nothing on its own -- the browser could have
   invented the string. The token is therefore treated as untrusted input
   until Cloudflare's Siteverify API has confirmed it, which is why
   TURNSTILE_SECRET_KEY is read here and nowhere else, and why this module
   must NEVER be imported from a client component.

   Two Cloudflare-documented properties shape the flow around this file:
   tokens expire 300 seconds after they are issued, and each token can be
   validated only once (a replay comes back as `timeout-or-duplicate`).
   Every submission is verified exactly once, and the form asks for a
   fresh token before a retry.
   ------------------------------------------------------------------ */

const SITEVERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Cloudflare caps tokens at 2048 characters. Anything longer is a forgery
// attempt, not a token.
const MAX_TOKEN_LENGTH = 2048;

// A verification call should never be able to hang a form submission.
const SITEVERIFY_TIMEOUT_MS = 8000;

/* Hostnames whose solved tokens this endpoint accepts.

   Siteverify echoes back the hostname the challenge was actually solved
   on. That value is set by Cloudflare rather than by the visitor, so
   matching it rejects tokens minted for some other site that happens to
   share the sitekey.

   The first two entries are the site's canonical production addresses.
   The loopback entries exist so the form can be exercised locally with
   Cloudflare's documented test keys; a token carrying `localhost` can
   only exist if the widget's own Hostname Management allows it, so this
   does not widen the production surface.

   TURNSTILE_ALLOWED_HOSTNAMES (comma-separated) is an escape hatch for a
   deployment that legitimately serves the form from another host, e.g. a
   Vercel preview domain that has been added to the widget. */
const STATIC_ALLOWED_HOSTNAMES = [
  "www.neodentdentalhospitals.com",
  "neodentdentalhospitals.com",
  "localhost",
  "127.0.0.1",
  "[::1]",
];

/* Siteverify's response shape, reduced to the fields this endpoint cares
   about. Field names match Cloudflare's JSON exactly, error-codes
   included. */
type SiteverifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
};

export type TurnstileFailureReason =
  // TURNSTILE_SECRET_KEY is missing -- a server misconfiguration.
  | "missing-secret"
  // No token was supplied, or the supplied value cannot be a token.
  | "missing-token"
  // Cloudflare rejected the token: forged, expired, already redeemed,
  // minted with a different secret, and so on.
  | "rejected"
  // The token was valid but was solved on an unexpected hostname.
  | "hostname-mismatch"
  // Siteverify could not be reached, timed out, or replied with a
  // non-2xx / non-JSON response.
  | "unavailable";

export type TurnstileVerification =
  | { success: true; hostname: string; action?: string }
  | {
      success: false;
      reason: TurnstileFailureReason;
      /** Cloudflare's `error-codes`, for safe server-side diagnostics only. */
      errorCodes: string[];
    };

/* Extra accepted hostnames from the environment, read per request so a
   deployment's env can be changed without a code change. */
function getAllowedHostnames(): string[] {
  const extra = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
    .split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);

  return [...STATIC_ALLOWED_HOSTNAMES, ...extra];
}

/* Whether a token's reported hostname may be trusted.

   Enforced for production builds only: Cloudflare's documented test keys
   report a fixed placeholder hostname, so a strict check would make local
   development with those keys impossible. Relaxing it outside production
   cannot leak into a deployment, because a production secret key rejects
   dummy tokens outright and the production environment always enforces
   the allowlist above. */
function isTrustedHostname(hostname: string): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return hostname.length > 0 && getAllowedHostnames().includes(hostname);
}

/**
 * Reads the token out of an already-parsed, still-untrusted request body.
 * Kept separate from the shared enquiry schema so that the token's
 * presence is checked (and reported) as its own step in the route.
 */
export function readTurnstileToken(body: unknown): string {
  if (typeof body !== "object" || body === null) return "";

  const value = (body as Record<string, unknown>).turnstileToken;
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Asks Cloudflare to confirm a Turnstile token.
 *
 * Fails closed: every outcome other than an explicit `success: true` from
 * Siteverify is a rejection, so a Cloudflare outage can never let an
 * unverified submission through to the email layer.
 *
 * `remoteIp` is optional and best-effort -- Siteverify uses it only as an
 * additional signal, so a missing IP must not be treated as an error.
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<TurnstileVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { success: false, reason: "missing-secret", errorCodes: [] };
  }

  if (!token || token.length > MAX_TOKEN_LENGTH) {
    return { success: false, reason: "missing-token", errorCodes: [] };
  }

  let result: SiteverifyResponse;

  try {
    const response = await fetch(SITEVERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(SITEVERIFY_TIMEOUT_MS),
    });

    if (!response.ok) {
      return { success: false, reason: "unavailable", errorCodes: [] };
    }

    result = (await response.json()) as SiteverifyResponse;
  } catch {
    // Network failure, timeout, or an unreadable body. Deliberately
    // swallowed: the thrown error can carry the request URL, and the
    // token itself must never reach a log.
    return { success: false, reason: "unavailable", errorCodes: [] };
  }

  const errorCodes = Array.isArray(result["error-codes"])
    ? result["error-codes"]
    : [];

  if (result.success !== true) {
    return { success: false, reason: "rejected", errorCodes };
  }

  const hostname =
    typeof result.hostname === "string"
      ? result.hostname.trim().toLowerCase()
      : "";

  if (!isTrustedHostname(hostname)) {
    return { success: false, reason: "hostname-mismatch", errorCodes };
  }

  // `action` is echoed back for the caller's diagnostics but is not
  // compared against a fixed value: this widget was created without a
  // configured action, so there is no expected value to check.
  return { success: true, hostname, action: result.action };
}