import { pageMetadata } from '@/lib/page-metadata'
import ClubProgramPage from '@/components/site-pages/ClubProgramPage'
import PhotoReels from '@/components/site-pages/SocialPhotoReels'
import cookieDriveGalleries from '@/data/cookie-drive-galleries.json'
import { assetPath } from '@/lib/assetPath'

export const metadata = pageMetadata({
  title: 'Shower Shaw',
  description:
    'See how the Shower Shaw community effort supports the Shaw Spouses’ Club Annual Cookie Drive.',
  canonical: '/giving-back/shower-shaw',
})

export default function ShowerShawPage() {
  return (
    <ClubProgramPage title="Shower Shaw">
      <section className="mt-8" aria-labelledby="christmas-cookie-drive-heading">
        <h2
          id="christmas-cookie-drive-heading"
          className="faustina-font mb-4 text-2xl font-semibold text-[#234F93] sm:text-3xl"
        >
          2026 Christmas Cookie Drive
        </h2>
        <p className="mb-4 text-base leading-7 text-[#26394D] sm:text-lg">
          Bring your favorite homemade cookies and help our Airmen enjoy a sweet holiday season!
          Bakers and volunteers are needed to repackage cookies for delivery at Palmetto Chapel, 433
          Shaw Dr, Shaw AFB.
        </p>
        <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-7 text-[#26394D] sm:text-lg">
          <li>Set up on Monday, December 14, from 5–7 pm.</li>
          <li>Cookie drop-off and repackaging on Tuesday, December 15, from 8 am–2 pm.</li>
        </ul>
        <p className="mb-4 text-base leading-7 text-[#26394D]">
          Scan the baker or volunteer signup QR code on the flyer to participate.
        </p>
        <a
          href={assetPath('/Images/christmas-cookie-drive-2026.webp')}
          className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#234F93]"
          aria-label="Open the full-size Christmas Cookie Drive flyer with baker and volunteer signup QR codes"
        >
          <img
            src={assetPath('/Images/christmas-cookie-drive-2026.webp')}
            alt="Christmas Cookie Drive flyer with baker and volunteer signup QR codes. Setup December 14, 5–7 pm. Drop-off and repackaging December 15, 8 am–2 pm, at Palmetto Chapel, 433 Shaw Dr, Shaw AFB."
            width={982}
            height={1271}
            className="h-auto w-full rounded-lg"
          />
        </a>
      </section>
      <PhotoReels
        collections={cookieDriveGalleries}
        title="Shaw Spouses' Club's Annual Cookie Drive"
        headingId="cookie-drive-photos-heading"
        intro="Celebrate the volunteers, homemade treats, and community spirit behind the Shaw Spouses’ Club’s Annual Cookie Drive. The club organizes the drive with support from the wider community, which contributes goodies and donations through Shower Shaw. Choose a year to explore photos from this Shaw tradition."
      />
    </ClubProgramPage>
  )
}
