import { useRouter } from 'next/navigation'
import { checkExpired, fetchWithoutToken } from './customFetch'
import useToken from './useToken'
import { dateFormatter } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

export function ExpirationLogout(logOutToo?: boolean) {
  const { token, decoded, expirationDate } = useToken()
  const { replace } = useRouter()

  console.log(checkExpired(expirationDate))

  console.log(dateFormatter(expirationDate))

  if (
    (checkExpired(expirationDate) && typeof window !== 'undefined' && token) ||
    !token
  ) {
    console.log('masuk')

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
