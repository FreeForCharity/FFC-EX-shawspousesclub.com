import React from 'react'
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
      <Hero />
      <ClubWelcome />
      <Mission />
      <Results2023 />
      <Testimonials />
      <Events />
      <EndowmentFeatures />
      <FrequentlyAskedQuestions />
    </div>
  )
}

export default index
