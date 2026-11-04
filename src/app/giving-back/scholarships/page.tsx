import { pageMetadata } from '@/lib/page-metadata'
import ClubProgramPage from '@/components/site-pages/ClubProgramPage'

export const metadata = pageMetadata({
  title: 'Scholarships',
  description: 'Learn about the Shaw Spouses’ Club scholarship program.',
  canonical: '/giving-back/scholarships',
})

export default function ScholarshipsPage() {
  return (
    <ClubProgramPage title="Scholarships">
      <section
        aria-labelledby="scholarship-cycle-heading"
        className="mt-8 rounded-2xl border border-[#D9E5FA] bg-[#F4F7FF] p-6"
      >
        <h2 id="scholarship-cycle-heading" className="mb-3 text-2xl font-semibold text-[#234F93]">
          2027–2028 Scholarship Applications
        </h2>
        <p className="leading-7 text-[#26394D]">
          Information about scholarships for the 2027–2028 school year is coming soon! Check back
          for application opening dates, eligibility details, and deadlines.
        </p>
      </section>
    </ClubProgramPage>
  )
}
