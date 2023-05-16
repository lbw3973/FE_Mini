import styled from '@emotion/styled'

export const EditUserContainer = styled.div`
  cursor: default;

  .fixedData {
    display: flex;
    align-items: center;

    img {
      display: block;
      width: 50px;
      height: 50px;
    }
    .name {
      font-size: ${({ theme }) => theme.app.size.font.large};
      font-weight: 600;
      padding: 0 5px 0 15px;
    }
    .username {
      color: ${({ theme }) => theme.app.palette.gray1};
      font-size: ${({ theme }) => theme.app.size.font.medium};
      font-weight: 600px;
    }
  }

  .edit-user-form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 25px 0;
    /* border-top: 1px solid ${({ theme }) => theme.app.palette.gray1}; */
    border-bottom: 1px solid ${({ theme }) => theme.app.palette.gray1};

    .inputs {
      display: grid;
      gap: 10px;
      grid-template-columns: auto 1fr auto 1fr;

      label {
        display: block;
        align-self: center;
        width: 60px;
        text-align: right;
      }

      input,
      select {
        margin-right: 35px;
      }
    }

    button {
      width: 80px;
      margin-top: 25px;
    }
  }

  .edit-role {
    padding: 25px 0 0;

    .editor-toggle {
      display: flex;
      gap: 10px;
      font-size: ${({ theme }) => theme.app.size.font.small};

      p {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 600;
        cursor: pointer;

        .icon {
          font-size: 12px;
        }
      }
      .warn {
        color: ${({ theme }) => theme.app.palette.orange};
      }
    }

    .now-role {
      display: flex;
      justify-content: center;
      padding-top: 25px;
      font-size: ${({ theme }) => theme.app.size.font.small};

      table {
        text-align: center;

        th,
        td {
          padding: 8px 25px;
          border: 1px solid ${({ theme }) => theme.app.palette.gray1};
        }
        th {
          background-color: ${({ theme }) => theme.app.palette.green2};
        }
      }
    }

    .selet-role {
      display: flex;
      justify-content: center;
      position: relative;
      gap: 150px;
      padding: 20px 80px 0 0;

      div {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      button {
        position: absolute;
        right: 0px;
        top: 25px;
        width: 80px;
      }
    }
  }
`
