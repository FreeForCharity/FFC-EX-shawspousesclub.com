import { act, fireEvent, render, screen } from '@testing-library/react'
import SocialPhotoReels from '@/components/site-pages/SocialPhotoReels'
import Page0 from '@/app/board/page'
import Page1 from '@/app/contact-us/page'
import Page2 from '@/app/giving-back/page'
import Page3 from '@/app/giving-back/auction/page'
import Page4 from '@/app/giving-back/charitable-requests/page'
import Page5 from '@/app/giving-back/fundraisers/page'
import Page6 from '@/app/giving-back/golf-tournament/page'
import Page7 from '@/app/giving-back/scholarships/page'
import Page8 from '@/app/giving-back/shower-shaw/page'
import Page9 from '@/app/governance/page'
import Page10 from '@/app/membership/page'
import Page11 from '@/app/socials/page'
import Page12 from '@/app/ssc-merch/page'

it.each([
  ['/board', Page0, /Governing Board/],
  ['/contact-us', Page1, /Contact Us/],
  ['/giving-back', Page2, /Giving Back/],
  ['/giving-back/auction', Page3, /Charity Auction/],
  ['/giving-back/charitable-requests', Page4, /Charitable Donation Requests/],
  ['/giving-back/fundraisers', Page5, /Fundraisers/],
  ['/giving-back/golf-tournament', Page6, /Golf Tournament/],
  ['/giving-back/scholarships', Page7, /Scholarships/],
  ['/giving-back/shower-shaw', Page8, /Shower Shaw/],
  ['/governance', Page9, /Governance/],
  ['/membership', Page10, /Find your community at Shaw/],
  ['/socials', Page11, /Monthly Socials/],
  ['/ssc-merch', Page12, /SSC Merch/],
] as const)('%s renders its primary heading', (_route, Page, heading) => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
})

it('lets visitors browse photos and pauses playback when they select a thumbnail', () => {
  jest.useFakeTimers()
  try {
    const photos = [
      { src: '/Images/first.webp', caption: 'First photo', width: 800, height: 600 },
      { src: '/Images/second.webp', caption: '', width: 800, height: 600 },
    ]
    const { unmount } = render(
      <SocialPhotoReels
        collections={[
          { year: '2025', photos },
          { year: '2026', photos },
        ]}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Previous photo in 2025' }))
    expect(screen.getByText('Photo 2 of 2')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Next photo in 2025' }))
    expect(screen.getByText('Photo 1 of 2')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Play slideshow' }))
    act(() => jest.advanceTimersByTime(5000))
    expect(screen.getByText('Photo 2 of 2')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Show photo 1: First photo' }))
    expect(screen.getByRole('button', { name: 'Play slideshow' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
    act(() => jest.advanceTimersByTime(5000))
    expect(screen.getByText('Photo 1 of 2')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '2026' }))
    expect(
      screen.getByRole('link', { name: 'Open full-size photo 1 from 2026 (new tab)' })
    ).toHaveAttribute('href', photos[0].src)
    unmount()
  } finally {
    jest.useRealTimers()
  }
})
