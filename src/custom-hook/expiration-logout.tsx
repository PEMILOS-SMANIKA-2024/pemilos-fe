import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { checkExpired, fetchWithoutToken } from './customFetch'
import useToken from './useToken'

export function ExpirationLogout(logOutToo?: boolean) {
  const { token, decoded, expirationDate } = useToken()
  const { replace } = useRouter()

  if (checkExpired(expirationDate) && typeof window !== 'undefined' && token) {
    const response = async () => {
      await fetchWithoutToken(`/auth/logout/${decoded.id}`, {
        method: 'POST',
      })

      localStorage.removeItem('token')

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