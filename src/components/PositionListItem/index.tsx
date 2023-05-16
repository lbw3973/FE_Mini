import React, { useState } from 'react'
import { PositionEntity } from '../../types/position'
import { useModifyPosition } from '../../hooks/useModifyPosition'
import { useDeletePosition } from '../../hooks/useDeletePosition'

interface PositionItemProps {
  position: PositionEntity
}

function PositionListItem({ position }: PositionItemProps) {
  const [vacationInput, setVacationInput] = useState(position.vacation)
  const [isEdit, setIsEdit] = useState(false)

  const modifyMutate = useModifyPosition()
  const deleteMutate = useDeletePosition()

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
    modifyMutate({ positionName: position.positionName, vacation: vacationInput })
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
            deleteMutate(position.positionName)
          }}
        >
          삭제
        </span>
      )}
    </li>
  )
}

export default PositionListItem
