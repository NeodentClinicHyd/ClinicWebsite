import { z } from "zod";
import { treatmentAtlas } from "@/lib/treatment-data";

/* ------------------------------------------------------------------
   Shared validation for the Contact page "Send an enquiry" form.

   Imported by BOTH the client form (ContactEnquiryForm.tsx, for inline
   field errors before a network round-trip) and the route handler
   (app/api/enquiry/route.ts, as the authoritative server-side check).
   Client-side validation is a UX convenience only -- the server never
   trusts it.

   Enquiry type options are derived from the real, existing treatment
   names in lib/treatment-data.ts (the canonical list backing the
   /treatments page) rather than inventing a separate list. "General
   Dental Care" and "Other Enquiry" are appended as catch-alls, matching
   the site's conversation-first (not appointment-booking) philosophy.
   ------------------------------------------------------------------ */

export const enquiryClinicOptions = ["Mehdipatnam", "Nampally"] as const;

export const enquiryTypeOptions = [
  ...treatmentAtlas.map((treatment) => treatment.title),
  "General Dental Care",
  "Other Enquiry",
] as const;

// Loose but real-world phone validation: digits, spaces, +, -, ( ) only,
// 7-20 characters. Deliberately not stricter (no country-specific
// pattern) since NeoDent serves walk-in/phone patients with varied
// number formats.
const PHONE_PATTERN = /^[0-9+\-()\s]{7,20}$/;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number.")
    .regex(PHONE_PATTERN, "Please enter a valid phone number."),
  email: z
    .union([z.literal(""), z.string().trim().email("Please enter a valid email address.")])
    .optional(),
  clinic: z.enum(enquiryClinicOptions, {
    message: "Please choose a preferred clinic.",
  }),
  enquiryType: z.union([z.literal(""), z.enum(enquiryTypeOptions)]).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more detail (at least 10 characters).")
    .max(2000, "Message is too long. Please keep it under 2000 characters."),
  // Honeypot -- real visitors never see or fill this field (see
  // ContactEnquiryForm.module.css .honeypot). Deliberately NOT
  // constrained here (no max(0)/refine) -- if it were rejected by
  // schema validation, the 400 response would leak to a bot that it
  // tripped a trap. Instead the route handler reads this value after
  // successful validation and silently discards anything non-empty,
  // returning the same generic success response a real submission
  // would get.
  company: z.string().max(500).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryInput, string>>;

/**
 * Runs the shared schema and reshapes zod's error tree into a flat
 * { field: message } map that both the client form and the API route
 * can render/log directly.
 */
export function validateEnquiry(data: unknown):
  | { success: true; data: EnquiryInput }
  | { success: false; errors: EnquiryFieldErrors } {
  const result = enquirySchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors: EnquiryFieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof EnquiryInput | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { success: false, errors };
}
