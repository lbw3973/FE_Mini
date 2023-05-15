import { instance } from './instance'
import { DepartmentEditReq, DepartmentRegisterReq } from './type'

export const registrationDepartment = async (department: DepartmentRegisterReq) => {
  const res = await instance.post('/api/v1/department/save', department)
  console.log(res)
  return res.data
}

export const editDepartment = async ({ departmentName, vacationLimit }: DepartmentEditReq) => {
  const res = await instance.post(`/api/v1/department/modify/${departmentName}`, { vacationLimit })
  console.log(res)
  return res.data
}

export const deleteDepartment = async (departmentName: string) => {
  const res = await instance.post(`/api/v1/department/modify/${departmentName}`)
  console.log(res)
  return res.data
}
