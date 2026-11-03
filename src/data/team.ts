// Team member data
// This file imports team member data from JSON files in ./team/ directory
// To edit team members, edit the JSON files directly in src/data/team/.
// Each member needs: name and role. linkedinUrl is optional — when present the
// member's card links to it. There are no photos: cards render an initials
// monogram, so a forking charity never has to source or host portrait images.

export type TeamMember = {
  /** Full name; the first + last initials seed the avatar monogram. */
  name: string
  /** Role or title, e.g. "Founder", "Program Lead", "Treasurer". */
  role: string
  /**
   * Optional LinkedIn profile URL. Must be `https://` on linkedin.com (or a
   * subdomain) to render as a link — TeamMemberCard's `safeLinkedInUrl()`
   * ignores any other host or scheme, so the card shows without a link.
   */
  linkedinUrl?: string
}

// The club's 2026-2027 Governing Board, as published on the Board page of
// shawspousesclub.com. Open positions (Parliamentarian, Social Media Manager,
// Ways and Means, Golf Tournament Chair) are left out.
export const team: TeamMember[] = [
  { name: 'Nancy Galas', role: 'President' },
  { name: 'Jennifer Craven', role: 'Vice President' },
  { name: 'Kelsie Perez', role: 'Treasurer' },
  { name: 'Angel McPeek', role: 'Secretary' },
  { name: 'Kristin Walker', role: 'Honorary Advisor' },
  { name: 'Lauren Getz', role: 'Honorary Advisor' },
  { name: 'Thomasena Days', role: 'Philanthropy' },
  { name: 'Yasmin Hoffman', role: 'Membership' },
  { name: 'Cristi Ryan', role: 'Public Relations and Scholarship' },
  { name: 'Eleana Lynch', role: 'Social Events' },
  { name: 'Sarah Hughes', role: 'Hospitality' },
  { name: 'Eboni Montilus', role: 'Special Activities Coordinator' },
  { name: 'Cleyardis McDonald-Amaker', role: 'Member At Large' },
  { name: 'April Johns', role: 'Auction Chair' },
  { name: 'Angela Menghini', role: 'Cookie Drive Chair' },
  { name: 'Alysha Murphy', role: 'Retiree Liaison' },
]

// `team` is assembled from a fixed list of JSON imports, so its length never
// drops to 0 when a fork blanks those JSON files (rather than deleting entries).
// `configuredTeam` is the subset with the required `name` populated — the Team
// section and its Header/Footer nav link all key visibility off this list so
// they self-hide together instead of rendering empty cards / dead anchors.
export const configuredTeam: TeamMember[] = team.filter(
  (member) => typeof member.name === 'string' && member.name.trim().length > 0
)
