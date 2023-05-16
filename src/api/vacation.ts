import { instance } from './instance'
import { VacationData, DutyData } from './type'
export const getVacation = async (month: number) => {
  const res = await instance.get(`/api/v1/vacation/list/${month}`)
  return res.data.data
}

export const deleteVacation = async (id: number) => {
  const res = await instance.post(`api/v1/vacation/delete/${id}`)
  return res
}

export const applyVacation = async ({ start, end }: VacationData) => {
  const { status } = await instance.post('/api/v1/vacation/save', {
    start,
    end,
  })
  if (status !== 200) {
    throw new Error('')
  }
}

export const applyDuty = async ({ username, day }: DutyData) => {
  const { status } = await instance.post('/api/v1/duty/save', {
    username,
    day,
  })
  if (status !== 200) {
    throw new Error('')
  }
}

export async function fetchVacationList() {
  try {
    const res = await instance.get('/api/v1/vacation/list')

    return res.data
  } catch (e) {
    console.log(e)
  }
}

export async function postModifyVacation({ id, start, end }) {
  const { status } = await instance.post(`/api/v1/vacation/modify`, {
    id,
    start,
    end,
  })
  if (status == 200) {
    alert('연차가 성공적으로 수정 신청되었습니다')
  } else {
    alert('오류가 발생했습니다. 다시 시도해주세요')
  }
}
