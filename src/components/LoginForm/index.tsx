import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { getCookie } from '../../util/cookies'
import { useTheme } from '@mui/material'
import Button from '../Button'
import * as S from './style'
import { jwtDecode } from '../../util/jwt'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '../../hooks'
import { LoginRequestDto } from '../../types/Dto/loginRequest.dto'
import { login } from '../../api/auth'
import { UserActionPayload, setUser, useAccessTokenInfo } from '../../store/slices/userSlice'

function LoginForm() {
  const theme = useTheme()
  const { dispatch } = useAccessTokenInfo()

  const { showToast } = useToast('등록된 아이디가 아니거나 일치하는 유저가 없습니다')

  const { mutate } = useMutation((loginForm: LoginRequestDto) => login(loginForm), {
    onSuccess: (_) => {
      const token = getCookie('accessToken')

      dispatch(setUser(jwtDecode(token) as UserActionPayload))
    },
    onError: (_) => showToast(),
  })

  const { register, handleSubmit } = useForm<LoginRequestDto>()

  const onSubmit: SubmitHandler<LoginRequestDto> = async (data) => {
    console.log({ data })

    mutate({ username: data?.username, password: data?.password })
  }

  const onInvalid: SubmitErrorHandler<LoginRequestDto> = (error) => {
    console.log({ error })
  }

  return (
    <form style={{ display: 'flex', marginLeft: '20px', gap: '12px' }} onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <S.InputGroup>
        <label htmlFor="user-email">ID</label>
        <S.TextInput
          id="user-email"
          size="small"
          variant="outlined"
          {...register('username', { required: 'username is required' })}
        />
      </S.InputGroup>
      <S.InputGroup>
        <label htmlFor="user-password">PW</label>
        <S.TextInput
          id="user-password"
          size="small"
          type="password"
          variant="outlined"
          {...register('password', { required: 'password is required' })}
        />
      </S.InputGroup>
      <Button
        type="submit"
        variant="contained"
        bg={theme.app.palette.green1}
        fontcolor={theme.app.palette.white}
        style={{ paddingTop: '0.2rem', paddingBottom: '0.2rem' }}
      >
        Login
      </Button>
    </form>
  )
}

export default LoginForm
