'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { RxCross2 } from 'react-icons/rx'
import { homepageAnnouncement, type Announcement } from '@/data/announcement'

export default function AnnouncementBanner({
  announcement = homepageAnnouncement,
}: {
  announcement?: Announcement
}) {
  const [hidden, setHidden] = useState(true)
  const dismissed = useRef<string | null>(null)
  const key = `ssc:announcement:${announcement.id}`

  useEffect(() => {
    function updateVisibility() {
      const expiration = announcement.expiresAt ? Date.parse(announcement.expiresAt) : null
      // Invalid configured dates fail closed rather than displaying stale news.
      const expired =
        expiration !== null && (!Number.isFinite(expiration) || Date.now() >= expiration)
      let wasDismissed = dismissed.current === key
      try {
        const storage = announcement.persistence === 'session' ? sessionStorage : localStorage
        wasDismissed ||= storage.getItem(key) === 'dismissed'
      } catch {
        // Dismissal still works for this page when browser storage is disabled.
      }
      setHidden(expired || wasDismissed)
    }
    updateVisibility()
    const timer = window.setInterval(updateVisibility, 1000)
    window.addEventListener('storage', updateVisibility)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('storage', updateVisibility)
    }
  }, [key, announcement.persistence, announcement.expiresAt])

  function dismiss() {
    dismissed.current = key
    try {
      const storage = announcement.persistence === 'session' ? sessionStorage : localStorage
      storage.setItem(key, 'dismissed')
    } catch {
      // Keep the dismiss button usable without browser storage.
    }
    setHidden(true)
    document.getElementById('club-welcome-heading')?.focus({ preventScroll: true })
  }

  if (hidden) return null

  return (
    <aside aria-label="Club announcement" className="club-announcement lato-font">
      <div className="club-announcement-inner">
        <span className="club-announcement-tag">Club News</span>
        <div className="club-announcement-message">
          <strong>{announcement.title}</strong>
          <p>{announcement.message}</p>
        </div>
        {Boolean(announcement.links?.length) && (
          <div className="club-announcement-links">
            {announcement.links?.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss club announcement"
          className="club-announcement-close"
        >
          <RxCross2 aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </aside>
  )
}
