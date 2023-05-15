import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { registrationDepartment } from '../api/department'
import { DepartmentRegisterReq } from '../api/type'
import AddPositionForm from '../components/AddPositionForm'
import DepartmentList from '../components/DepartmentList'
import Title from '../components/Title'

const tmp = { departmentName: '영업', vacationLimit: 3 }

function DepartmentEditor() {
  const [inputValue, setInputValue] = useState({ name: '', vacation: 1 })
  const { mutate } = useMutation((department: DepartmentRegisterReq) => registrationDepartment(tmp))

  const clickAddPosition = () => {
    mutate({ departmentName: inputValue.name, vacationLimit: inputValue.vacation })
  }

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(inputValue)
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Title text="부서관리" />
      <AddPositionForm type="DEPARTMENT" addMutate={clickAddPosition} onChange={changeInput} inputValue={inputValue} />
      <DepartmentList />
    </>
  )
}

export default DepartmentEditor
