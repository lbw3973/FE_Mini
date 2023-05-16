import * as jose from 'jose'
import { errors } from 'jose'

export const jwtDecode = (jwt: string) => {
  try {
    const decodedJWT = jose.decodeJwt(jwt)

    return decodedJWT
  } catch (error) {
    if (error instanceof errors.JOSEError && error.name === 'JWTInvalid') {
      return null
    }
    throw error
  }
}

export const registerAccessToken = async (payload: Record<string, any>, key = 'secret') => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS512' })
    .setIssuedAt()
    .setExpirationTime('30m')
    .sign(new TextEncoder().encode(key))
}

export const registerRefreshToken = async (payload: Record<string, any>, key = 'secretRefresh') => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS512' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(new TextEncoder().encode(key))
}

export const verifyAccessToken = (token: string) => {
  return jose.jwtVerify(token, new TextEncoder().encode('secret'))
}

export const verifyRefreshToken = (token: string) => {
  return jose.jwtVerify(token, new TextEncoder().encode('secretRefresh'))
}
