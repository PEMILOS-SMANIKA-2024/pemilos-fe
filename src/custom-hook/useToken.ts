import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

interface DecodedToken {
  name: string
  username: string
  role: string
  exp: string
}

const useToken = () => {
  const [token, setToken] = useState<string>('')
  const [decoded, setDecoded] = useState<DecodedToken>({
    username: '',
    exp: '',
    name: '',
    role: 'siswa',
  })
  const [expirationDate, setExpirationDate] = useState<Date | null>(null)
  const { refresh } = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken ?? '')
      const decodedToken: DecodedToken = jwtDecode(storedToken)
      setDecoded(decodedToken)
      const expiration = new Date(parseInt(decodedToken.exp) * 1000)
      setExpirationDate(expiration)

      if (typeof window !== 'undefined' && expiration < new Date()) {
        localStorage.removeItem('token')
        refresh()
      }
    }
  }, [refresh])

  return { token, decoded, expirationDate }
}

export default useToken
