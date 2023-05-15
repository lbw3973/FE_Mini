import React from 'react'
import * as S from './style'

interface TableProps {
  children: React.ReactElement | React.ReactElement[]
}

function Table({ children }: TableProps) {
  return <S.Table>{children}</S.Table>
}

export default Table
