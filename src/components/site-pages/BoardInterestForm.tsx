import Link from 'next/link'

export default function BoardInterestForm() {
  return (
    <section
      aria-labelledby="board-interest-heading"
      className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#D9E5FA] bg-white p-6 shadow-sm sm:p-8"
    >
      <header className="mb-6 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#4F83E5]">
          Interested in serving?
        </p>
        <h2
          id="board-interest-heading"
          className="faustina-font text-2xl font-semibold text-[#234F93] sm:text-3xl"
        >
          Express interest in a board position
        </h2>
      </header>

      <p className="text-center text-sm leading-6 text-[#26394D]">
        To express interest in a board position,{' '}
        <Link href="/contact-us" className="font-semibold text-[#234F93] underline">
          contact the Shaw Spouses’ Club
        </Link>
        .
      </p>
    </section>
  )
}
