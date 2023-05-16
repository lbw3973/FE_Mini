import styled from '@emotion/styled'

export const Table = styled.table`
  width: 100%;
  margin-top: 40px;
  z-index: 300;

  thead {
    height: 60px;
    background-color: ${({ theme }) => theme.app.palette.green3};

    th {
      font-weight: 600;
      line-height: 60px;
    }
  }

  tbody {
    tr + tr {
      border-top: 1px solid ${({ theme }) => theme.app.palette.gray1};
    }

    td {
      height: 60px;
      text-align: center;
      line-height: 60px;
      input {
        vertical-align: middle;
      }
    }
  }
`
