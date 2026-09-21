import type { Metadata } from "next";
import { PrivacyPolicyClientChrome } from "./PrivacyPolicyClientChrome";

const title = "Privacy Policy | Neodent Dental Hospital";
const description =
  "Read the Neodent Dental Hospital Privacy Policy covering personal information, patient confidentiality, website usage, clinical images and privacy requests.";
const ogDescription =
  "How Neodent Dental Hospital collects, uses and protects information from patients, visitors and website users, including patient confidentiality and clinical imagery.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description: ogDescription,
    url: "/privacy-policy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: ogDescription,
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClientChrome />;
}
