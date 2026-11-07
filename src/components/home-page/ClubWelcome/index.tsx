import React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/site.config'

const pillars = [
  {
    title: 'Connect',
    description:
      'Meet other military spouses through monthly socials and special activity groups built around shared interests.',
    href: '/special-activities',
    linkLabel: 'Explore activities',
  },
  {
    title: 'Scholarships',
    description:
      'The club awards scholarships each year to graduating seniors and military-connected students pursuing college.',
    href: '/giving-back/scholarships',
    linkLabel: 'Learn about scholarships',
  },
  {
    title: 'Give back',
    description:
      'Fundraisers help support scholarships and grants for organizations serving Shaw AFB and the Sumter community.',
    href: '/giving-back',
    linkLabel: 'Support the club',
  },
]

const facebookUrl = siteConfig.social.find((item) => item.label === 'Facebook')?.href

export default function ClubWelcome() {
  return (
    <section
      id="hero"
      aria-labelledby="club-welcome-heading"
      className="bg-[#F4F7FF] px-5 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#2F5FB8]">
            Shaw AFB · Sumter, South Carolina
          </p>
          <h1
            id="club-welcome-heading"
            tabIndex={-1}
            className="faustina-font mb-4 text-4xl font-normal leading-tight text-[#234F93] sm:text-5xl"
          >
            Where friendship meets purpose.
          </h1>
          <p className="lato-font text-base leading-7 text-[#26394D] sm:text-lg">
            A place to connect, grow, and give back
          </p>
        </div>

        <section
          id="mission"
          aria-labelledby="mission-heading"
          className="mx-auto mb-10 max-w-[800px] rounded-b-xl border-t-2 border-[#4F83E5] bg-white px-7 py-7 text-center"
        >
          <h2
            id="mission-heading"
            className="faustina-font mb-3 text-[26px] font-normal text-[#234F93]"
          >
            Our Mission
          </h2>
          <p className="lato-font text-base leading-8 text-[#526176]">{siteConfig.mission}</p>
        </section>
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map(({ title, description, href, linkLabel }) => (
            <article
              key={title}
              className="flex h-full flex-col rounded-xl border border-[#D9E5FA] bg-white p-7"
            >
              <h3 className="faustina-font mb-3 text-[26px] font-normal text-[#234F93]">{title}</h3>
              <p className="mb-5 flex-1 leading-6 text-[#26394D]">{description}</p>
              <Link
                href={href}
                className="font-semibold text-[#234F93] underline decoration-[#4F83E5] underline-offset-4 hover:text-[#376BCD]"
              >
                {linkLabel}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <section className="rounded-xl border border-[#D9E5FA] bg-white p-6 sm:p-8">
            <h3 className="mb-2 text-2xl font-semibold text-[#234F93]">Connect with us</h3>
            <p className="mb-5 leading-6 text-[#26394D]">
              Follow us on Facebook for club news, photos, and community updates.
            </p>
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#2F5FB8] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#376BCD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F93]"
              >
                Visit our Facebook page
              </a>
            )}
          </section>
          <section className="rounded-xl border border-[#D9E5FA] bg-white p-6 sm:p-8">
            <h3 className="mb-2 text-2xl font-semibold text-[#234F93]">
              Curious about membership?
            </h3>
            <p className="mb-5 leading-6 text-[#26394D]">
              Find membership eligibility, dues, socials, and special activity group details on the
              Membership page.
            </p>
            <Link
              href="/membership"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#2F5FB8] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#376BCD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F93]"
            >
              Explore membership
            </Link>
          </section>
        </div>
      </div>
    </section>
  )
}
