import { getTracks } from "@/api/tracks";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {
    meta: { totalPages },
  } = await getTracks();
  return [
    {
      url: process.env.NEXT_PUBLIC_URL as string,
      lastModified: new Date(),
    },
    ...Array.from({ length: totalPages }).map((_, i) => ({
      url: `${process.env.NEXT_PUBLIC_URL}/page/${i}`,
    })),
  ];
}
