import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { ToastTimeBarProps } from '.'

const timebarFadeOut = keyframes`
  from {
    width: 100%
  }
  to {
    width: 0
  }
`

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.app.palette.gray2};
`

export const TimeBar = styled.div<ToastTimeBarProps>`
  height: 0.25rem;
  animation: ${timebarFadeOut} ${({ autoTimeout }) => `${autoTimeout}ms`} linear forwards;
  background-color: ${({ theme, status }) => (status === 'error' ? '#e32f22' : theme.app.palette.green1)};
`
