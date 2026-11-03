import React from 'react'
import { siteConfig, siteUrl } from '@/lib/site.config'
import type { ClubEvent } from '@/data/club-pages'

/**
 * Builds a schema.org Event JSON-LD object for one of the club's dated events.
 * Exported separately so it can be asserted in unit tests without rendering.
 */
export function buildEventSchema(event: ClubEvent): Record<string, unknown> {
  const { location } = event
  const address =
    location.streetAddress || location.addressLocality || location.addressRegion
      ? {
          '@type': 'PostalAddress',
          ...(location.streetAddress ? { streetAddress: location.streetAddress } : {}),
          ...(location.addressLocality ? { addressLocality: location.addressLocality } : {}),
          ...(location.addressRegion ? { addressRegion: location.addressRegion } : {}),
          addressCountry: 'US',
        }
      : undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: location.name, ...(address ? { address } : {}) },
    ...(event.isAccessibleForFree ? { isAccessibleForFree: true } : {}),
    organizer: { '@type': 'Organization', name: siteConfig.name, url: siteUrl('/') },
    url: siteUrl(`/${event.page}`) + `#${event.section}`,
  }
}

/** One <script type="application/ld+json"> per event. Server component. */
export default function EventSchema({ events }: { events: readonly ClubEvent[] }) {
  return (
    <>
      {events.map((event) => (
        <script
          key={`${event.page}-${event.section}-${event.startDate}`}
          type="application/ld+json"
          // Escape '<' so a value containing "</script>" cannot break out of
          // the inline script tag (JSON-LD injection guard), as BreadcrumbSchema does.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildEventSchema(event)).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  )
}
