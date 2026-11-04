import React from 'react'
import type { EventSource } from '@/lib/events/types'
import { SOURCE_LABELS } from '@/lib/events/types'

// Darker text on tinted background — verified ≥ 4.5:1 against the 50-tint bg
// per WCAG 2.2 AA for small text.
const SOURCE_STYLES: Record<EventSource, string> = {
  google: 'bg-[#F4F7FF] text-[#234F93] border-[#234F93]/40',
  microsoft: 'bg-[#F4F7FF] text-[#234F93] border-[#234F93]/40',
  facebook: 'bg-[#F4F7FF] text-[#234F93] border-[#234F93]/40',
}

export default function SourceBadge({ source }: { source: EventSource }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold lato-font ${SOURCE_STYLES[source]}`}
    >
      {SOURCE_LABELS[source]}
    </span>
  )
}
