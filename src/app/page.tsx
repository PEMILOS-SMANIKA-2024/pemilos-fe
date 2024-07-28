/* eslint-disable react/react-in-jsx-scope */
'use client'
import { Navbar } from '@/components/ui/navbar'
import { ExpirationLogout } from '@/custom-hook/expiration-logout'
import LandingPageModule from '@/modules/LandingPageModule'
import { Background } from '@/modules/LandingPageModule/components/background'
import { FAQSection } from '@/modules/LandingPageModule/faq'
import { TataCaraModule } from '@/modules/LandingPageModule/tata-cara'
import { VisiMisiModule } from '@/modules/LandingPageModule/visi-misi'

export default function Home() {
  ExpirationLogout()

  return (
    <div className="max-w-[1920px]">
      <Background />

      <Navbar />
      <main className="px-10 md:px-20 lg:px-40 flex flex-col gap-10 overflow-hidden min-h-screen">
        <LandingPageModule />
        <VisiMisiModule />
        <TataCaraModule />
        <FAQSection />
      </main>
    </div>
  )
}
