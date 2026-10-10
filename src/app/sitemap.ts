import type { MetadataRoute } from "next";

/**
 * Dynamic Sitemap for GDG RBU.
 * Essential for SEO crawling and Google search indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gdgrbu.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#upcoming-event`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#faqs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
