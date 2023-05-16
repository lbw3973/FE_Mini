import { useMutation, useQueryClient } from '@tanstack/react-query'
import { acceptDuty, rejectDuty } from '../api/admin'
import { AxiosError } from 'axios'

export const useAcceptDuty = (Accept: boolean) => {
  const queryClient = useQueryClient()
  const post = Accept ? acceptDuty : rejectDuty

  const { mutate } = useMutation(post, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries(['duty'])
    },
    onError: (err: AxiosError) => {
      console.log(err)
    },
  })

  return mutate
}
