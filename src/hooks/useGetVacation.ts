import { useQuery } from '@tanstack/react-query'
import { getVacation } from '../api/admin'

export const useGetVacation = () => {
  const { data: vacations } = useQuery({ queryKey: ['vacations'], queryFn: getVacation })
  return { vacations }
}
