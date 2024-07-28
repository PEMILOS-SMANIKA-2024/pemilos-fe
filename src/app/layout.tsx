import { BottomBar } from '@/components/ui/footer'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Manrope, Poppins } from 'next/font/google'
import React from 'react'
import './globals.css'
import Image from 'next/image'

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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body
        className={`${poppins.variable} ${manrope.variable}`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <Image
          src={'/pattern.png'}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Pattern"
          className="fixed z-[-1] opacity-[3%] max-w-[1920px]"
        />
        {children}
        <BottomBar />
        <Toaster />
      </body>
    </html>
  )
}
