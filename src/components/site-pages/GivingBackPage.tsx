import GivingBackCards from '@/components/giving-back/GivingBackCards'

export default function GivingBackPage() {
  return (
    <section className="bg-[#F4F7FF] px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-9 max-w-3xl text-center">
          <h1 className="faustina-font mb-4 text-3xl font-semibold text-[#234F93] sm:text-4xl">
            Giving Back
          </h1>
          <p className="leading-7 text-[#26394D]">
            Explore the club&apos;s fundraising events, scholarship opportunities, community grants,
            and service projects.
          </p>
        </div>
        <GivingBackCards />
      </div>
    </section>
  )
}
