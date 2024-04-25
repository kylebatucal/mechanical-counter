'use client'

import Counter from '@/app/counter'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'
import Link from 'next/link'

export default function Home() {
  // Parse number from query
  const searchParams = useSearchParams()
  let value = 0
  if (searchParams.has('count')) {
    const schema = z.coerce.number().int().nonnegative().lte(9999)
    const result = schema.safeParse(searchParams.get('count'))
    if (result.success) {
      value = result.data
    }
  }

  return (
    <div className="h-screen white">
      <Counter startingValue={value} />
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 -translate-y-1/2 dark:text-[#FAF9F6] select-none hover:select-auto">
        source on{' '}
        <Link
          className="text-blue-500"
          href="https://github.com/kylebatucal/mechanical-counter"
        >
          github
        </Link>
      </div>
    </div>
  )
}
