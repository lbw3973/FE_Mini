import { useMutation } from '@tanstack/react-query'
import { acceptSignUp, rejectSignUp } from '../api/admin'
import { AxiosError } from 'axios'

export const useAcceptSignup = (Accept: boolean) => {
  const post = Accept ? acceptSignUp : rejectSignUp

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
