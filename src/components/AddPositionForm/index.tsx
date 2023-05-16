import * as S from './style'
import React from 'react'
import { useTheme } from '@mui/material'
import Button from '../Button'

interface PositionProps {
  type: 'POSITION' | 'DEPARTMENT'
  addMutate: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputValue: {
    name: string
    vacation: number
  }
}

function AddPositionForm({ type, addMutate, onChange, inputValue }: PositionProps) {
  const theme = useTheme()

  return (
    <S.PositionForm>
      <label htmlFor="name" className="name">
        <span>{type === 'POSITION' ? '직급명' : '부서명'}</span>
        <input name="name" type="text" id="name" onChange={onChange} value={inputValue.name} />
      </label>

      <label htmlFor="vacation" className="vacation">
        <span>{type === 'POSITION' ? '연차제한' : '일일연차제한'}</span>
        <input name="vacation" type="number" id="vacation" onChange={onChange} value={inputValue.vacation} />
      </label>
      <Button bg={theme.app.palette.green1} fontcolor={theme.app.palette.white} onClick={() => addMutate()}>
        추가
      </Button>
    </S.PositionForm>
  )
}

export default AddPositionForm
