import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const ProfilePage = styled.div`
  width: 100%;
  position: relative;
  overflow: auto;
`

export const ProfilesContainer = styled.div`
  display: flex;
  height: 100%;
`

export const ProfileContainer = styled.div`
  width: 500px;
  height: 700px;
  background: #ecf2f3;
  padding: 5%;
  margin: 30px;
  position: relative;
`

export const ProfileChangeContainer = styled(ProfileContainer)`
  animation: ${fadeIn} 0.3s forwards;
`

export const Authority = styled.div`
  position: absolute;
  right: 5%;
  color: ${({ theme }) => theme.app.palette.gray1};
`

export const Detail = styled.div`
  font-size: ${({ theme }) => theme.app.size.font.medium};
`
export const UserDetailContainer = styled.div`
  height: 100px;
  line-height: 1.7;
  margin: 20px 0 40px;
`

export const Name = styled.h4`
  font-size: ${({ theme }) => theme.app.size.font.large};
  font-weight: 600;
`

export const UserCompanyDetail = styled.div`
  height: 100px;
  line-height: 1.9;
`

export const ButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`

export const FormContainer = styled.div`
  display: flex;
  height: 250px;
  width: 100%;
  margin: 10px 0 0;
`

export const InputWrapper = styled.div`
  height: 80px;
  width: 150px;
  display: flex;
  flex-direction: column;
  margin: 5px;
`

export const Notice = styled.div`
  color: ${({ theme }) => theme.app.palette.gray1};
  text-align: center;
  height: 40px;
`

export const Form = styled.div`
  height: 200px;
`
