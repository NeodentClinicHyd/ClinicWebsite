import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site-data";
import { breadcrumbJsonLd, websiteJsonLd } from "@/lib/structured-data";
import {
  clinicLocationSlugs,
  getClinicLocation,
} from "@/lib/clinic-data";
import { ClinicBranchClientChrome } from "./ClinicBranchClientChrome";

type ClinicRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return clinicLocationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ClinicRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const clinic = getClinicLocation(slug);
  if (!clinic) notFound();

  const path = `/clinic/${clinic.slug}`;
  const image = clinic.primaryImage.src;

  return {
    title: { absolute: clinic.seo.title },
    description: clinic.seo.description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: path,
      title: clinic.seo.title,
      description: clinic.seo.description,
      images: [{ url: image, alt: clinic.primaryImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: clinic.seo.title,
      description: clinic.seo.description,
      images: [{ url: image, alt: clinic.primaryImage.alt }],
    },
  };
}

export default async function ClinicLocationRoute({ params }: ClinicRouteProps) {
  const { slug } = await params;
  const clinic = getClinicLocation(slug);

  if (!clinic) notFound();

  // One dynamic route serves both branches; the slug selects its source data.
  const other = getClinicLocation(
    clinicLocationSlugs.find((candidate) => candidate !== clinic.slug) ?? "",
  );

  if (!other) notFound();

  const canonicalUrl = `${SITE_URL}/clinic/${clinic.slug}`;
  const clinicEntityId = `${canonicalUrl}#clinic`;
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Clinics", path: "/clinic" },
      { name: clinic.name, path: `/clinic/${clinic.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: clinic.seo.title,
      description: clinic.seo.description,
      inLanguage: "en-IN",
      isPartOf: { "@id": websiteJsonLd["@id"] },
      about: { "@id": clinicEntityId },
      mainEntity: { "@id": clinicEntityId },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ClinicBranchClientChrome clinic={clinic} other={other} />
    </>
  );
}
