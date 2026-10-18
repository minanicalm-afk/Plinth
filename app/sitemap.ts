import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/data";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjects();
  const paths = [
    "",
    "/projects",
    "/services",
    "/about",
    "/team",
    "/testimonials",
    "/where-we-work",
    "/quote",
    "/contact",
  ];

  return [
    ...paths.map((path) => ({
      url: `${site.url}${path || "/"}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
