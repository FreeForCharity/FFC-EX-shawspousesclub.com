import { pageMetadata } from '@/lib/page-metadata'
import ClubProgramPage from '@/components/site-pages/ClubProgramPage'
import SocialPhotoReels from '@/components/site-pages/SocialPhotoReels'
import Image from 'next/image'
import { assetPath } from '@/lib/assetPath'

export const metadata = pageMetadata({
  title: 'Monthly Socials',
  description: 'Find upcoming Shaw Spouses’ Club socials and browse photos from past events.',
  canonical: '/socials',
})

export default function SocialsPage() {
  return (
    <ClubProgramPage title="Monthly Socials">
      <section
        aria-labelledby="movie-night-heading"
        className="mt-10 border-t border-[#D9E5FA] pt-8"
      >
        <h2 id="movie-night-heading" className="mb-4 text-2xl font-semibold text-[#234F93]">
          Movie Night on the Lawn
        </h2>
        <div className="mb-6 space-y-3 leading-7 text-[#26394D]">
          <p>
            <strong>November 12 at 6 PM · Free entry</strong>
          </p>
          <p>
            Join us for our Friendsgiving theme, Flannel and Friends, featuring The Devil Wears
            Prada 2. Bring your blankets and cozy clothes. Snacks and cider will be provided.
          </p>
          <p>
            <strong>Location:</strong> The Cabin at Alice Drive Baptist Church, 1305 Loring Mill
            Road.
          </p>
          <p>RSVP requested. Come rain or shine; we have a backup plan!</p>
        </div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeY7x2tBBBQ3t-HsReylDhLz4POBIcDmepmorWUco-y4bLeyg/viewform"
          className="mb-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#2F5FB8] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#376BCD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F93]"
        >
          RSVP for Movie Night
        </a>
        <a
          href={assetPath('/Images/movie-on-the-lawn.webp')}
          aria-label="Open the full-size Movie Night on the Lawn flyer"
        >
          <Image
            src={assetPath('/Images/movie-on-the-lawn.webp')}
            alt="Shaw Spouses’ Club Movie Night on the Lawn flyer. November 12, 6 PM, free entry at The Cabin at Alice Drive Baptist Church, 1305 Loring Mill Road. RSVP QR code included."
            width={1545}
            height={2000}
            sizes="(max-width: 896px) 90vw, 800px"
            className="h-auto w-full rounded-xl"
          />
        </a>
      </section>
      <SocialPhotoReels />
    </ClubProgramPage>
  )
}
