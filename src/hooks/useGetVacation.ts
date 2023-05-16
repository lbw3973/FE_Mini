import { useQuery } from '@tanstack/react-query'
import { getTeamVacation, getVacation } from '../api/admin'

export const useGetVacation = (role: string | undefined) => {
  // const getFunc = role === 'ADMIN' ? getVacation : getTeamVacation
  // console.log(getFunc)
  const { data } = useQuery<any, unknown, DeActivatedVacation, any>({
    queryKey: ['vacations'],
    queryFn: getVacation,
  })
  return { data }
}

export interface VacationContent {
  createdAt: Date
  departmentName: string
  employeeNumber: string
  end: string
  id: string
  memberName: string
  positionName: null
  start: string
  status: string
}

export interface DeActivatedVacation {
  data: {
    total: number
    first: boolean
    last: boolean
    content: VacationContent[]
  }
}
