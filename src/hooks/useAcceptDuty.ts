import { useMutation } from '@tanstack/react-query'
import { acceptDuty, rejectDuty } from '../api/admin'
import { AxiosError } from 'axios'

export const useAcceptDuty = (Accept: boolean) => {
  const post = Accept ? acceptDuty : rejectDuty

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
