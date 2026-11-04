const googleFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScgHRRrgx7Xj_3X93-tJlIIDMDLxfi2XXiPY2_EkvnGQ0mqaA/viewform?embedded=true'

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

      <iframe
        title="Shaw Spouses’ Club Board Position Interest Form"
        src={googleFormUrl}
        className="min-h-[1000px] w-full rounded-lg border-0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />

      <p className="mt-4 text-center text-sm leading-6 text-[#26394D]">
        If the form does not appear,{' '}
        <a
          href={googleFormUrl.replace('?embedded=true', '')}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#234F93] underline"
        >
          open it in a new tab
        </a>
        .
      </p>
    </section>
  )
}
