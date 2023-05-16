import styled from '@emotion/styled'
import Button from '@mui/material/Button'

export const AvatarWrapper = styled.div`
  display: flex;
  gap: 12px;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const DepartmentAndPosition = styled.div`
  font-size: ${({ theme }) => theme.app.size.font.small};
  color: ${({ theme }) => theme.app.palette.gray1};
`

export const LoginArea = styled.div`
  display: flex;
`

export const RegisterButton = styled(Button)`
  box-sizing: border-box;
  height: 100%;
  padding-top: 0;
  padding-bottom: 0.2rem;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.app.palette.gray1};
`
