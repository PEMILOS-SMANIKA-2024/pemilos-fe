import { jwtDecode } from 'jwt-decode'
import { DecodedToken } from './useToken'

export async function decodeToken(token: string) {
  const decodedToken: DecodedToken = await jwtDecode(token)

  return decodedToken
}
