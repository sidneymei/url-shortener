import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import './globals.css'

config.autoAddCss = false

export const metadata: Metadata = {
  title: 'URL Shortener',
  description: 'A simple URL shortener built with Next.js and MongoDB',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col items-center justify-center h-screen">
        {children}
      </body>
    </html>
  )
}
