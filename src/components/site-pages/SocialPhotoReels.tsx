'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import galleries from '@/data/social-galleries.json'
import { assetPath } from '@/lib/assetPath'

type Gallery = (typeof galleries)[number]

function PhotoReel({ gallery }: { gallery: Gallery }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const photo = gallery.photos[index]
  const total = gallery.photos.length

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % total), 5000)
    return () => window.clearInterval(timer)
  }, [playing, total])

  const advance = (step: number) => {
    setPlaying(false)
    setIndex((current) => (current + step + total) % total)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#D9E5FA] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <h3 className="text-xl font-semibold text-[#234F93]">{gallery.year}</h3>
        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          aria-pressed={playing}
          className="min-h-11 rounded-full border border-[#4F83E5] px-4 py-2 text-sm font-semibold text-[#234F93] hover:bg-[#EAF0FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F93]"
        >
          {playing ? 'Pause slideshow' : 'Play slideshow'}
        </button>
      </div>
      <a
        href={assetPath(photo.src)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size photo ${index + 1} from ${gallery.year} (new tab)`}
        className="relative block aspect-[4/3] bg-[#EAF0FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#234F93]"
      >
        <Image
          src={assetPath(photo.src)}
          alt={photo.caption || `Shaw Spouses’ Club gathering, ${gallery.year}, photo ${index + 1}`}
          fill
          sizes="(max-width: 896px) 90vw, 800px"
          className="object-contain"
        />
      </a>
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => advance(-1)}
          aria-label={`Previous photo in ${gallery.year}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4F83E5] text-2xl text-white hover:bg-[#376BCD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F93]"
        >
          ‹
        </button>
        <div
          className="min-w-0 flex-1 text-center"
          aria-live={playing ? 'off' : 'polite'}
          aria-atomic="true"
        >
          {photo.caption && <p className="font-semibold text-[#234F93]">{photo.caption}</p>}
          <p className="mt-1 text-sm text-[#26394D]">
            Photo {index + 1} of {total}
          </p>
        </div>
        <button
          type="button"
          onClick={() => advance(1)}
          aria-label={`Next photo in ${gallery.year}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4F83E5] text-2xl text-white hover:bg-[#376BCD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F93]"
        >
          ›
        </button>
      </div>
      <div
        aria-label={`Choose a photo from ${gallery.year}`}
        className="flex gap-2 overflow-x-auto border-t border-[#D9E5FA] bg-[#F4F7FF] p-3"
      >
        {gallery.photos.map((item, itemIndex) => (
          <button
            key={`${item.src}-${itemIndex}`}
            type="button"
            onClick={() => {
              setPlaying(false)
              setIndex(itemIndex)
            }}
            aria-label={`Show photo ${itemIndex + 1}${item.caption ? `: ${item.caption}` : ''}`}
            aria-pressed={index === itemIndex}
            className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F93] ${index === itemIndex ? 'border-[#234F93]' : 'border-transparent hover:border-[#4F83E5]'}`}
          >
            <Image
              src={assetPath(item.src)}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function SocialPhotoReels({
  collections = galleries,
  title = 'A look back at our socials',
  intro = 'Browse memories from past club years. Choose a year, explore the photos, or press play to enjoy the reel.',
  headingId = 'past-socials-heading',
}: {
  collections?: Gallery[]
  title?: string
  intro?: string
  headingId?: string
}) {
  const [year, setYear] = useState(collections[0].year)
  const gallery = collections.find((item) => item.year === year)!
  return (
    <section aria-labelledby={headingId} className="mt-12 border-t border-[#D9E5FA] pt-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#376BCD]">
        Good times, great company
      </p>
      <h2 id={headingId} className="mb-3 text-3xl font-semibold text-[#234F93]">
        {title}
      </h2>
      <p className="mb-6 leading-7 text-[#26394D]">{intro}</p>
      <div aria-label="Choose a photo collection" className="mb-6 flex flex-wrap gap-2">
        {collections.map((item) => (
          <button
            key={item.year}
            type="button"
            onClick={() => setYear(item.year)}
            aria-pressed={year === item.year}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F93] ${year === item.year ? 'border-[#234F93] bg-[#234F93] text-white' : 'border-[#D9E5FA] bg-[#F4F7FF] text-[#234F93] hover:bg-[#EAF0FF]'}`}
          >
            {item.year}
          </button>
        ))}
      </div>
      <PhotoReel key={year} gallery={gallery} />
    </section>
  )
}
