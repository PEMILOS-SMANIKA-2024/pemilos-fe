'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { Background } from '../../components/ui/background'

/* eslint-disable react/react-in-jsx-scope */
export default function NotFoundModule() {
  return (
    <section className="h-screen relative overflow-hidden flex items-center justify-center font-manrope">
      <Background />
      <div className="flex flex-col z-20 items-center text-center gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Image src={`/404-${1}.png`} alt="404" width={300} height={300} />
        </motion.div>
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="text-5xl font-extrabold"
        >
          404
        </motion.h1>
        <motion.h2
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="text-2xl font-semibold"
        >
          Beliau satu ini tampaknya tersesat
        </motion.h2>
        <motion.a
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          href="/"
          className="hover:scale-105 duration-150 hover:font-bold hover:text-[#6149D4]"
        >
          <Button isAnimated>
            <ChevronLeft className="" />
            <span>Kembali ke Page Utama</span>
          </Button>
        </motion.a>
      </div>
    </section>
  )
}
