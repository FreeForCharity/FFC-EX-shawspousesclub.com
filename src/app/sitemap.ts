import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site.config'

export const dynamic = 'force-static'

type SitemapEntry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

// Routes that have a `src/app/<slug>/page.tsx`. Add new top-level routes here
// so they appear in the sitemap. Sub-routes can be added with their full path.
//
// The unit test in __tests__/app/sitemap.test.ts diffs this list against the
// real `src/app/**` filesystem: if a `page.tsx` is added without a matching
// entry here the test fails, so the sitemap can never silently fall behind.
//
// Priority schema:
//   1.0 — root
//   0.8 — primary content pages (about, donate, volunteer, contact, programs)
//   0.5 — secondary content pages
//   0.2 — policy / legal pages
//
// changeFrequency: 'monthly' for content pages, 'yearly' for policy pages.
export const routes: readonly SitemapEntry[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/membership', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/ssc-merch', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/socials', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/special-activities', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/giving-back', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/giving-back/fundraisers', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/giving-back/scholarships', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/giving-back/charitable-requests', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/giving-back/shower-shaw', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/governance', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/board', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact-us', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/cookie-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/donation-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/vulnerability-disclosure-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/security-acknowledgements', changeFrequency: 'monthly', priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map((entry) => ({
    url: siteUrl(entry.path),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
}
