import type { Metadata } from "next";
import "./globals.css";
import { FloatingCta } from "@/components/ui/FloatingCta";

export const metadata: Metadata = {
  title: "Neodent Dental Hospitals | Expert Dental Care in Hyderabad",
  description:
    "Neodent Dental Hospitals offers expert dental care in Hyderabad, with a focused practice in Prosthodontics and Implantology.",
  robots: "index, follow",
  openGraph: {
    title: "Neodent Dental Hospitals | Expert Dental Care in Hyderabad",
    description:
      "Thoughtful, professional dental care in Hyderabad from Neodent Dental Hospitals.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neodent Dental Hospitals | Expert Dental Care in Hyderabad",
    description:
      "Thoughtful, professional dental care in Hyderabad from Neodent Dental Hospitals.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Neodent Dental Hospitals",
  description: "Expert Dental Care in Hyderabad",
  telephone: "+91 9030648393",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Masjid-e-Azizia, Humayun Nagar Road, Royal Colony, Humayun Nagar",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "India",
  },
  openingHours: "Mo-Su 16:00-21:00",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <FloatingCta />
      </body>
    </html>
  );
}
