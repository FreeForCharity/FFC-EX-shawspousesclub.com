// The charity's own programs, shown in the "Our Programs" section of a charity
// site (src/components/home-page/Our-Programs). The supporting organization's
// own site keeps its built-in program block instead. Leave `programs` empty to
// hide the section and every #programs link with it.
//
// Each program needs a title and at least one paragraph; `points` is an
// optional bullet list shown under the paragraphs.

export type Program = {
  title: string
  paragraphs: readonly string[]
  points?: readonly string[]
}

export const programsIntro =
  "The Shaw Spouses' Club brings military spouses together through social events and special-interest groups, and gives back through scholarships and grants to the Shaw AFB and Sumter communities."

export const programs: readonly Program[] = [
  {
    title: 'Membership',
    paragraphs: [
      "The Shaw Spouses' Club is open to spouses of active duty military members (enlisted and officer ranks, all branches), spouses of Reserve or National Guard members, and spouses of retired military members.",
      'We also welcome spouses of DoD employees, widowed spouses, adult dependents (18 or older) who are DoD ID holders, unmarried active duty service members, and mil-to-mil spouses.',
    ],
    points: [
      'Annual membership dues: $30 for the 2026-2027 year.',
      'Eligible prospective members may attend one SSC event as a guest before joining.',
    ],
  },
  {
    title: 'Monthly Socials',
    paragraphs: [
      'Members gather every month for a themed membership social. Socials are open to SSC members and their guests, and prospective members may attend one social before paying membership dues.',
    ],
  },
  {
    title: 'Special Activity Groups',
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
  },
  {
    title: 'Scholarships',
    paragraphs: [
      'Part of our mission is to award scholarships every year to graduating high school seniors and to military spouses, service members and dependents who plan to attend or are already enrolled in college.',
      'There are two applications: one for current high school seniors, and one for military spouses, service members and dependents.',
    ],
    points: [
      'Applicants must be a military dependent or service member.',
      "Applicants must hold an SSC membership, or have a family member who is a member of the Shaw Spouses' Club.",
    ],
    // Confirm the current award cycle dates and application links before launch.
  },
  {
    title: 'Fundraisers',
    paragraphs: [
      'The club hosts fundraisers, including the Annual Scholarship Auction and Golf Tournament. Proceeds support scholarships and donations to local and national organizations.',
    ],
    points: ['Annual Scholarship Auction', 'Golf Tournament'],
  },
  {
    title: 'Charitable Donation Requests',
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
  },
  {
    title: 'Shower Shaw',
    paragraphs: [
      "For three decades, Sumter Volunteers Inc., the Sumter community and the Shaw Spouses' Club have thanked the military members serving at Shaw AFB together. What began as a homemade cookie drive is now Shower Shaw, a gift of goodies for the dedicated servicemembers serving at Shaw.",
    ],
  },
]

/** Disclaimer the club publishes on every page of its site. */
export const programsDisclaimer =
  "The Shaw Spouses' Club is a private organization. It is not part of the Department of Defense or any of its components and it has no governmental status."
