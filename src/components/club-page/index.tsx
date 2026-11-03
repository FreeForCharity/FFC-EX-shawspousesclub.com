import React from 'react'
import Image from 'next/image'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { assetPath } from '@/lib/assetPath'
import { configuredTeam } from '@/data/team'
import { clubEvents } from '@/data/club-pages'
import type { ClubLink, ClubPage as ClubPageData, ClubSection } from '@/data/club-pages'
import EventSchema from '@/components/seo/EventSchema'
import { programsDisclaimer } from '@/data/programs'
import YouTubeFacade from '@/components/ui/YouTubeFacade'

/** Site paths go through assetPath(); mailto/https links are used as-is. */
function resolveHref(href: string): string {
  return href.startsWith('/') && !href.startsWith('//') ? assetPath(href) : href
}

function LinkButton({ link }: { link: ClubLink }) {
  const external = /^https:/i.test(link.href)
  return (
    <a
      href={resolveHref(link.href)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center rounded-[27px] bg-[#0b6cb8] px-[22px] py-[12px] text-[17px] text-white lato-font hover:bg-[#08528f]"
    >
      {link.label}
    </a>
  )
}

function Section({ section }: { section: ClubSection }) {
  return (
    <section id={section.id} className="scroll-mt-[100px] border-t border-[#5599fe] py-[36px]">
      <h2 className="mb-[16px] text-[30px] lg:text-[36px] leading-[120%] faustina-font">
        {section.heading}
      </h2>
      {section.paragraphs?.map((p) => (
        <p key={p} className="mb-[14px] text-[19px] leading-[160%] lato-font">
          {p}
        </p>
      ))}
      {section.points && section.points.length > 0 && (
        <ul className="mb-[14px] list-disc pl-[24px] text-[19px] leading-[160%] lato-font">
          {section.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {section.links && section.links.length > 0 && (
        <div className="mt-[18px] flex flex-wrap gap-[12px]">
          {section.links.map((l) => (
            <LinkButton key={l.href} link={l} />
          ))}
        </div>
      )}
      {section.youtubeId && <YouTubeFacade id={section.youtubeId} title={section.heading} />}
      {section.showBoard && configuredTeam.length > 0 && (
        <ul className="grid grid-cols-1 gap-x-[24px] gap-y-[10px] sm:grid-cols-2 text-[19px] lato-font">
          {configuredTeam.map((m) => (
            <li key={`${m.role}-${m.name}`}>
              <span className="font-[700]">{m.role}:</span> {m.name}
            </li>
          ))}
        </ul>
      )}
      {section.logos && section.logos.length > 0 && (
        <ul className="mt-[24px] flex flex-wrap items-center gap-[28px]">
          {section.logos.map((logo) => {
            const image = (
              <Image
                src={assetPath(`/Images/club/${logo.file}`)}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-[80px] w-auto object-contain"
                loading="lazy"
              />
            )
            return (
              <li key={logo.file}>
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
                  >
                    {image}
                  </a>
                ) : (
                  image
                )}
              </li>
            )
          })}
        </ul>
      )}
      {section.images && section.images.length > 0 && (
        <div
          className={`mt-[24px] grid gap-[16px] ${
            section.images.length === 1
              ? 'grid-cols-1 max-w-[520px]'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {section.images.map((im) => {
            const src = assetPath(`/Images/club/${im.file}`)
            return (
              <a key={im.file} href={src} target="_blank" rel="noopener" className="block">
                <Image
                  src={src}
                  alt={im.alt}
                  width={im.width}
                  height={im.height}
                  className="h-auto w-full rounded-lg shadow-md"
                  loading="lazy"
                />
              </a>
            )
          })}
        </div>
      )}
    </section>
  )
}

/** Renders one of the content pages carried over from the club's former site. */
export default function ClubPage({ page }: { page: ClubPageData }) {
  const path = `/${page.slug}`
  return (
    <div className="pt-[130px] pb-[54px]">
      <BreadcrumbSchema name={page.title} path={path} />
      <EventSchema events={clubEvents.filter((e) => e.page === page.slug)} />
      <div className="mx-auto w-[90%] max-w-[1080px]">
        <h1 className="mb-[16px] text-[44px] lg:text-[54px] leading-[115%] faustina-font">
          {page.title}
        </h1>
        <p className="mb-[24px] text-[21px] leading-[160%] lato-font">{page.intro}</p>
        <nav aria-label={`${page.title} sections`} className="mb-[12px]">
          <ul className="flex flex-wrap gap-x-[18px] gap-y-[6px] text-[16px] lato-font">
            {page.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-[#0b6cb8] underline">
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {page.sections.map((s) => (
          <Section key={s.id} section={s} />
        ))}
        {programsDisclaimer && (
          <p className="mt-[24px] text-center text-[15px] italic text-gray-700 lato-font">
            {programsDisclaimer}
          </p>
        )}
      </div>
    </div>
  )
}
