import { ToastProps } from '..'
import * as S from './style'

export interface ToastTimeBarProps extends Pick<ToastProps, 'autoTimeout' | 'theme' | 'status'> {}

function ToastTimeBar({ autoTimeout, theme, status }: ToastTimeBarProps) {
  return (
    <S.Wrapper theme={theme}>
      <S.TimeBar autoTimeout={autoTimeout} theme={theme} status={status} />
    </S.Wrapper>
  )
}

export default ToastTimeBar
