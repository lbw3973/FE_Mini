import React from 'react'
import * as S from './style'
import { Pagination } from '@mui/material'

interface PagenationProps {
  page: number
  maxLength?: number
  pageChange: (e: React.ChangeEvent<unknown>, value: number) => void
}

function Pagenation({ page, maxLength = 1, pageChange }: PagenationProps) {
  return (
    <S.PagenationContainer>
      <Pagination count={maxLength} onChange={pageChange} page={page} />
    </S.PagenationContainer>
  )
}

export default Pagenation
