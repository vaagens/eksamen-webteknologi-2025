import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  description: 'BookDragoons',
  title: 'Nettbutikk for brukte bøker',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="nb-NO"  className="h-screen bg-gradient-to-br from-yellow-50 via-orange-200 to-red-300 text-gray-900">
      <body className="h-full grid grid-rows-[auto_1fr_auto]" >
        <Header />
        <main className="overflow-y-auto">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
