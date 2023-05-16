import { useEffect, useState } from 'react'
import Toast, { ToastProps } from '../components/Toast'
import { useTheme } from '@mui/material'
import { createRoot } from 'react-dom/client'

type ToastRootSelector = '#page' | '#root'

interface ToastHookOptions extends Omit<ToastProps, 'theme' | 'root' | 'message'> {
  autoClose?: boolean
  rootSelector?: ToastRootSelector
}

/**
 * 토스트를 렌더링하기 위한 커스텀 훅
 *
 * ```ts
 *  // 기본 사용법
 *  const { showToast } = useToast('toast message', ToastHookOptions);
 *
 *  showToast();
 * ```
 *
 * @param {string} message (필수) 토스트에 표시할 메시지
 * @param {ToastHookOptions} ToastHookOptions
 * `autoClose` 일정시간 뒤 자동 언마운트 (기본 `true`)
 *
 * `autoTimeout` 자동으로 사라지는 시간(ms, 기본 `3000`)
 *
 * `timebar` timebar 렌더링 유무 (기본 `true`)
 *
 * `rootSelector` 토스트 root 선택자 (`#page` | `#root`, 기본 `#page`)
 *
 * `position` 토스트 팝업 위치 (`top` | `bottom`, 기본 `top`)
 *
 * `status` 토스트 상태(테마) (`info` | `success` | `error`, 기본 `info`)
 *
 * `onCloseClick` 닫기 버튼 클릭했을 때 실행되는 이벤트 함수
 *
 * `onClose` 토스트 컴포넌트가 언마운트될 때 실행되는 함수
 * @returns
 */
export function useToast(
  message: string,
  {
    autoClose = true,
    autoTimeout = 3000,
    timebar = true,
    rootSelector = '#page',
    position = 'top',
    status = 'info',
    onCloseClick,
    onClose,
  }: ToastHookOptions = {},
) {
  const [mounted, setMounted] = useState(false)
  const theme = useTheme()
  const root = document.querySelector(rootSelector)

  function showToast() {
    if (!mounted) return
    if (!root) return

    const toastWrapper = document.createElement('div')
    root.appendChild(toastWrapper)

    const toastRoot = createRoot(toastWrapper)

    toastRoot.render(
      <Toast
        theme={theme}
        root={root}
        status={status}
        position={position}
        timebar={timebar}
        autoTimeout={autoTimeout}
        message={message}
        onCloseClick={(e) => {
          onCloseClick && onCloseClick(e)

          toastRoot.unmount()
          root.removeChild(toastWrapper)
        }}
        onClose={onClose}
      />,
    )

    if (autoClose) {
      Promise.resolve(
        setTimeout(() => {
          if (!toastWrapper.hasChildNodes()) return

          toastRoot.unmount()
          root.removeChild(toastWrapper)
        }, autoTimeout),
      )
    }
  }

  useEffect(() => {
    if (!mounted) setMounted(true)
  }, []) /* eslint-disable-line */

  return { showToast }
}
