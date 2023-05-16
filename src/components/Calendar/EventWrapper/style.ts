import styled from '@emotion/styled'

export const EventWrapper = styled.div`
  margin-bottom: 2px;
  padding: 2px;

  &.duty {
    background-color: ${({ theme }) => theme.app.palette.green2};
    border: 1px solid ${({ theme }) => theme.app.palette.green4};
  }

  &.vacation {
    background-color: ${({ theme }) => theme.app.palette.yellow2};
    border: 1px solid ${({ theme }) => theme.app.palette.yellow1};
  }
`
