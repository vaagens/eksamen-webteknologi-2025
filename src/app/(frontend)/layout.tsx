import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  description: 'BookDragoons',
  title: 'Nettbutikk for brukte bøker',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="nb-NO">
    <body className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-200 to-red-300 text-gray-900">
        <Header/>
        <main>{children}</main>
      </body>
    </html>
  )
}
