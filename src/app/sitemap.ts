import type { MetadataRoute } from "next";
import { getArtigos } from "@/lib/blog-data";

const BASE_URL = "https://puxirum.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const artigos = getArtigos().map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.data + "T12:00:00"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...artigos,
  ];
}
