import { css } from '@emotion/react'
import styled from '@emotion/styled'
import MaterialButton from '@mui/material/Button'
import { ButtonProps } from './index'
import { darken } from '@mui/material/styles'

export const Button = styled(MaterialButton)<ButtonProps>`
  white-space: nowrap;

  ${({ bg }) =>
    bg
      ? css`
          background-color: ${bg};
          &:hover {
            background-color: ${darken(bg, 0.2)};
          }
        `
      : css``}
  ${({ fontcolor }) =>
    fontcolor
      ? css`
          color: ${fontcolor};
        `
      : css``}
`
