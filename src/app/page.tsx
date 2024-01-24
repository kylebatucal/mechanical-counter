'use client'

import Counter from "@/app/ui/counter"
import { useSearchParams } from 'next/navigation'
import { z } from "zod"

export default function Home() {
  // Parse number from query
  const searchParams = useSearchParams()
  let value = 0
  if (searchParams.has("value")) {
    const schema = z.coerce.number().int().nonnegative().lte(9999);
    const result = schema.safeParse(searchParams.get("value"))
    if (result.success) {
      value = result.data
    }
  }

  return (
    <Counter startingValue={value}/>
  );
}
