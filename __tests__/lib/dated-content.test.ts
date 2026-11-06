/**
 * @jest-environment node
 */
import { isStillCurrent } from '@/lib/dated-content'
import { MOVIE_NIGHT_UNTIL } from '@/data/announcements'

describe('isStillCurrent', () => {
  const until = '2026-11-12T23:59:00-05:00'

  it('keeps a notice up to its moment', () => {
    expect(isStillCurrent(until, new Date('2026-11-12T20:00:00-05:00'))).toBe(true)
  })

  it('drops a notice once its moment has passed', () => {
    expect(isStillCurrent(until, new Date('2026-11-13T00:01:00-05:00'))).toBe(false)
  })

  it('accepts a UTC (Z) date', () => {
    expect(isStillCurrent('2026-11-13T04:59:00Z', new Date('2026-11-13T04:00:00Z'))).toBe(true)
  })

  it.each(['next Tuesday', '2026-11-12T23:59:00', '2026-11-12'])(
    'throws on %s instead of guessing',
    (bad) => {
      expect(() => isStillCurrent(bad)).toThrow(/Invalid announcement expiry/)
    }
  )

  it('gives Movie Night a valid, timezone-qualified expiry', () => {
    expect(() => isStillCurrent(MOVIE_NIGHT_UNTIL, new Date(0))).not.toThrow()
  })
})
