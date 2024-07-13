import { jwtDecode } from 'jwt-decode'

export const customFetch = async (route: string, options: RequestInit) => {
  const response = await fetch(`${process.env.API_URL}${route}`, options)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export function getToken():
  | {
      token: string
      username: string
      exp: string
    }
  | undefined {
  const token = localStorage.getItem('token')
  if (token) {
    const decoded: {
      username: string
      exp: string
    } = jwtDecode(token)
    return {
      token: token,
      username: decoded.username,
      exp: decoded.exp,
    }
  }
}
