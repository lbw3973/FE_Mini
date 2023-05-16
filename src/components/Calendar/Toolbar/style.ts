import styled from '@emotion/styled'

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;

  .center {
    display: flex;
    align-items: center;

    .arrow {
      border: none;
      width: 20px;
      height: 20px;
      line-height: 1;
      padding: 0;
    }

    .today {
      width: fit-content;
      margin: 0 20px;
      padding: 3px 10px;
    }

    .rbc-toolbar-label {
      font-size: ${({ theme }) => theme.app.size.font.large};
      font-weight: 600;
      margin-bottom: 5px;
    }
  }

  .rbc-btn-group {
    button {
      font-size: 12px;

      &:hover {
        background-color: ${({ theme }) => theme.app.palette.gray2};
      }
    }

    .rbc-btn {
      font-size: 12px;

      &:hover {
        background-color: ${({ theme }) => theme.app.palette.gray2};
      }
    }
  }

  .guide {
    display: flex;
    gap: 15px;
    margin-right: 25px;

    span {
      display: flex;
      align-items: center;
      gap: 5px;

      &::before {
        display: block;
        width: 16px;
        height: 16px;
        background-color: red;
        content: '';
      }

      &.duty::before {
        background-color: ${({ theme }) => theme.app.palette.green2};
        border: 1px solid ${({ theme }) => theme.app.palette.green4};
      }
      &.vacation::before {
        background-color: ${({ theme }) => theme.app.palette.yellow2};
        border: 1px solid ${({ theme }) => theme.app.palette.yellow1};
      }
    }
  }
`
