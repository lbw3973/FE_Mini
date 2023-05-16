import styled from '@emotion/styled'

export const Container = styled.div`
  height: 175px;
  margin: 10px 0;
  background-color: ${({ theme }) => theme.app.palette.green3};
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 30px;
  padding: 20px;
  cursor: pointer;

  input {
    width: 25px;
  }
  img {
    width: 120px;
    height: 120px;
  }
`

export const UserInfo = styled.div`
  width: 200px;
  height: 100px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .userName {
    font-size: ${({ theme }) => theme.app.size.font.large};
    font-weight: bold;
  }

  .userEmail {
    font-size: ${({ theme }) => theme.app.size.font.medium};
  }
`

export const UserDetail = styled.div`
  width: 600px;
  height: 120px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr;

  div {
    margin: auto 0;
    font-size: ${({ theme }) => theme.app.size.font.medium};
  }
`
