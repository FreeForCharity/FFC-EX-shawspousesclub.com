import React from 'react'
import Image from 'next/image'
import { assetPath } from '@/lib/assetPath'
import { cardDescription, isSupportingOrgSite, siteConfig } from '@/lib/site.config'
import { programsSectionVisible } from '@/lib/section-visibility'

const CharityHeroBackground = () => {
  // The strapline is the supporting organization's own positioning; any other
  // site leads with its own description instead.
  const strapline = isSupportingOrgSite()
    ? 'Connecting Students, Professionals, & Businesses with Charities in Need'
    : cardDescription()
  // A charity's own primary ask (e.g. membership) leads when configured.
  const primary = isSupportingOrgSite() ? undefined : siteConfig.heroPrimaryCta
  return (
    <div id="hero" className="relative w-full pb-[100px] overflow-hidden">
      {/* 1. Base Blue Layer */}
      <div className="absolute inset-0 bg-[#0b6cb8]" />
      {/* 2. ULTRA-THIN White Diagonal Strip - HALF HEIGHT */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: 'polygon(0% 108%, 100% 32%, 100% 35%, 0% 111%)',
        }}
      />

      {/* 3. Orange Bottom-Right Section - Starts exactly where white ends */}
      <div
        className="absolute inset-0 bg-[#3570c8]"
        style={{
          clipPath: 'polygon(0% 111%, 100% 35%, 100% 100%, 0% 100%)',
        }}
      />

      <div className="hero-container flex flex-col lg:flex-row gap-[40px] lg:gap-[0px] items-center justify-between relative z-10 text-white pt-[130px] w-[90%] mx-auto max-w-[1280px] lg:px-[20px]">
        <div className="w-full lg:w-[565px]">
          <h1 className="text-[50px] lg:text-[60px] font-[500] text-[#FFFFFF] leading-[120%] mb-[20px] faustina-font">
            Welcome to <br /> {siteConfig.name}
          </h1>
          <p className="text-[24px] font-[400] leading-[120%] text-[#FFFFFF] mb-[20px] lato-font">
            {strapline}
          </p>
          <a
            href={primary ? assetPath(primary.href) : '#volunteer'}
            className="top-[378px] w-[300px] lg:w-[351px] h-[54px] opacity-100 rounded-[27px] px-[32px] py-[18px] flex items-center justify-center gap-[10px] bg-[#FFFFFF] text-[#113563] text-[20px] font-[400] leading-[100%] mb-[10px] whitespace-nowrap lato-font"
          >
            {primary ? primary.label : 'Volunteer'}
          </a>
          <div className="flex flex-wrap gap-[5px]">
            <a
              href="#donate"
              className="top-[442px] w-[130px] lg:w-[173px] h-[54px] opacity-100 rounded-[27px] px-[32px] py-[18px] flex items-center justify-center gap-[10px] bg-[#FFFFFF] text-[#113563] text-[20px] font-[400] leading-[100%] whitespace-nowrap lato-font"
            >
              Donate
            </a>
            {primary && (
              <a
                href="#volunteer"
                className="top-[442px] w-[150px] lg:w-[173px] h-[54px] opacity-100 rounded-[27px] px-[32px] py-[18px] flex items-center justify-center gap-[10px] bg-[#FFFFFF] text-[#113563] text-[20px] font-[400] leading-[100%] whitespace-nowrap lato-font"
              >
                Volunteer
              </a>
            )}
            {programsSectionVisible() && (
              <a
                href="#programs"
                className="top-[442px] w-[173px] h-[54px] opacity-100 rounded-[27px] px-[32px] py-[18px] flex items-center justify-center gap-[10px] bg-[#FFFFFF] text-[#113563] text-[20px] font-[400] leading-[100%] whitespace-nowrap lato-font"
              >
                Our Programs
              </a>
            )}
          </div>
        </div>

        {/* Fixed right side image section */}
        <div className="relative w-full max-w-[445px] aspect-square bg-white rounded-full p-3 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={assetPath('/Images/figma-hero-img.webp')}
              alt={`${siteConfig.name} logo`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 445px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharityHeroBackground
