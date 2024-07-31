'use client'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { checkExpired, fetchWithToken } from './custom-fetch'
import useToken from './useToken'
import { removeAuthCookie } from './cookie'

export function ExpirationLogout(logOutToo?: boolean) {
  const { token, decoded, expirationDate } = useToken()
  const { replace } = useRouter()

  if (checkExpired(expirationDate) && typeof window !== 'undefined' && token) {
    const response = async () => {
      await fetchWithToken(`/auth/logout/${decoded.id}`, token, {
        method: 'POST',
      })

      localStorage.removeItem('token')
      removeAuthCookie()

      if (logOutToo) {
        toast({
          title: 'Session Expired',
          description: 'Sesi anda sudah habis, silahkan login kembali',
          variant: 'destructive',
        })
        replace('/login')
      }
    }
    response()
  }
}
