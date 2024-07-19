/* eslint-disable react/react-in-jsx-scope */
'use client'
import { ExpirationLogout } from '@/custom-hook/expiration-logout'
import LandingPageModule from '@/modules/LandingPageModule'
import { VisiMisiModule } from '@/modules/LandingPageModule/visi-misi'

export default function Home() {
  ExpirationLogout()

  return (
    <>
      <LandingPageModule />
      <VisiMisiModule />
    </>
  )
}
