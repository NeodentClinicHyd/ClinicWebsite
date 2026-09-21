import type { Metadata } from "next";
import "./globals.css";
import { FloatingCta } from "@/components/ui/FloatingCta";
import { CookieConsentProvider } from "@/components/consent/CookieConsentContext";
import { SITE_NAME, SITE_URL } from "@/lib/site-data";
import { siteJsonLd } from "@/lib/structured-data";

const defaultTitle = "Neodent Dental Hospital | Specialist Dental Care in Hyderabad";
const defaultDescription =
  "Neodent Dental Hospital offers specialist-led dental care in Hyderabad, with clinics in Mehdipatnam and Nampally covering implants, prosthodontics, orthodontics and restorative dentistry.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: defaultTitle,
  },
  description: defaultDescription,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  /* favicon.ico and apple-icon.png are served automatically via
     Next file conventions (see app/). */
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN">
      <head>
        {siteJsonLd.map((entry) => (
          <script
            key={entry["@id"] ?? entry["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}
      </head>
      <body>
        <CookieConsentProvider>
          {children}
          <FloatingCta />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
