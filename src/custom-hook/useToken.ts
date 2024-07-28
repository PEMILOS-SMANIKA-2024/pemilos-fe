import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchWithToken } from './customFetch'

export interface DecodedToken {
  id: number
  name: string
  username: string
  role: string
  exp: string
  hasVoted: boolean
}

const useToken = () => {
  const [token, setToken] = useState<string>('')
  const [decoded, setDecoded] = useState<DecodedToken>({
    id: 0,
    username: '',
    exp: '',
    name: '',
    role: 'siswa',
    hasVoted: false,
  })
  const [expirationDate, setExpirationDate] = useState<Date | null>(null)
  const { refresh } = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken ?? '')
      let decodedToken: DecodedToken = {
        id: 0,
        username: '',
        exp: '',
        name: '',
        role: 'siswa',
        hasVoted: false,
      }
      try {
        decodedToken = jwtDecode(storedToken)
      } catch (error) {
        localStorage.removeItem('token')
        setToken('')
        refresh()
      }
      setDecoded(decodedToken)
      const expiration = new Date(parseInt(decodedToken.exp) * 1000)
      setExpirationDate(expiration)

      if (typeof window !== 'undefined' && expiration < new Date()) {
        // localStorage.removeItem('token')
        const response = async () => {
          const response = await fetchWithToken(
            `/auth/logout/${decoded.id}`,
            token,
            {
              method: 'POST',
            }
          )

          if (response.ok) {
            localStorage.removeItem('token')
            refresh()
          }
        }
        response()
      }
    }
  }, [refresh])

  return { token, decoded, expirationDate }
}

export default useToken
