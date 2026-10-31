import React from 'react'
import { cardDescription, isSupportingOrgSite, siteConfig } from '@/lib/site.config'
import { programsSectionVisible } from '@/lib/section-visibility'

const CharityHeroBackground = () => {
  // The strapline is the supporting organization's own positioning; any other
  // site leads with its own description instead.
  const strapline = isSupportingOrgSite()
    ? 'Connecting Students, Professionals, & Businesses with Charities in Need'
    : cardDescription()
  return (
    <section id="hero" className="w-full bg-[#f4f7ff]">
      <div className="hero-container mx-auto flex w-[90%] max-w-[1280px] flex-col items-start py-[72px] text-[#26394d] lg:px-[20px]">
        <div className="w-full max-w-[760px]">
          <h1 className="faustina-font mb-[20px] text-[50px] font-[500] leading-[120%] text-[#234f93] lg:text-[60px]">
            Welcome to <br /> {siteConfig.name}
          </h1>
          <p className="lato-font mb-[20px] text-[24px] font-[400] leading-[120%]">{strapline}</p>
          <div className="flex gap-[5px]">
            <a
              href="#donate"
              className="lato-font flex h-[54px] w-[130px] items-center justify-center gap-[10px] whitespace-nowrap rounded-[27px] bg-[#4f83e5] px-[24px] py-[18px] text-[20px] font-[400] leading-[100%] text-white hover:bg-[#376bcd] lg:w-[173px]"
            >
              Donate
            </a>
            {programsSectionVisible() && (
              <a
                href="#programs"
                className="lato-font flex h-[54px] w-[173px] items-center justify-center gap-[10px] whitespace-nowrap rounded-[27px] bg-[#4f83e5] px-[24px] py-[18px] text-[20px] font-[400] leading-[100%] text-white hover:bg-[#376bcd]"
              >
                Our Programs
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CharityHeroBackground
