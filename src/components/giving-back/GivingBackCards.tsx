import Link from 'next/link'
import { givingBackPages } from '@/data/giving-back'

export default function GivingBackCards({ className = '' }: { className?: string }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-4 ${className}`}>
      {givingBackPages.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          className="flex h-full flex-col rounded-xl border border-[#D9E5FA] bg-white p-5 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F83E5]"
        >
          <h3 className="mb-2 text-lg font-bold text-[#234F93]">{page.title}</h3>
          <p className="flex-1 text-sm leading-6 text-[#26394D]">{page.description}</p>
          <span className="mt-4 font-semibold text-[#234F93] underline decoration-[#4F83E5] underline-offset-4">
            Explore {page.title}
          </span>
        </Link>
      ))}
    </div>
  )
}
