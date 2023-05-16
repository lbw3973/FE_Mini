import { useQuery } from '@tanstack/react-query'
import { getVacation } from '../api/admin'

export const useGetVacation = () => {
  const { data } = useQuery<any, unknown, DeActivatedVacation, any>({
    queryKey: ['vacations'],
    queryFn: getVacation,
  })
  return { data }
}

export interface VacationContent {
  createdAt: Date
  departmentName: string
  end: string
  id: string
  memberName: string
  positionName: null
  start: string
  status: string
}

export interface DeActivatedVacation {
  data: {
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    content: VacationContent[]
  }
}
