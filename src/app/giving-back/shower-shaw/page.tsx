import { pageMetadata } from '@/lib/page-metadata'
import ClubProgramPage from '@/components/site-pages/ClubProgramPage'
import PhotoReels from '@/components/site-pages/SocialPhotoReels'
import cookieDriveGalleries from '@/data/cookie-drive-galleries.json'

export const metadata = pageMetadata({
  title: 'Shower Shaw',
  description:
    'See how the Shower Shaw community effort supports the Shaw Spouses’ Club Annual Cookie Drive.',
  canonical: '/giving-back/shower-shaw',
})

export default function ShowerShawPage() {
  return (
    <ClubProgramPage title="Shower Shaw">
      <PhotoReels
        collections={cookieDriveGalleries}
        title="Shaw Spouses' Club's Annual Cookie Drive"
        headingId="cookie-drive-photos-heading"
        intro="Celebrate the volunteers, homemade treats, and community spirit behind the Shaw Spouses’ Club’s Annual Cookie Drive. The club organizes the drive with support from the wider community, which contributes goodies and donations through Shower Shaw. Choose a year to explore photos from this Shaw tradition."
      />
    </ClubProgramPage>
  )
}
