import React from 'react'
import { render, screen } from '@testing-library/react'
import FAQ from '../../../src/components/home-page/FrequentlyAskedQuestions'
import { faqs } from '@/data/faqs'
import { asCharitySite, restoreSiteConfig } from '../../helpers/site-identity'

describe('FrequentlyAskedQuestions', () => {
  beforeEach(asCharitySite)
  afterEach(restoreSiteConfig)

  it('renders the section heading', () => {
    render(<FAQ />)
    expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument()
  })

  it('mounts under the #faq section landmark id', () => {
    const { container } = render(<FAQ />)
    expect(container.querySelector('#faq')).not.toBeNull()
  })

  it('renders every question in src/data/faqs.ts, in order', () => {
    render(<FAQ />)
    const titles = screen.getAllByRole('button').map((b) => b.textContent?.trim())
    expect(titles).toEqual(faqs.map((f) => f.question))
  })

  it('splits an answer into paragraphs on blank lines', () => {
    const multi = faqs.find((f) => /\n\s*\n/.test(f.answer))!
    const { container } = render(<FAQ />)
    const firstPara = multi.answer.split(/\n\s*\n/)[0]
    const p = Array.from(container.querySelectorAll('p')).find((el) => el.textContent === firstPara)
    expect(p).toBeDefined()
  })
})

describe('faqs data', () => {
  it('carries none of the template sample FAQ', () => {
    const all = faqs.map((f) => f.question + f.answer).join(' ')
    expect(all).not.toMatch(/Are you really a charity|46-2471893|domain name/i)
  })
})
