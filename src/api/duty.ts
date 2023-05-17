import { instance } from './instance'

export const getDuty = async (month: number) => {
  const res = await instance.get(`/api/v1/duty/list/${month}`)
  return res.data.data
}
export async function fetchDutyList() {
  const res = await instance.get('/api/v1/duty/mylist')
  return res.data.data
}

export async function postModifyDuty({ id, day }) {
  const res = await instance.post('/api/v1/duty/modify', {
    id,
    day,
  })
  return res
}
