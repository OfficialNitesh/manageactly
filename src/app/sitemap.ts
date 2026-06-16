import { MetadataRoute } from "next";
import { seoDefaults } from "@/lib/tokens";

// CMS-driven posts would be fetched here
const staticRoutes = [
  "",
  "/solutions",
  "/methodology",
  "/case-studies",
  "/insights",
  "/about",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
];

const insightSlugs = [
  "why-digital-ops-fail",
  "content-pipeline-design",
  "kpi-framework-for-digital-teams",
  "vendor-accountability-model",
];

const caseStudySlugs = [
  "retail-group",
  "saas-startup",
  "professional-services",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = seoDefaults.siteUrl;

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const insightEntries: MetadataRoute.Sitemap = insightSlugs.map((slug) => ({
    url: `${base}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${base}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticEntries, ...insightEntries, ...caseStudyEntries];
}
