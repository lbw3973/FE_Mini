import React from 'react'
import * as S from './style'

interface ModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  ModalHandler: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ ModalHandler, children, ...props }: ModalProps) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      ModalHandler(false)
    }
  }

  return (
    <S.ModalBackground onClick={(e) => closeModal(e)}>
      <S.ModalContainer {...props}>{children}</S.ModalContainer>
    </S.ModalBackground>
  )
}

export default Modal
