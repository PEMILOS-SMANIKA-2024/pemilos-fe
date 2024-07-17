'use client'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

/* eslint-disable react/react-in-jsx-scope */
export default function NotFoundModule() {
  return (
    <section className="h-screen relative flex items-center justify-center font-manrope">
      <div className="flex flex-col items-center text-center gap-4">
        <h1 className="text-5xl font-extrabold">404</h1>
        <h2 className="text-2xl font-semibold">
          Beliau satu ini tampaknya tersesat
        </h2>
        <a
          href="/"
          className="hover:scale-105 duration-150 hover:font-bold hover:text-[#6149D4]"
        >
          <Button isAnimated>
            <ChevronLeft className="" />
            <span>Kembali ke Page Utama</span>
          </Button>
        </a>
      </div>
    </section>
  )
}
