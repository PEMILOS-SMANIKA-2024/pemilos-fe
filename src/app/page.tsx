/* eslint-disable react/react-in-jsx-scope */
'use client'
import { checkExpired, fetchWithoutToken } from '@/custom-hook/customFetch'
import useToken from '@/custom-hook/useToken'
import LandingPageModule from '@/modules/LandingPageModule'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { decoded, expirationDate } = useToken()
  const { replace } = useRouter()

  if (checkExpired(expirationDate) && typeof window !== 'undefined') {
    const rootUrl = window.location.href.split('/')[0]
    const response = async () => {
      const response = await fetchWithoutToken(`/auth/logout/${decoded.id}`, {
        method: 'POST',
      })

      if (response.message == 'User already logged out' || response.ok) {
        localStorage.removeItem('token')
        replace(rootUrl)
      }
    }
    response()
  }

  return <LandingPageModule />
}
