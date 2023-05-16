import { useQuery } from '@tanstack/react-query'
import { getDuty } from '../api/admin'

export const useGetDuty = () => {
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
}

export interface DeActivatedDuty {
  data: {
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    content: DutyContent[]
  }
}
