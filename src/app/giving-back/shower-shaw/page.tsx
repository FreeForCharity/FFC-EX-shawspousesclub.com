import ClubProgramPage from '@/components/site-pages/ClubProgramPage'
import PhotoReels from '@/components/site-pages/SocialPhotoReels'
import cookieDriveGalleries from '@/data/cookie-drive-galleries.json'

export default function ShowerShawPage() {
  return (
    <ClubProgramPage title="Shower Shaw">
      <PhotoReels
        collections={cookieDriveGalleries}
        title="Annual Cookie Drive Memories"
        headingId="cookie-drive-photos-heading"
        intro="Celebrating the volunteers, homemade treats, and community spirit behind the Annual Cookie Drive. Choose a year to explore photos from this Shaw tradition."
      />
    </ClubProgramPage>
  )
}
