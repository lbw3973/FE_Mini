import { useQuery } from '@tanstack/react-query'
import { getDuty } from '../api/admin'

export const useGetDuty = () => {
  const { data: duty } = useQuery({ queryKey: ['duty'], queryFn: getDuty })
  return { duty }
}
