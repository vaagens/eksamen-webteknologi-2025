'use client'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer rounded border bg-amber-50 px-4 py-2 font-bold drop-shadow-lg transition-colors hover:bg-gray-200"
    >
      Tilbake
    </button>
  )
}
