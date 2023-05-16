import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import { ToastProps } from '.'

const slideDown = keyframes`
  from{
    transform: translateY(-40px);
  }
  to {
    transform: translateY(0);
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(40px);
  }
  to {
    transform: translateY(0);
  }
`

export const Container = styled.div<Omit<ToastProps, 'message'>>`
  box-sizing: border-box;
  display: flex;
  padding: 1.6rem 4rem;
  border-radius: 8px;
  z-index: 10;
  animation: ${({ position }) => (position === 'top' ? slideDown : slideUp)} 0.3s forwards;
  ${({ root, theme }) => {
    switch (root.id) {
      case 'page':
        return css`
          width: calc(100vw - ${theme.app.size.nav.width});
        `
      case 'root':
        return css`
          width: 100vw;
        `
      default:
        return css``
    }
  }}
  position: fixed;
  left: ${({ root }) => root?.getBoundingClientRect().left + 'px'};
  ${({ position, root }) => {
    if (position === 'top')
      return root.id === 'page'
        ? css`
            top: ${root.getBoundingClientRect().top + 'px'};
          `
        : css`
            top: 0;
          `
    if (position === 'bottom')
      return root.id === 'page'
        ? css`
            top: ${root.getBoundingClientRect().height + 'px'};
          `
        : css`
            bottom: 0;
          `

    return css``
  }}
`

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 6rem;
  border-radius: 8px;
  overflow: hidden;
`

export const Content = styled.div<Pick<ToastProps, 'status' | 'theme'>>`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;
  min-height: 2.5rem;
  height: max-content;
  font-size: ${({ theme }) => {
    return theme.app.size.font.small
  }};
  ${({ theme, status }) => {
    switch (status) {
      case 'success':
      case 'info':
        return css`
          background-color: ${theme.app.palette.green2};
        `
      case 'error':
        return css`
          background-color: ${theme.app.palette.orange};
        `
    }
  }};
`

export const ToastMessage = styled.div`
  max-width: 90%;
  word-break: keep-all;
`

export const CloseButton = styled(IconButton)`
  align-self: flex-start;
  padding: 2px;
`
