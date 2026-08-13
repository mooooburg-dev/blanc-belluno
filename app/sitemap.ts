import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { serviceCategories } from "@/lib/service-categories";
import { getPortfolioItems } from "@/lib/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const items = await getPortfolioItems();

  const servicePages: MetadataRoute.Sitemap = serviceCategories.map((sc) => {
    // 카테고리별 상위 5장을 이미지 사이트맵에 포함
    const categoryImages = items
      .filter((item) => item.category === sc.category)
      .slice(0, 5)
      .map((item) => item.imageUrl);

    return {
      url: `${SITE_URL}/services/${sc.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      ...(categoryImages.length > 0 ? { images: categoryImages } : {}),
    };
  });

  const portfolioImages = items.map((item) => item.imageUrl);

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
      ...(portfolioImages.length > 0 ? { images: portfolioImages } : {}),
    },
    ...servicePages,
  ];
}
