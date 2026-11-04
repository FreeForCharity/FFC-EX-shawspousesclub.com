const tshirtOrderUrl = 'https://www.zeffy.com/embed/ticketing/shaw-spouses-club-t-shirts'

export default function ZeffyTshirtOrder() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#D9E5FA] bg-white">
      <iframe
        title="Shaw Spouses’ Club T-shirt ordering form powered by Zeffy"
        src={tshirtOrderUrl}
        className="h-[450px] w-full border-0"
        loading="lazy"
        allow="payment"
      />
    </div>
  )
}
