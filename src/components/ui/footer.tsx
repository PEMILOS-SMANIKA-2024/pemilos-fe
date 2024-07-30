/* eslint-disable react/react-in-jsx-scope */
'use client'
import { motion, useInView } from 'framer-motion'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { NavbarItem } from './navbar'
import { usePathname, useRouter } from 'next/navigation'
import { scroller } from 'react-scroll'
import useToken from '@/custom-hook/useToken'

export const BottomBar = () => {
  const pathname = usePathname()
  const { push } = useRouter()
  const { token } = useToken()

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
          <NavbarItem
            name="Home"
            onClick={() => {
              if (pathname === '/') {
                scroller.scrollTo('home', {
                  smooth: true,
                  offset: -150,
                })
              } else {
                push('/')
              }
            }}
            index={0}
          />
          {token !== '' && (
            <NavbarItem
              name="Vote"
              onClick={() => {
                if (pathname === '/vote') {
                  scroller.scrollTo('vote', {
                    smooth: true,
                    offset: -150,
                  })
                } else {
                  push('/vote')
                }
              }}
              index={1}
            />
          )}
          <NavbarItem
            name="Visi Misi"
            onClick={() => {
              if (pathname === '/vote') {
                push('/')
              } else {
                scroller.scrollTo('visi-misi', {
                  smooth: true,
                  offset: -50,
                })
              }
            }}
            index={2}
          />
          <NavbarItem
            name="Tata Cara"
            onClick={() => {
              if (pathname === '/vote') {
                push('/')
              } else {
                scroller.scrollTo('tata-cara', {
                  smooth: true,
                  offset: -150,
                })
              }
            }}
            index={3}
          />
          <NavbarItem
            name="FAQ"
            onClick={() => {
              if (pathname === '/vote') {
                push('/')
              } else {
                scroller.scrollTo('faq', {
                  smooth: true,
                  offset: -150,
                })
              }
            }}
            index={4}
          />
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
