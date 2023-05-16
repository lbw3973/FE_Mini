import { ApiResponse } from '../types/response'
import { User } from '../types/user'
import { API_URL } from './constants'
import { instance } from './instance'

export async function getUserDetail() {
  const res = await instance.get(API_URL.v1.getUserDetail)

  return res.data as ApiResponse<User>
}
