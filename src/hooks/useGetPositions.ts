import { useQuery } from '@tanstack/react-query'
import { getPositions } from '../api/position'

export const useGetPositions = () => {
  const { data } = useQuery(['position'], getPositions)
  return data
}
