import type { Metadata } from "next";
import { seoDefaults } from "./tokens";

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Generate consistent page metadata for all routes
 */
export function generateMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | Manage Actly`
    : seoDefaults.title;

  const pageDescription = description || seoDefaults.description;
  const pageUrl = `${seoDefaults.siteUrl}${path}`;
  const ogImage = image || seoDefaults.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(seoDefaults.siteUrl),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: "Manage Actly",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      creator: seoDefaults.twitterHandle,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
