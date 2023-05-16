import { instance } from './instance'
import { SearchUserReq, RoleMutateReq, ModifyUserReq } from './type'

export const getVacation = async () => {
  const res = await instance.get(`/api/v1/vacation/list/0`)
  return res.data
}

export const getDuty = async () => {
  const res = await instance.get(`/api/v1/duty/list/0`)
  return res.data
}

export const acceptVacation = async (id: string) => {
  const res = await instance.post(`/api/v1/vacation/ok/${id}`)
  return res.data
}

export const rejectVacation = async (id: string) => {
  const res = await instance.post(`/api/v1/vacation/rejected/${id}`)
  return res.data
}

export const acceptDuty = async (id: string) => {
  const res = await instance.post(`/api/v1/duty/ok/${id}`)
  return res.data
}

export const rejectDuty = async (id: string) => {
  const res = await instance.post(`/api/v1/duty/rejected/${id}`)
  return res.data
}

export const getSignUp = async () => {
  const res = await instance.get(`/api/v1/member/admin/deactivation/list`)
  return res.data
}

export const acceptSignUp = async (username: string) => {
  const res = await instance.post(`/api/v1/member/admin/active`, { username, memberStatus: 'ACTIVATION' })
  return res.data
}
export const rejectSignUp = async (username: string) => {
  const res = await instance.post(`/api/v1/member/admin/active`, { username, memberStatus: 'DEACTIVATION' })
  return res.data
}

export const changeRole = async (data: RoleMutateReq) => {
  const res = await instance.post('/api/v1/member/admin/role/modify', data)
  return res.data
}

export const searchUser = async ({ type, keyword, page }: SearchUserReq) => {
  const res = await instance.get(`/api/v1/member/page/search?text=${type}&keyword=${keyword}&page=${page}&size=10`)
  return res.data
}

export const modifyUser = async (modifiedUser: ModifyUserReq) => {
  const res = await instance.post('/api/v1/member/admin/modify', modifiedUser)
  return res.data
}
