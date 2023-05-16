import { useMutation } from '@tanstack/react-query'
import { acceptVacation, rejectVacation } from '../api/admin'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

export const useAcceptVacation = (Accept: boolean) => {
  const navigate = useNavigate()
  const post = Accept ? acceptVacation : rejectVacation

  const { mutate } = useMutation(post, {
    onSuccess: (data) => {
      console.log(data)
      // navigate('/admin/vacation')
    },
    onError: (err: AxiosError) => {
      console.log(err)
    },
  })

  return mutate
}
