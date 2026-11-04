// Content pages carried over from the club's former site, shawspousesclub.com.
//
// That site is being retired and its domain pointed here, so everything it
// offered lives in this repository: every image is under public/Images/club,
// every document under public/docs, and every web form is replaced by a
// pre-filled email to the club address that handled it. The only external
// destinations are the club's own accounts on established platforms (Zeffy
// for payments, YouTube for its videos) and the sponsors' own websites.

/** A call to action: an `https://` URL, a `mailto:` link, or a site path. */
export type ClubLink = { label: string; href: string }

export type ClubImage = {
  /** File name under public/Images/club. */
  file: string
  alt: string
  width: number
  height: number
}

export type ClubSection = {
  /** In-page anchor; the old .com page URLs redirect to these. */
  id: string
  heading: string
  paragraphs?: readonly string[]
  points?: readonly string[]
  links?: readonly ClubLink[]
  images?: readonly ClubImage[]
  /** Sponsor or partner logos, shown smaller and on white. */
  logos?: readonly (ClubImage & { name: string; href?: string })[]
  /** YouTube video id from the club's own channel. */
  youtubeId?: string
  /** Show the Governing Board roster (src/data/team.ts) here. */
  showBoard?: boolean
  /**
   * ISO date-time after which this section is out of date. It is left out of
   * the page from the first build after that moment, so an "Upcoming" notice
   * never outlives its event. Use for one-off announcements only.
   */
  until?: string
}

export type ClubPage = {
  slug: string
  title: string
  description: string
  intro: string
  sections: readonly ClubSection[]
}

// Club mailboxes, as published on shawspousesclub.com and the club's flyers.
export const CLUB_EMAILS = {
  general: 'publicrelations.ShawSC@gmail.com',
  president: 'president.shawsc@gmail.com',
  vicePresident: 'vicepresident.shawsc@gmail.com',
  secretary: 'secretaryshawsc@gmail.com',
  scholarship: 'Scholarship.shawsc@gmail.com',
  auction: 'ShawSCAuction@gmail.com',
  charitable: 'charitable.shawsc@gmail.com',
} as const

/**
 * A `mailto:` link that stands in for a former web form: the subject names
 * the form and the body lists the fields it asked for, so the email arrives
 * with everything the club needs.
 */
export function formMailto(to: string, subject: string, fields: readonly string[]): string {
  const body = fields.map((f) => `${f}: `).join('\n') + '\n'
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const ZEFFY_MEMBERSHIP =
  'https://www.zeffy.com/en-US/ticketing/shaw-spouses-clubs-26-27-memberships'
const ZEFFY_AUCTION = 'https://www.zeffy.com/en-US/ticketing/ssc-auction-donations'
// The club's PayPal donate button from the .com Charitable Giving page
// (hosted_button_id VGJBWZYWR5J2G). PayPal reports the receiving account as
// "Shaw Spouses' Club" and eligible to receive donations (checked 2026-11-03).
const PAYPAL_DONATE = 'https://www.paypal.com/donate/?hosted_button_id=VGJBWZYWR5J2G'
// The club's Google Form RSVP for the November 12 social (from the .com
// Social page), titled "SSC Movie Night on the Lawn RSVP".
const RSVP_MOVIE_ON_THE_LAWN =
  'https://docs.google.com/forms/d/e/1FAIpQLSeY7x2tBBBQ3t-HsReylDhLz4POBIcDmepmorWUco-y4bLeyg/viewform'

const img = (file: string, width: number, height: number, alt: string): ClubImage => ({
  file,
  width,
  height,
  alt,
})

export const clubPages: readonly ClubPage[] = [
  {
    slug: 'membership',
    title: 'Membership',
    description:
      "Who can join the Shaw Spouses' Club, annual dues, and how to become a member at Shaw AFB.",
    intro:
      'Join a welcoming community of military spouses at Shaw AFB. Members connect through monthly socials and special activity groups, and give back through scholarships and charitable giving.',
    sections: [
      {
        id: 'who-can-join',
        heading: 'Who Can Join?',
        paragraphs: [
          "The Shaw Spouses' Club is open to spouses of active duty military members (enlisted and officer ranks, all branches), spouses of Reserve or National Guard members, and spouses of retired military members.",
          'We also welcome spouses of DoD employees, widowed spouses, adult dependents (18 years or older) who are DoD ID holders, and unmarried active duty service members, or mil-to-mil spouses.',
        ],
        youtubeId: 'g8k7eFv0_GU',
      },
      {
        id: 'join',
        heading: 'Ready to Join?',
        points: [
          'Annual membership dues: $30 for the 2026-2027 year.',
          'Not yet a member, but want to try us out before joining? Eligible prospective members can attend one SSC event as a guest before becoming a member.',
        ],
        links: [
          { label: 'Join or renew for 2026-2027', href: ZEFFY_MEMBERSHIP },
          { label: 'See upcoming socials', href: '/socials' },
          {
            label: 'Email a membership question',
            href: formMailto(CLUB_EMAILS.president, 'Membership question', ['Name', 'Question']),
          },
        ],
      },
    ],
  },
  {
    slug: 'socials',
    title: 'Socials and Special Activities',
    description:
      "Monthly membership socials and special activity groups of the Shaw Spouses' Club at Shaw AFB.",
    intro:
      'Members gather every month for a themed social, and special activity groups bring together spouses with shared hobbies and interests.',
    sections: [
      {
        id: 'upcoming',
        heading: 'Upcoming: November Social, Movie on the Lawn',
        // Drops off the page once the social is over (Nov 12, 2026, ET).
        until: '2026-11-12T23:59:00-05:00',
        paragraphs: [
          'Our Friendsgiving theme is Flannel and Friends. Bring your blankets and cozy clothes and join us at The Cabin at Alice Drive Baptist Church, 1305 Loring Mill Road, on November 12 at 6 PM, featuring The Devil Wears Prada 2. Snacks and cider will be provided, entry is free, and we will be there rain or shine (we have a backup plan).',
          'RSVP is requested. If you are not feeling well, please do not attend the social.',
        ],
        links: [
          // The club's own Google Form (from the .com Social page). It lives in
          // the club's Google account, not on the retired Weebly site.
          { label: 'RSVP for Movie on the Lawn', href: RSVP_MOVIE_ON_THE_LAWN },
          {
            label: 'Questions? Email the president',
            href: formMailto(CLUB_EMAILS.president, 'Question: Movie on the Lawn (November 12)', [
              'Name',
              'Question',
            ]),
          },
          { label: 'Not a member yet? Join here', href: '/membership' },
        ],
        images: [
          img(
            'socials-movie-on-the-lawn.webp',
            618,
            800,
            'Flyer: Movie Night on the Lawn, November 12 at 6 PM at The Cabin at Alice Drive Baptist Church, 1305 Loring Mill Road, featuring The Devil Wears Prada 2. Free entry, RSVP requested.'
          ),
        ],
      },
      {
        id: 'monthly-socials',
        heading: 'Monthly Membership Socials',
        paragraphs: [
          'Attendance at our monthly socials is open to SSC members and their guests. Prospective members may attend one membership social before paying membership dues.',
        ],
        images: [
          img(
            'socials-friendship-sign.webp',
            800,
            600,
            "Shaw Spouses' Club sign reading: where friendship meets purpose"
          ),
          img(
            'socials-members-smiling.webp',
            800,
            600,
            'Smiling club members together at a social'
          ),
          img(
            'socials-members-outdoors.webp',
            600,
            800,
            'Club members gathered outdoors at a social'
          ),
          img(
            'socials-sweet-to-meet-you.webp',
            940,
            788,
            'Flyer: Sweet to Meet You social, August 19, 2021, 6 PM, Memorial Park, Shaw AFB'
          ),
          img('socials-lunch-bunch.webp', 720, 540, 'Club members at a Lunch Bunch outing'),
          img(
            'socials-members-table.webp',
            600,
            800,
            'Members chatting around a table at a social'
          ),
        ],
      },
      {
        id: 'special-activities',
        heading: 'Special Activity Groups',
        paragraphs: [
          'In addition to SSC monthly socials, Special Activities, often referred to as sub-clubs, are a great way to connect with other spouses with similar hobbies or interests.',
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
            label: 'Sign up for a group by email',
            href: formMailto(CLUB_EMAILS.general, 'Special Activity Groups sign-up', [
              'Name',
              'Email',
              'Which group(s) are you interested in?',
            ]),
          },
        ],
        images: [
          img(
            'special-activities-potluck.webp',
            800,
            600,
            'A spread of dishes at a special activity group potluck'
          ),
        ],
      },
    ],
  },
  {
    slug: 'scholarships',
    title: 'Scholarships',
    description:
      "Shaw Spouses' Club scholarships for high school seniors, military spouses, dependents and service members.",
    intro:
      "The Shaw Spouses' Club is proud to offer scholarships for high school seniors, military spouses, dependents, and service members who plan to attend or are already enrolled in college.",
    sections: [
      {
        id: 'application',
        heading: '2026-2027 Scholarship Program',
        paragraphs: [
          'Applications for the 2026-2027 school year are now closed and recipients have been notified. Thank you to all who submitted applications.',
          'There are two scholarship applications: one for current high school seniors, and one for military spouses, service members, and dependents planning to attend or already enrolled in college.',
        ],
        images: [
          img(
            'scholarships-2026-flyer.webp',
            618,
            800,
            "Flyer: Shaw Spouses' Club Scholarship Opportunity, 2026-2027 school year. Applicants must be a member or the immediate family of a member, with membership dated before December 31, 2025, and must be a military dependent or service member. Applications opened January 15, 2026 and closed March 15, 2026."
          ),
        ],
      },
      {
        id: 'faq',
        heading: 'Eligibility and Dates',
        paragraphs: [
          'The scholarship went live on 15 January 2026, with applications accepted through 15 March 2026.',
          "If you are not currently a member of the Shaw Spouses' Club, the deadline to join to be eligible for the scholarships was 31 December 2025.",
        ],
        points: [
          'Applicants must be a military dependent or service member.',
          "Applicants must have an SSC membership, or a family member with a membership to the Shaw Spouses' Club.",
        ],
        links: [
          {
            label: 'Email a scholarship question',
            href: formMailto(CLUB_EMAILS.scholarship, 'Scholarship question', [
              'Name',
              'Email',
              'Question',
            ]),
          },
          { label: 'Become a member', href: '/membership' },
        ],
      },
      {
        id: 'winners',
        heading: 'Scholarship Award Recipients',
        paragraphs: ['Congratulations to our scholarship award recipients.'],
        images: [
          img(
            'scholarships-winners-2026.webp',
            800,
            600,
            '2026 scholarship award recipients holding their certificates'
          ),
          img(
            'scholarships-winners-2025.webp',
            800,
            600,
            '2025 scholarship award recipients holding their certificates'
          ),
          img(
            'scholarships-winners-2022.webp',
            940,
            788,
            'Congratulations, Scholarship Winners: the 2022 recipients by category'
          ),
          img(
            'scholarships-winners-2020.webp',
            800,
            533,
            '2020 scholarship recipients celebrating outdoors'
          ),
          img(
            'scholarships-winners-2019.webp',
            960,
            720,
            'Profile of a 2019 high school senior scholarship recipient'
          ),
        ],
      },
    ],
  },
  {
    slug: 'auction',
    title: 'Auction and Fundraisers',
    description:
      "The Shaw Spouses' Club Annual Charity Auction, golf tournament and fundraisers that fund scholarships and community grants.",
    intro:
      'The money we raise allows us to give back to the community through scholarships and donations to local and national organizations.',
    sections: [
      {
        id: 'annual-auction',
        heading: 'Annual Charity Auction: 20 February 2027',
        paragraphs: [
          'Save the date! Our Annual Charity Auction is on 20 February 2027 at The Magnolia Club, doors open at 5 PM. Get ready to be wowed: this year the theme is Jungle Safari.',
          'Our silent and live auctions feature one-of-a-kind experiences, luxury items and exclusive packages, all to raise much-needed grants and scholarships for our military families and the Shaw community.',
        ],
        links: [
          {
            label: 'Ask about tickets',
            href: formMailto(CLUB_EMAILS.auction, 'Auction tickets: 20 February 2027', [
              'Name',
              'Number of tickets or tables',
            ]),
          },
        ],
        images: [
          img(
            'auction-2027-save-the-date.webp',
            1080,
            1350,
            "Save the date: Shaw Spouses' Club Annual Charity Auction, Jungle Safari theme, 20 February 2027 at The Magnolia Club, doors open at 5 PM."
          ),
        ],
      },
      {
        id: 'sponsors',
        heading: 'Thank You to Our 2026 Auction Sponsors and Donors',
        paragraphs: [
          'We are incredibly grateful to the local businesses and individuals who have generously supported our annual auction. Proceeds from these contributions help further our mission and directly fund our scholarship and community grant programs.',
          'King of the Jungle: BlueCross BlueShield of South Carolina. Emerald Anaconda: FTC and SAFE Federal Credit Union. Sapphire Safari: Curtis & Croft, LLC, First Command, Jones Chevrolet GMC, and Global Tax and Business Services.',
        ],
        logos: [
          {
            ...img('sponsor-bcbssc.webp', 870, 197, 'BlueCross BlueShield of South Carolina logo'),
            name: 'BlueCross BlueShield of South Carolina',
          },
          {
            ...img('sponsor-ftc.webp', 364, 117, 'FTC logo'),
            name: 'FTC',
            href: 'https://www.ftc.net/locations/sumter-wesmark/',
          },
          {
            ...img('sponsor-safe.webp', 239, 209, 'SAFE Federal Credit Union logo'),
            name: 'SAFE Federal Credit Union',
          },
          {
            ...img(
              'sponsor-curtis-croft.webp',
              1158,
              293,
              'Curtis & Croft, LLC, Attorneys at Law logo'
            ),
            name: 'Curtis & Croft, LLC',
          },
          {
            ...img('sponsor-first-command.webp', 430, 117, 'First Command logo'),
            name: 'First Command',
          },
          {
            ...img('sponsor-jones.webp', 1600, 558, 'Jones Chevrolet GMC logo'),
            name: 'Jones Chevrolet GMC',
          },
          {
            ...img('sponsor-global-tax.webp', 176, 203, 'Global Tax and Business Services logo'),
            name: 'Global Tax and Business Services',
          },
        ],
      },
      {
        id: 'become-a-sponsor',
        heading: 'Become a Sponsor',
        paragraphs: [
          'If you would like to become a sponsor, email us and use the donation link to provide your contribution. Our Letter of Affirmation is available for your records.',
        ],
        links: [
          { label: 'Contribute through Zeffy', href: ZEFFY_AUCTION },
          {
            label: 'Email us about sponsoring',
            href: formMailto(CLUB_EMAILS.auction, 'Auction sponsorship', [
              'Name',
              'Business',
              'Email',
              'Comment',
            ]),
          },
          { label: 'Letter of Affirmation (PDF)', href: '/docs/letter_of_affirmation.pdf' },
        ],
      },
      {
        id: 'golf',
        heading: 'Golf Tournament',
        paragraphs: [
          "Our First Annual Golf Tournament Fundraiser was held on Saturday, November 1, 2025, from 9 AM to 1 PM at Carolina Lakes Golf Course, Shaw AFB: $65 per individual or $300 per team of four, lunch included. All proceeds go toward the club's goal of supporting the Sumter military community through scholarships, community grants to local nonprofits and base programs, and ongoing support of programs that uplift military families.",
        ],
        images: [
          img(
            'golf-2025-flyer.webp',
            618,
            800,
            "Flyer: Shaw Spouses' Club First Annual Golf Tournament, Saturday, November 1, 2025, 9 AM to 1 PM, Carolina Lakes Golf Course, Shaw AFB. $65 per individual or $300 per team of four, lunch included; team registration includes 4 drinks, 4 mulligans, 4 opportunity tickets and 4 stroke savers."
          ),
        ],
      },
      {
        id: 'fundraisers',
        heading: "BJ's Wholesale Club Membership Fundraiser",
        paragraphs: [
          "If you have been thinking about getting a BJ's membership or renewing a current one, now is a great time. Signing up through our fundraiser brings money directly back to our spouses' club, which in turn helps our scholarship program and spouse engagement opportunities.",
        ],
        links: [
          {
            label: "Sign up through our BJ's fundraiser",
            href: 'https://www.bjs.com/membership/club/?storeId=&marketCode=DC2297',
          },
        ],
        images: [
          img(
            'fundraisers-bjs-club-for-a-cause.webp',
            978,
            723,
            "BJ's Club for a Cause flyer supporting the Shaw Spouses' Club"
          ),
          img(
            'fundraisers-bjs-compare.webp',
            933,
            783,
            "BJ's Club and Club+ membership comparison chart"
          ),
          img('fundraisers-bjs-fuel-up.webp', 945, 248, "BJ's Red, White and Fuel Up event banner"),
        ],
      },
      {
        id: 'past-auctions',
        heading: 'Past Auctions',
        paragraphs: [
          '11th Annual SSC Auction Night, Lights, Camera, Auction! (8 March 2025).',
          '10th Annual SSC Scholarship Auction, Denim & Diamonds. Thank you to McLaughlin Ford, Hines Furniture, Sumter Board of Realtors, Lugoff Toyota, GMC Jones, Parrish Home Team Realty, LLC, Great Southern Homes, FTC, Duke Energy, First Citizens Bank, The Citizens Bank, Sumter Little Theatre, Sumter Chrysler Dodge Jeep RAM, Dillard Financial and Young Professionals of Sumter.',
          '6th Annual Scholarship Auction, with photography by Rebekah Ruth Photography.',
        ],
        images: [
          img(
            'auction-2025-tickets.webp',
            1080,
            1080,
            'Flyer: Shaw Night, Lights, Camera, Auction!, 8 March 2025 at 6 PM. $40 individual ticket, $70 two tickets seated together, $300 table with 8 seats, $425 VIP table with 8 seats and 2 bottles of wine.'
          ),
          img(
            'auction-2025-sponsors.webp',
            731,
            1024,
            'Thank-you list of 2025 auction sponsors and donors'
          ),
          img(
            'auction-2025-centerpiece.webp',
            600,
            800,
            'Movie-themed centerpiece at the Lights, Camera, Auction! night'
          ),
          img('auction-2025-guests.webp', 533, 800, 'Guests at the 2025 auction night'),
          img(
            'auction-denim-diamonds-flyer.webp',
            571,
            800,
            'Flyer: S.H.A.W. Auction Night, Denim & Diamonds'
          ),
          img(
            'auction-denim-diamonds-donors.webp',
            618,
            800,
            'Thank-you list of Denim & Diamonds auction donors'
          ),
          img(
            'auction-6th-buffet.webp',
            960,
            720,
            'Buffet table at the 6th Annual Scholarship Auction'
          ),
          img(
            'auction-6th-guests.webp',
            720,
            960,
            'Two guests at the 6th Annual Scholarship Auction'
          ),
          img(
            'auction-6th-sunset.webp',
            800,
            533,
            'Sunset over the 6th Annual Scholarship Auction venue'
          ),
          img(
            'auction-6th-thank-you.webp',
            640,
            800,
            'Thank-you list of 6th Annual Scholarship Auction sponsors and donors'
          ),
        ],
      },
    ],
  },
  {
    slug: 'giving',
    title: 'Charitable Giving',
    description:
      "Shaw Spouses' Club charitable donation requests, community grants and the Shower Shaw cookie drive.",
    intro:
      'We host several fundraisers throughout the year. The money raised allows us to give back to the community through scholarships and donations to local and national organizations.',
    sections: [
      {
        id: 'community',
        heading: 'Giving Back to the Shaw AFB Community',
        paragraphs: [
          "Part of the mission of the Shaw Spouses' Club is to award scholarships annually to seniors graduating high school and to military spouses and dependents enrolled in college. Thank you for your support of the Shaw Spouses' Club!",
        ],
        youtubeId: 'pAPtf5yOQSM',
        links: [
          { label: 'Donate through PayPal', href: PAYPAL_DONATE },
          { label: 'Donate through Zeffy', href: ZEFFY_AUCTION },
          { label: 'Our scholarships', href: '/scholarships' },
          { label: 'Partner with us', href: '/auction#become-a-sponsor' },
        ],
        images: [
          img(
            'giving-donation.webp',
            800,
            600,
            'Club members presenting a donation to a local group'
          ),
        ],
      },
      {
        id: 'donation-requests',
        heading: 'Charitable Donation Requests',
        paragraphs: [
          "We are proud to have provided thousands of dollars in grants to organizations and events like The Shaw Airmen's Attic, Spouse Appreciation Day, Library Summer Reading Program, Angel Tree, Dorm Airmen Cookie Drive, Girl Scouts, Sumter United Ministries, Sumter HS Gamecock Poppers and many more in fiscal year 2024-2025. These grants supported essential needs for our Team Shaw military members and families, as well as our local community.",
          'The Shaw Spouses Club (SSC) encourages organizations that serve the military and/or local community to submit requests for funding using the Charitable Funds Donation Request Form. Scan and email the completed form to charitable.shawsc@gmail.com, or mail it to Shaw Spouses Club, PO Box 52337, Shaw AFB, SC 29152.',
          'Eligibility: requesting organizations must be a nonprofit, school or military organization; funds cannot be given to individuals or for-profit businesses. The SSC will not provide monetary support to any political candidate or partisan political cause. The SSC prioritizes grants to organizations and projects that support the general welfare of Shaw AFB military members, their families and veterans, then our local community, including organizations responsible for charitable, religious, scientific, literary or educational activities.',
        ],
        points: [
          'All groups seeking funding should complete the Charitable Funds Donation Request Form.',
          'Under normal circumstances, organizations may receive funds once per fiscal year; exceptions are handled case by case. The fiscal year runs from 1 June to 31 May.',
          'SSC funding will not be used to purchase alcohol.',
          'SSC funding should be used for specific programs, events or services that benefit our local community. Funds cannot be approved for general operating funds or salaries.',
          'The SSC meets the first Tuesday of each month from August to May to review and decide on requests.',
          'Requests must be submitted at least 10 days before the monthly board meeting to be reviewed at that meeting; later requests carry over to the next month, so please plan ahead.',
          'Requests are decided first come, first served, and funds are awarded as requests are approved throughout the year.',
          'No group is guaranteed funding. Approval depends on eligibility, compliance with audits and documentation, and available funding each year.',
          'The SSC may approve a request but award a different amount, depending on available funding, program impact and other factors.',
        ],
        links: [
          {
            label: 'Charitable Funds Donation Request Form 25-26 (PDF)',
            href: '/docs/ssc_welfare_request_form_25-26.pdf',
          },
          {
            label: 'Email a completed request',
            href: formMailto(CLUB_EMAILS.charitable, 'Charitable Funds Donation Request', [
              'Organization',
              'Point of contact',
              'Amount requested',
              'Program or event',
            ]),
          },
        ],
      },
      {
        id: 'shower-shaw',
        heading: 'Shower Shaw with Cookies',
        paragraphs: [
          "For the last three decades, Sumter Volunteers Inc., together with the Sumter community and the Shaw Spouses' Club, has been expressing heartfelt gratitude to Shaw AFB. We used to celebrate the tradition by sharing homemade cookies with the military personnel at Shaw Air Force Base. More recently we have adapted, showering the dedicated servicemen and women of Shaw with an array of delightful goodies instead.",
          'Our most recent drive, the 2025 Dorm Airmen Cookie Drive, was held on Tuesday, December 9, 2025, at the Shaw AFB Palmetto Chapel. Thank you to every baker, volunteer and donor who helped. Details of the next drive will be posted here.',
        ],
        links: [
          {
            label: 'Help with the next cookie drive',
            href: formMailto(CLUB_EMAILS.general, 'Shower Shaw: next cookie drive', [
              'Name',
              'How I would like to help (bake, donate goodies, volunteer at assembly)',
            ]),
          },
        ],
        images: [
          img(
            'shower-shaw-2025-flyer.webp',
            618,
            800,
            "Flyer: 2025 Dorm Airmen Cookie Drive hosted by the Shaw Spouses' Club, Tuesday, December 9, 2025, Shaw AFB Palmetto Chapel, 433 Shaw Dr. Drop-off 8 to 10 AM, assembly 10 AM to 2 PM."
          ),
          img(
            'shower-shaw-airmen.webp',
            800,
            571,
            'Team Shaw airmen with goodie bags from Shower Shaw'
          ),
          img(
            'shower-shaw-assembly.webp',
            800,
            600,
            'Volunteers and airmen assembling Shower Shaw goodie bags'
          ),
          img(
            'shower-shaw-volunteers.webp',
            800,
            378,
            'Volunteers with donated goods for Shower Shaw'
          ),
          img(
            'shower-shaw-thank-you.webp',
            800,
            800,
            'Shower Shaw with Cookies thank-you: 3,431 dozen cookies and 3,100 cards in total'
          ),
          img(
            'shower-shaw-2019-packing.webp',
            600,
            800,
            'A volunteer packing cookies for airmen in 2019'
          ),
          img('shower-shaw-loading.webp', 720, 960, 'Volunteers loading donated cookies'),
        ],
      },
    ],
  },
  {
    slug: 'board',
    title: 'Board and Governance',
    description:
      "The Shaw Spouses' Club Governing Board, open board positions, position descriptions and governing documents.",
    intro:
      'Have questions or want to learn more? Email the president, vice president or secretary, or let us know which board position interests you.',
    sections: [
      {
        id: 'openings',
        heading: '2026-2027 Board Openings',
        paragraphs: [
          'We have several positions open for interest forms for the new year. If you have had an interest in joining the board, now is your chance. Open positions: Parliamentarian, Social Media Manager, Ways and Means, and Golf Tournament Chair.',
        ],
        links: [
          {
            label: 'Tell us which position interests you',
            href: formMailto(CLUB_EMAILS.president, 'Board position interest', [
              'Name',
              'Email',
              'Which position interests you?',
            ]),
          },
          { label: `Email the president`, href: `mailto:${CLUB_EMAILS.president}` },
          { label: 'Email the vice president', href: `mailto:${CLUB_EMAILS.vicePresident}` },
          { label: 'Email the secretary', href: `mailto:${CLUB_EMAILS.secretary}` },
        ],
      },
      {
        id: 'governing-board',
        heading: '2026-2027 Governing Board',
        showBoard: true,
      },
      {
        id: 'position-descriptions',
        heading: 'Position Descriptions',
        paragraphs: ["Each position's duties, as written by the board."],
        links: [
          { label: 'President', href: '/docs/board/president.pdf' },
          { label: 'Vice President', href: '/docs/board/vice-president.pdf' },
          { label: 'Treasurer', href: '/docs/board/treasurer.pdf' },
          { label: 'Secretary', href: '/docs/board/secretary.pdf' },
          { label: 'Parliamentarian', href: '/docs/board/parliamentarian.pdf' },
          { label: 'Philanthropy', href: '/docs/board/philanthropy-charitable-chair.pdf' },
          { label: 'Membership', href: '/docs/board/membership.pdf' },
          { label: 'Social Media Manager', href: '/docs/board/social-media-manager.pdf' },
          { label: 'Public Relations', href: '/docs/board/public-relations.pdf' },
          { label: 'Social Events', href: '/docs/board/socials.pdf' },
          { label: 'Special Activities Coordinator', href: '/docs/board/special-activities.pdf' },
          { label: 'Ways and Means', href: '/docs/board/ways-means.pdf' },
          { label: 'Auction Chair', href: '/docs/board/auction.pdf' },
          { label: 'Scholarship', href: '/docs/board/scholarship.pdf' },
          { label: 'Cookie Drive Chair', href: '/docs/board/cookie-drive.pdf' },
          { label: 'Golf Tournament Chair', href: '/docs/board/golf-tournament-chair.pdf' },
        ],
      },
      {
        id: 'governance',
        heading: 'Governance',
        paragraphs: [
          'The club operates under its approved Constitution and Bylaws. A signed copy of the Constitution is on file with the Shaw AFB Force Support Squadron (FSS).',
        ],
        links: [
          { label: 'Constitution (PDF)', href: '/docs/ssc_approved_constitution.pdf' },
          { label: 'Bylaws (PDF)', href: '/docs/ssc_by-laws_2019_approved.pdf' },
          { label: 'Letter of Affirmation (PDF)', href: '/docs/letter_of_affirmation.pdf' },
        ],
      },
      {
        id: 'contact',
        heading: 'Contact Us',
        paragraphs: [
          'Please contact us if you have any questions about joining our club or partnering with us. Our mailing address is PO Box 52337, Shaw AFB, SC 29152.',
        ],
        links: [
          {
            label: 'Email the club',
            href: formMailto(CLUB_EMAILS.general, "Question for the Shaw Spouses' Club", [
              'Name',
              'Comment',
            ]),
          },
        ],
      },
    ],
  },
]

/**
 * Dated events, emitted as schema.org Event JSON-LD on the page that describes
 * them so search engines can show them as events. Only details printed on the
 * club's own flyers are used; nothing is filled in by guesswork. Times are
 * Eastern (Shaw AFB, SC).
 */
export type ClubEvent = {
  page: string
  name: string
  description: string
  startDate: string
  endDate?: string
  location: {
    name: string
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
  }
  isAccessibleForFree?: boolean
  /** In-page anchor of the section describing the event. */
  section: string
}

export const clubEvents: readonly ClubEvent[] = [
  {
    page: 'socials',
    section: 'upcoming',
    name: 'Movie Night on the Lawn',
    description:
      "The Shaw Spouses' Club November social: a Friendsgiving-themed movie night featuring The Devil Wears Prada 2. Free entry, RSVP requested.",
    startDate: '2026-11-12T18:00:00-05:00',
    location: {
      name: 'The Cabin at Alice Drive Baptist Church',
      streetAddress: '1305 Loring Mill Road',
    },
    isAccessibleForFree: true,
  },
  {
    page: 'giving',
    section: 'shower-shaw',
    name: '2025 Dorm Airmen Cookie Drive',
    description:
      "Shower Shaw with Cookies, hosted by the Shaw Spouses' Club: drop-off 8 to 10 AM, assembly 10 AM to 2 PM.",
    startDate: '2025-12-09T08:00:00-05:00',
    endDate: '2025-12-09T14:00:00-05:00',
    location: {
      name: 'Shaw AFB Palmetto Chapel',
      streetAddress: '433 Shaw Dr.',
      addressLocality: 'Shaw AFB',
      addressRegion: 'SC',
    },
  },
  {
    page: 'auction',
    section: 'annual-auction',
    name: "Shaw Spouses' Club Annual Charity Auction",
    description:
      'Jungle Safari themed silent and live auction raising grants and scholarships for military families and the Shaw community. Doors open at 5 PM.',
    startDate: '2027-02-20T17:00:00-05:00',
    location: { name: 'The Magnolia Club' },
  },
]

/** The page's sections that are still current at build time (see `until`). */
export function currentSections(page: ClubPage, now: Date = new Date()): ClubSection[] {
  return page.sections.filter((s) => !s.until || Date.parse(s.until) >= now.getTime())
}

export function clubPage(slug: string): ClubPage {
  const page = clubPages.find((p) => p.slug === slug)
  if (!page) throw new Error(`No club page with slug "${slug}"`)
  return page
}
