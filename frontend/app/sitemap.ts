
import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { sitemapData } from '@/sanity/lib/queries'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
  .replace(/\/+$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch({
    query: sitemapData,
  })

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: 'monthly',
    },
  ]

  for (const item of data) {
    let path: string
    let priority: number
    let changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']

    if (item._type === 'page') {
      path = `/${item.slug}`
      priority = 0.8
      changeFrequency = 'monthly'
    } else if (item._type === 'post') {
      path = `/posts/${item.slug}`
      priority = 0.5
      changeFrequency = 'never'
    } else {
      continue
    }

    sitemapEntries.push({
      url: `${siteUrl}${path}`,
      lastModified: item._updatedAt || new Date(),
      priority,
      changeFrequency,
    })
  }

  return sitemapEntries
}
