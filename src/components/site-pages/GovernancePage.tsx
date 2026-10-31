import Link from 'next/link'
import { programsDisclaimer } from '@/data/programs'
import { siteConfig } from '@/lib/site.config'

export default function GovernancePage() {
  return (
    <section className="bg-[#F4F7FF] px-5 py-12 sm:py-16">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <Link href="/" className="mb-5 inline-block font-semibold text-[#234F93] underline">
          Home
        </Link>
        <h1 className="faustina-font mb-6 text-3xl font-semibold text-[#234F93] sm:text-4xl">
          Governance
        </h1>
        <p className="leading-7 text-[#26394D]">{programsDisclaimer}</p>
        <div className="mt-8 rounded-xl border border-[#D9E5FA] bg-[#F4F7FF] p-6">
          <h2 className="mb-2 text-xl font-semibold text-[#234F93]">Board &amp; committees</h2>
          <p className="mb-5 leading-7 text-[#26394D]">
            View the current governing board roster and available volunteer positions.
          </p>
          <Link
            href="/board"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#4F83E5] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#376BCD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F93]"
          >
            Meet the board
          </Link>
        </div>
        <p className="mt-5 leading-7 text-[#26394D]">
          For current governing documents, contact the club at{' '}
          <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-[#234F93] underline">
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </article>
    </section>
  )
}
