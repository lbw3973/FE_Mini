export interface DepartmentEntity {
  departmentName: string
  vacationLimit: number
  departmentPersonal: number
  status: 'ACTIVATION' | 'DEACTIVATION'
}

export interface DepartmentRes {
  data: DepartmentEntity[]
}
