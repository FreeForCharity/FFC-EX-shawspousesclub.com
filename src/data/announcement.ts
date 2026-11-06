export type Announcement = {
  id: string
  title: string
  message: string
  links?: readonly { label: string; href: string }[]
  persistence: 'local' | 'session'
  /** Optional ISO timestamp with timezone; null keeps the announcement active. */
  expiresAt: string | null
}

// Change the ID when publishing a new announcement so previous dismissals
// do not hide it. Dates remain unset until the club supplies an end date.
export const homepageAnnouncement: Announcement = {
  id: 'upcoming-events-social-cookie-drive-auction-v1',
  title: 'Upcoming Events',
  message:
    'Join our Monthly Social, explore the Cookie Drive and Charity Auction, and find ways to connect and give back.',
  links: [
    { label: 'Monthly Social', href: '/socials' },
    {
      label: 'Cookie Drive',
      href: '/giving-back/shower-shaw#christmas-cookie-drive-heading',
    },
    { label: 'Charity Auction', href: '/giving-back/auction' },
  ],
  persistence: 'local',
  expiresAt: null,
}
