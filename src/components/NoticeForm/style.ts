import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { NoticeFormProps } from '.'
import { darken } from '@mui/material'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const NoticeContent = styled.div`
  flex: 1;
  display: flex;
  padding-top: 2rem;
  flex-direction: column;
  align-items: center;
  word-break: keep-all;
  gap: 20px;
`

export const Icon = styled.div<Pick<NoticeFormProps, 'noticeType'>>`
  font-size: 5rem;
  ${({ noticeType, theme }) => {
    switch (noticeType) {
      case 'notAllow':
        return css`
          color: ${theme.app.palette.red};
        `
      case 'warn':
        return css`
          color: #fcd00a;
        `
      case 'info':
      default:
        return css`
          color: ${theme.app.palette.gray1};
        `
    }
  }}
`
