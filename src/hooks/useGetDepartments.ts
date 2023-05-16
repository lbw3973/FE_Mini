import { useQuery } from '@tanstack/react-query'
import { getDepartments } from '../api/department'

export const useGetDepartments = () => {
  const { data } = useQuery(['department'], getDepartments)
  return data
}
