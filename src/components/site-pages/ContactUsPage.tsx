import Link from 'next/link'
import { siteConfig } from '@/lib/site.config'

export default function ContactUsPage() {
  return (
    <section className="bg-[#F4F7FF] px-5 py-12 sm:py-16">
      <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <Link href="/" className="mb-5 inline-block font-semibold text-[#234F93] underline">
          Home
        </Link>
        <h1 className="faustina-font mb-4 text-3xl font-semibold text-[#234F93] sm:text-4xl">
          Contact Us
        </h1>
        <p className="mb-8 leading-7 text-[#26394D]">
          Contact the Shaw Spouses&apos; Club with questions about membership, activities, or
          charitable programs.
        </p>

        <h2 className="mb-2 text-xl font-semibold text-[#234F93]">Email</h2>
        <p className="mb-8 text-[#26394D]">
          <a href={`mailto:${siteConfig.contactEmail}`} className="font-semibold text-[#234F93] underline">
            {siteConfig.contactEmail}
          </a>
        </p>

        <h2 className="mb-2 text-xl font-semibold text-[#234F93]">Mailing address</h2>
        {siteConfig.addresses.map((address) => (
          <address key={address.label} className="not-italic leading-7 text-[#26394D]">
            {address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        ))}

        <div className="mt-8 flex flex-wrap gap-4">
          {siteConfig.social.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#234F93] underline decoration-[#4F83E5] underline-offset-4 hover:text-[#376BCD]"
            >
              {social.label}
            </a>
          ))}
        </div>
      </article>
    </section>
  )
}
