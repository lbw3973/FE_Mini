import { useQuery } from '@tanstack/react-query'
import { getDuty } from '../api/duty'

export const useGetDuty = (month: number) => {
  const { data: duty } = useQuery(['duty', `${month}`], () => getDuty(month))
  return { duty }
}
