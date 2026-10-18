import React from 'react'
import { render, screen } from '@testing-library/react'

// A charity that lists its own programs (src/data/programs.ts) gets a Programs
// section built from them, and the #programs links that go with it. It must
// never show the supporting organization's program copy. A charity with no
// programs is covered by section-visibility.test.tsx and nav-visibility.test.tsx.
jest.mock('@/data/programs', () => ({
  programsIntro: 'Sample intro for the programs section.',
  programsDisclaimer: 'Sample disclaimer line.',
  programs: [
    {
      title: 'Sample Program One',
      paragraphs: ['First paragraph of program one.'],
      points: ['A bullet for program one.'],
    },
    { title: 'Sample Program Two', paragraphs: ['Only paragraph of program two.'] },
  ],
}))

import { siteConfig } from '@/lib/site.config'
import OurPrograms from '@/components/home-page/Our-Programs'
import Hero from '@/components/home-page/Hero'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { asCharitySite, asSupporterSite, restoreSiteConfig } from '../../helpers/site-identity'

describe("a charity's own programs", () => {
  beforeEach(() => asCharitySite())
  afterEach(restoreSiteConfig)

  it('renders each program, the intro and the disclaimer under #programs', () => {
    const { container } = render(<OurPrograms />)
    expect(container.querySelector('#programs')).not.toBeNull()
    expect(screen.getByRole('heading', { level: 2, name: 'Our Programs' })).toBeInTheDocument()
    expect(screen.getByText('Sample Program One')).toBeInTheDocument()
    expect(screen.getByText('Sample Program Two')).toBeInTheDocument()
    expect(screen.getByText('First paragraph of program one.')).toBeInTheDocument()
    expect(screen.getByText('A bullet for program one.')).toBeInTheDocument()
    expect(screen.getByText('Sample intro for the programs section.')).toBeInTheDocument()
    expect(screen.getByText('Sample disclaimer line.')).toBeInTheDocument()
  })

  it("never shows the supporting organization's program copy", () => {
    const { container } = render(<OurPrograms />)
    expect(container.textContent).not.toMatch(/FFC Domains|Free For Charity|Ready to Get Started/)
  })

  it('links to the section from the header, footer and hero', () => {
    render(
      <>
        <Header />
        <Hero />
        <Footer />
      </>
    )
    expect(screen.getAllByText('Programs').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Our Programs' })).toHaveAttribute('href', '#programs')
  })

  it('hides the section when showPrograms is off', () => {
    siteConfig.sections.showPrograms = false
    const { container } = render(<OurPrograms />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe("the supporting organization's own site", () => {
  beforeEach(asSupporterSite)
  afterEach(restoreSiteConfig)

  it('keeps its built-in programs rather than the charity data', () => {
    render(<OurPrograms />)
    expect(screen.getByText('FFC Domains')).toBeInTheDocument()
    expect(screen.queryByText('Sample Program One')).not.toBeInTheDocument()
  })
})
