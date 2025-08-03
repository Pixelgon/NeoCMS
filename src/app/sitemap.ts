import getAllProjects from "@/utils/project/getAllProjects";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const baseUrl = process.env.BASE_URL || "https://pixelgon.cz";
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
   ]
}