import type { Metadata } from 'next'
import ClubPage from '@/components/club-page'
import { clubPage } from '@/data/club-pages'
import { pageMetadata } from '@/lib/page-metadata'

const page = clubPage('giving')

// Bare page name as title (the root layout template appends the brand).
export const metadata: Metadata = pageMetadata({
  title: page.title,
  description: page.description,
  canonical: '/giving',
})

export default function Page() {
  return <ClubPage page={page} />
}
