import React from 'react'
import TeamMemberCard from '@/components/ui/TeamMemberCard'
import PendingNote from '@/components/ui/PendingNote'
import { configuredTeam } from '@/data/team'
import { teamSectionVisible } from '@/lib/section-visibility'
import { siteConfig } from '@/lib/site.config'
import { assetPath } from '@/lib/assetPath'

// Team members are sourced from src/data/team/*.json (aggregated in
// src/data/team.ts). To change the team, edit those JSON files — no need to
// touch this component. Each card renders an initials monogram (no photos) and
// links to the member's LinkedIn when one is provided. The first three members
// render in the top row and the remaining members in a second row.
/**
 * The section heading, "The <name> Team". A name that already starts with the
 * article keeps its own ("The Brain Injury Research Foundation Team", not
 * "The The Brain Injury ... Team"). Case-insensitive, and only the whole word:
 * "Theatre Guild" still becomes "The Theatre Guild Team".
 */
export function teamHeading(name: string): string {
  const trimmed = name.trim()
  return /^the\s/i.test(trimmed) ? `${trimmed} Team` : `The ${trimmed} Team`
}

const index = () => {
  // Self-hide when no member is configured. `team` is a fixed list of JSON
  // imports, so a fork that blanks those files (rather than removing entries)
  // leaves team.length non-zero; configuredTeam keeps only members with a
  // populated name, so the section renders nothing instead of empty cards.
  // A pending team (siteConfig.pending includes 'team') renders the heading and
  // a visible "awaiting information" placeholder instead — see PendingField.
  if (!teamSectionVisible()) return null

  // A preview shows the first `count` members (the officers) in one row and
  // links to the page with the full roster; without one, everyone is shown.
  const preview = siteConfig.teamPreview
  const previewing = !!preview && preview.count > 0 && configuredTeam.length > preview.count
  const shown = previewing ? configuredTeam.slice(0, preview.count) : configuredTeam
  const topRow = previewing ? shown : shown.slice(0, 3)
  const bottomRow = previewing ? [] : shown.slice(3)
  const topGrid = previewing
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch justify-center mb-[50px] gap-[30px]'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  items-stretch justify-center mb-[50px] gap-[30px]'

  return (
    <div id="team" className="py-[50px]">
      <h2 className="font-[400] text-[40px] lg:text-[48px]  tracking-[0] text-center mx-auto mb-[50px] faustina-font">
        {teamHeading(siteConfig.name)}
      </h2>

      {configuredTeam.length === 0 && (
        <PendingNote className="text-center text-[20px] text-gray-700 lato-font" />
      )}
      <div className="w-[90%] mx-auto py-[40px]">
        <div className={topGrid}>
          {topRow.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              linkedinUrl={member.linkedinUrl}
            />
          ))}
        </div>
        {bottomRow.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center mt-[40px] gap-[30px]">
            {bottomRow.map((member) => (
              <TeamMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                linkedinUrl={member.linkedinUrl}
              />
            ))}
          </div>
        )}
        {previewing && preview && (
          <div className="text-center">
            <a
              href={assetPath(preview.href)}
              className="inline-flex items-center justify-center rounded-[27px] px-[32px] py-[14px] bg-[#0b6cb8] text-white text-[20px] font-[400] lato-font hover:bg-[#08528f]"
            >
              {preview.label}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default index
