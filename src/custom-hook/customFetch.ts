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
