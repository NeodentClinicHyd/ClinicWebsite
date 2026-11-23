import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import { FloatingCta } from "@/components/ui/FloatingCta";
import { PageLoader } from "@/components/ui/PageLoader";
import { CookieConsentProvider } from "@/components/consent/CookieConsentContext";
import { GoogleAnalyticsGate } from "@/components/analytics/GoogleAnalyticsGate";
import { SITE_NAME, SITE_URL } from "@/lib/site-data";
import { siteJsonLd } from "@/lib/structured-data";

/* Self-hosted by next/font: no render-blocking request to Google Fonts.
   The CSS variables are read by --app-font-* in globals.css. */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-serif",
});

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
    <html lang="en-IN" className={`${manrope.variable} ${dmSerif.variable}`}>
      <head>
        {/* Without JavaScript the page loader is never dismissed, so it
            is not shown at all. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>[data-page-loader]{display:none!important}</style>",
          }}
        />
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
          <GoogleAnalyticsGate />
        </CookieConsentProvider>
        <PageLoader />
      </body>
    </html>
  );
}
