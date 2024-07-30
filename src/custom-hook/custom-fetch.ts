import { API_URL } from '@/modules/constant'

interface fetchResultInterface<T> {
  status?: boolean
  statusCode?: number
  path?: string
  timestamp?: string
  result?: T
  error?: string
  message?: string
}

export const fetchWithToken = async <T>(
  route: string,
  token: string | undefined,
  options: RequestInit
): Promise<fetchResultInterface<T>> => {
  try {
    const response = await fetch(`${API_URL}${route}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  } catch (error) {
    return {
      error: error as string,
      message: error as string,
    }
  }
}

export const fetchWithoutToken = async <T>(
  route: string,
  options: RequestInit
): Promise<fetchResultInterface<T>> => {
  try {
    const response = await fetch(`${API_URL}${route}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        API_KEY: process.env.NEXT_PUBLIC_API_KEY || '',
      },
    })

    return response.json()
  } catch (error) {
    return {
      error: error as string,
      message: error as string,
      status: false,
      statusCode: 500,
    }
  }
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
