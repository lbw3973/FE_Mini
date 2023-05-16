import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError, HttpStatusCode } from 'axios'
import { getCookie, setCookie } from '../util/cookies'
import { API_URL } from './constants'
import { getTokensFromResponse } from './util'
import { jwtDecode } from '../util/jwt'

const getInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_MOCKING_ENABLE === 'true' ? '' : import.meta.env.VITE_SERVER_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
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

  // req.headers[
  //   'Authorization'
  // ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKV1QiLCJpbWFnZSI6IjQwNC5qcGciLCJyb2xlIjoiQURNSU4iLCJuYW1lIjoi6rmA64-F7J6QIiwicG9zaXRpb24iOiLqs7zsnqUiLCJleHAiOjE2ODYzNzEwNjEsImRlcGFydG1lbnQiOiLqsJzrsJwiLCJpYXQiOjE2ODM3NzkwNjEsInVzZXJuYW1lIjoiYWRtaW40In0.ADlhVUmqLzy46MjD-YdPgk5ssuhZ8xpzAZIO-d1FPaIw6aytulQz7uNcUYTtbyJwWX-S_TeZgS7POQn_NlOA8g`
  return req
}

async function handleResponse(res: AxiosResponse<any, any>) {
  if (res.config.url === API_URL.v1.login) {
    if (res.status === HttpStatusCode.Forbidden) {
      const { data: refreshResponse } = await instance.post(API_URL.v1.refresh)

      if (refreshResponse.status === HttpStatusCode.Forbidden) throw new Error(refreshResponse.data)
    }
    const { accessToken } = getTokensFromResponse(res)

    const decodedAccessToken = jwtDecode(accessToken)

    setCookie('accessToken', accessToken, {
      path: '/',
      maxAge: Number(decodedAccessToken?.exp) - Number(decodedAccessToken?.iat),
    })
  }

  return res
}

function handleIntercepterError(error: AxiosError) {
  if (error?.code === AxiosError.ECONNABORTED) {
    return Promise.reject({ ok: false, error: { message: instance.defaults.timeoutErrorMessage } })
  }
  return Promise.reject(error)
}
