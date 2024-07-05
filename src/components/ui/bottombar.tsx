'use client'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const BottomBar = () => {
  return (
    <main className="w-full bg-[#6149D4] flex flex-col gap-3 py-8 px-16 font-manrope text-white font-semibold">
      <div className="w-full flex justify-between">
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
    </main>
  )
}
