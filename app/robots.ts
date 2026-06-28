// SEO: Dynamic robots.txt generation via Next.js App Router convention
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/dashboard/'],
      },
    ],
    sitemap: 'https://sentrahai.com/sitemap.xml',
  }
}
