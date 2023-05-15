import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 8rem;
`

export const TextInput = styled(TextField)`
  vertical-align: top;
  box-sizing: border-box;

  input {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
  }
`
