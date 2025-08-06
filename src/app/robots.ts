import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/images/icons/',
    },
    sitemap: `${process.env.BASE_URL || "https://pixelgon.cz"}/sitemap.xml`,
  }
}