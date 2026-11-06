import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import AnnouncementBanner from '@/components/home-page/AnnouncementBanner'
import { homepageAnnouncement } from '@/data/announcement'

describe('Homepage announcement', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('links all three approved events and is accessible', async () => {
    const { container } = render(<AnnouncementBanner />)
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Monthly Social/ })).toHaveAttribute('href', '/socials')
    expect(screen.getByRole('link', { name: /Cookie Drive/ })).toHaveAttribute(
      'href',
      '/giving-back/shower-shaw#christmas-cookie-drive-heading'
    )
    expect(screen.getByRole('link', { name: /Charity Auction/ })).toHaveAttribute(
      'href',
      '/giving-back/auction'
    )
    expect((await axe(container)).violations).toEqual([])
  })

  it('remembers dismissal after remount but shows a new announcement', () => {
    const { unmount } = render(<AnnouncementBanner />)
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss club announcement' }))
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    unmount()
    const { rerender } = render(<AnnouncementBanner />)
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    rerender(<AnnouncementBanner announcement={{ ...homepageAnnouncement, id: 'new-event' }} />)
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument()
  })

  it('can remember dismissal for a session instead of persistently', () => {
    render(
      <AnnouncementBanner announcement={{ ...homepageAnnouncement, persistence: 'session' }} />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss club announcement' }))
    const key = `ssc:announcement:${homepageAnnouncement.id}`
    expect(sessionStorage.getItem(key)).toBe('dismissed')
    expect(localStorage.getItem(key)).toBeNull()
  })

  it('hides expired or invalid dates and allows future dates', () => {
    const { rerender } = render(
      <AnnouncementBanner
        announcement={{ ...homepageAnnouncement, expiresAt: '2000-01-01T00:00:00Z' }}
      />
    )
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    rerender(
      <AnnouncementBanner announcement={{ ...homepageAnnouncement, expiresAt: 'invalid' }} />
    )
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    rerender(
      <AnnouncementBanner
        announcement={{ ...homepageAnnouncement, expiresAt: '2099-01-01T00:00:00Z' }}
      />
    )
    expect(screen.getByRole('complementary')).toBeInTheDocument()
  })

  it('expires while the page remains open', () => {
    jest.useFakeTimers()
    const expiresAt = new Date(Date.now() + 1500).toISOString()
    render(<AnnouncementBanner announcement={{ ...homepageAnnouncement, expiresAt }} />)
    expect(screen.getByRole('complementary')).toBeInTheDocument()
    act(() => jest.advanceTimersByTime(2000))
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    jest.useRealTimers()
  })

  it('dismisses even when storage is blocked', () => {
    const read = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const write = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    render(<AnnouncementBanner />)
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss club announcement' }))
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    read.mockRestore()
    write.mockRestore()
  })

  it('supports an announcement without links', () => {
    render(<AnnouncementBanner announcement={{ ...homepageAnnouncement, links: [] }} />)
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
