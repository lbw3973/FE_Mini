import { useMutation, useQueryClient } from '@tanstack/react-query'
import { acceptVacation, rejectVacation } from '../api/admin'
import { AxiosError } from 'axios'

export const useAcceptVacation = (Accept: boolean) => {
  const queryClient = useQueryClient()
  const post = Accept ? acceptVacation : rejectVacation

  const { mutate } = useMutation(post, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries(['vacations'])
    },
    onError: (err: AxiosError) => {
      console.log(err)
    },
  })

  return mutate
}
