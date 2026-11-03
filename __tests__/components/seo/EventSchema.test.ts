/**
 * @jest-environment node
 */
import { buildEventSchema, upcomingEvents } from '@/components/seo/EventSchema'
import type { ClubEvent } from '@/data/club-pages'

const base: ClubEvent = {
  page: 'socials',
  section: 'upcoming',
  name: 'Test Social',
  description: 'A test event.',
  startDate: '2026-11-12T18:00:00-05:00',
  location: { name: 'The Cabin', streetAddress: '1305 Loring Mill Road' },
  isAccessibleForFree: true,
}

describe('buildEventSchema', () => {
  it('builds a schema.org Event that points at its page section', () => {
    const s = buildEventSchema(base)
    expect(s['@type']).toBe('Event')
    expect(s.startDate).toBe(base.startDate)
    expect(s.eventStatus).toBe('https://schema.org/EventScheduled')
    expect(s.isAccessibleForFree).toBe(true)
    expect(String(s.url)).toMatch(/\/socials#upcoming$/)
    expect(s.location).toEqual({
      '@type': 'Place',
      name: 'The Cabin',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1305 Loring Mill Road',
        addressCountry: 'US',
      },
    })
  })

  it('omits the address (rather than inventing one) when only a venue name is known', () => {
    const s = buildEventSchema({ ...base, location: { name: 'The Magnolia Club' } })
    expect(s.location).toEqual({ '@type': 'Place', name: 'The Magnolia Club' })
    expect(s).not.toHaveProperty('endDate')
  })
})

describe('upcomingEvents', () => {
  const now = new Date('2026-11-03T12:00:00-05:00')

  it('keeps events that have not ended yet', () => {
    expect(upcomingEvents([base], now)).toHaveLength(1)
  })

  it('drops an event once its end has passed', () => {
    const past = {
      ...base,
      startDate: '2025-12-09T08:00:00-05:00',
      endDate: '2025-12-09T14:00:00-05:00',
    }
    expect(upcomingEvents([past], now)).toHaveLength(0)
  })

  it('keeps an event that is under way (started, not yet ended)', () => {
    const ongoing = {
      ...base,
      startDate: '2026-11-03T08:00:00-05:00',
      endDate: '2026-11-03T14:00:00-05:00',
    }
    expect(upcomingEvents([ongoing], now)).toHaveLength(1)
  })
})
