import type { MetadataRoute } from "next";

/**
 * Robots.txt configuration for search engine indexing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://gdgrbu.app/sitemap.xml",
  };
}
