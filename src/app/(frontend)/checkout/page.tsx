'use client'

import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
  })

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Handlekurv</h1>
        <p className="mb-4 text-gray-600">Handlekurven din er tom.</p>
        <button
          onClick={() => router.push('/books')}
          className="cursor-pointer rounded border bg-amber-50 px-4 py-2 font-bold drop-shadow-lg transition-colors hover:bg-gray-200"
        >
          Tilbake til butikken
        </button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.customerName,
          phone: formData.phone,
          items: items.map((item) => ({
            book: item.book.id,
            quantity: item.quantity,
            priceAtOrder: item.book.price ?? 0,
          })),
          totalPrice: getTotalPrice(),
          status: 'pending',
        }),
      })

      if (!response.ok) {
        throw new Error('Noe gikk galt')
      }

      clearCart()
      alert('Bestillingen er sendt! Vi kontakter deg når den er klar for henting.')
      router.push('/')
    } catch (error) {
      console.error('Feil ved bestilling:', error)
      alert('Noe gikk galt. Vennligst prøv igjen.')
    } finally {
      setIsSubmitting(false)
    }
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

          <form onSubmit={handleSubmit} className="space-y-6">
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
                <strong>Viktig:</strong> Du får en melding når estillingen din er klar for henting i
                butikken. Du betaler når du henter bøkene.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer rounded border border-black bg-green-600 px-6 py-3 font-bold text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Sender...' : 'Send bestilling'}
            </button>
          </form>
        </section>
      </article>
    </div>
  )
}
