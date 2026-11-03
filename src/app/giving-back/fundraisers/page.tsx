import ClubProgramPage from '@/components/site-pages/ClubProgramPage'
import Link from 'next/link'

export default function FundraisersPage() {
  return (
    <ClubProgramPage title="Fundraisers">
      <div className="flex flex-wrap gap-3">
        <Link
          href="/giving-back/auction"
          className="mt-6 inline-flex rounded-full bg-[#4F83E5] px-6 py-3 font-semibold text-white hover:bg-[#376BCD]"
        >
          Explore the Charity Auction
        </Link>
        <Link
          href="/giving-back/golf-tournament"
          className="mt-6 inline-flex rounded-full bg-[#4F83E5] px-6 py-3 font-semibold text-white hover:bg-[#376BCD]"
        >
          Explore the Golf Tournament
        </Link>
      </div>
    </ClubProgramPage>
  )
}
