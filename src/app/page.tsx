/* eslint-disable react/react-in-jsx-scope */
'use client'
import { checkExpired, fetchWithoutToken } from '@/custom-hook/customFetch'
import useToken from '@/custom-hook/useToken'
import LandingPageModule from '@/modules/LandingPageModule'

export default function Home() {
  const { token, decoded, expirationDate } = useToken()

  if (checkExpired(expirationDate) && typeof window !== 'undefined' && token) {
    const response = async () => {
      const response = await fetchWithoutToken(`/auth/logout/${decoded.id}`, {
        method: 'POST',
      })

      localStorage.removeItem('token')
    }
    response()
  }

  return <LandingPageModule />
}
