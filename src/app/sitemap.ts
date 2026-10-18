import getAllProjects from "@/utils/project/getAllProjects";
import { MetadataRoute } from "next";
import staticRoutes from "@/generated/sitemap-routes.json";

// Databáze je dostupná až za běhu aplikace, nikoli při Docker buildu.
export const dynamic = "force-dynamic";
export const baseUrl = process.env.BASE_URL || "https://pixelgon.cz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
      url: route === "/" ? baseUrl : `${baseUrl}${route}`,
      changeFrequency: route === "/o-mne" ? "yearly" : "monthly",
      priority: route === "/" ? 1.0 : route === "/o-mne" ? 0.9 : 0.8,
   }));

   const projects = await getAllProjects();

   return [
      ...staticPages,
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
}
