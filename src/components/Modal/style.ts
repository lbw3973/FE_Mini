import styled from '@emotion/styled'

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  z-index: 5;
`

export const ModalContainer = styled.div`
  padding: 40px 60px;
  background-color: #fff;
  border-radius: 5px;
`
