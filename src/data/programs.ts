// The charity's own programs, shown in the "Our Programs" section of a charity
// site (src/components/home-page/Our-Programs). The supporting organization's
// own site keeps its built-in program block instead. Leave `programs` empty to
// hide the section and every #programs link with it.
//
// Each program needs a title and at least one paragraph; `points` is an
// optional bullet list shown under the paragraphs.

export type ProgramLink = {
  label: string
  /** An `https://` URL, a `mailto:` link, or a site-relative path such as `/docs/<file>.pdf`. */
  href: string
}

export type Program = {
  title: string
  paragraphs: readonly string[]
  points?: readonly string[]
  /** Calls to action shown under the program (join, apply, download a form). */
  links?: readonly ProgramLink[]
  /** Site path of the program's full page, linked as "Learn more". */
  more?: string
}

/** A site-relative path (served from public/), as opposed to an external URL. */
export function isInternalPath(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}

export const programsIntro =
  "The Shaw Spouses' Club brings military spouses together through social events and special-interest groups, and gives back through scholarships and grants to the Shaw AFB and Sumter communities."

export const programs: readonly Program[] = [
  {
    title: 'Membership',
    more: '/membership',
    paragraphs: [
      "The Shaw Spouses' Club is open to spouses of active duty military members (enlisted and officer ranks, all branches), spouses of Reserve or National Guard members, and spouses of retired military members.",
      'We also welcome spouses of DoD employees, widowed spouses, adult dependents (18 or older) who are DoD ID holders, unmarried active duty service members, and mil-to-mil spouses.',
    ],
    points: [
      'Annual membership dues: $30 for the 2026-2027 year.',
      'Eligible prospective members may attend one SSC event as a guest before joining.',
    ],
    links: [
      {
        label: 'Join or renew for 2026-2027',
        href: 'https://www.zeffy.com/en-US/ticketing/shaw-spouses-clubs-26-27-memberships',
      },
    ],
  },
  {
    title: 'Monthly Socials',
    more: '/socials',
    paragraphs: [
      'Members gather every month for a themed membership social. Socials are open to SSC members and their guests, and prospective members may attend one social before paying membership dues.',
    ],
    links: [{ label: 'Social updates on Facebook', href: 'https://www.facebook.com/shawsc' }],
  },
  {
    title: 'Special Activity Groups',
    more: '/socials#special-activities',
    paragraphs: [
      'Special Activities, often called sub-clubs, are a great way to connect with other spouses who share your hobbies and interests.',
    ],
    points: [
      'Book Club',
      'Cookbook Club',
      'Craft Club',
      'Golf',
      'Lunch Bunch',
      'Pickleball',
      'Wine Club',
    ],
    links: [
      {
        label: 'Email us to join a group',
        href: 'mailto:publicrelations.ShawSC@gmail.com?subject=Special%20Activity%20Groups',
      },
    ],
  },
  {
    title: 'Scholarships',
    more: '/scholarships',
    paragraphs: [
      'Part of our mission is to award scholarships every year to graduating high school seniors and to military spouses, service members and dependents who plan to attend or are already enrolled in college.',
      'There are two applications: one for current high school seniors, and one for military spouses, service members and dependents.',
    ],
    points: [
      'Applicants must be a military dependent or service member.',
      "Applicants must hold an SSC membership, or have a family member who is a member of the Shaw Spouses' Club.",
      'Applications for the 2026-2027 school year are closed and recipients have been notified.',
    ],
  },
  {
    title: 'Annual Scholarship Auction and Fundraisers',
    more: '/auction',
    paragraphs: [
      'We host several fundraisers throughout the year, including our Annual Scholarship Auction and our Golf Tournament. The money raised funds our scholarships and our donations to local and national organizations.',
      'Proceeds from the generous local businesses and individuals who sponsor our annual auction directly fund our scholarship and community grant programs. Thank you to every one of our sponsors and donors.',
      "Signing up for or renewing a BJ's Wholesale Club membership through our fundraiser link also sends money back to the club.",
    ],
    links: [
      {
        label: 'Sponsor or donate to the auction',
        href: 'https://www.zeffy.com/en-US/ticketing/ssc-auction-donations',
      },
      {
        label: "BJ's membership fundraiser",
        href: 'https://www.bjs.com/membership/club/?storeId=&marketCode=DC2297',
      },
    ],
  },
  {
    title: 'Charitable Donation Requests',
    more: '/giving#donation-requests',
    paragraphs: [
      "We are proud to have provided thousands of dollars in grants to organizations and events such as The Shaw Airmen's Attic, Spouse Appreciation Day, the Library Summer Reading Program, Angel Tree, the Dorm Airmen Cookie Drive, Girl Scouts, Sumter United Ministries and the Sumter HS Gamecock Poppers.",
      'Organizations that serve the military or the local community are encouraged to request funding. The board meets on the first Tuesday of each month from August to May to review requests.',
    ],
    points: [
      'Requesting organizations must be a nonprofit, school or military organization. Funds cannot be given to individuals or for-profit businesses.',
      'Priority goes to projects that support the welfare of Shaw AFB military members, their families and veterans, then our local community.',
      'Funds support specific programs, events or services. They cannot be used for general operating funds, salaries, alcohol, or any political candidate or partisan cause.',
      'Organizations may normally receive funds once per fiscal year (1 June to 31 May).',
      "Submit requests at least 10 days before the board's monthly meeting.",
    ],
    links: [
      {
        label: 'Charitable funds donation request form (PDF)',
        href: '/docs/ssc_welfare_request_form_25-26.pdf',
      },
    ],
  },
  {
    title: 'Shower Shaw',
    more: '/giving#shower-shaw',
    paragraphs: [
      "For three decades, Sumter Volunteers Inc., the Sumter community and the Shaw Spouses' Club have thanked the airmen of Shaw AFB together. What began as a homemade cookie drive is now Shower Shaw, a gift of goodies for the dedicated servicemen and women of Shaw.",
    ],
  },
  {
    title: 'Serve on the Board',
    more: '/board',
    paragraphs: [
      'Interest forms are open for 2026-2027 board positions, including Parliamentarian, Social Media Manager, Ways and Means and Golf Tournament Chair. If you have thought about joining the board, now is your chance.',
    ],
    links: [
      {
        label: 'Email us about a board position',
        href: 'mailto:publicrelations.ShawSC@gmail.com?subject=Board%20position%20interest',
      },
    ],
  },
  {
    title: 'Governance',
    more: '/board#governance',
    paragraphs: [
      'The club operates under its approved Constitution and Bylaws. A signed copy of the Constitution is on file with the Shaw AFB Force Support Squadron.',
    ],
    links: [
      { label: 'Constitution (PDF)', href: '/docs/ssc_approved_constitution.pdf' },
      { label: 'Bylaws (PDF)', href: '/docs/ssc_by-laws_2019_approved.pdf' },
      { label: 'Letter of Affirmation (PDF)', href: '/docs/letter_of_affirmation.pdf' },
    ],
  },
]

/** Disclaimer the club publishes on every page of its site. */
export const programsDisclaimer =
  "The Shaw Spouses' Club is a private organization. It is not part of the Department of Defense or any of its components and it has no governmental status."
