import type { Metadata } from "next";
import { counties, site } from "@/lib/site";
import type { Project } from "@/lib/types";

export function pageMeta({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ?? site.title,
      description,
      url: path,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.legalName,
    url: site.url,
    image: site.ogImage,
    telephone: site.phoneTel,
    email: site.email,
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00800",
      addressCountry: "KE",
    },
    areaServed: counties.map((county) => ({
      "@type": "AdministrativeArea",
      name: `${county.name} County`,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    description: project.summary,
    url: `${site.url}/projects/${project.slug}`,
    image: project.heroImage,
    locationCreated: {
      "@type": "Place",
      name: project.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location,
        addressRegion: project.county,
        addressCountry: "KE",
      },
    },
    creator: {
      "@type": "GeneralContractor",
      name: site.legalName,
      url: site.url,
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
