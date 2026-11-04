/**
 * @jest-environment node
 */
import fs from 'node:fs'
import path from 'node:path'
import { clubEvents, clubPages, currentSections, formMailto } from '@/data/club-pages'
import { siteConfig } from '@/lib/site.config'
import { programs } from '@/data/programs'
import { routes } from '@/app/sitemap'

// The club's former site (shawspousesclub.com) is being retired and pointed at
// this one, so the carried-over pages must not depend on it: every image and
// document they show has to ship in public/, and nothing may link back to the
// old host or its Weebly upload paths.
const PUBLIC = path.join(__dirname, '..', '..', 'public')
const RETIRED = /shawspousesclub\.com|weebly|editmysite|\/uploads\/1\/0\/8\/8/i

const allLinks = clubPages.flatMap((p) => p.sections.flatMap((s) => s.links ?? []))
const allImages = clubPages.flatMap((p) =>
  p.sections.flatMap((s) => [...(s.images ?? []), ...(s.logos ?? [])])
)

describe('club pages are fully localised', () => {
  it('ships every image they reference under public/Images/club', () => {
    expect(allImages.length).toBeGreaterThan(0)
    for (const im of allImages) {
      expect(fs.existsSync(path.join(PUBLIC, 'Images', 'club', im.file))).toBe(true)
    }
  })

  it('gives every image a real description', () => {
    for (const im of allImages) expect(im.alt.trim().length).toBeGreaterThan(5)
  })

  it('ships every site-relative document or page they link to', () => {
    const local = [
      ...allLinks.map((l) => l.href),
      ...programs.flatMap((p) => [...(p.links ?? []).map((l) => l.href), p.more ?? '']),
    ].filter((h) => h.startsWith('/'))
    expect(local.length).toBeGreaterThan(0)
    const pages = new Set(routes.map((r) => r.path))
    for (const href of local) {
      const [p] = href.split('#')
      if (p.startsWith('/docs/')) {
        expect(fs.existsSync(path.join(PUBLIC, p))).toBe(true)
      } else {
        expect(pages.has(p)).toBe(true)
      }
    }
  })

  it('never points back at the retired site', () => {
    const text = JSON.stringify({ clubPages, programs })
    expect(text).not.toMatch(RETIRED)
  })

  it('only uses https, mailto or site-relative links', () => {
    for (const { href } of allLinks) expect(href).toMatch(/^(https:\/\/|mailto:|\/[^/])/)
  })

  it('lists every club page in the sitemap', () => {
    const pages = new Set(routes.map((r) => r.path))
    for (const p of clubPages) expect(pages.has(`/${p.slug}`)).toBe(true)
  })

  it('has unique section anchors on each page', () => {
    for (const p of clubPages) {
      const ids = p.sections.map((s) => s.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })
})

describe('videos and events', () => {
  it('ships a local thumbnail for every YouTube video, so nothing loads from YouTube until play', () => {
    const ids = [
      ...clubPages.flatMap((p) => p.sections.map((s) => s.youtubeId).filter(Boolean)),
      siteConfig.missionYouTubeId,
    ].filter((id): id is string => Boolean(id))
    expect(ids.length).toBeGreaterThan(0)
    for (const id of ids) {
      expect(fs.existsSync(path.join(PUBLIC, 'Images', 'club', `video-${id}.webp`))).toBe(true)
    }
  })

  it('attaches every dated event to a real page and section', () => {
    for (const e of clubEvents) {
      const page = clubPages.find((p) => p.slug === e.page)
      expect(page).toBeDefined()
      expect(page!.sections.some((s) => s.id === e.section)).toBe(true)
      expect(Number.isNaN(Date.parse(e.startDate))).toBe(false)
      expect(e.startDate).toMatch(/[+-]\d\d:\d\d$/)
    }
  })
})

describe('currentSections', () => {
  const page = {
    slug: 'x',
    title: 'X',
    description: 'x',
    intro: 'x',
    sections: [
      { id: 'always', heading: 'Always' },
      { id: 'soon', heading: 'Soon', until: '2026-11-12T23:59:00-05:00' },
    ],
  }

  it('keeps a dated section until its moment passes', () => {
    const ids = currentSections(page, new Date('2026-11-12T20:00:00-05:00')).map((s) => s.id)
    expect(ids).toEqual(['always', 'soon'])
  })

  it('drops a dated section after its moment passes', () => {
    const ids = currentSections(page, new Date('2026-11-13T09:00:00-05:00')).map((s) => s.id)
    expect(ids).toEqual(['always'])
  })

  it('accepts a UTC (Z) date', () => {
    const utc = { ...page, sections: [{ id: 'z', heading: 'Z', until: '2026-11-13T04:59:00Z' }] }
    expect(currentSections(utc, new Date('2026-11-13T04:00:00Z'))).toHaveLength(1)
    expect(currentSections(utc, new Date('2026-11-13T05:00:00Z'))).toHaveLength(0)
  })

  it('throws on an unparsable date instead of silently hiding the section', () => {
    const bad = { ...page, sections: [{ id: 'bad', heading: 'Bad', until: 'next Tuesday' }] }
    expect(() => currentSections(bad)).toThrow(/Invalid "until" on \/x#bad/)
  })

  it('gives every dated section in the real data a valid, timezone-qualified date', () => {
    for (const s of clubPages.flatMap((p) => p.sections).filter((s) => s.until)) {
      expect(Number.isNaN(Date.parse(s.until!))).toBe(false)
      expect(s.until).toMatch(/(Z|[+-]\d\d:\d\d)$/)
    }
  })
})

describe('formMailto', () => {
  it('turns a former web form into a pre-filled email', () => {
    const href = formMailto('club@example.org', 'Board position interest', ['Name', 'Email'])
    const url = new URL(href)
    expect(url.protocol).toBe('mailto:')
    expect(url.pathname).toBe('club@example.org')
    expect(url.searchParams.get('subject')).toBe('Board position interest')
    expect(url.searchParams.get('body')).toBe('Name: \nEmail: \n')
  })

  it('percent-encodes characters that would break the URI', () => {
    const href = formMailto('a@b.org', 'Q&A: 100% #1?', ['Name'])
    expect(href).not.toMatch(/[ #]/)
    expect(new URL(href).searchParams.get('subject')).toBe('Q&A: 100% #1?')
  })
})
