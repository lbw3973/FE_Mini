import * as S from './style'
import { useTheme } from '@mui/material'
import Button from '../Button'
import AcceptModal from '../AcceptModal'
import React, { useState } from 'react'
import { useToast } from '../../hooks'

function AcceptButtons({
  PositiveMsg,
  NegativeMsg,
  acceptFunc,
  rejectFunc,
  checkItems,
}: {
  PositiveMsg: string
  NegativeMsg: string
  acceptFunc: (id?: string) => void
  rejectFunc: (id?: string) => void
  checkItems: string[] | number[]
}) {
  const { showToast } = useToast('선택된 아이템이 없습니다', { position: 'bottom' })
  const theme = useTheme()
  const [modalMsg, setModalMsg] = useState('')
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement
    if (checkItems.length === 0) {
      showToast()
    } else {
      setModalMsg(target.id === 'Accept' ? PositiveMsg : NegativeMsg)
      setOpen(true)
    }
  }

  return (
    <>
      <S.ButtonContainer>
        <Button
          id="Accept"
          bg={theme.app.palette.green1}
          fontcolor={theme.app.palette.white}
          sx={{ width: '150px' }}
          onClick={handleClick}
        >
          {PositiveMsg}
        </Button>
        <Button
          id="Reject"
          bg={theme.app.palette.red}
          fontcolor={theme.app.palette.white}
          sx={{ width: '150px' }}
          onClick={handleClick}
        >
          {NegativeMsg}
        </Button>
      </S.ButtonContainer>
      <AcceptModal
        open={open}
        handleClose={handleClose}
        modalMsg={modalMsg}
        acceptFunc={acceptFunc}
        rejectFunc={rejectFunc}
        checkItems={checkItems}
      />
    </>
  )
}

export default AcceptButtons
