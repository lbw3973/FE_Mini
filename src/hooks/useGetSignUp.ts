import { useQuery } from '@tanstack/react-query'
import { getSignUp } from '../api/admin'

export const useGetSignUp = () => {
  const { data: signup } = useQuery({ queryKey: ['signUp'], queryFn: getSignUp })
  return { signup }
}
