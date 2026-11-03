'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/assetPath'

/** YouTube video ids are 11 characters of [A-Za-z0-9_-]. */
export function isYouTubeId(id: string): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(id)
}

/**
 * Click-to-play YouTube embed. Until the visitor presses play, the page shows
 * a thumbnail hosted on this site (public/Images/club/video-<id>.webp) and
 * makes no request to YouTube or Google at all: no cookies, no third-party
 * scripts, and no cost to page load. Pressing play swaps in the
 * youtube-nocookie player (which the CSP already allows) and starts it.
 */
export default function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  if (!isYouTubeId(id)) return null
  return (
    <div className="mx-auto mt-[24px] w-full max-w-[800px] aspect-video">
      {playing ? (
        <iframe
          className="h-full w-full rounded-lg shadow-lg"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative block h-full w-full overflow-hidden rounded-lg shadow-lg"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={assetPath(`/Images/club/video-${id}.webp`)}
            alt=""
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            className="object-cover"
            loading="lazy"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-[68px] w-[96px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[18px] bg-[#0b6cb8] group-hover:bg-[#08528f]"
          >
            <span className="ml-[6px] h-0 w-0 border-y-[14px] border-l-[24px] border-y-transparent border-l-white" />
          </span>
        </button>
      )}
    </div>
  )
}
