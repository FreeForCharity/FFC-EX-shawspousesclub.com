export type Faq = { question: string; answer: string }

// The club's own frequently asked questions, rendered on the home page (#faq)
// and published as FAQPage structured data (src/components/seo/FaqSchema.tsx).
// Every answer restates something the club already publishes on its own pages,
// so keep this list in step with src/data/club-pages.ts when those change.
// Answers are plain text; a blank line starts a new paragraph.
export const faqs: Faq[] = [
  {
    question: "Who can join the Shaw Spouses' Club?",
    answer:
      'The club is open to spouses of active duty military members (enlisted and officer ranks, all branches), spouses of Reserve or National Guard members, and spouses of retired military members.\n\nWe also welcome spouses of DoD employees, widowed spouses, adult dependents (18 or older) who are DoD ID holders, and unmarried active duty service members or mil-to-mil spouses.',
  },
  {
    question: 'How much are membership dues, and how do I join?',
    answer:
      'Annual dues are $30 for the 2026-2027 year. You can join or renew online from the Membership page.',
  },
  {
    question: 'Can I try the club before I join?',
    answer:
      'Yes. Eligible prospective members can attend one SSC event, such as a monthly membership social, as a guest before paying dues.',
  },
  {
    question: 'What does the club do?',
    answer:
      'Members connect through monthly membership socials and special activity groups (Book Club, Cookbook Club, Craft Club, Golf, Lunch Bunch, Pickleball and Wine Club). The club gives back through annual scholarships and grants to organizations that serve Shaw AFB and the local community, funded by fundraisers such as the Annual Charity Auction.',
  },
  {
    question: 'Who is eligible for an SSC scholarship?',
    answer:
      'Applicants must be a military dependent or service member, and must be an SSC member or have a family member who is. There are two applications: one for current high school seniors, and one for military spouses, service members and dependents planning to attend or already enrolled in college.\n\nFor the 2026-2027 school year, membership had to be in place by 31 December 2025.',
  },
  {
    question: 'When are scholarship applications open?',
    answer:
      'For the 2026-2027 school year, applications opened 15 January 2026 and closed 15 March 2026, and recipients have been notified. Dates for the next cycle will be posted on the Scholarships page.',
  },
  {
    question: 'Can my organization request a donation from the club?',
    answer:
      'Nonprofits, schools and military organizations that serve Shaw AFB or the local community can apply with the Charitable Funds Donation Request Form on the Charitable Giving page. Funds cannot go to individuals, for-profit businesses or political causes.\n\nThe board reviews requests at its monthly meeting on the first Tuesday of each month from August to May. Submit at least 10 days before the meeting.',
  },
  {
    question: 'How can I support the club if I am not a member?',
    answer:
      "You can donate online, attend or sponsor the Annual Charity Auction, or help with the Shower Shaw cookie drive. The money raised funds the club's scholarships and community grants.",
  },
  {
    question: 'How do I contact the club?',
    answer:
      'Email publicrelations.ShawSC@gmail.com, or write to Shaw Spouses Club, PO Box 52337, Shaw AFB, SC 29152. Board members can also be reached directly from the Board page.',
  },
]
