import { DepartmentRes } from '../types/department'
import { instance } from './instance'
import { DepartmentEditReq, DepartmentRegisterReq } from './type'

export const getDepartments = async () => {
  const res = await instance.get<DepartmentRes>('/api/v1/department/list')
  return res.data.data
}

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
  const res = await instance.post(`/api/v1/department/delete/${departmentName}`)
  console.log(res)
  return res.data
}
