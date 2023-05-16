import { useQuery } from '@tanstack/react-query'
import { getSignUp } from '../api/admin'

export const useGetSignUp = () => {
  const { data: signup } = useQuery<any, unknown, DeActivatedUser, any>({ queryKey: ['signUp'], queryFn: getSignUp })
  return { signup }
}

export interface DeActivatedUser {
  data: {
    total: number
    first: boolean
    last: boolean
    content: DeActivatedContent[]
  }
}

export interface DeActivatedContent {
  birthDate: string
  departmentName: string
  email: string
  employeeNumber: string
  fileName: string
  joiningDay: string
  name: string
  password: string
  phoneNumber: string
  positionName: string
  role: string
  updatedAt: string
  username: string
  years: number
}
