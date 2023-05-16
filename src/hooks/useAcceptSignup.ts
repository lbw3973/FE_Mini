import { useMutation, useQueryClient } from '@tanstack/react-query'
import { acceptSignUp, rejectSignUp } from '../api/admin'
import { AxiosError } from 'axios'

export const useAcceptSignup = (Accept: boolean) => {
  const queryClient = useQueryClient()
  const post = Accept ? acceptSignUp : rejectSignUp

  const { mutate } = useMutation(post, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries(['signUp'])
    },
    onError: (err: AxiosError) => {
      console.log(err)
    },
  })

  return mutate
}
