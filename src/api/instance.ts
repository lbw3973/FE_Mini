import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError, HttpStatusCode } from 'axios'
import { getCookie, setCookie } from '../util/cookies'
import { API_URL } from './constants'
import { getTokensFromResponse } from './util'
import { jwtDecode } from '../util/jwt'

const getInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_MOCKING_ENABLE === 'true' ? '' : import.meta.env.VITE_SERVER_URL,
    // headers: {
    //   Authorization: ''
    // },
    withCredentials: true,
  })

  const TIMEOUTERROR_MESSAGE = 'timeout'

  // instance.defaults.timeout = 5000
  instance.defaults.timeoutErrorMessage = TIMEOUTERROR_MESSAGE

  instance.interceptors.request.use(handleRequest)

  instance.interceptors.response.use(handleResponse, handleIntercepterError)

  return instance
}

export const instance = getInstance()

function handleRequest(req: InternalAxiosRequestConfig<any>) {
  const accessToken = getCookie('accessToken')

  if (accessToken) {
    req.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return req
}

<<<<<<< HEAD
function handleResponse(res: AxiosResponse<any, any>) {
  if (res.config.url === 'http://52.78.232.110:9090' + API_URL.v1.login) {
    const { accessToken } = getTokensFromResponse(res)

    const decodedAccessToken = jwtDecode(accessToken)
    // const decodedRefreshToken = jwtDecode(refreshToken)
=======
async function handleResponse(res: AxiosResponse<any, any>) {
  if (res.config.url === API_URL.v1.login) {
    if (res.status === HttpStatusCode.Forbidden) {
      const { data: refreshResponse } = await instance.post(API_URL.v1.refresh)

      if (refreshResponse.status === HttpStatusCode.Forbidden) throw new Error(refreshResponse.data)
    }
    const { accessToken } = getTokensFromResponse(res)

    const decodedAccessToken = jwtDecode(accessToken)
>>>>>>> 6a2bcb45096c1ede3b6b4545d7775aba5cb8b5db

    setCookie('accessToken', accessToken, {
      path: '/',
      maxAge: Number(decodedAccessToken?.exp) - Number(decodedAccessToken?.iat),
    })
<<<<<<< HEAD
    // setCookie('refreshToken', refreshToken, {
    //   path: '/',
    //   maxAge: Number(decodedRefreshToken?.exp) - Number(decodedRefreshToken?.iat),
    // })
=======
>>>>>>> 6a2bcb45096c1ede3b6b4545d7775aba5cb8b5db
  }

  return res
}

function handleIntercepterError(error: AxiosError) {
  if (error?.code === AxiosError.ECONNABORTED) {
    return Promise.reject({ ok: false, error: { message: instance.defaults.timeoutErrorMessage } })
  }
  return Promise.reject(error)
}
