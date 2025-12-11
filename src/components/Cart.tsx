'use client'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { X, LucideMinus, LucidePlus } from 'lucide-react'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70" onClick={onClose}>
      <div
        className="absolute top-20 right-4 left-4 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg bg-amber-50 p-6 shadow-xl md:left-auto md:w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Handlekurv</h2>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </header>

        {items.length === 0 ? (
          <p className="py-8 text-center text-gray-500">Handlekurven er tom</p>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => {
                const coverImage = item.book.coverImage as Media

                return (
                  <li key={item.book.id} className="flex gap-4 border-b pb-4">
                    <div className="relative h-28 w-20 flex-shrink-0 rounded bg-gray-100">
                      {coverImage?.sizes?.thumbnail ? (
                        <Image
                          src={coverImage.sizes.thumbnail.url || ''}
                          alt={item.book.title}
                          fill
                          className="rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                          Ingen bilde
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.book.title}</h3>
                      <p>{item.book.price} kr</p>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          className="cursor-pointer rounded border px-2 py-1 transition-colors hover:bg-gray-200"
                        >
                          <LucideMinus size={12} />
                        </button>

                        <span className="px-4">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          className="cursor-pointer rounded border px-2 py-1 transition-colors hover:bg-gray-200"
                        >
                          <LucidePlus size={12} />
                        </button>

                        <button
                          onClick={() => removeItem(item.book.id)}
                          className="ml-auto cursor-pointer text-red-600 hover:text-red-800"
                        >
                          Fjern
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <footer className="mt-6 border-t pt-4">
              <div className="mb-4 flex justify-between text-xl font-bold">
                <span>Totalt:</span>
                <span>{getTotalPrice()} kr</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 cursor-pointer rounded border bg-amber-50 px-4 py-2 font-bold drop-shadow-lg transition-colors hover:bg-gray-200"
                >
                  Tøm kurv
                </button>
                <button
                  onClick={() => {
                    // TODO
                  }}
                  className="flex-1 cursor-pointer rounded border border-black bg-green-600 px-4 py-2 font-bold text-white drop-shadow-lg transition-colors hover:bg-green-700"
                >
                  Til kassen
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  )
}
