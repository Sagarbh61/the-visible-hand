
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://the-visible-hand.vercel.app'
  ).replace(/\/+$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/newsletter/confirm'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
