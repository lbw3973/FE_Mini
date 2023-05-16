import { useMutation } from '@tanstack/react-query'
import { acceptSignUp, rejectSignUp } from '../api/admin'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

export const useAcceptSignup = (Accept: boolean) => {
  const navigate = useNavigate()
  const post = Accept ? acceptSignUp : rejectSignUp

  const { mutate } = useMutation(post, {
    onSuccess: (data) => {
      console.log(data)
      // navigate('/admin/signup')
    },
    onError: (err: AxiosError) => {
      console.log(err)
    },
  })

  return mutate
}
