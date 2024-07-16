import { API_URL } from '@/modules/constant'

export const fetchWithToken = async (
  route: string,
  token: string | undefined,
  options: RequestInit
) => {
  const response = await fetch(`${API_URL}${route}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
}

export const fetchWithoutToken = async (
  route: string,
  options: RequestInit
) => {
  const response = await fetch(`${API_URL}${route}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export const checkExpired = (expirationDate: Date | null | string) => {
  if (expirationDate == null) {
    return true
  }

  if (expirationDate) {
    return expirationDate < new Date()
  }
  return false
}
