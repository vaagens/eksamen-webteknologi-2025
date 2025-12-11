'use client'

import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore()
  const router = useRouter()

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
  })

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Handlekurv</h1>
        <p className="mb-4 text-gray-600">Handlekurven din er tom.</p>
        <button
          onClick={() => router.push('/books')}
          className="rounded bg-green-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-green-700"
        >
          Tilbake til butikken
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <article className="grid gap-8 md:grid-cols-2">
        <section className="rounded-lg border p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">Din bestilling</h2>

          <ul className="space-y-4">
            {items.map((item) => {
              const coverImage = item.book.coverImage as Media
              const price = item.book.price ?? 0
              const subtotal = item.quantity * price

              return (
                <li key={item.book.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                  <div className="relative h-24 w-16 flex-shrink-0 rounded bg-gray-100">
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
                    <p className="text-sm text-gray-600">
                      {item.quantity} × {price} kr
                    </p>
                    <p className="mt-1 font-semibold">{subtotal} kr</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 border-t pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold">Totalt:</span>
              <span className="text-2xl font-bold">{getTotalPrice()} kr</span>
            </div>
          </div>
        </section>

        <section className="rounded-lg border p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">Dine opplysninger</h2>

          <form className="space-y-6">
            <div>
              <label htmlFor="customerName" className="mb-2 block font-semibold">
                Navn *
              </label>
              <input
                type="text"
                id="customerName"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Gløer Norman"
                className="w-full rounded border border-gray-300 px-4 py-2 transition-colors focus:border-green-600 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block font-semibold">
                Telefonnummer *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="123 45 678"
                className="w-full rounded border border-gray-300 px-4 py-2 transition-colors focus:border-green-600 focus:outline-none"
              />
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <p className="text-sm">
                <strong>Viktig:</strong> Du får en melding når estillingen din er klar for henting i butikken. Du
                betaler når du henter bøkene.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded border border-black bg-green-600 px-6 py-3 font-bold text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
            >Send Bestillig</button>
          </form>
        </section>
      </article>
    </div>
  )
}
