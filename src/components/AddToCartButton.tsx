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
      className="cursor-pointer rounded border border-black bg-amber-600 px-4 py-2 font-bold text-white drop-shadow-lg transition-colors hover:bg-amber-700"
      onClick={() => {
        addItem(book)
      }}
    >
      Legg i handlekurv
    </button>
  )
}
