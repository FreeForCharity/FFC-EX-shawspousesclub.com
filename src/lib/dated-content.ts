/**
 * Build-time expiry for one-off announcements (an "upcoming" event notice).
 *
 * The site is a static export that rebuilds on every deploy, so a notice
 * wrapped in `isStillCurrent(until)` drops off the page on the first build
 * after its moment passes, instead of advertising a past event.
 *
 * `until` must be an ISO 8601 date-time with a timezone (`-05:00` or `Z`), so
 * the cut-off does not depend on the build machine's clock zone. A value that
 * is unparsable or has no timezone throws, failing the build loudly rather
 * than silently hiding (or keeping) the notice.
 */
export function isStillCurrent(until: string, now: Date = new Date()): boolean {
  const time = Date.parse(until)
  if (Number.isNaN(time) || !/(Z|[+-]\d\d:\d\d)$/.test(until)) {
    throw new Error(`Invalid announcement expiry "${until}": use an ISO date-time with a timezone`)
  }
  return time >= now.getTime()
}
