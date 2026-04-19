import { MetadataRoute } from "next";
import { seoDefaults } from "@/lib/tokens";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${seoDefaults.siteUrl}/sitemap.xml`,
  };
}
