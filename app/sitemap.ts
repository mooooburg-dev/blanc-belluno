import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { serviceCategories } from "@/lib/service-categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const servicePages: MetadataRoute.Sitemap = serviceCategories.map((sc) => ({
    url: `${SITE_URL}/services/${sc.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...servicePages,
  ];
}
