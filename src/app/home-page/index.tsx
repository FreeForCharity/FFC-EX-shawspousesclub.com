import React from 'react'
import { isSupportingOrgSite } from '@/lib/site.config'
import AnnouncementBanner from '@/components/home-page/AnnouncementBanner'
import Hero from '@/components/home-page/Hero'
import ClubWelcome from '@/components/home-page/ClubWelcome'
import Mission from '@/components/home-page/Mission'
import EndowmentFeatures from '@/components/home-page/Endowment-Features'
import Results2023 from '@/components/home-page/Results-2023'
import Testimonials from '@/components/home-page/Testimonials'
import FrequentlyAskedQuestions from '@/components/home-page/FrequentlyAskedQuestions'
import Events from '@/components/home-page/Events'

const index = () => {
  return (
    <div>
      {!isSupportingOrgSite() && <AnnouncementBanner />}
      {isSupportingOrgSite() && <Hero />}
      <ClubWelcome />
      {isSupportingOrgSite() && <Mission />}
      <Results2023 />
      <Testimonials />
      <Events />
      <EndowmentFeatures />
      <FrequentlyAskedQuestions />
    </div>
  )
}

export default index
