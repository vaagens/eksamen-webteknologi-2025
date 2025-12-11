'use client'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="px-4 py-2 rounded border drop-shadow-lg bg-amber-50 hover:bg-gray-200 cursor-pointer font-bold"
    >
      Tilbake
    </button>
  )
}
