/* eslint-disable react/react-in-jsx-scope */
'use client'
import { ExpirationLogout } from '@/custom-hook/expiration-logout'
import LandingPageModule from '@/modules/LandingPageModule'
import { FAQSection } from '@/modules/LandingPageModule/faq'
import { TataCaraModule } from '@/modules/LandingPageModule/tata-cara'
import { VisiMisiModule } from '@/modules/LandingPageModule/visi-misi'
import Image from 'next/image'

export default function Home() {
  ExpirationLogout()

  return (
    <>
      <Image
        src={'/pattern.png'}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Pattern"
        className="fixed z-0 opacity-[3%]"
      />
      <LandingPageModule />
      <VisiMisiModule />
      <TataCaraModule />
      <FAQSection />
    </>
  )
}
