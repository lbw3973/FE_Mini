import Box from '@mui/material/Box'
import styled from '@emotion/styled'

export const MaterialBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${({ theme }) => theme.app.palette.white};
  border: 2px solid #000;
  border-radius: 8px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2);
  padding: 32px;

  h2,
  p {
    font-family: ${({ theme }) => theme.app.typography.fontFamily};
  }
`
