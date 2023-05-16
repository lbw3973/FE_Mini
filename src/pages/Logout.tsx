import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { removeCookie } from '../util'
import { useNavigate } from 'react-router-dom'
import LinearProgress, { getLinearProgressUtilityClass } from '@mui/material/LinearProgress'
import { useTheme } from '@mui/material'
import { setUser, useAccessTokenInfo } from '../store/slices/userSlice'

const LogoutLinearProgress = styled(LinearProgress)`
  .${getLinearProgressUtilityClass('bar')} {
    background-color: ${({ theme }) => theme.app.palette.green1};
  }

  margin-bottom: 20px;
`

const LogoutProgressMessage = styled.div`
  text-align: center;
`

function Logout() {
  const { dispatch } = useAccessTokenInfo()
  const theme = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')

    return () => {
      removeCookie('accessToken', { path: '/' })

      dispatch(setUser(null))
    }
  }, []) /* eslint-disable-line */

  return (
    <div>
      <LogoutLinearProgress sx={{ height: '0.4rem', borderRadius: '8px', backgroundColor: theme.app.palette.gray2 }} />
      <LogoutProgressMessage>Logout 중입니다. 잠시만 기다려 주세요</LogoutProgressMessage>
    </div>
  )
}

export default Logout
