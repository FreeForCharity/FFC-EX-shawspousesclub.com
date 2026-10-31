import Link from 'next/link'
import ZeffyTshirtOrder from '@/components/site-pages/ZeffyTshirtOrder'

const tshirtOrderUrl = 'https://www.zeffy.com/embed/ticketing/shaw-spouses-club-t-shirts'

export default function SscMerchPage() {
  return (
    <section className="bg-[#F4F7FF] px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/membership"
          className="mb-5 inline-block font-semibold text-[#234F93] underline"
        >
          Membership
        </Link>

        <header className="mb-9 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#4F83E5]">
            Shaw Spouses&apos; Club
          </p>
          <h1 className="faustina-font mb-3 text-3xl font-semibold text-[#234F93] sm:text-4xl">
            SSC Merch
          </h1>
          <p className="mx-auto max-w-2xl leading-7 text-[#26394D]">
            Show your club spirit with Shaw Spouses&apos; Club apparel. Browse available T-shirts
            and place your order using the form below.
          </p>
        </header>

        <section
          aria-labelledby="ssc-tshirt-order-heading"
          className="rounded-2xl border border-[#D9E5FA] bg-white p-5 shadow-sm sm:p-8"
        >
          <h2
            id="ssc-tshirt-order-heading"
            className="faustina-font mb-5 text-center text-2xl font-semibold text-[#234F93]"
          >
            T-shirt Order Form
          </h2>
          <ZeffyTshirtOrder />
          <p className="mt-4 text-center text-sm text-[#26394D]">
            If the form does not appear,{' '}
            <a
              href={tshirtOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#234F93] underline"
            >
              open the T-shirt order form in a new tab
            </a>
            .
          </p>
        </section>
      </div>
    </section>
  )
}
