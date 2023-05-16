import React, { useEffect } from 'react'
import { Theme } from '@mui/material'
import { IoCloseOutline } from 'react-icons/io5'
import ToastTimeBar from './TimeBar'
import * as S from './style'

type ToastPosition = 'top' | 'bottom'
type ToastStatus = 'success' | 'error' | 'info'

export interface ToastProps {
  theme: Theme
  root: Element
  position?: ToastPosition
  status?: ToastStatus
  autoTimeout?: number
  timebar?: boolean
  message: string
  onCloseClick?: (e: React.MouseEvent) => void
  onClose?: () => void
}

function Toast({ autoTimeout, timebar, root, position, status, message, theme, onCloseClick, onClose }: ToastProps) {
  useEffect(() => {
    return () => {
      onClose && onClose()
    }
  }, []) /* eslint-disable-line */

  return (
    <S.Container theme={theme} root={root} position={position}>
      <S.Wrapper>
        {timebar ? <ToastTimeBar theme={theme} autoTimeout={autoTimeout} status={status} /> : null}
        <S.Content theme={theme} status={status}>
          <S.ToastMessage>{message}</S.ToastMessage>
          <S.CloseButton size="small" onClick={onCloseClick}>
            <IoCloseOutline />
          </S.CloseButton>
        </S.Content>
      </S.Wrapper>
    </S.Container>
  )
}

export default Toast
