'use client'

import { useCartStore } from '@/store/cartStore'
import { Book } from '@/payload-types'

interface AddToCartButtonProps {
  book: Book
}

export function AddToCartButton({ book }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <button
      className="px-4 py-2 rounded border border-black drop-shadow-lg bg-amber-600 text-white hover:bg-amber-700 cursor-pointer font-bold"
      onClick={() => {
        addItem(book)
      }}
    >
      Legg i handlekurv
    </button>
  )
}
