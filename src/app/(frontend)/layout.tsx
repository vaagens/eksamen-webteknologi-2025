import React from 'react'
import type { Metadata } from 'next'
import './global.css'

export const metadata: Metadata = {
  description: 'BookDragoons',
  title: 'Nettbutikk for brukte bøker',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="nb-NO">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
