import Link from 'next/link'
import { programsDisclaimer } from '@/data/programs'
import { siteConfig } from '@/lib/site.config'
import GovernanceCards from '@/components/site-pages/GovernanceCards'

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
        <div className="mt-8">
          <GovernanceCards />
        </div>
        <p className="mt-5 leading-7 text-[#26394D]">
          <Link href="/legal-documents" className="font-semibold text-[#234F93] underline">
            Visit Legal Documents
          </Link>{' '}
          for the club’s governing documents and tax-exempt documentation.
        </p>
        <p className="mt-5 leading-7 text-[#26394D]">
          For current governing documents, contact the club at{' '}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-semibold text-[#234F93] underline"
          >
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </article>
    </section>
  )
}
