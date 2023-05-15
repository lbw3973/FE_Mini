import React, { useState } from 'react'
import { DepartmentEntity } from '../../types/department'

interface DepartmentItemProps {
  department: DepartmentEntity
  onEdit: (departmentName: string, vacationLimit: number) => void
  onDelete: (departmentName: string) => void
}

function DepartmentListItem({ department, onEdit, onDelete }: DepartmentItemProps) {
  const [vacationInput, setVacationInput] = useState(department.vacationLimit)
  const [isEdit, setIsEdit] = useState(false)

  const clickEditButton = () => {
    if (isEdit) {
      setVacationInput(department.vacationLimit)
    }
    setIsEdit((prev) => !prev)
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVacationInput(Number(e.target.value))
  }

  const handleConfirmEdit = () => {
    onEdit(department.departmentName, vacationInput)
    setIsEdit(false)
  }

  return (
    <li className="row">
      <span>{department.departmentName}</span>
      {isEdit ? (
        <>
          <input name="vacation" type="number" onChange={inputChangeHandler} value={vacationInput} />
        </>
      ) : (
        <>
          <span>{department.vacationLimit}</span>
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
            onDelete(department.departmentName)
          }}
        >
          삭제
        </span>
      )}
    </li>
  )
}

export default DepartmentListItem
