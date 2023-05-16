import { useMutation } from '@tanstack/react-query'
import { acceptVacation, rejectVacation } from '../api/admin'
import { AxiosError } from 'axios'

export const useAcceptVacation = (Accept: boolean) => {
  const post = Accept ? acceptVacation : rejectVacation

  const { mutate } = useMutation(post, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (err: AxiosError) => {
      console.log(err)
    },
  })

  return mutate
}
