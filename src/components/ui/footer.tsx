/* eslint-disable react/react-in-jsx-scope */
'use client'
import { motion, useInView } from 'framer-motion'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

export const BottomBar = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false })

  return (
    <motion.section
      ref={ref}
      initial={{ y: 100 }}
      animate={{ y: inView ? 0 : 100 }}
      className="bg-red-500 flex flex-col relative mt-20"
    >
      <Image
        src="/blob-bottom.png"
        alt="blob"
        height={80}
        width={1920}
        className="absolute w-full h-[40px] md:h-[70px] object-top -top-[39px] md:-top-[69px]"
      />
      <main className="w-full bg-[#6149D4] flex flex-col gap-3 py-8 px-16 font-manrope text-white font-semibold">
        <div className="w-full flex justify-between ">
          <Image
            src={'/logo-smanika-osis.png'}
            alt="SMANIKA OSIS Logo"
            width={50}
            height={200}
          />
          <div className="flex gap-3 items-center text-white">
            <a
              href="https://www.instagram.com/osissmanika/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram />
            </a>
            <Twitter />
            <Youtube />
            <Facebook />
          </div>
        </div>
        <div className="flex flex-col gap-4 text-sm w-fit">
          {['Landing', 'Login', 'Visi Misi', 'Vote'].map((item, index) => (
            <a
              key={index}
              href={item.replaceAll(' ', '').toLowerCase()}
              className="group transition duration-300"
            >
              {item}
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
            </a>
          ))}
        </div>
        <div className="text-center">
          <h4 className="text-sm lg:text-base">
            &copy; 2024 SMANIKA COMPUTER CLUB, All right reserved.
          </h4>
        </div>
      </main>
    </motion.section>
  )
}
