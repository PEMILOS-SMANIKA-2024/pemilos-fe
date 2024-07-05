import type { Metadata } from 'next'
import { Poppins, Manrope } from 'next/font/google'
import React from 'react'
import './globals.css'
import { Navbar } from '@/components/ui/navbar'
import { Toaster } from '@/components/ui/toaster'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Pemilos SMANIKA',
  description: 'Pemilihan OSIS SMANIKA 2024/2025',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${manrope.variable} p-20`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
