import Link from 'next/link'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: 'Golf Tournament',
  description: 'Learn about the Shaw Spouses’ Club Golf Tournament and how to get involved.',
}

export default function GolfTournamentPage() {
  return (
    <section className="bg-[#F4F7FF] px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-[#234F93]">
          <Link href="/giving-back" className="underline">
            Giving Back
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/giving-back/fundraisers" className="underline">
            Fundraisers
          </Link>
          <span aria-hidden="true">/</span>
          <span>Golf Tournament</span>
        </nav>
        <div className="rounded-[28px] border border-[#D9E5FA] bg-white p-6 shadow-sm sm:p-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#376BCD]">
            Come together on the green
          </p>
          <h1 className="mb-5 text-4xl font-semibold text-[#234F93] sm:text-5xl">
            Golf Tournament
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[#26394D]">
            A day of community with a purpose. The Shaw Spouses’ Club Golf Tournament helps raise
            funds for scholarships and charitable giving.
          </p>
          <div className="my-8 rounded-2xl bg-[#F4F7FF] p-6">
            <h2 className="mb-2 text-2xl font-semibold text-[#234F93]">Our next tournament</h2>
            <p className="leading-7 text-[#26394D]">
              The date, course, registration information, and tournament details will be shared here
              when available.
            </p>
          </div>
          <h2 className="mb-5 text-2xl font-semibold text-[#234F93]">Get involved</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: 'Play',
                text: 'Interested in joining us on the course? Contact the club for information about the next tournament.',
              },
              {
                title: 'Support the event',
                text: 'Ask about opportunities for your business or organization to support the tournament.',
              },
              {
                title: 'Volunteer',
                text: 'Help make the day a success. Get in touch to learn about volunteer opportunities.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#D9E5FA] p-5">
                <h3 className="mb-2 text-xl font-semibold text-[#234F93]">{item.title}</h3>
                <p className="leading-7 text-[#26394D]">{item.text}</p>
              </div>
            ))}
          </div>
          <a
            href={`mailto:${siteConfig.contactEmail}?subject=Golf%20Tournament`}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#4F83E5] px-6 py-3 font-semibold text-white hover:bg-[#376BCD]"
          >
            Contact Us About the Golf Tournament
          </a>
        </div>
      </div>
    </section>
  )
}
