import React, { useState } from 'react'
import { PositionEntity } from '../../types/position'

interface PositionItemProps {
  position: PositionEntity
  onEdit: (positionName: string, vacation: number) => void
  onDelete: (positionName: string) => void
}

function PositionListItem({ position, onEdit, onDelete }: PositionItemProps) {
  const [vacationInput, setVacationInput] = useState(position.vacation)
  const [isEdit, setIsEdit] = useState(false)

  const clickEditButton = () => {
    if (isEdit) {
      setVacationInput(position.vacation)
    }
    setIsEdit((prev) => !prev)
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVacationInput(Number(e.target.value))
  }

  const handleConfirmEdit = () => {
    onEdit(position.positionName, vacationInput)
    setIsEdit(false)
  }

  return (
    <li className="row">
      <span>{position.positionName}</span>
      {isEdit ? (
        <>
          <input name="vacation" type="number" onChange={inputChangeHandler} value={vacationInput} />
        </>
      ) : (
        <>
          <span>{position.vacation}</span>
        </>
      )}

      <span className="edit btn" onClick={clickEditButton}>
        {isEdit ? '수정취소' : '수정'}
      </span>
      {isEdit ? (
        <span className="confirm btn" onClick={handleConfirmEdit}>
          수정완료
        </span>
      ) : (
        <span
          className="delete btn"
          onClick={() => {
            onDelete(position.positionName)
          }}
        >
          삭제
        </span>
      )}
    </li>
  )
}

export default PositionListItem
