import styled from '@emotion/styled'
import MaterialButton from '@mui/material/Button'

export const SignUpBtn = styled(MaterialButton)`
  max-width: 500px;
  height: 500px;
  border-color: ${({ theme }) => theme.app.palette.green1};
  &:hover {
    color: ${({ theme }) => theme.app.palette.white};
    background-color: ${({ theme }) => theme.app.palette.green1};
  }
`
export const IdCheck = styled.button`
  background-color: ${({ theme }) => theme.app.palette.gray1};
  border: none;
  width: 80px;
  /* height: 35px; */
  font-size: 20px;
  /* margin-left: 50px; */
  text-align: center;
  border-radius: 3px;
  font-weight: 700;
  min-width: 92px;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: #c8c8c8;
  }
`
export const BasicInfo = styled.div`
  margin-bottom: 25px;
  font-size: ${({ theme }) => theme.app.size.font.huge};
  font-weight: 600;
  text-align: center;
  padding-top: 60px;
`
export const SignUpWrapper = styled.div`
  background-color: ${({ theme }) => theme.app.palette.green3};
  padding: 0 50px 0 50px;
  margin: 0 70px 0 70px;
`
export const BasicInfoWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.app.palette.gray1};
  padding-bottom: 60px;
`
export const BasicInfoFieldWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 50px;
  box-sizing: border-box;
`
export const InfoFieldLeft = styled.div`
  display: flex;
  flex: 1;
  flex-basis: 50%;
  flex-direction: column;
`
export const InfoFieldRight = styled.div`
  display: flex;
  flex: 1;
  flex-basis: 50%;
  flex-direction: column;
`
export const EmployeeInfoWrapper = styled.div`
  padding-bottom: 25px;
  padding-top: 60px;
`
export const EmployeeInfo = styled.div`
  margin-bottom: 25px;
  font-size: ${({ theme }) => theme.app.size.font.huge};
  font-weight: 600;
  text-align: center;
  padding-top: 20px;
`
export const EmployeeFieldWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 50px;
  box-sizing: border-box;
`
export const EmployeeFieldLeft = styled.div`
  display: flex;
  flex: 1;
  flex-basis: 50%;
  flex-direction: column;
`

export const EmployeeFieldRight = styled.div`
  display: flex;
  flex: 1;
  flex-basis: 50%;
  flex-direction: column;
`
export const SubmitBtn = styled.button`
  width: 380px;
  height: 70px;
  margin-left: 75px;
  font-size: ${({ theme }) => theme.app.size.font.huge};
  background-color: ${({ theme }) => theme.app.palette.green1};
  color: ${({ theme }) => theme.app.palette.white};
  border: none;
  border-radius: 5px;
  margin-top: 130px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.app.palette.white};
    background-color: #06a334d9;
  }
`
