import { isPending, isSupportingOrgSite, siteConfig } from '@/lib/site.config'
import { configuredTeam } from '@/data/team'
import { programs } from '@/data/programs'
import { faqs } from '@/data/faqs'

/**
 * Self-hide predicates for the home-page sections. Endowment and FFC's own
 * Programs copy are about the supporting organization itself rather than about
 * the site's own charity; the FAQ is data-driven (src/data/faqs.ts).
 *
 * Each section and every link to its #anchor (header, footer, hero) key off the
 * SAME predicate, so a hidden section never leaves a dead link behind.
 *
 * `sections.show*` stays the per-site switch. On top of it, Endowment and
 * FFC's Programs block render only on the supporting organization's own site:
 * their copy states the supporter's programs and endowment in the first person
 * ("our domain program"), so on a charity's site they would make the
 * supporter's claims in the charity's name. A provisioned charity site gets
 * that for free — setting `siteConfig.name` is enough — instead of depending on
 * someone remembering to flip the flags.
 */

/**
 * The Programs section: FFC's own three-program (Domains / Hosting /
 * Consulting) block on the supporting organization's site, and the charity's
 * own programs from src/data/programs.ts everywhere else.
 */
export function programsSectionVisible(): boolean {
  if (!siteConfig.sections.showPrograms) return false
  return isSupportingOrgSite() || programs.length > 0
}

/** FFC Endowment feature cards. */
export function endowmentSectionVisible(): boolean {
  return siteConfig.sections.showEndowment && isSupportingOrgSite()
}

/**
 * The FAQ section, its #faq nav links and its FAQPage JSON-LD. The questions
 * are this site's own (src/data/faqs.ts), so the section shows whenever there
 * are any; empty the list to hide it.
 */
export function faqSectionVisible(): boolean {
  return faqs.length > 0
}

/**
 * The Team section and its #team nav links: shown when at least one member has
 * a populated name, or while the team is pending (the section then renders the
 * "awaiting information" placeholder instead of cards — see `PendingField`).
 */
export function teamSectionVisible(): boolean {
  return configuredTeam.length > 0 || isPending('team')
}
