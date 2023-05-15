import { AxiosResponse } from 'axios'

export const getTokensFromResponse = (res: AxiosResponse) => {
  const headers = res.headers

  const accessToken = headers['authorization']

  return {
    accessToken: accessToken ? (accessToken as string).split(' ')[1] : '',
  }
}
