import { instance } from './instance'

export const getVacation = async (month: number) => {
  const res = await instance.get(`/api/v1/vacation/list/${month}`)
  return res.data.data
}

export const deleteVacation = async (id: number) => {
  const res = await instance.post(`api/v1/vacation/delete/${id}`)
  return res
}
