import React from 'react'
import FrequentlyAskedQuestions from '@/components/ui/Frequently-Asked-Questions'
import { faqs } from '@/data/faqs'
import { faqSectionVisible } from '@/lib/section-visibility'

/**
 * The home-page FAQ, rendered from src/data/faqs.ts so that the visible
 * questions and the FAQPage JSON-LD (FaqSchema) always come from one list.
 * A blank line in an answer starts a new paragraph.
 */
const index = () => {
  if (!faqSectionVisible()) return null

  return (
    <div id="faq" className="py-[50px]">
      <div className="w-[90%] mx-auto lg:px-[20px]">
        <h2 className="font-[400] text-[40px] lg:text-[48px]  tracking-[0] text-center mx-auto mb-[50px] faustina-font">
          Frequently Asked Questions
        </h2>
        <div>
          {faqs.map((faq) => {
            const paragraphs = faq.answer.split(/\n\s*\n/)
            return (
              <FrequentlyAskedQuestions key={faq.question} title={faq.question}>
                {paragraphs.map((p, i) => (
                  <p key={i} className={i < paragraphs.length - 1 ? 'mb-[30px]' : undefined}>
                    {p}
                  </p>
                ))}
              </FrequentlyAskedQuestions>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default index
