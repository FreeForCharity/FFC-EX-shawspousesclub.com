import Link from 'next/link'
import { programs } from '@/data/programs'
import { siteConfig } from '@/lib/site.config'

export default function ClubProgramPage({ title }: { title: string }) {
  const program = programs.find((item) => item.title === title)
  if (!program) return null

  return (
    <section className="bg-[#F4F7FF] px-5 py-12 sm:py-16">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <Link href="/" className="mb-5 inline-block font-semibold text-[#234F93] underline">
          Home
        </Link>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#4F83E5]">
          {title === 'Membership' || title === 'Monthly Socials' || title === 'Special Activity Groups'
            ? 'Membership & Activities'
            : 'Giving Back'}
        </p>
        <h1 className="faustina-font mb-6 text-3xl font-semibold text-[#234F93] sm:text-4xl">
          {program.title}
        </h1>

        <div className="space-y-4 text-base leading-7 text-[#26394D] sm:text-lg">
          {program.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {title === 'Scholarships' && (
          <p className="mt-5 text-base leading-7 text-[#26394D]">
            Application dates and forms vary by cycle. Contact the club at{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-[#234F93] underline">
              {siteConfig.contactEmail}
            </a>{' '}
            for current-cycle information.
          </p>
        )}

        {program.points && program.points.length > 0 && (
          <ul className="mt-6 list-disc space-y-2 pl-6 text-base leading-7 text-[#26394D] sm:text-lg">
            {program.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}

        <Link
          href={title === 'Membership' || title === 'Monthly Socials' || title === 'Special Activity Groups' ? '/' : '/giving-back'}
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#4F83E5] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#376BCD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F93]"
        >
          {title === 'Membership' || title === 'Monthly Socials' || title === 'Special Activity Groups'
            ? 'Back to Home'
            : 'Back to Giving Back'}
        </Link>
      </article>
    </section>
  )
}
