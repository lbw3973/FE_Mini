import styled from '@emotion/styled'

export const PositionForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  gap: 12px;
  padding: 0 40px;
  height: 60px;
  background-color: ${({ theme }) => theme.app.palette.green3};
  border-radius: 5px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;

    &.position {
      margin-right: 8px;
    }

    input {
      flex-grow: 1;
      width: 100%;
    }
  }
`
