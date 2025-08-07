import getAllProjects from "@/utils/project/getAllProjects";
import { MetadataRoute } from "next";

// Revalidace každou hodinu
export const revalidate = 3600;
export const baseUrl = process.env.BASE_URL || "https://pixelgon.cz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   try {
      const projects = await getAllProjects();

      return [
         {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 1.0,
         },
         {
            url: `${baseUrl}/o-nas`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.9,
         },
         {
            url: `${baseUrl}/projekty`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
         },
         ...projects.map((project) => ({
            url: `${baseUrl}/projekty/${project.slug}`,
            lastModified: project.lastModified,
            changeFrequency: "monthly" as const,
            images: [
               `${baseUrl}${project.photo}`,
            ],
            priority: 0.7,
         })),
      ];
   } catch (error) {
      console.error('Database is not available, during docker build, returning fallback sitemap:', error);
      // Fallback bez projektů
      return [
         {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 1.0,
         },
         {
            url: `${baseUrl}/o-nas`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.9,
         },
         {
            url: `${baseUrl}/projekty`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
         },
      ];
   }
}