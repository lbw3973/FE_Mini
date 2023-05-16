import styled from '@emotion/styled'

export const ModifyForm = styled.div`
  line-height: 1.4;

  h2 {
    font-size: ${({ theme }) => theme.app.size.font.medium};
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }

  .row {
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 0 20px 8px;
  }

  .date {
    display: flex;
    gap: 20px;
    padding: 8px 20px;
    background-color: ${({ theme }) => theme.app.palette.green3};
    border-radius: 5px;
  }

  .confirm {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
`
