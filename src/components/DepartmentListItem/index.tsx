import React, { useState } from 'react'
import { DepartmentEntity } from '../../types/department'
import { UseModifyDepartment } from '../../hooks/useModifyDepartment'
import { useDeleteDepartment } from '../../hooks/useDeleteDepartment'

interface DepartmentItemProps {
  department: DepartmentEntity
}

function DepartmentListItem({ department }: DepartmentItemProps) {
  const [vacationInput, setVacationInput] = useState(department.vacationLimit)
  const [isEdit, setIsEdit] = useState(false)

  const modifyMutate = UseModifyDepartment()
  const deleteMutate = useDeleteDepartment()

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
    modifyMutate({ departmentName: department.departmentName, vacationLimit: vacationInput })
    setIsEdit(false)
  }

  return (
    <li className="row">
      <span>{department.departmentName}</span>
      <span>{department.departmentPersonal}</span>
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
            deleteMutate(department.departmentName)
          }}
        >
          삭제
        </span>
      )}
    </li>
  )
}

export default DepartmentListItem
