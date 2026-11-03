import Link from 'next/link'

export const governancePages = [
  {
    title: 'Board Members',
    href: '/board',
    description:
      'Meet the governing board, explore board positions, and express your interest in serving.',
    label: 'Meet the Board',
  },
  {
    title: 'Legal Documents',
    href: '/legal-documents',
    description: 'Access the club’s Constitution, Bylaws, and tax-exempt documentation.',
    label: 'Explore Legal Documents',
  },
] as const

export default function GovernanceCards({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {governancePages.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          onClick={onNavigate}
          className="flex h-full flex-col rounded-xl border border-[#D9E5FA] bg-white p-5 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F83E5]"
        >
          <h3 className="mb-2 text-lg font-bold text-[#234F93]">{page.title}</h3>
          <p className="flex-1 text-sm leading-6 text-[#26394D]">{page.description}</p>
          <span className="mt-4 font-semibold text-[#234F93] underline decoration-[#4F83E5] underline-offset-4">
            {page.label}
          </span>
        </Link>
      ))}
    </div>
  )
}
