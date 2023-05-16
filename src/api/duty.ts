import { instance } from './instance'

export const getDuty = async (month: number) => {
  const res = await instance.get(`/api/v1/duty/list/${month}`)
  return res.data.data
}
