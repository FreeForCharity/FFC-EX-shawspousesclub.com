import Link from 'next/link'
import { pageMetadata } from '@/lib/page-metadata'
import { assetPath } from '@/lib/assetPath'

export const metadata = pageMetadata({
  title: 'Legal Documents',
  description: 'Governing documents and tax-exempt documentation for the Shaw Spouses’ Club.',
  canonical: '/legal-documents',
})

export default function LegalDocumentsPage() {
  return (
    <section className="bg-[#F4F7FF] px-5 py-12 sm:py-16">
      <article className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <Link
          href="/governance"
          className="mb-5 inline-block font-semibold text-[#234F93] underline"
        >
          Governance
        </Link>
        <h1 className="mb-4 text-3xl font-semibold text-[#234F93] sm:text-4xl">Legal Documents</h1>
        <p className="mb-8 leading-7 text-[#26394D]">
          Access the Shaw Spouses’ Club’s governing documents and tax-exempt documentation.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              title: 'Constitution',
              description: 'The foundation of the club’s purpose, membership, and governance.',
              tagline: 'This is who we are',
              path: '/documents/ssc-constitution.pdf',
            },
            {
              title: 'Bylaws',
              description: 'The rules and procedures that guide club operations.',
              tagline: 'This is how we operate',
              path: '/documents/ssc-bylaws.pdf',
            },
          ].map((document) => (
            <section
              key={document.title}
              className="rounded-2xl border border-[#D9E5FA] bg-[#F4F7FF] p-6"
            >
              <h2 className="mb-3 text-2xl font-semibold text-[#234F93]">{document.title}</h2>
              <p className="mb-4 leading-7 text-[#26394D]">{document.description}</p>
              <p className="mb-4 font-semibold text-[#234F93]">{document.tagline}</p>
              <a
                href={assetPath(document.path)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#234F93] underline"
              >
                View {document.title} (PDF)
              </a>
            </section>
          ))}
          <section className="rounded-2xl border border-[#D9E5FA] bg-[#F4F7FF] p-6 sm:col-span-2">
            <h2 className="mb-3 text-2xl font-semibold text-[#234F93]">Tax-Exempt Status</h2>
            <p className="mb-4 leading-7 text-[#26394D]">
              View the club’s updated Letter of Affirmation.
            </p>
            <a
              href={assetPath('/documents/ssc-tax-exempt.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#234F93] underline"
            >
              View Letter of Affirmation (PDF)
            </a>
          </section>
        </div>
      </article>
    </section>
  )
}
