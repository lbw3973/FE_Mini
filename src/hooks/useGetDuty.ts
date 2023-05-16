import { useQuery } from '@tanstack/react-query'
import { getDuty, getTeamDuty } from '../api/admin'

export const useGetDuty = (role: string | undefined) => {
  // const getFunc = role === 'ADMIN' ? getDuty : getTeamDuty
  // console.log(getFunc)
  const { data } = useQuery<any, unknown, DeActivatedDuty, any>({ queryKey: ['duty'], queryFn: getDuty })
  return { data }
}

export interface DutyContent {
  createdAt: Date
  departmentName: string
  day: string
  id: string
  memberName: string
  status: string
  positionName: string
  employeeNumber: string
}

export interface DeActivatedDuty {
  data: {
    total: number
    first: boolean
    last: boolean
    content: DutyContent[]
  }
}
