'use client'
import React from 'react'
import VotePageModule from '@/modules/VotePageModule'
import { checkExpired, fetchWithoutToken } from '@/custom-hook/customFetch'
import useToken from '@/custom-hook/useToken'
import { useRouter } from 'next/navigation'

export default function VotePage() {
  const { token, decoded, expirationDate } = useToken()
  const { replace } = useRouter()

  if (checkExpired(expirationDate) && typeof window !== 'undefined' && token) {
    const response = async () => {
      const response = await fetchWithoutToken(`/auth/logout/${decoded.id}`, {
        method: 'POST',
      })

      replace('/login')
      setTimeout(() => {
        localStorage.removeItem('token')
      }, 100)
    }
    response()
  }

  return <VotePageModule />
}
