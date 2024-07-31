'use server'
/* eslint-disable react/react-in-jsx-scope */
import { Background } from '@/components/ui/background'
import { Navbar } from '@/components/ui/navbar'
import LandingPageModule from '@/modules/LandingPageModule'
import { FAQSection } from '@/modules/LandingPageModule/faq'
import { TataCaraModule } from '@/modules/LandingPageModule/tata-cara'
import { VisiMisiModule } from '@/modules/LandingPageModule/visi-misi'
import { VoteResultModule } from '@/modules/LandingPageModule/vote-result'

export default async function Home() {
  const showResult = true

  return (
    <div className="max-w-[1920px]">
      <Background />
      <Navbar />
      <main className="px-10 lg:px-40 flex flex-col gap-10 overflow-hidden min-h-screen">
        <LandingPageModule />
        {showResult && <VoteResultModule />}
        <VisiMisiModule />
        <TataCaraModule />
        <FAQSection />
      </main>
    </div>
  )
}
